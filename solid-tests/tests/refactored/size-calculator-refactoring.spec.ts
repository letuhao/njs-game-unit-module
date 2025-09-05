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
import { TestHelpers } from './test-helpers';

describe('Size Calculator Refactoring', () => {
  let sizeStrategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    sizeStrategyRegistry = new SizeValueCalculationStrategyRegistry();
    TestHelpers.setupStrategyRegistry(sizeStrategyRegistry);
    mockContext = TestHelpers.createMockContext();
  });

  describe('Pixel Size Calculations', () => {
    it('should calculate pixel sizes correctly', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        sizeStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(100);
    });
  });

  describe('Fill Size Calculations', () => {
    it('should calculate fill sizes correctly', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        sizeStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(800); // Parent width
    });
  });

  describe('Auto Size Calculations', () => {
    it('should calculate auto sizes correctly', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.AUTO,
        false,
        sizeStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(0); // Auto size
    });
  });

  describe('Parent Width Calculations', () => {
    it('should calculate parent width sizes correctly', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        sizeStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(800); // Parent width
    });
  });

  describe('Viewport Width Calculations', () => {
    it('should calculate viewport width sizes correctly', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.VIEWPORT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        sizeStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(1366); // Viewport width
    });
  });

  describe('Strategy Registry Integration', () => {
    it('should use correct strategy for each calculation type', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        sizeStrategyRegistry
      );

      // Test that the correct strategy is used
      const availableStrategies = calculator.getAvailableStrategies();
      expect(availableStrategies.length).toBe(5);

      // Test strategy statistics
      const stats = calculator.getStrategyStatistics();
      expect(stats.totalStrategies).toBe(5);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid inputs gracefully', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        'invalid' as any,
        false,
        sizeStrategyRegistry
      );

      // Should not throw error
      expect(() => calculator.calculate(mockContext)).not.toThrow();
    });
  });
});
