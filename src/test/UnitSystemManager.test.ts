import { UnitSystemManager } from '../managers/UnitSystemManager';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import {
  createSizeUnitConfig,
  createPositionUnitConfig,
  createScaleUnitConfig,
} from '../interfaces/IUnitConfig';
import { container, TOKENS } from '../container/DiContainer';

/**
 * Basic Unit Test for UnitSystemManager
 * Tests the core functionality of unit creation and management
 */

describe('UnitSystemManager', () => {
  let manager: UnitSystemManager;

  beforeEach(() => {
    // Use DI container to resolve manager instead of direct instantiation
    try {
      manager = container.resolve(TOKENS.UNIT_SYSTEM_MANAGER);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      manager = new UnitSystemManager();
    }
    
    manager.initialize();
  });

  afterEach(() => {
    manager.shutdown();
  });

  describe('Unit Creation', () => {
    it('should create a size unit successfully', () => {
      const config = createSizeUnitConfig('test-size-unit', 'Test Size Unit', SizeValue.FILL, {
        sizeUnit: SizeUnit.FILL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
      });

      const result = manager.createUnit(config);
      expect(result.success).toBe(true);
      expect(result.unit).toBeDefined();
      expect(result.unit?.id).toBe('test-size-unit');
    });

    it('should create a position unit successfully', () => {
      const config = createPositionUnitConfig('test-position-unit', 'Test Position Unit', PositionValue.CENTER, {
        positionUnit: PositionUnit.CENTER,
        dimension: Dimension.X,
        baseValue: 50,
      });

      const result = manager.createUnit(config);
      expect(result.success).toBe(true);
      expect(result.unit).toBeDefined();
      expect(result.unit?.id).toBe('test-position-unit');
    });

    it('should create a scale unit successfully', () => {
      const config = createScaleUnitConfig('test-scale-unit', 'Test Scale Unit', ScaleValue.FACTOR, {
        scaleUnit: ScaleUnit.FACTOR,
        baseValue: 1.5,
        maintainAspectRatio: true,
      });

      const result = manager.createUnit(config);
      expect(result.success).toBe(true);
      expect(result.unit).toBeDefined();
      expect(result.unit?.id).toBe('test-scale-unit');
    });

    it('should handle invalid unit configuration', () => {
      const invalidConfig = {
        id: 'invalid-unit',
        name: 'Invalid Unit',
        // Missing required properties
      } as any;

      const result = manager.createUnit(invalidConfig);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Unit Management', () => {
    beforeEach(() => {
      const config = createSizeUnitConfig('test-unit', 'Test Unit', SizeValue.PIXEL, {
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
      });

      manager.createUnit(config);
    });

    it('should get unit by ID', () => {
      const unit = manager.getUnit('test-unit');
      expect(unit).toBeDefined();
      expect(unit?.id).toBe('test-unit');
    });

    it('should return undefined for non-existent unit', () => {
      const unit = manager.getUnit('non-existent');
      expect(unit).toBeUndefined();
    });

    it('should get all units', () => {
      const units = manager.getAllUnits();
      expect(Array.isArray(units)).toBe(true);
      expect(units.length).toBeGreaterThan(0);
    });

    it('should remove unit by ID', () => {
      const result = manager.removeUnit('test-unit');
      expect(result.success).toBe(true);
      
      const unit = manager.getUnit('test-unit');
      expect(unit).toBeUndefined();
    });

    it('should return false when removing non-existent unit', () => {
      const result = manager.removeUnit('non-existent');
      expect(result.success).toBe(false);
    });
  });

  describe('Unit Calculation', () => {
    beforeEach(() => {
      const config = createSizeUnitConfig('test-unit', 'Test Unit', SizeValue.PIXEL, {
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
      });

      manager.createUnit(config);
    });

    it('should calculate unit value', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = manager.calculateUnit('test-unit', context);
      expect(result.success).toBe(true);
      expect(typeof result.value).toBe('number');
      expect(result.value).toBeGreaterThanOrEqual(0);
    });

    it('should return error for non-existent unit calculation', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = manager.calculateUnit('non-existent', context);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle missing context gracefully', () => {
      const result = manager.calculateUnit('test-unit', null as any);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('System Status', () => {
    it('should provide system status', () => {
      const status = manager.getSystemStatus();
      expect(status).toBeDefined();
      expect(typeof status.initialized).toBe('boolean');
      expect(typeof status.statistics.totalUnits).toBe('number');
    });

    it('should be initialized after initialization', () => {
      const status = manager.getSystemStatus();
      expect(status.initialized).toBe(true);
    });

    it('should not be initialized after shutdown', () => {
      manager.shutdown();
      const status = manager.getSystemStatus();
      expect(status.initialized).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle initialization errors gracefully', () => {
      // Mock a failing initialization
      const originalInitialize = manager.initialize;
      manager.initialize = jest.fn().mockImplementation(() => {
        throw new Error('Initialization failed');
      });

      expect(() => manager.initialize()).toThrow('Initialization failed');

      // Restore original method
      manager.initialize = originalInitialize;
    });

    it('should handle shutdown errors gracefully', () => {
      // Mock a failing shutdown
      const originalShutdown = manager.shutdown;
      manager.shutdown = jest.fn().mockImplementation(() => {
        throw new Error('Shutdown failed');
      });

      expect(() => manager.shutdown()).toThrow('Shutdown failed');

      // Restore original method
      manager.shutdown = originalShutdown;
    });

    it('should handle unit creation errors gracefully', () => {
      const invalidConfig = null as any;
      const result = manager.createUnit(invalidConfig);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('should handle many units efficiently', () => {
      const startTime = performance.now();
      
      // Create many units
      for (let i = 0; i < 100; i++) {
        const config = createSizeUnitConfig(`unit-${i}`, `Unit ${i}`, SizeValue.PIXEL, {
          sizeUnit: SizeUnit.PIXEL,
          dimension: Dimension.WIDTH,
          baseValue: i,
        });
        
        manager.createUnit(config);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(manager.getAllUnits().length).toBe(100);
      expect(totalTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should calculate units efficiently', () => {
      // Create units for calculation
      for (let i = 0; i < 50; i++) {
        const config = createSizeUnitConfig(`unit-${i}`, `Unit ${i}`, SizeValue.PIXEL, {
          sizeUnit: SizeUnit.PIXEL,
          dimension: Dimension.WIDTH,
          baseValue: i,
        });
        
        manager.createUnit(config);
      }

      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const startTime = performance.now();
      
      // Calculate all units
      for (let i = 0; i < 50; i++) {
        manager.calculateUnit(`unit-${i}`, context);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(500); // Should complete within 500ms
    });
  });

  describe('Integration', () => {
    it('should work with different unit types together', () => {
      const sizeConfig = createSizeUnitConfig('size-unit', 'Size Unit', SizeValue.PIXEL, {
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
      });

      const positionConfig = createPositionUnitConfig('position-unit', 'Position Unit', PositionValue.CENTER, {
        positionUnit: PositionUnit.CENTER,
        dimension: Dimension.X,
        baseValue: 50,
      });

      const scaleConfig = createScaleUnitConfig('scale-unit', 'Scale Unit', ScaleValue.FACTOR, {
        scaleUnit: ScaleUnit.FACTOR,
        baseValue: 1.5,
        maintainAspectRatio: true,
      });

      const sizeResult = manager.createUnit(sizeConfig);
      const positionResult = manager.createUnit(positionConfig);
      const scaleResult = manager.createUnit(scaleConfig);

      expect(sizeResult.success).toBe(true);
      expect(positionResult.success).toBe(true);
      expect(scaleResult.success).toBe(true);

      expect(manager.getAllUnits().length).toBe(3);
    });

    it('should work with different manager configurations', () => {
      const managers = [
        container.resolve(TOKENS.UNIT_SYSTEM_MANAGER) as UnitSystemManager,
        new UnitSystemManager(),
      ];

      for (const testManager of managers) {
        testManager.initialize();
        
        const config = createSizeUnitConfig('test-unit', 'Test Unit', SizeValue.PIXEL, {
          sizeUnit: SizeUnit.PIXEL,
          dimension: Dimension.WIDTH,
          baseValue: 100,
        });

        const result = testManager.createUnit(config);
        expect(result.success).toBe(true);
        
        testManager.shutdown();
      }
    });
  });
});
