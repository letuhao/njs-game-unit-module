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

describe('Testability Comparison Tests', () => {
  let originalCalculator: SizeUnitCalculator;
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    strategyRegistry = new SizeValueCalculationStrategyRegistry();
    setupStrategyRegistry(strategyRegistry);
    mockContext = createMockContext();
  });

  describe('Individual Strategy Testing', () => {
    it('should allow testing individual strategies', () => {
      // Original calculator requires testing the entire switch statement
      // Refactored calculator allows testing individual strategies

      // Test individual strategies
      const pixelStrategy = new PixelSizeValueCalculationStrategy();
      const fillStrategy = new FillSizeValueCalculationStrategy();

      expect(
        pixelStrategy.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH, mockContext)
      ).toBeDefined();
      expect(
        fillStrategy.calculate(SizeValue.FILL, SizeUnit.PARENT_WIDTH, Dimension.WIDTH, mockContext)
      ).toBe(1920);
    });
  });

  describe('Registry Testing', () => {
    it('should allow testing registry independently', () => {
      // Test registry independently
      expect(strategyRegistry.getStrategyCount()).toBe(5);
      expect(strategyRegistry.hasStrategy('pixel-size-calculation')).toBe(true);
      expect(strategyRegistry.hasStrategy('fill-size-calculation')).toBe(true);
      expect(strategyRegistry.hasStrategy('auto-size-calculation')).toBe(true);
      expect(strategyRegistry.hasStrategy('parent-width-size-calculation')).toBe(true);
      expect(strategyRegistry.hasStrategy('viewport-width-size-calculation')).toBe(true);
    });
  });

  describe('Mocked Dependencies', () => {
    it('should allow testing with mocked registry', () => {
      // Test calculator with mocked registry
      const mockRegistry = new SizeValueCalculationStrategyRegistry();
      refactoredCalculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        mockRegistry
      );

      expect(refactoredCalculator.calculate(mockContext)).toBe(100);
    });
  });

  describe('Strategy Isolation', () => {
    it('should allow testing strategies in isolation', () => {
      // Test each strategy individually
      const strategies = [
        new PixelSizeValueCalculationStrategy(),
        new FillSizeValueCalculationStrategy(),
        new AutoSizeValueCalculationStrategy(),
        new ParentWidthSizeValueCalculationStrategy(),
        new ViewportWidthSizeValueCalculationStrategy()
      ];

      strategies.forEach(strategy => {
        // Test canHandle method
        expect(typeof strategy.canHandle).toBe('function');
        
        // Test calculate method
        expect(typeof strategy.calculate).toBe('function');
        
        // Test getPriority method
        expect(typeof strategy.getPriority).toBe('function');
        
        // Test strategy properties
        expect(strategy.strategyId).toBeDefined();
        expect(strategy.sizeValue).toBeDefined();
        expect(strategy.sizeUnit).toBeDefined();
        expect(strategy.dimension).toBeDefined();
      });
    });
  });

  describe('Calculator with Mocked Strategies', () => {
    it('should allow testing calculator with specific strategies', () => {
      const mockRegistry = new SizeValueCalculationStrategyRegistry();
      
      // Register only specific strategies for testing
      mockRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
      mockRegistry.registerStrategy(new FillSizeValueCalculationStrategy());

      refactoredCalculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        mockRegistry
      );

      // Test with pixel strategy
      const pixelResult = refactoredCalculator.calculate(mockContext);
      expect(pixelResult).toBe(100);

      // Test with fill strategy
      refactoredCalculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        mockRegistry
      );

      const fillResult = refactoredCalculator.calculate(mockContext);
      expect(fillResult).toBe(800); // Parent width
    });
  });

  describe('Error Handling Testing', () => {
    it('should allow testing error scenarios', () => {
      const mockRegistry = new SizeValueCalculationStrategyRegistry();
      // Don't register any strategies

      refactoredCalculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        mockRegistry
      );

      // Should handle missing strategy gracefully
      expect(() => refactoredCalculator.calculate(mockContext)).not.toThrow();
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
});
