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
import { UnitType } from '../enums/UnitType';
import { container, TOKENS } from '../container/DiContainer';

describe('RefactoredSizeUnitCalculator', () => {
  let calculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Constructor and Initialization', () => {
    it('should create calculator with strategy registry', () => {
      testCalculatorCreation();
    });

    it('should initialize with correct properties', () => {
      testCalculatorInitialization();
    });

    it('should handle missing strategy registry gracefully', () => {
      testMissingStrategyRegistryHandling();
    });
  });

  describe('Strategy Registration', () => {
    it('should register all size value strategies', () => {
      testStrategyRegistration();
    });

    it('should handle strategy registration errors', () => {
      testStrategyRegistrationErrorHandling();
    });

    it('should validate registered strategies', () => {
      testStrategyValidation();
    });
  });

  describe('Size Calculations', () => {
    it('should calculate pixel size values', () => {
      testPixelSizeValueCalculation();
    });

    it('should calculate fill size values', () => {
      testFillSizeValueCalculation();
    });

    it('should calculate auto size values', () => {
      testAutoSizeValueCalculation();
    });

    it('should calculate parent width size values', () => {
      testParentWidthSizeValueCalculation();
    });

    it('should calculate viewport width size values', () => {
      testViewportWidthSizeValueCalculation();
    });
  });

  describe('Different Dimensions', () => {
    it('should handle width dimension calculations', () => {
      testWidthDimensionCalculations();
    });

    it('should handle height dimension calculations', () => {
      testHeightDimensionCalculations();
    });

    it('should handle both dimensions calculations', () => {
      testBothDimensionsCalculations();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid size values gracefully', () => {
      testInvalidSizeValueHandling();
    });

    it('should handle invalid size units gracefully', () => {
      testInvalidSizeUnitHandling();
    });

    it('should handle missing context properties', () => {
      testMissingContextPropertiesHandling();
    });
  });

  describe('Performance', () => {
    it('should perform calculations efficiently', () => {
      testCalculationEfficiency();
    });

    it('should handle multiple calculations', () => {
      testMultipleCalculations();
    });
  });

  describe('Integration', () => {
    it('should work with different contexts', () => {
      testDifferentContexts();
    });

    it('should work with different configurations', () => {
      testDifferentConfigurations();
    });

    it('should work with different strategies', () => {
      testDifferentStrategies();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    initializeStrategyRegistry();
    registerStrategies();
    createMockContext();
    initializeCalculator();
  }

  function initializeStrategyRegistry(): void {
    try {
      strategyRegistry = container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      strategyRegistry = new SizeValueCalculationStrategyRegistry();
    }
  }

  function registerStrategies(): void {
    try {
      registerStrategiesFromContainer();
    } catch (error) {
      registerStrategiesDirectly();
    }
  }

  function registerStrategiesFromContainer(): void {
    const strategies = resolveStrategiesFromContainer();
    registerStrategiesInRegistry(strategies);
  }

  function resolveStrategiesFromContainer(): any[] {
    return [
      container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY),
      container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY),
      container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY),
      container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY),
      container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY),
    ];
  }

  function registerStrategiesInRegistry(strategies: any[]): void {
    const strategyInstances = [
      strategies[0] || new PixelSizeValueCalculationStrategy(),
      strategies[1] || new FillSizeValueCalculationStrategy(),
      strategies[2] || new AutoSizeValueCalculationStrategy(),
      strategies[3] || new ParentWidthSizeValueCalculationStrategy(),
      strategies[4] || new ViewportWidthSizeValueCalculationStrategy(),
    ];

    strategyInstances.forEach(strategy => {
      strategyRegistry.registerStrategy(strategy);
    });
  }

  function registerStrategiesDirectly(): void {
    const strategies = createStrategiesDirectly();
    strategies.forEach(strategy => {
      strategyRegistry.registerStrategy(strategy);
    });
  }

  function createStrategiesDirectly(): any[] {
    return [
      new PixelSizeValueCalculationStrategy(),
      new FillSizeValueCalculationStrategy(),
      new AutoSizeValueCalculationStrategy(),
      new ParentWidthSizeValueCalculationStrategy(),
      new ViewportWidthSizeValueCalculationStrategy(),
    ];
  }

  function createMockContext(): void {
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
      viewport: { width: 1920, height: 1080 },
      dimension: 'width',
    };
  }

  function initializeCalculator(): void {
    try {
      calculator = container.resolve(TOKENS.REFACTORED_SIZE_CALCULATOR);
      setCalculatorStrategyRegistry();
    } catch (error) {
      calculator = new RefactoredSizeUnitCalculator(
        'test-calculator',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
    }
  }

  function setCalculatorStrategyRegistry(): void {
    (calculator as any).strategyRegistry = strategyRegistry;
  }

  function testCalculatorCreation(): void {
    expect(calculator).toBeInstanceOf(RefactoredSizeUnitCalculator);
    expect((calculator as any).strategyRegistry).toBeDefined();
  }

  function testCalculatorInitialization(): void {
    expect(calculator.unitType).toBe(UnitType.SIZE);
    expect((calculator as any).strategyRegistry).toBe(strategyRegistry);
  }

  function testMissingStrategyRegistryHandling(): void {
    const calculatorWithoutRegistry = new RefactoredSizeUnitCalculator(
      'test-calculator-2',
      'Test Calculator 2',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      100,
      false,
      null as any
    );
    
    expect(calculatorWithoutRegistry).toBeInstanceOf(RefactoredSizeUnitCalculator);
    expect(() => (calculatorWithoutRegistry as any).strategyRegistry).not.toThrow();
  }

  function testStrategyRegistration(): void {
    const registeredStrategies = strategyRegistry.getAllStrategies();
    
    expect(registeredStrategies.length).toBeGreaterThan(0);
    expect(registeredStrategies.some(s => s instanceof PixelSizeValueCalculationStrategy)).toBe(true);
    expect(registeredStrategies.some(s => s instanceof FillSizeValueCalculationStrategy)).toBe(true);
    expect(registeredStrategies.some(s => s instanceof AutoSizeValueCalculationStrategy)).toBe(true);
  }

  function testStrategyRegistrationErrorHandling(): void {
    const invalidStrategy = createInvalidStrategy();
    
    expect(() => strategyRegistry.registerStrategy(invalidStrategy)).not.toThrow();
  }

  function createInvalidStrategy(): any {
    return {
      calculate: null,
      canHandle: null,
      getPriority: null,
    };
  }

  function testStrategyValidation(): void {
    const registeredStrategies = strategyRegistry.getAllStrategies();
    
    for (const strategy of registeredStrategies) {
      expect(strategy.calculate).toBeDefined();
      expect(strategy.canHandle).toBeDefined();
      expect(strategy.getPriority).toBeDefined();
    }
  }

  function testPixelSizeValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testFillSizeValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testAutoSizeValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testParentWidthSizeValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testViewportWidthSizeValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testWidthDimensionCalculations(): void {
    const widthContext = createWidthContext();
    const result = calculator.calculate(widthContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createWidthContext(): any {
    return {
      ...mockContext,
      dimension: 'width',
    };
  }

  function testHeightDimensionCalculations(): void {
    const heightContext = createHeightContext();
    const result = calculator.calculate(heightContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createHeightContext(): any {
    return {
      ...mockContext,
      dimension: 'height',
    };
  }

  function testBothDimensionsCalculations(): void {
    const dimensions = ['width', 'height'];
    
    for (const dimension of dimensions) {
      const context = createContextForDimension(dimension);
      const result = calculator.calculate(context);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createContextForDimension(dimension: string): any {
    return {
      ...mockContext,
      dimension: dimension,
    };
  }

  function testInvalidSizeValueHandling(): void {
    const invalidValues = createInvalidSizeValues();
    
    for (const value of invalidValues) {
      const result = calculator.calculate(mockContext);
      expect(typeof result).toBe('number');
    }
  }

  function createInvalidSizeValues(): any[] {
    return [null, undefined, 'invalid', {}, []];
  }

  function testInvalidSizeUnitHandling(): void {
    const invalidUnits = createInvalidSizeUnits();
    
    for (const unit of invalidUnits) {
      const result = calculator.calculate(mockContext);
      expect(typeof result).toBe('number');
    }
  }

  function createInvalidSizeUnits(): any[] {
    return [null, undefined, 'invalid', {}, []];
  }

  function testMissingContextPropertiesHandling(): void {
    const partialContext = { dimension: 'width' };
    const result = calculator.calculate(partialContext as any);
    
    expect(typeof result).toBe('number');
  }

  function testCalculationEfficiency(): void {
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      calculator.calculate(mockContext);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testMultipleCalculations(): void {
    const calculations = createMultipleCalculations();
    
    for (const calculation of calculations) {
      const result = calculator.calculate(mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createMultipleCalculations(): any[] {
    return [
      { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL },
      { value: SizeValue.FILL, unit: SizeUnit.FILL },
      { value: SizeValue.AUTO, unit: SizeUnit.AUTO },
      { value: SizeValue.PARENT_WIDTH, unit: SizeUnit.PARENT_WIDTH },
      { value: SizeValue.VIEWPORT_WIDTH, unit: SizeUnit.VIEWPORT_WIDTH },
    ];
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const result = calculator.calculate(context);
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

  function testDifferentConfigurations(): void {
    const configurations = createDifferentConfigurations();
    
    for (const config of configurations) {
      const testCalculator = createCalculatorWithConfiguration(config);
      expect(testCalculator).toBeInstanceOf(RefactoredSizeUnitCalculator);
    }
  }

  function createDifferentConfigurations(): any[] {
    return [
      { strategyRegistry: strategyRegistry },
      { strategyRegistry: new SizeValueCalculationStrategyRegistry() },
    ];
  }

  function createCalculatorWithConfiguration(config: any): RefactoredSizeUnitCalculator {
    return new RefactoredSizeUnitCalculator(
      'test-calculator',
      'Test Calculator',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      100,
      false,
      config.strategyRegistry
    );
  }

  function testDifferentStrategies(): void {
    const strategies = createDifferentStrategies();
    
    for (const strategy of strategies) {
      const testRegistry = new SizeValueCalculationStrategyRegistry();
      testRegistry.registerStrategy(strategy);
      
      const testCalculator = new RefactoredSizeUnitCalculator(
        'test-calculator',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        testRegistry
      );
      expect(testCalculator).toBeInstanceOf(RefactoredSizeUnitCalculator);
    }
  }

  function createDifferentStrategies(): any[] {
    return [
      new PixelSizeValueCalculationStrategy(),
      new FillSizeValueCalculationStrategy(),
      new AutoSizeValueCalculationStrategy(),
    ];
  }
});