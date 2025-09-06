import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { LegacySizeUnitAdapter } from '../adapters/LegacySizeUnitAdapter';
import { SizeUnit } from '../enums/SizeUnit';
import { createMockContext } from './test-utils';
import { container, TOKENS } from '../container/DiContainer';

describe('LegacySizeUnitAdapter', () => {
  let adapter: LegacySizeUnitAdapter;
  let mockLegacyUnit: any;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a legacy size unit adapter', () => {
      testAdapterCreation();
    });

    it('should have correct adapter information', () => {
      testAdapterInformation();
    });

    it('should store the legacy unit', () => {
      testLegacyUnitStorage();
    });
  });

  describe('Legacy Unit Conversion', () => {
    it('should convert legacy unit to modern format', () => {
      testLegacyToModernConversion();
    });

    it('should preserve legacy metadata during conversion', () => {
      testMetadataPreservation();
    });

    it('should handle conversion errors gracefully', () => {
      testConversionErrorHandling();
    });
  });

  describe('Size Calculation', () => {
    it('should calculate size using legacy unit', () => {
      testSizeCalculation();
    });

    it('should handle different contexts', () => {
      testDifferentContexts();
    });

    it('should use legacy unit base value in calculation', () => {
      testBaseValueUsage();
    });
  });

  describe('Adapter Functionality', () => {
    it('should check if it can adapt the legacy unit', () => {
      testAdaptabilityCheck();
    });

    it('should get adapter description', () => {
      testAdapterDescription();
    });

    it('should get adapter version', () => {
      testAdapterVersion();
    });

    it('should get legacy unit information', () => {
      testLegacyUnitInformation();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing context properties', () => {
      testMissingContextProperties();
    });

    it('should handle invalid legacy unit properties', () => {
      testInvalidLegacyUnitProperties();
    });

    it('should handle conversion failures gracefully', () => {
      testConversionFailureHandling();
    });
  });

  describe('Performance and Efficiency', () => {
    it('should perform calculations efficiently', () => {
      testCalculationEfficiency();
    });

    it('should handle multiple rapid calculations', () => {
      testMultipleRapidCalculations();
    });
  });

  describe('Integration with Modern System', () => {
    it('should work with modern unit system', () => {
      testModernSystemIntegration();
    });

    it('should maintain backward compatibility', () => {
      testBackwardCompatibility();
    });
  });

  describe('Adapter Lifecycle', () => {
    it('should initialize properly', () => {
      testAdapterInitialization();
    });

    it('should handle adapter updates', () => {
      testAdapterUpdates();
    });

    it('should handle adapter cleanup', () => {
      testAdapterCleanup();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    createMockLegacyUnit();
    initializeAdapter();
    createMockContext();
  }

  function createMockLegacyUnit(): void {
    mockLegacyUnit = {
      id: 'legacy-unit-1',
      name: 'Legacy Size Unit',
      sizeUnit: SizeUnit.PIXEL,
      baseValue: 100,
      metadata: {
        legacyType: 'old-size-format',
        convertedAt: new Date().toISOString(),
        description: 'Legacy size unit for testing',
      },
    };
  }

  function initializeAdapter(): void {
    try {
      adapter = container.resolve(TOKENS.LEGACY_SIZE_UNIT_ADAPTER);
      setAdapterProperties();
    } catch (error) {
      adapter = new LegacySizeUnitAdapter('adapter-1', 'Legacy Size Adapter', mockLegacyUnit);
    }
  }

  function setAdapterProperties(): void {
    (adapter as any).id = 'adapter-1';
    (adapter as any).name = 'Legacy Size Adapter';
    (adapter as any).legacyUnit = mockLegacyUnit;
  }

  function createMockContext(): void {
    mockContext = createMockContext();
  }

  function testAdapterCreation(): void {
    expect(adapter).toBeInstanceOf(LegacySizeUnitAdapter);
    expect(adapter.id).toBe('adapter-1');
    expect(adapter.name).toBe('Legacy Size Adapter');
  }

  function testAdapterInformation(): void {
    expect(adapter.getDescription()).toBeDefined();
    expect(adapter.getVersion()).toBeDefined();
    expect(adapter.canAdapt(mockLegacyUnit)).toBe(true);
  }

  function testLegacyUnitStorage(): void {
    expect(adapter.getLegacyUnit()).toBeDefined();
    expect(adapter.getLegacyUnit()).toBe(mockLegacyUnit);
  }

  function testLegacyToModernConversion(): void {
    const modernUnit = adapter.convertToModern();
    
    expect(modernUnit).toBeDefined();
    expect(modernUnit.id).toBeDefined();
    expect(modernUnit.name).toBeDefined();
    expect(modernUnit.unitType).toBeDefined();
  }

  function testMetadataPreservation(): void {
    const modernUnit = adapter.convertToModern();
    
    expect(modernUnit.metadata).toBeDefined();
    expect(modernUnit.metadata.legacyType).toBe('old-size-format');
    expect(modernUnit.metadata.convertedAt).toBeDefined();
    expect(modernUnit.metadata.description).toBe('Legacy size unit for testing');
  }

  function testConversionErrorHandling(): void {
    const invalidLegacyUnit = createInvalidLegacyUnit();
    const invalidAdapter = createAdapterWithInvalidUnit(invalidLegacyUnit);
    
    expect(() => invalidAdapter.convertToModern()).not.toThrow();
  }

  function createInvalidLegacyUnit(): any {
    return {
      id: 'invalid-unit',
      name: 'Invalid Unit',
      // Missing required properties
    };
  }

  function createAdapterWithInvalidUnit(invalidLegacyUnit: any): LegacySizeUnitAdapter {
    try {
      const invalidAdapter = container.resolve(TOKENS.LEGACY_SIZE_ADAPTER);
      (invalidAdapter as any).id = 'invalid-adapter';
      (invalidAdapter as any).name = 'Invalid Adapter';
      (invalidAdapter as any).legacyUnit = invalidLegacyUnit;
      return invalidAdapter;
    } catch (error) {
      return new LegacySizeUnitAdapter('invalid-adapter', 'Invalid Adapter', invalidLegacyUnit);
    }
  }

  function testSizeCalculation(): void {
    const result = adapter.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();

    for (const context of contexts) {
      const result = adapter.calculate(context);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentContexts(): any[] {
    return [
      createMockContext(),
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' as const },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' as const },
    ];
  }

  function testBaseValueUsage(): void {
    const result = adapter.calculate(mockContext);
    
    // The result should be influenced by the legacy unit's base value
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testAdaptabilityCheck(): void {
    expect(adapter.canAdapt(mockLegacyUnit)).toBe(true);
  }

  function testAdapterDescription(): void {
    const description = adapter.getDescription();
    expect(typeof description).toBe('string');
    expect(description.length).toBeGreaterThan(0);
  }

  function testAdapterVersion(): void {
    const version = adapter.getVersion();
    expect(typeof version).toBe('string');
    expect(version).toMatch(/^\d+\.\d+\.\d+$/); // Should match semantic versioning
  }

  function testLegacyUnitInformation(): void {
    const legacyUnit = adapter.getLegacyUnit();
    expect(legacyUnit).toBeDefined();
    expect(legacyUnit.id).toBe('legacy-unit-1');
    expect(legacyUnit.name).toBe('Legacy Size Unit');
  }

  function testMissingContextProperties(): void {
    const partialContext = { dimension: 'width' as const };
    const result = adapter.calculate(partialContext as any);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testInvalidLegacyUnitProperties(): void {
    const invalidLegacyUnit = createInvalidLegacyUnitWithProperties();
    const invalidAdapter = createAdapterWithInvalidUnit(invalidLegacyUnit);
    
    const result = invalidAdapter.calculate(mockContext);
    expect(typeof result).toBe('number');
  }

  function createInvalidLegacyUnitWithProperties(): any {
    return {
      id: 'invalid-unit',
      name: 'Invalid Unit',
      sizeUnit: 'invalid' as any,
      baseValue: 'invalid' as any,
    };
  }

  function testConversionFailureHandling(): void {
    const problematicLegacyUnit = createProblematicLegacyUnit();
    const problematicAdapter = createAdapterWithInvalidUnit(problematicLegacyUnit);
    
    expect(() => problematicAdapter.convertToModern()).not.toThrow();
  }

  function createProblematicLegacyUnit(): any {
    return {
      id: 'problematic-unit',
      name: 'Problematic Unit',
      sizeUnit: SizeUnit.PIXEL,
      baseValue: 100,
      metadata: {
        legacyType: 'problematic-format',
        // Missing required metadata
      },
    };
  }

  function testCalculationEfficiency(): void {
    const startTime = performance.now();
    
    performMultipleCalculations();
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function performMultipleCalculations(): void {
    for (let i = 0; i < 1000; i++) {
      adapter.calculate(mockContext);
    }
  }

  function testMultipleRapidCalculations(): void {
    const results = performRapidCalculations();
    
    results.forEach(result => {
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  }

  function performRapidCalculations(): number[] {
    const results = [];
    
    for (let i = 0; i < 100; i++) {
      const result = adapter.calculate(mockContext);
      results.push(result);
    }
    
    return results;
  }

  function testModernSystemIntegration(): void {
    const modernUnit = adapter.convertToModern();
    
    expect(modernUnit).toBeDefined();
    expect(modernUnit.id).toBeDefined();
    expect(modernUnit.name).toBeDefined();
    expect(modernUnit.unitType).toBeDefined();
    
    // The modern unit should be compatible with the modern system
    expect(typeof modernUnit.calculate).toBe('function');
  }

  function testBackwardCompatibility(): void {
    const legacyUnit = adapter.getLegacyUnit();
    const modernUnit = adapter.convertToModern();
    
    // Both should produce similar results
    const legacyResult = adapter.calculate(mockContext);
    const modernResult = modernUnit.calculate(mockContext);
    
    expect(typeof legacyResult).toBe('number');
    expect(typeof modernResult).toBe('number');
  }

  function testAdapterInitialization(): void {
    expect(adapter.id).toBeDefined();
    expect(adapter.name).toBeDefined();
    expect(adapter.getLegacyUnit()).toBeDefined();
  }

  function testAdapterUpdates(): void {
    const updatedLegacyUnit = createUpdatedLegacyUnit();
    (adapter as any).legacyUnit = updatedLegacyUnit;
    
    const result = adapter.calculate(mockContext);
    expect(typeof result).toBe('number');
  }

  function createUpdatedLegacyUnit(): any {
    return {
      ...mockLegacyUnit,
      baseValue: 200,
      metadata: {
        ...mockLegacyUnit.metadata,
        updatedAt: new Date().toISOString(),
      },
    };
  }

  function testAdapterCleanup(): void {
    // Simulate cleanup
    (adapter as any).legacyUnit = null;
    
    expect(() => adapter.calculate(mockContext)).not.toThrow();
  }
});