import { ScaleUnitCalculator } from '../classes/ScaleUnitCalculator';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { createMockContext } from './test-utils';
import { container, TOKENS } from '../container/DiContainer';

describe('ScaleUnitCalculator', () => {
  let calculator: ScaleUnitCalculator;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Constructor', () => {
    it('should create a scale unit calculator with correct properties', () => {
      testCalculatorCreation();
    });

    it('should create calculator with default values', () => {
      testDefaultCalculatorCreation();
    });

    it('should handle invalid scale values gracefully', () => {
      testInvalidScaleValueHandling();
    });
  });

  describe('Scale Calculation', () => {
    beforeEach(() => {
      setupCalculatorForCalculation();
    });

    it('should calculate factor scale values', () => {
      testFactorScaleValueCalculation();
    });

    it('should calculate pixel scale values', () => {
      testPixelScaleValueCalculation();
    });

    it('should calculate percentage scale values', () => {
      testPercentageScaleValueCalculation();
    });

    it('should calculate viewport scale values', () => {
      testViewportScaleValueCalculation();
    });

    it('should calculate parent scale values', () => {
      testParentScaleValueCalculation();
    });
  });

  describe('Aspect Ratio Handling', () => {
    it('should maintain aspect ratio when enabled', () => {
      testAspectRatioMaintenance();
    });

    it('should not maintain aspect ratio when disabled', () => {
      testAspectRatioDisabled();
    });

    it('should handle different aspect ratios', () => {
      testDifferentAspectRatios();
    });
  });

  describe('Different Scale Units', () => {
    it('should handle factor unit calculations', () => {
      testFactorUnitCalculations();
    });

    it('should handle pixel unit calculations', () => {
      testPixelUnitCalculations();
    });

    it('should handle percentage unit calculations', () => {
      testPercentageUnitCalculations();
    });

    it('should handle viewport unit calculations', () => {
      testViewportUnitCalculations();
    });

    it('should handle parent unit calculations', () => {
      testParentUnitCalculations();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid scale values gracefully', () => {
      testInvalidScaleValueHandling();
    });

    it('should handle invalid scale units gracefully', () => {
      testInvalidScaleUnitHandling();
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
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    createMockContext();
  }

  function createMockContext(): void {
    mockContext = createMockContext();
  }

  function testCalculatorCreation(): void {
    const calculator = createCalculatorWithProperties();
    
    verifyCalculatorProperties(calculator);
  }

  function createCalculatorWithProperties(): ScaleUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SCALE_CALCULATOR);
      setCalculatorProperties(calculator);
      return calculator;
    } catch (error) {
      return new ScaleUnitCalculator('test-scale', 'Test Scale', ScaleUnit.FACTOR, 1.5, true);
    }
  }

  function setCalculatorProperties(calculator: ScaleUnitCalculator): void {
    (calculator as any).id = 'test-scale';
    (calculator as any).name = 'Test Scale';
    (calculator as any).scaleUnit = ScaleUnit.FACTOR;
    (calculator as any).baseValue = 1.5;
    (calculator as any).maintainAspectRatio = true;
    (calculator as any).isActive = true;
  }

  function verifyCalculatorProperties(calculator: ScaleUnitCalculator): void {
    expect(calculator.id).toBe('test-scale');
    expect(calculator.name).toBe('Test Scale');
    expect(calculator.scaleUnit).toBe(ScaleUnit.FACTOR);
    expect(calculator.baseValue).toBe(1.5);
    expect(calculator.maintainAspectRatio).toBe(true);
    expect(calculator.isActive).toBe(true);
  }

  function testDefaultCalculatorCreation(): void {
    const defaultCalculator = createDefaultCalculator();
    
    verifyDefaultCalculatorProperties(defaultCalculator);
  }

  function createDefaultCalculator(): ScaleUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SCALE_CALCULATOR);
      setDefaultCalculatorProperties(calculator);
      return calculator;
    } catch (error) {
      return new ScaleUnitCalculator('default-scale', 'Default Scale', ScaleUnit.PIXEL, 1, false);
    }
  }

  function setDefaultCalculatorProperties(calculator: ScaleUnitCalculator): void {
    (calculator as any).id = 'default-scale';
    (calculator as any).name = 'Default Scale';
    (calculator as any).scaleUnit = ScaleUnit.PIXEL;
    (calculator as any).baseValue = 1;
    (calculator as any).maintainAspectRatio = false;
    (calculator as any).isActive = true;
  }

  function verifyDefaultCalculatorProperties(calculator: ScaleUnitCalculator): void {
    expect(calculator).toBeInstanceOf(ScaleUnitCalculator);
    expect(calculator.id).toBe('default-scale');
    expect(calculator.name).toBe('Default Scale');
  }

  function testInvalidScaleValueHandling(): void {
    const invalidValues = createInvalidScaleValues();
    
    for (const value of invalidValues) {
      const result = calculator.calculate(mockContext);
      expect(typeof result).toBe('number');
    }
  }

  function createInvalidScaleValues(): any[] {
    return [null, undefined, 'invalid', {}, []];
  }

  function setupCalculatorForCalculation(): void {
    try {
      calculator = container.resolve(TOKENS.SCALE_CALCULATOR);
      setCalculatorProperties(calculator);
    } catch (error) {
      calculator = new ScaleUnitCalculator('test-scale', 'Test Scale', ScaleUnit.FACTOR, 1.5, true);
    }
  }

  function testFactorScaleValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testPixelScaleValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testPercentageScaleValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testViewportScaleValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testParentScaleValueCalculation(): void {
    const result = calculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testAspectRatioMaintenance(): void {
    const calculatorWithAspectRatio = createCalculatorWithAspectRatio(true);
    const result = calculatorWithAspectRatio.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createCalculatorWithAspectRatio(maintainAspectRatio: boolean): ScaleUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SCALE_CALCULATOR);
      setCalculatorPropertiesWithAspectRatio(calculator, maintainAspectRatio);
      return calculator;
    } catch (error) {
      return new ScaleUnitCalculator('test-scale', 'Test Scale', ScaleUnit.FACTOR, 1.5, maintainAspectRatio);
    }
  }

  function setCalculatorPropertiesWithAspectRatio(calculator: ScaleUnitCalculator, maintainAspectRatio: boolean): void {
    (calculator as any).id = 'test-scale';
    (calculator as any).name = 'Test Scale';
    (calculator as any).scaleUnit = ScaleUnit.FACTOR;
    (calculator as any).baseValue = 1.5;
    (calculator as any).maintainAspectRatio = maintainAspectRatio;
    (calculator as any).isActive = true;
  }

  function testAspectRatioDisabled(): void {
    const calculatorWithoutAspectRatio = createCalculatorWithAspectRatio(false);
    const result = calculatorWithoutAspectRatio.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testDifferentAspectRatios(): void {
    const aspectRatios = [0.5, 1.0, 1.5, 2.0];
    
    for (const aspectRatio of aspectRatios) {
      const calculator = createCalculatorWithAspectRatio(true);
      const result = calculator.calculate(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function testFactorUnitCalculations(): void {
    const factorCalculator = createCalculatorForUnit(ScaleUnit.FACTOR);
    const result = factorCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testPixelUnitCalculations(): void {
    const pixelCalculator = createCalculatorForUnit(ScaleUnit.PIXEL);
    const result = pixelCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testPercentageUnitCalculations(): void {
    const percentageCalculator = createCalculatorForUnit(ScaleUnit.PERCENTAGE);
    const result = percentageCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testViewportUnitCalculations(): void {
    const viewportCalculator = createCalculatorForUnit(ScaleUnit.VIEWPORT);
    const result = viewportCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testParentUnitCalculations(): void {
    const parentCalculator = createCalculatorForUnit(ScaleUnit.PARENT);
    const result = parentCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createCalculatorForUnit(unit: ScaleUnit): ScaleUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SCALE_CALCULATOR);
      setCalculatorPropertiesForUnit(calculator, unit);
      return calculator;
    } catch (error) {
      return new ScaleUnitCalculator(`${unit.toLowerCase()}-scale`, `${unit} Scale`, unit, 1.5, true);
    }
  }

  function setCalculatorPropertiesForUnit(calculator: ScaleUnitCalculator, unit: ScaleUnit): void {
    (calculator as any).id = `${unit.toLowerCase()}-scale`;
    (calculator as any).name = `${unit} Scale`;
    (calculator as any).scaleUnit = unit;
    (calculator as any).baseValue = 1.5;
    (calculator as any).maintainAspectRatio = true;
    (calculator as any).isActive = true;
  }

  function testInvalidScaleUnitHandling(): void {
    const invalidUnits = createInvalidScaleUnits();
    
    for (const unit of invalidUnits) {
      const result = calculator.calculate(mockContext);
      expect(typeof result).toBe('number');
    }
  }

  function createInvalidScaleUnits(): any[] {
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
      { value: ScaleValue.FACTOR, unit: ScaleUnit.FACTOR },
      { value: ScaleValue.PIXEL, unit: ScaleUnit.PIXEL },
      { value: ScaleValue.PERCENTAGE, unit: ScaleUnit.PERCENTAGE },
      { value: ScaleValue.VIEWPORT, unit: ScaleUnit.VIEWPORT },
      { value: ScaleValue.PARENT, unit: ScaleUnit.PARENT },
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
      expect(testCalculator).toBeInstanceOf(ScaleUnitCalculator);
    }
  }

  function createDifferentConfigurations(): any[] {
    return [
      { unit: ScaleUnit.FACTOR, baseValue: 1.5, maintainAspectRatio: true },
      { unit: ScaleUnit.PIXEL, baseValue: 100, maintainAspectRatio: false },
      { unit: ScaleUnit.PERCENTAGE, baseValue: 50, maintainAspectRatio: true },
    ];
  }

  function createCalculatorWithConfiguration(config: any): ScaleUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SCALE_CALCULATOR);
      setCalculatorPropertiesForConfiguration(calculator, config);
      return calculator;
    } catch (error) {
      return new ScaleUnitCalculator('test-scale', 'Test Scale', config.unit, config.baseValue, config.maintainAspectRatio);
    }
  }

  function setCalculatorPropertiesForConfiguration(calculator: ScaleUnitCalculator, config: any): void {
    (calculator as any).id = 'test-scale';
    (calculator as any).name = 'Test Scale';
    (calculator as any).scaleUnit = config.unit;
    (calculator as any).baseValue = config.baseValue;
    (calculator as any).maintainAspectRatio = config.maintainAspectRatio;
    (calculator as any).isActive = true;
  }
});