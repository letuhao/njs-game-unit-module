import {
  ProductionMonitoringSystem,
  MonitoringConfig,
} from '../monitoring/ProductionMonitoringSystem';
import { UnitContext } from '../interfaces/IUnit';
import { IUnitConfig } from '../interfaces/IUnitConfig';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { logger } from '../core/Logger';
import { container, TOKENS } from '../container/DiContainer';

describe('ProductionMonitoringSystem', () => {
  let monitoringSystem: ProductionMonitoringSystem;
  let config: MonitoringConfig;
  let loggerSpy: any;

  beforeEach(() => {
    // Mock Logger instance
    const mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };

    loggerSpy = mockLogger.info;
    jest.spyOn(Logger, 'getInstance').mockReturnValue(mockLogger as any);

    config = {
      enabled: true,
      metricsCollectionInterval: 1000,
      healthCheckInterval: 2000,
      alertingEnabled: true,
      performanceThresholds: {
        maxExecutionTime: 100,
        maxMemoryUsage: 1024 * 1024, // 1MB
        minThroughput: 10,
        maxErrorRate: 5,
      },
    };
    
    // Use DI container to resolve monitoring system instead of direct instantiation
    try {
      monitoringSystem = container.resolve(TOKENS.PRODUCTION_MONITORING_SYSTEM);
      // Set config for the resolved monitoring system
      (monitoringSystem as any).config = config;
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      monitoringSystem = new ProductionMonitoringSystem(config);
    }
  });

  afterEach(() => {
    monitoringSystem.stop();
    jest.restoreAllMocks();
  });

  describe('Constructor and Configuration', () => {
    it('should create monitoring system with correct configuration', () => {
      expect(monitoringSystem).toBeInstanceOf(ProductionMonitoringSystem);
    });

    it('should initialize with default configuration when none provided', () => {
      let defaultMonitoringSystem: ProductionMonitoringSystem;
      try {
        defaultMonitoringSystem = container.resolve(TOKENS.PRODUCTION_MONITORING_SYSTEM);
        (defaultMonitoringSystem as any).config = {};
      } catch (error) {
        defaultMonitoringSystem = new ProductionMonitoringSystem({} as MonitoringConfig);
      }

      expect(defaultMonitoringSystem).toBeInstanceOf(ProductionMonitoringSystem);
    });

    it('should apply custom configuration correctly', () => {
      const customConfig: MonitoringConfig = {
        enabled: false,
        metricsCollectionInterval: 500,
        healthCheckInterval: 1000,
        alertingEnabled: false,
        performanceThresholds: {
          maxExecutionTime: 50,
          maxMemoryUsage: 512 * 1024,
          minThroughput: 20,
          maxErrorRate: 2,
        },
      };

      let customMonitoringSystem: ProductionMonitoringSystem;
      try {
        customMonitoringSystem = container.resolve(TOKENS.PRODUCTION_MONITORING_SYSTEM);
        (customMonitoringSystem as any).config = customConfig;
      } catch (error) {
        customMonitoringSystem = new ProductionMonitoringSystem(customConfig);
      }

      expect(customMonitoringSystem).toBeInstanceOf(ProductionMonitoringSystem);
    });
  });

  describe('System Lifecycle', () => {
    it('should start monitoring system', () => {
      expect(() => monitoringSystem.start()).not.toThrow();
    });

    it('should stop monitoring system', () => {
      monitoringSystem.start();
      expect(() => monitoringSystem.stop()).not.toThrow();
    });

    it('should restart monitoring system', () => {
      monitoringSystem.start();
      monitoringSystem.stop();
      expect(() => monitoringSystem.start()).not.toThrow();
    });

    it('should handle multiple start calls gracefully', () => {
      monitoringSystem.start();
      expect(() => monitoringSystem.start()).not.toThrow();
    });

    it('should handle multiple stop calls gracefully', () => {
      monitoringSystem.start();
      monitoringSystem.stop();
      expect(() => monitoringSystem.stop()).not.toThrow();
    });
  });

  describe('Metrics Collection', () => {
    beforeEach(() => {
      monitoringSystem.start();
    });

    it('should collect performance metrics', () => {
      const metrics = {
        executionTime: 50,
        memoryUsage: 1024,
        throughput: 15,
        errorRate: 2,
      };

      expect(() => monitoringSystem.recordMetrics(metrics)).not.toThrow();
    });

    it('should collect unit calculation metrics', () => {
      const unitContext: UnitContext = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1920, height: 1080 },
        content: { width: 100, height: 100 },
        dimension: Dimension.WIDTH,
      };

      const unitConfig: IUnitConfig = {
        id: 'test-unit',
        name: 'Test Unit',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: SizeValue.PIXEL,
      };

      expect(() => monitoringSystem.recordUnitCalculation(unitContext, unitConfig, 100, 50)).not.toThrow();
    });

    it('should collect error metrics', () => {
      const error = new Error('Test error');
      const context = { unitId: 'test-unit', operation: 'calculation' };

      expect(() => monitoringSystem.recordError(error, context)).not.toThrow();
    });

    it('should collect custom metrics', () => {
      const customMetrics = {
        customMetric1: 100,
        customMetric2: 'test',
        customMetric3: { nested: true },
      };

      expect(() => monitoringSystem.recordCustomMetrics(customMetrics)).not.toThrow();
    });
  });

  describe('Health Checks', () => {
    beforeEach(() => {
      monitoringSystem.start();
    });

    it('should perform health checks', () => {
      const healthStatus = monitoringSystem.getHealthStatus();
      
      expect(healthStatus).toBeDefined();
      expect(healthStatus.status).toBeDefined();
      expect(healthStatus.timestamp).toBeDefined();
      expect(healthStatus.metrics).toBeDefined();
    });

    it('should detect healthy system status', () => {
      const healthStatus = monitoringSystem.getHealthStatus();
      
      expect(healthStatus.status).toBe('healthy');
    });

    it('should detect unhealthy system status when thresholds exceeded', () => {
      // Record metrics that exceed thresholds
      const badMetrics = {
        executionTime: 200, // Exceeds maxExecutionTime: 100
        memoryUsage: 2 * 1024 * 1024, // Exceeds maxMemoryUsage: 1MB
        throughput: 5, // Below minThroughput: 10
        errorRate: 10, // Exceeds maxErrorRate: 5
      };

      monitoringSystem.recordMetrics(badMetrics);
      
      const healthStatus = monitoringSystem.getHealthStatus();
      expect(healthStatus.status).toBe('unhealthy');
    });
  });

  describe('Alerting', () => {
    beforeEach(() => {
      monitoringSystem.start();
    });

    it('should trigger alerts when thresholds exceeded', () => {
      const badMetrics = {
        executionTime: 200,
        memoryUsage: 2 * 1024 * 1024,
        throughput: 5,
        errorRate: 10,
      };

      monitoringSystem.recordMetrics(badMetrics);
      
      // Should trigger alerts
      expect(loggerSpy).toHaveBeenCalledWith(
        'ProductionMonitoringSystem',
        'checkThresholds',
        'Performance threshold exceeded',
        expect.objectContaining({
          metric: expect.any(String),
          value: expect.any(Number),
          threshold: expect.any(Number),
        })
      );
    });

    it('should not trigger alerts when thresholds not exceeded', () => {
      const goodMetrics = {
        executionTime: 50,
        memoryUsage: 512 * 1024,
        throughput: 15,
        errorRate: 2,
      };

      monitoringSystem.recordMetrics(goodMetrics);
      
      // Should not trigger alerts
      expect(loggerSpy).not.toHaveBeenCalledWith(
        'ProductionMonitoringSystem',
        'checkThresholds',
        'Performance threshold exceeded',
        expect.any(Object)
      );
    });

    it('should handle alerting when disabled', () => {
      let disabledMonitoringSystem: ProductionMonitoringSystem;
      try {
        disabledMonitoringSystem = container.resolve(TOKENS.PRODUCTION_MONITORING_SYSTEM);
        (disabledMonitoringSystem as any).config = { ...config, alertingEnabled: false };
      } catch (error) {
        disabledMonitoringSystem = new ProductionMonitoringSystem({ ...config, alertingEnabled: false });
      }

      disabledMonitoringSystem.start();

      const badMetrics = {
        executionTime: 200,
        memoryUsage: 2 * 1024 * 1024,
        throughput: 5,
        errorRate: 10,
      };

      expect(() => disabledMonitoringSystem.recordMetrics(badMetrics)).not.toThrow();
    });
  });

  describe('Performance Monitoring', () => {
    beforeEach(() => {
      monitoringSystem.start();
    });

    it('should track execution time trends', () => {
      const executionTimes = [50, 60, 70, 80, 90];
      
      executionTimes.forEach(time => {
        monitoringSystem.recordMetrics({ executionTime: time });
      });

      const healthStatus = monitoringSystem.getHealthStatus();
      expect(healthStatus.metrics.executionTime).toBeDefined();
    });

    it('should track memory usage trends', () => {
      const memoryUsages = [1024, 2048, 3072, 4096, 5120];
      
      memoryUsages.forEach(usage => {
        monitoringSystem.recordMetrics({ memoryUsage: usage });
      });

      const healthStatus = monitoringSystem.getHealthStatus();
      expect(healthStatus.metrics.memoryUsage).toBeDefined();
    });

    it('should track throughput trends', () => {
      const throughputs = [10, 15, 20, 25, 30];
      
      throughputs.forEach(throughput => {
        monitoringSystem.recordMetrics({ throughput });
      });

      const healthStatus = monitoringSystem.getHealthStatus();
      expect(healthStatus.metrics.throughput).toBeDefined();
    });

    it('should track error rate trends', () => {
      const errorRates = [1, 2, 3, 4, 5];
      
      errorRates.forEach(errorRate => {
        monitoringSystem.recordMetrics({ errorRate });
      });

      const healthStatus = monitoringSystem.getHealthStatus();
      expect(healthStatus.metrics.errorRate).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      monitoringSystem.start();
    });

    it('should handle invalid metrics gracefully', () => {
      const invalidMetrics = {
        executionTime: 'invalid' as any,
        memoryUsage: null as any,
        throughput: undefined as any,
        errorRate: {} as any,
      };

      expect(() => monitoringSystem.recordMetrics(invalidMetrics)).not.toThrow();
    });

    it('should handle missing context gracefully', () => {
      const unitConfig: IUnitConfig = {
        id: 'test-unit',
        name: 'Test Unit',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: SizeValue.PIXEL,
      };

      expect(() => monitoringSystem.recordUnitCalculation(null as any, unitConfig, 100, 50)).not.toThrow();
    });

    it('should handle missing unit config gracefully', () => {
      const unitContext: UnitContext = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1920, height: 1080 },
        content: { width: 100, height: 100 },
        dimension: Dimension.WIDTH,
      };

      expect(() => monitoringSystem.recordUnitCalculation(unitContext, null as any, 100, 50)).not.toThrow();
    });

    it('should handle logger errors gracefully', () => {
      // Mock logger to throw an error
      const mockLogger = {
        info: jest.fn().mockImplementation(() => {
          throw new Error('Logger error');
        }),
        warn: jest.fn(),
        error: jest.fn(),
        debug: jest.fn(),
        log: jest.fn(),
      };

      jest.spyOn(Logger, 'getInstance').mockReturnValue(mockLogger as any);

      const metrics = { executionTime: 50 };
      expect(() => monitoringSystem.recordMetrics(metrics)).not.toThrow();
    });
  });

  describe('System Integration', () => {
    it('should work with different monitoring configurations', () => {
      const configs = [
        { enabled: true, metricsCollectionInterval: 1000 },
        { enabled: false, metricsCollectionInterval: 500 },
        { alertingEnabled: true, performanceThresholds: { maxExecutionTime: 50 } },
        { alertingEnabled: false, performanceThresholds: { maxMemoryUsage: 512 * 1024 } },
      ];

      for (const config of configs) {
        let testMonitoringSystem: ProductionMonitoringSystem;
        try {
          testMonitoringSystem = container.resolve(TOKENS.PRODUCTION_MONITORING_SYSTEM);
          (testMonitoringSystem as any).config = { ...config };
        } catch (error) {
          testMonitoringSystem = new ProductionMonitoringSystem(config as MonitoringConfig);
        }

        expect(testMonitoringSystem).toBeInstanceOf(ProductionMonitoringSystem);
        expect(() => testMonitoringSystem.start()).not.toThrow();
        expect(() => testMonitoringSystem.stop()).not.toThrow();
      }
    });

    it('should work with different unit types', () => {
      const unitConfigs = [
        { id: 'size-unit', sizeUnit: SizeUnit.PIXEL, dimension: Dimension.WIDTH },
        { id: 'position-unit', positionUnit: 'pixel' as any, dimension: Dimension.X },
        { id: 'scale-unit', scaleUnit: 'factor' as any, dimension: Dimension.BOTH },
      ];

      for (const unitConfig of unitConfigs) {
        expect(() => monitoringSystem.recordUnitCalculation(mockContext, unitConfig as any, 100, 50)).not.toThrow();
      }
    });
  });

  describe('Performance and Scalability', () => {
    beforeEach(() => {
      monitoringSystem.start();
    });

    it('should handle high frequency metrics collection', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        monitoringSystem.recordMetrics({
          executionTime: Math.random() * 100,
          memoryUsage: Math.random() * 1024 * 1024,
          throughput: Math.random() * 20,
          errorRate: Math.random() * 10,
        });
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should handle concurrent operations', () => {
      const promises = [];
      
      for (let i = 0; i < 100; i++) {
        promises.push(
          new Promise(resolve => {
            setTimeout(() => {
              monitoringSystem.recordMetrics({
                executionTime: Math.random() * 100,
                memoryUsage: Math.random() * 1024 * 1024,
              });
              resolve(undefined);
            }, Math.random() * 10);
          })
        );
      }

      return Promise.all(promises).then(() => {
        const healthStatus = monitoringSystem.getHealthStatus();
        expect(healthStatus).toBeDefined();
      });
    });
  });
});
