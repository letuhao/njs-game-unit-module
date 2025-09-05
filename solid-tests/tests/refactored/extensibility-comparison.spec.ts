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

describe('Extensibility Comparison Tests', () => {
  let originalCalculator: SizeUnitCalculator;
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    strategyRegistry = new SizeValueCalculationStrategyRegistry();
    setupStrategyRegistry(strategyRegistry);
    mockContext = createMockContext();
  });

  describe('Open/Closed Principle Compliance', () => {
    it('should demonstrate Open/Closed Principle compliance in refactored version', () => {
      // Original calculator requires modification to add new calculation types
      // Refactored calculator can add new strategies without modification

      // Add a custom strategy to the refactored calculator
      const customStrategy = createCustomStrategy();
      strategyRegistry.registerStrategy(customStrategy);

      const calculators = createCalculators(SizeUnit.PIXEL, Dimension.WIDTH, SizeValue.PIXEL);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      // Test that custom strategy is used
      const result = refactoredCalculator.calculate(mockContext);
      expect(result).toBe(999); // Custom calculation result

      // Verify strategy is registered
      expect(strategyRegistry.hasStrategy('custom-size-strategy')).toBe(true);
    });
  });

  describe('Strategy Registration', () => {
    it('should allow dynamic strategy registration', () => {
      const calculators = createCalculators(SizeUnit.PIXEL, Dimension.WIDTH, SizeValue.PIXEL);
      refactoredCalculator = calculators.refactored;

      // Initially should have 5 strategies
      expect(strategyRegistry.getStrategyCount()).toBe(5);

      // Add custom strategy
      const customStrategy = createCustomStrategy();
      strategyRegistry.registerStrategy(customStrategy);

      // Should now have 6 strategies
      expect(strategyRegistry.getStrategyCount()).toBe(6);
      expect(strategyRegistry.hasStrategy('custom-size-strategy')).toBe(true);
    });
  });

  describe('Strategy Priority', () => {
    it('should respect strategy priority', () => {
      const highPriorityStrategy = createHighPriorityStrategy();
      strategyRegistry.registerStrategy(highPriorityStrategy);

      const calculators = createCalculators(SizeUnit.PIXEL, Dimension.WIDTH, SizeValue.PIXEL);
      refactoredCalculator = calculators.refactored;

      // High priority strategy should be used
      const result = refactoredCalculator.calculate(mockContext);
      expect(result).toBe(888); // High priority strategy result
    });
  });

  describe('Fallback Behavior', () => {
    it('should handle missing strategies gracefully', () => {
      // Create a calculator with an unsupported combination
      const calculators = createCalculators(SizeUnit.PIXEL, Dimension.WIDTH, SizeValue.FILL);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      const originalResult = originalCalculator.calculate(mockContext);
      const refactoredResult = refactoredCalculator.calculate(mockContext);

      // Both should return fallback values
      expect(originalResult).toBeDefined();
      expect(refactoredResult).toBeDefined();

      // Refactored version provides better logging and debugging
      const availableStrategies = refactoredCalculator.getAvailableStrategies();
      expect(availableStrategies.length).toBeGreaterThan(0);
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

  function createCustomStrategy() {
    return {
      readonly strategyId = 'custom-size-strategy';
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

  function createHighPriorityStrategy() {
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
});
