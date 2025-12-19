import { render } from '@testing-library/react';

import ReactDemoUiComponents from './ui-components';

describe('ReactDemoUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDemoUiComponents />);
    expect(baseElement).toBeTruthy();
  });
});
