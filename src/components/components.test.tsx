import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LineChart } from './Charts';
import CodeWindow from './CodeWindow';

describe('component edge cases', () => {
  it('does not parse // inside a string as a comment', () => {
    const view = render(
      <CodeWindow code={"fetch('https://example.com/data') // request"} />
    );
    expect(view.container.querySelector('.cw-str')?.textContent).toContain(
      'https://example.com/data'
    );
    expect(view.container.querySelector('.cw-com')?.textContent).toBe('// request');
  });

  it('renders a one-point line chart without NaN coordinates', () => {
    const view = render(<LineChart points={[42]} />);
    expect(view.container.innerHTML).not.toContain('NaN');
  });

  it('renders an empty line chart safely', () => {
    const view = render(<LineChart points={[]} />);
    expect(view.getByRole('img', { name: 'No chart data' })).toBeTruthy();
  });
});
