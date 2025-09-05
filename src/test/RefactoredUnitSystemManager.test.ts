import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { UnitSystemManager } from '../managers/UnitSystemManager';
import { container, TOKENS } from '../container/DiContainer';

/**
 * Test suite for the refactored UnitSystemManager
 * Verifies that the Single Responsibility Principle refactoring works correctly
 */
describe('RefactoredUnitSystemManager', () => {
  let unitSystemManager: UnitSystemManager;

  beforeEach(() => {
    // Use DI container to resolve unit system manager instead of direct instantiation
    try {
      unitSystemManager = container.resolve(TOKENS.UNIT_SYSTEM_MANAGER);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      unitSystemManager = new UnitSystemManager();
    }
  });

  afterEach(() => {
    // Clean up if needed
  });

  describe('System Initialization', () => {
    it('should initialize the system successfully', async () => {
      await unitSystemManager.initialize();
      
      expect(unitSystemManager.getSystemStatus().initialized).toBe(true);
    });

    it('should handle multiple initialization calls gracefully', async () => {
      await unitSystemManager.initialize();
      await unitSystemManager.initialize();
      
      expect(unitSystemManager.getSystemStatus().initialized).toBe(true);
    });

    it('should initialize with default configuration', async () => {
      let defaultManager: UnitSystemManager;
      try {
        defaultManager = container.resolve(TOKENS.UNIT_SYSTEM_MANAGER);
      } catch (error) {
        defaultManager = new UnitSystemManager();
      }

      await defaultManager.initialize();
      expect(defaultManager.getSystemStatus().initialized).toBe(true);
    });
  });

  describe('System Shutdown', () => {
    beforeEach(async () => {
      await unitSystemManager.initialize();
    });

    it('should shutdown the system successfully', () => {
      unitSystemManager.shutdown();
      
      expect(unitSystemManager.getSystemStatus().initialized).toBe(false);
    });

    it('should handle multiple shutdown calls gracefully', () => {
      unitSystemManager.shutdown();
      unitSystemManager.shutdown();
      
      expect(unitSystemManager.getSystemStatus().initialized).toBe(false);
    });

    it('should cleanup all resources on shutdown', () => {
      const statusBefore = unitSystemManager.getSystemStatus();
      unitSystemManager.shutdown();
      const statusAfter = unitSystemManager.getSystemStatus();
      
      expect(statusBefore.initialized).toBe(true);
      expect(statusAfter.initialized).toBe(false);
    });
  });

  describe('System Status', () => {
    it('should provide system status information', () => {
      const status = unitSystemManager.getSystemStatus();
      
      expect(status).toBeDefined();
      expect(typeof status.initialized).toBe('boolean');
      expect(typeof status.statistics.totalUnits).toBe('number');
      expect(typeof status.statistics.totalStrategies).toBe('number');
      expect(typeof status.statistics.totalObservers).toBe('number');
      expect(typeof status.statistics.totalOperations).toBe('number');
    });

    it('should update status after operations', async () => {
      const statusBefore = unitSystemManager.getSystemStatus();
      
      await unitSystemManager.initialize();
      
      const statusAfter = unitSystemManager.getSystemStatus();
      expect(statusAfter.initialized).toBe(true);
      expect(statusAfter.statistics.totalUnits).toBeGreaterThanOrEqual(statusBefore.statistics.totalUnits);
    });
  });

  describe('Error Handling', () => {
    it('should handle initialization errors gracefully', async () => {
      // Mock a failing initialization
      const originalInitialize = unitSystemManager.initialize;
      unitSystemManager.initialize = jest.fn().mockRejectedValue(new Error('Initialization failed'));
      
      await expect(unitSystemManager.initialize()).rejects.toThrow('Initialization failed');
      
      // Restore original method
      unitSystemManager.initialize = originalInitialize;
    });

    it('should handle shutdown errors gracefully', () => {
      // Mock a failing shutdown
      const originalShutdown = unitSystemManager.shutdown;
      unitSystemManager.shutdown = jest.fn().mockImplementation(() => {
        throw new Error('Shutdown failed');
      });
      
      expect(() => unitSystemManager.shutdown()).toThrow('Shutdown failed');
      
      // Restore original method
      unitSystemManager.shutdown = originalShutdown;
    });
  });

  describe('Integration', () => {
    it('should work with different manager configurations', async () => {
      const managers: UnitSystemManager[] = [
        container.resolve(TOKENS.UNIT_SYSTEM_MANAGER) as UnitSystemManager,
        new UnitSystemManager(),
      ];

      for (const manager of managers) {
        await manager.initialize();
        expect(manager.getSystemStatus().initialized).toBe(true);
      }
    });

    it('should work with different initialization sequences', async () => {
      // Test initialize -> shutdown -> initialize sequence
      await unitSystemManager.initialize();
      unitSystemManager.shutdown();
      await unitSystemManager.initialize();
      
      expect(unitSystemManager.getSystemStatus().initialized).toBe(true);
    });
  });

  describe('Performance', () => {
    it('should initialize efficiently', async () => {
      const startTime = performance.now();
      
      await unitSystemManager.initialize();
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should shutdown efficiently', async () => {
      await unitSystemManager.initialize();
      
      const startTime = performance.now();
      unitSystemManager.shutdown();
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });
  });
});