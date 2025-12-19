import { render } from '@testing-library/react';

import ReactDemoCart from './cart';

describe('ReactDemoCart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDemoCart />);
    expect(baseElement).toBeTruthy();
  });
});
