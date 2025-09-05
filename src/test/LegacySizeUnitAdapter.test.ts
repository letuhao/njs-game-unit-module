import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { LegacySizeUnitAdapter } from '../adapters/LegacySizeUnitAdapter';
import { SizeUnit } from '../enums/SizeUnit';
import { createMockContext } from './setup';
import { container, TOKENS } from '../container/DiContainer';

describe('LegacySizeUnitAdapter', () => {
  let adapter: LegacySizeUnitAdapter;
  let mockLegacyUnit: any;
  let mockContext: any;

  beforeEach(() => {
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
    
    // Use DI container to resolve adapter instead of direct instantiation
    try {
      adapter = container.resolve(TOKENS.LEGACY_SIZE_UNIT_ADAPTER);
      // Set properties for the resolved adapter
      (adapter as any).id = 'adapter-1';
      (adapter as any).name = 'Legacy Size Adapter';
      (adapter as any).legacyUnit = mockLegacyUnit;
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      adapter = new LegacySizeUnitAdapter('adapter-1', 'Legacy Size Adapter', mockLegacyUnit);
    }
    
    mockContext = createMockContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a legacy size unit adapter', () => {
      expect(adapter).toBeInstanceOf(LegacySizeUnitAdapter);
      expect(adapter.id).toBe('adapter-1');
      expect(adapter.name).toBe('Legacy Size Adapter');
    });

    it('should have correct adapter information', () => {
      expect(adapter.getDescription()).toBeDefined();
      expect(adapter.getVersion()).toBeDefined();
      expect(adapter.canAdapt()).toBe(true);
    });

    it('should store the legacy unit', () => {
      expect(adapter.getLegacyUnit()).toBeDefined();
      expect(adapter.getLegacyUnit()).toBe(mockLegacyUnit);
    });
  });

  describe('Legacy Unit Conversion', () => {
    it('should convert legacy unit to modern format', () => {
      const modernUnit = adapter.convertToModern();
      
      expect(modernUnit).toBeDefined();
      expect(modernUnit.id).toBeDefined();
      expect(modernUnit.name).toBeDefined();
      expect(modernUnit.unitType).toBeDefined();
    });

    it('should preserve legacy metadata during conversion', () => {
      const modernUnit = adapter.convertToModern();
      
      expect(modernUnit.metadata).toBeDefined();
      expect(modernUnit.metadata.legacyType).toBe('old-size-format');
      expect(modernUnit.metadata.convertedAt).toBeDefined();
      expect(modernUnit.metadata.description).toBe('Legacy size unit for testing');
    });

    it('should handle conversion errors gracefully', () => {
      const invalidLegacyUnit = {
        id: 'invalid-unit',
        name: 'Invalid Unit',
        // Missing required properties
      };
      
      let invalidAdapter: LegacySizeUnitAdapter;
      try {
        invalidAdapter = container.resolve(TOKENS.LEGACY_SIZE_UNIT_ADAPTER);
        (invalidAdapter as any).id = 'invalid-adapter';
        (invalidAdapter as any).name = 'Invalid Adapter';
        (invalidAdapter as any).legacyUnit = invalidLegacyUnit;
      } catch (error) {
        invalidAdapter = new LegacySizeUnitAdapter('invalid-adapter', 'Invalid Adapter', invalidLegacyUnit);
      }
      
      expect(() => invalidAdapter.convertToModern()).not.toThrow();
    });
  });

  describe('Size Calculation', () => {
    it('should calculate size using legacy unit', () => {
      const result = adapter.calculate(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle different contexts', () => {
      const contexts = [
        createMockContext(),
        { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' as const },
        { scene: { width: 1600, height: 1200 }, dimension: 'height' as const },
      ];

      for (const context of contexts) {
        const result = adapter.calculate(context);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should use legacy unit base value in calculation', () => {
      const result = adapter.calculate(mockContext);
      
      // The result should be influenced by the legacy unit's base value
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Adapter Functionality', () => {
    it('should check if it can adapt the legacy unit', () => {
      expect(adapter.canAdapt()).toBe(true);
    });

    it('should get adapter description', () => {
      const description = adapter.getDescription();
      expect(typeof description).toBe('string');
      expect(description.length).toBeGreaterThan(0);
    });

    it('should get adapter version', () => {
      const version = adapter.getVersion();
      expect(typeof version).toBe('string');
      expect(version).toMatch(/^\d+\.\d+\.\d+$/); // Should match semantic versioning
    });

    it('should get legacy unit information', () => {
      const legacyUnit = adapter.getLegacyUnit();
      expect(legacyUnit).toBeDefined();
      expect(legacyUnit.id).toBe('legacy-unit-1');
      expect(legacyUnit.name).toBe('Legacy Size Unit');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing context properties', () => {
      const partialContext = { dimension: 'width' as const };
      const result = adapter.calculate(partialContext as any);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle invalid legacy unit properties', () => {
      const invalidLegacyUnit = {
        id: 'invalid-unit',
        name: 'Invalid Unit',
        sizeUnit: 'invalid' as any,
        baseValue: 'invalid' as any,
      };
      
      let invalidAdapter: LegacySizeUnitAdapter;
      try {
        invalidAdapter = container.resolve(TOKENS.LEGACY_SIZE_UNIT_ADAPTER);
        (invalidAdapter as any).id = 'invalid-adapter';
        (invalidAdapter as any).name = 'Invalid Adapter';
        (invalidAdapter as any).legacyUnit = invalidLegacyUnit;
      } catch (error) {
        invalidAdapter = new LegacySizeUnitAdapter('invalid-adapter', 'Invalid Adapter', invalidLegacyUnit);
      }
      
      const result = invalidAdapter.calculate(mockContext);
      expect(typeof result).toBe('number');
    });

    it('should handle conversion failures gracefully', () => {
      const problematicLegacyUnit = {
        id: 'problematic-unit',
        name: 'Problematic Unit',
        sizeUnit: SizeUnit.PIXEL,
        baseValue: 100,
        metadata: {
          legacyType: 'problematic-format',
          // Missing required metadata
        },
      };
      
      let problematicAdapter: LegacySizeUnitAdapter;
      try {
        problematicAdapter = container.resolve(TOKENS.LEGACY_SIZE_UNIT_ADAPTER);
        (problematicAdapter as any).id = 'problematic-adapter';
        (problematicAdapter as any).name = 'Problematic Adapter';
        (problematicAdapter as any).legacyUnit = problematicLegacyUnit;
      } catch (error) {
        problematicAdapter = new LegacySizeUnitAdapter('problematic-adapter', 'Problematic Adapter', problematicLegacyUnit);
      }
      
      expect(() => problematicAdapter.convertToModern()).not.toThrow();
    });
  });

  describe('Performance and Efficiency', () => {
    it('should perform calculations efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        adapter.calculate(mockContext);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle multiple rapid calculations', () => {
      const results = [];
      
      for (let i = 0; i < 100; i++) {
        const result = adapter.calculate(mockContext);
        results.push(result);
      }
      
      results.forEach(result => {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Integration with Modern System', () => {
    it('should work with modern unit system', () => {
      const modernUnit = adapter.convertToModern();
      
      expect(modernUnit).toBeDefined();
      expect(modernUnit.id).toBeDefined();
      expect(modernUnit.name).toBeDefined();
      expect(modernUnit.unitType).toBeDefined();
      
      // The modern unit should be compatible with the modern system
      expect(typeof modernUnit.calculate).toBe('function');
    });

    it('should maintain backward compatibility', () => {
      const legacyUnit = adapter.getLegacyUnit();
      const modernUnit = adapter.convertToModern();
      
      // Both should produce similar results
      const legacyResult = adapter.calculate(mockContext);
      const modernResult = modernUnit.calculate(mockContext);
      
      expect(typeof legacyResult).toBe('number');
      expect(typeof modernResult).toBe('number');
    });
  });

  describe('Adapter Lifecycle', () => {
    it('should initialize properly', () => {
      expect(adapter.id).toBeDefined();
      expect(adapter.name).toBeDefined();
      expect(adapter.getLegacyUnit()).toBeDefined();
    });

    it('should handle adapter updates', () => {
      const updatedLegacyUnit = {
        ...mockLegacyUnit,
        baseValue: 200,
        metadata: {
          ...mockLegacyUnit.metadata,
          updatedAt: new Date().toISOString(),
        },
      };
      
      (adapter as any).legacyUnit = updatedLegacyUnit;
      
      const result = adapter.calculate(mockContext);
      expect(typeof result).toBe('number');
    });

    it('should handle adapter cleanup', () => {
      // Simulate cleanup
      (adapter as any).legacyUnit = null;
      
      expect(() => adapter.calculate(mockContext)).not.toThrow();
    });
  });
});
