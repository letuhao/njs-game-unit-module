import { SizeUnitCalculator } from '../../../old_src/src/classes/SizeUnitCalculator';
import { RefactoredSizeUnitCalculator } from '../../../old_src/src/classes/RefactoredSizeUnitCalculator';
import { SizeValueCalculationStrategyRegistry } from '../../../old_src/src/strategies/value/SizeValueCalculationStrategyRegistry';
import {
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy,
  ParentWidthSizeValueCalculationStrategy,
  ViewportWidthSizeValueCalculationStrategy,
} from '../../../old_src/src/strategies/value';
import { SizeValue } from '../../../old_src/src/enums/SizeValue';
import { SizeUnit } from '../../../old_src/src/enums/SizeUnit';
import { Dimension } from '../../../old_src/src/enums/Dimension';

/**
 * Test helpers for refactored test files
 * Reduces duplication and provides common setup functions
 */
export class TestHelpers {
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
   * Create mock context for testing
   */
  static createMockContext(): any {
    return {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };
  }

  /**
   * Create both original and refactored calculators
   */
  static createCalculators(
    unit: SizeUnit,
    dimension: Dimension,
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
      performanceRatio: refactoredDuration / originalDuration
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
    for (let i = 0; i < 1000; i++) {
      original.calculate(mockContext);
    }
    const originalMemoryAfter = this.getMemoryUsage();

    // Force garbage collection if available
    if (typeof global !== 'undefined' && global.gc) {
      global.gc();
    }

    const refactoredMemory = this.getMemoryUsage();
    for (let i = 0; i < 1000; i++) {
      refactored.calculate(mockContext);
    }
    const refactoredMemoryAfter = this.getMemoryUsage();

    return {
      originalMemory: originalMemoryAfter - originalMemory,
      refactoredMemory: refactoredMemoryAfter - refactoredMemory
    };
  }

  /**
   * Get current memory usage
   */
  static getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && performance.memory) {
      return performance.memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return 0;
  }

  /**
   * Create a custom strategy for testing
   */
  static createCustomStrategy() {
    return {
      readonly strategyId = 'custom-strategy';
      readonly sizeValue = SizeValue.PIXEL;
      readonly sizeUnit = SizeUnit.PIXEL;
      readonly dimension = Dimension.WIDTH;

      canHandle(
        _sizeValue: SizeValue,
        _sizeUnit: SizeUnit,
        _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
      ): boolean {
        return _sizeValue === SizeValue.PIXEL && _sizeUnit === SizeUnit.PIXEL;
      }

      calculate(
        _sizeValue: SizeValue,
        _sizeUnit: SizeUnit,
        _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
        _context: any
      ): number {
        return 999; // Custom calculation
      }

      getPriority(): number {
        return 1;
      }
    };
  }

  /**
   * Create a high priority strategy for testing
   */
  static createHighPriorityStrategy() {
    return {
      readonly strategyId = 'high-priority-strategy';
      readonly sizeValue = SizeValue.PIXEL;
      readonly sizeUnit = SizeUnit.PIXEL;
      readonly dimension = Dimension.WIDTH;

      canHandle(
        _sizeValue: SizeValue,
        _sizeUnit: SizeUnit,
        _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
      ): boolean {
        return _sizeValue === SizeValue.PIXEL && _sizeUnit === SizeUnit.PIXEL;
      }

      calculate(
        _sizeValue: SizeValue,
        _sizeUnit: SizeUnit,
        _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
        _context: any
      ): number {
        return 888; // High priority strategy result
      }

      getPriority(): number {
        return 100; // High priority
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
}
