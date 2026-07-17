import { useState, type ReactElement } from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Deck from './Deck';
import Build from './Build';
import Slide from './Slide';

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
});
