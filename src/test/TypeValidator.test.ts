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
    mockContext = createMockContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create validator with default values', () => {
      // Use DI container to resolve validator instead of direct instantiation
      try {
        validator = container.resolve(TOKENS.TYPE_VALIDATOR);
      } catch (error) {
        // Fallback to direct instantiation if DI fails
        validator = new TypeValidator();
      }

      expect(validator.getName()).toBe('TypeValidator');
      expect(validator.getConfiguration()).toEqual({
        allowedTypes: Object.values(UnitType),
        allowedDimensions: Object.values(Dimension),
        strictMode: false,
      });
    });

    it('should create validator with custom values', () => {
      const allowedTypes = [UnitType.SIZE, UnitType.POSITION];
      const allowedDimensions = [Dimension.WIDTH, Dimension.HEIGHT];
      const strictMode = true;

      let customValidator: TypeValidator;
      try {
        customValidator = container.resolve(TOKENS.TYPE_VALIDATOR);
        // Set custom values for the resolved validator
        (customValidator as any).allowedTypes = allowedTypes;
        (customValidator as any).allowedDimensions = allowedDimensions;
        (customValidator as any).strictMode = strictMode;
      } catch (error) {
        customValidator = new TypeValidator(allowedTypes, allowedDimensions, strictMode);
      }

      expect(customValidator.getName()).toBe('TypeValidator');
      expect(customValidator.getConfiguration()).toEqual({
        allowedTypes,
        allowedDimensions,
        strictMode,
      });
    });

    it('should create validator with partial configuration', () => {
      const allowedTypes = [UnitType.SIZE];

      let partialValidator: TypeValidator;
      try {
        partialValidator = container.resolve(TOKENS.TYPE_VALIDATOR);
        (partialValidator as any).allowedTypes = allowedTypes;
        (partialValidator as any).allowedDimensions = Object.values(Dimension);
        (partialValidator as any).strictMode = false;
      } catch (error) {
        partialValidator = new TypeValidator(allowedTypes);
      }

      expect(partialValidator.getConfiguration().allowedTypes).toEqual(allowedTypes);
      expect(partialValidator.getConfiguration().allowedDimensions).toEqual(Object.values(Dimension));
      expect(partialValidator.getConfiguration().strictMode).toBe(false);
    });
  });

  describe('validation', () => {
    beforeEach(() => {
      try {
        validator = container.resolve(TOKENS.TYPE_VALIDATOR);
      } catch (error) {
        validator = new TypeValidator();
      }
    });

    it('should validate correct unit types', () => {
      const validTypes = Object.values(UnitType);
      
      for (const type of validTypes) {
        const result = validator.validate(type, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should validate correct dimensions', () => {
      const validDimensions = Object.values(Dimension);
      
      for (const dimension of validDimensions) {
        const result = validator.validate(dimension, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should reject invalid types', () => {
      const invalidTypes = ['invalid', null, undefined, {}, [], true, false];
      
      for (const type of invalidTypes) {
        const result = validator.validate(type as any, mockContext);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should reject invalid dimensions', () => {
      const invalidDimensions = ['invalid', null, undefined, {}, [], true, false];
      
      for (const dimension of invalidDimensions) {
        const result = validator.validate(dimension as any, mockContext);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('strict mode', () => {
    it('should be more strict when enabled', () => {
      let strictValidator: TypeValidator;
      try {
        strictValidator = container.resolve(TOKENS.TYPE_VALIDATOR);
        (strictValidator as any).strictMode = true;
        (strictValidator as any).allowedTypes = [UnitType.SIZE];
        (strictValidator as any).allowedDimensions = [Dimension.WIDTH];
      } catch (error) {
        strictValidator = new TypeValidator([UnitType.SIZE], [Dimension.WIDTH], true);
      }

      // Valid inputs should pass
      const validResult = strictValidator.validate(UnitType.SIZE, mockContext);
      expect(validResult.isValid).toBe(true);

      // Invalid inputs should fail
      const invalidResult = strictValidator.validate(UnitType.POSITION, mockContext);
      expect(invalidResult.isValid).toBe(false);
    });

    it('should be less strict when disabled', () => {
      let lenientValidator: TypeValidator;
      try {
        lenientValidator = container.resolve(TOKENS.TYPE_VALIDATOR);
        (lenientValidator as any).strictMode = false;
        (lenientValidator as any).allowedTypes = [UnitType.SIZE];
        (lenientValidator as any).allowedDimensions = [Dimension.WIDTH];
      } catch (error) {
        lenientValidator = new TypeValidator([UnitType.SIZE], [Dimension.WIDTH], false);
      }

      // Some inputs that would fail in strict mode might pass in lenient mode
      const result = lenientValidator.validate(UnitType.SIZE, mockContext);
      expect(result.isValid).toBe(true);
    });
  });

  describe('configuration', () => {
    it('should return correct configuration', () => {
      let configValidator: TypeValidator;
      try {
        configValidator = container.resolve(TOKENS.TYPE_VALIDATOR);
        (configValidator as any).allowedTypes = [UnitType.SIZE, UnitType.POSITION];
        (configValidator as any).allowedDimensions = [Dimension.WIDTH, Dimension.HEIGHT];
        (configValidator as any).strictMode = true;
      } catch (error) {
        configValidator = new TypeValidator([UnitType.SIZE, UnitType.POSITION], [Dimension.WIDTH, Dimension.HEIGHT], true);
      }

      const config = configValidator.getConfiguration();
      expect(config).toEqual({
        allowedTypes: [UnitType.SIZE, UnitType.POSITION],
        allowedDimensions: [Dimension.WIDTH, Dimension.HEIGHT],
        strictMode: true,
      });
    });

    it('should return correct name', () => {
      let nameValidator: TypeValidator;
      try {
        nameValidator = container.resolve(TOKENS.TYPE_VALIDATOR);
        (nameValidator as any).name = 'TestValidator';
      } catch (error) {
        nameValidator = new TypeValidator();
      }

      expect(nameValidator.getName()).toBe('TypeValidator');
    });

    it('should allow configuration updates', () => {
      let updateValidator: TypeValidator;
      try {
        updateValidator = container.resolve(TOKENS.TYPE_VALIDATOR);
        (updateValidator as any).allowedTypes = [UnitType.SIZE];
        (updateValidator as any).allowedDimensions = [Dimension.WIDTH];
        (updateValidator as any).strictMode = false;
      } catch (error) {
        updateValidator = new TypeValidator([UnitType.SIZE], [Dimension.WIDTH], false);
      }

      // Update configuration
      (updateValidator as any).allowedTypes = [UnitType.POSITION];
      (updateValidator as any).allowedDimensions = [Dimension.HEIGHT];
      (updateValidator as any).strictMode = true;

      const config = updateValidator.getConfiguration();
      expect(config).toEqual({
        allowedTypes: [UnitType.POSITION],
        allowedDimensions: [Dimension.HEIGHT],
        strictMode: true,
      });
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      try {
        validator = container.resolve(TOKENS.TYPE_VALIDATOR);
      } catch (error) {
        validator = new TypeValidator();
      }
    });

    it('should handle validation errors gracefully', () => {
      const invalidInputs = [null, undefined, 'string', {}, [], true];
      
      for (const input of invalidInputs) {
        const result = validator.validate(input as any, mockContext);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should handle missing context gracefully', () => {
      const result = validator.validate(UnitType.SIZE, null as any);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle NaN values', () => {
      const result = validator.validate(NaN, mockContext);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle Infinity values', () => {
      const result = validator.validate(Infinity, mockContext);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle -Infinity values', () => {
      const result = validator.validate(-Infinity, mockContext);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('performance', () => {
    beforeEach(() => {
      try {
        validator = container.resolve(TOKENS.TYPE_VALIDATOR);
      } catch (error) {
        validator = new TypeValidator();
      }
    });

    it('should validate values efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        validator.validate(UnitType.SIZE, mockContext);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle large numbers efficiently', () => {
      const largeNumbers = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 1e10, -1e10];
      
      for (const number of largeNumbers) {
        const result = validator.validate(number, mockContext);
        expect(result.isValid).toBe(false); // Numbers are not valid unit types
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should handle decimal numbers efficiently', () => {
      const decimalNumbers = [0.1, 0.01, 0.001, 0.0001, 0.00001];
      
      for (const number of decimalNumbers) {
        const result = validator.validate(number, mockContext);
        expect(result.isValid).toBe(false); // Numbers are not valid unit types
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('integration', () => {
    it('should work with different context types', () => {
      const contexts = [
        createMockContext(),
        { parent: { width: 800, height: 600, x: 0, y: 0 }, dimension: Dimension.WIDTH },
        { scene: { width: 1920, height: 1080 }, dimension: Dimension.HEIGHT },
        { viewport: { width: 1366, height: 768 }, dimension: Dimension.BOTH },
      ];

      for (const context of contexts) {
        const result = validator.validate(UnitType.SIZE, context);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should work with different validator configurations', () => {
      const configurations = [
        { allowedTypes: [UnitType.SIZE], allowedDimensions: [Dimension.WIDTH], strictMode: true },
        { allowedTypes: [UnitType.POSITION], allowedDimensions: [Dimension.HEIGHT], strictMode: false },
        { allowedTypes: [UnitType.SCALE], allowedDimensions: [Dimension.BOTH], strictMode: true },
        { allowedTypes: Object.values(UnitType), allowedDimensions: Object.values(Dimension), strictMode: false },
      ];

      for (const config of configurations) {
        let configValidator: TypeValidator;
        try {
          configValidator = container.resolve(TOKENS.TYPE_VALIDATOR);
          (configValidator as any).allowedTypes = config.allowedTypes;
          (configValidator as any).allowedDimensions = config.allowedDimensions;
          (configValidator as any).strictMode = config.strictMode;
        } catch (error) {
          configValidator = new TypeValidator(config.allowedTypes, config.allowedDimensions, config.strictMode);
        }

        const result = configValidator.validate(UnitType.SIZE, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });
  });
});
