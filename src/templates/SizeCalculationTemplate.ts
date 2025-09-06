import type { IUnitCalculationTemplate } from './IUnitCalculationTemplate';
import type { UnitContext } from '../interfaces/IUnit';
import type { ITemplateInput } from '../interfaces/template/ITemplateInputTypes';
import { SizeUnitStrategy } from '../strategies/SizeUnitStrategy';
import { RangeValidator } from '../validators/RangeValidator';
import { TypeValidator } from '../validators/TypeValidator';
import { UnitType } from '../enums/UnitType';
import { Dimension } from '../enums/Dimension';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Size Calculation Template
 * Implements the Template Method pattern for size calculations
 * Provides hooks for customization while maintaining consistent calculation flow
 * 
 * Note: This class focuses solely on size calculation template logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export abstract class SizeCalculationTemplate implements IUnitCalculationTemplate {
  protected readonly strategy: SizeUnitStrategy;
  protected readonly validators: Array<RangeValidator | TypeValidator>;
  protected readonly context: UnitContext;
  protected templateStatistics = {
    totalCalculations: 0,
    successfulCalculations: 0,
    failedCalculations: 0,
    averageCalculationTime: 0,
    totalCalculationTime: 0,
    calculationsByType: {} as Record<string, number>,
  };

  constructor(context: UnitContext) {
    this.context = context;
    this.strategy = new SizeUnitStrategy();
    this.validators = this.createValidators();
  }

  /**
   * Template method for size calculation
   * Defines the algorithm structure with customizable hooks
   */
  public calculate(input: ITemplateInput): number {
    const startTime = performance.now();
    this.templateStatistics.totalCalculations++;

    try {
      // Step 1: Validate input
      this.validateInput(input);

      // Step 2: Pre-process input
      const processedInput = this.preProcessInput(input);

      // Step 3: Execute calculation
      const result = this.executeCalculation(processedInput);

      // Step 4: Post-process result
      const finalResult = this.postProcessResult(result, processedInput);

      // Step 5: Validate result
      this.validateResult(finalResult);

      this.templateStatistics.successfulCalculations++;
      this.updateStatistics(true, performance.now() - startTime, 'size');
      return finalResult;
    } catch (error) {
      this.templateStatistics.failedCalculations++;
      this.updateStatistics(false, performance.now() - startTime, 'size');
      throw new Error(`Size calculation failed: ${error}`);
    }
  }

  /**
   * Get template name
   */
  public get name(): string {
    return 'SizeCalculationTemplate';
  }

  /**
   * Get template type
   */
  public get type(): UnitType {
    return UnitType.SIZE;
  }

  /**
   * Get template statistics
   */
  public getTemplateStatistics() {
    return { ...this.templateStatistics };
  }

  canHandle(input: ITemplateInput): boolean {
    return input.type === 'SIZE' as any;
  }

  getCalculationMetadata(): { templateName: string; version: string; supportedInputs: string[]; calculationSteps: string[] } {
    return {
      templateName: 'SizeCalculationTemplate',
      version: '1.0.0',
      supportedInputs: ['SIZE'],
      calculationSteps: ['validation', 'preprocessing', 'calculation', 'postprocessing']
    };
  }

  getPerformanceMetrics(): { totalTime: number; stepTimes: Record<string, number>; memoryUsage: number } {
    return {
      totalTime: this.templateStatistics.totalCalculationTime,
      stepTimes: {},
      memoryUsage: 0 // Not tracked in current implementation
    };
  }

  /**
   * Reset template statistics
   */
  public resetStatistics(): void {
    this.templateStatistics = {
      totalCalculations: 0,
      successfulCalculations: 0,
      failedCalculations: 0,
      averageCalculationTime: 0,
      totalCalculationTime: 0,
      calculationsByType: {},
    };
  }

  /**
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.templateStatistics.totalCalculations === 0) return 1;
    return this.templateStatistics.successfulCalculations / this.templateStatistics.totalCalculations;
  }

  /**
   * Validate input
   */
  protected validateInput(input: ITemplateInput): void {
    for (const validator of this.validators) {
      if (!validator.validate(input as any)) {
        throw new Error(`Input validation failed: ${validator.constructor.name}`);
      }
    }
  }

  /**
   * Pre-process input
   */
  protected preProcessInput(input: ITemplateInput): ITemplateInput {
    // Default implementation - can be overridden
    return input;
  }

  /**
   * Execute calculation
   */
  protected executeCalculation(input: ITemplateInput): number {
    // Default implementation - can be overridden
    return this.strategy.calculate(input, this.context);
  }

  /**
   * Post-process result
   */
  protected postProcessResult(result: number, input: ITemplateInput): number {
    // Default implementation - can be overridden
    return result;
  }

  /**
   * Validate result
   */
  protected validateResult(result: number): void {
    if (typeof result !== 'number' || isNaN(result)) {
      throw new Error('Invalid result: must be a valid number');
    }

    if (result < 0) {
      throw new Error('Invalid result: size cannot be negative');
    }

    if (result > 10000) {
      throw new Error('Invalid result: size too large (max 10000)');
    }
  }

  /**
   * Create validators
   */
  protected createValidators(): Array<RangeValidator | TypeValidator> {
    return [
      new TypeValidator(),
      new RangeValidator(0, 10000), // Reasonable size range
    ];
  }

  /**
   * Get validators
   */
  public getValidators(): Array<RangeValidator | TypeValidator> {
    return [...this.validators];
  }

  /**
   * Get calculation steps
   */
  public getCalculationSteps(): string[] {
    return [
      'validateInput',
      'preProcessInput', 
      'executeCalculation',
      'postProcessResult',
      'validateResult'
    ];
  }

  /**
   * Get supported inputs
   */
  public getSupportedInputs(): string[] {
    return ['size', 'position', 'scale'];
  }

  /**
   * Update statistics
   */
  private updateStatistics(success: boolean, duration: number, type: string): void {
    this.templateStatistics.totalCalculationTime += duration;
    this.templateStatistics.averageCalculationTime = 
      this.templateStatistics.totalCalculationTime / this.templateStatistics.totalCalculations;
    
    this.templateStatistics.calculationsByType[type] = 
      (this.templateStatistics.calculationsByType[type] || 0) + 1;
  }
}