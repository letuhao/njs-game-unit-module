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

describe('Calculator Refactoring Comparison - Functional Equivalence', () => {
  let originalCalculator: SizeUnitCalculator;
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Functional Equivalence', () => {
    it('should produce identical results for numeric values', () => {
      testNumericValuesEquivalence();
    });

    it('should produce identical results for FILL values', () => {
      testFillValuesEquivalence();
    });

    it('should produce identical results for AUTO values', () => {
      testAutoValuesEquivalence();
    });

    it('should produce identical results for PARENT_WIDTH values', () => {
      testParentWidthValuesEquivalence();
    });

    it('should produce identical results for VIEWPORT_WIDTH values', () => {
      testViewportWidthValuesEquivalence();
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

  function testNumericValuesEquivalence(): void {
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

    const originalResult = originalCalculator.calculate(mockContext);
    const refactoredResult = refactoredCalculator.calculate(mockContext);

    expect(refactoredResult).toBe(originalResult);
  }

  function testFillValuesEquivalence(): void {
    originalCalculator = new SizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.PARENT_WIDTH,
      Dimension.WIDTH,
      SizeValue.FILL
    );

    refactoredCalculator = new RefactoredSizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.PARENT_WIDTH,
      Dimension.WIDTH,
      SizeValue.FILL,
      false,
      strategyRegistry
    );

    const originalResult = originalCalculator.calculate(mockContext);
    const refactoredResult = refactoredCalculator.calculate(mockContext);

    expect(refactoredResult).toBe(originalResult);
  }

  function testAutoValuesEquivalence(): void {
    originalCalculator = new SizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      SizeValue.AUTO
    );

    refactoredCalculator = new RefactoredSizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      SizeValue.AUTO,
      false,
      strategyRegistry
    );

    const originalResult = originalCalculator.calculate(mockContext);
    const refactoredResult = refactoredCalculator.calculate(mockContext);

    expect(refactoredResult).toBe(originalResult);
  }

  function testParentWidthValuesEquivalence(): void {
    originalCalculator = new SizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.PARENT_WIDTH,
      Dimension.WIDTH,
      SizeValue.FILL
    );

    refactoredCalculator = new RefactoredSizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.PARENT_WIDTH,
      Dimension.WIDTH,
      SizeValue.FILL,
      false,
      strategyRegistry
    );

    const originalResult = originalCalculator.calculate(mockContext);
    const refactoredResult = refactoredCalculator.calculate(mockContext);

    expect(refactoredResult).toBe(originalResult);
  }

  function testViewportWidthValuesEquivalence(): void {
    originalCalculator = new SizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.VIEWPORT_WIDTH,
      Dimension.WIDTH,
      SizeValue.FILL
    );

    refactoredCalculator = new RefactoredSizeUnitCalculator(
      'test-id',
      'Test Calculator',
      SizeUnit.VIEWPORT_WIDTH,
      Dimension.WIDTH,
      SizeValue.FILL,
      false,
      strategyRegistry
    );

    const originalResult = originalCalculator.calculate(mockContext);
    const refactoredResult = refactoredCalculator.calculate(mockContext);

    expect(refactoredResult).toBe(originalResult);
  }
});
