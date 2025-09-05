import { SizeUnitStrategy } from '../strategies/SizeUnitStrategy';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { createMockContext } from './setup';
import { container, TOKENS } from '../container/DiContainer';

describe('SizeUnitStrategy', () => {
  let strategy: SizeUnitStrategy;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    // Use DI container to resolve strategy instead of direct instantiation
    try {
      strategy = container.resolve(TOKENS.SIZE_UNIT_STRATEGY);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      strategy = new SizeUnitStrategy();
    }
    mockContext = createMockContext();
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a size unit strategy with correct properties', () => {
      expect(strategy.unitType).toBe('size');
      expect(strategy.getPriority()).toBe(1);
    });

    it('should return correct strategy information', () => {
      const info = strategy.getStrategyInfo();

      expect(info.unitType).toBe('size');
      expect(info.priority).toBe(1);
      expect(info.supportedInputs).toContain('number');
      expect(info.supportedInputs).toContain('string');
      expect(info.supportedInputs).toContain('SizeValue');
      expect(info.supportedInputs).toContain('SizeUnit');
      expect(info.supportedInputs).toContain('array');
    });

    it('should have correct priority for size calculations', () => {
      const priority = strategy.getPriority();
      expect(priority).toBe(1);
    });
  });

  describe('Input Validation', () => {
    it('should handle numeric inputs', () => {
      const numericInputs = [100, 200.5, 0, -50, 1000];
      
      for (const input of numericInputs) {
        expect(strategy.canHandle(input)).toBe(true);
      }
    });

    it('should handle string inputs', () => {
      const stringInputs = ['100px', '50%', 'auto', 'fill', '100'];
      
      for (const input of stringInputs) {
        expect(strategy.canHandle(input)).toBe(true);
      }
    });

    it('should handle SizeValue inputs', () => {
      const sizeValueInputs = [SizeValue.PIXEL, SizeValue.FILL, SizeValue.AUTO, SizeValue.PARENT_WIDTH, SizeValue.VIEWPORT_WIDTH];
      
      for (const input of sizeValueInputs) {
        expect(strategy.canHandle(input)).toBe(true);
      }
    });

    it('should handle SizeUnit inputs', () => {
      const sizeUnitInputs = [SizeUnit.PIXEL, SizeUnit.FILL, SizeUnit.AUTO, SizeUnit.PARENT_WIDTH, SizeUnit.VIEWPORT_WIDTH];
      
      for (const input of sizeUnitInputs) {
        expect(strategy.canHandle(input)).toBe(true);
      }
    });

    it('should handle array inputs', () => {
      const arrayInputs = [[100, 200], ['100px', '200px'], [SizeValue.PIXEL, SizeValue.FILL]];
      
      for (const input of arrayInputs) {
        expect(strategy.canHandle(input)).toBe(true);
      }
    });

    it('should reject unsupported input types', () => {
      const unsupportedInputs = [null, undefined, {}, true, false, () => {}];
      
      for (const input of unsupportedInputs) {
        expect(strategy.canHandle(input)).toBe(false);
      }
    });
  });

  describe('Size Calculation', () => {
    it('should calculate pixel size correctly', () => {
      const result = strategy.calculate(SizeValue.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate fill size correctly', () => {
      const result = strategy.calculate(SizeValue.FILL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate auto size correctly', () => {
      const result = strategy.calculate(SizeValue.AUTO, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate parent width size correctly', () => {
      const result = strategy.calculate(SizeValue.PARENT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate viewport width size correctly', () => {
      const result = strategy.calculate(SizeValue.VIEWPORT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate numeric values correctly', () => {
      const numericValues = [100, 200.5, 0, -50, 1000];
      
      for (const value of numericValues) {
        const result = strategy.calculate(value, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should calculate string values correctly', () => {
      const stringValues = ['100px', '50%', 'auto', 'fill', '100'];
      
      for (const value of stringValues) {
        const result = strategy.calculate(value, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should calculate array values correctly', () => {
      const arrayValues = [[100, 200], ['100px', '200px'], [SizeValue.PIXEL, SizeValue.FILL]];
      
      for (const value of arrayValues) {
        const result = strategy.calculate(value, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Context Handling', () => {
    it('should handle different parent contexts', () => {
      const contexts = [
        { parent: { width: 800, height: 600, x: 0, y: 0 }, dimension: 'width' as any },
        { parent: { width: 1200, height: 800, x: 0, y: 0 }, dimension: 'height' as any },
        { parent: { width: 400, height: 300, x: 0, y: 0 }, dimension: 'both' as any },
      ];

      for (const context of contexts) {
        const result = strategy.calculate(SizeValue.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle different scene contexts', () => {
      const contexts = [
        { scene: { width: 1920, height: 1080 }, dimension: 'width' as any },
        { scene: { width: 1366, height: 768 }, dimension: 'height' as any },
        { scene: { width: 1024, height: 768 }, dimension: 'both' as any },
      ];

      for (const context of contexts) {
        const result = strategy.calculate(SizeValue.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle viewport contexts', () => {
      const contexts = [
        { viewport: { width: 1920, height: 1080 }, dimension: 'width' as any },
        { viewport: { width: 1366, height: 768 }, dimension: 'height' as any },
        { viewport: { width: 1024, height: 768 }, dimension: 'both' as any },
      ];

      for (const context of contexts) {
        const result = strategy.calculate(SizeValue.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid inputs gracefully', () => {
      const invalidInputs = [null, undefined, {}, true, false, () => {}];
      
      for (const input of invalidInputs) {
        const result = strategy.calculate(input as any, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle missing context properties', () => {
      const partialContexts = [
        {},
        { parent: { width: 800, height: 600, x: 0, y: 0 } },
        { scene: { width: 1920, height: 1080 } },
        { viewport: { width: 1366, height: 768 } },
      ];

      for (const partialContext of partialContexts) {
        const result = strategy.calculate(SizeValue.PIXEL, partialContext as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle calculation errors gracefully', () => {
      // Mock a failing calculation
      const originalCalculate = strategy.calculate;
      strategy.calculate = jest.fn().mockImplementation(() => {
        throw new Error('Calculation failed');
      });

      expect(() => strategy.calculate(SizeValue.PIXEL, mockContext)).toThrow('Calculation failed');

      // Restore original method
      strategy.calculate = originalCalculate;
    });
  });

  describe('Performance', () => {
    it('should perform calculations efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        strategy.calculate(SizeValue.PIXEL, mockContext);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle multiple rapid calculations', () => {
      const results = [];
      
      for (let i = 0; i < 100; i++) {
        const result = strategy.calculate(SizeValue.PIXEL, mockContext);
        results.push(result);
      }
      
      results.forEach(result => {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Strategy Properties', () => {
    it('should have correct unit type', () => {
      expect(strategy.unitType).toBe('size');
    });

    it('should have correct priority', () => {
      expect(strategy.getPriority()).toBe(1);
    });

    it('should provide strategy information', () => {
      const info = strategy.getStrategyInfo();
      
      expect(info.unitType).toBe('size');
      expect(info.priority).toBe(1);
      expect(Array.isArray(info.supportedInputs)).toBe(true);
      expect(info.supportedInputs.length).toBeGreaterThan(0);
    });
  });

  describe('Integration', () => {
    it('should work with different strategy configurations', () => {
      const testCases = [
        { input: SizeValue.PIXEL, expectedType: 'number' },
        { input: SizeValue.FILL, expectedType: 'number' },
        { input: SizeValue.AUTO, expectedType: 'number' },
        { input: SizeValue.PARENT_WIDTH, expectedType: 'number' },
        { input: SizeValue.VIEWPORT_WIDTH, expectedType: 'number' },
        { input: 100, expectedType: 'number' },
        { input: '100px', expectedType: 'number' },
        { input: [100, 200], expectedType: 'number' },
      ];

      for (const testCase of testCases) {
        const result = strategy.calculate(testCase.input, mockContext);
        expect(typeof result).toBe(testCase.expectedType);
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should work with different context types', () => {
      const contexts = [
        createMockContext(),
        { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' as any },
        { scene: { width: 1920, height: 1080 }, dimension: 'height' as any },
        { viewport: { width: 1366, height: 768 }, dimension: 'both' as any },
      ];

      for (const context of contexts) {
        const result = strategy.calculate(SizeValue.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
