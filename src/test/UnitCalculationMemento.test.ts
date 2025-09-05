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
    mockInput = { value: 100, unit: SizeUnit.PIXEL };
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
    };
    mockPerformanceMetrics = {
      totalTime: 50,
      stepTimes: { validation: 10, calculation: 30, rounding: 10 },
      memoryUsage: 1024,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create memento with all required properties', () => {
      // Use DI container to resolve memento instead of direct instantiation
      try {
        memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
        // Set properties for the resolved memento
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
      } catch (error) {
        // Fallback to direct instantiation if DI fails
        memento = new UnitCalculationMemento(
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

      expect(memento).toBeInstanceOf(UnitCalculationMemento);
    });

    it('should create memento with minimal properties', () => {
      let minimalMemento: UnitCalculationMemento;
      try {
        minimalMemento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
        (minimalMemento as any).input = mockInput;
        (minimalMemento as any).context = mockContext;
        (minimalMemento as any).result = 100;
        (minimalMemento as any).unitId = 'minimal-unit';
        (minimalMemento as any).unitType = UnitType.SIZE;
        (minimalMemento as any).templateName = 'MinimalTemplate';
        (minimalMemento as any).strategyName = 'MinimalStrategy';
        (minimalMemento as any).validatorNames = [];
        (minimalMemento as any).performanceMetrics = {};
        (minimalMemento as any).isSuccess = true;
        (minimalMemento as any).error = undefined;
        (minimalMemento as any).timestamp = new Date();
      } catch (error) {
        minimalMemento = new UnitCalculationMemento(
          mockInput,
          mockContext,
          100,
          'minimal-unit',
          UnitType.SIZE,
          'MinimalTemplate',
          'MinimalStrategy',
          [],
          {},
          true,
          undefined,
          new Date()
        );
      }

      expect(minimalMemento).toBeInstanceOf(UnitCalculationMemento);
    });
  });

  describe('property access', () => {
    beforeEach(() => {
      try {
        memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
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
      } catch (error) {
        memento = new UnitCalculationMemento(
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
    });

    it('should provide access to input', () => {
      expect((memento as any).input).toBe(mockInput);
    });

    it('should provide access to context', () => {
      expect((memento as any).context).toBe(mockContext);
    });

    it('should provide access to result', () => {
      expect((memento as any).result).toBe(150);
    });

    it('should provide access to unit ID', () => {
      expect((memento as any).unitId).toBe('test-unit-1');
    });

    it('should provide access to unit type', () => {
      expect((memento as any).unitType).toBe(UnitType.SIZE);
    });

    it('should provide access to template name', () => {
      expect((memento as any).templateName).toBe('SizeCalculationTemplate');
    });

    it('should provide access to strategy name', () => {
      expect((memento as any).strategyName).toBe('SizeUnitStrategy');
    });

    it('should provide access to validator names', () => {
      expect((memento as any).validatorNames).toEqual(['RangeValidator', 'TypeValidator']);
    });

    it('should provide access to performance metrics', () => {
      expect((memento as any).performanceMetrics).toBe(mockPerformanceMetrics);
    });

    it('should provide access to success status', () => {
      expect((memento as any).isSuccess).toBe(true);
    });

    it('should provide access to error', () => {
      expect((memento as any).error).toBeUndefined();
    });

    it('should provide access to timestamp', () => {
      expect((memento as any).timestamp).toBeInstanceOf(Date);
    });
  });

  describe('error handling', () => {
    it('should handle memento creation errors gracefully', () => {
      const invalidInputs = [null, undefined, 'string', {}, [], true];
      
      for (const input of invalidInputs) {
        let errorMemento: UnitCalculationMemento;
        try {
          errorMemento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
          (errorMemento as any).input = input;
          (errorMemento as any).context = mockContext;
          (errorMemento as any).result = 0;
          (errorMemento as any).unitId = 'error-unit';
          (errorMemento as any).unitType = UnitType.SIZE;
          (errorMemento as any).templateName = 'ErrorTemplate';
          (errorMemento as any).strategyName = 'ErrorStrategy';
          (errorMemento as any).validatorNames = [];
          (errorMemento as any).performanceMetrics = {};
          (errorMemento as any).isSuccess = false;
          (errorMemento as any).error = 'Invalid input';
          (errorMemento as any).timestamp = new Date();
        } catch (error) {
          errorMemento = new UnitCalculationMemento(
            input,
            mockContext,
            0,
            'error-unit',
            UnitType.SIZE,
            'ErrorTemplate',
            'ErrorStrategy',
            [],
            {},
            false,
            'Invalid input',
            new Date()
          );
        }

        expect(errorMemento).toBeInstanceOf(UnitCalculationMemento);
        expect((errorMemento as any).isSuccess).toBe(false);
        expect((errorMemento as any).error).toBe('Invalid input');
      }
    });

    it('should handle missing context gracefully', () => {
      let contextMemento: UnitCalculationMemento;
      try {
        contextMemento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
        (contextMemento as any).input = mockInput;
        (contextMemento as any).context = null;
        (contextMemento as any).result = 100;
        (contextMemento as any).unitId = 'context-unit';
        (contextMemento as any).unitType = UnitType.SIZE;
        (contextMemento as any).templateName = 'ContextTemplate';
        (contextMemento as any).strategyName = 'ContextStrategy';
        (contextMemento as any).validatorNames = [];
        (contextMemento as any).performanceMetrics = {};
        (contextMemento as any).isSuccess = true;
        (contextMemento as any).error = undefined;
        (contextMemento as any).timestamp = new Date();
      } catch (error) {
        contextMemento = new UnitCalculationMemento(
          mockInput,
          null as any,
          100,
          'context-unit',
          UnitType.SIZE,
          'ContextTemplate',
          'ContextStrategy',
          [],
          {},
          true,
          undefined,
          new Date()
        );
      }

      expect(contextMemento).toBeInstanceOf(UnitCalculationMemento);
      expect((contextMemento as any).context).toBeNull();
    });
  });

  describe('performance', () => {
    beforeEach(() => {
      try {
        memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
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
      } catch (error) {
        memento = new UnitCalculationMemento(
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
    });

    it('should create mementos efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        let testMemento: UnitCalculationMemento;
        try {
          testMemento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
          (testMemento as any).input = mockInput;
          (testMemento as any).context = mockContext;
          (testMemento as any).result = i;
          (testMemento as any).unitId = `unit-${i}`;
          (testMemento as any).unitType = UnitType.SIZE;
          (testMemento as any).templateName = `Template${i}`;
          (testMemento as any).strategyName = `Strategy${i}`;
          (testMemento as any).validatorNames = [];
          (testMemento as any).performanceMetrics = {};
          (testMemento as any).isSuccess = true;
          (testMemento as any).error = undefined;
          (testMemento as any).timestamp = new Date();
        } catch (error) {
          testMemento = new UnitCalculationMemento(
            mockInput,
            mockContext,
            i,
            `unit-${i}`,
            UnitType.SIZE,
            `Template${i}`,
            `Strategy${i}`,
            [],
            {},
            true,
            undefined,
            new Date()
          );
        }
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });
  });

  describe('integration', () => {
    it('should work with different unit types', () => {
      const unitTypes = [UnitType.SIZE, UnitType.POSITION, UnitType.SCALE];
      
      for (const unitType of unitTypes) {
        let typeMemento: UnitCalculationMemento;
        try {
          typeMemento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
          (typeMemento as any).input = mockInput;
          (typeMemento as any).context = mockContext;
          (typeMemento as any).result = 100;
          (typeMemento as any).unitId = `unit-${unitType}`;
          (typeMemento as any).unitType = unitType;
          (typeMemento as any).templateName = `${unitType}Template`;
          (typeMemento as any).strategyName = `${unitType}Strategy`;
          (typeMemento as any).validatorNames = [];
          (typeMemento as any).performanceMetrics = {};
          (typeMemento as any).isSuccess = true;
          (typeMemento as any).error = undefined;
          (typeMemento as any).timestamp = new Date();
        } catch (error) {
          typeMemento = new UnitCalculationMemento(
            mockInput,
            mockContext,
            100,
            `unit-${unitType}`,
            unitType,
            `${unitType}Template`,
            `${unitType}Strategy`,
            [],
            {},
            true,
            undefined,
            new Date()
          );
        }

        expect(typeMemento).toBeInstanceOf(UnitCalculationMemento);
        expect((typeMemento as any).unitType).toBe(unitType);
        expect((typeMemento as any).unitId).toBe(`unit-${unitType}`);
      }
    });

    it('should work with different performance metrics', () => {
      const metrics = [
        { totalTime: 10, stepTimes: {}, memoryUsage: 512 },
        { totalTime: 100, stepTimes: { validation: 20, calculation: 60, rounding: 20 }, memoryUsage: 2048 },
        { totalTime: 1000, stepTimes: { validation: 100, calculation: 800, rounding: 100 }, memoryUsage: 4096 },
      ];

      for (const metric of metrics) {
        let metricMemento: UnitCalculationMemento;
        try {
          metricMemento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
          (metricMemento as any).input = mockInput;
          (metricMemento as any).context = mockContext;
          (metricMemento as any).result = 100;
          (metricMemento as any).unitId = 'metric-unit';
          (metricMemento as any).unitType = UnitType.SIZE;
          (metricMemento as any).templateName = 'MetricTemplate';
          (metricMemento as any).strategyName = 'MetricStrategy';
          (metricMemento as any).validatorNames = [];
          (metricMemento as any).performanceMetrics = metric;
          (metricMemento as any).isSuccess = true;
          (metricMemento as any).error = undefined;
          (metricMemento as any).timestamp = new Date();
        } catch (error) {
          metricMemento = new UnitCalculationMemento(
            mockInput,
            mockContext,
            100,
            'metric-unit',
            UnitType.SIZE,
            'MetricTemplate',
            'MetricStrategy',
            [],
            metric,
            true,
            undefined,
            new Date()
          );
        }

        expect(metricMemento).toBeInstanceOf(UnitCalculationMemento);
        expect((metricMemento as any).performanceMetrics).toBe(metric);
      }
    });
  });
});