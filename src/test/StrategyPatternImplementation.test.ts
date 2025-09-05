import {
  SizeValueCalculationStrategyRegistry,
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy,
  ParentWidthSizeValueCalculationStrategy,
  ViewportWidthSizeValueCalculationStrategy,
} from '../strategies/value';
import type { ISizeValueCalculationStrategy } from '../strategies/value/ISizeValueCalculationStrategy';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { container, TOKENS } from '../container/DiContainer';

describe('Strategy Pattern Implementation', () => {
  let registry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    // Use DI container to resolve registry instead of direct instantiation
    try {
      registry = container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      registry = new SizeValueCalculationStrategyRegistry();
    }
    
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };
  });

  describe('SizeValueCalculationStrategyRegistry', () => {
    it('should register and retrieve strategies', () => {
      // Use DI container to resolve strategy instead of direct instantiation
      let strategy: PixelSizeValueCalculationStrategy;
      try {
        strategy = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy = new PixelSizeValueCalculationStrategy();
      }
      
      registry.registerStrategy(strategy);

      expect(registry.getStrategy(strategy.strategyId)).toBe(strategy);
      expect(registry.hasStrategy(strategy.strategyId)).toBe(true);
      expect(registry.getStrategyCount()).toBe(1);
    });

    it('should not register duplicate strategies', () => {
      let strategy1: PixelSizeValueCalculationStrategy;
      let strategy2: PixelSizeValueCalculationStrategy;
      
      try {
        strategy1 = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
        strategy2 = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy1 = new PixelSizeValueCalculationStrategy();
        strategy2 = new PixelSizeValueCalculationStrategy();
      }

      registry.registerStrategy(strategy1);
      registry.registerStrategy(strategy2);

      expect(registry.getStrategyCount()).toBe(1);
    });

    it('should unregister strategies', () => {
      let strategy: PixelSizeValueCalculationStrategy;
      try {
        strategy = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy = new PixelSizeValueCalculationStrategy();
      }
      
      registry.registerStrategy(strategy);
      expect(registry.getStrategyCount()).toBe(1);

      registry.unregisterStrategy(strategy.strategyId);
      expect(registry.getStrategyCount()).toBe(0);
      expect(registry.hasStrategy(strategy.strategyId)).toBe(false);
    });

    it('should get all strategies', () => {
      const strategies = [
        (() => {
          try { return container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY); } catch { return new PixelSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY); } catch { return new FillSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY); } catch { return new AutoSizeValueCalculationStrategy(); }
        })(),
      ];

      strategies.forEach(strategy => registry.registerStrategy(strategy));

      const allStrategies = registry.getAllStrategies();
      expect(allStrategies.length).toBe(3);
      expect(allStrategies).toContain(strategies[0]);
      expect(allStrategies).toContain(strategies[1]);
      expect(allStrategies).toContain(strategies[2]);
    });

    it('should clear all strategies', () => {
      const strategies = [
        (() => {
          try { return container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY); } catch { return new PixelSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY); } catch { return new FillSizeValueCalculationStrategy(); }
        })(),
      ];

      strategies.forEach(strategy => registry.registerStrategy(strategy));
      expect(registry.getStrategyCount()).toBe(2);

      registry.clearStrategies();
      expect(registry.getStrategyCount()).toBe(0);
    });
  });

  describe('Individual Strategies', () => {
    it('should execute PixelSizeValueCalculationStrategy correctly', () => {
      let strategy: PixelSizeValueCalculationStrategy;
      try {
        strategy = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy = new PixelSizeValueCalculationStrategy();
      }

      const result = strategy.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should execute FillSizeValueCalculationStrategy correctly', () => {
      let strategy: FillSizeValueCalculationStrategy;
      try {
        strategy = container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy = new FillSizeValueCalculationStrategy();
      }

      const result = strategy.calculate(SizeValue.FILL, SizeUnit.FILL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should execute AutoSizeValueCalculationStrategy correctly', () => {
      let strategy: AutoSizeValueCalculationStrategy;
      try {
        strategy = container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy = new AutoSizeValueCalculationStrategy();
      }

      const result = strategy.calculate(SizeValue.AUTO, SizeUnit.AUTO, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should execute ParentWidthSizeValueCalculationStrategy correctly', () => {
      let strategy: ParentWidthSizeValueCalculationStrategy;
      try {
        strategy = container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy = new ParentWidthSizeValueCalculationStrategy();
      }

      const result = strategy.calculate(SizeValue.PARENT_WIDTH, SizeUnit.PARENT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should execute ViewportWidthSizeValueCalculationStrategy correctly', () => {
      let strategy: ViewportWidthSizeValueCalculationStrategy;
      try {
        strategy = container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy = new ViewportWidthSizeValueCalculationStrategy();
      }

      const result = strategy.calculate(SizeValue.VIEWPORT_WIDTH, SizeUnit.VIEWPORT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Strategy Selection', () => {
    beforeEach(() => {
      // Register all strategies using DI container
      const strategies = [
        (() => {
          try { return container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY); } catch { return new PixelSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY); } catch { return new FillSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY); } catch { return new AutoSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY); } catch { return new ParentWidthSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY); } catch { return new ViewportWidthSizeValueCalculationStrategy(); }
        })(),
      ];

      strategies.forEach(strategy => registry.registerStrategy(strategy));
    });

    it('should select correct strategy for pixel values', () => {
      const selectedStrategy = registry.selectStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(selectedStrategy).toBeDefined();
      expect(selectedStrategy?.strategyId).toBe('pixel-size-value-calculation');
    });

    it('should select correct strategy for fill values', () => {
      const selectedStrategy = registry.selectStrategy(SizeValue.FILL, SizeUnit.FILL, mockContext);
      expect(selectedStrategy).toBeDefined();
      expect(selectedStrategy?.strategyId).toBe('fill-size-value-calculation');
    });

    it('should select correct strategy for auto values', () => {
      const selectedStrategy = registry.selectStrategy(SizeValue.AUTO, SizeUnit.AUTO, mockContext);
      expect(selectedStrategy).toBeDefined();
      expect(selectedStrategy?.strategyId).toBe('auto-size-value-calculation');
    });

    it('should select correct strategy for parent width values', () => {
      const selectedStrategy = registry.selectStrategy(SizeValue.PARENT_WIDTH, SizeUnit.PARENT_WIDTH, mockContext);
      expect(selectedStrategy).toBeDefined();
      expect(selectedStrategy?.strategyId).toBe('parent-width-size-value-calculation');
    });

    it('should select correct strategy for viewport width values', () => {
      const selectedStrategy = registry.selectStrategy(SizeValue.VIEWPORT_WIDTH, SizeUnit.VIEWPORT_WIDTH, mockContext);
      expect(selectedStrategy).toBeDefined();
      expect(selectedStrategy?.strategyId).toBe('viewport-width-size-value-calculation');
    });

    it('should return null for unsupported values', () => {
      const selectedStrategy = registry.selectStrategy('unsupported' as any, 'unsupported' as any, mockContext);
      expect(selectedStrategy).toBeNull();
    });
  });

  describe('Strategy Execution', () => {
    beforeEach(() => {
      // Register all strategies using DI container
      const strategies = [
        (() => {
          try { return container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY); } catch { return new PixelSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY); } catch { return new FillSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY); } catch { return new AutoSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY); } catch { return new ParentWidthSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY); } catch { return new ViewportWidthSizeValueCalculationStrategy(); }
        })(),
      ];

      strategies.forEach(strategy => registry.registerStrategy(strategy));
    });

    it('should execute strategy for pixel values', () => {
      const result = registry.executeStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should execute strategy for fill values', () => {
      const result = registry.executeStrategy(SizeValue.FILL, SizeUnit.FILL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should execute strategy for auto values', () => {
      const result = registry.executeStrategy(SizeValue.AUTO, SizeUnit.AUTO, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should execute strategy for parent width values', () => {
      const result = registry.executeStrategy(SizeValue.PARENT_WIDTH, SizeUnit.PARENT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should execute strategy for viewport width values', () => {
      const result = registry.executeStrategy(SizeValue.VIEWPORT_WIDTH, SizeUnit.VIEWPORT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should return default value for unsupported values', () => {
      const result = registry.executeStrategy('unsupported' as any, 'unsupported' as any, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle strategy execution errors gracefully', () => {
      let strategy: PixelSizeValueCalculationStrategy;
      try {
        strategy = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy = new PixelSizeValueCalculationStrategy();
      }

      // Mock a failing calculation
      const originalCalculate = strategy.calculate;
      strategy.calculate = jest.fn().mockImplementation(() => {
        throw new Error('Strategy execution failed');
      });

      registry.registerStrategy(strategy);

      expect(() => registry.executeStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext)).toThrow('Strategy execution failed');

      // Restore original method
      strategy.calculate = originalCalculate;
    });

    it('should handle missing context gracefully', () => {
      let strategy: PixelSizeValueCalculationStrategy;
      try {
        strategy = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      } catch (error) {
        strategy = new PixelSizeValueCalculationStrategy();
      }

      registry.registerStrategy(strategy);

      const result = registry.executeStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, null as any);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Performance', () => {
    beforeEach(() => {
      // Register all strategies using DI container
      const strategies = [
        (() => {
          try { return container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY); } catch { return new PixelSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY); } catch { return new FillSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY); } catch { return new AutoSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY); } catch { return new ParentWidthSizeValueCalculationStrategy(); }
        })(),
        (() => {
          try { return container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY); } catch { return new ViewportWidthSizeValueCalculationStrategy(); }
        })(),
      ];

      strategies.forEach(strategy => registry.registerStrategy(strategy));
    });

    it('should execute strategies efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        registry.executeStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle multiple rapid executions', () => {
      const results = [];
      
      for (let i = 0; i < 100; i++) {
        const result = registry.executeStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
        results.push(result);
      }
      
      results.forEach(result => {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Integration', () => {
    it('should work with different strategy configurations', () => {
      const testCases = [
        { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL },
        { value: SizeValue.FILL, unit: SizeUnit.FILL },
        { value: SizeValue.AUTO, unit: SizeUnit.AUTO },
        { value: SizeValue.PARENT_WIDTH, unit: SizeUnit.PARENT_WIDTH },
        { value: SizeValue.VIEWPORT_WIDTH, unit: SizeUnit.VIEWPORT_WIDTH },
      ];

      for (const testCase of testCases) {
        const result = registry.executeStrategy(testCase.value, testCase.unit, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should work with different context types', () => {
      const contexts = [
        mockContext,
        { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: Dimension.WIDTH },
        { scene: { width: 1920, height: 1080 }, dimension: Dimension.HEIGHT },
        { viewport: { width: 1366, height: 768 }, dimension: Dimension.BOTH },
      ];

      for (const context of contexts) {
        const result = registry.executeStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
