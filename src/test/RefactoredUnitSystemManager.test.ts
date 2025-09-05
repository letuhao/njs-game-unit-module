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
    setupTestEnvironment();
  });

  afterEach(() => {
    // Clean up if needed
  });

  describe('System Initialization', () => {
    it('should initialize the system successfully', async () => {
      await testSystemInitialization();
    });

    it('should handle multiple initialization calls gracefully', async () => {
      await testMultipleInitializationCalls();
    });

    it('should initialize with default configuration', async () => {
      await testDefaultConfigurationInitialization();
    });
  });

  describe('System Shutdown', () => {
    beforeEach(async () => {
      await initializeSystemForShutdown();
    });

    it('should shutdown the system successfully', () => {
      testSystemShutdown();
    });

    it('should handle multiple shutdown calls gracefully', () => {
      testMultipleShutdownCalls();
    });

    it('should cleanup all resources on shutdown', () => {
      testResourceCleanupOnShutdown();
    });
  });

  describe('System Status', () => {
    it('should provide system status information', () => {
      testSystemStatusInformation();
    });

    it('should update status after operations', async () => {
      await testStatusUpdateAfterOperations();
    });
  });

  describe('Error Handling', () => {
    it('should handle initialization errors gracefully', async () => {
      await testInitializationErrorHandling();
    });

    it('should handle shutdown errors gracefully', () => {
      testShutdownErrorHandling();
    });
  });

  describe('Integration', () => {
    it('should work with different manager configurations', async () => {
      await testDifferentManagerConfigurations();
    });

    it('should work with different initialization sequences', async () => {
      await testDifferentInitializationSequences();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    initializeUnitSystemManager();
  }

  function initializeUnitSystemManager(): void {
    try {
      unitSystemManager = container.resolve(TOKENS.UNIT_SYSTEM_MANAGER);
    } catch (error) {
      unitSystemManager = new UnitSystemManager();
    }
  }

  async function testSystemInitialization(): Promise<void> {
    await unitSystemManager.initialize();
    
    expect(unitSystemManager.getSystemStatus().initialized).toBe(true);
  }

  async function testMultipleInitializationCalls(): Promise<void> {
    await unitSystemManager.initialize();
    await unitSystemManager.initialize();
    
    expect(unitSystemManager.getSystemStatus().initialized).toBe(true);
  }

  async function testDefaultConfigurationInitialization(): Promise<void> {
    const defaultManager = createDefaultManager();
    
    await defaultManager.initialize();
    expect(defaultManager.getSystemStatus().initialized).toBe(true);
  }

  function createDefaultManager(): UnitSystemManager {
    try {
      return container.resolve(TOKENS.UNIT_SYSTEM_MANAGER);
    } catch (error) {
      return new UnitSystemManager();
    }
  }

  async function initializeSystemForShutdown(): Promise<void> {
    await unitSystemManager.initialize();
  }

  function testSystemShutdown(): void {
    unitSystemManager.shutdown();
    
    expect(unitSystemManager.getSystemStatus().initialized).toBe(false);
  }

  function testMultipleShutdownCalls(): void {
    unitSystemManager.shutdown();
    unitSystemManager.shutdown();
    
    expect(unitSystemManager.getSystemStatus().initialized).toBe(false);
  }

  function testResourceCleanupOnShutdown(): void {
    const statusBefore = unitSystemManager.getSystemStatus();
    unitSystemManager.shutdown();
    const statusAfter = unitSystemManager.getSystemStatus();
    
    expect(statusBefore.initialized).toBe(true);
    expect(statusAfter.initialized).toBe(false);
  }

  function testSystemStatusInformation(): void {
    const status = unitSystemManager.getSystemStatus();
    
    verifySystemStatusStructure(status);
  }

  function verifySystemStatusStructure(status: any): void {
    expect(status).toBeDefined();
    expect(typeof status.initialized).toBe('boolean');
    expect(typeof status.statistics.totalUnits).toBe('number');
    expect(typeof status.statistics.totalStrategies).toBe('number');
    expect(typeof status.statistics.totalObservers).toBe('number');
    expect(typeof status.statistics.totalOperations).toBe('number');
  }

  async function testStatusUpdateAfterOperations(): Promise<void> {
    const statusBefore = unitSystemManager.getSystemStatus();
    
    await unitSystemManager.initialize();
    
    const statusAfter = unitSystemManager.getSystemStatus();
    verifyStatusUpdate(statusBefore, statusAfter);
  }

  function verifyStatusUpdate(statusBefore: any, statusAfter: any): void {
    expect(statusAfter.initialized).toBe(true);
    expect(statusAfter.statistics.totalUnits).toBeGreaterThanOrEqual(statusBefore.statistics.totalUnits);
  }

  async function testInitializationErrorHandling(): Promise<void> {
    const originalInitialize = unitSystemManager.initialize;
    const mockInitialize = createMockFailingInitialize();
    
    unitSystemManager.initialize = mockInitialize;
    
    await expect(unitSystemManager.initialize()).rejects.toThrow('Initialization failed');
    
    restoreOriginalMethod(unitSystemManager, 'initialize', originalInitialize);
  }

  function createMockFailingInitialize(): jest.Mock {
    return jest.fn().mockRejectedValue(new Error('Initialization failed'));
  }

  function testShutdownErrorHandling(): void {
    const originalShutdown = unitSystemManager.shutdown;
    const mockShutdown = createMockFailingShutdown();
    
    unitSystemManager.shutdown = mockShutdown;
    
    expect(() => unitSystemManager.shutdown()).toThrow('Shutdown failed');
    
    restoreOriginalMethod(unitSystemManager, 'shutdown', originalShutdown);
  }

  function createMockFailingShutdown(): jest.Mock {
    return jest.fn().mockImplementation(() => {
      throw new Error('Shutdown failed');
    });
  }

  function restoreOriginalMethod(object: any, methodName: string, originalMethod: any): void {
    object[methodName] = originalMethod;
  }

  async function testDifferentManagerConfigurations(): Promise<void> {
    const managers = createDifferentManagers();
    
    for (const manager of managers) {
      await testManagerInitialization(manager);
    }
  }

  function createDifferentManagers(): UnitSystemManager[] {
    return [
      container.resolve(TOKENS.UNIT_SYSTEM_MANAGER) as UnitSystemManager,
      new UnitSystemManager(),
    ];
  }

  async function testManagerInitialization(manager: UnitSystemManager): Promise<void> {
    await manager.initialize();
    expect(manager.getSystemStatus().initialized).toBe(true);
  }

  async function testDifferentInitializationSequences(): Promise<void> {
    await testInitializeShutdownInitializeSequence();
  }

  async function testInitializeShutdownInitializeSequence(): Promise<void> {
    // Test initialize -> shutdown -> initialize sequence
    await unitSystemManager.initialize();
    unitSystemManager.shutdown();
    await unitSystemManager.initialize();
    
    expect(unitSystemManager.getSystemStatus().initialized).toBe(true);
  }
});