import { render } from '@testing-library/react';

import ReactDemoUi from './ui';

describe('ReactDemoUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDemoUi />);
    expect(baseElement).toBeTruthy();
  });
});
