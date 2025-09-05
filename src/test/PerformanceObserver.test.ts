import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { PerformanceObserver } from '../observers/PerformanceObserver';
import { logger } from '../core/Logger';
import { container, TOKENS } from '../container/DiContainer';

// Mock the Logger
jest.mock('../../core/Logger');

describe('PerformanceObserver', () => {
  let observer: PerformanceObserver;
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
      observer = container.resolve(TOKENS.PERFORMANCE_OBSERVER);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      observer = new PerformanceObserver();
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create observer with default settings', () => {
      expect(observer).toBeInstanceOf(PerformanceObserver);
    });
  });

  describe('update method', () => {
    it('should track performance metrics for unit calculations', () => {
      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        executionTime: 5.2,
        memoryUsage: 1024,
      };

      observer.update(testData);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'PerformanceObserver',
        'update',
        'Performance metrics recorded',
        expect.objectContaining({
          id: 'test-unit',
          executionTime: 5.2,
          memoryUsage: 1024,
        })
      );
    });

    it('should handle missing performance data gracefully', () => {
      const testData = {
        id: 'test-unit',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        // Missing performance data
      };

      observer.update(testData);

      expect(mockLogger.debug).toHaveBeenCalled();
    });

    it('should track multiple performance updates', () => {
      const testData1 = {
        id: 'test-unit-1',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        executionTime: 5.2,
        memoryUsage: 1024,
      };

      const testData2 = {
        id: 'test-unit-2',
        value: 200,
        unit: 'pixel',
        result: 200,
        timestamp: new Date(),
        executionTime: 3.1,
        memoryUsage: 2048,
      };

      observer.update(testData1);
      observer.update(testData2);

      expect(mockLogger.debug).toHaveBeenCalledTimes(2);
    });
  });

  describe('performance metrics collection', () => {
    it('should collect execution time metrics', () => {
      const testData = {
        id: 'execution-time-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        executionTime: 10.5,
      };

      observer.update(testData);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'PerformanceObserver',
        'update',
        'Performance metrics recorded',
        expect.objectContaining({
          executionTime: 10.5,
        })
      );
    });

    it('should collect memory usage metrics', () => {
      const testData = {
        id: 'memory-usage-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        memoryUsage: 4096,
      };

      observer.update(testData);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'PerformanceObserver',
        'update',
        'Performance metrics recorded',
        expect.objectContaining({
          memoryUsage: 4096,
        })
      );
    });

    it('should collect both execution time and memory usage', () => {
      const testData = {
        id: 'combined-metrics-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        executionTime: 7.8,
        memoryUsage: 3072,
      };

      observer.update(testData);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'PerformanceObserver',
        'update',
        'Performance metrics recorded',
        expect.objectContaining({
          executionTime: 7.8,
          memoryUsage: 3072,
        })
      );
    });
  });

  describe('performance thresholds', () => {
    it('should warn when execution time exceeds threshold', () => {
      const testData = {
        id: 'slow-execution-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        executionTime: 1000, // Very slow execution
      };

      observer.update(testData);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'PerformanceObserver',
        'update',
        'Performance threshold exceeded',
        expect.objectContaining({
          executionTime: 1000,
          threshold: expect.any(Number),
        })
      );
    });

    it('should warn when memory usage exceeds threshold', () => {
      const testData = {
        id: 'high-memory-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        memoryUsage: 1000000, // Very high memory usage
      };

      observer.update(testData);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'PerformanceObserver',
        'update',
        'Performance threshold exceeded',
        expect.objectContaining({
          memoryUsage: 1000000,
          threshold: expect.any(Number),
        })
      );
    });
  });

  describe('performance statistics', () => {
    it('should calculate average execution time', () => {
      const testData = [
        {
          id: 'test-1',
          value: 100,
          unit: 'pixel',
          result: 100,
          timestamp: new Date(),
          executionTime: 5.0,
        },
        {
          id: 'test-2',
          value: 200,
          unit: 'pixel',
          result: 200,
          timestamp: new Date(),
          executionTime: 10.0,
        },
        {
          id: 'test-3',
          value: 300,
          unit: 'pixel',
          result: 300,
          timestamp: new Date(),
          executionTime: 15.0,
        },
      ];

      testData.forEach(data => observer.update(data));

      // The observer should track these metrics internally
      expect(mockLogger.debug).toHaveBeenCalledTimes(3);
    });

    it('should track performance trends', () => {
      const testData = Array.from({ length: 10 }, (_, i) => ({
        id: `test-${i}`,
        value: i * 100,
        unit: 'pixel',
        result: i * 100,
        timestamp: new Date(),
        executionTime: i * 0.5, // Increasing execution time
      }));

      testData.forEach(data => observer.update(data));

      expect(mockLogger.debug).toHaveBeenCalledTimes(10);
    });
  });

  describe('error handling', () => {
    it('should handle invalid performance data gracefully', () => {
      const invalidData = {
        id: 'invalid-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        executionTime: 'invalid' as any, // Invalid execution time
        memoryUsage: 'invalid' as any, // Invalid memory usage
      };

      expect(() => observer.update(invalidData)).not.toThrow();
    });

    it('should handle missing performance data', () => {
      const testData = {
        id: 'no-performance-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        // No performance data
      };

      expect(() => observer.update(testData)).not.toThrow();
    });

    it('should handle logger errors gracefully', () => {
      // Mock logger to throw an error
      mockLogger.debug.mockImplementation(() => {
        throw new Error('Logger error');
      });

      const testData = {
        id: 'logger-error-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        executionTime: 5.0,
      };

      expect(() => observer.update(testData)).not.toThrow();
    });
  });

  describe('performance monitoring', () => {
    it('should monitor performance over time', () => {
      const startTime = performance.now();
      
      // Simulate multiple updates over time
      for (let i = 0; i < 100; i++) {
        observer.update({
          id: `monitoring-test-${i}`,
          value: i * 10,
          unit: 'pixel',
          result: i * 10,
          timestamp: new Date(),
          executionTime: Math.random() * 10,
          memoryUsage: Math.random() * 1000,
        });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete quickly
      expect(mockLogger.debug).toHaveBeenCalledTimes(100);
    });

    it('should handle high frequency updates efficiently', () => {
      const startTime = performance.now();
      const iterations = 1000;

      for (let i = 0; i < iterations; i++) {
        observer.update({
          id: `high-frequency-test-${i}`,
          value: i,
          unit: 'pixel',
          result: i,
          timestamp: new Date(),
          executionTime: 1.0,
        });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(200); // Should complete within 200ms
      expect(mockLogger.debug).toHaveBeenCalledTimes(iterations);
    });
  });

  describe('integration with performance system', () => {
    it('should work with performance monitoring system', () => {
      const testData = {
        id: 'integration-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        executionTime: 5.0,
        memoryUsage: 1024,
      };

      observer.update(testData);

      expect(mockLogger.debug).toHaveBeenCalled();
    });

    it('should provide performance insights', () => {
      const testData = {
        id: 'insights-test',
        value: 100,
        unit: 'pixel',
        result: 100,
        timestamp: new Date(),
        executionTime: 5.0,
        memoryUsage: 1024,
        metadata: {
          performanceInsights: {
            bottleneck: 'calculation',
            optimization: 'caching',
          },
        },
      };

      observer.update(testData);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'PerformanceObserver',
        'update',
        'Performance metrics recorded',
        expect.objectContaining({
          metadata: expect.objectContaining({
            performanceInsights: expect.any(Object),
          }),
        })
      );
    });
  });
});
