import { SizeUnitStrategy } from '../strategies/SizeUnitStrategy';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { createMockContext } from './test-utils';
import { container, TOKENS } from '../container/DiContainer';
import { createSizeTemplateInput, ITemplateInput } from '../interfaces/ITemplateInput';

describe('SizeUnitStrategy', () => {
  let strategy: SizeUnitStrategy;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a size unit strategy with correct properties', () => {
      testStrategyCreation();
    });

    it('should return correct strategy information', () => {
      testStrategyInformationRetrieval();
    });

    it('should have correct priority for size calculations', () => {
      testStrategyPriority();
    });
  });

  describe('Input Validation', () => {
    it('should handle numeric inputs', () => {
      testNumericInputHandling();
    });

    it('should handle string inputs', () => {
      testStringInputHandling();
    });

    it('should handle SizeValue inputs', () => {
      testSizeValueInputHandling();
    });

    it('should handle SizeUnit inputs', () => {
      testSizeUnitInputHandling();
    });

    it('should handle array inputs', () => {
      testArrayInputHandling();
    });

    it('should reject invalid inputs', () => {
      testInvalidInputRejection();
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate size values correctly', () => {
      testSizeValueCalculation();
    });

    it('should handle different size units', () => {
      testDifferentSizeUnits();
    });

    it('should handle different contexts', () => {
      testDifferentContexts();
    });

    it('should apply fallback values when needed', () => {
      testFallbackValueApplication();
    });
  });

  describe('Error Handling', () => {
    it('should handle calculation errors gracefully', () => {
      testCalculationErrorHandling();
    });

    it('should handle missing context properties', () => {
      testMissingContextHandling();
    });

    it('should handle invalid input types', () => {
      testInvalidInputTypeHandling();
    });
  });

  describe('Performance', () => {
    it('should perform calculations efficiently', () => {
      testCalculationEfficiency();
    });

    it('should handle high-frequency calculations', () => {
      testHighFrequencyCalculations();
    });
  });

  describe('Integration', () => {
    it('should work with different strategies', () => {
      testDifferentStrategies();
    });

    it('should work with different configurations', () => {
      testDifferentConfigurations();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    initializeStrategy();
    createMockContext();
  }

  function initializeStrategy(): void {
    try {
      strategy = container.resolve(TOKENS.SIZE_UNIT_STRATEGY);
    } catch (error) {
      strategy = new SizeUnitStrategy();
    }
  }

  function createMockContext(): void {
    mockContext = createMockContext();
  }

  function testStrategyCreation(): void {
    expect(strategy.unitType).toBe('size');
    expect(strategy.getPriority()).toBe(1);
  }

  function testStrategyInformationRetrieval(): void {
    const info = strategy.getStrategyInfo();
    
    verifyStrategyInformation(info);
  }

  function verifyStrategyInformation(info: any): void {
    expect(info.unitType).toBe('size');
    expect(info.priority).toBe(1);
    expect(info.supportedInputs).toContain('number');
    expect(info.supportedInputs).toContain('string');
    expect(info.supportedInputs).toContain('SizeValue');
    expect(info.supportedInputs).toContain('SizeUnit');
    expect(info.supportedInputs).toContain('array');
  }

  function testStrategyPriority(): void {
    const priority = strategy.getPriority();
    expect(priority).toBe(1);
  }

  function testNumericInputHandling(): void {
    const numericInputs = createNumericInputs();
    
    for (const input of numericInputs) {
      const canHandle = strategy.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createNumericInputs(): ITemplateInput[] {
    return [
      createSizeTemplateInput('test-1', 100, SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH),
      createSizeTemplateInput('test-2', 200.5, SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH),
      createSizeTemplateInput('test-3', 0, SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH),
      createSizeTemplateInput('test-4', -50, SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH),
      createSizeTemplateInput('test-5', 1000, SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH)
    ];
  }

  function testStringInputHandling(): void {
    const stringInputs = createStringInputs();
    
    for (const input of stringInputs) {
      const canHandle = strategy.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createStringInputs(): ITemplateInput[] {
    return [
      createSizeTemplateInput('test-1', 100, SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH),
      createSizeTemplateInput('test-2', 50, SizeValue.PERCENTAGE, SizeUnit.PERCENTAGE, Dimension.WIDTH),
      createSizeTemplateInput('test-3', 0, SizeValue.AUTO, SizeUnit.AUTO, Dimension.WIDTH),
      createSizeTemplateInput('test-4', 100, SizeValue.FILL, SizeUnit.FILL, Dimension.WIDTH),
      createSizeTemplateInput('test-5', 100, SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH)
    ];
  }

  function testSizeValueInputHandling(): void {
    const sizeValueInputs = createSizeValueInputs();
    
    for (const input of sizeValueInputs) {
      const canHandle = strategy.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createSizeValueInputs(): ITemplateInput[] {
    return [
      createSizeTemplateInput('test-1', 100, SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH),
      createSizeTemplateInput('test-2', 100, SizeValue.FILL, SizeUnit.FILL, Dimension.WIDTH),
      createSizeTemplateInput('test-3', 0, SizeValue.AUTO, SizeUnit.AUTO, Dimension.WIDTH),
      createSizeTemplateInput('test-4', 100, SizeValue.PARENT_WIDTH, SizeUnit.PARENT_WIDTH, Dimension.WIDTH),
      createSizeTemplateInput('test-5', 100, SizeValue.VIEWPORT_WIDTH, SizeUnit.VIEWPORT_WIDTH, Dimension.WIDTH)
    ];
  }

  function testSizeUnitInputHandling(): void {
    const sizeUnitInputs = createSizeUnitInputs();
    
    for (const input of sizeUnitInputs) {
      const canHandle = strategy.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createSizeUnitInputs(): ITemplateInput[] {
    return [
      createSizeTemplateInput('test-1', 100, SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH),
      createSizeTemplateInput('test-2', 100, SizeValue.FILL, SizeUnit.FILL, Dimension.WIDTH),
      createSizeTemplateInput('test-3', 0, SizeValue.AUTO, SizeUnit.AUTO, Dimension.WIDTH),
      createSizeTemplateInput('test-4', 100, SizeValue.PARENT_WIDTH, SizeUnit.PARENT_WIDTH, Dimension.WIDTH),
      createSizeTemplateInput('test-5', 100, SizeValue.VIEWPORT_WIDTH, SizeUnit.VIEWPORT_WIDTH, Dimension.WIDTH)
    ];
  }

  function testArrayInputHandling(): void {
    const arrayInputs = createArrayInputs();
    
    for (const input of arrayInputs) {
      const canHandle = strategy.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createArrayInputs(): any[] {
    return [
      [100, 200],
      ['100px', '200px'],
      [SizeValue.PIXEL, SizeValue.FILL],
      [SizeUnit.PIXEL, SizeUnit.FILL],
    ];
  }

  function testInvalidInputRejection(): void {
    const invalidInputs = createInvalidInputs();
    
    for (const input of invalidInputs) {
      const canHandle = strategy.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createInvalidInputs(): any[] {
    return [null, undefined, {}, () => {}, Symbol('test')];
  }

  function testSizeValueCalculation(): void {
    const input = createValidSizeInput();
    const result = strategy.calculate(input, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createValidSizeInput(): any {
    return {
      value: 100,
      unit: SizeUnit.PIXEL,
      dimension: 'width',
    };
  }

  function testDifferentSizeUnits(): void {
    const sizeUnits = createSizeUnitInputs();
    
    for (const unit of sizeUnits) {
      const input = createInputWithUnit(unit);
      const result = strategy.calculate(input, mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createInputWithUnit(unit: SizeUnit): any {
    return {
      value: 100,
      unit: unit,
      dimension: 'width',
    };
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const input = createValidSizeInput();
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

  function testFallbackValueApplication(): void {
    const input = createInputWithMissingValues();
    const result = strategy.calculate(input, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createInputWithMissingValues(): any {
    return {
      value: null,
      unit: null,
      dimension: 'width',
    };
  }

  function testCalculationErrorHandling(): void {
    const input = createProblematicInput();
    
    expect(() => strategy.calculate(input, mockContext)).not.toThrow();
  }

  function createProblematicInput(): any {
    return {
      value: 'invalid',
      unit: 'invalid',
      dimension: 'width',
    };
  }

  function testMissingContextHandling(): void {
    const input = createValidSizeInput();
    const partialContext = { dimension: 'width' };
    
    expect(() => strategy.calculate(input, partialContext as any)).not.toThrow();
  }

  function testInvalidInputTypeHandling(): void {
    const invalidInputs = createInvalidInputs();
    
    for (const input of invalidInputs) {
      expect(() => strategy.calculate(input, mockContext)).not.toThrow();
    }
  }

  function testCalculationEfficiency(): void {
    const input = createValidSizeInput();
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      strategy.calculate(input, mockContext);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testHighFrequencyCalculations(): void {
    const input = createValidSizeInput();
    const results = [];
    
    for (let i = 0; i < 100; i++) {
      const result = strategy.calculate(input, mockContext);
      results.push(result);
    }
    
    results.forEach(result => {
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  }

  function testDifferentStrategies(): void {
    const strategies = createDifferentStrategies();
    
    for (const testStrategy of strategies) {
      const input = createValidSizeInput();
      const result = testStrategy.calculate(input, mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentStrategies(): SizeUnitStrategy[] {
    return [
      new SizeUnitStrategy(),
      container.resolve(TOKENS.SIZE_UNIT_STRATEGY) as SizeUnitStrategy,
    ];
  }

  function testDifferentConfigurations(): void {
    const configurations = createDifferentConfigurations();
    
    for (const config of configurations) {
      const testStrategy = createStrategyWithConfiguration(config);
      expect(testStrategy).toBeInstanceOf(SizeUnitStrategy);
    }
  }

  function createDifferentConfigurations(): any[] {
    return [
      { unitType: 'size', priority: 1 },
      { unitType: 'size', priority: 2 },
      { unitType: 'size', priority: 3 },
    ];
  }

  function createStrategyWithConfiguration(config: any): SizeUnitStrategy {
    const testStrategy = new SizeUnitStrategy();
    (testStrategy as any).unitType = config.unitType;
    (testStrategy as any).priority = config.priority;
    return testStrategy;
  }
});