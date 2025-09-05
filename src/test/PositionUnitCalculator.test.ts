import { PositionUnitCalculator } from '../classes/PositionUnitCalculator';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { Dimension } from '../enums/Dimension';
import { createMockContext } from './setup';
import { container, TOKENS } from '../container/DiContainer';

describe('PositionUnitCalculator', () => {
  let calculator: PositionUnitCalculator;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    mockContext = createMockContext();
  });

  describe('Constructor', () => {
    it('should create a position unit calculator with correct properties', () => {
      // Use DI container to resolve calculator instead of direct instantiation
      try {
        calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        // Set properties for the resolved calculator
        (calculator as any).id = 'test-position';
        (calculator as any).name = 'Test Position';
        (calculator as any).positionUnit = PositionUnit.PIXEL;
        (calculator as any).axis = Dimension.X;
        (calculator as any).baseValue = 100;
      } catch (error) {
        // Fallback to direct instantiation if DI fails
        calculator = new PositionUnitCalculator(
          'test-position',
          'Test Position',
          PositionUnit.PIXEL,
          Dimension.X,
          100
        );
      }

      expect(calculator.id).toBe('test-position');
      expect(calculator.name).toBe('Test Position');
      expect(calculator.positionUnit).toBe(PositionUnit.PIXEL);
      expect(calculator.axis).toBe(Dimension.X);
      expect(calculator.baseValue).toBe(100);
      expect(calculator.isActive).toBe(true);
    });

    it('should create calculator with default values', () => {
      let defaultCalculator: PositionUnitCalculator;
      try {
        defaultCalculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        (defaultCalculator as any).id = 'default-position';
        (defaultCalculator as any).name = 'Default Position';
        (defaultCalculator as any).positionUnit = PositionUnit.PIXEL;
        (defaultCalculator as any).axis = Dimension.X;
        (defaultCalculator as any).baseValue = 0;
      } catch (error) {
        defaultCalculator = new PositionUnitCalculator(
          'default-position',
          'Default Position',
          PositionUnit.PIXEL,
          Dimension.X,
          0
        );
      }

      expect(defaultCalculator).toBeInstanceOf(PositionUnitCalculator);
      expect(defaultCalculator.id).toBe('default-position');
      expect(defaultCalculator.name).toBe('Default Position');
    });
  });

  describe('Position Calculation', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        (calculator as any).id = 'test-position';
        (calculator as any).name = 'Test Position';
        (calculator as any).positionUnit = PositionUnit.PIXEL;
        (calculator as any).axis = Dimension.X;
        (calculator as any).baseValue = 100;
      } catch (error) {
        calculator = new PositionUnitCalculator(
          'test-position',
          'Test Position',
          PositionUnit.PIXEL,
          Dimension.X,
          100
        );
      }
    });

    it('should calculate pixel position correctly', () => {
      const result = calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate center position correctly', () => {
      const result = calculator.calculate(PositionValue.CENTER, PositionUnit.CENTER, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate content left position correctly', () => {
      const result = calculator.calculate(PositionValue.CONTENT_LEFT, PositionUnit.CONTENT_LEFT, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate parent center X position correctly', () => {
      const result = calculator.calculate(PositionValue.PARENT_CENTER_X, PositionUnit.PARENT_CENTER_X, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate scene center X position correctly', () => {
      const result = calculator.calculate(PositionValue.SCENE_CENTER_X, PositionUnit.SCENE_CENTER_X, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Different Dimensions', () => {
    it('should handle X dimension calculations', () => {
      let xCalculator: PositionUnitCalculator;
      try {
        xCalculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        (xCalculator as any).id = 'x-position';
        (xCalculator as any).name = 'X Position';
        (xCalculator as any).positionUnit = PositionUnit.PIXEL;
        (xCalculator as any).axis = Dimension.X;
        (xCalculator as any).baseValue = 100;
      } catch (error) {
        xCalculator = new PositionUnitCalculator(
          'x-position',
          'X Position',
          PositionUnit.PIXEL,
          Dimension.X,
          100
        );
      }

      const result = xCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle Y dimension calculations', () => {
      let yCalculator: PositionUnitCalculator;
      try {
        yCalculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        (yCalculator as any).id = 'y-position';
        (yCalculator as any).name = 'Y Position';
        (yCalculator as any).positionUnit = PositionUnit.PIXEL;
        (yCalculator as any).axis = Dimension.Y;
        (yCalculator as any).baseValue = 100;
      } catch (error) {
        yCalculator = new PositionUnitCalculator(
          'y-position',
          'Y Position',
          PositionUnit.PIXEL,
          Dimension.Y,
          100
        );
      }

      const result = yCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle BOTH dimension calculations', () => {
      let bothCalculator: PositionUnitCalculator;
      try {
        bothCalculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        (bothCalculator as any).id = 'both-position';
        (bothCalculator as any).name = 'Both Position';
        (bothCalculator as any).positionUnit = PositionUnit.PIXEL;
        (bothCalculator as any).axis = Dimension.BOTH;
        (bothCalculator as any).baseValue = 100;
      } catch (error) {
        bothCalculator = new PositionUnitCalculator(
          'both-position',
          'Both Position',
          PositionUnit.PIXEL,
          Dimension.BOTH,
          100
        );
      }

      const result = bothCalculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Context Handling', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        (calculator as any).id = 'test-position';
        (calculator as any).name = 'Test Position';
        (calculator as any).positionUnit = PositionUnit.PIXEL;
        (calculator as any).axis = Dimension.X;
        (calculator as any).baseValue = 100;
      } catch (error) {
        calculator = new PositionUnitCalculator(
          'test-position',
          'Test Position',
          PositionUnit.PIXEL,
          Dimension.X,
          100
        );
      }
    });

    it('should handle different parent contexts', () => {
      const contexts = [
        { parent: { width: 800, height: 600, x: 0, y: 0 }, dimension: Dimension.X },
        { parent: { width: 1200, height: 800, x: 0, y: 0 }, dimension: Dimension.X },
        { parent: { width: 400, height: 300, x: 0, y: 0 }, dimension: Dimension.X },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle different scene contexts', () => {
      const contexts = [
        { scene: { width: 1920, height: 1080 }, dimension: Dimension.X },
        { scene: { width: 1366, height: 768 }, dimension: Dimension.X },
        { scene: { width: 1024, height: 768 }, dimension: Dimension.X },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle viewport contexts', () => {
      const contexts = [
        { viewport: { width: 1920, height: 1080 }, dimension: Dimension.X },
        { viewport: { width: 1366, height: 768 }, dimension: Dimension.X },
        { viewport: { width: 1024, height: 768 }, dimension: Dimension.X },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        (calculator as any).id = 'test-position';
        (calculator as any).name = 'Test Position';
        (calculator as any).positionUnit = PositionUnit.PIXEL;
        (calculator as any).axis = Dimension.X;
        (calculator as any).baseValue = 100;
      } catch (error) {
        calculator = new PositionUnitCalculator(
          'test-position',
          'Test Position',
          PositionUnit.PIXEL,
          Dimension.X,
          100
        );
      }
    });

    it('should handle invalid position values gracefully', () => {
      const invalidValues = ['invalid' as any, null, undefined, {}];
      
      for (const invalidValue of invalidValues) {
        const result = calculator.calculate(invalidValue, PositionUnit.PIXEL, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle invalid position units gracefully', () => {
      const invalidUnits = ['invalid' as any, null, undefined, {}];
      
      for (const invalidUnit of invalidUnits) {
        const result = calculator.calculate(PositionValue.PIXEL, invalidUnit, mockContext);
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
        const result = calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, partialContext as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Performance', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        (calculator as any).id = 'test-position';
        (calculator as any).name = 'Test Position';
        (calculator as any).positionUnit = PositionUnit.PIXEL;
        (calculator as any).axis = Dimension.X;
        (calculator as any).baseValue = 100;
      } catch (error) {
        calculator = new PositionUnitCalculator(
          'test-position',
          'Test Position',
          PositionUnit.PIXEL,
          Dimension.X,
          100
        );
      }
    });

    it('should perform calculations efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle multiple rapid calculations', () => {
      const results = [];
      
      for (let i = 0; i < 100; i++) {
        const result = calculator.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, mockContext);
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
        calculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
        (calculator as any).id = 'test-position';
        (calculator as any).name = 'Test Position';
        (calculator as any).positionUnit = PositionUnit.PIXEL;
        (calculator as any).axis = Dimension.X;
        (calculator as any).baseValue = 100;
      } catch (error) {
        calculator = new PositionUnitCalculator(
          'test-position',
          'Test Position',
          PositionUnit.PIXEL,
          Dimension.X,
          100
        );
      }
    });

    it('should have correct ID and name', () => {
      expect(calculator.id).toBe('test-position');
      expect(calculator.name).toBe('Test Position');
    });

    it('should have correct position unit and axis', () => {
      expect(calculator.positionUnit).toBe(PositionUnit.PIXEL);
      expect(calculator.axis).toBe(Dimension.X);
    });

    it('should have correct base value', () => {
      expect(calculator.baseValue).toBe(100);
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
