import { RefactoredPositionUnitCalculator } from '../../../old_src/src/classes/RefactoredPositionUnitCalculator';
import { PositionValueCalculationStrategyRegistry } from '../../../old_src/src/strategies/value/PositionValueCalculationStrategyRegistry';
import {
  PixelPositionValueCalculationStrategy,
  CenterPositionValueCalculationStrategy,
  ContentLeftPositionValueCalculationStrategy,
  ParentCenterXPositionValueCalculationStrategy,
  SceneCenterXPositionValueCalculationStrategy,
} from '../../../old_src/src/strategies/value';
import { PositionValue } from '../../../old_src/src/enums/PositionValue';
import { PositionUnit } from '../../../old_src/src/enums/PositionUnit';
import { Dimension } from '../../../old_src/src/enums/Dimension';
import { TestHelpers } from './test-helpers';

describe('Position Calculator Refactoring', () => {
  let positionStrategyRegistry: PositionValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    positionStrategyRegistry = new PositionValueCalculationStrategyRegistry();
    setupPositionStrategyRegistry(positionStrategyRegistry);
    mockContext = TestHelpers.createMockContext();
  });

  describe('Pixel Position Calculations', () => {
    it('should calculate pixel positions correctly', () => {
      const calculator = new RefactoredPositionUnitCalculator(
        'test-id',
        'Test Calculator',
        PositionUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        positionStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(100);
    });
  });

  describe('Center Position Calculations', () => {
    it('should calculate center positions correctly', () => {
      const calculator = new RefactoredPositionUnitCalculator(
        'test-id',
        'Test Calculator',
        PositionUnit.CENTER,
        Dimension.WIDTH,
        PositionValue.CENTER,
        false,
        positionStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(400); // Center of parent width (800/2)
    });
  });

  describe('Content Left Position Calculations', () => {
    it('should calculate content left positions correctly', () => {
      const calculator = new RefactoredPositionUnitCalculator(
        'test-id',
        'Test Calculator',
        PositionUnit.CONTENT_LEFT,
        Dimension.WIDTH,
        PositionValue.CONTENT_LEFT,
        false,
        positionStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(0); // Content left position
    });
  });

  describe('Parent Center X Position Calculations', () => {
    it('should calculate parent center X positions correctly', () => {
      const calculator = new RefactoredPositionUnitCalculator(
        'test-id',
        'Test Calculator',
        PositionUnit.PARENT_CENTER_X,
        Dimension.WIDTH,
        PositionValue.PARENT_CENTER_X,
        false,
        positionStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(400); // Parent center X (800/2)
    });
  });

  describe('Scene Center X Position Calculations', () => {
    it('should calculate scene center X positions correctly', () => {
      const calculator = new RefactoredPositionUnitCalculator(
        'test-id',
        'Test Calculator',
        PositionUnit.SCENE_CENTER_X,
        Dimension.WIDTH,
        PositionValue.SCENE_CENTER_X,
        false,
        positionStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(960); // Scene center X (1920/2)
    });
  });

  describe('Strategy Registry Integration', () => {
    it('should use correct strategy for each calculation type', () => {
      const calculator = new RefactoredPositionUnitCalculator(
        'test-id',
        'Test Calculator',
        PositionUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        positionStrategyRegistry
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
      const calculator = new RefactoredPositionUnitCalculator(
        'test-id',
        'Test Calculator',
        PositionUnit.PIXEL,
        Dimension.WIDTH,
        'invalid' as any,
        false,
        positionStrategyRegistry
      );

      // Should not throw error
      expect(() => calculator.calculate(mockContext)).not.toThrow();
    });
  });

  // Helper functions
  function setupPositionStrategyRegistry(registry: PositionValueCalculationStrategyRegistry): void {
    registry.registerStrategy(new PixelPositionValueCalculationStrategy());
    registry.registerStrategy(new CenterPositionValueCalculationStrategy());
    registry.registerStrategy(new ContentLeftPositionValueCalculationStrategy());
    registry.registerStrategy(new ParentCenterXPositionValueCalculationStrategy());
    registry.registerStrategy(new SceneCenterXPositionValueCalculationStrategy());
    registry.preWarmCache();
  }
});
