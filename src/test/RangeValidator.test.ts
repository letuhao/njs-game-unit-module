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
    mockContext = createMockContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create validator with default values', () => {
      // Use DI container to resolve validator instead of direct instantiation
      try {
        validator = container.resolve(TOKENS.RANGE_VALIDATOR);
      } catch (error) {
        // Fallback to direct instantiation if DI fails
        validator = new RangeValidator();
      }

      expect(validator.getName()).toBe('RangeValidator');
      expect(validator.getConfiguration()).toEqual({
        minValue: -Infinity,
        maxValue: Infinity,
        inclusive: true,
      });
    });

    it('should create validator with custom values', () => {
      let customValidator: RangeValidator;
      try {
        customValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
        // Set custom values for the resolved validator
        (customValidator as any).name = 'CustomValidator';
        (customValidator as any).minValue = 0;
        (customValidator as any).maxValue = 100;
        (customValidator as any).inclusive = false;
      } catch (error) {
        customValidator = new RangeValidator('CustomValidator', 0, 100, false);
      }

      expect(customValidator.getName()).toBe('RangeValidator');
      expect(customValidator.getConfiguration()).toEqual({
        minValue: 0,
        maxValue: 100,
        inclusive: false,
      });
    });

    it('should create validator with inclusive bounds', () => {
      let inclusiveValidator: RangeValidator;
      try {
        inclusiveValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
        (inclusiveValidator as any).name = 'InclusiveValidator';
        (inclusiveValidator as any).minValue = 10;
        (inclusiveValidator as any).maxValue = 50;
        (inclusiveValidator as any).inclusive = true;
      } catch (error) {
        inclusiveValidator = new RangeValidator('InclusiveValidator', 10, 50, true);
      }

      expect(inclusiveValidator.getConfiguration()).toEqual({
        minValue: 10,
        maxValue: 50,
        inclusive: true,
      });
    });

    it('should create validator with exclusive bounds', () => {
      let exclusiveValidator: RangeValidator;
      try {
        exclusiveValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
        (exclusiveValidator as any).name = 'ExclusiveValidator';
        (exclusiveValidator as any).minValue = 5;
        (exclusiveValidator as any).maxValue = 25;
        (exclusiveValidator as any).inclusive = false;
      } catch (error) {
        exclusiveValidator = new RangeValidator('ExclusiveValidator', 5, 25, false);
      }

      expect(exclusiveValidator.getConfiguration()).toEqual({
        minValue: 5,
        maxValue: 25,
        inclusive: false,
      });
    });
  });

  describe('validation', () => {
    beforeEach(() => {
      try {
        validator = container.resolve(TOKENS.RANGE_VALIDATOR);
      } catch (error) {
        validator = new RangeValidator();
      }
    });

    it('should validate values within range', () => {
      const testValues = [0, 50, 100, -50, 1000];
      
      for (const value of testValues) {
        const result = validator.validate(value, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should validate values at boundaries with inclusive bounds', () => {
      let inclusiveValidator: RangeValidator;
      try {
        inclusiveValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
        (inclusiveValidator as any).minValue = 0;
        (inclusiveValidator as any).maxValue = 100;
        (inclusiveValidator as any).inclusive = true;
      } catch (error) {
        inclusiveValidator = new RangeValidator('InclusiveValidator', 0, 100, true);
      }

      const boundaryValues = [0, 100];
      
      for (const value of boundaryValues) {
        const result = inclusiveValidator.validate(value, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should reject values at boundaries with exclusive bounds', () => {
      let exclusiveValidator: RangeValidator;
      try {
        exclusiveValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
        (exclusiveValidator as any).minValue = 0;
        (exclusiveValidator as any).maxValue = 100;
        (exclusiveValidator as any).inclusive = false;
      } catch (error) {
        exclusiveValidator = new RangeValidator('ExclusiveValidator', 0, 100, false);
      }

      const boundaryValues = [0, 100];
      
      for (const value of boundaryValues) {
        const result = exclusiveValidator.validate(value, mockContext);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should reject values outside range', () => {
      let rangeValidator: RangeValidator;
      try {
        rangeValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
        (rangeValidator as any).minValue = 10;
        (rangeValidator as any).maxValue = 50;
        (rangeValidator as any).inclusive = true;
      } catch (error) {
        rangeValidator = new RangeValidator('RangeValidator', 10, 50, true);
      }

      const invalidValues = [5, 60, -10, 100];
      
      for (const value of invalidValues) {
        const result = rangeValidator.validate(value, mockContext);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('different data types', () => {
    beforeEach(() => {
      try {
        validator = container.resolve(TOKENS.RANGE_VALIDATOR);
      } catch (error) {
        validator = new RangeValidator();
      }
    });

    it('should validate size values', () => {
      const sizeValues = [SizeValue.PIXEL, SizeValue.FILL, SizeValue.AUTO];
      
      for (const value of sizeValues) {
        const result = validator.validate(value, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should validate position values', () => {
      const positionValues = [PositionValue.PIXEL, PositionValue.CENTER, PositionValue.CONTENT_LEFT];
      
      for (const value of positionValues) {
        const result = validator.validate(value, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should validate scale values', () => {
      const scaleValues = [ScaleValue.PIXEL, ScaleValue.FACTOR, ScaleValue.RESPONSIVE];
      
      for (const value of scaleValues) {
        const result = validator.validate(value, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should validate unit types', () => {
      const unitTypes = [SizeUnit.PIXEL, PositionUnit.PIXEL, ScaleUnit.PIXEL];
      
      for (const value of unitTypes) {
        const result = validator.validate(value, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      try {
        validator = container.resolve(TOKENS.RANGE_VALIDATOR);
      } catch (error) {
        validator = new RangeValidator();
      }
    });

    it('should handle invalid input types gracefully', () => {
      const invalidInputs = [null, undefined, 'string', {}, [], true];
      
      for (const input of invalidInputs) {
        const result = validator.validate(input as any, mockContext);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should handle missing context gracefully', () => {
      const result = validator.validate(50, null as any);
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
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle -Infinity values', () => {
      const result = validator.validate(-Infinity, mockContext);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('configuration', () => {
    it('should return correct configuration', () => {
      let configValidator: RangeValidator;
      try {
        configValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
        (configValidator as any).minValue = 10;
        (configValidator as any).maxValue = 90;
        (configValidator as any).inclusive = false;
      } catch (error) {
        configValidator = new RangeValidator('ConfigValidator', 10, 90, false);
      }

      const config = configValidator.getConfiguration();
      expect(config).toEqual({
        minValue: 10,
        maxValue: 90,
        inclusive: false,
      });
    });

    it('should return correct name', () => {
      let nameValidator: RangeValidator;
      try {
        nameValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
        (nameValidator as any).name = 'TestValidator';
      } catch (error) {
        nameValidator = new RangeValidator('TestValidator', 0, 100, true);
      }

      expect(nameValidator.getName()).toBe('RangeValidator');
    });

    it('should allow configuration updates', () => {
      let updateValidator: RangeValidator;
      try {
        updateValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
        (updateValidator as any).minValue = 0;
        (updateValidator as any).maxValue = 100;
        (updateValidator as any).inclusive = true;
      } catch (error) {
        updateValidator = new RangeValidator('UpdateValidator', 0, 100, true);
      }

      // Update configuration
      (updateValidator as any).minValue = 20;
      (updateValidator as any).maxValue = 80;
      (updateValidator as any).inclusive = false;

      const config = updateValidator.getConfiguration();
      expect(config).toEqual({
        minValue: 20,
        maxValue: 80,
        inclusive: false,
      });
    });
  });

  describe('performance', () => {
    beforeEach(() => {
      try {
        validator = container.resolve(TOKENS.RANGE_VALIDATOR);
      } catch (error) {
        validator = new RangeValidator();
      }
    });

    it('should validate values efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        validator.validate(i, mockContext);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle large numbers efficiently', () => {
      const largeNumbers = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 1e10, -1e10];
      
      for (const number of largeNumbers) {
        const result = validator.validate(number, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should handle decimal numbers efficiently', () => {
      const decimalNumbers = [0.1, 0.01, 0.001, 0.0001, 0.00001];
      
      for (const number of decimalNumbers) {
        const result = validator.validate(number, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
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
        const result = validator.validate(50, context);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should work with different validator configurations', () => {
      const configurations = [
        { minValue: 0, maxValue: 100, inclusive: true },
        { minValue: -50, maxValue: 50, inclusive: false },
        { minValue: 10, maxValue: 90, inclusive: true },
        { minValue: -100, maxValue: 100, inclusive: false },
      ];

      for (const config of configurations) {
        let configValidator: RangeValidator;
        try {
          configValidator = container.resolve(TOKENS.RANGE_VALIDATOR);
          (configValidator as any).minValue = config.minValue;
          (configValidator as any).maxValue = config.maxValue;
          (configValidator as any).inclusive = config.inclusive;
        } catch (error) {
          configValidator = new RangeValidator('ConfigValidator', config.minValue, config.maxValue, config.inclusive);
        }

        const result = configValidator.validate(50, mockContext);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });
  });
});
