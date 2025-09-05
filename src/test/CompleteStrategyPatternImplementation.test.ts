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
    setupTestEnvironment();
  });

  describe('Size Strategy Registry', () => {
    it('should register and retrieve size strategies', () => {
      testSizeStrategyRegistration();
    });

    it('should calculate size values correctly', () => {
      testSizeValueCalculation();
    });

    it('should handle different size units', () => {
      testDifferentSizeUnits();
    });

    it('should handle different size values', () => {
      testDifferentSizeValues();
    });

    it('should handle edge cases', () => {
      testSizeEdgeCases();
    });
  });

  describe('Position Strategy Registry', () => {
    it('should register and retrieve position strategies', () => {
      testPositionStrategyRegistration();
    });

    it('should calculate position values correctly', () => {
      testPositionValueCalculation();
    });

    it('should handle different position units', () => {
      testDifferentPositionUnits();
    });

    it('should handle different position values', () => {
      testDifferentPositionValues();
    });

    it('should handle edge cases', () => {
      testPositionEdgeCases();
    });
  });

  describe('Scale Strategy Registry', () => {
    it('should register and retrieve scale strategies', () => {
      testScaleStrategyRegistration();
    });

    it('should calculate scale values correctly', () => {
      testScaleValueCalculation();
    });

    it('should handle different scale units', () => {
      testDifferentScaleUnits();
    });

    it('should handle different scale values', () => {
      testDifferentScaleValues();
    });

    it('should handle edge cases', () => {
      testScaleEdgeCases();
    });
  });

  describe('Strategy Registry Integration', () => {
    it('should work with all registries together', () => {
      testAllRegistriesIntegration();
    });

    it('should handle strategy registration and unregistration', () => {
      testStrategyRegistrationAndUnregistration();
    });

    it('should handle strategy selection and fallback', () => {
      testStrategySelectionAndFallback();
    });

    it('should handle performance with many strategies', () => {
      testPerformanceWithManyStrategies();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    initializeRegistries();
    registerSizeStrategies();
    registerPositionStrategies();
    registerScaleStrategies();
    createMockContext();
  }

  function initializeRegistries(): void {
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
  }

  function registerSizeStrategies(): void {
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
      registerSizeStrategiesFallback();
    }
  }

  function registerSizeStrategiesFallback(): void {
    sizeRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
    sizeRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
    sizeRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
    sizeRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    sizeRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());
  }

  function registerPositionStrategies(): void {
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
      registerPositionStrategiesFallback();
    }
  }

  function registerPositionStrategiesFallback(): void {
    positionRegistry.registerStrategy(new PixelPositionValueCalculationStrategy());
    positionRegistry.registerStrategy(new CenterPositionValueCalculationStrategy());
    positionRegistry.registerStrategy(new ContentLeftPositionValueCalculationStrategy());
    positionRegistry.registerStrategy(new ParentCenterXPositionValueCalculationStrategy());
    positionRegistry.registerStrategy(new SceneCenterXPositionValueCalculationStrategy());
  }

  function registerScaleStrategies(): void {
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
      registerScaleStrategiesFallback();
    }
  }

  function registerScaleStrategiesFallback(): void {
    scaleRegistry.registerStrategy(new PixelScaleValueCalculationStrategy());
    scaleRegistry.registerStrategy(new FactorScaleValueCalculationStrategy());
    scaleRegistry.registerStrategy(new ResponsiveScaleValueCalculationStrategy());
    scaleRegistry.registerStrategy(new RandomScaleValueCalculationStrategy());
    scaleRegistry.registerStrategy(new ContentScaleValueCalculationStrategy());
  }

  function createMockContext(): void {
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
      viewport: { width: 1920, height: 1080 },
      dimension: Dimension.WIDTH,
    };
  }

  function testSizeStrategyRegistration(): void {
    const strategy = sizeRegistry.getStrategy(SizeValue.PIXEL, SizeUnit.PIXEL);
    expect(strategy).toBeDefined();
    expect(strategy?.strategyId).toBe('pixel-size-calculation');
  }

  function testSizeValueCalculation(): void {
    const testCases = [
      { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL },
      { value: SizeValue.FILL, unit: SizeUnit.FILL },
      { value: SizeValue.AUTO, unit: SizeUnit.AUTO },
      { value: SizeValue.PARENT_WIDTH, unit: SizeUnit.PARENT_WIDTH },
      { value: SizeValue.VIEWPORT_WIDTH, unit: SizeUnit.VIEWPORT_WIDTH },
    ];

    for (const testCase of testCases) {
      const strategy = sizeRegistry.getStrategy(testCase.value, testCase.unit);
      const result = strategy?.calculate(testCase.value, testCase.unit, mockContext);
      
      expect(strategy).toBeDefined();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentSizeUnits(): void {
    const units = [SizeUnit.PIXEL, SizeUnit.FILL, SizeUnit.AUTO, SizeUnit.PARENT_WIDTH, SizeUnit.VIEWPORT_WIDTH];
    
    for (const unit of units) {
      const strategy = sizeRegistry.getStrategy(SizeValue.PIXEL, unit);
      const result = strategy?.calculate(SizeValue.PIXEL, unit, mockContext);
      
      expect(strategy).toBeDefined();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentSizeValues(): void {
    const values = [SizeValue.PIXEL, SizeValue.FILL, SizeValue.AUTO, SizeValue.PARENT_WIDTH, SizeValue.VIEWPORT_WIDTH];
    
    for (const value of values) {
      const strategy = sizeRegistry.getStrategy(value, SizeUnit.PIXEL);
      const result = strategy?.calculate(value, SizeUnit.PIXEL, mockContext);
      
      expect(strategy).toBeDefined();
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
      const strategy = sizeRegistry.getStrategy(edgeCase.value as any, edgeCase.unit);
      const result = strategy?.calculate(edgeCase.value as any, edgeCase.unit, mockContext);
      
      expect(typeof result).toBe('number');
    }
  }

  function testPositionStrategyRegistration(): void {
    const strategy = positionRegistry.getStrategy(PositionValue.PIXEL, PositionUnit.PIXEL);
    expect(strategy).toBeDefined();
    expect(strategy?.strategyId).toBe('pixel-position-calculation');
  }

  function testPositionValueCalculation(): void {
    const testCases = [
      { value: PositionValue.PIXEL, unit: PositionUnit.PIXEL },
      { value: PositionValue.CENTER, unit: PositionUnit.CENTER },
      { value: PositionValue.CONTENT_LEFT, unit: PositionUnit.CONTENT_LEFT },
      { value: PositionValue.PARENT_CENTER_X, unit: PositionUnit.PARENT_CENTER_X },
      { value: PositionValue.SCENE_CENTER_X, unit: PositionUnit.SCENE_CENTER_X },
    ];

    for (const testCase of testCases) {
      const strategy = positionRegistry.getStrategy(testCase.value, testCase.unit);
      const result = strategy?.calculate(testCase.value, testCase.unit, mockContext);
      
      expect(strategy).toBeDefined();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentPositionUnits(): void {
    const units = [PositionUnit.PIXEL, PositionUnit.CENTER, PositionUnit.CONTENT_LEFT, PositionUnit.PARENT_CENTER_X, PositionUnit.SCENE_CENTER_X];
    
    for (const unit of units) {
      const strategy = positionRegistry.getStrategy(PositionValue.PIXEL, unit);
      const result = strategy?.calculate(PositionValue.PIXEL, unit, mockContext);
      
      expect(strategy).toBeDefined();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentPositionValues(): void {
    const values = [PositionValue.PIXEL, PositionValue.CENTER, PositionValue.CONTENT_LEFT, PositionValue.PARENT_CENTER_X, PositionValue.SCENE_CENTER_X];
    
    for (const value of values) {
      const strategy = positionRegistry.getStrategy(value, PositionUnit.PIXEL);
      const result = strategy?.calculate(value, PositionUnit.PIXEL, mockContext);
      
      expect(strategy).toBeDefined();
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
      const strategy = positionRegistry.getStrategy(edgeCase.value as any, edgeCase.unit);
      const result = strategy?.calculate(edgeCase.value as any, edgeCase.unit, mockContext);
      
      expect(typeof result).toBe('number');
    }
  }

  function testScaleStrategyRegistration(): void {
    const strategy = scaleRegistry.getStrategy(ScaleValue.PIXEL, ScaleUnit.PIXEL);
    expect(strategy).toBeDefined();
    expect(strategy?.strategyId).toBe('pixel-scale-calculation');
  }

  function testScaleValueCalculation(): void {
    const testCases = [
      { value: ScaleValue.PIXEL, unit: ScaleUnit.PIXEL },
      { value: ScaleValue.FACTOR, unit: ScaleUnit.FACTOR },
      { value: ScaleValue.RESPONSIVE, unit: ScaleUnit.RESPONSIVE },
      { value: ScaleValue.RANDOM, unit: ScaleUnit.RANDOM },
      { value: ScaleValue.CONTENT, unit: ScaleUnit.CONTENT },
    ];

    for (const testCase of testCases) {
      const strategy = scaleRegistry.getStrategy(testCase.value, testCase.unit);
      const result = strategy?.calculate(testCase.value, testCase.unit, mockContext);
      
      expect(strategy).toBeDefined();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentScaleUnits(): void {
    const units = [ScaleUnit.PIXEL, ScaleUnit.FACTOR, ScaleUnit.RESPONSIVE, ScaleUnit.RANDOM, ScaleUnit.CONTENT];
    
    for (const unit of units) {
      const strategy = scaleRegistry.getStrategy(ScaleValue.PIXEL, unit);
      const result = strategy?.calculate(ScaleValue.PIXEL, unit, mockContext);
      
      expect(strategy).toBeDefined();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testDifferentScaleValues(): void {
    const values = [ScaleValue.PIXEL, ScaleValue.FACTOR, ScaleValue.RESPONSIVE, ScaleValue.RANDOM, ScaleValue.CONTENT];
    
    for (const value of values) {
      const strategy = scaleRegistry.getStrategy(value, ScaleUnit.PIXEL);
      const result = strategy?.calculate(value, ScaleUnit.PIXEL, mockContext);
      
      expect(strategy).toBeDefined();
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
      const strategy = scaleRegistry.getStrategy(edgeCase.value as any, edgeCase.unit);
      const result = strategy?.calculate(edgeCase.value as any, edgeCase.unit, mockContext);
      
      expect(typeof result).toBe('number');
    }
  }

  function testAllRegistriesIntegration(): void {
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
  }

  function testStrategyRegistrationAndUnregistration(): void {
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
  }

  function testStrategySelectionAndFallback(): void {
    const strategy = sizeRegistry.getStrategy(SizeValue.PIXEL, SizeUnit.PIXEL);
    expect(strategy).toBeDefined();
    
    const result = strategy?.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testPerformanceWithManyStrategies(): void {
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      const strategy = sizeRegistry.getStrategy(SizeValue.PIXEL, SizeUnit.PIXEL);
      strategy?.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
    }
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(100); // Should complete within 100ms
  }
});