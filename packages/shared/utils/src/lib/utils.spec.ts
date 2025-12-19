import { formatCurrency, formatDate, truncate, capitalize, slugify } from './utils.js';

describe('utils', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(99.99)).toBe('$99.99');
      expect(formatCurrency(1000.5)).toBe('$1,000.50');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2025-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('2025');
      expect(formatted).toContain('January');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
      expect(truncate('Short', 10)).toBe('Short');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });
  });

  describe('slugify', () => {
    it('should create slugs from strings', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Test String!')).toBe('test-string');
    });
  });
});
