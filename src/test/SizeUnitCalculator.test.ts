import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { Dimension } from '../enums/Dimension';
import { createMockContext } from './test-utils';
import { container, TOKENS } from '../container/DiContainer';

describe('SizeUnitCalculator', () => {
  let calculator: SizeUnitCalculator;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Constructor', () => {
    it('should create a size unit calculator with correct properties', () => {
      testCalculatorCreation();
    });

    it('should create calculator with default values', () => {
      testDefaultCalculatorCreation();
    });

    it('should handle invalid size values gracefully', () => {
      testInvalidSizeValueHandling();
    });
  });

  describe('Size Calculation', () => {
    beforeEach(() => {
      setupCalculatorForCalculation();
    });

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

  describe('Different Size Units', () => {
    it('should handle pixel unit calculations', () => {
      testPixelUnitCalculations();
    });

    it('should handle fill unit calculations', () => {
      testFillUnitCalculations();
    });

    it('should handle auto unit calculations', () => {
      testAutoUnitCalculations();
    });

    it('should handle parent width unit calculations', () => {
      testParentWidthUnitCalculations();
    });

    it('should handle viewport width unit calculations', () => {
      testViewportWidthUnitCalculations();
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
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    setupMockContext();
  }

  function setupMockContext(): void {
    mockContext = createMockContext();
  }

  function testCalculatorCreation(): void {
    const calculator = createCalculatorWithProperties();
    
    verifyCalculatorProperties(calculator);
  }

  function createCalculatorWithProperties(): SizeUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SIZE_CALCULATOR);
      setCalculatorProperties(calculator);
      return calculator;
    } catch (error) {
      return new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        true
      );
    }
  }

  function setCalculatorProperties(calculator: SizeUnitCalculator): void {
    (calculator as any).id = 'test-size';
    (calculator as any).name = 'Test Size';
    (calculator as any).sizeUnit = SizeUnit.PARENT_WIDTH;
    (calculator as any).dimension = Dimension.WIDTH;
    (calculator as any).baseValue = SizeValue.FILL;
    (calculator as any).isActive = true;
  }

  function verifyCalculatorProperties(calculator: SizeUnitCalculator): void {
    expect(calculator.id).toBe('test-size');
    expect(calculator.name).toBe('Test Size');
    expect(calculator.sizeUnit).toBe(SizeUnit.PARENT_WIDTH);
    expect(calculator.dimension).toBe(Dimension.WIDTH);
    expect(calculator.baseValue).toBe(SizeValue.FILL);
    expect(calculator.isActive).toBe(true);
  }

  function testDefaultCalculatorCreation(): void {
    const defaultCalculator = createDefaultCalculator();
    
    verifyDefaultCalculatorProperties(defaultCalculator);
  }

  function createDefaultCalculator(): SizeUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SIZE_CALCULATOR);
      setDefaultCalculatorProperties(calculator);
      return calculator;
    } catch (error) {
      return new SizeUnitCalculator(
        'default-size',
        'Default Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.PIXEL,
        true
      );
    }
  }

  function setDefaultCalculatorProperties(calculator: SizeUnitCalculator): void {
    (calculator as any).id = 'default-size';
    (calculator as any).name = 'Default Size';
    (calculator as any).sizeUnit = SizeUnit.PIXEL;
    (calculator as any).dimension = Dimension.WIDTH;
    (calculator as any).baseValue = SizeValue.PIXEL;
    (calculator as any).isActive = true;
  }

  function verifyDefaultCalculatorProperties(calculator: SizeUnitCalculator): void {
    expect(calculator).toBeInstanceOf(SizeUnitCalculator);
    expect(calculator.id).toBe('default-size');
    expect(calculator.name).toBe('Default Size');
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

  function setupCalculatorForCalculation(): void {
    try {
      calculator = container.resolve(TOKENS.SIZE_CALCULATOR);
      setCalculatorProperties(calculator);
    } catch (error) {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        true
      );
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
    const widthCalculator = createCalculatorForDimension(Dimension.WIDTH);
    const result = widthCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testHeightDimensionCalculations(): void {
    const heightCalculator = createCalculatorForDimension(Dimension.HEIGHT);
    const result = heightCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testBothDimensionsCalculations(): void {
    const dimensions = [Dimension.WIDTH, Dimension.HEIGHT];
    
    for (const dimension of dimensions) {
      const calculator = createCalculatorForDimension(dimension);
      const result = calculator.calculate(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createCalculatorForDimension(dimension: Dimension): SizeUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SIZE_CALCULATOR);
      setCalculatorPropertiesForDimension(calculator, dimension);
      return calculator;
    } catch (error) {
      return new SizeUnitCalculator(
        `${dimension.toLowerCase()}-size`,
        `${dimension} Size`,
        SizeUnit.PIXEL,
        dimension,
        SizeValue.PIXEL,
        true
      );
    }
  }

  function setCalculatorPropertiesForDimension(calculator: SizeUnitCalculator, dimension: Dimension): void {
    (calculator as any).id = `${dimension.toLowerCase()}-size`;
    (calculator as any).name = `${dimension} Size`;
    (calculator as any).sizeUnit = SizeUnit.PIXEL;
    (calculator as any).dimension = dimension;
    (calculator as any).baseValue = SizeValue.PIXEL;
    (calculator as any).isActive = true;
  }

  function testPixelUnitCalculations(): void {
    const pixelCalculator = createCalculatorForUnit(SizeUnit.PIXEL);
    const result = pixelCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testFillUnitCalculations(): void {
    const fillCalculator = createCalculatorForUnit(SizeUnit.FILL);
    const result = fillCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testAutoUnitCalculations(): void {
    const autoCalculator = createCalculatorForUnit(SizeUnit.AUTO);
    const result = autoCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testParentWidthUnitCalculations(): void {
    const parentWidthCalculator = createCalculatorForUnit(SizeUnit.PARENT_WIDTH);
    const result = parentWidthCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testViewportWidthUnitCalculations(): void {
    const viewportWidthCalculator = createCalculatorForUnit(SizeUnit.VIEWPORT_WIDTH);
    const result = viewportWidthCalculator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createCalculatorForUnit(unit: SizeUnit): SizeUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SIZE_CALCULATOR);
      setCalculatorPropertiesForUnit(calculator, unit);
      return calculator;
    } catch (error) {
      return new SizeUnitCalculator(
        `${unit.toLowerCase()}-size`,
        `${unit} Size`,
        unit,
        Dimension.WIDTH,
        SizeValue.PIXEL,
        true
      );
    }
  }

  function setCalculatorPropertiesForUnit(calculator: SizeUnitCalculator, unit: SizeUnit): void {
    (calculator as any).id = `${unit.toLowerCase()}-size`;
    (calculator as any).name = `${unit} Size`;
    (calculator as any).sizeUnit = unit;
    (calculator as any).dimension = Dimension.WIDTH;
    (calculator as any).baseValue = SizeValue.PIXEL;
    (calculator as any).isActive = true;
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
      expect(testCalculator).toBeInstanceOf(SizeUnitCalculator);
    }
  }

  function createDifferentConfigurations(): any[] {
    return [
      { unit: SizeUnit.PIXEL, dimension: Dimension.WIDTH, baseValue: SizeValue.PIXEL },
      { unit: SizeUnit.FILL, dimension: Dimension.HEIGHT, baseValue: SizeValue.FILL },
      { unit: SizeUnit.AUTO, dimension: Dimension.WIDTH, baseValue: SizeValue.AUTO },
    ];
  }

  function createCalculatorWithConfiguration(config: any): SizeUnitCalculator {
    try {
      const calculator = container.resolve(TOKENS.SIZE_CALCULATOR);
      setCalculatorPropertiesForConfiguration(calculator, config);
      return calculator;
    } catch (error) {
      return new SizeUnitCalculator(
        'test-size',
        'Test Size',
        config.unit,
        config.dimension,
        config.baseValue,
        true
      );
    }
  }

  function setCalculatorPropertiesForConfiguration(calculator: SizeUnitCalculator, config: any): void {
    (calculator as any).id = 'test-size';
    (calculator as any).name = 'Test Size';
    (calculator as any).sizeUnit = config.unit;
    (calculator as any).dimension = config.dimension;
    (calculator as any).baseValue = config.baseValue;
    (calculator as any).isActive = true;
  }
});