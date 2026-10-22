import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Annotator, { type Stroke } from './Annotator';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('Annotation scrolling', () => {
  it.each(['window', 'nested container'])(
    'redraws anchored strokes after scrolling the %s',
    (target) => {
      vi.useFakeTimers();
      const context = {
        setTransform: vi.fn(),
        clearRect: vi.fn(),
        save: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
      };
      vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
        context as unknown as CanvasRenderingContext2D
      );
      let top = 200;
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
        () => new DOMRect(100, top, 200, 100)
      );
      const store: Record<number, Stroke[]> = {
        0: [{
          tool: 'pen', color: '#ffffff', size: 3, anchor: '0.0',
          points: [{ x: 0.25, y: 0.5 }, { x: 0.75, y: 0.5 }],
        }],
      };
      const view = render(
        <>
          <div className="slide-stage active">
            <div data-testid="scroller"><p>Anchored content</p></div>
          </div>
          <Annotator slide={0} store={store} active={false} />
        </>
      );
      expect(context.moveTo).toHaveBeenLastCalledWith(150, 250);
      context.moveTo.mockClear();

      top = 100;
      // Scroll does not bubble; nested containers need a capture listener.
      fireEvent.scroll(target === 'window' ? window : view.getByTestId('scroller'));
      act(() => vi.advanceTimersByTime(20));

      expect(context.moveTo).toHaveBeenLastCalledWith(150, 150);

      view.unmount();
      context.moveTo.mockClear();
      fireEvent.scroll(window);
      act(() => vi.advanceTimersByTime(20));
      expect(context.moveTo).not.toHaveBeenCalled();
    }
  );
});
