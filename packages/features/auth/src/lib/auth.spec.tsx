import { render } from '@testing-library/react';

import ReactDemoAuth from './auth';

describe('ReactDemoAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDemoAuth />);
    expect(baseElement).toBeTruthy();
  });
});
