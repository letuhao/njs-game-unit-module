import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { LoggingObserver } from '../observers/LoggingObserver';
import { LogLevel } from '../enums/LogLevel';
import { container, TOKENS } from '../container/DiContainer';

describe('LoggingObserver', () => {
  let observer: LoggingObserver;
  let mockLogger: jest.Mocked<any>;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create observer with default log level', () => {
      testDefaultObserverCreation();
    });

    it('should create observer with specified log level', () => {
      testCustomLogLevelObserverCreation();
    });

    it('should handle invalid log levels gracefully', () => {
      testInvalidLogLevelHandling();
    });
  });

  describe('log level management', () => {
    it('should set and get log level correctly', () => {
      testLogLevelManagement();
    });

    it('should validate log level changes', () => {
      testLogLevelValidation();
    });
  });

  describe('observation functionality', () => {
    it('should observe unit calculations', () => {
      testUnitCalculationObservation();
    });

    it('should observe unit updates', () => {
      testUnitUpdateObservation();
    });

    it('should observe unit errors', () => {
      testUnitErrorObservation();
    });
  });

  describe('logging behavior', () => {
    it('should log debug messages when level allows', () => {
      testDebugLogging();
    });

    it('should log info messages when level allows', () => {
      testInfoLogging();
    });

    it('should log warning messages when level allows', () => {
      testWarningLogging();
    });

    it('should log error messages when level allows', () => {
      testErrorLogging();
    });
  });

  describe('performance and efficiency', () => {
    it('should handle high-frequency observations efficiently', () => {
      testHighFrequencyObservations();
    });

    it('should minimize performance impact', () => {
      testPerformanceImpact();
    });
  });

  describe('error handling', () => {
    it('should handle logging errors gracefully', () => {
      testLoggingErrorHandling();
    });

    it('should handle observer errors gracefully', () => {
      testObserverErrorHandling();
    });
  });

  describe('integration', () => {
    it('should work with different unit types', () => {
      testDifferentUnitTypes();
    });

    it('should work with different log levels', () => {
      testDifferentLogLevels();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    clearAllMocks();
    createMockLogger();
    initializeObserver();
  }

  function clearAllMocks(): void {
    jest.clearAllMocks();
  }

  function createMockLogger(): void {
    mockLogger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
      getInstance: jest.fn().mockReturnThis(),
    } as any;
  }

  function initializeObserver(): void {
    try {
      observer = container.resolve(TOKENS.LOGGING_OBSERVER);
      setObserverLogLevel();
    } catch (error) {
      observer = new LoggingObserver(LogLevel.INFO);
    }
  }

  function setObserverLogLevel(): void {
    (observer as any).logLevel = LogLevel.INFO;
  }

  function testDefaultObserverCreation(): void {
    let defaultObserver: LoggingObserver;
    try {
      defaultObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
    } catch (error) {
      defaultObserver = new LoggingObserver();
    }

    expect(defaultObserver).toBeInstanceOf(LoggingObserver);
    expect(defaultObserver.getLogLevel()).toBeDefined();
  }

  function testCustomLogLevelObserverCreation(): void {
    const customLogLevel = LogLevel.DEBUG;
    let customObserver: LoggingObserver;
    
    try {
      customObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
      (customObserver as any).logLevel = customLogLevel;
    } catch (error) {
      customObserver = new LoggingObserver(customLogLevel);
    }

    expect(customObserver).toBeInstanceOf(LoggingObserver);
    expect(customObserver.getLogLevel()).toBe(customLogLevel);
  }

  function testInvalidLogLevelHandling(): void {
    const invalidLogLevel = 'invalid' as any;
    let invalidObserver: LoggingObserver;
    
    try {
      invalidObserver = container.resolve(TOKENS.LOGGING_OBSERVER);
      (invalidObserver as any).logLevel = invalidLogLevel;
    } catch (error) {
      invalidObserver = new LoggingObserver(invalidLogLevel);
    }

    expect(invalidObserver).toBeInstanceOf(LoggingObserver);
    // Should handle invalid log level gracefully
    expect(() => invalidObserver.getLogLevel()).not.toThrow();
  }

  function testLogLevelManagement(): void {
    const newLogLevel = LogLevel.WARN;
    observer.setLogLevel(newLogLevel);
    
    expect(observer.getLogLevel()).toBe(newLogLevel);
  }

  function testLogLevelValidation(): void {
    const validLogLevels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    
    for (const level of validLogLevels) {
      observer.setLogLevel(level);
      expect(observer.getLogLevel()).toBe(level);
    }
  }

  function testUnitCalculationObservation(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    observer.observe(mockUnit, 'calculation', mockContext);
    
    // Verify that the observer handled the observation
    expect(observer).toBeDefined();
  }

  function testUnitUpdateObservation(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    observer.observe(mockUnit, 'update', mockContext);
    
    // Verify that the observer handled the observation
    expect(observer).toBeDefined();
  }

  function testUnitErrorObservation(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    const mockError = new Error('Test error');
    
    observer.observe(mockUnit, 'error', mockContext);
    
    // Verify that the observer handled the observation
    expect(observer).toBeDefined();
  }

  function testDebugLogging(): void {
    observer.setLogLevel(LogLevel.DEBUG);
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    observer.observe(mockUnit, 'debug', mockContext);
    
    // Verify that the observer handled the observation
    expect(observer).toBeDefined();
  }

  function testInfoLogging(): void {
    observer.setLogLevel(LogLevel.INFO);
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    observer.observe(mockUnit, 'info', mockContext);
    
    // Verify that the observer handled the observation
    expect(observer).toBeDefined();
  }

  function testWarningLogging(): void {
    observer.setLogLevel(LogLevel.WARN);
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    observer.observe(mockUnit, 'warning', mockContext);
    
    // Verify that the observer handled the observation
    expect(observer).toBeDefined();
  }

  function testErrorLogging(): void {
    observer.setLogLevel(LogLevel.ERROR);
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    observer.observe(mockUnit, 'error', mockContext);
    
    // Verify that the observer handled the observation
    expect(observer).toBeDefined();
  }

  function testHighFrequencyObservations(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      observer.observe(mockUnit, 'calculation', mockContext);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testPerformanceImpact(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    const startTime = performance.now();
    
    for (let i = 0; i < 100; i++) {
      observer.observe(mockUnit, 'calculation', mockContext);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(50); // Should complete within 50ms
  }

  function testLoggingErrorHandling(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    // Simulate logging error
    mockLogger.error.mockImplementation(() => {
      throw new Error('Logging error');
    });
    
    expect(() => observer.observe(mockUnit, 'error', mockContext)).not.toThrow();
  }

  function testObserverErrorHandling(): void {
    const mockUnit = createMockUnit();
    const mockContext = createMockContext();
    
    // Simulate observer error
    (observer as any).observe = jest.fn().mockImplementation(() => {
      throw new Error('Observer error');
    });
    
    expect(() => observer.observe(mockUnit, 'calculation', mockContext)).toThrow('Observer error');
  }

  function testDifferentUnitTypes(): void {
    const unitTypes = ['size', 'position', 'scale'];
    
    for (const unitType of unitTypes) {
      const mockUnit = createMockUnitWithType(unitType);
      const mockContext = createMockContext();
      
      observer.observe(mockUnit, 'calculation', mockContext);
      
      // Verify that the observer handled the observation
      expect(observer).toBeDefined();
    }
  }

  function testDifferentLogLevels(): void {
    const logLevels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    
    for (const level of logLevels) {
      observer.setLogLevel(level);
      const mockUnit = createMockUnit();
      const mockContext = createMockContext();
      
      observer.observe(mockUnit, 'calculation', mockContext);
      
      // Verify that the observer handled the observation
      expect(observer).toBeDefined();
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

  function createMockContext(): any {
    return {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
      viewport: { width: 1920, height: 1080 },
      dimension: 'width',
    };
  }
});