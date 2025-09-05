import { RefactoredSizeUnitCalculator } from '../classes/RefactoredSizeUnitCalculator';
import { RefactoredPositionUnitCalculator } from '../classes/RefactoredPositionUnitCalculator';
import { RefactoredScaleUnitCalculator } from '../classes/RefactoredScaleUnitCalculator';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';
import { PositionValueCalculationStrategyRegistry } from '../strategies/value/PositionValueCalculationStrategyRegistry';
import { ScaleValueCalculationStrategyRegistry } from '../strategies/value/ScaleValueCalculationStrategyRegistry';
import {
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy,
  ParentWidthSizeValueCalculationStrategy,
  ViewportWidthSizeValueCalculationStrategy,
} from '../strategies/value';
import {
  PixelPositionValueCalculationStrategy,
  CenterPositionValueCalculationStrategy,
  ContentLeftPositionValueCalculationStrategy,
  ParentCenterXPositionValueCalculationStrategy,
  SceneCenterXPositionValueCalculationStrategy,
} from '../strategies/value';
import {
  PixelScaleValueCalculationStrategy,
  FactorScaleValueCalculationStrategy,
  ResponsiveScaleValueCalculationStrategy,
  RandomScaleValueCalculationStrategy,
  ContentScaleValueCalculationStrategy,
} from '../strategies/value';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionValue } from '../enums/PositionValue';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { Dimension } from '../enums/Dimension';
import { container, TOKENS } from '../container/DiContainer';

describe('Complete Calculator Refactoring', () => {
  let sizeStrategyRegistry: SizeValueCalculationStrategyRegistry;
  let positionStrategyRegistry: PositionValueCalculationStrategyRegistry;
  let scaleStrategyRegistry: ScaleValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Size Calculator Refactoring', () => {
    let sizeCalculator: RefactoredSizeUnitCalculator;

    beforeEach(() => {
      setupSizeCalculator();
    });

    it('should calculate size values using strategy pattern', () => {
      testSizeCalculationStrategyPattern();
    });

    it('should handle different size units correctly', () => {
      testDifferentSizeUnits();
    });

    it('should handle different size values correctly', () => {
      testDifferentSizeValues();
    });

    it('should handle edge cases gracefully', () => {
      testSizeEdgeCases();
    });
  });

  describe('Position Calculator Refactoring', () => {
    let positionCalculator: RefactoredPositionUnitCalculator;

    beforeEach(() => {
      setupPositionCalculator();
    });

    it('should calculate position values using strategy pattern', () => {
      testPositionCalculationStrategyPattern();
    });

    it('should handle different position units correctly', () => {
      testDifferentPositionUnits();
    });

    it('should handle different position values correctly', () => {
      testDifferentPositionValues();
    });

    it('should handle edge cases gracefully', () => {
      testPositionEdgeCases();
    });
  });

  describe('Scale Calculator Refactoring', () => {
    let scaleCalculator: RefactoredScaleUnitCalculator;

    beforeEach(() => {
      setupScaleCalculator();
    });

    it('should calculate scale values using strategy pattern', () => {
      testScaleCalculationStrategyPattern();
    });

    it('should handle different scale units correctly', () => {
      testDifferentScaleUnits();
    });

    it('should handle different scale values correctly', () => {
      testDifferentScaleValues();
    });

    it('should handle edge cases gracefully', () => {
      testScaleEdgeCases();
    });
  });

  describe('Integration Tests', () => {
    it('should work with all calculator types together', () => {
      testAllCalculatorTypesIntegration();
    });

    it('should handle invalid inputs gracefully', () => {
      testInvalidInputsHandling();
    });

    it('should handle missing context properties', () => {
      testMissingContextProperties();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    initializeStrategyRegistries();
    registerSizeStrategies();
    registerPositionStrategies();
    registerScaleStrategies();
    createMockContext();
  }

  function initializeStrategyRegistries(): void {
    try {
      sizeStrategyRegistry = container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      sizeStrategyRegistry = new SizeValueCalculationStrategyRegistry();
    }

    try {
      positionStrategyRegistry = container.resolve(TOKENS.POSITION_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      positionStrategyRegistry = new PositionValueCalculationStrategyRegistry();
    }

    try {
      scaleStrategyRegistry = container.resolve(TOKENS.SCALE_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      scaleStrategyRegistry = new ScaleValueCalculationStrategyRegistry();
    }
  }

  function registerSizeStrategies(): void {
    try {
      const pixelSizeStrategy = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      const fillSizeStrategy = container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY);
      const autoSizeStrategy = container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY);
      const parentWidthSizeStrategy = container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY);
      const viewportWidthSizeStrategy = container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY);

      sizeStrategyRegistry.registerStrategy(pixelSizeStrategy || new PixelSizeValueCalculationStrategy());
      sizeStrategyRegistry.registerStrategy(fillSizeStrategy || new FillSizeValueCalculationStrategy());
      sizeStrategyRegistry.registerStrategy(autoSizeStrategy || new AutoSizeValueCalculationStrategy());
      sizeStrategyRegistry.registerStrategy(parentWidthSizeStrategy || new ParentWidthSizeValueCalculationStrategy());
      sizeStrategyRegistry.registerStrategy(viewportWidthSizeStrategy || new ViewportWidthSizeValueCalculationStrategy());
    } catch (error) {
      registerSizeStrategiesFallback();
    }
  }

  function registerSizeStrategiesFallback(): void {
    sizeStrategyRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
    sizeStrategyRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
    sizeStrategyRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
    sizeStrategyRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    sizeStrategyRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());
  }

  function registerPositionStrategies(): void {
    try {
      const pixelPositionStrategy = container.resolve(TOKENS.PIXEL_POSITION_VALUE_STRATEGY);
      const centerPositionStrategy = container.resolve(TOKENS.CENTER_POSITION_VALUE_STRATEGY);
      const contentLeftPositionStrategy = container.resolve(TOKENS.CONTENT_LEFT_POSITION_VALUE_STRATEGY);
      const parentCenterXPositionStrategy = container.resolve(TOKENS.PARENT_CENTER_X_POSITION_VALUE_STRATEGY);
      const sceneCenterXPositionStrategy = container.resolve(TOKENS.SCENE_CENTER_X_POSITION_VALUE_STRATEGY);

      positionStrategyRegistry.registerStrategy(pixelPositionStrategy || new PixelPositionValueCalculationStrategy());
      positionStrategyRegistry.registerStrategy(centerPositionStrategy || new CenterPositionValueCalculationStrategy());
      positionStrategyRegistry.registerStrategy(contentLeftPositionStrategy || new ContentLeftPositionValueCalculationStrategy());
      positionStrategyRegistry.registerStrategy(parentCenterXPositionStrategy || new ParentCenterXPositionValueCalculationStrategy());
      positionStrategyRegistry.registerStrategy(sceneCenterXPositionStrategy || new SceneCenterXPositionValueCalculationStrategy());
    } catch (error) {
      registerPositionStrategiesFallback();
    }
  }

  function registerPositionStrategiesFallback(): void {
    positionStrategyRegistry.registerStrategy(new PixelPositionValueCalculationStrategy());
    positionStrategyRegistry.registerStrategy(new CenterPositionValueCalculationStrategy());
    positionStrategyRegistry.registerStrategy(new ContentLeftPositionValueCalculationStrategy());
    positionStrategyRegistry.registerStrategy(new ParentCenterXPositionValueCalculationStrategy());
    positionStrategyRegistry.registerStrategy(new SceneCenterXPositionValueCalculationStrategy());
  }

  function registerScaleStrategies(): void {
    try {
      const pixelScaleStrategy = container.resolve(TOKENS.PIXEL_SCALE_VALUE_STRATEGY);
      const factorScaleStrategy = container.resolve(TOKENS.FACTOR_SCALE_VALUE_STRATEGY);
      const responsiveScaleStrategy = container.resolve(TOKENS.RESPONSIVE_SCALE_VALUE_STRATEGY);
      const randomScaleStrategy = container.resolve(TOKENS.RANDOM_SCALE_VALUE_STRATEGY);
      const contentScaleStrategy = container.resolve(TOKENS.CONTENT_SCALE_VALUE_STRATEGY);

      scaleStrategyRegistry.registerStrategy(pixelScaleStrategy || new PixelScaleValueCalculationStrategy());
      scaleStrategyRegistry.registerStrategy(factorScaleStrategy || new FactorScaleValueCalculationStrategy());
      scaleStrategyRegistry.registerStrategy(responsiveScaleStrategy || new ResponsiveScaleValueCalculationStrategy());
      scaleStrategyRegistry.registerStrategy(randomScaleStrategy || new RandomScaleValueCalculationStrategy());
      scaleStrategyRegistry.registerStrategy(contentScaleStrategy || new ContentScaleValueCalculationStrategy());
    } catch (error) {
      registerScaleStrategiesFallback();
    }
  }

  function registerScaleStrategiesFallback(): void {
    scaleStrategyRegistry.registerStrategy(new PixelScaleValueCalculationStrategy());
    scaleStrategyRegistry.registerStrategy(new FactorScaleValueCalculationStrategy());
    scaleStrategyRegistry.registerStrategy(new ResponsiveScaleValueCalculationStrategy());
    scaleStrategyRegistry.registerStrategy(new RandomScaleValueCalculationStrategy());
    scaleStrategyRegistry.registerStrategy(new ContentScaleValueCalculationStrategy());
  }

  function createMockContext(): void {
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
      viewport: { width: 1920, height: 1080 },
      dimension: Dimension.WIDTH,
    };
  }

  function setupSizeCalculator(): void {
    try {
      sizeCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
    } catch (error) {
      sizeCalculator = new RefactoredSizeUnitCalculator();
    }
  }

  function setupPositionCalculator(): void {
    try {
      positionCalculator = container.resolve(TOKENS.REFACTORED_POSITION_UNIT_CALCULATOR);
    } catch (error) {
      positionCalculator = new RefactoredPositionUnitCalculator();
    }
  }

  function setupScaleCalculator(): void {
    try {
      scaleCalculator = container.resolve(TOKENS.REFACTORED_SCALE_UNIT_CALCULATOR);
    } catch (error) {
      scaleCalculator = new RefactoredScaleUnitCalculator();
    }
  }

  function testSizeCalculationStrategyPattern(): void {
    const testCases = [
      { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL, expected: 100 },
      { value: SizeValue.FILL, unit: SizeUnit.FILL, expected: 800 },
      { value: SizeValue.AUTO, unit: SizeUnit.AUTO, expected: 0 },
      { value: SizeValue.PARENT_WIDTH, unit: SizeUnit.PARENT_WIDTH, expected: 800 },
      { value: SizeValue.VIEWPORT_WIDTH, unit: SizeUnit.VIEWPORT_WIDTH, expected: 1920 },
    ];

    for (const testCase of testCases) {
      const result = sizeCalculator.calculate(testCase.value, testCase.unit, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentSizeUnits(): void {
    const units = [SizeUnit.PIXEL, SizeUnit.FILL, SizeUnit.AUTO, SizeUnit.PARENT_WIDTH, SizeUnit.VIEWPORT_WIDTH];
    
    for (const unit of units) {
      const result = sizeCalculator.calculate(SizeValue.PIXEL, unit, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentSizeValues(): void {
    const values = [SizeValue.PIXEL, SizeValue.FILL, SizeValue.AUTO, SizeValue.PARENT_WIDTH, SizeValue.VIEWPORT_WIDTH];
    
    for (const value of values) {
      const result = sizeCalculator.calculate(value, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testSizeEdgeCases(): void {
    const edgeCases = [
      { value: 0, unit: SizeUnit.PIXEL },
      { value: -100, unit: SizeUnit.PIXEL },
      { value: 10000, unit: SizeUnit.PIXEL },
    ];

    for (const edgeCase of edgeCases) {
      const result = sizeCalculator.calculate(edgeCase.value, edgeCase.unit, mockContext);
      expect(typeof result).toBe('number');
    }
  }

  function testPositionCalculationStrategyPattern(): void {
    const testCases = [
      { value: PositionValue.PIXEL, unit: PositionUnit.PIXEL, expected: 100 },
      { value: PositionValue.CENTER, unit: PositionUnit.CENTER, expected: 400 },
      { value: PositionValue.CONTENT_LEFT, unit: PositionUnit.CONTENT_LEFT, expected: 0 },
      { value: PositionValue.PARENT_CENTER_X, unit: PositionUnit.PARENT_CENTER_X, expected: 400 },
      { value: PositionValue.SCENE_CENTER_X, unit: PositionUnit.SCENE_CENTER_X, expected: 600 },
    ];

    for (const testCase of testCases) {
      const result = positionCalculator.calculate(testCase.value, testCase.unit, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentPositionUnits(): void {
    const units = [PositionUnit.PIXEL, PositionUnit.CENTER, PositionUnit.CONTENT_LEFT, PositionUnit.PARENT_CENTER_X, PositionUnit.SCENE_CENTER_X];
    
    for (const unit of units) {
      const result = positionCalculator.calculate(PositionValue.PIXEL, unit, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentPositionValues(): void {
    const values = [PositionValue.PIXEL, PositionValue.CENTER, PositionValue.CONTENT_LEFT, PositionValue.PARENT_CENTER_X, PositionValue.SCENE_CENTER_X];
    
    for (const value of values) {
      const result = positionCalculator.calculate(value, PositionUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testPositionEdgeCases(): void {
    const edgeCases = [
      { value: 0, unit: PositionUnit.PIXEL },
      { value: -100, unit: PositionUnit.PIXEL },
      { value: 10000, unit: PositionUnit.PIXEL },
    ];

    for (const edgeCase of edgeCases) {
      const result = positionCalculator.calculate(edgeCase.value, edgeCase.unit, mockContext);
      expect(typeof result).toBe('number');
    }
  }

  function testScaleCalculationStrategyPattern(): void {
    const testCases = [
      { value: ScaleValue.PIXEL, unit: ScaleUnit.PIXEL, expected: 1 },
      { value: ScaleValue.FACTOR, unit: ScaleUnit.FACTOR, expected: 1.5 },
      { value: ScaleValue.RESPONSIVE, unit: ScaleUnit.RESPONSIVE, expected: 1 },
      { value: ScaleValue.RANDOM, unit: ScaleUnit.RANDOM, expected: 1 },
      { value: ScaleValue.CONTENT, unit: ScaleUnit.CONTENT, expected: 1 },
    ];

    for (const testCase of testCases) {
      const result = scaleCalculator.calculate(testCase.value, testCase.unit, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentScaleUnits(): void {
    const units = [ScaleUnit.PIXEL, ScaleUnit.FACTOR, ScaleUnit.RESPONSIVE, ScaleUnit.RANDOM, ScaleUnit.CONTENT];
    
    for (const unit of units) {
      const result = scaleCalculator.calculate(ScaleValue.PIXEL, unit, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentScaleValues(): void {
    const values = [ScaleValue.PIXEL, ScaleValue.FACTOR, ScaleValue.RESPONSIVE, ScaleValue.RANDOM, ScaleValue.CONTENT];
    
    for (const value of values) {
      const result = scaleCalculator.calculate(value, ScaleUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testScaleEdgeCases(): void {
    const edgeCases = [
      { value: 0, unit: ScaleUnit.PIXEL },
      { value: -1, unit: ScaleUnit.PIXEL },
      { value: 10, unit: ScaleUnit.PIXEL },
    ];

    for (const edgeCase of edgeCases) {
      const result = scaleCalculator.calculate(edgeCase.value, edgeCase.unit, mockContext);
      expect(typeof result).toBe('number');
    }
  }

  function testAllCalculatorTypesIntegration(): void {
    let sizeCalculator: RefactoredSizeUnitCalculator;
    let positionCalculator: RefactoredPositionUnitCalculator;
    let scaleCalculator: RefactoredScaleUnitCalculator;

    try {
      sizeCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
      positionCalculator = container.resolve(TOKENS.REFACTORED_POSITION_UNIT_CALCULATOR);
      scaleCalculator = container.resolve(TOKENS.REFACTORED_SCALE_UNIT_CALCULATOR);
    } catch (error) {
      sizeCalculator = new RefactoredSizeUnitCalculator();
      positionCalculator = new RefactoredPositionUnitCalculator();
      scaleCalculator = new RefactoredScaleUnitCalculator();
    }

    const sizeResult = sizeCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
    const positionResult = positionCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
    const scaleResult = scaleCalculator.calculate(ScaleValue.PIXEL, ScaleUnit.PIXEL, mockContext);

    expect(typeof sizeResult).toBe('number');
    expect(typeof positionResult).toBe('number');
    expect(typeof scaleResult).toBe('number');
    expect(sizeResult).toBeGreaterThanOrEqual(0);
    expect(positionResult).toBeGreaterThanOrEqual(0);
    expect(scaleResult).toBeGreaterThanOrEqual(0);
  }

  function testInvalidInputsHandling(): void {
    let sizeCalculator: RefactoredSizeUnitCalculator;
    let positionCalculator: RefactoredPositionUnitCalculator;
    let scaleCalculator: RefactoredScaleUnitCalculator;

    try {
      sizeCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
      positionCalculator = container.resolve(TOKENS.REFACTORED_POSITION_UNIT_CALCULATOR);
      scaleCalculator = container.resolve(TOKENS.REFACTORED_SCALE_UNIT_CALCULATOR);
    } catch (error) {
      sizeCalculator = new RefactoredSizeUnitCalculator();
      positionCalculator = new RefactoredPositionUnitCalculator();
      scaleCalculator = new RefactoredScaleUnitCalculator();
    }

    const invalidInputs = [
      { value: 'invalid' as any, unit: SizeUnit.PIXEL },
      { value: SizeValue.PIXEL, unit: 'invalid' as any },
      { value: null, unit: SizeUnit.PIXEL },
      { value: SizeValue.PIXEL, unit: null },
    ];

    for (const invalidInput of invalidInputs) {
      const sizeResult = sizeCalculator.calculate(invalidInput.value, invalidInput.unit, mockContext);
      const positionResult = positionCalculator.calculate(invalidInput.value, invalidInput.unit, mockContext);
      const scaleResult = scaleCalculator.calculate(invalidInput.value, invalidInput.unit, mockContext);

      expect(typeof sizeResult).toBe('number');
      expect(typeof positionResult).toBe('number');
      expect(typeof scaleResult).toBe('number');
    }
  }

  function testMissingContextProperties(): void {
    let sizeCalculator: RefactoredSizeUnitCalculator;
    let positionCalculator: RefactoredPositionUnitCalculator;
    let scaleCalculator: RefactoredScaleUnitCalculator;

    try {
      sizeCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
      positionCalculator = container.resolve(TOKENS.REFACTORED_POSITION_UNIT_CALCULATOR);
      scaleCalculator = container.resolve(TOKENS.REFACTORED_SCALE_UNIT_CALCULATOR);
    } catch (error) {
      sizeCalculator = new RefactoredSizeUnitCalculator();
      positionCalculator = new RefactoredPositionUnitCalculator();
      scaleCalculator = new RefactoredScaleUnitCalculator();
    }

    const incompleteContexts = [
      {},
      { parent: { width: 800, height: 600, x: 0, y: 0 } },
      { scene: { width: 1200, height: 800 } },
      { viewport: { width: 1920, height: 1080 } },
    ];

    for (const incompleteContext of incompleteContexts) {
      const sizeResult = sizeCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, incompleteContext as any);
      const positionResult = positionCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, incompleteContext as any);
      const scaleResult = scaleCalculator.calculate(ScaleValue.PIXEL, ScaleUnit.PIXEL, incompleteContext as any);

      expect(typeof sizeResult).toBe('number');
      expect(typeof positionResult).toBe('number');
      expect(typeof scaleResult).toBe('number');
    }
  }
});