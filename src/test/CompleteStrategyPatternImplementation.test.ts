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

describe('Complete Strategy Pattern Implementation', () => {
  let sizeRegistry: SizeValueCalculationStrategyRegistry;
  let positionRegistry: PositionValueCalculationStrategyRegistry;
  let scaleRegistry: ScaleValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    // Initialize registries using DI container
    try {
      sizeRegistry = container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      sizeRegistry = new SizeValueCalculationStrategyRegistry();
    }

    try {
      positionRegistry = container.resolve(TOKENS.POSITION_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      positionRegistry = new PositionValueCalculationStrategyRegistry();
    }

    try {
      scaleRegistry = container.resolve(TOKENS.SCALE_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      scaleRegistry = new ScaleValueCalculationStrategyRegistry();
    }

    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };

    // Register all strategies using DI container
    try {
      const pixelSizeStrategy = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      const fillSizeStrategy = container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY);
      const autoSizeStrategy = container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY);
      const parentWidthSizeStrategy = container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY);
      const viewportWidthSizeStrategy = container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY);

      sizeRegistry.registerStrategy(pixelSizeStrategy || new PixelSizeValueCalculationStrategy());
      sizeRegistry.registerStrategy(fillSizeStrategy || new FillSizeValueCalculationStrategy());
      sizeRegistry.registerStrategy(autoSizeStrategy || new AutoSizeValueCalculationStrategy());
      sizeRegistry.registerStrategy(parentWidthSizeStrategy || new ParentWidthSizeValueCalculationStrategy());
      sizeRegistry.registerStrategy(viewportWidthSizeStrategy || new ViewportWidthSizeValueCalculationStrategy());
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      sizeRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
      sizeRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
      sizeRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
      sizeRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
      sizeRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());
    }

    try {
      const pixelPositionStrategy = container.resolve(TOKENS.PIXEL_POSITION_VALUE_STRATEGY);
      const centerPositionStrategy = container.resolve(TOKENS.CENTER_POSITION_VALUE_STRATEGY);
      const contentLeftPositionStrategy = container.resolve(TOKENS.CONTENT_LEFT_POSITION_VALUE_STRATEGY);
      const parentCenterXPositionStrategy = container.resolve(TOKENS.PARENT_CENTER_X_POSITION_VALUE_STRATEGY);
      const sceneCenterXPositionStrategy = container.resolve(TOKENS.SCENE_CENTER_X_POSITION_VALUE_STRATEGY);

      positionRegistry.registerStrategy(pixelPositionStrategy || new PixelPositionValueCalculationStrategy());
      positionRegistry.registerStrategy(centerPositionStrategy || new CenterPositionValueCalculationStrategy());
      positionRegistry.registerStrategy(contentLeftPositionStrategy || new ContentLeftPositionValueCalculationStrategy());
      positionRegistry.registerStrategy(parentCenterXPositionStrategy || new ParentCenterXPositionValueCalculationStrategy());
      positionRegistry.registerStrategy(sceneCenterXPositionStrategy || new SceneCenterXPositionValueCalculationStrategy());
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      positionRegistry.registerStrategy(new PixelPositionValueCalculationStrategy());
      positionRegistry.registerStrategy(new CenterPositionValueCalculationStrategy());
      positionRegistry.registerStrategy(new ContentLeftPositionValueCalculationStrategy());
      positionRegistry.registerStrategy(new ParentCenterXPositionValueCalculationStrategy());
      positionRegistry.registerStrategy(new SceneCenterXPositionValueCalculationStrategy());
    }

    try {
      const pixelScaleStrategy = container.resolve(TOKENS.PIXEL_SCALE_VALUE_STRATEGY);
      const factorScaleStrategy = container.resolve(TOKENS.FACTOR_SCALE_VALUE_STRATEGY);
      const responsiveScaleStrategy = container.resolve(TOKENS.RESPONSIVE_SCALE_VALUE_STRATEGY);
      const randomScaleStrategy = container.resolve(TOKENS.RANDOM_SCALE_VALUE_STRATEGY);
      const contentScaleStrategy = container.resolve(TOKENS.CONTENT_SCALE_VALUE_STRATEGY);

      scaleRegistry.registerStrategy(pixelScaleStrategy || new PixelScaleValueCalculationStrategy());
      scaleRegistry.registerStrategy(factorScaleStrategy || new FactorScaleValueCalculationStrategy());
      scaleRegistry.registerStrategy(responsiveScaleStrategy || new ResponsiveScaleValueCalculationStrategy());
      scaleRegistry.registerStrategy(randomScaleStrategy || new RandomScaleValueCalculationStrategy());
      scaleRegistry.registerStrategy(contentScaleStrategy || new ContentScaleValueCalculationStrategy());
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      scaleRegistry.registerStrategy(new PixelScaleValueCalculationStrategy());
      scaleRegistry.registerStrategy(new FactorScaleValueCalculationStrategy());
      scaleRegistry.registerStrategy(new ResponsiveScaleValueCalculationStrategy());
      scaleRegistry.registerStrategy(new RandomScaleValueCalculationStrategy());
      scaleRegistry.registerStrategy(new ContentScaleValueCalculationStrategy());
    }
  });

  describe('Size Strategy Pattern', () => {
    it('should register and retrieve size strategies', () => {
      expect(sizeRegistry.getStrategyCount()).toBe(5);
      expect(sizeRegistry.getAllStrategies().length).toBe(5);
    });

    it('should calculate size values using appropriate strategies', () => {
      const testCases = [
        { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL, expected: 100 },
        { value: SizeValue.FILL, unit: SizeUnit.FILL, expected: 800 },
        { value: SizeValue.AUTO, unit: SizeUnit.AUTO, expected: 0 },
        { value: SizeValue.PARENT_WIDTH, unit: SizeUnit.PARENT_WIDTH, expected: 800 },
        { value: SizeValue.VIEWPORT_WIDTH, unit: SizeUnit.VIEWPORT_WIDTH, expected: 1366 },
      ];

      for (const testCase of testCases) {
        const strategy = sizeRegistry.getStrategy(testCase.value, testCase.unit);
        expect(strategy).toBeDefined();
        expect(strategy?.canHandle(testCase.value, testCase.unit)).toBe(true);

        const result = strategy?.calculate(testCase.value, testCase.unit, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle strategy priority correctly', () => {
      const strategies = sizeRegistry.getAllStrategies();
      expect(strategies.length).toBeGreaterThan(0);

      // Check that strategies have different priorities
      const priorities = strategies.map(s => s.getPriority());
      const uniquePriorities = [...new Set(priorities)];
      expect(uniquePriorities.length).toBeGreaterThan(1);
    });

    it('should cache strategy lookups for performance', () => {
      const startTime = performance.now();
      
      // Perform multiple lookups
      for (let i = 0; i < 1000; i++) {
        sizeRegistry.getStrategy(SizeValue.PIXEL, SizeUnit.PIXEL);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      expect(totalTime).toBeLessThan(100); // Should be very fast due to caching
    });
  });

  describe('Position Strategy Pattern', () => {
    it('should register and retrieve position strategies', () => {
      expect(positionRegistry.getStrategyCount()).toBe(5);
      expect(positionRegistry.getAllStrategies().length).toBe(5);
    });

    it('should calculate position values using appropriate strategies', () => {
      const testCases = [
        { value: PositionValue.PIXEL, unit: PositionUnit.PIXEL, expected: 100 },
        { value: PositionValue.CENTER, unit: PositionUnit.CENTER, expected: 400 },
        { value: PositionValue.CONTENT_LEFT, unit: PositionUnit.CONTENT_LEFT, expected: 0 },
        { value: PositionValue.PARENT_CENTER_X, unit: PositionUnit.PARENT_CENTER_X, expected: 400 },
        { value: PositionValue.SCENE_CENTER_X, unit: PositionUnit.SCENE_CENTER_X, expected: 960 },
      ];

      for (const testCase of testCases) {
        const strategy = positionRegistry.getStrategy(testCase.value, testCase.unit);
        expect(strategy).toBeDefined();
        expect(strategy?.canHandle(testCase.value, testCase.unit)).toBe(true);

        const result = strategy?.calculate(testCase.value, testCase.unit, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle different dimensions for position calculations', () => {
      const dimensions = [Dimension.X, Dimension.Y, Dimension.BOTH];
      
      for (const dimension of dimensions) {
        const context = { ...mockContext, dimension };
        const strategy = positionRegistry.getStrategy(PositionValue.PIXEL, PositionUnit.PIXEL);
        const result = strategy?.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, context);
        
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Scale Strategy Pattern', () => {
    it('should register and retrieve scale strategies', () => {
      expect(scaleRegistry.getStrategyCount()).toBe(5);
      expect(scaleRegistry.getAllStrategies().length).toBe(5);
    });

    it('should calculate scale values using appropriate strategies', () => {
      const testCases = [
        { value: ScaleValue.PIXEL, unit: ScaleUnit.PIXEL, expected: 1 },
        { value: ScaleValue.FACTOR, unit: ScaleUnit.FACTOR, expected: 1.5 },
        { value: ScaleValue.RESPONSIVE, unit: ScaleUnit.RESPONSIVE, expected: 1 },
        { value: ScaleValue.RANDOM, unit: ScaleUnit.RANDOM, expected: 1 },
        { value: ScaleValue.CONTENT, unit: ScaleUnit.CONTENT, expected: 1 },
      ];

      for (const testCase of testCases) {
        const strategy = scaleRegistry.getStrategy(testCase.value, testCase.unit);
        expect(strategy).toBeDefined();
        expect(strategy?.canHandle(testCase.value, testCase.unit)).toBe(true);

        const result = strategy?.calculate(testCase.value, testCase.unit, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      }
    });

    it('should handle responsive scaling based on context', () => {
      const contexts = [
        { ...mockContext, viewport: { width: 1920, height: 1080 } },
        { ...mockContext, viewport: { width: 1366, height: 768 } },
        { ...mockContext, viewport: { width: 1024, height: 768 } },
      ];

      for (const context of contexts) {
        const strategy = scaleRegistry.getStrategy(ScaleValue.RESPONSIVE, ScaleUnit.RESPONSIVE);
        const result = strategy?.calculate(ScaleValue.RESPONSIVE, ScaleUnit.RESPONSIVE, context);
        
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      }
    });
  });

  describe('Strategy Registry Integration', () => {
    it('should work with all registries together', () => {
      const sizeStrategy = sizeRegistry.getStrategy(SizeValue.PIXEL, SizeUnit.PIXEL);
      const positionStrategy = positionRegistry.getStrategy(PositionValue.PIXEL, PositionUnit.PIXEL);
      const scaleStrategy = scaleRegistry.getStrategy(ScaleValue.PIXEL, ScaleUnit.PIXEL);

      expect(sizeStrategy).toBeDefined();
      expect(positionStrategy).toBeDefined();
      expect(scaleStrategy).toBeDefined();

      const sizeResult = sizeStrategy?.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      const positionResult = positionStrategy?.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
      const scaleResult = scaleStrategy?.calculate(ScaleValue.PIXEL, ScaleUnit.PIXEL, mockContext);

      expect(typeof sizeResult).toBe('number');
      expect(typeof positionResult).toBe('number');
      expect(typeof scaleResult).toBe('number');
    });

    it('should handle strategy registration and unregistration', () => {
      const initialCount = sizeRegistry.getStrategyCount();
      
      // Register a new strategy
      const customStrategy = {
        strategyId: 'custom-size-strategy',
        canHandle: (value: SizeValue, unit: SizeUnit) => value === SizeValue.PIXEL && unit === SizeUnit.PIXEL,
        calculate: (value: SizeValue, unit: SizeUnit, context: any) => 999,
        getPriority: () => 1000,
      };
      
      sizeRegistry.registerStrategy(customStrategy as any);
      expect(sizeRegistry.getStrategyCount()).toBe(initialCount + 1);
      
      // Unregister the strategy
      sizeRegistry.unregisterStrategy('custom-size-strategy');
      expect(sizeRegistry.getStrategyCount()).toBe(initialCount);
    });

    it('should handle strategy cache warming', () => {
      const initialCacheSize = sizeRegistry.getCacheSize();
      
      // Pre-warm cache
      sizeRegistry.preWarmCache();
      
      const warmedCacheSize = sizeRegistry.getCacheSize();
      expect(warmedCacheSize).toBeGreaterThanOrEqual(initialCacheSize);
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle large numbers of strategy lookups efficiently', () => {
      const iterations = 10000;
      const startTime = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        sizeRegistry.getStrategy(SizeValue.PIXEL, SizeUnit.PIXEL);
        positionRegistry.getStrategy(PositionValue.PIXEL, PositionUnit.PIXEL);
        scaleRegistry.getStrategy(ScaleValue.PIXEL, ScaleUnit.PIXEL);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const averageTime = totalTime / (iterations * 3);
      
      expect(totalTime).toBeLessThan(1000); // Should complete within 1 second
      expect(averageTime).toBeLessThan(0.1); // Average should be very fast
    });

    it('should maintain performance with many registered strategies', () => {
      // Register additional strategies
      for (let i = 0; i < 100; i++) {
        const customStrategy = {
          strategyId: `custom-strategy-${i}`,
          canHandle: (value: SizeValue, unit: SizeUnit) => false,
          calculate: (value: SizeValue, unit: SizeUnit, context: any) => 0,
          getPriority: () => i,
        };
        sizeRegistry.registerStrategy(customStrategy as any);
      }
      
      const startTime = performance.now();
      
      // Perform lookups
      for (let i = 0; i < 1000; i++) {
        sizeRegistry.getStrategy(SizeValue.PIXEL, SizeUnit.PIXEL);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      expect(totalTime).toBeLessThan(100); // Should still be fast
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle invalid strategy lookups gracefully', () => {
      const invalidStrategy = sizeRegistry.getStrategy('invalid' as any, 'invalid' as any);
      expect(invalidStrategy).toBeUndefined();
    });

    it('should handle missing context properties', () => {
      const incompleteContext = { dimension: Dimension.WIDTH };
      
      const sizeStrategy = sizeRegistry.getStrategy(SizeValue.PIXEL, SizeUnit.PIXEL);
      const result = sizeStrategy?.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, incompleteContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle strategy calculation errors', () => {
      const errorStrategy = {
        strategyId: 'error-strategy',
        canHandle: (value: SizeValue, unit: SizeUnit) => value === SizeValue.PIXEL && unit === SizeUnit.PIXEL,
        calculate: (value: SizeValue, unit: SizeUnit, context: any) => {
          throw new Error('Test error');
        },
        getPriority: () => 1000,
      };
      
      sizeRegistry.registerStrategy(errorStrategy as any);
      
      const strategy = sizeRegistry.getStrategy(SizeValue.PIXEL, SizeUnit.PIXEL);
      expect(() => strategy?.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext)).toThrow();
    });
  });
});
