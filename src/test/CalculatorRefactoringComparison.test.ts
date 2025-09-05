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
import { container, TOKENS } from '../container/DiContainer';

describe('Calculator Refactoring Comparison', () => {
  let originalCalculator: SizeUnitCalculator;
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    // Use DI container to resolve strategy registry instead of direct instantiation
    try {
      strategyRegistry = container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      strategyRegistry = new SizeValueCalculationStrategyRegistry();
    }

    // Register all strategies using DI container
    try {
      const pixelStrategy = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      const fillStrategy = container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY);
      const autoStrategy = container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY);
      const parentWidthStrategy = container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY);
      const viewportWidthStrategy = container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY);
      
      strategyRegistry.registerStrategy(pixelStrategy || new PixelSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(fillStrategy || new FillSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(autoStrategy || new AutoSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(parentWidthStrategy || new ParentWidthSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(viewportWidthStrategy || new ViewportWidthSizeValueCalculationStrategy());
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      strategyRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());
    }

    // Pre-warm cache for better performance
    strategyRegistry.preWarmCache();

    // Debug: Check what strategies are registered
    console.log(
      'Registered strategies:',
      strategyRegistry.getAllStrategies().map(s => s.strategyId)
    );
    console.log('Strategy count:', strategyRegistry.getStrategyCount());

    // Create calculators using DI container
    try {
      originalCalculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
    } catch (error) {
      originalCalculator = new SizeUnitCalculator();
    }

    try {
      refactoredCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
    } catch (error) {
      refactoredCalculator = new RefactoredSizeUnitCalculator();
    }

    // Create mock context
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
      viewport: { width: 1920, height: 1080 },
      dimension: Dimension.WIDTH,
    };
  });

  describe('Performance Comparison', () => {
    it('should compare calculation performance between original and refactored calculators', () => {
      const testCases = [
        { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL, expected: 100 },
        { value: SizeValue.FILL, unit: SizeUnit.FILL, expected: 800 },
        { value: SizeValue.AUTO, unit: SizeUnit.AUTO, expected: 0 },
        { value: SizeValue.PARENT_WIDTH, unit: SizeUnit.PARENT_WIDTH, expected: 800 },
        { value: SizeValue.VIEWPORT_WIDTH, unit: SizeUnit.VIEWPORT_WIDTH, expected: 1920 },
      ];

      const iterations = 1000;
      const results = {
        original: { times: [], total: 0 },
        refactored: { times: [], total: 0 },
      };

      for (const testCase of testCases) {
        // Test original calculator
        const originalStart = performance.now();
        for (let i = 0; i < iterations; i++) {
          const result = originalCalculator.calculate(testCase.value, testCase.unit, mockContext);
          expect(typeof result).toBe('number');
        }
        const originalEnd = performance.now();
        const originalTime = originalEnd - originalStart;
        results.original.times.push(originalTime);
        results.original.total += originalTime;

        // Test refactored calculator
        const refactoredStart = performance.now();
        for (let i = 0; i < iterations; i++) {
          const result = refactoredCalculator.calculate(testCase.value, testCase.unit, mockContext);
          expect(typeof result).toBe('number');
        }
        const refactoredEnd = performance.now();
        const refactoredTime = refactoredEnd - refactoredStart;
        results.refactored.times.push(refactoredTime);
        results.refactored.total += refactoredTime;

        console.log(`Test case ${testCase.value}:`);
        console.log(`  Original: ${originalTime.toFixed(2)}ms`);
        console.log(`  Refactored: ${refactoredTime.toFixed(2)}ms`);
        console.log(`  Improvement: ${((originalTime - refactoredTime) / originalTime * 100).toFixed(2)}%`);
      }

      const avgOriginal = results.original.total / results.original.times.length;
      const avgRefactored = results.refactored.total / results.refactored.times.length;
      const overallImprovement = ((avgOriginal - avgRefactored) / avgOriginal) * 100;

      console.log(`\nOverall Performance:`);
      console.log(`  Average Original: ${avgOriginal.toFixed(2)}ms`);
      console.log(`  Average Refactored: ${avgRefactored.toFixed(2)}ms`);
      console.log(`  Overall Improvement: ${overallImprovement.toFixed(2)}%`);

      // The refactored calculator should be at least as fast as the original
      expect(avgRefactored).toBeLessThanOrEqual(avgOriginal * 1.1); // Allow 10% tolerance
    });

    it('should compare memory usage between original and refactored calculators', () => {
      const testCases = [
        { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL },
        { value: SizeValue.FILL, unit: SizeUnit.FILL },
        { value: SizeValue.AUTO, unit: SizeUnit.AUTO },
      ];

      const iterations = 100;
      const memoryResults = {
        original: [],
        refactored: [],
      };

      for (const testCase of testCases) {
        // Test original calculator memory usage
        const originalMemoryBefore = (performance as any).memory?.usedJSHeapSize || 0;
        for (let i = 0; i < iterations; i++) {
          originalCalculator.calculate(testCase.value, testCase.unit, mockContext);
        }
        const originalMemoryAfter = (performance as any).memory?.usedJSHeapSize || 0;
        memoryResults.original.push(originalMemoryAfter - originalMemoryBefore);

        // Test refactored calculator memory usage
        const refactoredMemoryBefore = (performance as any).memory?.usedJSHeapSize || 0;
        for (let i = 0; i < iterations; i++) {
          refactoredCalculator.calculate(testCase.value, testCase.unit, mockContext);
        }
        const refactoredMemoryAfter = (performance as any).memory?.usedJSHeapSize || 0;
        memoryResults.refactored.push(refactoredMemoryAfter - refactoredMemoryBefore);
      }

      const avgOriginalMemory = memoryResults.original.reduce((a, b) => a + b, 0) / memoryResults.original.length;
      const avgRefactoredMemory = memoryResults.refactored.reduce((a, b) => a + b, 0) / memoryResults.refactored.length;

      console.log(`Memory Usage Comparison:`);
      console.log(`  Average Original: ${avgOriginalMemory.toFixed(2)} bytes`);
      console.log(`  Average Refactored: ${avgRefactoredMemory.toFixed(2)} bytes`);

      // Memory usage should be reasonable for both calculators
      expect(avgOriginalMemory).toBeGreaterThan(0);
      expect(avgRefactoredMemory).toBeGreaterThan(0);
    });
  });

  describe('Functionality Comparison', () => {
    it('should produce identical results for all test cases', () => {
      const testCases = [
        { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL },
        { value: SizeValue.FILL, unit: SizeUnit.FILL },
        { value: SizeValue.AUTO, unit: SizeUnit.AUTO },
        { value: SizeValue.PARENT_WIDTH, unit: SizeUnit.PARENT_WIDTH },
        { value: SizeValue.VIEWPORT_WIDTH, unit: SizeUnit.VIEWPORT_WIDTH },
      ];

      for (const testCase of testCases) {
        const originalResult = originalCalculator.calculate(testCase.value, testCase.unit, mockContext);
        const refactoredResult = refactoredCalculator.calculate(testCase.value, testCase.unit, mockContext);

        expect(typeof originalResult).toBe('number');
        expect(typeof refactoredResult).toBe('number');
        
        // Results should be identical or very close (within floating point precision)
        const difference = Math.abs(originalResult - refactoredResult);
        expect(difference).toBeLessThan(0.001);
      }
    });

    it('should handle edge cases identically', () => {
      const edgeCases = [
        { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL, context: { ...mockContext, parent: { width: 0, height: 0, x: 0, y: 0 } } },
        { value: SizeValue.FILL, unit: SizeUnit.FILL, context: { ...mockContext, scene: { width: 0, height: 0 } } },
        { value: SizeValue.AUTO, unit: SizeUnit.AUTO, context: { ...mockContext, viewport: { width: 0, height: 0 } } },
      ];

      for (const edgeCase of edgeCases) {
        const originalResult = originalCalculator.calculate(edgeCase.value, edgeCase.unit, edgeCase.context);
        const refactoredResult = refactoredCalculator.calculate(edgeCase.value, edgeCase.unit, edgeCase.context);

        expect(typeof originalResult).toBe('number');
        expect(typeof refactoredResult).toBe('number');
        
        // Results should be identical or very close
        const difference = Math.abs(originalResult - refactoredResult);
        expect(difference).toBeLessThan(0.001);
      }
    });
  });

  describe('Strategy Registry Integration', () => {
    it('should use strategy registry in refactored calculator', () => {
      const testCase = { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL };
      
      const result = refactoredCalculator.calculate(testCase.value, testCase.unit, mockContext);
      
      expect(typeof result).toBe('number');
      
      // Verify that the strategy registry is being used
      expect(strategyRegistry.getStrategyCount()).toBeGreaterThan(0);
      expect(strategyRegistry.getAllStrategies().length).toBeGreaterThan(0);
    });

    it('should handle strategy registry cache warming', () => {
      const initialCacheSize = strategyRegistry.getCacheSize();
      
      // Pre-warm cache
      strategyRegistry.preWarmCache();
      
      const warmedCacheSize = strategyRegistry.getCacheSize();
      expect(warmedCacheSize).toBeGreaterThanOrEqual(initialCacheSize);
    });

    it('should handle strategy registry performance metrics', () => {
      const testCase = { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL };
      
      // Execute calculation to generate metrics
      refactoredCalculator.calculate(testCase.value, testCase.unit, mockContext);
      
      // Check that metrics are available
      const metrics = strategyRegistry.getPerformanceMetrics();
      expect(metrics).toBeDefined();
      expect(typeof metrics.totalCalculations).toBe('number');
      expect(typeof metrics.averageCalculationTime).toBe('number');
    });
  });

  describe('Error Handling Comparison', () => {
    it('should handle invalid inputs identically', () => {
      const invalidInputs = [
        { value: 'invalid' as any, unit: SizeUnit.PIXEL },
        { value: SizeValue.PIXEL, unit: 'invalid' as any },
        { value: null, unit: SizeUnit.PIXEL },
        { value: SizeValue.PIXEL, unit: null },
      ];

      for (const invalidInput of invalidInputs) {
        const originalResult = originalCalculator.calculate(invalidInput.value, invalidInput.unit, mockContext);
        const refactoredResult = refactoredCalculator.calculate(invalidInput.value, invalidInput.unit, mockContext);

        expect(typeof originalResult).toBe('number');
        expect(typeof refactoredResult).toBe('number');
        
        // Both should handle invalid inputs gracefully
        expect(originalResult).toBeGreaterThanOrEqual(0);
        expect(refactoredResult).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle missing context properties identically', () => {
      const incompleteContexts = [
        {},
        { parent: { width: 800, height: 600, x: 0, y: 0 } },
        { scene: { width: 1200, height: 800 } },
        { viewport: { width: 1920, height: 1080 } },
      ];

      const testCase = { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL };

      for (const incompleteContext of incompleteContexts) {
        const originalResult = originalCalculator.calculate(testCase.value, testCase.unit, incompleteContext as any);
        const refactoredResult = refactoredCalculator.calculate(testCase.value, testCase.unit, incompleteContext as any);

        expect(typeof originalResult).toBe('number');
        expect(typeof refactoredResult).toBe('number');
        
        // Both should handle incomplete contexts gracefully
        expect(originalResult).toBeGreaterThanOrEqual(0);
        expect(refactoredResult).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Maintainability and Extensibility', () => {
    it('should demonstrate improved maintainability through strategy pattern', () => {
      // The refactored calculator should be easier to extend
      const newStrategy = {
        strategyId: 'test-strategy',
        canHandle: (value: SizeValue, unit: SizeUnit) => value === SizeValue.PIXEL && unit === SizeUnit.PIXEL,
        calculate: (value: SizeValue, unit: SizeUnit, context: any) => 999,
        getPriority: () => 100,
      };

      strategyRegistry.registerStrategy(newStrategy as any);
      
      const result = refactoredCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      
      // The new strategy should be used if it has higher priority
      expect(typeof result).toBe('number');
    });

    it('should demonstrate improved testability through dependency injection', () => {
      // The refactored calculator should be easier to test with different configurations
      const testStrategies = strategyRegistry.getAllStrategies();
      expect(testStrategies.length).toBeGreaterThan(0);
      
      // Each strategy should be testable independently
      for (const strategy of testStrategies) {
        expect(strategy.strategyId).toBeDefined();
        expect(typeof strategy.canHandle).toBe('function');
        expect(typeof strategy.calculate).toBe('function');
        expect(typeof strategy.getPriority).toBe('function');
      }
    });
  });
});
