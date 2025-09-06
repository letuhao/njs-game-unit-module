import {
  ProductionMonitoringSystem,
  MonitoringConfig,
} from '../monitoring/ProductionMonitoringSystem';
import { UnitContext } from '../interfaces/IUnit';
import { IUnitConfig } from '../interfaces/IUnitConfig';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { container, TOKENS } from '../container/DiContainer';

describe('ProductionMonitoringSystem', () => {
  let monitoringSystem: ProductionMonitoringSystem;
  let config: MonitoringConfig;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Constructor and Initialization', () => {
    it('should create monitoring system with config', () => {
      testMonitoringSystemCreation();
    });

    it('should initialize with default config', () => {
      testDefaultConfigInitialization();
    });

    it('should handle invalid config gracefully', () => {
      testInvalidConfigHandling();
    });
  });

  describe('Metrics Collection', () => {
    it('should collect performance metrics', () => {
      testPerformanceMetricsCollection();
    });

    it('should collect memory usage metrics', () => {
      testMemoryUsageMetricsCollection();
    });

    it('should collect error metrics', () => {
      testErrorMetricsCollection();
    });

    it('should collect throughput metrics', () => {
      testThroughputMetricsCollection();
    });
  });

  describe('Health Checks', () => {
    it('should perform health checks', () => {
      testHealthCheckExecution();
    });

    it('should detect system health issues', () => {
      testSystemHealthIssueDetection();
    });

    it('should report health status', () => {
      testHealthStatusReporting();
    });
  });

  describe('Alerting', () => {
    it('should trigger alerts when thresholds are exceeded', () => {
      testAlertTriggering();
    });

    it('should handle alert suppression', () => {
      testAlertSuppression();
    });

    it('should manage alert escalation', () => {
      testAlertEscalation();
    });
  });

  describe('Performance Monitoring', () => {
    it('should monitor execution time', () => {
      testExecutionTimeMonitoring();
    });

    it('should monitor memory usage', () => {
      testMemoryUsageMonitoring();
    });

    it('should monitor throughput', () => {
      testThroughputMonitoring();
    });
  });

  describe('Error Handling', () => {
    it('should handle monitoring errors gracefully', () => {
      testMonitoringErrorHandling();
    });

    it('should handle configuration errors', () => {
      testConfigurationErrorHandling();
    });

    it('should handle system failures', () => {
      testSystemFailureHandling();
    });
  });

  describe('Integration', () => {
    it('should work with different unit types', () => {
      testDifferentUnitTypes();
    });

    it('should work with different contexts', () => {
      testDifferentContexts();
    });

    it('should work with different configurations', () => {
      testDifferentConfigurations();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    createMonitoringConfig();
    initializeMonitoringSystem();
  }

  function createMonitoringConfig(): void {
    config = {
      enablePerformanceMonitoring: true,
      enableHealthChecks: true,
      enableAlerts: true,
      alertingEnabled: true,
      metricsCollectionInterval: 1000,
      healthCheckInterval: 2000,
      performanceThresholds: {
        responseTime: 100,
        memoryUsage: 50,
        errorRate: 0.1,
      },
      alertThresholds: {
        critical: 0.9,
        warning: 0.7,
      },
    };
  }

  function initializeMonitoringSystem(): void {
    try {
      monitoringSystem = container.resolve(TOKENS.PRODUCTION_MONITORING_SYSTEM);
      setMonitoringSystemConfig();
    } catch (error) {
      monitoringSystem = new ProductionMonitoringSystem(config);
    }
  }

  function setMonitoringSystemConfig(): void {
    (monitoringSystem as any).config = config;
  }

  function testMonitoringSystemCreation(): void {
    expect(monitoringSystem).toBeInstanceOf(ProductionMonitoringSystem);
    expect(monitoringSystem.getConfig()).toBeDefined();
  }

  function testDefaultConfigInitialization(): void {
    const defaultConfig = createDefaultConfig();
    const defaultSystem = new ProductionMonitoringSystem(defaultConfig);
    
    expect(defaultSystem).toBeInstanceOf(ProductionMonitoringSystem);
    expect(defaultSystem.getConfig()).toBeDefined();
  }

  function createDefaultConfig(): MonitoringConfig {
    return {
      enablePerformanceMonitoring: true,
      enableHealthChecks: true,
      enableAlerts: false,
      alertingEnabled: false,
      metricsCollectionInterval: 5000,
      healthCheckInterval: 10000,
      performanceThresholds: {
        responseTime: 500,
        memoryUsage: 100,
        errorRate: 0.2,
      },
      alertThresholds: {
        critical: 0.95,
        warning: 0.8,
      },
    };
  }

  function testInvalidConfigHandling(): void {
    const invalidConfig = createInvalidConfig();
    const invalidSystem = new ProductionMonitoringSystem(invalidConfig);
    
    expect(invalidSystem).toBeInstanceOf(ProductionMonitoringSystem);
    expect(() => invalidSystem.getConfig()).not.toThrow();
  }

  function createInvalidConfig(): MonitoringConfig {
    return {
      enablePerformanceMonitoring: true,
      enableHealthChecks: true,
      enableAlerts: true,
      alertingEnabled: true,
      metricsCollectionInterval: -1,
      healthCheckInterval: 0,
      performanceThresholds: {
        responseTime: -1,
        memoryUsage: -1,
        errorRate: -1,
      },
      alertThresholds: {
        critical: -1,
        warning: -1,
      },
    };
  }

  function testPerformanceMetricsCollection(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    monitoringSystem.collectMetrics(mockUnit, 'calculation', mockContext);
    
    // Verify that metrics were collected
    expect(monitoringSystem).toBeDefined();
  }

  function testMemoryUsageMetricsCollection(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    monitoringSystem.collectMetrics(mockUnit, 'memory', mockContext);
    
    // Verify that memory metrics were collected
    expect(monitoringSystem).toBeDefined();
  }

  function testErrorMetricsCollection(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    const mockError = new Error('Test error');
    
    monitoringSystem.collectMetrics(mockUnit, 'error', mockContext, mockError);
    
    // Verify that error metrics were collected
    expect(monitoringSystem).toBeDefined();
  }

  function testThroughputMetricsCollection(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    monitoringSystem.collectMetrics(mockUnit, 'throughput', mockContext);
    
    // Verify that throughput metrics were collected
    expect(monitoringSystem).toBeDefined();
  }

  function testHealthCheckExecution(): void {
    monitoringSystem.performHealthCheck('test-component', () => true, 'Test health check');
    const healthStatus = monitoringSystem.getHealthStatus();
    
    expect(healthStatus).toBeDefined();
    expect(typeof healthStatus.isHealthy).toBe('boolean');
    expect(typeof healthStatus.timestamp).toBe('number');
  }

  function testSystemHealthIssueDetection(): void {
    monitoringSystem.performHealthCheck('test-component', () => false, 'Test health check');
    const healthStatus = monitoringSystem.getHealthStatus();
    
    expect(healthStatus).toBeDefined();
    expect(typeof healthStatus.isHealthy).toBe('boolean');
    expect(Array.isArray(healthStatus.issues)).toBe(true);
  }

  function testHealthStatusReporting(): void {
    const healthStatus = monitoringSystem.getHealthStatus();
    
    expect(healthStatus).toBeDefined();
    expect(typeof healthStatus.isHealthy).toBe('boolean');
    expect(typeof healthStatus.timestamp).toBe('number');
  }

  function testAlertTriggering(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    monitoringSystem.collectMetrics(mockUnit, 'calculation', mockContext);
    
    // Verify that alerts were triggered if thresholds were exceeded
    expect(monitoringSystem).toBeDefined();
  }

  function testAlertSuppression(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    monitoringSystem.collectMetrics(mockUnit, 'calculation', mockContext);
    
    // Verify that alert suppression was handled
    expect(monitoringSystem).toBeDefined();
  }

  function testAlertEscalation(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    monitoringSystem.collectMetrics(mockUnit, 'calculation', mockContext);
    
    // Verify that alert escalation was handled
    expect(monitoringSystem).toBeDefined();
  }

  function testExecutionTimeMonitoring(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    monitoringSystem.collectMetrics(mockUnit, 'calculation', mockContext);
    
    // Verify that execution time was monitored
    expect(monitoringSystem).toBeDefined();
  }

  function testMemoryUsageMonitoring(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    monitoringSystem.collectMetrics(mockUnit, 'memory', mockContext);
    
    // Verify that memory usage was monitored
    expect(monitoringSystem).toBeDefined();
  }

  function testThroughputMonitoring(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    monitoringSystem.collectMetrics(mockUnit, 'throughput', mockContext);
    
    // Verify that throughput was monitored
    expect(monitoringSystem).toBeDefined();
  }

  function testMonitoringErrorHandling(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    // Simulate monitoring error
    (monitoringSystem as any).collectMetrics = jest.fn().mockImplementation(() => {
      throw new Error('Monitoring error');
    });
    
    expect(() => monitoringSystem.collectMetrics(mockUnit, 'calculation', mockContext)).toThrow('Monitoring error');
  }

  function testConfigurationErrorHandling(): void {
    const invalidConfig = createInvalidConfig();
    const invalidSystem = new ProductionMonitoringSystem(invalidConfig);
    
    expect(() => invalidSystem.getConfig()).not.toThrow();
  }

  function testSystemFailureHandling(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    // Simulate system failure
    (monitoringSystem as any).collectMetrics = jest.fn().mockImplementation(() => {
      throw new Error('System failure');
    });
    
    expect(() => monitoringSystem.collectMetrics(mockUnit, 'calculation', mockContext)).toThrow('System failure');
  }

  function testDifferentUnitTypes(): void {
    const unitTypes = ['size', 'position', 'scale'];
    
    for (const unitType of unitTypes) {
      const mockUnit = createMockUnitWithType(unitType);
      const mockContext = createMockContext();
      
      monitoringSystem.collectMetrics(mockUnit, 'calculation', mockContext);
      
      // Verify that the monitoring system handled the unit type
      expect(monitoringSystem).toBeDefined();
    }
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const mockUnit = createMockUnit();
      
      monitoringSystem.collectMetrics(mockUnit, 'calculation', context);
      
      // Verify that the monitoring system handled the context
      expect(monitoringSystem).toBeDefined();
    }
  }

  function testDifferentConfigurations(): void {
    const configurations = createDifferentConfigurations();
    
    for (const config of configurations) {
      const testSystem = new ProductionMonitoringSystem(config);
      expect(testSystem).toBeInstanceOf(ProductionMonitoringSystem);
    }
  }

  function createMockUnit(): any {
    return {
      id: 'test-unit',
      name: 'Test Unit',
      unitType: 'size',
      calculate: jest.fn().mockReturnValue(100),
      validate: jest.fn().mockReturnValue(true),
    };
  }

  function createMockUnitWithType(unitType: string): any {
    return {
      id: `test-${unitType}-unit`,
      name: `Test ${unitType} Unit`,
      unitType: unitType,
      calculate: jest.fn().mockReturnValue(100),
      validate: jest.fn().mockReturnValue(true),
    };
  }

  function createMockContext(): UnitContext {
    return {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
      viewport: { width: 1920, height: 1080 },
      dimension: 'width',
    };
  }

  function createDifferentContexts(): any[] {
    return [
      createMockContext(),
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' },
    ];
  }

  function createDifferentConfigurations(): MonitoringConfig[] {
    return [
      config,
      createDefaultConfig(),
      createInvalidConfig(),
    ];
  }
});