import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { MixedUnitStrategy } from '../strategies/MixedUnitStrategy';
import { createMockContext } from './setup';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { container, TOKENS } from '../container/DiContainer';

describe('MixedUnitStrategy', () => {
  let strategy: MixedUnitStrategy;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    // Clean up if needed
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a mixed unit strategy with correct properties', () => {
      testStrategyCreation();
    });

    it('should have correct priority for mixed calculations', () => {
      testStrategyPriority();
    });
  });

  describe('Input Validation', () => {
    it('should handle mixed array inputs', () => {
      testMixedArrayInputs();
    });

    it('should handle mixed object inputs', () => {
      testMixedObjectInputs();
    });

    it('should handle complex mixed inputs', () => {
      testComplexMixedInputs();
    });

    it('should reject invalid inputs', () => {
      testInvalidInputRejection();
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate mixed values correctly', () => {
      testMixedValueCalculation();
    });

    it('should handle different unit types in mixed calculations', () => {
      testDifferentUnitTypes();
    });

    it('should apply fallback values when needed', () => {
      testFallbackValueApplication();
    });
  });

  describe('Error Handling', () => {
    it('should handle calculation errors gracefully', () => {
      testCalculationErrorHandling();
    });

    it('should handle missing context properties', () => {
      testMissingContextHandling();
    });

    it('should handle invalid input types', () => {
      testInvalidInputTypeHandling();
    });
  });

  describe('Performance', () => {
    it('should perform calculations efficiently', () => {
      testCalculationEfficiency();
    });

    it('should handle high-frequency calculations', () => {
      testHighFrequencyCalculations();
    });
  });

  describe('Integration', () => {
    it('should work with different contexts', () => {
      testDifferentContexts();
    });

    it('should work with different input combinations', () => {
      testDifferentInputCombinations();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    initializeStrategy();
    createMockContext();
  }

  function initializeStrategy(): void {
    try {
      strategy = container.resolve(TOKENS.MIXED_UNIT_STRATEGY);
    } catch (error) {
      strategy = new MixedUnitStrategy();
    }
  }

  function createMockContext(): void {
    mockContext = createMockContext();
  }

  function testStrategyCreation(): void {
    expect(strategy.unitType).toBe('mixed');
  }

  function testStrategyPriority(): void {
    const priority = strategy.getPriority();
    expect(priority).toBe(4); // Mixed strategy priority
  }

  function testMixedArrayInputs(): void {
    const input = [100, '50%', 'auto'] as any;
    expect(strategy.canHandle(input)).toBe(true);
  }

  function testMixedObjectInputs(): void {
    const input = createMixedObjectInput();
    expect(strategy.canHandle(input)).toBe(true);
  }

  function createMixedObjectInput(): any {
    return {
      size: { value: 100 },
      position: { value: 'center' },
      scale: { value: 1.5 },
    };
  }

  function testComplexMixedInputs(): void {
    const input = createComplexMixedInput();
    expect(strategy.canHandle(input)).toBe(true);
  }

  function createComplexMixedInput(): any {
    return {
      size: { value: 100, unit: 'px' },
      position: { value: 'center', unit: '%' },
      scale: { value: 1.5, unit: 'factor' },
      metadata: { mixed: true },
    };
  }

  function testInvalidInputRejection(): void {
    const invalidInputs = createInvalidInputs();
    
    for (const input of invalidInputs) {
      expect(strategy.canHandle(input)).toBe(false);
    }
  }

  function createInvalidInputs(): any[] {
    return [
      null,
      undefined,
      'invalid string',
      123,
      {},
      [],
    ];
  }

  function testMixedValueCalculation(): void {
    const input = createMixedObjectInput();
    const result = strategy.calculate(input, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testDifferentUnitTypes(): void {
    const unitTypes = ['size', 'position', 'scale'];
    
    for (const unitType of unitTypes) {
      const input = createInputForUnitType(unitType);
      const result = strategy.calculate(input, mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createInputForUnitType(unitType: string): any {
    return {
      [unitType]: { value: 100, unit: 'px' },
    };
  }

  function testFallbackValueApplication(): void {
    const input = createInputWithMissingValues();
    const result = strategy.calculate(input, mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createInputWithMissingValues(): any {
    return {
      size: { value: 100 },
      position: { value: null },
      scale: { value: undefined },
    };
  }

  function testCalculationErrorHandling(): void {
    const input = createProblematicInput();
    
    expect(() => strategy.calculate(input, mockContext)).not.toThrow();
  }

  function createProblematicInput(): any {
    return {
      size: { value: 'invalid' },
      position: { value: null },
      scale: { value: undefined },
    };
  }

  function testMissingContextHandling(): void {
    const input = createMixedObjectInput();
    const partialContext = { dimension: 'width' };
    
    expect(() => strategy.calculate(input, partialContext as any)).not.toThrow();
  }

  function testInvalidInputTypeHandling(): void {
    const invalidInputs = createInvalidInputs();
    
    for (const input of invalidInputs) {
      expect(() => strategy.calculate(input, mockContext)).not.toThrow();
    }
  }

  function testCalculationEfficiency(): void {
    const input = createMixedObjectInput();
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      strategy.calculate(input, mockContext);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testHighFrequencyCalculations(): void {
    const input = createMixedObjectInput();
    const results = [];
    
    for (let i = 0; i < 100; i++) {
      const result = strategy.calculate(input, mockContext);
      results.push(result);
    }
    
    results.forEach(result => {
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  }

  function testDifferentContexts(): void {
    const input = createMixedObjectInput();
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const result = strategy.calculate(input, context);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentContexts(): any[] {
    return [
      mockContext,
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' },
      { viewport: { width: 1920, height: 1080 }, dimension: 'width' },
    ];
  }

  function testDifferentInputCombinations(): void {
    const inputCombinations = createInputCombinations();
    
    for (const input of inputCombinations) {
      const result = strategy.calculate(input, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createInputCombinations(): any[] {
    return [
      { size: { value: 100 }, position: { value: 50 } },
      { size: { value: '50%' }, scale: { value: 1.5 } },
      { position: { value: 'center' }, scale: { value: 2.0 } },
      { size: { value: 100 }, position: { value: 'center' }, scale: { value: 1.5 } },
    ];
  }
});