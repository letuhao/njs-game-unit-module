import { UnitSystemManager } from '../managers/UnitSystemManager';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import {
  UnitConfigFactory,
  ISizeUnitConfig,
  IPositionUnitConfig,
  IScaleUnitConfig,
} from '../interfaces/IUnitConfig';
import { container, TOKENS } from '../container/DiContainer';

// Create factory instance
const configFactory = new UnitConfigFactory();

// Helper functions for testing
function createPositionUnitConfig(
  id: string,
  name: string,
  value: PositionValue,
  options: any
): IPositionUnitConfig {
  return configFactory.createPositionUnitConfig(id, name, value, options);
}

function createScaleUnitConfig(
  id: string,
  name: string,
  value: ScaleValue,
  options: any
): IScaleUnitConfig {
  return configFactory.createScaleUnitConfig(id, name, value, options);
}

/**
 * Basic Unit Test for UnitSystemManager
 * Tests the core functionality of unit creation and management
 */

describe('UnitSystemManager', () => {
  let manager: UnitSystemManager;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    manager.shutdown();
  });

  describe('Unit Creation', () => {
    it('should create a size unit successfully', () => {
      testSizeUnitCreation();
    });

    it('should create a position unit successfully', () => {
      testPositionUnitCreation();
    });

    it('should create a scale unit successfully', () => {
      testScaleUnitCreation();
    });

    it('should handle invalid unit creation', () => {
      testInvalidUnitCreation();
    });
  });

  describe('Unit Management', () => {
    it('should get unit by id', () => {
      testUnitRetrievalById();
    });

    it('should get all units', () => {
      testAllUnitsRetrieval();
    });

    it('should update unit successfully', () => {
      testUnitUpdate();
    });

    it('should delete unit successfully', () => {
      testUnitDeletion();
    });
  });

  describe('Unit Operations', () => {
    it('should calculate unit values', () => {
      testUnitCalculation();
    });

    it('should validate units', () => {
      testUnitValidation();
    });

    it('should handle unit errors gracefully', () => {
      testUnitErrorHandling();
    });
  });

  describe('System Management', () => {
    it('should initialize system successfully', () => {
      testSystemInitialization();
    });

    it('should shutdown system successfully', () => {
      testSystemShutdown();
    });

    it('should get system status', () => {
      testSystemStatusRetrieval();
    });
  });

  describe('Performance', () => {
    it('should perform operations efficiently', () => {
      testOperationEfficiency();
    });

    it('should handle multiple units', () => {
      testMultipleUnitsHandling();
    });
  });

  describe('Integration', () => {
    it('should work with different unit types', () => {
      testDifferentUnitTypes();
    });

    it('should work with different configurations', () => {
      testDifferentConfigurations();
    });

    it('should work with different contexts', () => {
      testDifferentContexts();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    initializeManager();
    initializeSystem();
  }

  function initializeManager(): void {
    try {
      manager = container.resolve(TOKENS.UNIT_SYSTEM_MANAGER);
    } catch (error) {
      manager = new UnitSystemManager();
    }
  }

  function initializeSystem(): void {
    manager.initialize();
  }

  function testSizeUnitCreation(): void {
    const config = createSizeUnitConfiguration();
    const result = manager.createUnit(config);
    
    verifyUnitCreationResult(result);
  }

  function createSizeUnitConfiguration(): any {
    return configFactory.createSizeUnitConfig('test-size-unit', 'Test Size Unit', SizeValue.FILL, {
      sizeUnit: SizeUnit.FILL,
      dimension: Dimension.WIDTH,
    });
  }

  function verifyUnitCreationResult(result: any): void {
    expect(result.success).toBe(true);
    expect(result.unit).toBeDefined();
    expect(result.unit.id).toBe('test-size-unit');
    expect(result.unit.name).toBe('Test Size Unit');
  }

  function testPositionUnitCreation(): void {
    const config = createPositionUnitConfiguration();
    const result = manager.createUnit(config);
    
    verifyUnitCreationResult(result);
  }

  function createPositionUnitConfiguration(): any {
    return createPositionUnitConfig('test-position-unit', 'Test Position Unit', PositionValue.PIXEL, {
      positionUnit: PositionUnit.PIXEL,
      dimension: Dimension.X,
      baseValue: 50,
    });
  }

  function testScaleUnitCreation(): void {
    const config = createScaleUnitConfiguration();
    const result = manager.createUnit(config);
    
    verifyUnitCreationResult(result);
  }

  function createScaleUnitConfiguration(): any {
    return createScaleUnitConfig('test-scale-unit', 'Test Scale Unit', ScaleValue.FACTOR, {
      scaleUnit: ScaleUnit.FACTOR,
      baseValue: 1.5,
      maintainAspectRatio: true,
    });
  }

  function testInvalidUnitCreation(): void {
    const invalidConfig = createInvalidUnitConfiguration();
    const result = manager.createUnit(invalidConfig);
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  }

  function createInvalidUnitConfiguration(): any {
    return {
      id: '',
      name: '',
      unitType: 'invalid',
      value: null,
      config: {},
    };
  }

  function testUnitRetrievalById(): void {
    const config = createSizeUnitConfiguration();
    const createResult = manager.createUnit(config);
    
    const retrievedUnit = manager.getUnit(createResult.unit.id);
    
    expect(retrievedUnit).toBeDefined();
    expect(retrievedUnit.id).toBe(createResult.unit.id);
  }

  function testAllUnitsRetrieval(): void {
    const configs = createMultipleUnitConfigurations();
    
    configs.forEach(config => {
      manager.createUnit(config);
    });
    
    const allUnits = manager.getAllUnits();
    
    expect(allUnits.length).toBe(configs.length);
    expect(Array.isArray(allUnits)).toBe(true);
  }

  function createMultipleUnitConfigurations(): any[] {
    return [
      createSizeUnitConfiguration(),
      createPositionUnitConfiguration(),
      createScaleUnitConfiguration(),
    ];
  }

  function testUnitUpdate(): void {
    const config = createSizeUnitConfiguration();
    const createResult = manager.createUnit(config);
    
    const updateConfig = createUnitUpdateConfiguration();
    const updateResult = manager.updateUnit(createResult.unit.id, updateConfig);
    
    expect(updateResult.success).toBe(true);
    expect(updateResult.unit).toBeDefined();
  }

  function createUnitUpdateConfiguration(): any {
    return {
      name: 'Updated Test Unit',
      config: {
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.HEIGHT,
        baseValue: 200,
      },
    };
  }

  function testUnitDeletion(): void {
    const config = createSizeUnitConfiguration();
    const createResult = manager.createUnit(config);
    
    const deleteResult = manager.deleteUnit(createResult.unit.id);
    
    expect(deleteResult.success).toBe(true);
    expect(manager.getUnit(createResult.unit.id)).toBeUndefined();
  }

  function testUnitCalculation(): void {
    const config = createSizeUnitConfiguration();
    const createResult = manager.createUnit(config);
    
    const context = createTestContext();
    const result = manager.calculateUnit(createResult.unit.id, context);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createTestContext(): any {
    return {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
    };
  }

  function testUnitValidation(): void {
    const config = createSizeUnitConfiguration();
    const createResult = manager.createUnit(config);
    
    const context = createTestContext();
    const isValid = manager.validateUnit(createResult.unit.id, context);
    
    expect(typeof isValid).toBe('boolean');
  }

  function testUnitErrorHandling(): void {
    const nonExistentId = 'non-existent-unit-id';
    
    expect(() => manager.getUnit(nonExistentId)).not.toThrow();
    expect(() => manager.calculateUnit(nonExistentId, createTestContext())).not.toThrow();
    expect(() => manager.validateUnit(nonExistentId, createTestContext())).not.toThrow();
  }

  function testSystemInitialization(): void {
    const status = manager.getSystemStatus();
    
    expect(status.initialized).toBe(true);
    expect(typeof status.statistics.totalUnits).toBe('number');
  }

  function testSystemShutdown(): void {
    manager.shutdown();
    
    const status = manager.getSystemStatus();
    expect(status.initialized).toBe(false);
  }

  function testSystemStatusRetrieval(): void {
    const status = manager.getSystemStatus();
    
    expect(status).toBeDefined();
    expect(typeof status.initialized).toBe('boolean');
    expect(typeof status.statistics.totalUnits).toBe('number');
    expect(typeof status.statistics.totalStrategies).toBe('number');
    expect(typeof status.statistics.totalObservers).toBe('number');
  }

  function testOperationEfficiency(): void {
    const configs = createMultipleUnitConfigurations();
    const startTime = performance.now();
    
    configs.forEach(config => {
      manager.createUnit(config);
    });
    
    for (let i = 0; i < 1000; i++) {
      manager.getAllUnits();
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testMultipleUnitsHandling(): void {
    const configs = createLargeNumberOfUnitConfigurations();
    
    configs.forEach(config => {
      const result = manager.createUnit(config);
      expect(result.success).toBe(true);
    });
    
    const allUnits = manager.getAllUnits();
    expect(allUnits.length).toBe(configs.length);
  }

  function createLargeNumberOfUnitConfigurations(): any[] {
    const configs = [];
    for (let i = 0; i < 50; i++) {
      configs.push(configFactory.createSizeUnitConfig(`test-unit-${i}`, `Test Unit ${i}`, SizeValue.PIXEL, {
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
      }));
    }
    return configs;
  }

  function testDifferentUnitTypes(): void {
    const unitTypes = createDifferentUnitTypes();
    
    for (const unitType of unitTypes) {
      const config = createConfigurationForUnitType(unitType);
      const result = manager.createUnit(config);
      
      expect(result.success).toBe(true);
      expect(result.unit.unitType).toBe(unitType);
    }
  }

  function createDifferentUnitTypes(): string[] {
    return ['size', 'position', 'scale'];
  }

  function createConfigurationForUnitType(unitType: string): any {
    switch (unitType) {
      case 'size':
        return createSizeUnitConfiguration();
      case 'position':
        return createPositionUnitConfiguration();
      case 'scale':
        return createScaleUnitConfiguration();
      default:
        return createSizeUnitConfiguration();
    }
  }

  function testDifferentConfigurations(): void {
    const configurations = createDifferentConfigurations();
    
    for (const config of configurations) {
      const result = manager.createUnit(config);
      
      expect(result.success).toBe(true);
      expect(result.unit).toBeDefined();
    }
  }

  function createDifferentConfigurations(): any[] {
    return [
      configFactory.createSizeUnitConfig('config-1', 'Config 1', SizeValue.PIXEL, {
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
      }),
      configFactory.createPositionUnitConfig('config-2', 'Config 2', PositionValue.PIXEL, {
        positionUnit: PositionUnit.PIXEL,
        dimension: Dimension.Y,
      }),
      configFactory.createScaleUnitConfig('config-3', 'Config 3', ScaleValue.FACTOR, {
        scaleUnit: ScaleUnit.FACTOR,
        dimension: Dimension.WIDTH,
      }),
    ];
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    const config = createSizeUnitConfiguration();
    const createResult = manager.createUnit(config);
    
    for (const context of contexts) {
      const result = manager.calculateUnit(createResult.unit.id, context);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentContexts(): any[] {
    return [
      createTestContext(),
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' },
    ];
  }
});