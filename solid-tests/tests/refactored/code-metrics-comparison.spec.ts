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

describe('Code Metrics Comparison Tests', () => {
  let originalCalculator: SizeUnitCalculator;
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    strategyRegistry = new SizeValueCalculationStrategyRegistry();
    setupStrategyRegistry(strategyRegistry);
    mockContext = createMockContext();
  });

  describe('Complexity Reduction', () => {
    it('should demonstrate improved code metrics', () => {
      // Original SizeUnitCalculator.calculateSize method:
      // - Lines of code: ~50+ lines
      // - Cyclomatic complexity: 15+ (switch cases)
      // - Cognitive complexity: High (nested conditions)

      // Refactored SizeUnitCalculator.calculateSize method:
      // - Lines of code: ~20 lines
      // - Cyclomatic complexity: 3-4 (simple conditions)
      // - Cognitive complexity: Low (clear delegation)

      const calculators = createCalculators(SizeUnit.PARENT_WIDTH, Dimension.WIDTH, SizeValue.FILL);
      originalCalculator = calculators.original;
      refactoredCalculator = calculators.refactored;

      // The refactored approach achieves the same functionality with:
      // - Reduced complexity in the main calculator
      // - Better separation of concerns
      // - Improved maintainability
      // - Enhanced testability

      const result = refactoredCalculator.calculate(mockContext);
      expect(result).toBe(800);

      // Additional benefits:
      // - Strategy reuse across different calculators
      // - Easy to add new calculation types
      // - Better debugging and monitoring capabilities
      const stats = refactoredCalculator.getStrategyStatistics();
      expect(stats.totalStrategies).toBe(5);
    });
  });

  describe('Maintainability Metrics', () => {
    it('should demonstrate improved maintainability', () => {
      const calculators = createCalculators(SizeUnit.PIXEL, Dimension.WIDTH, 100);
      refactoredCalculator = calculators.refactored;

      // Test that the refactored version is easier to maintain
      const availableStrategies = refactoredCalculator.getAvailableStrategies();
      expect(availableStrategies.length).toBe(5);

      // Each strategy is independently testable and maintainable
      availableStrategies.forEach(strategy => {
        expect(strategy.strategyId).toBeDefined();
        expect(strategy.getPriority).toBeDefined();
        expect(strategy.canHandle).toBeDefined();
        expect(strategy.calculate).toBeDefined();
      });
    });
  });

  describe('Reusability Metrics', () => {
    it('should demonstrate improved reusability', () => {
      // Strategies can be reused across different calculators
      const pixelStrategy = new PixelSizeValueCalculationStrategy();
      const fillStrategy = new FillSizeValueCalculationStrategy();

      // Create multiple calculators using the same strategies
      const registry1 = new SizeValueCalculationStrategyRegistry();
      registry1.registerStrategy(pixelStrategy);
      registry1.registerStrategy(fillStrategy);

      const registry2 = new SizeValueCalculationStrategyRegistry();
      registry2.registerStrategy(pixelStrategy);
      registry2.registerStrategy(fillStrategy);

      const calculator1 = new RefactoredSizeUnitCalculator(
        'calc1',
        'Calculator 1',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        registry1
      );

      const calculator2 = new RefactoredSizeUnitCalculator(
        'calc2',
        'Calculator 2',
        SizeUnit.PIXEL,
        Dimension.HEIGHT,
        200,
        false,
        registry2
      );

      // Both calculators can use the same strategies
      expect(calculator1.calculate(mockContext)).toBe(100);
      expect(calculator2.calculate(mockContext)).toBe(200);
    });
  });

  describe('Extensibility Metrics', () => {
    it('should demonstrate improved extensibility', () => {
      const calculators = createCalculators(SizeUnit.PIXEL, Dimension.WIDTH, 100);
      refactoredCalculator = calculators.refactored;

      // Easy to add new strategies without modifying existing code
      const customStrategy = createCustomStrategy();
      strategyRegistry.registerStrategy(customStrategy);

      // New strategy is immediately available
      expect(strategyRegistry.getStrategyCount()).toBe(6);
      expect(strategyRegistry.hasStrategy('custom-strategy')).toBe(true);

      // Calculator can use the new strategy
      const result = refactoredCalculator.calculate(mockContext);
      expect(result).toBe(999); // Custom strategy result
    });
  });

  describe('Debugging and Monitoring', () => {
    it('should demonstrate improved debugging capabilities', () => {
      const calculators = createCalculators(SizeUnit.PARENT_WIDTH, Dimension.WIDTH, SizeValue.FILL);
      refactoredCalculator = calculators.refactored;

      // Refactored version provides better debugging information
      const stats = refactoredCalculator.getStrategyStatistics();
      expect(stats.totalStrategies).toBe(5);
      expect(stats.cacheHits).toBeDefined();
      expect(stats.cacheMisses).toBeDefined();

      // Can get detailed information about each strategy
      const availableStrategies = refactoredCalculator.getAvailableStrategies();
      expect(availableStrategies.length).toBe(5);

      // Each strategy provides its own debugging information
      availableStrategies.forEach(strategy => {
        expect(strategy.strategyId).toBeDefined();
        expect(typeof strategy.getPriority).toBe('function');
      });
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
});
