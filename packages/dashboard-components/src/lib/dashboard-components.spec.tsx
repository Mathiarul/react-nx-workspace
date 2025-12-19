import { render } from '@testing-library/react';

import ReactDemoDashboardComponents from './dashboard-components';

describe('ReactDemoDashboardComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDemoDashboardComponents />);
    expect(baseElement).toBeTruthy();
  });
});
