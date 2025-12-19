import { apiClient } from './api-client.js';

describe('apiClient', () => {
  it('should export apiClient instance', () => {
    expect(apiClient).toBeDefined();
    expect(apiClient.get).toBeDefined();
    expect(apiClient.post).toBeDefined();
  });
});
