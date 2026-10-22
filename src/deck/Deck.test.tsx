import { useState, type ReactElement } from 'react';
import { act, fireEvent, render, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Deck from './Deck';
import Build from './Build';
import Slide from './Slide';

afterEach(() => vi.restoreAllMocks());

function StatefulDemo() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((value) => value + 1)}>Count {count}</button>;
}

function ThrowingSlide(): ReactElement {
  throw new Error('demo failure');
}

describe('Deck hardening', () => {
  it('keeps hidden builds out of the accessibility tree and focus order', async () => {
    const view = render(
      <Deck id="build-test">
        <Slide>
          <Build at={1}>
            <button>Hidden action</button>
          </Build>
        </Slide>
      </Deck>
    );

    const build = view.getByText('Hidden action').parentElement!;
    expect(build.getAttribute('aria-hidden')).toBe('true');
    expect(build.inert).toBe(true);

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    await waitFor(() => expect(build.getAttribute('aria-hidden')).toBe('false'));
    expect(build.inert).toBe(false);
  });

  it('does not page the deck when Space is pressed on a button', () => {
    const view = render(
      <Deck id="keyboard-test">
        <Slide>
          <button>Interactive control</button>
        </Slide>
        <Slide>Second slide</Slide>
      </Deck>
    );

    const button = view.getByText('Interactive control');
    button.focus();
    fireEvent.keyDown(button, { key: ' ' });
    expect(view.queryByText('Second slide')).toBeNull();
  });

  it.each([
    ['ArrowRight', 'Third slide'],
    ['ArrowDown', 'Third slide'],
    ['ArrowLeft', 'First slide'],
    ['ArrowUp', 'First slide'],
  ])('handles %s after clicking and focusing Next', (key, expectedSlide) => {
    const view = render(
      <Deck id="focused-next-test">
        <Slide>First slide</Slide>
        <Slide>Second slide</Slide>
        <Slide>Third slide</Slide>
      </Deck>
    );
    const next = view.getAllByRole('button', { name: 'Next' })[0];
    next.focus();
    fireEvent.click(next);
    expect(view.container.querySelector('.slide-stage.active')?.textContent).toBe(
      'Second slide'
    );
    expect(document.activeElement).toBe(next);

    fireEvent.keyDown(next, { key });

    expect(view.container.querySelector('.slide-stage.active')?.textContent).toBe(
      expectedSlide
    );
  });

  it.each([
    'Toggle slide sidebar',
    'Toggle grid view',
    'Toggle annotation tools',
  ])('handles Escape while %s has focus', (name) => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    const view = render(
      <Deck id="focused-toggle-test">
        <Slide>First slide</Slide>
      </Deck>
    );
    const toggle = view.getByRole('button', { name });
    toggle.focus();
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');

    fireEvent.keyDown(toggle, { key: 'Escape' });

    expect(toggle.getAttribute('aria-pressed')).toBe('false');
  });

  it.each([
    'input',
    'textarea',
    'true',
    '',
    'plaintext-only',
  ])('ignores shortcuts in editable field %j', (kind) => {
    const editor = kind === 'input' ? <input /> : kind === 'textarea' ? <textarea /> : (
      <div contentEditable suppressContentEditableWarning><span>Editor</span></div>
    );
    const view = render(
      <Deck id="editable-keyboard-test">
        <Slide>{editor}</Slide>
        <Slide>Second slide</Slide>
      </Deck>
    );
    const sidebar = view.getByRole('button', { name: 'Toggle slide sidebar' });
    fireEvent.click(sidebar);
    const stage = view.container.querySelector('.slide-stage.active')!;
    const field = stage.querySelector<HTMLElement>('input,textarea,span')!;
    const editable = field.closest<HTMLElement>('[contenteditable]');
    if (editable) editable.setAttribute('contenteditable', kind);
    (editable ?? field).focus();

    fireEvent.keyDown(field, { key: 'ArrowRight' });
    fireEvent.keyDown(field, { key: 'Escape' });

    expect(view.container.querySelector('.slide-stage.active')).toBe(stage);
    expect(sidebar.getAttribute('aria-pressed')).toBe('true');
  });

  it('pages on a horizontal touch swipe', async () => {
    const view = render(
      <Deck id="swipe-test">
        <Slide>First slide</Slide>
        <Slide>Second slide</Slide>
      </Deck>
    );

    const activeSlide = view.getByText('First slide');
    fireEvent.touchStart(activeSlide, {
      touches: [{ clientX: 300, clientY: 400 }],
    });
    fireEvent.touchEnd(activeSlide, {
      changedTouches: [{ clientX: 100, clientY: 408 }],
    });

    await waitFor(() => expect(view.getByText('Second slide')).toBeTruthy());
  });

  describe.each([-200, 200])('horizontal swipe of %d pixels', (dx) => {
    it.each([
      ['target', 'auto', 600, false],
      ['target', 'scroll', 600, false],
      ['ancestor', 'auto', 600, false],
      ['ancestor', 'scroll', 600, false],
      ['root', 'auto', 600, false],
      ['ancestor', 'auto', 300, true],
      ['ancestor', 'hidden', 600, true],
      ['ancestor', 'visible', 600, true],
      ['outside', 'auto', 600, true],
    ])('handles %s with overflow-x %s and scrollWidth %d', (location, overflowX, scrollWidth, pages) => {
      history.replaceState(null, '', '/#2');
      const view = render(
        <Deck id="scrollable-swipe-test">
          <Slide>First slide</Slide>
          <Slide>
            <div data-testid="scroll-container"><span>Wide content</span></div>
          </Slide>
          <Slide>Third slide</Slide>
        </Deck>
      );
      const target = view.getByText('Wide content');
      const scrollable = location === 'target' ? target
        : location === 'root' ? view.container.querySelector<HTMLElement>('.deck')!
        : location === 'outside' ? view.container
        : view.getByTestId('scroll-container');
      scrollable.style.overflowX = overflowX;
      Object.defineProperties(scrollable, {
        clientWidth: { value: 300 },
        scrollWidth: { value: scrollWidth },
      });

      fireEvent.touchStart(target, {
        touches: [{ clientX: 300, clientY: 400 }],
      });
      fireEvent.touchEnd(target, {
        changedTouches: [{ clientX: 300 + dx, clientY: 408 }],
      });

      expect(window.location.hash).toBe(pages ? (dx < 0 ? '#3' : '#1') : '#2');
    });
  });

  it('migrates legacy notes to the scoped key and keeps them after a remount', () => {
    const notes = { 0: 'Saved first note', 1: 'Saved second note' };
    localStorage.setItem('deck:notes', JSON.stringify(notes));
    history.replaceState(null, '', '/?presenter=1#1');
    const slides = [
      <Slide key="first" notes="Authored first note">First slide</Slide>,
      <Slide key="second" notes="Authored second note">Second slide</Slide>,
    ];
    const view = render(<Deck id="notes-test">{slides}</Deck>);

    expect((view.getByRole('textbox') as HTMLTextAreaElement).value).toBe(notes[0]);
    expect(JSON.parse(localStorage.getItem('bolt-slides:notes-test:notes')!)).toEqual(notes);
    fireEvent.click(view.getAllByRole('button', { name: 'Next' })[0]);
    expect((view.getByRole('textbox') as HTMLTextAreaElement).value).toBe(notes[1]);

    view.unmount();
    localStorage.removeItem('deck:notes');
    const remounted = render(<Deck id="notes-test">{slides}</Deck>);
    expect((remounted.getByRole('textbox') as HTMLTextAreaElement).value).toBe(notes[1]);
  });

  it.each([
    [{ 0: 'Scoped note' }, 'Scoped note'],
    [{}, 'Authored note'],
  ])('preserves an existing scoped notes value %j', (notes, expected) => {
    localStorage.setItem('deck:notes', JSON.stringify({ 0: 'Legacy note' }));
    const stored = JSON.stringify(notes);
    localStorage.setItem('bolt-slides:notes-test:notes', stored);
    history.replaceState(null, '', '/?presenter=1#1');
    const view = render(
      <Deck id="notes-test"><Slide notes="Authored note">First slide</Slide></Deck>
    );

    expect((view.getByRole('textbox') as HTMLTextAreaElement).value).toBe(expected);
    expect(localStorage.getItem('bolt-slides:notes-test:notes')).toBe(stored);
  });

  it('safely ignores malformed legacy notes', () => {
    localStorage.setItem('deck:notes', '{broken JSON');
    history.replaceState(null, '', '/?presenter=1#1');
    const view = render(
      <Deck id="notes-test"><Slide notes="Authored note">First slide</Slide></Deck>
    );

    expect((view.getByRole('textbox') as HTMLTextAreaElement).value).toBe('Authored note');
    expect(localStorage.getItem('bolt-slides:notes-test:notes')).toBeNull();
  });

  it('preserves interactive slide state after navigating away and back', async () => {
    const view = render(
      <Deck id="state-test">
        <Slide>
          <StatefulDemo />
        </Slide>
        <Slide>Second slide</Slide>
      </Deck>
    );

    const counter = view.getByText('Count 0');
    fireEvent.click(counter);
    expect(view.getByText('Count 1')).toBeTruthy();
    counter.blur();
    const firstFrame = counter.closest('.slide-stage') as HTMLDivElement;

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    await waitFor(() => expect(view.getByText('Second slide')).toBeTruthy());
    expect(firstFrame.hidden).toBe(true);
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    await waitFor(() => expect(view.getByText('Count 1')).toBeTruthy());
    expect(firstFrame.hidden).toBe(false);
  });

  it('shows nav labels in the sidebar', async () => {
    const view = render(
      <Deck id="nav-test">
        <Slide nav="The thesis">Slide content</Slide>
      </Deck>
    );

    fireEvent.keyDown(window, { key: 's' });
    await waitFor(() =>
      expect(view.container.querySelector('.noir-thumb-label')?.textContent).toBe(
        'The thesis'
      )
    );
  });

  it('contains a throwing slide and leaves deck controls available', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const preventExpectedError = (event: ErrorEvent) => event.preventDefault();
    window.addEventListener('error', preventExpectedError);
    const view = render(
      <Deck id="error-test">
        <ThrowingSlide />
        <Slide>Healthy slide</Slide>
      </Deck>
    );

    expect(view.getByText('This slide failed to render.')).toBeTruthy();
    expect(view.getAllByRole('button', { name: 'Next' }).length).toBeGreaterThan(0);
    window.removeEventListener('error', preventExpectedError);
    error.mockRestore();
  });

  it('hydrates a new presenter without resetting the audience build', async () => {
    const audience = render(
      <Deck id="sync-test">
        <Slide>
          <Build at={1}>Revealed detail</Build>
        </Slide>
      </Deck>
    );

    await new Promise((resolve) => setTimeout(resolve, 520));
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    const audienceBuild = audience
      .getByText('Revealed detail')
      .closest('[aria-hidden]')!;
    await waitFor(() =>
      expect(audienceBuild.getAttribute('aria-hidden')).toBe('false')
    );

    history.replaceState(null, '', '/?presenter=1#1');
    const presenterRoot = document.createElement('div');
    document.body.appendChild(presenterRoot);
    const presenter = render(
      <Deck id="sync-test">
        <Slide>
          <Build at={1}>Presenter detail</Build>
        </Slide>
      </Deck>,
      { container: presenterRoot }
    );

    await waitFor(() => {
      const presenterBuild = within(presenterRoot)
        .getByText('Presenter detail')
        .closest('[aria-hidden]')!;
      expect(presenterBuild.getAttribute('aria-hidden')).toBe('false');
      expect(audienceBuild.getAttribute('aria-hidden')).toBe('false');
    });

    presenter.unmount();
    presenterRoot.remove();
  });

  it('broadcasts the first slide change after reloading an unchanged presenter', async () => {
    const slides = [
      <Slide key="first">First slide</Slide>,
      <Slide key="second">Second slide</Slide>,
      <Slide key="third">Third slide</Slide>,
    ];
    const audience = render(<Deck id="unchanged-sync-test">{slides}</Deck>);
    history.replaceState(null, '', '/?presenter=1#1');

    let presenter!: ReturnType<typeof render>;
    await act(async () => {
      presenter = render(<Deck id="unchanged-sync-test">{slides}</Deck>);
    });
    presenter.unmount();
    await act(async () => {
      presenter = render(<Deck id="unchanged-sync-test">{slides}</Deck>);
    });

    const next = within(presenter.container).getAllByRole('button', { name: 'Next' })[0];
    fireEvent.click(next);

    await waitFor(() =>
      expect(audience.container.querySelector('.slide-stage.active')?.textContent).toBe(
        'Second slide'
      )
    );

    fireEvent.click(next);
    await waitFor(() =>
      expect(audience.container.querySelector('.slide-stage.active')?.textContent).toBe(
        'Third slide'
      )
    );
  });
});
