import { User, UserRole, Product, ProductCategory } from './types.js';

describe('types', () => {
  it('should export User interface', () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: UserRole.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(user.id).toBe('1');
  });

  it('should export Product interface', () => {
    const product: Product = {
      id: '1',
      name: 'Test Product',
      description: 'A test product',
      price: 99.99,
      category: ProductCategory.ELECTRONICS,
      imageUrl: 'https://example.com/image.jpg',
      stock: 10,
      rating: 4.5,
      reviews: 100,
      createdAt: new Date(),
    };
    expect(product.name).toBe('Test Product');
  });
});
