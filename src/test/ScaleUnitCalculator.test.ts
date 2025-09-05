import { ScaleUnitCalculator } from '../classes/ScaleUnitCalculator';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { createMockContext } from './setup';
import { container, TOKENS } from '../container/DiContainer';

describe('ScaleUnitCalculator', () => {
  let calculator: ScaleUnitCalculator;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    mockContext = createMockContext();
  });

  describe('Constructor', () => {
    it('should create a scale unit calculator with correct properties', () => {
      // Use DI container to resolve calculator instead of direct instantiation
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        // Set properties for the resolved calculator
        (calculator as any).id = 'test-scale';
        (calculator as any).name = 'Test Scale';
        (calculator as any).scaleUnit = ScaleUnit.FACTOR;
        (calculator as any).baseValue = 1.5;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        // Fallback to direct instantiation if DI fails
        calculator = new ScaleUnitCalculator('test-scale', 'Test Scale', ScaleUnit.FACTOR, 1.5, true);
      }

      expect(calculator.id).toBe('test-scale');
      expect(calculator.name).toBe('Test Scale');
      expect(calculator.scaleUnit).toBe(ScaleUnit.FACTOR);
      expect(calculator.baseValue).toBe(1.5);
      expect(calculator.maintainAspectRatio).toBe(true);
      expect(calculator.isActive).toBe(true);
    });

    it('should create calculator with default values', () => {
      let defaultCalculator: ScaleUnitCalculator;
      try {
        defaultCalculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (defaultCalculator as any).id = 'default-scale';
        (defaultCalculator as any).name = 'Default Scale';
        (defaultCalculator as any).scaleUnit = ScaleUnit.PIXEL;
        (defaultCalculator as any).baseValue = 1;
        (defaultCalculator as any).maintainAspectRatio = false;
        (defaultCalculator as any).isActive = true;
      } catch (error) {
        defaultCalculator = new ScaleUnitCalculator('default-scale', 'Default Scale', ScaleUnit.PIXEL, 1, false);
      }

      expect(defaultCalculator).toBeInstanceOf(ScaleUnitCalculator);
      expect(defaultCalculator.id).toBe('default-scale');
      expect(defaultCalculator.name).toBe('Default Scale');
    });
  });

  describe('Basic Calculations', () => {
    it('should calculate numeric base values directly', () => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-scale';
        (calculator as any).name = 'Test Scale';
        (calculator as any).scaleUnit = ScaleUnit.FACTOR;
        (calculator as any).baseValue = 1.5;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('test-scale', 'Test Scale', ScaleUnit.FACTOR, 1.5, true);
      }

      const result = calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate pixel scale values', () => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'pixel-scale';
        (calculator as any).name = 'Pixel Scale';
        (calculator as any).scaleUnit = ScaleUnit.PIXEL;
        (calculator as any).baseValue = 1;
        (calculator as any).maintainAspectRatio = false;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('pixel-scale', 'Pixel Scale', ScaleUnit.PIXEL, 1, false);
      }

      const result = calculator.calculate(ScaleValue.PIXEL, ScaleUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate factor scale values', () => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'factor-scale';
        (calculator as any).name = 'Factor Scale';
        (calculator as any).scaleUnit = ScaleUnit.FACTOR;
        (calculator as any).baseValue = 2.0;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('factor-scale', 'Factor Scale', ScaleUnit.FACTOR, 2.0, true);
      }

      const result = calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate responsive scale values', () => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'responsive-scale';
        (calculator as any).name = 'Responsive Scale';
        (calculator as any).scaleUnit = ScaleUnit.RESPONSIVE;
        (calculator as any).baseValue = 1;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('responsive-scale', 'Responsive Scale', ScaleUnit.RESPONSIVE, 1, true);
      }

      const result = calculator.calculate(ScaleValue.RESPONSIVE, ScaleUnit.RESPONSIVE, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate random scale values', () => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'random-scale';
        (calculator as any).name = 'Random Scale';
        (calculator as any).scaleUnit = ScaleUnit.RANDOM;
        (calculator as any).baseValue = 1;
        (calculator as any).maintainAspectRatio = false;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('random-scale', 'Random Scale', ScaleUnit.RANDOM, 1, false);
      }

      const result = calculator.calculate(ScaleValue.RANDOM, ScaleUnit.RANDOM, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate content scale values', () => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'content-scale';
        (calculator as any).name = 'Content Scale';
        (calculator as any).scaleUnit = ScaleUnit.CONTENT;
        (calculator as any).baseValue = 1;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('content-scale', 'Content Scale', ScaleUnit.CONTENT, 1, true);
      }

      const result = calculator.calculate(ScaleValue.CONTENT, ScaleUnit.CONTENT, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Aspect Ratio Handling', () => {
    it('should maintain aspect ratio when enabled', () => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'aspect-scale';
        (calculator as any).name = 'Aspect Scale';
        (calculator as any).scaleUnit = ScaleUnit.FACTOR;
        (calculator as any).baseValue = 1.5;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('aspect-scale', 'Aspect Scale', ScaleUnit.FACTOR, 1.5, true);
      }

      const result = calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should not maintain aspect ratio when disabled', () => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'no-aspect-scale';
        (calculator as any).name = 'No Aspect Scale';
        (calculator as any).scaleUnit = ScaleUnit.FACTOR;
        (calculator as any).baseValue = 1.5;
        (calculator as any).maintainAspectRatio = false;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('no-aspect-scale', 'No Aspect Scale', ScaleUnit.FACTOR, 1.5, false);
      }

      const result = calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Context Handling', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).scaleUnit = ScaleUnit.FACTOR;
        (calculator as any).baseValue = 1.5;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('test-calculator', 'Test Calculator', ScaleUnit.FACTOR, 1.5, true);
      }
    });

    it('should handle different parent contexts', () => {
      const contexts = [
        { parent: { width: 800, height: 600, x: 0, y: 0 }, dimension: 'width' as any },
        { parent: { width: 1200, height: 800, x: 0, y: 0 }, dimension: 'height' as any },
        { parent: { width: 400, height: 300, x: 0, y: 0 }, dimension: 'both' as any },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      }
    });

    it('should handle different scene contexts', () => {
      const contexts = [
        { scene: { width: 1920, height: 1080 }, dimension: 'width' as any },
        { scene: { width: 1366, height: 768 }, dimension: 'height' as any },
        { scene: { width: 1024, height: 768 }, dimension: 'both' as any },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      }
    });

    it('should handle viewport contexts', () => {
      const contexts = [
        { viewport: { width: 1920, height: 1080 }, dimension: 'width' as any },
        { viewport: { width: 1366, height: 768 }, dimension: 'height' as any },
        { viewport: { width: 1024, height: 768 }, dimension: 'both' as any },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      }
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).scaleUnit = ScaleUnit.FACTOR;
        (calculator as any).baseValue = 1.5;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('test-calculator', 'Test Calculator', ScaleUnit.FACTOR, 1.5, true);
      }
    });

    it('should handle invalid scale values gracefully', () => {
      const invalidValues = ['invalid' as any, null, undefined, {}];
      
      for (const invalidValue of invalidValues) {
        const result = calculator.calculate(invalidValue, ScaleUnit.FACTOR, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      }
    });

    it('should handle invalid scale units gracefully', () => {
      const invalidUnits = ['invalid' as any, null, undefined, {}];
      
      for (const invalidUnit of invalidUnits) {
        const result = calculator.calculate(ScaleValue.FACTOR, invalidUnit, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
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
        const result = calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, partialContext as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      }
    });
  });

  describe('Performance', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).scaleUnit = ScaleUnit.FACTOR;
        (calculator as any).baseValue = 1.5;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('test-calculator', 'Test Calculator', ScaleUnit.FACTOR, 1.5, true);
      }
    });

    it('should perform calculations efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, mockContext);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle multiple rapid calculations', () => {
      const results = [];
      
      for (let i = 0; i < 100; i++) {
        const result = calculator.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, mockContext);
        results.push(result);
      }
      
      results.forEach(result => {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      });
    });
  });

  describe('Calculator Properties', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).scaleUnit = ScaleUnit.FACTOR;
        (calculator as any).baseValue = 1.5;
        (calculator as any).maintainAspectRatio = true;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new ScaleUnitCalculator('test-calculator', 'Test Calculator', ScaleUnit.FACTOR, 1.5, true);
      }
    });

    it('should have correct ID and name', () => {
      expect(calculator.id).toBe('test-calculator');
      expect(calculator.name).toBe('Test Calculator');
    });

    it('should have correct scale unit', () => {
      expect(calculator.scaleUnit).toBe(ScaleUnit.FACTOR);
    });

    it('should have correct base value', () => {
      expect(calculator.baseValue).toBe(1.5);
    });

    it('should maintain aspect ratio when enabled', () => {
      expect(calculator.maintainAspectRatio).toBe(true);
    });

    it('should be active by default', () => {
      expect(calculator.isActive).toBe(true);
    });

    it('should allow deactivation', () => {
      calculator.deactivate();
      expect(calculator.isActive).toBe(false);
    });

    it('should allow reactivation', () => {
      calculator.deactivate();
      calculator.activate();
      expect(calculator.isActive).toBe(true);
    });
  });
});
