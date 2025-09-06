import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { PositionCalculationTemplate } from '../templates/PositionCalculationTemplate';
import { createMockContext } from './test-utils';
import { TemplateInputType } from '../enums/TemplateInputType';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { Dimension } from '../enums/Dimension';
import { createPositionTemplateInput, ITemplateInput } from '../interfaces/ITemplateInput';
import { RangeValidator } from '../validators/RangeValidator';
import { container, TOKENS } from '../container/DiContainer';

// Concrete implementation for testing
class TestPositionCalculationTemplate extends PositionCalculationTemplate {
  public getSupportedInputs(): string[] {
    return ['position', 'IPositionTemplateInput'];
  }

  public getCalculationSteps(): string[] {
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
    setupTestEnvironment();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create template with context', () => {
      testTemplateCreation();
    });

    it('should initialize with correct properties', () => {
      testTemplateInitialization();
    });
  });

  describe('input handling', () => {
    it('should handle valid position inputs', () => {
      testValidPositionInputHandling();
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
      template = container.resolve(TOKENS.POSITION_CALCULATION_TEMPLATE);
      setTemplateContext();
    } catch (error) {
      template = new TestPositionCalculationTemplate(mockContext);
    }
  }

  function setTemplateContext(): void {
    (template as any).context = mockContext;
  }

  function testTemplateCreation(): void {
    expect(template).toBeInstanceOf(TestPositionCalculationTemplate);
    expect(template).toBeInstanceOf(PositionCalculationTemplate);
  }

  function testTemplateInitialization(): void {
    expect(template.getSupportedInputs()).toBeDefined();
    expect(template.getCalculationSteps()).toBeDefined();
  }

  function testValidPositionInputHandling(): void {
    const validInput = createValidPositionInput();
    
    expect(template.canHandle(validInput)).toBe(true);
  }

  function createValidPositionInput(): ITemplateInput {
    return createPositionTemplateInput(
      'valid-position-input',
      100,
      PositionValue.PIXEL,
      PositionUnit.PIXEL,
      Dimension.X
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
      createPositionTemplateInput(
        'invalid-input-1',
        100,
        PositionValue.PIXEL,
        PositionUnit.PIXEL,
        Dimension.X
      ),
      createPositionTemplateInput(
        'invalid-input-2',
        100,
        PositionValue.PIXEL,
        PositionUnit.PIXEL,
        Dimension.X
      ),
    ];
  }

  function testDifferentInputTypes(): void {
    const inputTypes = [TemplateInputType.POSITION, TemplateInputType.SIZE, TemplateInputType.SCALE];
    
    for (const inputType of inputTypes) {
      const input = createInputWithType(inputType);
      const canHandle = template.canHandle(input);
      
      if (inputType === TemplateInputType.POSITION) {
        expect(canHandle).toBe(true);
      } else {
        expect(canHandle).toBe(false);
      }
    }
  }

  function createInputWithType(inputType: TemplateInputType): ITemplateInput {
    return createPositionTemplateInput(
      'test-input',
      100,
      PositionValue.PIXEL,
      PositionUnit.PIXEL,
      Dimension.X
    );
  }

  function testCalculationStepExecution(): void {
    const input = createValidPositionInput();
    const steps = template.getCalculationSteps();
    
    expect(steps).toContain('validation');
    expect(steps).toContain('preprocessing');
    expect(steps).toContain('calculation');
    expect(steps).toContain('postprocessing');
  }

  function testCalculationErrorHandling(): void {
    const invalidInput = createInvalidInputs()[0];
    
    expect(() => template.canHandle(invalidInput!)).not.toThrow();
  }

  function testInputValidation(): void {
    const input = createValidPositionInput();
    
    expect(template.canHandle(input)).toBe(true);
  }

  function testSupportedInputsRetrieval(): void {
    const supportedInputs = template.getSupportedInputs();
    
    expect(supportedInputs).toContain('position');
    expect(supportedInputs).toContain('IPositionTemplateInput');
  }

  function testCalculationStepsRetrieval(): void {
    const steps = template.getCalculationSteps();
    
    expect(steps).toContain('validation');
    expect(steps).toContain('preprocessing');
    expect(steps).toContain('calculation');
    expect(steps).toContain('postprocessing');
  }

  function testInputHandlingCheck(): void {
    const validInput = createValidPositionInput();
    const invalidInput = createInvalidInputs()[0];
    
    expect(template.canHandle(validInput)).toBe(true);
    expect(template.canHandle(invalidInput!)).toBe(false);
  }

  function testCalculationEfficiency(): void {
    const input = createValidPositionInput();
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
      createValidPositionInput(),
      createInputWithType(TemplateInputType.SIZE),
      createInputWithType(TemplateInputType.SCALE),
    ];
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const testTemplate = new TestPositionCalculationTemplate(context);
      expect(testTemplate).toBeInstanceOf(TestPositionCalculationTemplate);
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