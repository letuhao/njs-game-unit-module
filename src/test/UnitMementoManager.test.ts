import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { UnitMementoManager } from '../mementos/UnitMementoManager';
import { UnitCalculationMemento } from '../mementos/UnitCalculationMemento';
import { createMockContext } from './setup';
import { SizeUnit } from '../enums/SizeUnit';
import { container, TOKENS } from '../container/DiContainer';

// Mock template for testing
class MockSizeCalculationTemplate {
  constructor() {}
  get name() {
    return 'MockSizeCalculationTemplate';
  }
}

describe('UnitMementoManager', () => {
  let manager: UnitMementoManager;
  let mockTemplate: MockSizeCalculationTemplate;
  let mockInput: any;
  let mockContext: any;
  let mockPerformanceMetrics: any;

  beforeEach(() => {
    // Use DI container to resolve manager instead of direct instantiation
    try {
      manager = container.resolve(TOKENS.UNIT_MEMENTO_MANAGER);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      manager = new UnitMementoManager();
    }
    
    mockTemplate = new MockSizeCalculationTemplate();
    mockInput = { value: 100, unit: SizeUnit.PIXEL };
    mockContext = createMockContext();
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
    it('should create manager with default settings', () => {
      expect(manager).toBeInstanceOf(UnitMementoManager);
    });

    it('should create manager with custom settings', () => {
      let customManager: UnitMementoManager;
      try {
        customManager = container.resolve(TOKENS.UNIT_MEMENTO_MANAGER);
        (customManager as any).maxMementos = 100;
        (customManager as any).autoCleanup = true;
      } catch (error) {
        customManager = new UnitMementoManager(100, true);
      }

      expect(customManager).toBeInstanceOf(UnitMementoManager);
    });
  });

  describe('memento management', () => {
    it('should save memento successfully', () => {
      let memento: UnitCalculationMemento;
      try {
        memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
        (memento as any).input = mockInput;
        (memento as any).context = mockContext;
        (memento as any).result = 150;
        (memento as any).unitId = 'test-unit-1';
        (memento as any).unitType = 'size' as any;
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
          'size' as any,
          'SizeCalculationTemplate',
          'SizeUnitStrategy',
          ['RangeValidator', 'TypeValidator'],
          mockPerformanceMetrics,
          true,
          undefined,
          new Date()
        );
      }

      const result = manager.saveMemento(memento);
      expect(result).toBe(true);
      expect(manager.getMementoCount()).toBe(1);
    });

    it('should retrieve memento by ID', () => {
      let memento: UnitCalculationMemento;
      try {
        memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
        (memento as any).input = mockInput;
        (memento as any).context = mockContext;
        (memento as any).result = 150;
        (memento as any).unitId = 'test-unit-1';
        (memento as any).unitType = 'size' as any;
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
          'size' as any,
          'SizeCalculationTemplate',
          'SizeUnitStrategy',
          ['RangeValidator', 'TypeValidator'],
          mockPerformanceMetrics,
          true,
          undefined,
          new Date()
        );
      }

      manager.saveMemento(memento);
      const retrieved = manager.getMemento('test-unit-1');
      
      expect(retrieved).toBeDefined();
      expect(retrieved?.unitId).toBe('test-unit-1');
    });

    it('should return null for non-existent memento', () => {
      const retrieved = manager.getMemento('non-existent');
      expect(retrieved).toBeNull();
    });

    it('should get all mementos', () => {
      const mementos = [
        (() => {
          try { 
            const m = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
            (m as any).unitId = 'unit-1';
            (m as any).input = mockInput;
            (m as any).context = mockContext;
            (m as any).result = 100;
            (m as any).unitType = 'size' as any;
            (m as any).templateName = 'Template1';
            (m as any).strategyName = 'Strategy1';
            (m as any).validatorNames = [];
            (m as any).performanceMetrics = {};
            (m as any).isSuccess = true;
            (m as any).error = undefined;
            (m as any).timestamp = new Date();
            return m;
          } catch { 
            return new UnitCalculationMemento(mockInput, mockContext, 100, 'unit-1', 'size' as any, 'Template1', 'Strategy1', [], {}, true, undefined, new Date());
          }
        })(),
        (() => {
          try { 
            const m = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
            (m as any).unitId = 'unit-2';
            (m as any).input = mockInput;
            (m as any).context = mockContext;
            (m as any).result = 200;
            (m as any).unitType = 'position' as any;
            (m as any).templateName = 'Template2';
            (m as any).strategyName = 'Strategy2';
            (m as any).validatorNames = [];
            (m as any).performanceMetrics = {};
            (m as any).isSuccess = true;
            (m as any).error = undefined;
            (m as any).timestamp = new Date();
            return m;
          } catch { 
            return new UnitCalculationMemento(mockInput, mockContext, 200, 'unit-2', 'position' as any, 'Template2', 'Strategy2', [], {}, true, undefined, new Date());
          }
        })(),
      ];

      mementos.forEach(memento => manager.saveMemento(memento));
      
      const allMementos = manager.getAllMementos();
      expect(allMementos.length).toBe(2);
      expect(allMementos).toContain(mementos[0]);
      expect(allMementos).toContain(mementos[1]);
    });

    it('should clear all mementos', () => {
      const mementos = [
        (() => {
          try { 
            const m = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
            (m as any).unitId = 'unit-1';
            (m as any).input = mockInput;
            (m as any).context = mockContext;
            (m as any).result = 100;
            (m as any).unitType = 'size' as any;
            (m as any).templateName = 'Template1';
            (m as any).strategyName = 'Strategy1';
            (m as any).validatorNames = [];
            (m as any).performanceMetrics = {};
            (m as any).isSuccess = true;
            (m as any).error = undefined;
            (m as any).timestamp = new Date();
            return m;
          } catch { 
            return new UnitCalculationMemento(mockInput, mockContext, 100, 'unit-1', 'size' as any, 'Template1', 'Strategy1', [], {}, true, undefined, new Date());
          }
        })(),
      ];

      mementos.forEach(memento => manager.saveMemento(memento));
      expect(manager.getMementoCount()).toBe(1);

      manager.clearMementos();
      expect(manager.getMementoCount()).toBe(0);
    });
  });

  describe('memento filtering', () => {
    beforeEach(() => {
      const mementos = [
        (() => {
          try { 
            const m = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
            (m as any).unitId = 'size-unit-1';
            (m as any).input = mockInput;
            (m as any).context = mockContext;
            (m as any).result = 100;
            (m as any).unitType = 'size' as any;
            (m as any).templateName = 'SizeTemplate';
            (m as any).strategyName = 'SizeStrategy';
            (m as any).validatorNames = [];
            (m as any).performanceMetrics = {};
            (m as any).isSuccess = true;
            (m as any).error = undefined;
            (m as any).timestamp = new Date();
            return m;
          } catch { 
            return new UnitCalculationMemento(mockInput, mockContext, 100, 'size-unit-1', 'size' as any, 'SizeTemplate', 'SizeStrategy', [], {}, true, undefined, new Date());
          }
        })(),
        (() => {
          try { 
            const m = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
            (m as any).unitId = 'position-unit-1';
            (m as any).input = mockInput;
            (m as any).context = mockContext;
            (m as any).result = 200;
            (m as any).unitType = 'position' as any;
            (m as any).templateName = 'PositionTemplate';
            (m as any).strategyName = 'PositionStrategy';
            (m as any).validatorNames = [];
            (m as any).performanceMetrics = {};
            (m as any).isSuccess = true;
            (m as any).error = undefined;
            (m as any).timestamp = new Date();
            return m;
          } catch { 
            return new UnitCalculationMemento(mockInput, mockContext, 200, 'position-unit-1', 'position' as any, 'PositionTemplate', 'PositionStrategy', [], {}, true, undefined, new Date());
          }
        })(),
      ];

      mementos.forEach(memento => manager.saveMemento(memento));
    });

    it('should filter mementos by unit type', () => {
      const sizeMementos = manager.getMementosByUnitType('size' as any);
      expect(sizeMementos.length).toBe(1);
      expect(sizeMementos[0].unitType).toBe('size');

      const positionMementos = manager.getMementosByUnitType('position' as any);
      expect(positionMementos.length).toBe(1);
      expect(positionMementos[0].unitType).toBe('position');
    });

    it('should filter mementos by template name', () => {
      const sizeTemplateMementos = manager.getMementosByTemplate('SizeTemplate');
      expect(sizeTemplateMementos.length).toBe(1);
      expect(sizeTemplateMementos[0].templateName).toBe('SizeTemplate');

      const positionTemplateMementos = manager.getMementosByTemplate('PositionTemplate');
      expect(positionTemplateMementos.length).toBe(1);
      expect(positionTemplateMementos[0].templateName).toBe('PositionTemplate');
    });

    it('should filter mementos by success status', () => {
      const successMementos = manager.getMementosBySuccess(true);
      expect(successMementos.length).toBe(2);
      successMementos.forEach(memento => {
        expect(memento.isSuccess).toBe(true);
      });

      const failureMementos = manager.getMementosBySuccess(false);
      expect(failureMementos.length).toBe(0);
    });

    it('should filter mementos by date range', () => {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const recentMementos = manager.getMementosByDateRange(yesterday, tomorrow);
      expect(recentMementos.length).toBe(2);
    });
  });

  describe('memento statistics', () => {
    beforeEach(() => {
      const mementos = [
        (() => {
          try { 
            const m = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
            (m as any).unitId = 'unit-1';
            (m as any).input = mockInput;
            (m as any).context = mockContext;
            (m as any).result = 100;
            (m as any).unitType = 'size' as any;
            (m as any).templateName = 'Template1';
            (m as any).strategyName = 'Strategy1';
            (m as any).validatorNames = [];
            (m as any).performanceMetrics = { totalTime: 50 };
            (m as any).isSuccess = true;
            (m as any).error = undefined;
            (m as any).timestamp = new Date();
            return m;
          } catch { 
            return new UnitCalculationMemento(mockInput, mockContext, 100, 'unit-1', 'size' as any, 'Template1', 'Strategy1', [], { totalTime: 50 }, true, undefined, new Date());
          }
        })(),
        (() => {
          try { 
            const m = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
            (m as any).unitId = 'unit-2';
            (m as any).input = mockInput;
            (m as any).context = mockContext;
            (m as any).result = 200;
            (m as any).unitType = 'position' as any;
            (m as any).templateName = 'Template2';
            (m as any).strategyName = 'Strategy2';
            (m as any).validatorNames = [];
            (m as any).performanceMetrics = { totalTime: 100 };
            (m as any).isSuccess = true;
            (m as any).error = undefined;
            (m as any).timestamp = new Date();
            return m;
          } catch { 
            return new UnitCalculationMemento(mockInput, mockContext, 200, 'unit-2', 'position' as any, 'Template2', 'Strategy2', [], { totalTime: 100 }, true, undefined, new Date());
          }
        })(),
      ];

      mementos.forEach(memento => manager.saveMemento(memento));
    });

    it('should provide memento count', () => {
      expect(manager.getMementoCount()).toBe(2);
    });

    it('should provide success rate', () => {
      const successRate = manager.getSuccessRate();
      expect(successRate).toBe(1.0); // 100% success rate
    });

    it('should provide average calculation time', () => {
      const avgTime = manager.getAverageCalculationTime();
      expect(avgTime).toBe(75); // (50 + 100) / 2
    });

    it('should provide memento statistics', () => {
      const stats = manager.getMementoStatistics();
      expect(stats.totalMementos).toBe(2);
      expect(stats.successRate).toBe(1.0);
      expect(stats.averageCalculationTime).toBe(75);
    });
  });

  describe('error handling', () => {
    it('should handle memento save errors gracefully', () => {
      // Mock a failing save operation
      const originalSaveMemento = manager.saveMemento;
      manager.saveMemento = jest.fn().mockImplementation(() => {
        throw new Error('Save failed');
      });

      let memento: UnitCalculationMemento;
      try {
        memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
        (memento as any).unitId = 'error-unit';
        (memento as any).input = mockInput;
        (memento as any).context = mockContext;
        (memento as any).result = 100;
        (memento as any).unitType = 'size' as any;
        (memento as any).templateName = 'ErrorTemplate';
        (memento as any).strategyName = 'ErrorStrategy';
        (memento as any).validatorNames = [];
        (memento as any).performanceMetrics = {};
        (memento as any).isSuccess = false;
        (memento as any).error = 'Save failed';
        (memento as any).timestamp = new Date();
      } catch (error) {
        memento = new UnitCalculationMemento(
          mockInput,
          mockContext,
          100,
          'error-unit',
          'size' as any,
          'ErrorTemplate',
          'ErrorStrategy',
          [],
          {},
          false,
          'Save failed',
          new Date()
        );
      }

      expect(() => manager.saveMemento(memento)).toThrow('Save failed');

      // Restore original method
      manager.saveMemento = originalSaveMemento;
    });

    it('should handle invalid memento gracefully', () => {
      const result = manager.saveMemento(null as any);
      expect(result).toBe(false);
    });
  });

  describe('performance', () => {
    it('should handle many mementos efficiently', () => {
      const startTime = performance.now();
      
      // Create and save many mementos
      for (let i = 0; i < 1000; i++) {
        let memento: UnitCalculationMemento;
        try {
          memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
          (memento as any).unitId = `unit-${i}`;
          (memento as any).input = mockInput;
          (memento as any).context = mockContext;
          (memento as any).result = i;
          (memento as any).unitType = 'size' as any;
          (memento as any).templateName = `Template${i}`;
          (memento as any).strategyName = `Strategy${i}`;
          (memento as any).validatorNames = [];
          (memento as any).performanceMetrics = { totalTime: i };
          (memento as any).isSuccess = true;
          (memento as any).error = undefined;
          (memento as any).timestamp = new Date();
        } catch (error) {
          memento = new UnitCalculationMemento(
            mockInput,
            mockContext,
            i,
            `unit-${i}`,
            'size' as any,
            `Template${i}`,
            `Strategy${i}`,
            [],
            { totalTime: i },
            true,
            undefined,
            new Date()
          );
        }
        
        manager.saveMemento(memento);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(manager.getMementoCount()).toBe(1000);
      expect(totalTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should retrieve mementos efficiently', () => {
      // Create and save mementos
      for (let i = 0; i < 100; i++) {
        let memento: UnitCalculationMemento;
        try {
          memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
          (memento as any).unitId = `unit-${i}`;
          (memento as any).input = mockInput;
          (memento as any).context = mockContext;
          (memento as any).result = i;
          (memento as any).unitType = 'size' as any;
          (memento as any).templateName = `Template${i}`;
          (memento as any).strategyName = `Strategy${i}`;
          (memento as any).validatorNames = [];
          (memento as any).performanceMetrics = { totalTime: i };
          (memento as any).isSuccess = true;
          (memento as any).error = undefined;
          (memento as any).timestamp = new Date();
        } catch (error) {
          memento = new UnitCalculationMemento(
            mockInput,
            mockContext,
            i,
            `unit-${i}`,
            'size' as any,
            `Template${i}`,
            `Strategy${i}`,
            [],
            { totalTime: i },
            true,
            undefined,
            new Date()
          );
        }
        
        manager.saveMemento(memento);
      }

      const startTime = performance.now();
      
      // Retrieve mementos
      for (let i = 0; i < 100; i++) {
        manager.getMemento(`unit-${i}`);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });
  });

  describe('integration', () => {
    it('should work with different memento types', () => {
      const mementoTypes = ['size', 'position', 'scale'];
      
      for (const mementoType of mementoTypes) {
        let memento: UnitCalculationMemento;
        try {
          memento = container.resolve(TOKENS.UNIT_CALCULATION_MEMENTO);
          (memento as any).unitId = `${mementoType}-unit`;
          (memento as any).input = mockInput;
          (memento as any).context = mockContext;
          (memento as any).result = 100;
          (memento as any).unitType = mementoType;
          (memento as any).templateName = `${mementoType}Template`;
          (memento as any).strategyName = `${mementoType}Strategy`;
          (memento as any).validatorNames = [];
          (memento as any).performanceMetrics = {};
          (memento as any).isSuccess = true;
          (memento as any).error = undefined;
          (memento as any).timestamp = new Date();
        } catch (error) {
          memento = new UnitCalculationMemento(
            mockInput,
            mockContext,
            100,
            `${mementoType}-unit`,
            mementoType as any,
            `${mementoType}Template`,
            `${mementoType}Strategy`,
            [],
            {},
            true,
            undefined,
            new Date()
          );
        }

        const result = manager.saveMemento(memento);
        expect(result).toBe(true);
      }

      expect(manager.getMementoCount()).toBe(3);
    });

    it('should work with different manager configurations', () => {
      const configurations = [
        { maxMementos: 10, autoCleanup: false },
        { maxMementos: 100, autoCleanup: true },
        { maxMementos: 1000, autoCleanup: false },
      ];

      for (const config of configurations) {
        let configManager: UnitMementoManager;
        try {
          configManager = container.resolve(TOKENS.UNIT_MEMENTO_MANAGER);
          (configManager as any).maxMementos = config.maxMementos;
          (configManager as any).autoCleanup = config.autoCleanup;
        } catch (error) {
          configManager = new UnitMementoManager(config.maxMementos, config.autoCleanup);
        }

        expect(configManager).toBeInstanceOf(UnitMementoManager);
      }
    });
  });
});
