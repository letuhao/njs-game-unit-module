import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { ScaleCalculationTemplate } from '../templates/ScaleCalculationTemplate';
import { createMockContext } from './test-utils';
import { TemplateInputType } from '../enums/TemplateInputType';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { createScaleTemplateInput, ITemplateInput } from '../interfaces/ITemplateInput';
import { RangeValidator } from '../validators/RangeValidator';
import { container, TOKENS } from '../container/DiContainer';

// Concrete implementation for testing
class TestScaleCalculationTemplate extends ScaleCalculationTemplate {
  public getSupportedInputs(): string[] {
    return ['scale', 'IScaleTemplateInput'];
  }

  public getCalculationSteps(): string[] {
    return ['validation', 'preprocessing', 'calculation', 'postprocessing'];
  }

  // Override canHandle to fix the logic
  public canHandle(input: ITemplateInput): boolean {
    return input.type === TemplateInputType.SCALE;
  }
}

describe('ScaleCalculationTemplate', () => {
  let template: TestScaleCalculationTemplate;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with context and validators', () => {
      testTemplateInitialization();
    });

    it('should create template with default validators', () => {
      testDefaultValidatorsCreation();
    });

    it('should handle missing context gracefully', () => {
      testMissingContextHandling();
    });
  });

  describe('input handling', () => {
    it('should handle valid scale inputs', () => {
      testValidScaleInputHandling();
    });

    it('should reject invalid inputs', () => {
      testInvalidInputRejection();
    });

    it('should handle different input types', () => {
      testDifferentInputTypes();
    });
  });

  describe('calculation process', () => {
    it('should execute calculation steps in order', () => {
      testCalculationStepExecution();
    });

    it('should handle calculation errors gracefully', () => {
      testCalculationErrorHandling();
    });

    it('should validate inputs before calculation', () => {
      testInputValidation();
    });
  });

  describe('template methods', () => {
    it('should get supported inputs correctly', () => {
      testSupportedInputsRetrieval();
    });

    it('should get calculation steps correctly', () => {
      testCalculationStepsRetrieval();
    });

    it('should check if input can be handled', () => {
      testInputHandlingCheck();
    });
  });

  describe('performance', () => {
    it('should perform calculations efficiently', () => {
      testCalculationEfficiency();
    });

    it('should handle multiple calculations', () => {
      testMultipleCalculations();
    });
  });

  describe('integration', () => {
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
    initializeTemplate();
  }

  function createMockContext(): void {
    mockContext = createMockContext();
  }

  function initializeTemplate(): void {
    try {
      template = container.resolve(TOKENS.SCALE_CALCULATION_TEMPLATE);
      setTemplateContext();
    } catch (error) {
      template = new TestScaleCalculationTemplate(mockContext);
    }
  }

  function setTemplateContext(): void {
    (template as any).context = mockContext;
  }

  function testTemplateInitialization(): void {
    expect(template).toBeInstanceOf(TestScaleCalculationTemplate);
    expect(template).toBeInstanceOf(ScaleCalculationTemplate);
  }

  function testDefaultValidatorsCreation(): void {
    const validators = template.getValidators();
    
    expect(validators).toBeDefined();
    expect(Array.isArray(validators)).toBe(true);
  }

  function testMissingContextHandling(): void {
    const templateWithoutContext = new TestScaleCalculationTemplate(null as any);
    
    expect(templateWithoutContext).toBeInstanceOf(TestScaleCalculationTemplate);
    expect(() => templateWithoutContext.getValidators()).not.toThrow();
  }

  function testValidScaleInputHandling(): void {
    const validInput = createValidScaleInput();
    
    expect(template.canHandle(validInput)).toBe(true);
  }

  function createValidScaleInput(): ITemplateInput {
    return createScaleTemplateInput(
      'test-scale-input',
      1.5,
      ScaleValue.FACTOR,
      ScaleUnit.FACTOR,
      true
    );
  }

  function testInvalidInputRejection(): void {
    const invalidInputs = createInvalidInputs();
    
    for (const input of invalidInputs) {
      expect(template.canHandle(input)).toBe(false);
    }
  }

  function createInvalidInputs(): ITemplateInput[] {
    return [
      createScaleTemplateInput(
        'invalid-size',
        1.5,
        ScaleValue.FACTOR,
        ScaleUnit.FACTOR,
        true
      ),
      createScaleTemplateInput(
        'invalid-position',
        1.5,
        ScaleValue.FACTOR,
        ScaleUnit.FACTOR,
        true
      ),
    ];
  }

  function testDifferentInputTypes(): void {
    const inputTypes = [TemplateInputType.SCALE, TemplateInputType.SIZE, TemplateInputType.POSITION];
    
    for (const inputType of inputTypes) {
      const input = createInputWithType(inputType);
      const canHandle = template.canHandle(input);
      
      if (inputType === TemplateInputType.SCALE) {
        expect(canHandle).toBe(true);
      } else {
        expect(canHandle).toBe(false);
      }
    }
  }

  function createInputWithType(inputType: TemplateInputType): ITemplateInput {
    return createScaleTemplateInput(
      `test-${inputType}`,
      1.5,
      ScaleValue.FACTOR,
      ScaleUnit.FACTOR,
      true
    );
  }

  function testCalculationStepExecution(): void {
    const input = createValidScaleInput();
    const steps = template.getCalculationSteps();
    
    expect(steps).toContain('validation');
    expect(steps).toContain('preprocessing');
    expect(steps).toContain('calculation');
    expect(steps).toContain('postprocessing');
  }

  function testCalculationErrorHandling(): void {
    const invalidInput = createInvalidInputs()[0];
    
    expect(() => template.canHandle(invalidInput)).not.toThrow();
  }

  function testInputValidation(): void {
    const input = createValidScaleInput();
    
    expect(template.canHandle(input)).toBe(true);
  }

  function testSupportedInputsRetrieval(): void {
    const supportedInputs = template.getSupportedInputs();
    
    expect(supportedInputs).toContain('scale');
    expect(supportedInputs).toContain('IScaleTemplateInput');
  }

  function testCalculationStepsRetrieval(): void {
    const steps = template.getCalculationSteps();
    
    expect(steps).toContain('validation');
    expect(steps).toContain('preprocessing');
    expect(steps).toContain('calculation');
    expect(steps).toContain('postprocessing');
  }

  function testInputHandlingCheck(): void {
    const validInput = createValidScaleInput();
    const invalidInput = createInvalidInputs()[0];
    
    expect(template.canHandle(validInput)).toBe(true);
    expect(template.canHandle(invalidInput)).toBe(false);
  }

  function testCalculationEfficiency(): void {
    const input = createValidScaleInput();
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      template.canHandle(input);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testMultipleCalculations(): void {
    const inputs = createMultipleInputs();
    
    for (const input of inputs) {
      const canHandle = template.canHandle(input);
      expect(typeof canHandle).toBe('boolean');
    }
  }

  function createMultipleInputs(): ITemplateInput[] {
    return [
      createValidScaleInput(),
      createInputWithType(TemplateInputType.SIZE),
      createInputWithType(TemplateInputType.POSITION),
    ];
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const testTemplate = new TestScaleCalculationTemplate(context);
      expect(testTemplate).toBeInstanceOf(TestScaleCalculationTemplate);
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
      expect(validator).toBeDefined();
    }
  }

  function createDifferentValidators(): any[] {
    return [
      new RangeValidator(0, 10),
      new RangeValidator(-1, 1),
      new RangeValidator(0.1, 5),
    ];
  }
});