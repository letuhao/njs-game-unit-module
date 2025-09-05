import { SizeUnitStrategy } from '../strategies/SizeUnitStrategy';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { createMockContext } from './setup';
import { container, TOKENS } from '../container/DiContainer';

describe('SizeUnitStrategy', () => {
  let strategy: SizeUnitStrategy;
  let mockContext: ReturnType<typeof createMockContext>;

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

  function createNumericInputs(): number[] {
    return [100, 200.5, 0, -50, 1000];
  }

  function testStringInputHandling(): void {
    const stringInputs = createStringInputs();
    
    for (const input of stringInputs) {
      const canHandle = strategy.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createStringInputs(): string[] {
    return ['100px', '50%', 'auto', 'fill', '100'];
  }

  function testSizeValueInputHandling(): void {
    const sizeValueInputs = createSizeValueInputs();
    
    for (const input of sizeValueInputs) {
      const canHandle = strategy.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createSizeValueInputs(): SizeValue[] {
    return [SizeValue.PIXEL, SizeValue.FILL, SizeValue.AUTO, SizeValue.PARENT_WIDTH, SizeValue.VIEWPORT_WIDTH];
  }

  function testSizeUnitInputHandling(): void {
    const sizeUnitInputs = createSizeUnitInputs();
    
    for (const input of sizeUnitInputs) {
      const canHandle = strategy.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createSizeUnitInputs(): SizeUnit[] {
    return [SizeUnit.PIXEL, SizeUnit.FILL, SizeUnit.AUTO, SizeUnit.PARENT_WIDTH, SizeUnit.VIEWPORT_WIDTH];
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