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
import { createMockUnit, createMockContext, createMockValidator } from './test-utils';

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
    return createMockUnit();
  }
}

describe('ValidationDecorator', () => {
  let decorator: ValidationDecorator;
  let mockUnit: MockUnit;
  let mockContext: UnitContext;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('constructor', () => {
    it('should create decorator with default settings', () => {
      testDefaultDecoratorCreation();
    });

    it('should create decorator with custom settings', () => {
      testCustomDecoratorCreation();
    });

    it('should handle invalid settings gracefully', () => {
      testInvalidSettingsHandling();
    });
  });

  describe('validation', () => {
    it('should validate input successfully', () => {
      testInputValidation();
    });

    it('should validate context successfully', () => {
      testContextValidation();
    });

    it('should validate unit successfully', () => {
      testUnitValidation();
    });

    it('should handle validation errors gracefully', () => {
      testValidationErrorHandling();
    });
  });

  describe('decorator functionality', () => {
    it('should wrap unit with validation', () => {
      testUnitWrapping();
    });

    it('should calculate with validation', () => {
      testCalculationWithValidation();
    });

    it('should handle calculation errors gracefully', () => {
      testCalculationErrorHandling();
    });
  });

  describe('performance', () => {
    it('should perform validation efficiently', () => {
      testValidationEfficiency();
    });

    it('should handle multiple validations', () => {
      testMultipleValidations();
    });
  });

  describe('integration', () => {
    it('should work with different unit types', () => {
      testDifferentUnitTypes();
    });

    it('should work with different contexts', () => {
      testDifferentContexts();
    });

    it('should work with different validators', () => {
      testDifferentValidators();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    createMockUnit();
    createMockContext();
    initializeDecorator();
  }

  function createMockUnit(): void {
    mockUnit = new MockUnit();
  }

  function createMockContext(): void {
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };
  }

  function initializeDecorator(): void {
    try {
      decorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
      setDecoratorProperties(decorator);
    } catch (error) {
      decorator = new ValidationDecorator(mockUnit, VALIDATION_CONSTANTS.STRICT_MODE);
    }
  }

  function setDecoratorProperties(decorator: ValidationDecorator): void {
    (decorator as any).unit = mockUnit;
    (decorator as any).strictMode = VALIDATION_CONSTANTS.STRICT_MODE;
  }

  function testDefaultDecoratorCreation(): void {
    const defaultDecorator = createDefaultDecorator();
    
    expect(defaultDecorator).toBeInstanceOf(ValidationDecorator);
    expect(defaultDecorator.unit).toBeDefined();
  }

  function createDefaultDecorator(): ValidationDecorator {
    try {
      const decorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
      setDefaultDecoratorProperties(decorator);
      return decorator;
    } catch (error) {
      return new ValidationDecorator(mockUnit, VALIDATION_CONSTANTS.STRICT_MODE);
    }
  }

  function setDefaultDecoratorProperties(decorator: ValidationDecorator): void {
    (decorator as any).unit = mockUnit;
    (decorator as any).strictMode = VALIDATION_CONSTANTS.STRICT_MODE;
  }

  function testCustomDecoratorCreation(): void {
    const customDecorator = createCustomDecorator();
    
    expect(customDecorator).toBeInstanceOf(ValidationDecorator);
    expect(customDecorator.unit).toBeDefined();
  }

  function createCustomDecorator(): ValidationDecorator {
    try {
      const decorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
      setCustomDecoratorProperties(decorator);
      return decorator;
    } catch (error) {
      return new ValidationDecorator(mockUnit, true);
    }
  }

  function setCustomDecoratorProperties(decorator: ValidationDecorator): void {
    (decorator as any).unit = mockUnit;
    (decorator as any).strictMode = true;
  }

  function testInvalidSettingsHandling(): void {
    const invalidDecorator = createInvalidDecorator();
    
    expect(invalidDecorator).toBeInstanceOf(ValidationDecorator);
    expect(() => invalidDecorator.calculate(mockContext)).not.toThrow();
  }

  function createInvalidDecorator(): ValidationDecorator {
    try {
      const decorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
      setInvalidDecoratorProperties(decorator);
      return decorator;
    } catch (error) {
      return new ValidationDecorator(null as any, null as any);
    }
  }

  function setInvalidDecoratorProperties(decorator: ValidationDecorator): void {
    (decorator as any).unit = null;
    (decorator as any).strictMode = null;
  }

  function testInputValidation(): void {
    const validInput = createValidInput();
    const isValid = decorator.validateInput(validInput);
    
    expect(typeof isValid).toBe('boolean');
  }

  function createValidInput(): any {
    return {
      value: 100,
      unit: SizeUnit.PIXEL,
      dimension: Dimension.WIDTH,
    };
  }

  function testContextValidation(): void {
    const isValid = decorator.validateContext(mockContext);
    
    expect(typeof isValid).toBe('boolean');
  }

  function testUnitValidation(): void {
    const isValid = decorator.validateUnit(mockUnit);
    
    expect(typeof isValid).toBe('boolean');
  }

  function testValidationErrorHandling(): void {
    const invalidInput = createInvalidInput();
    
    expect(() => decorator.validateInput(invalidInput)).not.toThrow();
  }

  function createInvalidInput(): any {
    return {
      value: null,
      unit: null,
      dimension: null,
    };
  }

  function testUnitWrapping(): void {
    const wrappedUnit = decorator.wrapUnit(mockUnit);
    
    expect(wrappedUnit).toBeDefined();
    expect(typeof wrappedUnit.calculate).toBe('function');
    expect(typeof wrappedUnit.validate).toBe('function');
  }

  function testCalculationWithValidation(): void {
    const result = decorator.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testCalculationErrorHandling(): void {
    const problematicContext = createProblematicContext();
    
    expect(() => decorator.calculate(problematicContext)).not.toThrow();
  }

  function createProblematicContext(): UnitContext {
    return {
      parent: null,
      scene: null,
      viewport: null,
      content: null,
    } as any;
  }

  function testValidationEfficiency(): void {
    const inputs = createValidationInputs();
    const startTime = performance.now();
    
    inputs.forEach(input => {
      decorator.validateInput(input);
    });
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function createValidationInputs(): any[] {
    return [
      { value: 100, unit: SizeUnit.PIXEL, dimension: Dimension.WIDTH },
      { value: 200, unit: SizeUnit.FILL, dimension: Dimension.HEIGHT },
      { value: 1.5, unit: ScaleUnit.FACTOR, dimension: Dimension.WIDTH },
    ];
  }

  function testMultipleValidations(): void {
    const inputs = createMultipleInputs();
    
    inputs.forEach(input => {
      const isValid = decorator.validateInput(input);
      expect(typeof isValid).toBe('boolean');
    });
  }

  function createMultipleInputs(): any[] {
    const inputs = [];
    for (let i = 0; i < 100; i++) {
      inputs.push({
        value: i,
        unit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
      });
    }
    return inputs;
  }

  function testDifferentUnitTypes(): void {
    const unitTypes = createDifferentUnitTypes();
    
    for (const unitType of unitTypes) {
      const testUnit = createUnitWithType(unitType);
      const testDecorator = createDecoratorWithUnit(testUnit);
      
      const result = testDecorator.calculate(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentUnitTypes(): UnitType[] {
    return [UnitType.SIZE, UnitType.POSITION, UnitType.SCALE];
  }

  function createUnitWithType(unitType: UnitType): IUnit {
    return {
      id: `test-unit-${unitType}`,
      name: `Test Unit ${unitType}`,
      unitType: unitType,
      isActive: true,
      calculate: () => 100,
      validate: () => true,
      isResponsive: () => true,
      toString: () => `TestUnit(${unitType})`,
      clone: () => createUnitWithType(unitType),
    };
  }

  function createDecoratorWithUnit(unit: IUnit): ValidationDecorator {
    try {
      const decorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
      setDecoratorWithUnit(decorator, unit);
      return decorator;
    } catch (error) {
      return new ValidationDecorator(unit, VALIDATION_CONSTANTS.STRICT_MODE);
    }
  }

  function setDecoratorWithUnit(decorator: ValidationDecorator, unit: IUnit): void {
    (decorator as any).unit = unit;
    (decorator as any).strictMode = VALIDATION_CONSTANTS.STRICT_MODE;
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const result = decorator.calculate(context);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentContexts(): UnitContext[] {
    return [
      mockContext,
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' },
    ];
  }

  function testDifferentValidators(): void {
    const validators = createDifferentValidators();
    
    for (const validator of validators) {
      const testDecorator = createDecoratorWithValidator(validator);
      
      const result = testDecorator.calculate(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentValidators(): any[] {
    return [
      { strictMode: true, validationRules: ['required', 'type'] },
      { strictMode: false, validationRules: ['required'] },
      { strictMode: true, validationRules: ['required', 'type', 'range'] },
    ];
  }

  function createDecoratorWithValidator(validator: any): ValidationDecorator {
    try {
      const decorator = container.resolve(TOKENS.VALIDATION_DECORATOR);
      setDecoratorWithValidator(decorator, validator);
      return decorator;
    } catch (error) {
      return new ValidationDecorator(mockUnit, validator.strictMode);
    }
  }

  function setDecoratorWithValidator(decorator: ValidationDecorator, validator: any): void {
    (decorator as any).unit = mockUnit;
    (decorator as any).strictMode = validator.strictMode;
    (decorator as any).validationRules = validator.validationRules;
  }

});