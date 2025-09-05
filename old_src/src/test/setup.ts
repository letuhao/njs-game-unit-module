/**
 * Jest Test Setup
 * 
 * This file contains setup code that runs before all tests.
 */

// Mock console methods to avoid noise in test output
const originalConsole = global.console;

beforeAll(() => {
  global.console = {
    ...originalConsole,
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
});

afterAll(() => {
  global.console = originalConsole;
});

// Global test utilities
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidUnit(value: any): R;
    }
  }
}

export {};

// Custom matcher for unit validation
expect.extend({
  toBeValidUnit(received: any) {
    const pass = 
      received &&
      typeof received === 'object' &&
      typeof received.id === 'string' &&
      typeof received.calculate === 'function' &&
      typeof received.validate === 'function';

    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid unit`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid unit`,
        pass: false,
      };
    }
  },
});
