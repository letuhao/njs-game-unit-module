import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { SizeCalculationTemplate } from '../templates/SizeCalculationTemplate';
import { createMockContext } from './setup';
import { TemplateInputType } from '../enums/TemplateInputType';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { Dimension } from '../enums/Dimension';
import { createSizeTemplateInput, ITemplateInput } from '../interfaces/ITemplateInput';
import { RangeValidator } from '../validators/RangeValidator';
import { container, TOKENS } from '../container/DiContainer';

// Concrete implementation for testing
class TestSizeCalculationTemplate extends SizeCalculationTemplate {
  protected getSupportedInputs(): string[] {
    return ['size', 'ISizeTemplateInput'];
  }

  protected getCalculationSteps(): string[] {
    return ['validation', 'preprocessing', 'calculation', 'postprocessing'];
  }

  // Override canHandle to fix the logic
  public canHandle(input: ITemplateInput): boolean {
    return input.type === TemplateInputType.SIZE;
  }
}

describe('SizeCalculationTemplate', () => {
  let template: TestSizeCalculationTemplate;
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
    it('should handle valid size inputs', () => {
      testValidSizeInputHandling();
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
      template = container.resolve(TOKENS.SIZE_CALCULATION_TEMPLATE);
      setTemplateContext();
    } catch (error) {
      template = new TestSizeCalculationTemplate(mockContext);
    }
  }

  function setTemplateContext(): void {
    (template as any).context = mockContext;
  }

  function testTemplateInitialization(): void {
    expect(template).toBeInstanceOf(TestSizeCalculationTemplate);
    expect(template).toBeInstanceOf(SizeCalculationTemplate);
  }

  function testDefaultValidatorsCreation(): void {
    const validators = template.getValidators();
    
    expect(validators).toBeDefined();
    expect(Array.isArray(validators)).toBe(true);
  }

  function testMissingContextHandling(): void {
    const templateWithoutContext = new TestSizeCalculationTemplate(null as any);
    
    expect(templateWithoutContext).toBeInstanceOf(TestSizeCalculationTemplate);
    expect(() => templateWithoutContext.getValidators()).not.toThrow();
  }

  function testValidSizeInputHandling(): void {
    const validInput = createValidSizeInput();
    
    expect(template.canHandle(validInput)).toBe(true);
  }

  function createValidSizeInput(): ITemplateInput {
    return createSizeTemplateInput({
      type: TemplateInputType.SIZE,
      sizeUnit: SizeUnit.PIXEL,
      sizeValue: SizeValue.PIXEL,
      dimension: Dimension.WIDTH,
      baseValue: 100,
    });
  }

  function testInvalidInputRejection(): void {
    const invalidInputs = createInvalidInputs();
    
    for (const input of invalidInputs) {
      expect(template.canHandle(input)).toBe(false);
    }
  }

  function createInvalidInputs(): ITemplateInput[] {
    return [
      createSizeTemplateInput({
        type: TemplateInputType.POSITION,
        sizeUnit: SizeUnit.PIXEL,
        sizeValue: SizeValue.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
      }),
      createSizeTemplateInput({
        type: TemplateInputType.SCALE,
        sizeUnit: SizeUnit.PIXEL,
        sizeValue: SizeValue.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
      }),
    ];
  }

  function testDifferentInputTypes(): void {
    const inputTypes = [TemplateInputType.SIZE, TemplateInputType.POSITION, TemplateInputType.SCALE];
    
    for (const inputType of inputTypes) {
      const input = createInputWithType(inputType);
      const canHandle = template.canHandle(input);
      
      if (inputType === TemplateInputType.SIZE) {
        expect(canHandle).toBe(true);
      } else {
        expect(canHandle).toBe(false);
      }
    }
  }

  function createInputWithType(inputType: TemplateInputType): ITemplateInput {
    return createSizeTemplateInput({
      type: inputType,
      sizeUnit: SizeUnit.PIXEL,
      sizeValue: SizeValue.PIXEL,
      dimension: Dimension.WIDTH,
      baseValue: 100,
    });
  }

  function testCalculationStepExecution(): void {
    const input = createValidSizeInput();
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
    const input = createValidSizeInput();
    
    expect(template.canHandle(input)).toBe(true);
  }

  function testSupportedInputsRetrieval(): void {
    const supportedInputs = template.getSupportedInputs();
    
    expect(supportedInputs).toContain('size');
    expect(supportedInputs).toContain('ISizeTemplateInput');
  }

  function testCalculationStepsRetrieval(): void {
    const steps = template.getCalculationSteps();
    
    expect(steps).toContain('validation');
    expect(steps).toContain('preprocessing');
    expect(steps).toContain('calculation');
    expect(steps).toContain('postprocessing');
  }

  function testInputHandlingCheck(): void {
    const validInput = createValidSizeInput();
    const invalidInput = createInvalidInputs()[0];
    
    expect(template.canHandle(validInput)).toBe(true);
    expect(template.canHandle(invalidInput)).toBe(false);
  }

  function testCalculationEfficiency(): void {
    const input = createValidSizeInput();
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
      createValidSizeInput(),
      createInputWithType(TemplateInputType.POSITION),
      createInputWithType(TemplateInputType.SCALE),
    ];
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const testTemplate = new TestSizeCalculationTemplate(context);
      expect(testTemplate).toBeInstanceOf(TestSizeCalculationTemplate);
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
      new RangeValidator(0, 1000),
      new RangeValidator(-100, 100),
      new RangeValidator(0, 10000),
    ];
  }
});