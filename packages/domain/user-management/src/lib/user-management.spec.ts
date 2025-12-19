import { UserService } from './user-management.js';

describe('userManagement', () => {
  it('should export UserService', () => {
    expect(UserService).toBeDefined();
    const service = new UserService();
    expect(service).toBeDefined();
  });
});
