import { ValidationDecorator } from '../decorators/ValidationDecorator';
import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { PositionUnitCalculator } from '../classes/PositionUnitCalculator';
import { ScaleUnitCalculator } from '../classes/ScaleUnitCalculator';
import { UnitType } from '../enums/UnitType';
import { VALIDATION_CONSTANTS } from '../constants';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { IUnit } from '../interfaces/IUnit';
import { UnitContext } from '../interfaces/IUnit';
import { container, TOKENS } from '../container/DiContainer';

// Mock unit for testing
class MockUnit implements IUnit {
  id = 'mock-unit';
  name = 'MockUnit';
  unitType = UnitType.SIZE;
  isActive = true;

  calculate(_context: UnitContext): number {
    return 100; // Default mock result
  }

  validate(_context: UnitContext): boolean {
    return true;
  }

  isResponsive(): boolean {
    return true;
  }

  toString(): string {
    return `MockUnit(${this.id})`;
  }

  clone(_overrides?: Partial<IUnit>): IUnit {
    // Use DI container to resolve MockUnit instead of direct instantiation
    try {
      return container.resolve(TOKENS.MOCK_UNIT);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      return new MockUnit();
    }
  }
}

describe('ValidationDecorator', () => {
  let mockUnit: MockUnit;
  let validationDecorator: ValidationDecorator;
  let sizeCalculator: SizeUnitCalculator;
  let positionCalculator: PositionUnitCalculator;
  let scaleCalculator: ScaleUnitCalculator;

  beforeEach(() => {
    // Use DI container to resolve dependencies instead of direct instantiation
    try {
      mockUnit = container.resolve(TOKENS.MOCK_UNIT);
      validationDecorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
      sizeCalculator = container.resolve(TOKENS.SIZE_UNIT_CALCULATOR);
      positionCalculator = container.resolve(TOKENS.POSITION_UNIT_CALCULATOR);
      scaleCalculator = container.resolve(TOKENS.SCALE_UNIT_CALCULATOR);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      mockUnit = new MockUnit();
      validationDecorator = new ValidationDecorator('test-validation', 'TestValidation', mockUnit);
      sizeCalculator = new SizeUnitCalculator(
        'size-calc',
        'SizeCalculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false
      );
      positionCalculator = new PositionUnitCalculator(
        'position-calc',
        'PositionCalculator',
        PositionUnit.CENTER,
        Dimension.X,
        0,
        false
      );
      scaleCalculator = new ScaleUnitCalculator(
        'scale-calc',
        'ScaleCalculator',
        ScaleUnit.FACTOR,
        1.0,
        false
      );
    }
  });

  describe('constructor', () => {
    it('should create validation decorator with correct properties', () => {
      expect(validationDecorator).toBeInstanceOf(ValidationDecorator);
      expect(validationDecorator.id).toBe('test-validation');
      expect(validationDecorator.name).toBe('TestValidation');
    });

    it('should wrap the provided unit', () => {
      expect(validationDecorator.getWrappedUnit()).toBe(mockUnit);
    });
  });

  describe('validation', () => {
    it('should validate unit successfully', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = validationDecorator.validate(context);
      expect(result).toBe(true);
    });

    it('should validate size calculator', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = validationDecorator.validate(sizeCalculator, context);
      expect(result).toBe(true);
    });

    it('should validate position calculator', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = validationDecorator.validate(positionCalculator, context);
      expect(result).toBe(true);
    });

    it('should validate scale calculator', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = validationDecorator.validate(scaleCalculator, context);
      expect(result).toBe(true);
    });

    it('should handle validation errors gracefully', () => {
      const invalidContext = null as any;
      const result = validationDecorator.validate(invalidContext);
      expect(result).toBe(false);
    });
  });

  describe('calculation', () => {
    it('should calculate unit value', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = validationDecorator.calculate(context);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate size calculator value', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = validationDecorator.calculate(sizeCalculator, context);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate position calculator value', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = validationDecorator.calculate(positionCalculator, context);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate scale calculator value', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const result = validationDecorator.calculate(scaleCalculator, context);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle calculation errors gracefully', () => {
      const invalidContext = null as any;
      const result = validationDecorator.calculate(invalidContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('decorator functionality', () => {
    it('should delegate to wrapped unit', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const wrappedResult = mockUnit.calculate(context);
      const decoratedResult = validationDecorator.calculate(context);

      expect(decoratedResult).toBe(wrappedResult);
    });

    it('should maintain unit properties', () => {
      expect(validationDecorator.id).toBe('test-validation');
      expect(validationDecorator.name).toBe('TestValidation');
      expect(validationDecorator.unitType).toBe(mockUnit.unitType);
      expect(validationDecorator.isActive).toBe(mockUnit.isActive);
    });

    it('should maintain unit methods', () => {
      expect(validationDecorator.isResponsive()).toBe(mockUnit.isResponsive());
      expect(validationDecorator.toString()).toContain('ValidationDecorator');
    });
  });

  describe('error handling', () => {
    it('should handle wrapped unit errors gracefully', () => {
      // Mock a failing wrapped unit
      const failingUnit = {
        id: 'failing-unit',
        name: 'Failing Unit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: jest.fn().mockImplementation(() => {
          throw new Error('Calculation failed');
        }),
        validate: jest.fn().mockReturnValue(true),
        isResponsive: jest.fn().mockReturnValue(true),
        toString: jest.fn().mockReturnValue('FailingUnit(failing-unit)'),
        clone: jest.fn().mockReturnValue({}),
      } as IUnit;

      let failingDecorator: ValidationDecorator;
      try {
        failingDecorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
        (failingDecorator as any).wrappedUnit = failingUnit;
      } catch (error) {
        failingDecorator = new ValidationDecorator('failing-validation', 'FailingValidation', failingUnit);
      }

      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      expect(() => failingDecorator.calculate(context)).toThrow('Calculation failed');
    });

    it('should handle missing context gracefully', () => {
      const result = validationDecorator.calculate(null as any);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('performance', () => {
    it('should perform validation efficiently', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        validationDecorator.validate(context);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should perform calculation efficiently', () => {
      const context = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1920, height: 1080 },
        viewport: { width: 1366, height: 768 },
      };

      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        validationDecorator.calculate(context);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });
  });

  describe('integration', () => {
    it('should work with different unit types', () => {
      const unitTypes = [UnitType.SIZE, UnitType.POSITION, UnitType.SCALE];
      
      for (const unitType of unitTypes) {
        let typeUnit: MockUnit;
        try {
          typeUnit = container.resolve(TOKENS.MOCK_UNIT);
          (typeUnit as any).unitType = unitType;
        } catch (error) {
          typeUnit = new MockUnit();
          (typeUnit as any).unitType = unitType;
        }

        let typeDecorator: ValidationDecorator;
        try {
          typeDecorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
          (typeDecorator as any).wrappedUnit = typeUnit;
        } catch (error) {
          typeDecorator = new ValidationDecorator(`validation-${unitType}`, `Validation${unitType}`, typeUnit);
        }

        const context = {
          parent: { width: 800, height: 600, x: 0, y: 0 },
          scene: { width: 1920, height: 1080 },
          viewport: { width: 1366, height: 768 },
        };

        const result = typeDecorator.calculate(context);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should work with different calculator types', () => {
      const calculators = [
        { type: 'size', calculator: sizeCalculator },
        { type: 'position', calculator: positionCalculator },
        { type: 'scale', calculator: scaleCalculator },
      ];

      for (const { type, calculator } of calculators) {
        let typeDecorator: ValidationDecorator;
        try {
          typeDecorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
          (typeDecorator as any).wrappedUnit = calculator;
        } catch (error) {
          typeDecorator = new ValidationDecorator(`validation-${type}`, `Validation${type}`, calculator as any);
        }

        const context = {
          parent: { width: 800, height: 600, x: 0, y: 0 },
          scene: { width: 1920, height: 1080 },
          viewport: { width: 1366, height: 768 },
        };

        const result = typeDecorator.calculate(context);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
