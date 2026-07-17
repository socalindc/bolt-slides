import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactElement, ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { DeckCtx } from './DeckContext';
import Annotator, { type Stroke } from './Annotator';
import SlideErrorBoundary from './SlideErrorBoundary';
import {
  IconSidebar,
  IconGrid,
  IconLeft,
  IconRight,
  IconPencil,
  IconExpand,
  IconShrink,
  IconPresent,
  IconClose,
} from './icons';

/* ── The paged presentation engine + the Slidev-style chrome (dock + rail).
   Wrap your <Slide>/<Bento>/… in <Deck>. Each top-level child is one slide.
     → / ↓ / Space   next (reveals the next <Build>, then the next slide)
     ← / ↑           previous            S sidebar     G grid view
     Home / End      first / last        A annotate    P presenter (new tab)
     F fullscreen    H hide/show the UI
     swipe ← / →     next / previous on touch (vertical drags scroll the slide)
   Copy verbatim; theme only via the :root tokens. ───────────────────────── */

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(
    2,
    '0'
  )}`;

type DeckProps = {
  children: ReactNode;
  /** Stable identifier used to isolate presenter sync and local persistence. */
  id?: string;
  /** Keep visited slides mounted so interactive demos retain their state. */
  preserveSlideState?: boolean;
};

type SyncState = {
  type: 'state';
  sender: string;
  target?: string;
  slide: number;
  clicks: number;
  curMax: number;
  annotations?: Record<number, Stroke[]>;
};

type SyncMessage =
  | { type: 'state-request'; sender: string }
  | SyncState
  | { type: 'annotations'; sender: string; slide: number; strokes: Stroke[] };

const cloneStrokes = (strokes: Stroke[]) =>
  strokes.map((stroke) => ({
    ...stroke,
    points: stroke.points.map((point) => ({ ...point })),
  }));

const cloneAnnotations = (store: Record<number, Stroke[]>) =>
  Object.fromEntries(
    Object.entries(store).map(([slide, strokes]) => [slide, cloneStrokes(strokes)])
  ) as Record<number, Stroke[]>;

function readStored<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as T;
  } catch {
    return fallback;
  }
}

function writeStored(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage can be unavailable in private or embedded contexts. */
  }
}

function senderId() {
  return globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function LiveSlide({
  index,
  active,
  clicks,
  registerMax,
  children,
}: {
  index: number;
  active: boolean;
  clicks: number;
  registerMax: (slide: number, at: number) => void;
  children: ReactNode;
}) {
  const register = useCallback(
    (at: number) => registerMax(index, at),
    [index, registerMax]
  );
  const context = useMemo(
    () => ({ clicks, isStatic: false, registerMax: register }),
    [clicks, register]
  );
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (frameRef.current) frameRef.current.inert = !active;
  }, [active]);

  return (
    <DeckCtx.Provider value={context}>
      <div
        ref={frameRef}
        className={'slide-stage' + (active ? ' active' : ' inactive')}
        aria-hidden={!active}
        hidden={!active}
      >
        <SlideErrorBoundary>{children}</SlideErrorBoundary>
      </div>
    </DeckCtx.Provider>
  );
}

function Thumb({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [d, setD] = useState({ vw: 1280, vh: 720, scale: 0.15 });
  // measure before paint — with useEffect the first frame renders at the
  // default scale and visibly snaps (worst in the grid view, which has no
  // slide-in transition to mask it).
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () =>
      setD({
        vw: window.innerWidth,
        vh: window.innerHeight,
        scale: el.clientWidth / window.innerWidth,
      });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);
  return (
    <div
      className="noir-thumb-frame"
      ref={frameRef}
      style={{ aspectRatio: `${d.vw} / ${d.vh}` }}
    >
      <DeckCtx.Provider value={{ clicks: 9999, isStatic: true }}>
        <div
          className="noir-thumb-scale"
          style={{ width: d.vw, height: d.vh, transform: `scale(${d.scale})` }}
        >
          <SlideErrorBoundary compact>{children}</SlideErrorBoundary>
        </div>
      </DeckCtx.Provider>
    </div>
  );
}

export default function Deck({
  children,
  id,
  preserveSlideState = true,
}: DeckProps) {
  const slides = useMemo(
    () => Children.toArray(children) as ReactElement[],
    [children]
  );
  const total = slides.length;
  const isPresenter = useMemo(
    () => new URLSearchParams(window.location.search).has('presenter'),
    []
  );
  const deckId = useMemo(
    () =>
      id ||
      document.documentElement.dataset.deckId ||
      window.location.pathname ||
      'root',
    [id]
  );
  const storageBase = `bolt-slides:${deckId}`;
  const notesKey = `${storageBase}:notes`;
  const annotationsKey = `${storageBase}:annotations`;
  const syncChannel = `${storageBase}:sync`;

  const [slide, setSlide] = useState(() => {
    const h = parseInt(window.location.hash.slice(1), 10);
    return h >= 1 && h <= total ? h - 1 : 0;
  });
  const [clicks, setClicks] = useState(0);
  const [curMax, setCurMax] = useState(0);
  const [railOpen, setRailOpen] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [fs, setFs] = useState(false);
  const [uiHidden, setUiHidden] = useState(false);
  const [nearDock, setNearDock] = useState(false);
  const [cursorIdle, setCursorIdle] = useState(false);
  const [noteOverrides, setNoteOverrides] = useState<Record<number, string>>(
    () => readStored(notesKey, {})
  );
  const [visited, setVisited] = useState<Set<number>>(
    () => new Set([slide])
  );
  const [annotationRevision, setAnnotationRevision] = useState(0);

  // Per-slide build maxima, click state, and annotations. The latter two let
  // visited interactive slides stay mounted without inheriting another slide's
  // click state, and make drawings durable across reloads.
  const maxMap = useRef<Record<number, number>>({});
  const clickMap = useRef<Record<number, number>>({ [slide]: 0 });
  const annStore = useRef<Record<number, Stroke[]>>(
    readStored(annotationsKey, {})
  );
  const slideRef = useRef(slide);
  const clicksRef = useRef(clicks);
  const curMaxRef = useRef(curMax);
  slideRef.current = slide;
  clicksRef.current = clicks;
  curMaxRef.current = curMax;
  clickMap.current[slide] = clicks;

  const chan = useRef<BroadcastChannel | null>(null);
  const sender = useRef(senderId());
  const syncReady = useRef(false);
  const applyingRemote = useRef(false);
  const pendingLocalState = useRef(false);

  useEffect(() => {
    setVisited((current) => {
      if (current.has(slide)) return current;
      const nextVisited = new Set(current);
      nextVisited.add(slide);
      return nextVisited;
    });
  }, [slide]);

  const registerMax = useCallback((slideIndex: number, at: number) => {
    const m = maxMap.current;
    m[slideIndex] = Math.max(m[slideIndex] || 0, at);
    if (slideRef.current === slideIndex)
      setCurMax((current) => Math.max(current, at));
  }, []);

  const go = useCallback(
    (i: number) => {
      const n = Math.max(0, Math.min(total - 1, i));
      setSlide(n);
      setClicks(0);
      setCurMax(maxMap.current[n] || 0);
    },
    [total]
  );
  const next = useCallback(() => {
    if (clicks < curMax) {
      setClicks(clicks + 1);
      return;
    }
    if (slide < total - 1) {
      const n = slide + 1;
      setSlide(n);
      setClicks(0);
      setCurMax(maxMap.current[n] || 0);
    }
  }, [clicks, curMax, slide, total]);
  const prev = useCallback(() => {
    if (clicks > 0) {
      setClicks(clicks - 1);
      return;
    }
    if (slide > 0) {
      const n = slide - 1;
      const m = maxMap.current[n] || 0;
      setSlide(n);
      setClicks(m);
      setCurMax(m);
    }
  }, [clicks, slide]);

  const toggleFs = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }, []);
  // sidebar and grid view are mutually exclusive — opening one closes the other
  const toggleRail = useCallback(() => {
    setRailOpen((v) => !v);
    setGridOpen(false);
  }, []);
  const toggleGrid = useCallback(() => {
    setGridOpen((v) => !v);
    setRailOpen(false);
  }, []);
  const setNote = useCallback(
    (text: string) => {
      setNoteOverrides((previous) => {
        const nextNotes = { ...previous, [slideRef.current]: text };
        writeStored(notesKey, nextNotes);
        return nextNotes;
      });
    },
    [notesKey]
  );
  const annotationsChanged = useCallback(
    (slideIndex: number, strokes: Stroke[]) => {
      const nextStrokes = cloneStrokes(strokes);
      annStore.current[slideIndex] = nextStrokes;
      writeStored(annotationsKey, annStore.current);
      if (syncReady.current)
        chan.current?.postMessage({
          type: 'annotations',
          sender: sender.current,
          slide: slideIndex,
          strokes: nextStrokes,
        } satisfies SyncMessage);
    },
    [annotationsKey]
  );
  const openPresenter = useCallback(() => {
    if (isPresenter) return;
    const url = new URL(window.location.href);
    url.searchParams.set('presenter', '1');
    window.open(url.pathname + url.search + url.hash, 'deck-presenter');
  }, [isPresenter]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target instanceof HTMLElement ? e.target : null;
      if (
        t &&
        (t.isContentEditable ||
          t.closest(
            'button,a,input,textarea,select,summary,[role="button"],[role="tab"],[contenteditable="true"]'
          ))
      )
        return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          go(0);
          break;
        case 'End':
          e.preventDefault();
          go(total - 1);
          break;
        case 's':
        case 'S':
          toggleRail();
          break;
        case 'g':
        case 'G':
          toggleGrid();
          break;
        case 'f':
        case 'F':
          toggleFs();
          break;
        case 'a':
        case 'A':
          setDrawing((v) => !v);
          break;
        case 'p':
        case 'P':
          openPresenter();
          break;
        case 'h':
        case 'H':
          setUiHidden((v) => !v);
          break;
        case 'Escape':
          setRailOpen(false);
          setGridOpen(false);
          setDrawing(false);
          setUiHidden(false);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go, total, toggleRail, toggleGrid, toggleFs, openPresenter]);

  // touch: a quick horizontal swipe pages; vertical drags stay free so a
  // slide taller than a phone screen can scroll (see base.css ≤640px)
  useEffect(() => {
    let x0 = 0,
      y0 = 0,
      t0 = 0,
      live = false;
    const onStart = (e: TouchEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        e.touches.length !== 1 ||
        t?.closest(
          '.noir-dock,.noir-rail,.noir-grid,.noir-presenter,.ann-bar,.ann-canvas,button,a,textarea,input'
        )
      ) {
        live = false;
        return;
      }
      live = true;
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
      t0 = performance.now();
    };
    const onEnd = (e: TouchEvent) => {
      if (!live) return;
      live = false;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      // slow drags and diagonal/vertical moves are scroll intent, not paging
      if (performance.now() - t0 > 600) return;
      if (Math.abs(dx) < 48 || Math.abs(dx) < 1.5 * Math.abs(dy)) return;
      if (dx < 0) next();
      else prev();
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [next, prev]);

  // safety net: if the authored deck kept the placeholder tab title, derive
  // one from the current slide's heading so shared links look right.
  useEffect(() => {
    if (!document.title.startsWith('Replace')) return;
    const h = document.querySelector<HTMLElement>(
      '.slide-stage.active h1, .slide-stage.active h2'
    );
    const t = h?.innerText.replace(/\s+/g, ' ').trim();
    if (t) document.title = t;
  }, []);

  // URL hash sync (initial slide comes from the hash via useState above)
  useEffect(() => {
    const want = String(slide + 1);
    if (window.location.hash.slice(1) !== want)
      history.replaceState(null, '', '#' + want);
  }, [slide]);
  useEffect(() => {
    const onHash = () => {
      const h = parseInt(window.location.hash.slice(1), 10);
      if (h >= 1 && h <= total && h - 1 !== slide) go(h - 1);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [slide, total, go]);

  // Cross-tab sync (audience ⇄ presenter). New tabs request the current state
  // before they are allowed to broadcast, so opening presenter mode cannot
  // overwrite an in-progress build with its initial `clicks: 0` state.
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') {
      syncReady.current = true;
      return;
    }

    syncReady.current = false;
    const c = new BroadcastChannel(syncChannel);
    chan.current = c;
    const postState = (target?: string, includeAnnotations = false) =>
      c.postMessage({
        type: 'state',
        sender: sender.current,
        target,
        slide: slideRef.current,
        clicks: clicksRef.current,
        curMax: curMaxRef.current,
        annotations: includeAnnotations
          ? cloneAnnotations(annStore.current)
          : undefined,
      } satisfies SyncState);

    const readyTimer = window.setTimeout(() => {
      if (syncReady.current) return;
      syncReady.current = true;
      if (pendingLocalState.current) {
        pendingLocalState.current = false;
        postState();
      }
    }, 500);

    c.onmessage = (event: MessageEvent<SyncMessage>) => {
      const message = event.data;
      if (!message || message.sender === sender.current) return;

      if (message.type === 'state-request') {
        // Responses are targeted, so even a freshly opened audience tab can
        // safely hydrate a presenter without broadcasting to other peers.
        postState(message.sender, true);
        return;
      }

      if (message.type === 'annotations') {
        annStore.current[message.slide] = cloneStrokes(message.strokes);
        writeStored(annotationsKey, annStore.current);
        setAnnotationRevision((revision) => revision + 1);
        return;
      }

      if (message.type === 'state') {
        if (message.target && message.target !== sender.current) return;
        const nextSlide = Math.max(0, Math.min(total - 1, message.slide));
        const nextClicks = Math.max(0, message.clicks);
        const nextMax = Math.max(0, message.curMax);

        if (message.annotations) {
          annStore.current = cloneAnnotations(message.annotations);
          writeStored(annotationsKey, annStore.current);
          setAnnotationRevision((revision) => revision + 1);
        }

        applyingRemote.current = true;
        syncReady.current = true;
        pendingLocalState.current = false;
        clickMap.current[nextSlide] = nextClicks;
        maxMap.current[nextSlide] = Math.max(
          maxMap.current[nextSlide] || 0,
          nextMax
        );
        setSlide(nextSlide);
        setClicks(nextClicks);
        setCurMax(nextMax);
      }
    };

    c.postMessage({
      type: 'state-request',
      sender: sender.current,
    } satisfies SyncMessage);

    return () => {
      clearTimeout(readyTimer);
      c.close();
      if (chan.current === c) chan.current = null;
    };
  }, [annotationsKey, syncChannel, total]);

  useEffect(() => {
    if (applyingRemote.current) {
      applyingRemote.current = false;
      return;
    }
    if (!syncReady.current) {
      pendingLocalState.current = true;
      return;
    }
    chan.current?.postMessage({
      type: 'state',
      sender: sender.current,
      slide,
      clicks,
      curMax,
    } satisfies SyncState);
  }, [slide, clicks, curMax]);

  // fullscreen flag, presenter timer, idle auto-hide
  useEffect(() => {
    const h = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);
  useEffect(() => {
    if (!isPresenter) return;
    setElapsed(0);
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [isPresenter]);
  // mouse-driven only: keyboard nav keeps the UI hidden; the dock returns when
  // the pointer nears the bottom (where it lives); the cursor hides on idle.
  useEffect(() => {
    let t = 0;
    const onMove = (e: MouseEvent) => {
      setCursorIdle(false);
      setNearDock(e.clientY > window.innerHeight - 150);
      clearTimeout(t);
      t = window.setTimeout(() => setCursorIdle(true), 2600);
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      clearTimeout(t);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const hasPrev = slide > 0 || clicks > 0;
  const hasNext = slide < total - 1 || clicks < curMax;
  const notes = (slides[slide]?.props as { notes?: string } | undefined)?.notes;
  const noteText = noteOverrides[slide] ?? notes ?? '';
  const nextSlide = slides[slide + 1];
  const hideUI = uiHidden || (fs && !nearDock);
  const cursorHidden = fs && cursorIdle && !drawing;
  const showAnnotator = drawing || (annStore.current[slide]?.length ?? 0) > 0;
  const navLabel = (item: ReactElement) =>
    (item.props as { nav?: string } | undefined)?.nav;

  // prev / counter / next — rendered inside the pill on desktop, in its own
  // pill above the tools on phones (only one is visible at a time).
  const navCluster = (
    <>
      <button
        className="noir-icon-btn"
        data-tip="Previous"
        aria-label="Previous"
        disabled={!hasPrev}
        onClick={prev}
      >
        <IconLeft />
      </button>
      <div className="noir-counter">
        <span className="noir-counter-now">{slide + 1}</span>
        <span className="noir-counter-tot">/ {total}</span>
      </div>
      <button
        className="noir-icon-btn"
        data-tip="Next"
        aria-label="Next"
        disabled={!hasNext}
        onClick={next}
      >
        <IconRight />
      </button>
    </>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className={'deck' + (cursorHidden ? ' nocursor' : '')}>
        {slides.map((item, index) => {
          if (
            index !== slide &&
            (!preserveSlideState || !visited.has(index))
          )
            return null;
          return (
            <LiveSlide
              key={index}
              index={index}
              active={index === slide}
              clicks={
                index === slide ? clicks : clickMap.current[index] || 0
              }
              registerMax={registerMax}
            >
              {item}
            </LiveSlide>
          );
        })}

        {showAnnotator && (
          <Annotator
            key={`${slide}:${annotationRevision}`}
            slide={slide}
            store={annStore.current}
            active={drawing}
            onChange={annotationsChanged}
          />
        )}

        <aside className={'noir-rail' + (railOpen ? ' open' : '')}>
          <div className="noir-rail-head">
            <span className="noir-rail-title">Slides</span>
            <button
              className="noir-icon-btn sm"
              data-tip="Close"
              aria-label="Close slide sidebar"
              onClick={() => setRailOpen(false)}
            >
              <IconClose />
            </button>
          </div>
          <div className="noir-rail-list">
            {railOpen &&
              slides.map((item, index) => {
                const label = navLabel(item);
                return (
                  <button
                    key={index}
                    className={
                      'noir-thumb' + (index === slide ? ' active' : '')
                    }
                    aria-label={`Go to slide ${index + 1}${
                      label ? `: ${label}` : ''
                    }`}
                    onClick={() => {
                      go(index);
                      setRailOpen(false);
                    }}
                  >
                    <span className="noir-thumb-meta">
                      <span className="noir-thumb-no">{index + 1}</span>
                      {label && <span className="noir-thumb-label">{label}</span>}
                    </span>
                    <Thumb>{item}</Thumb>
                  </button>
                );
              })}
          </div>
        </aside>

        {gridOpen && (
          <div className="noir-grid">
            <div className="noir-grid-head">
              <span className="noir-rail-title">All slides</span>
              <button
                className="noir-icon-btn sm"
                data-tip="Close"
                aria-label="Close grid view"
                onClick={() => setGridOpen(false)}
              >
                <IconClose />
              </button>
            </div>
            <div className="noir-grid-list">
              {slides.map((item, index) => {
                const label = navLabel(item);
                return (
                  <button
                    key={index}
                    className={
                      'noir-thumb' + (index === slide ? ' active' : '')
                    }
                    aria-label={`Go to slide ${index + 1}${
                      label ? `: ${label}` : ''
                    }`}
                    onClick={() => {
                      go(index);
                      setGridOpen(false);
                    }}
                  >
                    <span className="noir-thumb-meta">
                      <span className="noir-thumb-no">{index + 1}</span>
                      {label && <span className="noir-thumb-label">{label}</span>}
                    </span>
                    <Thumb>{item}</Thumb>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isPresenter && (
          <div className="noir-presenter">
            <div className="noir-presenter-row">
              <span className="noir-presenter-label">
                Presenter · {slide + 1} / {total}
              </span>
              <span className="noir-presenter-timer">{fmt(elapsed)}</span>
            </div>
            {nextSlide && (
              <div className="noir-presenter-next">
                <Thumb>{nextSlide}</Thumb>
              </div>
            )}
            <textarea
              className="noir-presenter-notes"
              value={noteText}
              spellCheck={false}
              placeholder={'No notes — type here, or add notes="…" in code.'}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="noir-presenter-hint">
              Notes you type are saved on this device.
            </div>
          </div>
        )}

        <div className={'noir-dock' + (hideUI ? ' hidden' : '')}>
          {/* phones: nav floats bare above the tools pill (see base.css) */}
          <div className="noir-bar noir-nav-bar">{navCluster}</div>
          <div className="noir-bar">
            <button
              className={'noir-icon-btn' + (railOpen ? ' on' : '')}
              data-tip="Sidebar (S)"
              aria-label="Toggle slide sidebar"
              aria-pressed={railOpen}
              onClick={toggleRail}
            >
              <IconSidebar />
            </button>
            <button
              className={'noir-icon-btn' + (gridOpen ? ' on' : '')}
              data-tip="Grid view (G)"
              aria-label="Toggle grid view"
              aria-pressed={gridOpen}
              onClick={toggleGrid}
            >
              <IconGrid />
            </button>
            <span className="noir-sep" />
            <div className="noir-nav-inline">{navCluster}</div>
            <span className="noir-sep" />
            <button
              className={'noir-icon-btn' + (drawing ? ' on' : '')}
              data-tip="Annotate (A)"
              aria-label="Toggle annotation tools"
              aria-pressed={drawing}
              onClick={() => setDrawing((v) => !v)}
            >
              <IconPencil />
            </button>
            <button
              className="noir-icon-btn"
              data-tip={fs ? 'Exit fullscreen (F)' : 'Fullscreen (F)'}
              aria-label={fs ? 'Exit fullscreen' : 'Enter fullscreen'}
              onClick={toggleFs}
            >
              {fs ? <IconShrink /> : <IconExpand />}
            </button>
            <button
              className="noir-icon-btn"
              data-tip="Presenter — new tab (P)"
              aria-label="Open presenter mode"
              onClick={openPresenter}
            >
              <IconPresent />
            </button>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
