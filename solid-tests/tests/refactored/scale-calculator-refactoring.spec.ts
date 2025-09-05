import { RefactoredScaleUnitCalculator } from '../../../old_src/src/classes/RefactoredScaleUnitCalculator';
import { ScaleValueCalculationStrategyRegistry } from '../../../old_src/src/strategies/value/ScaleValueCalculationStrategyRegistry';
import {
  PixelScaleValueCalculationStrategy,
  FactorScaleValueCalculationStrategy,
  ResponsiveScaleValueCalculationStrategy,
  RandomScaleValueCalculationStrategy,
  ContentScaleValueCalculationStrategy,
} from '../../../old_src/src/strategies/value';
import { ScaleValue } from '../../../old_src/src/enums/ScaleValue';
import { ScaleUnit } from '../../../old_src/src/enums/ScaleUnit';
import { Dimension } from '../../../old_src/src/enums/Dimension';
import { TestHelpers } from './test-helpers';

describe('Scale Calculator Refactoring', () => {
  let scaleStrategyRegistry: ScaleValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    scaleStrategyRegistry = new ScaleValueCalculationStrategyRegistry();
    setupScaleStrategyRegistry(scaleStrategyRegistry);
    mockContext = TestHelpers.createMockContext();
  });

  describe('Pixel Scale Calculations', () => {
    it('should calculate pixel scales correctly', () => {
      const calculator = new RefactoredScaleUnitCalculator(
        'test-id',
        'Test Calculator',
        ScaleUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        scaleStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(100);
    });
  });

  describe('Factor Scale Calculations', () => {
    it('should calculate factor scales correctly', () => {
      const calculator = new RefactoredScaleUnitCalculator(
        'test-id',
        'Test Calculator',
        ScaleUnit.FACTOR,
        Dimension.WIDTH,
        ScaleValue.FACTOR,
        false,
        scaleStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(1); // Default factor scale
    });
  });

  describe('Responsive Scale Calculations', () => {
    it('should calculate responsive scales correctly', () => {
      const calculator = new RefactoredScaleUnitCalculator(
        'test-id',
        'Test Calculator',
        ScaleUnit.RESPONSIVE,
        Dimension.WIDTH,
        ScaleValue.RESPONSIVE,
        false,
        scaleStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0); // Responsive scale should be positive
    });
  });

  describe('Random Scale Calculations', () => {
    it('should calculate random scales correctly', () => {
      const calculator = new RefactoredScaleUnitCalculator(
        'test-id',
        'Test Calculator',
        ScaleUnit.RANDOM,
        Dimension.WIDTH,
        ScaleValue.RANDOM,
        false,
        scaleStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0); // Random scale should be positive
      expect(result).toBeLessThanOrEqual(1); // Random scale should be <= 1
    });
  });

  describe('Content Scale Calculations', () => {
    it('should calculate content scales correctly', () => {
      const calculator = new RefactoredScaleUnitCalculator(
        'test-id',
        'Test Calculator',
        ScaleUnit.CONTENT,
        Dimension.WIDTH,
        ScaleValue.CONTENT,
        false,
        scaleStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0); // Content scale should be positive
    });
  });

  describe('Strategy Registry Integration', () => {
    it('should use correct strategy for each calculation type', () => {
      const calculator = new RefactoredScaleUnitCalculator(
        'test-id',
        'Test Calculator',
        ScaleUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        scaleStrategyRegistry
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
      const calculator = new RefactoredScaleUnitCalculator(
        'test-id',
        'Test Calculator',
        ScaleUnit.PIXEL,
        Dimension.WIDTH,
        'invalid' as any,
        false,
        scaleStrategyRegistry
      );

      // Should not throw error
      expect(() => calculator.calculate(mockContext)).not.toThrow();
    });
  });

  // Helper functions
  function setupScaleStrategyRegistry(registry: ScaleValueCalculationStrategyRegistry): void {
    registry.registerStrategy(new PixelScaleValueCalculationStrategy());
    registry.registerStrategy(new FactorScaleValueCalculationStrategy());
    registry.registerStrategy(new ResponsiveScaleValueCalculationStrategy());
    registry.registerStrategy(new RandomScaleValueCalculationStrategy());
    registry.registerStrategy(new ContentScaleValueCalculationStrategy());
    registry.preWarmCache();
  }
});
