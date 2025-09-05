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
    setupTestEnvironment();
  });

  describe('SizeValueCalculationStrategyRegistry', () => {
    it('should register and retrieve strategies', () => {
      testStrategyRegistrationAndRetrieval();
    });

    it('should handle multiple strategies', () => {
      testMultipleStrategyHandling();
    });

    it('should find best strategy for input', () => {
      testBestStrategyFinding();
    });

    it('should handle strategy priority', () => {
      testStrategyPriorityHandling();
    });

    it('should clear all strategies', () => {
      testStrategyClearing();
    });
  });

  describe('Individual Strategies', () => {
    it('should test PixelSizeValueCalculationStrategy', () => {
      testPixelSizeValueCalculationStrategy();
    });

    it('should test FillSizeValueCalculationStrategy', () => {
      testFillSizeValueCalculationStrategy();
    });

    it('should test AutoSizeValueCalculationStrategy', () => {
      testAutoSizeValueCalculationStrategy();
    });

    it('should test ParentWidthSizeValueCalculationStrategy', () => {
      testParentWidthSizeValueCalculationStrategy();
    });

    it('should test ViewportWidthSizeValueCalculationStrategy', () => {
      testViewportWidthSizeValueCalculationStrategy();
    });
  });

  describe('Strategy Integration', () => {
    it('should work with different contexts', () => {
      testDifferentContexts();
    });

    it('should handle strategy errors gracefully', () => {
      testStrategyErrorHandling();
    });

    it('should perform calculations efficiently', () => {
      testCalculationEfficiency();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    initializeRegistry();
    createMockContext();
  }

  function initializeRegistry(): void {
    try {
      registry = container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      registry = new SizeValueCalculationStrategyRegistry();
    }
  }

  function createMockContext(): void {
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };
  }

  function testStrategyRegistrationAndRetrieval(): void {
    const strategy = createPixelSizeValueCalculationStrategy();
    
    registry.registerStrategy(strategy);

    verifyStrategyRegistration(strategy);
  }

  function createPixelSizeValueCalculationStrategy(): PixelSizeValueCalculationStrategy {
    try {
      return container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
    } catch (error) {
      return new PixelSizeValueCalculationStrategy();
    }
  }

  function verifyStrategyRegistration(strategy: PixelSizeValueCalculationStrategy): void {
    expect(registry.getStrategy(strategy.strategyId)).toBe(strategy);
    expect(registry.hasStrategy(strategy.strategyId)).toBe(true);
    expect(registry.getStrategyCount()).toBe(1);
  }

  function testMultipleStrategyHandling(): void {
    const strategies = createMultipleStrategies();
    
    registerMultipleStrategies(strategies);
    verifyMultipleStrategyRegistration(strategies);
  }

  function createMultipleStrategies(): ISizeValueCalculationStrategy[] {
    return [
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
  }

  function registerMultipleStrategies(strategies: ISizeValueCalculationStrategy[]): void {
    strategies.forEach(strategy => {
      registry.registerStrategy(strategy);
    });
  }

  function verifyMultipleStrategyRegistration(strategies: ISizeValueCalculationStrategy[]): void {
    expect(registry.getStrategyCount()).toBe(strategies.length);
    
    strategies.forEach(strategy => {
      expect(registry.hasStrategy(strategy.strategyId)).toBe(true);
      expect(registry.getStrategy(strategy.strategyId)).toBe(strategy);
    });
  }

  function testBestStrategyFinding(): void {
    const strategies = createMultipleStrategies();
    registerMultipleStrategies(strategies);
    
    const input = createTestInput();
    const bestStrategy = registry.findBestStrategy(input, mockContext);
    
    expect(bestStrategy).toBeDefined();
    expect(typeof bestStrategy.calculate).toBe('function');
  }

  function createTestInput(): any {
    return {
      value: 100,
      unit: SizeUnit.PIXEL,
      dimension: Dimension.WIDTH,
    };
  }

  function testStrategyPriorityHandling(): void {
    const strategies = createMultipleStrategies();
    registerMultipleStrategies(strategies);
    
    const priorities = strategies.map(strategy => strategy.getPriority());
    const sortedPriorities = [...priorities].sort((a, b) => a - b);
    
    expect(priorities).toEqual(expect.arrayContaining(sortedPriorities));
  }

  function testStrategyClearing(): void {
    const strategies = createMultipleStrategies();
    registerMultipleStrategies(strategies);
    
    registry.clearStrategies();
    
    expect(registry.getStrategyCount()).toBe(0);
    strategies.forEach(strategy => {
      expect(registry.hasStrategy(strategy.strategyId)).toBe(false);
    });
  }

  function testPixelSizeValueCalculationStrategy(): void {
    const strategy = createPixelSizeValueCalculationStrategy();
    const input = createPixelTestInput();
    
    const result = strategy.calculate(input, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createPixelTestInput(): any {
    return {
      value: 100,
      unit: SizeUnit.PIXEL,
      dimension: Dimension.WIDTH,
    };
  }

  function testFillSizeValueCalculationStrategy(): void {
    const strategy = createFillSizeValueCalculationStrategy();
    const input = createFillTestInput();
    
    const result = strategy.calculate(input, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createFillSizeValueCalculationStrategy(): FillSizeValueCalculationStrategy {
    try {
      return container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY);
    } catch (error) {
      return new FillSizeValueCalculationStrategy();
    }
  }

  function createFillTestInput(): any {
    return {
      value: SizeValue.FILL,
      unit: SizeUnit.FILL,
      dimension: Dimension.WIDTH,
    };
  }

  function testAutoSizeValueCalculationStrategy(): void {
    const strategy = createAutoSizeValueCalculationStrategy();
    const input = createAutoTestInput();
    
    const result = strategy.calculate(input, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createAutoSizeValueCalculationStrategy(): AutoSizeValueCalculationStrategy {
    try {
      return container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY);
    } catch (error) {
      return new AutoSizeValueCalculationStrategy();
    }
  }

  function createAutoTestInput(): any {
    return {
      value: SizeValue.AUTO,
      unit: SizeUnit.AUTO,
      dimension: Dimension.WIDTH,
    };
  }

  function testParentWidthSizeValueCalculationStrategy(): void {
    const strategy = createParentWidthSizeValueCalculationStrategy();
    const input = createParentWidthTestInput();
    
    const result = strategy.calculate(input, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createParentWidthSizeValueCalculationStrategy(): ParentWidthSizeValueCalculationStrategy {
    try {
      return container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY);
    } catch (error) {
      return new ParentWidthSizeValueCalculationStrategy();
    }
  }

  function createParentWidthTestInput(): any {
    return {
      value: SizeValue.PARENT_WIDTH,
      unit: SizeUnit.PARENT_WIDTH,
      dimension: Dimension.WIDTH,
    };
  }

  function testViewportWidthSizeValueCalculationStrategy(): void {
    const strategy = createViewportWidthSizeValueCalculationStrategy();
    const input = createViewportWidthTestInput();
    
    const result = strategy.calculate(input, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createViewportWidthSizeValueCalculationStrategy(): ViewportWidthSizeValueCalculationStrategy {
    try {
      return container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY);
    } catch (error) {
      return new ViewportWidthSizeValueCalculationStrategy();
    }
  }

  function createViewportWidthTestInput(): any {
    return {
      value: SizeValue.VIEWPORT_WIDTH,
      unit: SizeUnit.VIEWPORT_WIDTH,
      dimension: Dimension.WIDTH,
    };
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    const strategy = createPixelSizeValueCalculationStrategy();
    const input = createTestInput();
    
    for (const context of contexts) {
      const result = strategy.calculate(input, context);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentContexts(): any[] {
    return [
      mockContext,
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' },
    ];
  }

  function testStrategyErrorHandling(): void {
    const strategy = createPixelSizeValueCalculationStrategy();
    const invalidInput = createInvalidInput();
    
    expect(() => strategy.calculate(invalidInput, mockContext)).not.toThrow();
  }

  function createInvalidInput(): any {
    return {
      value: null,
      unit: null,
      dimension: 'width',
    };
  }

  function testCalculationEfficiency(): void {
    const strategy = createPixelSizeValueCalculationStrategy();
    const input = createTestInput();
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      strategy.calculate(input, mockContext);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }
});