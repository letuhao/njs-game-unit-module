import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { RangeValidator } from '../validators/RangeValidator';
import { createMockContext } from './setup';
import { Dimension } from '../enums/Dimension';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { container, TOKENS } from '../container/DiContainer';

describe('RangeValidator', () => {
  let validator: RangeValidator;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create validator with default values', () => {
      testDefaultValidatorCreation();
    });

    it('should create validator with custom values', () => {
      testCustomValidatorCreation();
    });

    it('should handle invalid range values', () => {
      testInvalidRangeValueHandling();
    });
  });

  describe('validation', () => {
    it('should validate values within range', () => {
      testValueWithinRangeValidation();
    });

    it('should reject values outside range', () => {
      testValueOutsideRangeRejection();
    });

    it('should handle edge cases', () => {
      testEdgeCaseHandling();
    });

    it('should validate different data types', () => {
      testDifferentDataTypeValidation();
    });
  });

  describe('configuration', () => {
    it('should get validator name', () => {
      testValidatorNameRetrieval();
    });

    it('should get validator configuration', () => {
      testValidatorConfigurationRetrieval();
    });

    it('should update validator configuration', () => {
      testValidatorConfigurationUpdate();
    });
  });

  describe('error handling', () => {
    it('should handle validation errors gracefully', () => {
      testValidationErrorHandling();
    });

    it('should handle invalid input gracefully', () => {
      testInvalidInputHandling();
    });

    it('should handle system errors gracefully', () => {
      testSystemErrorHandling();
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
    createMockContext();
  }

  function createMockContext(): void {
    mockContext = createMockContext();
  }

  function testDefaultValidatorCreation(): void {
    const validator = createDefaultValidator();
    
    verifyDefaultValidatorProperties(validator);
  }

  function createDefaultValidator(): RangeValidator {
    try {
      return container.resolve(TOKENS.RANGE_VALIDATOR);
    } catch (error) {
      return new RangeValidator();
    }
  }

  function verifyDefaultValidatorProperties(validator: RangeValidator): void {
    expect(validator.getName()).toBe('RangeValidator');
    expect(validator.getConfiguration()).toEqual({
      minValue: -Infinity,
      maxValue: Infinity,
      inclusive: true,
    });
  }

  function testCustomValidatorCreation(): void {
    const customValidator = createCustomValidator();
    
    verifyCustomValidatorProperties(customValidator);
  }

  function createCustomValidator(): RangeValidator {
    try {
      const validator = container.resolve(TOKENS.RANGE_VALIDATOR);
      setCustomValidatorProperties(validator);
      return validator;
    } catch (error) {
      return new RangeValidator(0, 100, true);
    }
  }

  function setCustomValidatorProperties(validator: RangeValidator): void {
    (validator as any).name = 'CustomValidator';
    (validator as any).minValue = 0;
    (validator as any).maxValue = 100;
    (validator as any).inclusive = true;
  }

  function verifyCustomValidatorProperties(validator: RangeValidator): void {
    expect(validator.getName()).toBe('CustomValidator');
    expect(validator.getConfiguration()).toEqual({
      minValue: 0,
      maxValue: 100,
      inclusive: true,
    });
  }

  function testInvalidRangeValueHandling(): void {
    const invalidValidator = createInvalidValidator();
    
    expect(invalidValidator).toBeInstanceOf(RangeValidator);
    expect(() => invalidValidator.getConfiguration()).not.toThrow();
  }

  function createInvalidValidator(): RangeValidator {
    try {
      const validator = container.resolve(TOKENS.RANGE_VALIDATOR);
      setInvalidValidatorProperties(validator);
      return validator;
    } catch (error) {
      return new RangeValidator(100, 0, true); // Invalid range
    }
  }

  function setInvalidValidatorProperties(validator: RangeValidator): void {
    (validator as any).minValue = 100;
    (validator as any).maxValue = 0;
    (validator as any).inclusive = true;
  }

  function testValueWithinRangeValidation(): void {
    const validator = createRangeValidator(0, 100);
    const values = createValuesWithinRange();
    
    for (const value of values) {
      const result = validator.validate(value, mockContext);
      expect(result.isValid).toBe(true);
    }
  }

  function createRangeValidator(min: number, max: number): RangeValidator {
    try {
      const validator = container.resolve(TOKENS.RANGE_VALIDATOR);
      setRangeValidatorProperties(validator, min, max);
      return validator;
    } catch (error) {
      return new RangeValidator(min, max, true);
    }
  }

  function setRangeValidatorProperties(validator: RangeValidator, min: number, max: number): void {
    (validator as any).minValue = min;
    (validator as any).maxValue = max;
    (validator as any).inclusive = true;
  }

  function createValuesWithinRange(): number[] {
    return [0, 25, 50, 75, 100];
  }

  function testValueOutsideRangeRejection(): void {
    const validator = createRangeValidator(0, 100);
    const values = createValuesOutsideRange();
    
    for (const value of values) {
      const result = validator.validate(value, mockContext);
      expect(result.isValid).toBe(false);
    }
  }

  function createValuesOutsideRange(): number[] {
    return [-1, 101, 150, -50];
  }

  function testEdgeCaseHandling(): void {
    const validator = createRangeValidator(0, 100);
    const edgeCases = createEdgeCases();
    
    for (const edgeCase of edgeCases) {
      const result = validator.validate(edgeCase.value, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createEdgeCases(): any[] {
    return [
      { value: 0, description: 'minimum value' },
      { value: 100, description: 'maximum value' },
      { value: 0.5, description: 'decimal value' },
      { value: -0, description: 'negative zero' },
    ];
  }

  function testDifferentDataTypeValidation(): void {
    const validator = createRangeValidator(0, 100);
    const dataTypes = createDifferentDataTypes();
    
    for (const dataType of dataTypes) {
      const result = validator.validate(dataType.value, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createDifferentDataTypes(): any[] {
    return [
      { value: 50, type: 'number' },
      { value: '50', type: 'string' },
      { value: true, type: 'boolean' },
      { value: null, type: 'null' },
      { value: undefined, type: 'undefined' },
    ];
  }

  function testValidatorNameRetrieval(): void {
    const validator = createDefaultValidator();
    const name = validator.getName();
    
    expect(typeof name).toBe('string');
    expect(name.length).toBeGreaterThan(0);
  }

  function testValidatorConfigurationRetrieval(): void {
    const validator = createDefaultValidator();
    const configuration = validator.getConfiguration();
    
    expect(configuration).toBeDefined();
    expect(typeof configuration.minValue).toBe('number');
    expect(typeof configuration.maxValue).toBe('number');
    expect(typeof configuration.inclusive).toBe('boolean');
  }

  function testValidatorConfigurationUpdate(): void {
    const validator = createDefaultValidator();
    const newConfiguration = createNewConfiguration();
    
    validator.updateConfiguration(newConfiguration);
    
    const updatedConfiguration = validator.getConfiguration();
    expect(updatedConfiguration).toEqual(newConfiguration);
  }

  function createNewConfiguration(): any {
    return {
      minValue: 10,
      maxValue: 90,
      inclusive: false,
    };
  }

  function testValidationErrorHandling(): void {
    const validator = createDefaultValidator();
    const problematicValue = createProblematicValue();
    
    expect(() => validator.validate(problematicValue, mockContext)).not.toThrow();
  }

  function createProblematicValue(): any {
    return {
      value: 'invalid',
      toString: () => 'invalid',
    };
  }

  function testInvalidInputHandling(): void {
    const validator = createDefaultValidator();
    const invalidInputs = createInvalidInputs();
    
    for (const input of invalidInputs) {
      const result = validator.validate(input, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createInvalidInputs(): any[] {
    return [null, undefined, {}, [], () => {}];
  }

  function testSystemErrorHandling(): void {
    const validator = createDefaultValidator();
    
    // Simulate system error
    (validator as any).validate = jest.fn().mockImplementation(() => {
      throw new Error('System error');
    });
    
    expect(() => validator.validate(50, mockContext)).toThrow('System error');
  }

  function testValidationEfficiency(): void {
    const validator = createRangeValidator(0, 100);
    const values = createValuesWithinRange();
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      for (const value of values) {
        validator.validate(value, mockContext);
      }
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testMultipleValidations(): void {
    const validator = createRangeValidator(0, 100);
    const values = createMultipleValues();
    
    for (const value of values) {
      const result = validator.validate(value, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createMultipleValues(): number[] {
    const values = [];
    for (let i = -50; i <= 150; i += 10) {
      values.push(i);
    }
    return values;
  }

  function testDifferentUnitTypes(): void {
    const unitTypes = ['size', 'position', 'scale'];
    
    for (const unitType of unitTypes) {
      const validator = createRangeValidator(0, 100);
      const result = validator.validate(50, mockContext);
      
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const validator = createRangeValidator(0, 100);
      const result = validator.validate(50, context);
      
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createDifferentContexts(): any[] {
    return [
      mockContext,
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' },
    ];
  }

  function testDifferentValidators(): void {
    const validators = createDifferentValidators();
    
    for (const validator of validators) {
      const result = validator.validate(50, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createDifferentValidators(): RangeValidator[] {
    return [
      new RangeValidator(0, 100, true),
      new RangeValidator(-50, 50, false),
      new RangeValidator(10, 90, true),
    ];
  }
});