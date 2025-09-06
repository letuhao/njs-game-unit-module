/**
 * Test Conditions and Expectations
 * Based on solid-tests patterns and requirements
 */

import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { RefactoredSizeUnitCalculator } from '../classes/RefactoredSizeUnitCalculator';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';
import {
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy,
  ParentWidthSizeValueCalculationStrategy,
  ViewportWidthSizeValueCalculationStrategy,
} from '../strategies/value';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { UnitType } from '../enums/UnitType';

/**
 * Test Conditions and Expectations Class
 * Provides standardized test conditions based on solid-tests patterns
 */
export class TestConditions {
  /**
   * Performance thresholds from solid-tests
   */
  static readonly PERFORMANCE_THRESHOLDS = {
    MAX_PERFORMANCE_RATIO: 50.0, // Refactored should not be more than 50x slower
    MAX_EXECUTION_TIME_MS: 1000, // 1 second max execution time
    MAX_MEMORY_USAGE_MB: 100, // 100MB max memory usage
    MIN_ITERATIONS: 1000, // Minimum iterations for performance tests
    HIGH_VOLUME_ITERATIONS: 10000, // High volume test iterations
  } as const;

  /**
   * Extensibility test constants
   */
  static readonly EXTENSIBILITY_TESTS = {
    CUSTOM_STRATEGY_ID: 'custom-strategy',
    HIGH_PRIORITY_STRATEGY_ID: 'high-priority-strategy',
    CUSTOM_STRATEGY_RESULT: 42,
    HIGH_PRIORITY_STRATEGY_RESULT: 84,
    LOW_PRIORITY_VALUE: 21,
    HIGH_PRIORITY_VALUE: 42,
  } as const;

  /**
   * Test data sets from solid-tests
   */
  static readonly TEST_DATA = {
    MOCK_CONTEXT: {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    },
    SIZE_UNITS: [
      SizeUnit.PIXEL,
      SizeUnit.PERCENTAGE,
      SizeUnit.PARENT_WIDTH,
      SizeUnit.PARENT_HEIGHT,
      SizeUnit.SCENE_WIDTH,
      SizeUnit.SCENE_HEIGHT,
      SizeUnit.VIEWPORT_WIDTH,
      SizeUnit.VIEWPORT_HEIGHT,
    ],
    SIZE_VALUES: [
      SizeValue.PIXEL,
      SizeValue.FILL,
      SizeValue.AUTO,
    ],
    DIMENSIONS: [
      Dimension.WIDTH,
      Dimension.HEIGHT,
      Dimension.BOTH,
    ],
    NUMERIC_VALUES: [0, 25, 50, 100, 200, -10],
    STRING_VALUES: ['0', '25', '50', '100', '200', '-10', 'foo'],
  } as const;

  /**
   * Functional equivalence test conditions
   */
  static readonly FUNCTIONAL_EQUIVALENCE = {
    TOLERANCE: 0.000001, // Floating point tolerance
    TEST_CASES: [
      { unit: SizeUnit.PIXEL, dimension: Dimension.WIDTH, value: 100 },
      { unit: SizeUnit.PARENT_WIDTH, dimension: Dimension.WIDTH, value: SizeValue.FILL },
      { unit: SizeUnit.PIXEL, dimension: Dimension.WIDTH, value: SizeValue.AUTO },
      { unit: SizeUnit.VIEWPORT_WIDTH, dimension: Dimension.WIDTH, value: SizeValue.FILL },
    ],
  } as const;

  /**
   * Performance test conditions
   */
  static readonly PERFORMANCE_TESTS = {
    BASIC_ITERATIONS: 1000,
    HIGH_VOLUME_ITERATIONS: 10000,
    MEMORY_TEST_ITERATIONS: 1000,
    EXPECTED_IMPROVEMENT_PERCENTAGE: 20, // 20% improvement expected
  } as const;


  /**
   * Testability test conditions
   */
  static readonly TESTABILITY_TESTS = {
    MOCK_STRATEGY_COUNT: 5,
    MOCK_CONTEXT_PROPERTIES: ['parent', 'scene', 'viewport', 'content'],
    EXPECTED_MOCK_CALLS: 1,
  } as const;

  /**
   * Code metrics test conditions
   */
  static readonly CODE_METRICS = {
    MAX_CYCLOMATIC_COMPLEXITY: 10,
    MAX_COUPLING_DEGREE: 5,
    MIN_COHESION_SCORE: 0.7,
    MAX_METHOD_LENGTH: 20,
    MAX_CLASS_LENGTH: 200,
  } as const;

  /**
   * Create mock context for testing
   */
  static createMockContext(): any {
    return { ...this.TEST_DATA.MOCK_CONTEXT };
  }

  /**
   * Create extended mock context with additional properties
   */
  static createExtendedMockContext(): any {
    return {
      ...this.TEST_DATA.MOCK_CONTEXT,
      breakpoint: { width: 768, height: 1024 },
      device: { type: 'desktop', orientation: 'landscape' },
      theme: { name: 'dark', version: '1.0' },
    };
  }

  /**
   * Setup strategy registry with all default strategies
   */
  static setupStrategyRegistry(registry: SizeValueCalculationStrategyRegistry): void {
    registry.registerStrategy(new PixelSizeValueCalculationStrategy());
    registry.registerStrategy(new FillSizeValueCalculationStrategy());
    registry.registerStrategy(new AutoSizeValueCalculationStrategy());
    registry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    registry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());
    registry.preWarmCache();
  }

  /**
   * Create both original and refactored calculators for comparison
   */
  static createCalculators(
    unit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    value: number | SizeValue,
    strategyRegistry: SizeValueCalculationStrategyRegistry
  ) {
    const original = new SizeUnitCalculator(
      'test-id',
      'Test Calculator',
      unit,
      dimension,
      value
    );

    const refactored = new RefactoredSizeUnitCalculator(
      'test-id',
      'Test Calculator',
      unit,
      dimension,
      value,
      false,
      strategyRegistry
    );

    return { original, refactored };
  }

  /**
   * Measure performance of both calculators
   */
  static measurePerformance(
    original: SizeUnitCalculator,
    refactored: RefactoredSizeUnitCalculator,
    iterations: number,
    mockContext: any
  ) {
    // Test original calculator performance
    const originalStartTime = performance.now();
    for (let i = 0; i < iterations; i++) {
      original.calculate(mockContext);
    }
    const originalEndTime = performance.now();
    const originalDuration = originalEndTime - originalStartTime;

    // Test refactored calculator performance
    const refactoredStartTime = performance.now();
    for (let i = 0; i < iterations; i++) {
      refactored.calculate(mockContext);
    }
    const refactoredEndTime = performance.now();
    const refactoredDuration = refactoredEndTime - refactoredStartTime;

    return {
      originalDuration,
      refactoredDuration,
      performanceRatio: refactoredDuration / originalDuration,
      improvementPercentage: ((originalDuration - refactoredDuration) / originalDuration) * 100,
    };
  }

  /**
   * Measure memory usage of both calculators
   */
  static measureMemoryUsage(
    original: SizeUnitCalculator,
    refactored: RefactoredSizeUnitCalculator,
    mockContext: any
  ) {
    // Force garbage collection if available
    if (typeof global !== 'undefined' && global.gc) {
      global.gc();
    }

    const originalMemory = this.getMemoryUsage();
    for (let i = 0; i < this.PERFORMANCE_TESTS.MEMORY_TEST_ITERATIONS; i++) {
      original.calculate(mockContext);
    }
    const originalMemoryAfter = this.getMemoryUsage();

    // Force garbage collection if available
    if (typeof global !== 'undefined' && global.gc) {
      global.gc();
    }

    const refactoredMemory = this.getMemoryUsage();
    for (let i = 0; i < this.PERFORMANCE_TESTS.MEMORY_TEST_ITERATIONS; i++) {
      refactored.calculate(mockContext);
    }
    const refactoredMemoryAfter = this.getMemoryUsage();

    return {
      originalMemory: originalMemoryAfter - originalMemory,
      refactoredMemory: refactoredMemoryAfter - refactoredMemory,
      memoryDifference: (refactoredMemoryAfter - refactoredMemory) - (originalMemoryAfter - originalMemory),
    };
  }

  /**
   * Get current memory usage
   */
  static getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return 0;
  }

  /**
   * Create a custom strategy for testing
   */
  static createCustomStrategy() {
    return {
      strategyId: this.EXTENSIBILITY_TESTS.CUSTOM_STRATEGY_ID,
      sizeValue: SizeValue.PIXEL,
      sizeUnit: SizeUnit.PIXEL,
      dimension: Dimension.WIDTH,

      canHandle(
        _sizeValue: SizeValue,
        _sizeUnit: SizeUnit,
        _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
      ): boolean {
        return _sizeValue === SizeValue.PIXEL && _sizeUnit === SizeUnit.PIXEL;
      },

      calculate(
        _sizeValue: SizeValue,
        _sizeUnit: SizeUnit,
        _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
        _context: any
      ): number {
        return TestConditions.EXTENSIBILITY_TESTS.CUSTOM_STRATEGY_RESULT;
      },

      getPriority(): number {
        return TestConditions.EXTENSIBILITY_TESTS.LOW_PRIORITY_VALUE;
      }
    };
  }

  /**
   * Create a high priority strategy for testing
   */
  static createHighPriorityStrategy() {
    return {
      strategyId: TestConditions.EXTENSIBILITY_TESTS.HIGH_PRIORITY_STRATEGY_ID,
      sizeValue: SizeValue.PIXEL,
      sizeUnit: SizeUnit.PIXEL,
      dimension: Dimension.WIDTH,

      canHandle(
        _sizeValue: SizeValue,
        _sizeUnit: SizeUnit,
        _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
      ): boolean {
        return _sizeValue === SizeValue.PIXEL && _sizeUnit === SizeUnit.PIXEL;
      },

      calculate(
        _sizeValue: SizeValue,
        _sizeUnit: SizeUnit,
        _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
        _context: any
      ): number {
        return TestConditions.EXTENSIBILITY_TESTS.HIGH_PRIORITY_STRATEGY_RESULT;
      },

      getPriority(): number {
        return TestConditions.EXTENSIBILITY_TESTS.HIGH_PRIORITY_VALUE;
      }
    };
  }

  /**
   * Create a mock registry for testing
   */
  static createMockRegistry(): SizeValueCalculationStrategyRegistry {
    const registry = new SizeValueCalculationStrategyRegistry();
    this.setupStrategyRegistry(registry);
    return registry;
  }

  /**
   * Create a minimal registry for testing
   */
  static createMinimalRegistry(): SizeValueCalculationStrategyRegistry {
    const registry = new SizeValueCalculationStrategyRegistry();
    registry.registerStrategy(new PixelSizeValueCalculationStrategy());
    registry.registerStrategy(new FillSizeValueCalculationStrategy());
    return registry;
  }

  /**
   * Validate performance results against thresholds
   */
  static validatePerformanceResults(results: {
    originalDuration: number;
    refactoredDuration: number;
    performanceRatio: number;
    improvementPercentage: number;
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (results.performanceRatio > this.PERFORMANCE_THRESHOLDS.MAX_PERFORMANCE_RATIO) {
      errors.push(`Performance ratio ${results.performanceRatio} exceeds threshold ${this.PERFORMANCE_THRESHOLDS.MAX_PERFORMANCE_RATIO}`);
    }

    if (results.originalDuration > this.PERFORMANCE_THRESHOLDS.MAX_EXECUTION_TIME_MS) {
      errors.push(`Original duration ${results.originalDuration}ms exceeds threshold ${this.PERFORMANCE_THRESHOLDS.MAX_EXECUTION_TIME_MS}ms`);
    }

    if (results.refactoredDuration > this.PERFORMANCE_THRESHOLDS.MAX_EXECUTION_TIME_MS) {
      errors.push(`Refactored duration ${results.refactoredDuration}ms exceeds threshold ${this.PERFORMANCE_THRESHOLDS.MAX_EXECUTION_TIME_MS}ms`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate memory usage results against thresholds
   */
  static validateMemoryResults(results: {
    originalMemory: number;
    refactoredMemory: number;
    memoryDifference: number;
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (results.originalMemory > this.PERFORMANCE_THRESHOLDS.MAX_MEMORY_USAGE_MB) {
      errors.push(`Original memory usage ${results.originalMemory}MB exceeds threshold ${this.PERFORMANCE_THRESHOLDS.MAX_MEMORY_USAGE_MB}MB`);
    }

    if (results.refactoredMemory > this.PERFORMANCE_THRESHOLDS.MAX_MEMORY_USAGE_MB) {
      errors.push(`Refactored memory usage ${results.refactoredMemory}MB exceeds threshold ${this.PERFORMANCE_THRESHOLDS.MAX_MEMORY_USAGE_MB}MB`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate functional equivalence results
   */
  static validateFunctionalEquivalence(
    originalResult: number,
    refactoredResult: number
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const difference = Math.abs(originalResult - refactoredResult);

    if (difference > this.FUNCTIONAL_EQUIVALENCE.TOLERANCE) {
      errors.push(`Functional equivalence failed: difference ${difference} exceeds tolerance ${this.FUNCTIONAL_EQUIVALENCE.TOLERANCE}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
