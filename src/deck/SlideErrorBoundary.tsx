import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  compact?: boolean;
};

type State = {
  error: Error | null;
};

/* Keep a broken interactive slide from taking down the deck or its controls.
   The boundary is keyed per slide by Deck, so navigation always remains usable. */
export default class SlideErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('A slide failed to render.', error, info.componentStack);
  }

  private retry = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;

    if (this.props.compact) {
      return (
        <div className="slide slide-error compact" role="img" aria-label="Slide preview unavailable">
          <span>Preview unavailable</span>
        </div>
      );
    }

    return (
      <div className="slide center slide-error" role="alert">
        <div className="container">
          <p className="kicker">Slide error</p>
          <h2 className="headline">This slide failed to render.</h2>
          <p className="lead">
            The rest of the deck is still available. Retry this slide or continue
            with the deck controls.
          </p>
          <button className="slide-error-retry" type="button" onClick={this.retry}>
            Retry slide
          </button>
        </div>
      </div>
    );
  }
}
