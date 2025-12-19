import { render } from '@testing-library/react';
import { Product } from '@react-demo/types';
import ReactDemoProducts from './products';

describe('ReactDemoProducts', () => {
  it('should render successfully', () => {
    const mockProducts: Product[] = [];
    const { baseElement } = render(
      <ReactDemoProducts products={mockProducts} isLoading={false} />
    );
    expect(baseElement).toBeTruthy();
  });
});
