import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { LoggingObserver } from '../observers/LoggingObserver';
import { LogLevel } from '../enums/LogLevel';
import { logger } from '../core/Logger';
import { container, TOKENS } from '../container/DiContainer';

// Mock the Logger
jest.mock('../../core/Logger');

describe('LoggingObserver', () => {
  let observer: LoggingObserver;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Create mock logger instance
    mockLogger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
      getInstance: jest.fn().mockReturnThis(),
    } as any;

    // Mock the logger method
    (Logger.getInstance as jest.Mock).mockReturnValue(mockLogger);

    // Use DI container to resolve observer instead of direct instantiation
    try {
      observer = container.resolve(TOKENS.LOGGING_OBSERVER);
      // Set log level for the resolved observer
      (observer as any).logLevel = LogLevel.INFO;
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      observer = new LoggingObserver(LogLevel.INFO);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create observer with default log level', () => {
      let defaultObserver: LoggingObserver;
      try {
        defaultObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (defaultObserver as any).logLevel = LogLevel.INFO;
      } catch (error) {
        defaultObserver = new LoggingObserver();
      }
      expect(defaultObserver).toBeInstanceOf(LoggingObserver);
    });

    it('should create observer with custom log level', () => {
      let debugObserver: LoggingObserver;
      let warnObserver: LoggingObserver;
      let errorObserver: LoggingObserver;

      try {
        debugObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (debugObserver as any).logLevel = LogLevel.DEBUG;
        warnObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (warnObserver as any).logLevel = LogLevel.WARN;
        errorObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (errorObserver as any).logLevel = LogLevel.ERROR;
      } catch (error) {
        debugObserver = new LoggingObserver(LogLevel.DEBUG);
        warnObserver = new LoggingObserver(LogLevel.WARN);
        errorObserver = new LoggingObserver(LogLevel.ERROR);
      }

      expect(debugObserver).toBeInstanceOf(LoggingObserver);
      expect(warnObserver).toBeInstanceOf(LoggingObserver);
      expect(errorObserver).toBeInstanceOf(LoggingObserver);
    });
  });

  describe('update method', () => {
    it('should log info messages when log level is INFO', () => {
      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
      };

      observer.update(testData);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'LoggingObserver',
        'update',
        'Unit calculation completed',
        expect.objectContaining({
          id: 'test-unit',
          value: 100,
          unit: 'pixel',
          result: 100,
        })
      );
    });

    it('should log debug messages when log level is DEBUG', () => {
      let debugObserver: LoggingObserver;
      try {
        debugObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (debugObserver as any).logLevel = LogLevel.DEBUG;
      } catch (error) {
        debugObserver = new LoggingObserver(LogLevel.DEBUG);
      }

      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
      };

      debugObserver.update(testData);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'LoggingObserver',
        'update',
        'Unit calculation completed',
        expect.objectContaining({
          id: 'test-unit',
          value: 100,
          unit: 'pixel',
          result: 100,
        })
      );
    });

    it('should log warn messages when log level is WARN', () => {
      let warnObserver: LoggingObserver;
      try {
        warnObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (warnObserver as any).logLevel = LogLevel.WARN;
      } catch (error) {
        warnObserver = new LoggingObserver(LogLevel.WARN);
      }

      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
      };

      warnObserver.update(testData);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'LoggingObserver',
        'update',
        'Unit calculation completed',
        expect.objectContaining({
          id: 'test-unit',
          value: 100,
          unit: 'pixel',
          result: 100,
        })
      );
    });

    it('should log error messages when log level is ERROR', () => {
      let errorObserver: LoggingObserver;
      try {
        errorObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (errorObserver as any).logLevel = LogLevel.ERROR;
      } catch (error) {
        errorObserver = new LoggingObserver(LogLevel.ERROR);
      }

      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
      };

      errorObserver.update(testData);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'LoggingObserver',
        'update',
        'Unit calculation completed',
        expect.objectContaining({
          id: 'test-unit',
          value: 100,
          unit: 'pixel',
          result: 100,
        })
      );
    });

    it('should handle different data types', () => {
      const testCases = [
        {
          id: 'string-test',
          value: '100px',
          unit: 'pixel',
          result: 100,
          timestamp: new Date(),
        },
        {
          id: 'number-test',
          value: 200,
          unit: 'pixel',
          result: 200,
          timestamp: new Date(),
        },
        {
          id: 'object-test',
          value: { width: 100, height: 200 },
          unit: 'pixel',
          result: { width: 100, height: 200 },
          timestamp: new Date(),
        },
      ];

      for (const testCase of testCases) {
        observer.update(testCase);
        expect(mockLogger.info).toHaveBeenCalledWith(
          'LoggingObserver',
          'update',
          'Unit calculation completed',
          expect.objectContaining({
            id: testCase.id,
            value: testCase.value,
            unit: testCase.unit,
            result: testCase.result,
          })
        );
      }
    });

    it('should handle missing or invalid data gracefully', () => {
      const invalidData = {
        id: 'invalid-test',
        // Missing required properties
      };

      expect(() => observer.update(invalidData as any)).not.toThrow();
      expect(mockLogger.info).toHaveBeenCalled();
    });
  });

  describe('log level filtering', () => {
    it('should not log messages below the set log level', () => {
      let infoObserver: LoggingObserver;
      try {
        infoObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (infoObserver as any).logLevel = LogLevel.INFO;
      } catch (error) {
        infoObserver = new LoggingObserver(LogLevel.INFO);
      }

      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
      };

      infoObserver.update(testData);

      // Should not call debug since log level is INFO
      expect(mockLogger.debug).not.toHaveBeenCalled();
      expect(mockLogger.info).toHaveBeenCalled();
    });

    it('should log messages at or above the set log level', () => {
      let debugObserver: LoggingObserver;
      try {
        debugObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (debugObserver as any).logLevel = LogLevel.DEBUG;
      } catch (error) {
        debugObserver = new LoggingObserver(LogLevel.DEBUG);
      }

      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
      };

      debugObserver.update(testData);

      // Should call debug since log level is DEBUG
      expect(mockLogger.debug).toHaveBeenCalled();
    });
  });

  describe('performance', () => {
    it('should handle high frequency updates efficiently', () => {
      const startTime = performance.now();
      const iterations = 1000;

      for (let i = 0; i < iterations; i++) {
        observer.update({
          id: `test-unit-${i}`,
          value: i,
          unit: 'pixel',
          result: i,
          timestamp: new Date(),
        });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
      expect(mockLogger.info).toHaveBeenCalledTimes(iterations);
    });

    it('should not block execution with large data objects', () => {
      const largeData = {
        id: 'large-test',
        value: Array(1000).fill(0).map((_, i) => i),
        unit: 'pixel',
        result: Array(1000).fill(0).map((_, i) => i),
        timestamp: new Date(),
        metadata: {
          largeArray: Array(1000).fill(0).map((_, i) => ({ id: i, value: i })),
        },
      };

      const startTime = performance.now();
      observer.update(largeData);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(10); // Should complete quickly
      expect(mockLogger.info).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle logger errors gracefully', () => {
      // Mock logger to throw an error
      mockLogger.info.mockImplementation(() => {
        throw new Error('Logger error');
      });

      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
      };

      expect(() => observer.update(testData)).not.toThrow();
    });

    it('should handle malformed data gracefully', () => {
      const malformedData = {
        id: null,
        value: undefined,
        unit: 123,
        result: 'invalid',
        timestamp: 'not-a-date',
      };

      expect(() => observer.update(malformedData as any)).not.toThrow();
    });
  });

  describe('integration', () => {
    it('should work with different logger implementations', () => {
      const customLogger = {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        log: jest.fn(),
        getInstance: jest.fn().mockReturnThis(),
      };

      (Logger.getInstance as jest.Mock).mockReturnValue(customLogger);

      let customObserver: LoggingObserver;
      try {
        customObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
        (customObserver as any).logLevel = LogLevel.INFO;
      } catch (error) {
        customObserver = new LoggingObserver(LogLevel.INFO);
      }

      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
      };

      customObserver.update(testData);

      expect(customLogger.info).toHaveBeenCalled();
    });
  });
});
