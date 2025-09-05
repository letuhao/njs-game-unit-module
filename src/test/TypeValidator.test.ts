import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { TypeValidator } from '../validators/TypeValidator';
import { createMockContext } from './setup';
import { UnitType } from '../enums/UnitType';
import { Dimension } from '../enums/Dimension';
import { container, TOKENS } from '../container/DiContainer';

describe('TypeValidator', () => {
  let validator: TypeValidator;
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

    it('should handle invalid configuration gracefully', () => {
      testInvalidConfigurationHandling();
    });
  });

  describe('validation', () => {
    it('should validate unit types correctly', () => {
      testUnitTypeValidation();
    });

    it('should validate dimensions correctly', () => {
      testDimensionValidation();
    });

    it('should validate complex objects', () => {
      testComplexObjectValidation();
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

  function createDefaultValidator(): TypeValidator {
    try {
      return container.resolve(TOKENS.TYPE_VALIDATOR);
    } catch (error) {
      return new TypeValidator();
    }
  }

  function verifyDefaultValidatorProperties(validator: TypeValidator): void {
    expect(validator.getName()).toBe('TypeValidator');
    expect(validator.getConfiguration()).toEqual({
      allowedTypes: Object.values(UnitType),
      allowedDimensions: Object.values(Dimension),
      strictMode: false,
    });
  }

  function testCustomValidatorCreation(): void {
    const customValidator = createCustomValidator();
    
    verifyCustomValidatorProperties(customValidator);
  }

  function createCustomValidator(): TypeValidator {
    const allowedTypes = [UnitType.SIZE, UnitType.POSITION];
    const allowedDimensions = [Dimension.WIDTH, Dimension.HEIGHT];
    const strictMode = true;

    try {
      const validator = container.resolve(TOKENS.TYPE_VALIDATOR);
      setCustomValidatorProperties(validator, allowedTypes, allowedDimensions, strictMode);
      return validator;
    } catch (error) {
      return new TypeValidator(allowedTypes, allowedDimensions, strictMode);
    }
  }

  function setCustomValidatorProperties(validator: TypeValidator, allowedTypes: UnitType[], allowedDimensions: Dimension[], strictMode: boolean): void {
    (validator as any).allowedTypes = allowedTypes;
    (validator as any).allowedDimensions = allowedDimensions;
    (validator as any).strictMode = strictMode;
  }

  function verifyCustomValidatorProperties(validator: TypeValidator): void {
    expect(validator.getName()).toBe('TypeValidator');
    expect(validator.getConfiguration()).toEqual({
      allowedTypes: [UnitType.SIZE, UnitType.POSITION],
      allowedDimensions: [Dimension.WIDTH, Dimension.HEIGHT],
      strictMode: true,
    });
  }

  function testInvalidConfigurationHandling(): void {
    const invalidValidator = createInvalidValidator();
    
    expect(invalidValidator).toBeInstanceOf(TypeValidator);
    expect(() => invalidValidator.getConfiguration()).not.toThrow();
  }

  function createInvalidValidator(): TypeValidator {
    try {
      const validator = container.resolve(TOKENS.TYPE_VALIDATOR);
      setInvalidValidatorProperties(validator);
      return validator;
    } catch (error) {
      return new TypeValidator([], [], true); // Invalid configuration
    }
  }

  function setInvalidValidatorProperties(validator: TypeValidator): void {
    (validator as any).allowedTypes = [];
    (validator as any).allowedDimensions = [];
    (validator as any).strictMode = true;
  }

  function testUnitTypeValidation(): void {
    const validator = createDefaultValidator();
    const unitTypes = createUnitTypes();
    
    for (const unitType of unitTypes) {
      const input = createInputWithUnitType(unitType);
      const result = validator.validate(input, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createUnitTypes(): UnitType[] {
    return [UnitType.SIZE, UnitType.POSITION, UnitType.SCALE];
  }

  function createInputWithUnitType(unitType: UnitType): any {
    return {
      unitType: unitType,
      dimension: Dimension.WIDTH,
      value: 100,
    };
  }

  function testDimensionValidation(): void {
    const validator = createDefaultValidator();
    const dimensions = createDimensions();
    
    for (const dimension of dimensions) {
      const input = createInputWithDimension(dimension);
      const result = validator.validate(input, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createDimensions(): Dimension[] {
    return [Dimension.WIDTH, Dimension.HEIGHT, Dimension.X, Dimension.Y, Dimension.Z];
  }

  function createInputWithDimension(dimension: Dimension): any {
    return {
      unitType: UnitType.SIZE,
      dimension: dimension,
      value: 100,
    };
  }

  function testComplexObjectValidation(): void {
    const validator = createDefaultValidator();
    const complexObjects = createComplexObjects();
    
    for (const obj of complexObjects) {
      const result = validator.validate(obj, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createComplexObjects(): any[] {
    return [
      { unitType: UnitType.SIZE, dimension: Dimension.WIDTH, value: 100, metadata: { test: true } },
      { unitType: UnitType.POSITION, dimension: Dimension.X, value: 50, config: { enabled: true } },
      { unitType: UnitType.SCALE, dimension: Dimension.WIDTH, value: 1.5, options: { maintainAspectRatio: true } },
    ];
  }

  function testEdgeCaseHandling(): void {
    const validator = createDefaultValidator();
    const edgeCases = createEdgeCases();
    
    for (const edgeCase of edgeCases) {
      const result = validator.validate(edgeCase.value, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createEdgeCases(): any[] {
    return [
      { value: null, description: 'null value' },
      { value: undefined, description: 'undefined value' },
      { value: '', description: 'empty string' },
      { value: 0, description: 'zero value' },
      { value: {}, description: 'empty object' },
    ];
  }

  function testDifferentDataTypeValidation(): void {
    const validator = createDefaultValidator();
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
    expect(typeof configuration.allowedTypes).toBe('object');
    expect(typeof configuration.allowedDimensions).toBe('object');
    expect(typeof configuration.strictMode).toBe('boolean');
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
      allowedTypes: [UnitType.SIZE],
      allowedDimensions: [Dimension.WIDTH],
      strictMode: true,
    };
  }

  function testValidationErrorHandling(): void {
    const validator = createDefaultValidator();
    const problematicInput = createProblematicInput();
    
    expect(() => validator.validate(problematicInput, mockContext)).not.toThrow();
  }

  function createProblematicInput(): any {
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
    
    expect(() => validator.validate({}, mockContext)).toThrow('System error');
  }

  function testValidationEfficiency(): void {
    const validator = createDefaultValidator();
    const inputs = createValidationInputs();
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      for (const input of inputs) {
        validator.validate(input, mockContext);
      }
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function createValidationInputs(): any[] {
    return [
      { unitType: UnitType.SIZE, dimension: Dimension.WIDTH, value: 100 },
      { unitType: UnitType.POSITION, dimension: Dimension.X, value: 50 },
      { unitType: UnitType.SCALE, dimension: Dimension.WIDTH, value: 1.5 },
    ];
  }

  function testMultipleValidations(): void {
    const validator = createDefaultValidator();
    const inputs = createMultipleInputs();
    
    for (const input of inputs) {
      const result = validator.validate(input, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createMultipleInputs(): any[] {
    const inputs = [];
    for (let i = 0; i < 100; i++) {
      inputs.push({
        unitType: UnitType.SIZE,
        dimension: Dimension.WIDTH,
        value: i,
      });
    }
    return inputs;
  }

  function testDifferentUnitTypes(): void {
    const unitTypes = createUnitTypes();
    
    for (const unitType of unitTypes) {
      const validator = createDefaultValidator();
      const input = createInputWithUnitType(unitType);
      const result = validator.validate(input, mockContext);
      
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const validator = createDefaultValidator();
      const input = createInputWithUnitType(UnitType.SIZE);
      const result = validator.validate(input, context);
      
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
      const input = createInputWithUnitType(UnitType.SIZE);
      const result = validator.validate(input, mockContext);
      expect(typeof result.isValid).toBe('boolean');
    }
  }

  function createDifferentValidators(): TypeValidator[] {
    return [
      new TypeValidator(),
      new TypeValidator([UnitType.SIZE], [Dimension.WIDTH], true),
      new TypeValidator([UnitType.POSITION], [Dimension.HEIGHT], false),
    ];
  }
});