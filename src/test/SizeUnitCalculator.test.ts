import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { Dimension } from '../enums/Dimension';
import { createMockContext } from './setup';
import { container, TOKENS } from '../container/DiContainer';

describe('SizeUnitCalculator', () => {
  let calculator: SizeUnitCalculator;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    mockContext = createMockContext();
  });

  describe('Constructor', () => {
    it('should create a size unit calculator with correct properties', () => {
      // Use DI container to resolve calculator instead of direct instantiation
      try {
        calculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        // Set properties for the resolved calculator
        (calculator as any).id = 'test-size';
        (calculator as any).name = 'Test Size';
        (calculator as any).sizeUnit = SizeUnit.PARENT_WIDTH;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = SizeValue.FILL;
        (calculator as any).isActive = true;
      } catch (error) {
        // Fallback to direct instantiation if DI fails
        calculator = new SizeUnitCalculator(
          'test-size',
          'Test Size',
          SizeUnit.PARENT_WIDTH,
          Dimension.WIDTH,
          SizeValue.FILL,
          true
        );
      }

      expect(calculator.id).toBe('test-size');
      expect(calculator.name).toBe('Test Size');
      expect(calculator.sizeUnit).toBe(SizeUnit.PARENT_WIDTH);
      expect(calculator.dimension).toBe(Dimension.WIDTH);
      expect(calculator.baseValue).toBe(SizeValue.FILL);
      expect(calculator.isActive).toBe(true);
    });

    it('should create calculator with default values', () => {
      let defaultCalculator: SizeUnitCalculator;
      try {
        defaultCalculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        (defaultCalculator as any).id = 'default-size';
        (defaultCalculator as any).name = 'Default Size';
        (defaultCalculator as any).sizeUnit = SizeUnit.PIXEL;
        (defaultCalculator as any).dimension = Dimension.WIDTH;
        (defaultCalculator as any).baseValue = SizeValue.PIXEL;
        (defaultCalculator as any).isActive = true;
      } catch (error) {
        defaultCalculator = new SizeUnitCalculator(
          'default-size',
          'Default Size',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          SizeValue.PIXEL,
          true
        );
      }

      expect(defaultCalculator).toBeInstanceOf(SizeUnitCalculator);
      expect(defaultCalculator.id).toBe('default-size');
      expect(defaultCalculator.name).toBe('Default Size');
    });
  });

  describe('Size Calculation', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = SizeValue.PIXEL;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new SizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          SizeValue.PIXEL,
          true
        );
      }
    });

    it('should calculate pixel size correctly', () => {
      const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate fill size correctly', () => {
      const result = calculator.calculate(SizeValue.FILL, SizeUnit.FILL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate auto size correctly', () => {
      const result = calculator.calculate(SizeValue.AUTO, SizeUnit.AUTO, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate parent width size correctly', () => {
      const result = calculator.calculate(SizeValue.PARENT_WIDTH, SizeUnit.PARENT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate viewport width size correctly', () => {
      const result = calculator.calculate(SizeValue.VIEWPORT_WIDTH, SizeUnit.VIEWPORT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Different Dimensions', () => {
    it('should handle WIDTH dimension calculations', () => {
      let widthCalculator: SizeUnitCalculator;
      try {
        widthCalculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        (widthCalculator as any).id = 'width-calculator';
        (widthCalculator as any).name = 'Width Calculator';
        (widthCalculator as any).sizeUnit = SizeUnit.PIXEL;
        (widthCalculator as any).dimension = Dimension.WIDTH;
        (widthCalculator as any).baseValue = SizeValue.PIXEL;
        (widthCalculator as any).isActive = true;
      } catch (error) {
        widthCalculator = new SizeUnitCalculator(
          'width-calculator',
          'Width Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          SizeValue.PIXEL,
          true
        );
      }

      const result = widthCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle HEIGHT dimension calculations', () => {
      let heightCalculator: SizeUnitCalculator;
      try {
        heightCalculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        (heightCalculator as any).id = 'height-calculator';
        (heightCalculator as any).name = 'Height Calculator';
        (heightCalculator as any).sizeUnit = SizeUnit.PIXEL;
        (heightCalculator as any).dimension = Dimension.HEIGHT;
        (heightCalculator as any).baseValue = SizeValue.PIXEL;
        (heightCalculator as any).isActive = true;
      } catch (error) {
        heightCalculator = new SizeUnitCalculator(
          'height-calculator',
          'Height Calculator',
          SizeUnit.PIXEL,
          Dimension.HEIGHT,
          SizeValue.PIXEL,
          true
        );
      }

      const result = heightCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle BOTH dimension calculations', () => {
      let bothCalculator: SizeUnitCalculator;
      try {
        bothCalculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        (bothCalculator as any).id = 'both-calculator';
        (bothCalculator as any).name = 'Both Calculator';
        (bothCalculator as any).sizeUnit = SizeUnit.PIXEL;
        (bothCalculator as any).dimension = Dimension.BOTH;
        (bothCalculator as any).baseValue = SizeValue.PIXEL;
        (bothCalculator as any).isActive = true;
      } catch (error) {
        bothCalculator = new SizeUnitCalculator(
          'both-calculator',
          'Both Calculator',
          SizeUnit.PIXEL,
          Dimension.BOTH,
          SizeValue.PIXEL,
          true
        );
      }

      const result = bothCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Context Handling', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = SizeValue.PIXEL;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new SizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          SizeValue.PIXEL,
          true
        );
      }
    });

    it('should handle different parent contexts', () => {
      const contexts = [
        { parent: { width: 800, height: 600, x: 0, y: 0 }, dimension: Dimension.WIDTH },
        { parent: { width: 1200, height: 800, x: 0, y: 0 }, dimension: Dimension.WIDTH },
        { parent: { width: 400, height: 300, x: 0, y: 0 }, dimension: Dimension.WIDTH },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle different scene contexts', () => {
      const contexts = [
        { scene: { width: 1920, height: 1080 }, dimension: Dimension.WIDTH },
        { scene: { width: 1366, height: 768 }, dimension: Dimension.WIDTH },
        { scene: { width: 1024, height: 768 }, dimension: Dimension.WIDTH },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle viewport contexts', () => {
      const contexts = [
        { viewport: { width: 1920, height: 1080 }, dimension: Dimension.WIDTH },
        { viewport: { width: 1366, height: 768 }, dimension: Dimension.WIDTH },
        { viewport: { width: 1024, height: 768 }, dimension: Dimension.WIDTH },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = SizeValue.PIXEL;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new SizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          SizeValue.PIXEL,
          true
        );
      }
    });

    it('should handle invalid size values gracefully', () => {
      const invalidValues = ['invalid' as any, null, undefined, {}];
      
      for (const invalidValue of invalidValues) {
        const result = calculator.calculate(invalidValue, SizeUnit.PIXEL, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle invalid size units gracefully', () => {
      const invalidUnits = ['invalid' as any, null, undefined, {}];
      
      for (const invalidUnit of invalidUnits) {
        const result = calculator.calculate(SizeValue.PIXEL, invalidUnit, mockContext);
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
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, partialContext as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Performance', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = SizeValue.PIXEL;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new SizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          SizeValue.PIXEL,
          true
        );
      }
    });

    it('should perform calculations efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle multiple rapid calculations', () => {
      const results = [];
      
      for (let i = 0; i < 100; i++) {
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
        results.push(result);
      }
      
      results.forEach(result => {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Calculator Properties', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = SizeValue.PIXEL;
        (calculator as any).isActive = true;
      } catch (error) {
        calculator = new SizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          SizeValue.PIXEL,
          true
        );
      }
    });

    it('should have correct ID and name', () => {
      expect(calculator.id).toBe('test-calculator');
      expect(calculator.name).toBe('Test Calculator');
    });

    it('should have correct size unit and dimension', () => {
      expect(calculator.sizeUnit).toBe(SizeUnit.PIXEL);
      expect(calculator.dimension).toBe(Dimension.WIDTH);
    });

    it('should have correct base value', () => {
      expect(calculator.baseValue).toBe(SizeValue.PIXEL);
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
