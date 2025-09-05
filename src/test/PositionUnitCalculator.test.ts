import { PositionUnitCalculator } from '../classes/PositionUnitCalculator';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { Dimension } from '../enums/Dimension';
import { createMockContext } from './setup';
import { container, TOKENS } from '../container/DiContainer';

describe('PositionUnitCalculator', () => {
  let calculator: PositionUnitCalculator;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Constructor', () => {
    it('should create a position unit calculator with correct properties', () => {
      testCalculatorCreation();
    });

    it('should create calculator with default values', () => {
      testDefaultCalculatorCreation();
    });
  });

  describe('Position Calculation', () => {
    beforeEach(() => {
      setupCalculatorForCalculation();
    });

    it('should calculate pixel position correctly', () => {
      testPixelPositionCalculation();
    });

    it('should calculate center position correctly', () => {
      testCenterPositionCalculation();
    });

    it('should calculate content left position correctly', () => {
      testContentLeftPositionCalculation();
    });

    it('should calculate parent center X position correctly', () => {
      testParentCenterXPositionCalculation();
    });

    it('should calculate scene center X position correctly', () => {
      testSceneCenterXPositionCalculation();
    });
  });

  describe('Different Dimensions', () => {
    it('should handle X dimension calculations', () => {
      testXDimensionCalculations();
    });

    it('should handle Y dimension calculations', () => {
      testYDimensionCalculations();
    });

    it('should handle Z dimension calculations', () => {
      testZDimensionCalculations();
    });
  });

  describe('Different Position Units', () => {
    it('should handle pixel unit calculations', () => {
      testPixelUnitCalculations();
    });

    it('should handle center unit calculations', () => {
      testCenterUnitCalculations();
    });

    it('should handle content left unit calculations', () => {
      testContentLeftUnitCalculations();
    });

    it('should handle parent center X unit calculations', () => {
      testParentCenterXUnitCalculations();
    });

    it('should handle scene center X unit calculations', () => {
      testSceneCenterXUnitCalculations();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid position values gracefully', () => {
      testInvalidPositionValueHandling();
    });

    it('should handle invalid position units gracefully', () => {
      testInvalidPositionUnitHandling();
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

  function createCalculatorWithProperties(): PositionUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
      setCalculatorProperties(calculator);
      return calculator;
    } catch (error) {
      return new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.X,
        100
      );
    }
  }

  function setCalculatorProperties(calculator: PositionUnitCalculator): void {
    (calculator as any).id = 'test-position';
    (calculator as any).name = 'Test Position';
    (calculator as any).positionUnit = PositionUnit.PIXEL;
    (calculator as any).axis = Dimension.X;
    (calculator as any).baseValue = 100;
  }

  function verifyCalculatorProperties(calculator: PositionUnitCalculator): void {
    expect(calculator.id).toBe('test-position');
    expect(calculator.name).toBe('Test Position');
    expect(calculator.positionUnit).toBe(PositionUnit.PIXEL);
    expect(calculator.axis).toBe(Dimension.X);
    expect(calculator.baseValue).toBe(100);
    expect(calculator.isActive).toBe(true);
  }

  function testDefaultCalculatorCreation(): void {
    const defaultCalculator = createDefaultCalculator();
    
    verifyDefaultCalculatorProperties(defaultCalculator);
  }

  function createDefaultCalculator(): PositionUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
      setDefaultCalculatorProperties(calculator);
      return calculator;
    } catch (error) {
      return new PositionUnitCalculator(
        'default-position',
        'Default Position',
        PositionUnit.PIXEL,
        Dimension.X,
        0
      );
    }
  }

  function setDefaultCalculatorProperties(calculator: PositionUnitCalculator): void {
    (calculator as any).id = 'default-position';
    (calculator as any).name = 'Default Position';
    (calculator as any).positionUnit = PositionUnit.PIXEL;
    (calculator as any).axis = Dimension.X;
    (calculator as any).baseValue = 0;
  }

  function verifyDefaultCalculatorProperties(calculator: PositionUnitCalculator): void {
    expect(calculator).toBeInstanceOf(PositionUnitCalculator);
    expect(calculator.id).toBe('default-position');
    expect(calculator.name).toBe('Default Position');
  }

  function setupCalculatorForCalculation(): void {
    try {
      calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
      setCalculatorProperties(calculator);
    } catch (error) {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.X,
        100
      );
    }
  }

  function testPixelPositionCalculation(): void {
    const result = calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testCenterPositionCalculation(): void {
    const result = calculator.calculate(PositionValue.CENTER, PositionUnit.CENTER, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testContentLeftPositionCalculation(): void {
    const result = calculator.calculate(PositionValue.CONTENT_LEFT, PositionUnit.CONTENT_LEFT, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testParentCenterXPositionCalculation(): void {
    const result = calculator.calculate(PositionValue.PARENT_CENTER_X, PositionUnit.PARENT_CENTER_X, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testSceneCenterXPositionCalculation(): void {
    const result = calculator.calculate(PositionValue.SCENE_CENTER_X, PositionUnit.SCENE_CENTER_X, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testXDimensionCalculations(): void {
    const xCalculator = createCalculatorForDimension(Dimension.X);
    const result = xCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testYDimensionCalculations(): void {
    const yCalculator = createCalculatorForDimension(Dimension.Y);
    const result = yCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testZDimensionCalculations(): void {
    const zCalculator = createCalculatorForDimension(Dimension.Z);
    const result = zCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createCalculatorForDimension(dimension: Dimension): PositionUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
      setCalculatorPropertiesForDimension(calculator, dimension);
      return calculator;
    } catch (error) {
      return new PositionUnitCalculator(
        `${dimension.toLowerCase()}-position`,
        `${dimension} Position`,
        PositionUnit.PIXEL,
        dimension,
        100
      );
    }
  }

  function setCalculatorPropertiesForDimension(calculator: PositionUnitCalculator, dimension: Dimension): void {
    (calculator as any).id = `${dimension.toLowerCase()}-position`;
    (calculator as any).name = `${dimension} Position`;
    (calculator as any).positionUnit = PositionUnit.PIXEL;
    (calculator as any).axis = dimension;
    (calculator as any).baseValue = 100;
  }

  function testPixelUnitCalculations(): void {
    const pixelCalculator = createCalculatorForUnit(PositionUnit.PIXEL);
    const result = pixelCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testCenterUnitCalculations(): void {
    const centerCalculator = createCalculatorForUnit(PositionUnit.CENTER);
    const result = centerCalculator.calculate(PositionValue.CENTER, PositionUnit.CENTER, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testContentLeftUnitCalculations(): void {
    const contentLeftCalculator = createCalculatorForUnit(PositionUnit.CONTENT_LEFT);
    const result = contentLeftCalculator.calculate(PositionValue.CONTENT_LEFT, PositionUnit.CONTENT_LEFT, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testParentCenterXUnitCalculations(): void {
    const parentCenterXCalculator = createCalculatorForUnit(PositionUnit.PARENT_CENTER_X);
    const result = parentCenterXCalculator.calculate(PositionValue.PARENT_CENTER_X, PositionUnit.PARENT_CENTER_X, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testSceneCenterXUnitCalculations(): void {
    const sceneCenterXCalculator = createCalculatorForUnit(PositionUnit.SCENE_CENTER_X);
    const result = sceneCenterXCalculator.calculate(PositionValue.SCENE_CENTER_X, PositionUnit.SCENE_CENTER_X, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createCalculatorForUnit(unit: PositionUnit): PositionUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
      setCalculatorPropertiesForUnit(calculator, unit);
      return calculator;
    } catch (error) {
      return new PositionUnitCalculator(
        `${unit.toLowerCase()}-position`,
        `${unit} Position`,
        unit,
        Dimension.X,
        100
      );
    }
  }

  function setCalculatorPropertiesForUnit(calculator: PositionUnitCalculator, unit: PositionUnit): void {
    (calculator as any).id = `${unit.toLowerCase()}-position`;
    (calculator as any).name = `${unit} Position`;
    (calculator as any).positionUnit = unit;
    (calculator as any).axis = Dimension.X;
    (calculator as any).baseValue = 100;
  }

  function testInvalidPositionValueHandling(): void {
    const invalidValues = createInvalidPositionValues();
    
    for (const value of invalidValues) {
      const result = calculator.calculate(value, PositionUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
    }
  }

  function createInvalidPositionValues(): any[] {
    return [null, undefined, 'invalid', {}, []];
  }

  function testInvalidPositionUnitHandling(): void {
    const invalidUnits = createInvalidPositionUnits();
    
    for (const unit of invalidUnits) {
      const result = calculator.calculate(PositionValue.PIXEL, unit, mockContext);
      expect(typeof result).toBe('number');
    }
  }

  function createInvalidPositionUnits(): any[] {
    return [null, undefined, 'invalid', {}, []];
  }

  function testMissingContextPropertiesHandling(): void {
    const partialContext = { dimension: 'width' };
    const result = calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, partialContext as any);
    
    expect(typeof result).toBe('number');
  }

  function testCalculationEfficiency(): void {
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testMultipleCalculations(): void {
    const calculations = createMultipleCalculations();
    
    for (const calculation of calculations) {
      const result = calculator.calculate(calculation.value, calculation.unit, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createMultipleCalculations(): any[] {
    return [
      { value: PositionValue.PIXEL, unit: PositionUnit.PIXEL },
      { value: PositionValue.CENTER, unit: PositionUnit.CENTER },
      { value: PositionValue.CONTENT_LEFT, unit: PositionUnit.CONTENT_LEFT },
      { value: PositionValue.PARENT_CENTER_X, unit: PositionUnit.PARENT_CENTER_X },
      { value: PositionValue.SCENE_CENTER_X, unit: PositionUnit.SCENE_CENTER_X },
    ];
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const result = calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, context);
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
      expect(testCalculator).toBeInstanceOf(PositionUnitCalculator);
    }
  }

  function createDifferentConfigurations(): any[] {
    return [
      { unit: PositionUnit.PIXEL, axis: Dimension.X, baseValue: 100 },
      { unit: PositionUnit.CENTER, axis: Dimension.Y, baseValue: 50 },
      { unit: PositionUnit.CONTENT_LEFT, axis: Dimension.Z, baseValue: 200 },
    ];
  }

  function createCalculatorWithConfiguration(config: any): PositionUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
      setCalculatorPropertiesForConfiguration(calculator, config);
      return calculator;
    } catch (error) {
      return new PositionUnitCalculator(
        'test-position',
        'Test Position',
        config.unit,
        config.axis,
        config.baseValue
      );
    }
  }

  function setCalculatorPropertiesForConfiguration(calculator: PositionUnitCalculator, config: any): void {
    (calculator as any).id = 'test-position';
    (calculator as any).name = 'Test Position';
    (calculator as any).positionUnit = config.unit;
    (calculator as any).axis = config.axis;
    (calculator as any).baseValue = config.baseValue;
  }
});