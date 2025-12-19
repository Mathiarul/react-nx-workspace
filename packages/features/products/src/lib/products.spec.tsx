import { render } from '@testing-library/react';

import ReactDemoProducts from './products';

describe('ReactDemoProducts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDemoProducts />);
    expect(baseElement).toBeTruthy();
  });
});
