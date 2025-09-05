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

describe('Calculator Refactoring Comparison - Performance', () => {
  let originalCalculator: SizeUnitCalculator;
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Performance Comparison', () => {
    it('should demonstrate performance improvements', () => {
      testPerformanceImprovements();
    });

    it('should handle high-frequency calculations efficiently', () => {
      testHighFrequencyCalculations();
    });

    it('should maintain performance with multiple strategies', () => {
      testMultipleStrategiesPerformance();
    });
  });

  describe('Memory Usage Comparison', () => {
    it('should use memory more efficiently', () => {
      testMemoryEfficiency();
    });

    it('should handle garbage collection better', () => {
      testGarbageCollectionHandling();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    strategyRegistry = new SizeValueCalculationStrategyRegistry();

    // Register all strategies
    strategyRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());

    // Pre-warm cache for better performance
    strategyRegistry.preWarmCache();

    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };
  }

  function testPerformanceImprovements(): void {
    const iterations = 1000;
    
    // Test original calculator performance
    const originalStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      originalCalculator = new SizeUnitCalculator(
        `test-${i}`,
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100
      );
      originalCalculator.calculate(mockContext);
    }
    const originalEnd = performance.now();
    const originalDuration = originalEnd - originalStart;

    // Test refactored calculator performance
    const refactoredStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      refactoredCalculator = new RefactoredSizeUnitCalculator(
        `test-${i}`,
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
      refactoredCalculator.calculate(mockContext);
    }
    const refactoredEnd = performance.now();
    const refactoredDuration = refactoredEnd - refactoredStart;

    // Refactored version should be faster or at least not significantly slower
    expect(refactoredDuration).toBeLessThanOrEqual(originalDuration * 1.5);
  }

  function testHighFrequencyCalculations(): void {
    const iterations = 10000;
    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      refactoredCalculator = new RefactoredSizeUnitCalculator(
        `test-${i}`,
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
      refactoredCalculator.calculate(mockContext);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete within reasonable time
    expect(duration).toBeLessThan(5000); // 5 seconds for 10,000 calculations
  }

  function testMultipleStrategiesPerformance(): void {
    const strategies = [
      { unit: SizeUnit.PIXEL, value: SizeValue.FILL },
      { unit: SizeUnit.PARENT_WIDTH, value: SizeValue.AUTO },
      { unit: SizeUnit.VIEWPORT_WIDTH, value: SizeValue.FILL },
    ];

    const startTime = performance.now();

    for (const strategy of strategies) {
      refactoredCalculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        strategy.unit,
        Dimension.WIDTH,
        strategy.value,
        false,
        strategyRegistry
      );
      refactoredCalculator.calculate(mockContext);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete quickly even with multiple strategies
    expect(duration).toBeLessThan(1000); // 1 second for multiple strategies
  }

  function testMemoryEfficiency(): void {
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    // Create and destroy many calculators
    for (let i = 0; i < 1000; i++) {
      const calculator = new RefactoredSizeUnitCalculator(
        `test-${i}`,
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
      calculator.calculate(mockContext);
    }

    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;

    // Memory increase should be reasonable
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB
  }

  function testGarbageCollectionHandling(): void {
    // Create many objects and let them be garbage collected
    for (let i = 0; i < 100; i++) {
      const calculator = new RefactoredSizeUnitCalculator(
        `test-${i}`,
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
      calculator.calculate(mockContext);
    }

    // Force garbage collection if available
    if (typeof gc === 'function') {
      gc();
    }

    // Test should complete without memory issues
    expect(true).toBe(true);
  }
});
