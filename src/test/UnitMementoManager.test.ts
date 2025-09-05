import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { UnitMementoManager } from '../mementos/UnitMementoManager';
import { UnitCalculationMemento } from '../mementos/UnitCalculationMemento';
import { createMockContext } from './test-utils';
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
    setupTestEnvironment();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create manager with default settings', () => {
      testManagerCreation();
    });

    it('should create manager with custom settings', () => {
      testCustomManagerCreation();
    });

    it('should handle invalid settings gracefully', () => {
      testInvalidSettingsHandling();
    });
  });

  describe('memento management', () => {
    it('should create memento successfully', () => {
      testMementoCreation();
    });

    it('should store memento in manager', () => {
      testMementoStorage();
    });

    it('should retrieve memento by id', () => {
      testMementoRetrieval();
    });

    it('should get all mementos', () => {
      testAllMementosRetrieval();
    });

    it('should clear all mementos', () => {
      testMementosClearing();
    });
  });

  describe('memento operations', () => {
    it('should update memento successfully', () => {
      testMementoUpdate();
    });

    it('should delete memento successfully', () => {
      testMementoDeletion();
    });

    it('should find mementos by criteria', () => {
      testMementoFinding();
    });

    it('should get memento statistics', () => {
      testMementoStatistics();
    });
  });

  describe('error handling', () => {
    it('should handle memento creation errors gracefully', () => {
      testMementoCreationErrorHandling();
    });

    it('should handle memento retrieval errors gracefully', () => {
      testMementoRetrievalErrorHandling();
    });

    it('should handle memento update errors gracefully', () => {
      testMementoUpdateErrorHandling();
    });
  });

  describe('performance', () => {
    it('should perform operations efficiently', () => {
      testOperationEfficiency();
    });

    it('should handle large numbers of mementos', () => {
      testLargeNumberOfMementos();
    });
  });

  describe('integration', () => {
    it('should work with different templates', () => {
      testDifferentTemplates();
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
    initializeManager();
    createMockTemplate();
    createMockInput();
    createMockContext();
    createMockPerformanceMetrics();
  }

  function initializeManager(): void {
    try {
      manager = container.resolve(TOKENS.UNIT_MEMENTO_MANAGER);
    } catch (error) {
      manager = new UnitMementoManager();
    }
  }

  function createMockTemplate(): void {
    mockTemplate = new MockSizeCalculationTemplate();
  }

  function createMockInput(): void {
    mockInput = { value: 100, unit: SizeUnit.PIXEL };
  }

  function createMockContext(): void {
    mockContext = createMockContext();
  }

  function createMockPerformanceMetrics(): void {
    mockPerformanceMetrics = {
      totalTime: 50,
      stepTimes: { validation: 10, calculation: 30, rounding: 10 },
      memoryUsage: 1024,
    };
  }

  function testManagerCreation(): void {
    expect(manager).toBeInstanceOf(UnitMementoManager);
  }

  function testCustomManagerCreation(): void {
    const customManager = createCustomManager();
    
    expect(customManager).toBeInstanceOf(UnitMementoManager);
    expect(customManager.getMementoCount()).toBe(0);
  }

  function createCustomManager(): UnitMementoManager {
    try {
      const manager = container.resolve(TOKENS.UNIT_MEMENTO_MANAGER);
      setCustomManagerProperties(manager);
      return manager;
    } catch (error) {
      return new UnitMementoManager();
    }
  }

  function setCustomManagerProperties(manager: UnitMementoManager): void {
    (manager as any).maxMementos = 100;
    (manager as any).autoCleanup = true;
  }

  function testInvalidSettingsHandling(): void {
    const invalidManager = createInvalidManager();
    
    expect(invalidManager).toBeInstanceOf(UnitMementoManager);
    expect(() => invalidManager.getMementoCount()).not.toThrow();
  }

  function createInvalidManager(): UnitMementoManager {
    try {
      const manager = container.resolve(TOKENS.UNIT_MEMENTO_MANAGER);
      setInvalidManagerProperties(manager);
      return manager;
    } catch (error) {
      return new UnitMementoManager();
    }
  }

  function setInvalidManagerProperties(manager: UnitMementoManager): void {
    (manager as any).maxMementos = -1;
    (manager as any).autoCleanup = null;
  }

  function testMementoCreation(): void {
    const memento = createTestMemento();
    
    expect(memento).toBeInstanceOf(UnitCalculationMemento);
    expect(memento.input).toBe(mockInput);
    expect(memento.context).toBe(mockContext);
  }

  function createTestMemento(): UnitCalculationMemento {
    return new UnitCalculationMemento(
      mockInput,
      mockContext,
      150,
      'test-unit-1',
      'size',
      mockTemplate.name,
      'SizeUnitStrategy',
      ['RangeValidator', 'TypeValidator'],
      mockPerformanceMetrics,
      true,
      undefined,
      new Date()
    );
  }

  function testMementoStorage(): void {
    const memento = createTestMemento();
    
    manager.storeMemento(memento);
    
    expect(manager.getMementoCount()).toBe(1);
    expect(manager.hasMemento(memento.unitId)).toBe(true);
  }

  function testMementoRetrieval(): void {
    const memento = createTestMemento();
    manager.storeMemento(memento);
    
    const retrievedMemento = manager.getMemento(memento.unitId);
    
    expect(retrievedMemento).toBe(memento);
    expect(retrievedMemento.unitId).toBe(memento.unitId);
  }

  function testAllMementosRetrieval(): void {
    const mementos = createMultipleMementos();
    
    mementos.forEach(memento => {
      manager.storeMemento(memento);
    });
    
    const allMementos = manager.getAllMementos();
    
    expect(allMementos.length).toBe(mementos.length);
    expect(allMementos).toEqual(expect.arrayContaining(mementos));
  }

  function createMultipleMementos(): UnitCalculationMemento[] {
    return [
      createTestMemento(),
      createTestMementoWithId('test-unit-2'),
      createTestMementoWithId('test-unit-3'),
    ];
  }

  function createTestMementoWithId(unitId: string): UnitCalculationMemento {
    return new UnitCalculationMemento(
      mockInput,
      mockContext,
      150,
      unitId,
      'size',
      mockTemplate.name,
      'SizeUnitStrategy',
      ['RangeValidator', 'TypeValidator'],
      mockPerformanceMetrics,
      true,
      undefined,
      new Date()
    );
  }

  function testMementosClearing(): void {
    const mementos = createMultipleMementos();
    
    mementos.forEach(memento => {
      manager.storeMemento(memento);
    });
    
    manager.clearMementos();
    
    expect(manager.getMementoCount()).toBe(0);
    expect(manager.getAllMementos()).toEqual([]);
  }

  function testMementoUpdate(): void {
    const memento = createTestMemento();
    manager.storeMemento(memento);
    
    const updatedMemento = createUpdatedMemento(memento.unitId);
    manager.updateMemento(updatedMemento);
    
    const retrievedMemento = manager.getMemento(memento.unitId);
    expect(retrievedMemento.result).toBe(updatedMemento.result);
  }

  function createUpdatedMemento(unitId: string): UnitCalculationMemento {
    return new UnitCalculationMemento(
      mockInput,
      mockContext,
      200, // Updated result
      unitId,
      'size',
      mockTemplate.name,
      'SizeUnitStrategy',
      ['RangeValidator', 'TypeValidator'],
      mockPerformanceMetrics,
      true,
      undefined,
      new Date()
    );
  }

  function testMementoDeletion(): void {
    const memento = createTestMemento();
    manager.storeMemento(memento);
    
    manager.deleteMemento(memento.unitId);
    
    expect(manager.getMementoCount()).toBe(0);
    expect(manager.hasMemento(memento.unitId)).toBe(false);
  }

  function testMementoFinding(): void {
    const mementos = createMultipleMementos();
    
    mementos.forEach(memento => {
      manager.storeMemento(memento);
    });
    
    const foundMementos = manager.findMementosByCriteria({ unitType: 'size' });
    
    expect(foundMementos.length).toBeGreaterThan(0);
    foundMementos.forEach(memento => {
      expect(memento.unitType).toBe('size');
    });
  }

  function testMementoStatistics(): void {
    const mementos = createMultipleMementos();
    
    mementos.forEach(memento => {
      manager.storeMemento(memento);
    });
    
    const statistics = manager.getStatistics();
    
    expect(statistics.totalMementos).toBe(mementos.length);
    expect(statistics.successfulCalculations).toBeGreaterThanOrEqual(0);
    expect(statistics.failedCalculations).toBeGreaterThanOrEqual(0);
  }

  function testMementoCreationErrorHandling(): void {
    const invalidMemento = createInvalidMemento();
    
    expect(() => manager.storeMemento(invalidMemento)).not.toThrow();
  }

  function createInvalidMemento(): UnitCalculationMemento {
    return new UnitCalculationMemento(
      null,
      null,
      0,
      '',
      '',
      '',
      '',
      [],
      {},
      false,
      new Error('Test error'),
      new Date()
    );
  }

  function testMementoRetrievalErrorHandling(): void {
    const nonExistentId = 'non-existent-id';
    
    expect(() => manager.getMemento(nonExistentId)).not.toThrow();
    expect(manager.getMemento(nonExistentId)).toBeUndefined();
  }

  function testMementoUpdateErrorHandling(): void {
    const nonExistentMemento = createTestMementoWithId('non-existent-id');
    
    expect(() => manager.updateMemento(nonExistentMemento)).not.toThrow();
  }

  function testOperationEfficiency(): void {
    const mementos = createMultipleMementos();
    const startTime = performance.now();
    
    mementos.forEach(memento => {
      manager.storeMemento(memento);
    });
    
    for (let i = 0; i < 1000; i++) {
      manager.getAllMementos();
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testLargeNumberOfMementos(): void {
    const mementos = createLargeNumberOfMementos();
    
    mementos.forEach(memento => {
      manager.storeMemento(memento);
    });
    
    expect(manager.getMementoCount()).toBe(mementos.length);
    expect(manager.getAllMementos().length).toBe(mementos.length);
  }

  function createLargeNumberOfMementos(): UnitCalculationMemento[] {
    const mementos = [];
    for (let i = 0; i < 100; i++) {
      mementos.push(createTestMementoWithId(`test-unit-${i}`));
    }
    return mementos;
  }

  function testDifferentTemplates(): void {
    const templates = createDifferentTemplates();
    
    for (const template of templates) {
      const memento = createMementoWithTemplate(template);
      manager.storeMemento(memento);
      
      expect(manager.getMementoCount()).toBeGreaterThan(0);
    }
  }

  function createDifferentTemplates(): any[] {
    return [
      { name: 'SizeCalculationTemplate' },
      { name: 'PositionCalculationTemplate' },
      { name: 'ScaleCalculationTemplate' },
    ];
  }

  function createMementoWithTemplate(template: any): UnitCalculationMemento {
    return new UnitCalculationMemento(
      mockInput,
      mockContext,
      150,
      'test-unit',
      'size',
      template.name,
      'TestStrategy',
      [],
      mockPerformanceMetrics,
      true,
      undefined,
      new Date()
    );
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const memento = createMementoWithContext(context);
      manager.storeMemento(memento);
      
      expect(manager.getMementoCount()).toBeGreaterThan(0);
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
    return new UnitCalculationMemento(
      mockInput,
      context,
      150,
      'test-unit',
      'size',
      mockTemplate.name,
      'TestStrategy',
      [],
      mockPerformanceMetrics,
      true,
      undefined,
      new Date()
    );
  }

  function testDifferentPerformanceMetrics(): void {
    const performanceMetrics = createDifferentPerformanceMetrics();
    
    for (const metrics of performanceMetrics) {
      const memento = createMementoWithPerformanceMetrics(metrics);
      manager.storeMemento(memento);
      
      expect(manager.getMementoCount()).toBeGreaterThan(0);
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
    return new UnitCalculationMemento(
      mockInput,
      mockContext,
      150,
      'test-unit',
      'size',
      mockTemplate.name,
      'TestStrategy',
      [],
      metrics,
      true,
      undefined,
      new Date()
    );
  }
});