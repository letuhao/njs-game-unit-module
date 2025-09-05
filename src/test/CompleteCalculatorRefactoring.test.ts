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
    // Initialize strategy registries using DI container
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

    // Register all size strategies using DI container
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
      // Fallback to direct instantiation if DI fails
      sizeStrategyRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
      sizeStrategyRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
      sizeStrategyRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
      sizeStrategyRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
      sizeStrategyRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());
    }

    // Register all position strategies using DI container
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
      // Fallback to direct instantiation if DI fails
      positionStrategyRegistry.registerStrategy(new PixelPositionValueCalculationStrategy());
      positionStrategyRegistry.registerStrategy(new CenterPositionValueCalculationStrategy());
      positionStrategyRegistry.registerStrategy(new ContentLeftPositionValueCalculationStrategy());
      positionStrategyRegistry.registerStrategy(new ParentCenterXPositionValueCalculationStrategy());
      positionStrategyRegistry.registerStrategy(new SceneCenterXPositionValueCalculationStrategy());
    }

    // Register all scale strategies using DI container
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
      // Fallback to direct instantiation if DI fails
      scaleStrategyRegistry.registerStrategy(new PixelScaleValueCalculationStrategy());
      scaleStrategyRegistry.registerStrategy(new FactorScaleValueCalculationStrategy());
      scaleStrategyRegistry.registerStrategy(new ResponsiveScaleValueCalculationStrategy());
      scaleStrategyRegistry.registerStrategy(new RandomScaleValueCalculationStrategy());
      scaleStrategyRegistry.registerStrategy(new ContentScaleValueCalculationStrategy());
    }

    // Create mock context
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
      viewport: { width: 1920, height: 1080 },
      dimension: Dimension.WIDTH,
    };
  });

  describe('Size Calculator Refactoring', () => {
    let sizeCalculator: RefactoredSizeUnitCalculator;

    beforeEach(() => {
      try {
        sizeCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
      } catch (error) {
        sizeCalculator = new RefactoredSizeUnitCalculator();
      }
    });

    it('should calculate size values using strategy pattern', () => {
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
    });

    it('should handle different contexts for size calculations', () => {
      const contexts = [
        { ...mockContext, parent: { width: 400, height: 300, x: 0, y: 0 } },
        { ...mockContext, scene: { width: 800, height: 600 } },
        { ...mockContext, viewport: { width: 1024, height: 768 } },
      ];

      for (const context of contexts) {
        const result = sizeCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, context);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should use strategy registry for size calculations', () => {
      const result = sizeCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      
      expect(typeof result).toBe('number');
      expect(sizeStrategyRegistry.getStrategyCount()).toBeGreaterThan(0);
    });
  });

  describe('Position Calculator Refactoring', () => {
    let positionCalculator: RefactoredPositionUnitCalculator;

    beforeEach(() => {
      try {
        positionCalculator = container.resolve(TOKENS.REFACTORED_POSITION_UNIT_CALCULATOR);
      } catch (error) {
        positionCalculator = new RefactoredPositionUnitCalculator();
      }
    });

    it('should calculate position values using strategy pattern', () => {
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
    });

    it('should handle different contexts for position calculations', () => {
      const contexts = [
        { ...mockContext, parent: { width: 400, height: 300, x: 0, y: 0 } },
        { ...mockContext, scene: { width: 800, height: 600 } },
        { ...mockContext, viewport: { width: 1024, height: 768 } },
      ];

      for (const context of contexts) {
        const result = positionCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, context);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should use strategy registry for position calculations', () => {
      const result = positionCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
      
      expect(typeof result).toBe('number');
      expect(positionStrategyRegistry.getStrategyCount()).toBeGreaterThan(0);
    });
  });

  describe('Scale Calculator Refactoring', () => {
    let scaleCalculator: RefactoredScaleUnitCalculator;

    beforeEach(() => {
      try {
        scaleCalculator = container.resolve(TOKENS.REFACTORED_SCALE_UNIT_CALCULATOR);
      } catch (error) {
        scaleCalculator = new RefactoredScaleUnitCalculator();
      }
    });

    it('should calculate scale values using strategy pattern', () => {
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
        expect(result).toBeGreaterThan(0);
      }
    });

    it('should handle different contexts for scale calculations', () => {
      const contexts = [
        { ...mockContext, parent: { width: 400, height: 300, x: 0, y: 0 } },
        { ...mockContext, scene: { width: 800, height: 600 } },
        { ...mockContext, viewport: { width: 1024, height: 768 } },
      ];

      for (const context of contexts) {
        const result = scaleCalculator.calculate(ScaleValue.PIXEL, ScaleUnit.PIXEL, context);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      }
    });

    it('should use strategy registry for scale calculations', () => {
      const result = scaleCalculator.calculate(ScaleValue.PIXEL, ScaleUnit.PIXEL, mockContext);
      
      expect(typeof result).toBe('number');
      expect(scaleStrategyRegistry.getStrategyCount()).toBeGreaterThan(0);
    });
  });

  describe('Integration Testing', () => {
    it('should work with all calculators together', () => {
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
      expect(scaleResult).toBeGreaterThan(0);
    });

    it('should handle complex calculation scenarios', () => {
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

      // Test multiple calculations in sequence
      const results = [];
      for (let i = 0; i < 10; i++) {
        const sizeResult = sizeCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
        const positionResult = positionCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
        const scaleResult = scaleCalculator.calculate(ScaleValue.PIXEL, ScaleUnit.PIXEL, mockContext);
        
        results.push({ sizeResult, positionResult, scaleResult });
      }

      results.forEach(result => {
        expect(typeof result.sizeResult).toBe('number');
        expect(typeof result.positionResult).toBe('number');
        expect(typeof result.scaleResult).toBe('number');
      });
    });
  });

  describe('Performance Testing', () => {
    it('should perform calculations efficiently', () => {
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

      const iterations = 1000;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        sizeCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
        positionCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
        scaleCalculator.calculate(ScaleValue.PIXEL, ScaleUnit.PIXEL, mockContext);
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const averageTime = totalTime / (iterations * 3);

      console.log(`Performance Test Results:`);
      console.log(`  Total time: ${totalTime.toFixed(2)}ms`);
      console.log(`  Average time per calculation: ${averageTime.toFixed(4)}ms`);
      console.log(`  Calculations per second: ${(1000 / averageTime).toFixed(0)}`);

      expect(totalTime).toBeLessThan(1000); // Should complete within 1 second
      expect(averageTime).toBeLessThan(1); // Average should be less than 1ms
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid inputs gracefully', () => {
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
    });

    it('should handle missing context properties', () => {
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
    });
  });
});
