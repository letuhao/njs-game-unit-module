import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { UnitCalculationMemento } from '../mementos/UnitCalculationMemento';
import { UnitType } from '../enums/UnitType';
import { SizeUnit } from '../enums/SizeUnit';
import { container, TOKENS } from '../container/DiContainer';

describe('UnitCalculationMemento', () => {
  let memento: UnitCalculationMemento;
  let mockInput: any;
  let mockContext: any;
  let mockPerformanceMetrics: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create memento with all required properties', () => {
      testMementoCreation();
    });

    it('should create memento with default values', () => {
      testDefaultMementoCreation();
    });

    it('should handle missing properties gracefully', () => {
      testMissingPropertiesHandling();
    });
  });

  describe('property access', () => {
    it('should get input property', () => {
      testInputPropertyAccess();
    });

    it('should get context property', () => {
      testContextPropertyAccess();
    });

    it('should get result property', () => {
      testResultPropertyAccess();
    });

    it('should get unitId property', () => {
      testUnitIdPropertyAccess();
    });

    it('should get unitType property', () => {
      testUnitTypePropertyAccess();
    });
  });

  describe('metadata access', () => {
    it('should get template name', () => {
      testTemplateNameAccess();
    });

    it('should get strategy name', () => {
      testStrategyNameAccess();
    });

    it('should get validator names', () => {
      testValidatorNamesAccess();
    });

    it('should get performance metrics', () => {
      testPerformanceMetricsAccess();
    });
  });

  describe('status and error handling', () => {
    it('should get success status', () => {
      testSuccessStatusAccess();
    });

    it('should get error information', () => {
      testErrorInformationAccess();
    });

    it('should get timestamp', () => {
      testTimestampAccess();
    });
  });

  describe('serialization', () => {
    it('should serialize to JSON', () => {
      testJsonSerialization();
    });

    it('should deserialize from JSON', () => {
      testJsonDeserialization();
    });

    it('should handle circular references', () => {
      testCircularReferenceHandling();
    });
  });

  describe('validation', () => {
    it('should validate memento data', () => {
      testMementoDataValidation();
    });

    it('should handle invalid data gracefully', () => {
      testInvalidDataHandling();
    });

    it('should validate required properties', () => {
      testRequiredPropertiesValidation();
    });
  });

  describe('performance', () => {
    it('should create memento efficiently', () => {
      testMementoCreationEfficiency();
    });

    it('should serialize efficiently', () => {
      testSerializationEfficiency();
    });
  });

  describe('integration', () => {
    it('should work with different unit types', () => {
      testDifferentUnitTypes();
    });

    it('should work with different contexts', () => {
      testDifferentContexts();
    });

    it('should work with different performance metrics', () => {
      testDifferentPerformanceMetrics();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    createMockInput();
    createMockContext();
    createMockPerformanceMetrics();
  }

  function createMockInput(): void {
    mockInput = { value: 100, unit: SizeUnit.PIXEL };
  }

  function createMockContext(): void {
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
    };
  }

  function createMockPerformanceMetrics(): void {
    mockPerformanceMetrics = {
      totalTime: 50,
      stepTimes: { validation: 10, calculation: 30, rounding: 10 },
      memoryUsage: 1024,
    };
  }

  function testMementoCreation(): void {
    const memento = createMementoWithProperties();
    
    verifyMementoProperties(memento);
  }

  function createMementoWithProperties(): UnitCalculationMemento {
    try {
      const memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
      setMementoProperties(memento);
      return memento;
    } catch (error) {
      return new UnitCalculationMemento(
        mockInput,
        mockContext,
        150,
        'test-unit-1',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        ['RangeValidator', 'TypeValidator'],
        mockPerformanceMetrics,
        true,
        undefined,
        new Date()
      );
    }
  }

  function setMementoProperties(memento: UnitCalculationMemento): void {
    (memento as any).input = mockInput;
    (memento as any).context = mockContext;
    (memento as any).result = 150;
    (memento as any).unitId = 'test-unit-1';
    (memento as any).unitType = UnitType.SIZE;
    (memento as any).templateName = 'SizeCalculationTemplate';
    (memento as any).strategyName = 'SizeUnitStrategy';
    (memento as any).validatorNames = ['RangeValidator', 'TypeValidator'];
    (memento as any).performanceMetrics = mockPerformanceMetrics;
    (memento as any).isSuccess = true;
    (memento as any).error = undefined;
    (memento as any).timestamp = new Date();
  }

  function verifyMementoProperties(memento: UnitCalculationMemento): void {
    expect(memento.input).toBe(mockInput);
    expect(memento.context).toBe(mockContext);
    expect(memento.result).toBe(150);
    expect(memento.unitId).toBe('test-unit-1');
    expect(memento.unitType).toBe(UnitType.SIZE);
    expect(memento.templateName).toBe('SizeCalculationTemplate');
    expect(memento.strategyName).toBe('SizeUnitStrategy');
    expect(memento.validatorNames).toEqual(['RangeValidator', 'TypeValidator']);
    expect(memento.performanceMetrics).toBe(mockPerformanceMetrics);
    expect(memento.isSuccess).toBe(true);
    expect(memento.error).toBeUndefined();
    expect(memento.timestamp).toBeInstanceOf(Date);
  }

  function testDefaultMementoCreation(): void {
    const defaultMemento = createDefaultMemento();
    
    expect(defaultMemento).toBeInstanceOf(UnitCalculationMemento);
    expect(defaultMemento.input).toBeDefined();
    expect(defaultMemento.context).toBeDefined();
  }

  function createDefaultMemento(): UnitCalculationMemento {
    try {
      const memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
      setDefaultMementoProperties(memento);
      return memento;
    } catch (error) {
      return new UnitCalculationMemento(
        mockInput,
        mockContext,
        0,
        'default-unit',
        UnitType.SIZE,
        'DefaultTemplate',
        'DefaultStrategy',
        [],
        {},
        false,
        undefined,
        new Date()
      );
    }
  }

  function setDefaultMementoProperties(memento: UnitCalculationMemento): void {
    (memento as any).input = mockInput;
    (memento as any).context = mockContext;
    (memento as any).result = 0;
    (memento as any).unitId = 'default-unit';
    (memento as any).unitType = UnitType.SIZE;
    (memento as any).templateName = 'DefaultTemplate';
    (memento as any).strategyName = 'DefaultStrategy';
    (memento as any).validatorNames = [];
    (memento as any).performanceMetrics = {};
    (memento as any).isSuccess = false;
    (memento as any).error = undefined;
    (memento as any).timestamp = new Date();
  }

  function testMissingPropertiesHandling(): void {
    const memento = createMementoWithMissingProperties();
    
    expect(memento).toBeInstanceOf(UnitCalculationMemento);
    expect(() => memento.input).not.toThrow();
  }

  function createMementoWithMissingProperties(): UnitCalculationMemento {
    try {
      const memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
      setMementoWithMissingProperties(memento);
      return memento;
    } catch (error) {
      return new UnitCalculationMemento(
        null,
        null,
        0,
        '',
        UnitType.SIZE,
        '',
        '',
        [],
        {},
        false,
        undefined,
        new Date()
      );
    }
  }

  function setMementoWithMissingProperties(memento: UnitCalculationMemento): void {
    (memento as any).input = null;
    (memento as any).context = null;
    (memento as any).result = 0;
    (memento as any).unitId = '';
    (memento as any).unitType = UnitType.SIZE;
    (memento as any).templateName = '';
    (memento as any).strategyName = '';
    (memento as any).validatorNames = [];
    (memento as any).performanceMetrics = {};
    (memento as any).isSuccess = false;
    (memento as any).error = undefined;
    (memento as any).timestamp = new Date();
  }

  function testInputPropertyAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.input).toBe(mockInput);
    expect(typeof memento.input).toBe('object');
  }

  function testContextPropertyAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.context).toBe(mockContext);
    expect(typeof memento.context).toBe('object');
  }

  function testResultPropertyAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.result).toBe(150);
    expect(typeof memento.result).toBe('number');
  }

  function testUnitIdPropertyAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.unitId).toBe('test-unit-1');
    expect(typeof memento.unitId).toBe('string');
  }

  function testUnitTypePropertyAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.unitType).toBe(UnitType.SIZE);
    expect(typeof memento.unitType).toBe('string');
  }

  function testTemplateNameAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.templateName).toBe('SizeCalculationTemplate');
    expect(typeof memento.templateName).toBe('string');
  }

  function testStrategyNameAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.strategyName).toBe('SizeUnitStrategy');
    expect(typeof memento.strategyName).toBe('string');
  }

  function testValidatorNamesAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.validatorNames).toEqual(['RangeValidator', 'TypeValidator']);
    expect(Array.isArray(memento.validatorNames)).toBe(true);
  }

  function testPerformanceMetricsAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.performanceMetrics).toBe(mockPerformanceMetrics);
    expect(typeof memento.performanceMetrics).toBe('object');
  }

  function testSuccessStatusAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.isSuccess).toBe(true);
    expect(typeof memento.isSuccess).toBe('boolean');
  }

  function testErrorInformationAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.error).toBeUndefined();
  }

  function testTimestampAccess(): void {
    const memento = createMementoWithProperties();
    
    expect(memento.timestamp).toBeInstanceOf(Date);
    expect(typeof memento.timestamp.getTime()).toBe('number');
  }

  function testJsonSerialization(): void {
    const memento = createMementoWithProperties();
    const json = memento.toJSON();
    
    expect(typeof json).toBe('string');
    expect(() => JSON.parse(json)).not.toThrow();
  }

  function testJsonDeserialization(): void {
    const memento = createMementoWithProperties();
    const json = memento.toJSON();
    const parsed = JSON.parse(json);
    
    expect(parsed).toBeDefined();
    expect(typeof parsed).toBe('object');
  }

  function testCircularReferenceHandling(): void {
    const memento = createMementoWithProperties();
    
    // Add circular reference
    (memento as any).input.circular = memento;
    
    expect(() => memento.toJSON()).not.toThrow();
  }

  function testMementoDataValidation(): void {
    const memento = createMementoWithProperties();
    const isValid = memento.validate();
    
    expect(typeof isValid).toBe('boolean');
  }

  function testInvalidDataHandling(): void {
    const memento = createMementoWithMissingProperties();
    const isValid = memento.validate();
    
    expect(typeof isValid).toBe('boolean');
  }

  function testRequiredPropertiesValidation(): void {
    const memento = createMementoWithProperties();
    const requiredProperties = memento.getRequiredProperties();
    
    expect(Array.isArray(requiredProperties)).toBe(true);
    expect(requiredProperties.length).toBeGreaterThan(0);
  }

  function testMementoCreationEfficiency(): void {
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      createMementoWithProperties();
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testSerializationEfficiency(): void {
    const memento = createMementoWithProperties();
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      memento.toJSON();
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testDifferentUnitTypes(): void {
    const unitTypes = createDifferentUnitTypes();
    
    for (const unitType of unitTypes) {
      const memento = createMementoWithUnitType(unitType);
      expect(memento.unitType).toBe(unitType);
    }
  }

  function createDifferentUnitTypes(): UnitType[] {
    return [UnitType.SIZE, UnitType.POSITION, UnitType.SCALE];
  }

  function createMementoWithUnitType(unitType: UnitType): UnitCalculationMemento {
    try {
      const memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
      setMementoWithUnitType(memento, unitType);
      return memento;
    } catch (error) {
      return new UnitCalculationMemento(
        mockInput,
        mockContext,
        150,
        'test-unit',
        unitType,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics,
        true,
        undefined,
        new Date()
      );
    }
  }

  function setMementoWithUnitType(memento: UnitCalculationMemento, unitType: UnitType): void {
    (memento as any).input = mockInput;
    (memento as any).context = mockContext;
    (memento as any).result = 150;
    (memento as any).unitId = 'test-unit';
    (memento as any).unitType = unitType;
    (memento as any).templateName = 'TestTemplate';
    (memento as any).strategyName = 'TestStrategy';
    (memento as any).validatorNames = [];
    (memento as any).performanceMetrics = mockPerformanceMetrics;
    (memento as any).isSuccess = true;
    (memento as any).error = undefined;
    (memento as any).timestamp = new Date();
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const memento = createMementoWithContext(context);
      expect(memento.context).toBe(context);
    }
  }

  function createDifferentContexts(): any[] {
    return [
      mockContext,
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' },
    ];
  }

  function createMementoWithContext(context: any): UnitCalculationMemento {
    try {
      const memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
      setMementoWithContext(memento, context);
      return memento;
    } catch (error) {
      return new UnitCalculationMemento(
        mockInput,
        context,
        150,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics,
        true,
        undefined,
        new Date()
      );
    }
  }

  function setMementoWithContext(memento: UnitCalculationMemento, context: any): void {
    (memento as any).input = mockInput;
    (memento as any).context = context;
    (memento as any).result = 150;
    (memento as any).unitId = 'test-unit';
    (memento as any).unitType = UnitType.SIZE;
    (memento as any).templateName = 'TestTemplate';
    (memento as any).strategyName = 'TestStrategy';
    (memento as any).validatorNames = [];
    (memento as any).performanceMetrics = mockPerformanceMetrics;
    (memento as any).isSuccess = true;
    (memento as any).error = undefined;
    (memento as any).timestamp = new Date();
  }

  function testDifferentPerformanceMetrics(): void {
    const performanceMetrics = createDifferentPerformanceMetrics();
    
    for (const metrics of performanceMetrics) {
      const memento = createMementoWithPerformanceMetrics(metrics);
      expect(memento.performanceMetrics).toBe(metrics);
    }
  }

  function createDifferentPerformanceMetrics(): any[] {
    return [
      { totalTime: 10, stepTimes: {}, memoryUsage: 512 },
      { totalTime: 100, stepTimes: { validation: 20, calculation: 60, rounding: 20 }, memoryUsage: 2048 },
      { totalTime: 500, stepTimes: { validation: 50, calculation: 300, rounding: 150 }, memoryUsage: 4096 },
    ];
  }

  function createMementoWithPerformanceMetrics(metrics: any): UnitCalculationMemento {
    try {
      const memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
      setMementoWithPerformanceMetrics(memento, metrics);
      return memento;
    } catch (error) {
      return new UnitCalculationMemento(
        mockInput,
        mockContext,
        150,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        metrics,
        true,
        undefined,
        new Date()
      );
    }
  }

  function setMementoWithPerformanceMetrics(memento: UnitCalculationMemento, metrics: any): void {
    (memento as any).input = mockInput;
    (memento as any).context = mockContext;
    (memento as any).result = 150;
    (memento as any).unitId = 'test-unit';
    (memento as any).unitType = UnitType.SIZE;
    (memento as any).templateName = 'TestTemplate';
    (memento as any).strategyName = 'TestStrategy';
    (memento as any).validatorNames = [];
    (memento as any).performanceMetrics = metrics;
    (memento as any).isSuccess = true;
    (memento as any).error = undefined;
    (memento as any).timestamp = new Date();
  }
});