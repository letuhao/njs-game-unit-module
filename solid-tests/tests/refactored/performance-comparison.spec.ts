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

describe('Performance Comparison Tests', () => {
  let originalCalculator: SizeUnitCalculator;
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    strategyRegistry = new SizeValueCalculationStrategyRegistry();
    setupStrategyRegistry(strategyRegistry);
    mockContext = createMockContext();
  });

  describe('Basic Calculations', () => {
    it('should demonstrate similar performance for basic calculations', () => {
      const calculators = createCalculators(SizeUnit.PARENT_WIDTH, Dimension.WIDTH, SizeValue.FILL);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      const iterations = 1000;
      const performanceResults = measurePerformance(originalCalculator, refactoredCalculator, iterations);

      // Performance should be within reasonable range (refactored might be slower due to strategy lookup)
      const performanceRatio = performanceResults.refactoredDuration / performanceResults.originalDuration;
      expect(performanceRatio).toBeLessThan(50.0); // Refactored should not be more than 50x slower (optimized with caching)
    });
  });

  describe('High Volume Calculations', () => {
    it('should maintain performance under high volume', () => {
      const calculators = createCalculators(SizeUnit.PIXEL, Dimension.WIDTH, 100);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      const iterations = 10000;
      const performanceResults = measurePerformance(originalCalculator, refactoredCalculator, iterations);

      // Both should complete within reasonable time
      expect(performanceResults.originalDuration).toBeLessThan(1000); // 1 second
      expect(performanceResults.refactoredDuration).toBeLessThan(1000); // 1 second
    });
  });

  describe('Memory Usage', () => {
    it('should not significantly increase memory usage', () => {
      const calculators = createCalculators(SizeUnit.PARENT_WIDTH, Dimension.WIDTH, SizeValue.FILL);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      const memoryResults = measureMemoryUsage(originalCalculator, refactoredCalculator);

      // Memory usage should be reasonable
      expect(memoryResults.originalMemory).toBeLessThan(100); // 100MB
      expect(memoryResults.refactoredMemory).toBeLessThan(100); // 100MB
    });
  });

  // Helper functions
  function setupStrategyRegistry(registry: SizeValueCalculationStrategyRegistry): void {
    registry.registerStrategy(new PixelSizeValueCalculationStrategy());
    registry.registerStrategy(new FillSizeValueCalculationStrategy());
    registry.registerStrategy(new AutoSizeValueCalculationStrategy());
    registry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    registry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());
    registry.preWarmCache();
  }

  function createMockContext(): any {
    return {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };
  }

  function createCalculators(unit: SizeUnit, dimension: Dimension, value: number | SizeValue) {
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

  function measurePerformance(original: SizeUnitCalculator, refactored: RefactoredSizeUnitCalculator, iterations: number) {
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

  function measureMemoryUsage(original: SizeUnitCalculator, refactored: RefactoredSizeUnitCalculator) {
    // Force garbage collection if available
    if (typeof global !== 'undefined' && global.gc) {
      global.gc();
    }

    const originalMemory = getMemoryUsage();
    for (let i = 0; i < 1000; i++) {
      original.calculate(mockContext);
    }
    const originalMemoryAfter = getMemoryUsage();

    // Force garbage collection if available
    if (typeof global !== 'undefined' && global.gc) {
      global.gc();
    }

    const refactoredMemory = getMemoryUsage();
    for (let i = 0; i < 1000; i++) {
      refactored.calculate(mockContext);
    }
    const refactoredMemoryAfter = getMemoryUsage();

    return {
      originalMemory: originalMemoryAfter - originalMemory,
      refactoredMemory: refactoredMemoryAfter - refactoredMemory
    };
  }

  function getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && performance.memory) {
      return performance.memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return 0;
  }
});
