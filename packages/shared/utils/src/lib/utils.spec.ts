import { formatCurrency, truncate, capitalize, slugify } from './utils.js';

describe('utils', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(100)).toContain('100');
  });

  it('should truncate strings', () => {
    expect(truncate('Hello World', 8)).toEqual('Hello...');
  });

  it('should capitalize strings', () => {
    expect(capitalize('hello')).toEqual('Hello');
  });

  it('should slugify strings', () => {
    expect(slugify('Hello World')).toEqual('hello-world');
  });
});
