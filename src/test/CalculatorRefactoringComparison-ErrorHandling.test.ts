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

describe('Calculator Refactoring Comparison - Error Handling', () => {
  let originalCalculator: SizeUnitCalculator;
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Error Handling Comparison', () => {
    it('should handle errors consistently', () => {
      testErrorHandlingConsistency();
    });

    it('should provide better error messages in refactored version', () => {
      testImprovedErrorMessages();
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

  function testErrorHandlingConsistency(): void {
    const invalidContext = null as any;

    originalCalculator = new SizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      100
    );

    refactoredCalculator = new RefactoredSizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      100,
      false,
      strategyRegistry
    );

    // Both should handle errors consistently
    expect(() => originalCalculator.calculate(invalidContext)).toThrow();
    expect(() => refactoredCalculator.calculate(invalidContext)).toThrow();
  }

  function testImprovedErrorMessages(): void {
    const invalidContext = null as any;

    refactoredCalculator = new RefactoredSizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      100,
      false,
      strategyRegistry
    );

    try {
      refactoredCalculator.calculate(invalidContext);
    } catch (error) {
      expect(error.message).toContain('context');
    }
  }
});
