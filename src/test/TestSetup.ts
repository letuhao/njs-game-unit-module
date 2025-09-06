/**
 * Test Setup and Configuration
 * Applies solid-tests conditions and expectations to our unit tests
 */

import { TestConditions } from './TestConditions';
import { TestExpectations } from './TestExpectations';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';
import { container, TOKENS } from '../container/DiContainer';

/**
 * Test Setup Class
 * Provides standardized setup for all test categories
 */
export class TestSetup {
  /**
   * Setup test environment with DI container
   */
  static setupTestEnvironment(): void {
    // Reset container for clean test state
    container.clear();
    
    // Setup default services
    this.setupDefaultServices();
  }

  /**
   * Setup default services in DI container
   */
  static setupDefaultServices(): void {
    // Register strategy registry
    container.registerSingleton(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY, () => {
      const registry = new SizeValueCalculationStrategyRegistry();
      TestConditions.setupStrategyRegistry(registry);
      return registry;
    });

    // Register other services as needed
    // This can be extended based on test requirements
  }

  /**
   * Setup functional equivalence test
   */
  static setupFunctionalEquivalenceTest(): {
    mockContext: any;
    strategyRegistry: SizeValueCalculationStrategyRegistry;
  } {
    const mockContext = TestConditions.createMockContext();
    const strategyRegistry = TestConditions.createMockRegistry();
    
    return { mockContext, strategyRegistry };
  }

  /**
   * Setup performance test
   */
  static setupPerformanceTest(): {
    mockContext: any;
    strategyRegistry: SizeValueCalculationStrategyRegistry;
    iterations: number;
  } {
    const mockContext = TestConditions.createMockContext();
    const strategyRegistry = TestConditions.createMockRegistry();
    const iterations = TestConditions.PERFORMANCE_TESTS.BASIC_ITERATIONS;
    
    return { mockContext, strategyRegistry, iterations };
  }

  /**
   * Setup high volume performance test
   */
  static setupHighVolumePerformanceTest(): {
    mockContext: any;
    strategyRegistry: SizeValueCalculationStrategyRegistry;
    iterations: number;
  } {
    const mockContext = TestConditions.createMockContext();
    const strategyRegistry = TestConditions.createMockRegistry();
    const iterations = TestConditions.PERFORMANCE_TESTS.HIGH_VOLUME_ITERATIONS;
    
    return { mockContext, strategyRegistry, iterations };
  }

  /**
   * Setup extensibility test
   */
  static setupExtensibilityTest(): {
    mockContext: any;
    strategyRegistry: SizeValueCalculationStrategyRegistry;
    customStrategy: any;
    highPriorityStrategy: any;
  } {
    const mockContext = TestConditions.createMockContext();
    const strategyRegistry = TestConditions.createMockRegistry();
    const customStrategy = TestConditions.createCustomStrategy();
    const highPriorityStrategy = TestConditions.createHighPriorityStrategy();
    
    return { mockContext, strategyRegistry, customStrategy, highPriorityStrategy };
  }

  /**
   * Setup testability test
   */
  static setupTestabilityTest(): {
    mockContext: any;
    mockRegistry: any;
    expectedProperties: string[];
  } {
    const mockContext = TestConditions.createMockContext();
    const mockRegistry = TestConditions.createMockRegistry();
    const expectedProperties = TestConditions.TESTABILITY_TESTS.MOCK_CONTEXT_PROPERTIES;
    
    return { mockContext, mockRegistry, expectedProperties: [...expectedProperties] };
  }

  /**
   * Setup code metrics test
   */
  static setupCodeMetricsTest(): {
    mockContext: any;
    strategyRegistry: SizeValueCalculationStrategyRegistry;
  } {
    const mockContext = TestConditions.createMockContext();
    const strategyRegistry = TestConditions.createMockRegistry();
    
    return { mockContext, strategyRegistry };
  }

  /**
   * Setup DI container test
   */
  static setupDIContainerTest(): {
    container: any;
    testToken: symbol;
    testFactory: () => any;
  } {
    const testToken = Symbol('TestToken');
    const testFactory = () => ({ test: 'value' });
    
    return { container, testToken, testFactory };
  }

  /**
   * Setup strategy pattern test
   */
  static setupStrategyPatternTest(): {
    mockContext: any;
    strategyRegistry: SizeValueCalculationStrategyRegistry;
    testStrategy: any;
  } {
    const mockContext = TestConditions.createMockContext();
    const strategyRegistry = TestConditions.createMockRegistry();
    const testStrategy = TestConditions.createCustomStrategy();
    
    return { mockContext, strategyRegistry, testStrategy };
  }

  /**
   * Setup decorator test
   */
  static setupDecoratorTest(): {
    mockContext: any;
    targetObject: any;
    decorator: any;
  } {
    const mockContext = TestConditions.createMockContext();
    const targetObject = {
      calculate: (context: any) => 100,
      validate: () => true,
    };
    const decorator = {
      decorate: (target: any) => ({
        ...target,
        decorated: true,
        calculate: (context: any) => target.calculate(context),
      }),
    };
    
    return { mockContext, targetObject, decorator };
  }

  /**
   * Setup error handling test
   */
  static setupErrorHandlingTest(): {
    mockContext: any;
    errorFunction: () => void;
    recoveryFunction: () => any;
  } {
    const mockContext = TestConditions.createMockContext();
    const errorFunction = () => {
      throw new Error('Test error');
    };
    const recoveryFunction = () => ({ recovered: true });
    
    return { mockContext, errorFunction, recoveryFunction };
  }

  /**
   * Setup integration test
   */
  static setupIntegrationTest(): {
    mockContext: any;
    components: any[];
    integrationTest: () => any;
  } {
    const mockContext = TestConditions.createMockContext();
    const strategyRegistry = TestConditions.createMockRegistry();
    const components = [strategyRegistry, mockContext];
    const integrationTest = () => {
      // Simulate integration test
      return { success: true, components: components.length };
    };
    
    return { mockContext, components, integrationTest };
  }

  /**
   * Cleanup after test
   */
  static cleanup(): void {
    // Clear container
    container.clear();
    
    // Force garbage collection if available
    if (typeof global !== 'undefined' && global.gc) {
      global.gc();
    }
  }

  /**
   * Validate test results
   */
  static validateTestResults(results: any, testType: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    switch (testType) {
      case 'functional-equivalence':
        if (results.originalResult !== undefined && results.refactoredResult !== undefined) {
          const validation = TestConditions.validateFunctionalEquivalence(
            results.originalResult,
            results.refactoredResult
          );
          if (!validation.isValid) {
            errors.push(...validation.errors);
          }
        }
        break;

      case 'performance':
        if (results.performanceRatio !== undefined) {
          const validation = TestConditions.validatePerformanceResults(results);
          if (!validation.isValid) {
            errors.push(...validation.errors);
          }
        }
        break;

      case 'memory':
        if (results.originalMemory !== undefined && results.refactoredMemory !== undefined) {
          const validation = TestConditions.validateMemoryResults(results);
          if (!validation.isValid) {
            errors.push(...validation.errors);
          }
        }
        break;

      default:
        errors.push(`Unknown test type: ${testType}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Run test with proper setup and cleanup
   */
  static async runTestWithSetup<T>(
    testFunction: () => T,
    setupFunction: () => void = () => this.setupTestEnvironment(),
    cleanupFunction: () => void = () => this.cleanup()
  ): Promise<T> {
    try {
      setupFunction();
      return testFunction();
    } finally {
      cleanupFunction();
    }
  }

  /**
   * Run performance test with measurement
   */
  static runPerformanceTest<T>(
    testFunction: () => T,
    iterations: number = TestConditions.PERFORMANCE_TESTS.BASIC_ITERATIONS
  ): { result: T; duration: number; iterations: number } {
    const startTime = performance.now();
    const result = testFunction();
    const endTime = performance.now();
    const duration = endTime - startTime;

    return { result, duration, iterations };
  }

  /**
   * Run memory test with measurement
   */
  static runMemoryTest<T>(
    testFunction: () => T
  ): { result: T; memoryBefore: number; memoryAfter: number; memoryUsed: number } {
    const memoryBefore = TestConditions.getMemoryUsage();
    const result = testFunction();
    const memoryAfter = TestConditions.getMemoryUsage();
    const memoryUsed = memoryAfter - memoryBefore;

    return { result, memoryBefore, memoryAfter, memoryUsed };
  }
}
