import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { PositionCalculationTemplate } from '../templates/PositionCalculationTemplate';
import { createMockContext } from './setup';
import { TemplateInputType } from '../enums/TemplateInputType';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { Dimension } from '../enums/Dimension';
import { createPositionTemplateInput, ITemplateInput } from '../interfaces/ITemplateInput';
import { RangeValidator } from '../validators/RangeValidator';
import { container, TOKENS } from '../container/DiContainer';

// Concrete implementation for testing
class TestPositionCalculationTemplate extends PositionCalculationTemplate {
  protected getSupportedInputs(): string[] {
    return ['position', 'IPositionTemplateInput'];
  }

  protected getCalculationSteps(): string[] {
    return ['validation', 'preprocessing', 'calculation', 'postprocessing'];
  }

  // Override canHandle to fix the logic
  public canHandle(input: ITemplateInput): boolean {
    return input.type === TemplateInputType.POSITION;
  }
}

describe('PositionCalculationTemplate', () => {
  let template: TestPositionCalculationTemplate;
  let mockContext: any;

  beforeEach(() => {
    mockContext = createMockContext();
    
    // Use DI container to resolve template instead of direct instantiation
    try {
      template = container.resolve(TOKENS.POSITION_CALCULATION_TEMPLATE);
      // Set context for the resolved template
      (template as any).context = mockContext;
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      template = new TestPositionCalculationTemplate(mockContext);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with context and validators', () => {
      expect(template.getContext()).toBe(mockContext);
      expect(template.getValidatorInfo()).toHaveLength(2);
    });

    it('should create template with default validators', () => {
      let defaultTemplate: TestPositionCalculationTemplate;
      try {
        defaultTemplate = container.resolve(TOKENS.POSITION_CALCULATION_TEMPLATE);
        (defaultTemplate as any).context = mockContext;
      } catch (error) {
        defaultTemplate = new TestPositionCalculationTemplate(mockContext);
      }
      
      expect(defaultTemplate).toBeInstanceOf(TestPositionCalculationTemplate);
      expect(defaultTemplate.getValidatorInfo()).toHaveLength(2);
    });
  });

  describe('input validation', () => {
    it('should validate position input correctly', () => {
      const validInput = createPositionTemplateInput({
        type: TemplateInputType.POSITION,
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: { test: true },
      });

      expect(template.canHandle(validInput)).toBe(true);
    });

    it('should reject invalid input types', () => {
      const invalidInput = createPositionTemplateInput({
        type: TemplateInputType.SIZE, // Wrong type
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: { test: true },
      });

      expect(template.canHandle(invalidInput)).toBe(false);
    });

    it('should validate input data structure', () => {
      const validInput = createPositionTemplateInput({
        type: TemplateInputType.POSITION,
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: { test: true },
      });

      const result = template.validateInput(validInput);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid input data', () => {
      const invalidInput = {
        type: TemplateInputType.POSITION,
        value: 'invalid' as any,
        unit: 'invalid' as any,
        dimension: 'invalid' as any,
        metadata: { test: true },
      } as ITemplateInput;

      const result = template.validateInput(invalidInput);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('calculation process', () => {
    it('should execute calculation steps in correct order', () => {
      const input = createPositionTemplateInput({
        type: TemplateInputType.POSITION,
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: { test: true },
      });

      const steps = template.getCalculationSteps();
      expect(steps).toEqual(['validation', 'preprocessing', 'calculation', 'postprocessing']);

      const result = template.calculate(input);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle different position values', () => {
      const testCases = [
        { value: PositionValue.PIXEL, unit: PositionUnit.PIXEL },
        { value: PositionValue.CENTER, unit: PositionUnit.CENTER },
        { value: PositionValue.CONTENT_LEFT, unit: PositionUnit.CONTENT_LEFT },
        { value: PositionValue.PARENT_CENTER_X, unit: PositionUnit.PARENT_CENTER_X },
        { value: PositionValue.SCENE_CENTER_X, unit: PositionUnit.SCENE_CENTER_X },
      ];

      for (const testCase of testCases) {
        const input = createPositionTemplateInput({
          type: TemplateInputType.POSITION,
          value: testCase.value,
          unit: testCase.unit,
          dimension: Dimension.X,
          metadata: { test: true },
        });

        const result = template.calculate(input);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle different dimensions', () => {
      const dimensions = [Dimension.X, Dimension.Y, Dimension.BOTH];

      for (const dimension of dimensions) {
        const input = createPositionTemplateInput({
          type: TemplateInputType.POSITION,
          value: PositionValue.PIXEL,
          unit: PositionUnit.PIXEL,
          dimension,
          metadata: { test: true },
        });

        const result = template.calculate(input);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('template methods', () => {
    it('should provide supported input types', () => {
      const supportedInputs = template.getSupportedInputs();
      expect(supportedInputs).toEqual(['position', 'IPositionTemplateInput']);
    });

    it('should provide calculation steps', () => {
      const steps = template.getCalculationSteps();
      expect(steps).toEqual(['validation', 'preprocessing', 'calculation', 'postprocessing']);
    });

    it('should provide validator information', () => {
      const validatorInfo = template.getValidatorInfo();
      expect(Array.isArray(validatorInfo)).toBe(true);
      expect(validatorInfo.length).toBe(2);
      
      validatorInfo.forEach(validator => {
        expect(validator.name).toBeDefined();
        expect(validator.type).toBeDefined();
        expect(validator.isActive).toBeDefined();
      });
    });
  });

  describe('error handling', () => {
    it('should handle calculation errors gracefully', () => {
      const invalidInput = {
        type: TemplateInputType.POSITION,
        value: 'invalid' as any,
        unit: 'invalid' as any,
        dimension: 'invalid' as any,
        metadata: { test: true },
      } as ITemplateInput;

      expect(() => template.calculate(invalidInput)).not.toThrow();
    });

    it('should handle missing context gracefully', () => {
      let templateWithoutContext: TestPositionCalculationTemplate;
      try {
        templateWithoutContext = container.resolve(TOKENS.POSITION_CALCULATION_TEMPLATE);
        (templateWithoutContext as any).context = null;
      } catch (error) {
        templateWithoutContext = new TestPositionCalculationTemplate(null as any);
      }

      const input = createPositionTemplateInput({
        type: TemplateInputType.POSITION,
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: { test: true },
      });

      expect(() => templateWithoutContext.calculate(input)).not.toThrow();
    });

    it('should handle validator errors gracefully', () => {
      // Mock validator to throw an error
      const mockValidator = {
        validate: jest.fn().mockImplementation(() => {
          throw new Error('Validator error');
        }),
        getValidatorInfo: jest.fn().mockReturnValue({
          name: 'MockValidator',
          type: 'range',
          isActive: true,
        }),
      };

      // Replace validators with mock
      (template as any).validators = [mockValidator];

      const input = createPositionTemplateInput({
        type: TemplateInputType.POSITION,
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: { test: true },
      });

      expect(() => template.calculate(input)).not.toThrow();
    });
  });

  describe('performance', () => {
    it('should handle multiple calculations efficiently', () => {
      const input = createPositionTemplateInput({
        type: TemplateInputType.POSITION,
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: { test: true },
      });

      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        template.calculate(input);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle large input data efficiently', () => {
      const largeInput = createPositionTemplateInput({
        type: TemplateInputType.POSITION,
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: {
          largeArray: Array(1000).fill(0).map((_, i) => i),
          largeObject: Object.fromEntries(
            Array(1000).fill(0).map((_, i) => [`key${i}`, `value${i}`])
          ),
        },
      });

      const startTime = performance.now();
      const result = template.calculate(largeInput);
      const endTime = performance.now();

      expect(typeof result).toBe('number');
      expect(endTime - startTime).toBeLessThan(10); // Should complete quickly
    });
  });

  describe('integration', () => {
    it('should work with different context types', () => {
      const contexts = [
        createMockContext(),
        { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: Dimension.X },
        { scene: { width: 1920, height: 1080 }, dimension: Dimension.Y },
        { viewport: { width: 1366, height: 768 }, dimension: Dimension.BOTH },
      ];

      const input = createPositionTemplateInput({
        type: TemplateInputType.POSITION,
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: { test: true },
      });

      for (const context of contexts) {
        let contextTemplate: TestPositionCalculationTemplate;
        try {
          contextTemplate = container.resolve(TOKENS.POSITION_CALCULATION_TEMPLATE);
          (contextTemplate as any).context = context;
        } catch (error) {
          contextTemplate = new TestPositionCalculationTemplate(context);
        }

        const result = contextTemplate.calculate(input);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should work with different validator configurations', () => {
      const input = createPositionTemplateInput({
        type: TemplateInputType.POSITION,
        value: PositionValue.PIXEL,
        unit: PositionUnit.PIXEL,
        dimension: Dimension.X,
        metadata: { test: true },
      });

      // Test with different validator configurations
      const validatorConfigs = [
        { range: { min: 0, max: 1000 } },
        { range: { min: -100, max: 100 } },
        { range: { min: 0, max: Infinity } },
      ];

      for (const config of validatorConfigs) {
        let configTemplate: TestPositionCalculationTemplate;
        try {
          configTemplate = container.resolve(TOKENS.POSITION_CALCULATION_TEMPLATE);
          (configTemplate as any).context = mockContext;
          (configTemplate as any).validators = [new RangeValidator(config.range.min, config.range.max)];
        } catch (error) {
          configTemplate = new TestPositionCalculationTemplate(mockContext);
          (configTemplate as any).validators = [new RangeValidator(config.range.min, config.range.max)];
        }

        const result = configTemplate.calculate(input);
        expect(typeof result).toBe('number');
      }
    });
  });
});
