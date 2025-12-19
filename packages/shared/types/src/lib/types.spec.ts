import { User, UserRole } from './types.js';

describe('types', () => {
  it('should export User interface', () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(user.email).toEqual('test@example.com');
  });

  it('should export UserRole enum', () => {
    expect(UserRole.ADMIN).toEqual('admin');
    expect(UserRole.CUSTOMER).toEqual('customer');
  });
});
