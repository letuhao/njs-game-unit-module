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

describe('Functional Equivalence Tests', () => {
  let originalCalculator: SizeUnitCalculator;
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    strategyRegistry = new SizeValueCalculationStrategyRegistry();
    setupStrategyRegistry(strategyRegistry);
    mockContext = createMockContext();
  });

  describe('Numeric Values', () => {
    it('should produce identical results for numeric values', () => {
      const calculators = createCalculators(SizeUnit.PIXEL, Dimension.WIDTH, 100);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      const originalResult = originalCalculator.calculate(mockContext);
      const refactoredResult = refactoredCalculator.calculate(mockContext);

      expect(refactoredResult).toBe(originalResult);
    });
  });

  describe('FILL Values', () => {
    it('should produce identical results for FILL values', () => {
      const calculators = createCalculators(SizeUnit.PARENT_WIDTH, Dimension.WIDTH, SizeValue.FILL);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      const originalResult = originalCalculator.calculate(mockContext);
      const refactoredResult = refactoredCalculator.calculate(mockContext);

      expect(refactoredResult).toBe(originalResult);
    });
  });

  describe('AUTO Values', () => {
    it('should produce identical results for AUTO values', () => {
      const calculators = createCalculators(SizeUnit.PIXEL, Dimension.WIDTH, SizeValue.AUTO);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      const originalResult = originalCalculator.calculate(mockContext);
      const refactoredResult = refactoredCalculator.calculate(mockContext);

      expect(refactoredResult).toBe(originalResult);
    });
  });

  describe('PARENT_WIDTH Values', () => {
    it('should produce identical results for PARENT_WIDTH values', () => {
      const calculators = createCalculators(SizeUnit.PARENT_WIDTH, Dimension.WIDTH, SizeValue.FILL);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      const originalResult = originalCalculator.calculate(mockContext);
      const refactoredResult = refactoredCalculator.calculate(mockContext);

      expect(refactoredResult).toBe(originalResult);
    });
  });

  describe('VIEWPORT_WIDTH Values', () => {
    it('should produce identical results for VIEWPORT_WIDTH values', () => {
      const calculators = createCalculators(SizeUnit.VIEWPORT_WIDTH, Dimension.WIDTH, SizeValue.FILL);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      const originalResult = originalCalculator.calculate(mockContext);
      const refactoredResult = refactoredCalculator.calculate(mockContext);

      expect(refactoredResult).toBe(originalResult);
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
});
