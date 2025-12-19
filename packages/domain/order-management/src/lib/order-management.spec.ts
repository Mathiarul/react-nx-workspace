import { OrderService } from './order-management.js';

describe('orderManagement', () => {
  it('should export OrderService', () => {
    expect(OrderService).toBeDefined();
    const service = new OrderService();
    expect(service).toBeDefined();
  });
});
