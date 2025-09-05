import type { IUnitValidator } from '../validators/IUnitValidator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import type { IValidationInput } from '../interfaces/validation/IValidationInputTypes';

/**
 * Validation Manager
 * Handles validation operations, error tracking, and validation chain management
 * Follows Single Responsibility Principle - only manages validation
 * 
 * Note: This class focuses solely on validation management logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export interface IValidationManager {
  // Validator management
  addValidator(validator: IUnitValidator): void;
  removeValidator(validator: IUnitValidator): boolean;

  // Validation operations
  validateUnit(unit: IUnit, context: UnitContext): boolean;
  validateInput(input: IValidationInput): boolean;
  validateBatch(units: IUnit[], context: UnitContext): boolean[];

  // Error management
  getValidationErrors(): string[];
  clearValidationErrors(): void;
  getErrorCount(): number;

  // Validator management
  getAllValidators(): IUnitValidator[];
  getValidatorCount(): number;
  clearValidators(): void;

  // Validation statistics
  getValidationStatistics(): ValidationStatistics;
  getValidationSuccessRate(): number;
  getMostCommonErrors(): Array<{ error: string; count: number }>;
}

/**
 * Validation statistics interface
 */
export interface ValidationStatistics {
  totalValidations: number;
  successfulValidations: number;
  failedValidations: number;
  averageValidationTime: number;
  totalValidationTime: number;
  errorCount: number;
  validatorCount: number;
}

/**
 * Validation Manager Implementation
 * Manages validation operations and error tracking
 */
export class ValidationManager implements IValidationManager {
  private validators: IUnitValidator[] = [];
  private validationErrors: string[] = [];
  private validationStatistics: ValidationStatistics = {
    totalValidations: 0,
    successfulValidations: 0,
    failedValidations: 0,
    averageValidationTime: 0,
    totalValidationTime: 0,
    errorCount: 0,
    validatorCount: 0,
  };

  /**
   * Add a validator
   */
  public addValidator(validator: IUnitValidator): void {
    if (!this.validators.includes(validator)) {
      this.validators.push(validator);
      this.validationStatistics.validatorCount = this.validators.length;
    }
  }

  /**
   * Remove a validator
   */
  public removeValidator(validator: IUnitValidator): boolean {
    const index = this.validators.indexOf(validator);
    if (index !== -1) {
      this.validators.splice(index, 1);
      this.validationStatistics.validatorCount = this.validators.length;
      return true;
    }
    return false;
  }

  /**
   * Validate a unit
   */
  public validateUnit(unit: IUnit, context: UnitContext): boolean {
    const startTime = performance.now();
    
    try {
      // Run unit's own validation
      const unitValid = unit.validate(context);
      
      // Run all registered validators
      let allValidatorsPassed = true;
      for (const validator of this.validators) {
        if (!validator.validate(unit, context)) {
          allValidatorsPassed = false;
          this.validationErrors.push(`Validator ${validator.constructor.name} failed for unit ${unit.id}`);
        }
      }

      const isValid = unitValid && allValidatorsPassed;
      this.updateValidationStatistics(startTime, isValid);
      
      return isValid;
    } catch (error) {
      this.validationErrors.push(`Validation error for unit ${unit.id}: ${error}`);
      this.updateValidationStatistics(startTime, false);
      return false;
    }
  }

  /**
   * Validate an input
   */
  public validateInput(input: IValidationInput): boolean {
    const startTime = performance.now();
    
    try {
      // Basic input validation
      if (!input || typeof input !== 'object') {
        this.validationErrors.push('Invalid input: not an object');
        this.updateValidationStatistics(startTime, false);
        return false;
      }

      // Validate based on input type
      let isValid = true;
      
      if ('unit' in input) {
        // Unit validation input
        isValid = this.validateUnit(input.unit, input.context || {} as UnitContext);
      } else if ('value' in input) {
        // Value validation input
        isValid = typeof input.value === 'number' && !isNaN(input.value);
        if (!isValid) {
          this.validationErrors.push(`Invalid value: ${input.value}`);
        }
      } else if ('context' in input) {
        // Context validation input
        isValid = input.context && typeof input.context === 'object';
        if (!isValid) {
          this.validationErrors.push('Invalid context: not an object');
        }
      }

      this.updateValidationStatistics(startTime, isValid);
      return isValid;
    } catch (error) {
      this.validationErrors.push(`Input validation error: ${error}`);
      this.updateValidationStatistics(startTime, false);
      return false;
    }
  }

  /**
   * Validate multiple units in batch
   */
  public validateBatch(units: IUnit[], context: UnitContext): boolean[] {
    return units.map(unit => this.validateUnit(unit, context));
  }

  /**
   * Get validation errors
   */
  public getValidationErrors(): string[] {
    return [...this.validationErrors];
  }

  /**
   * Clear validation errors
   */
  public clearValidationErrors(): void {
    this.validationErrors = [];
    this.validationStatistics.errorCount = 0;
  }

  /**
   * Get error count
   */
  public getErrorCount(): number {
    return this.validationErrors.length;
  }

  /**
   * Get all validators
   */
  public getAllValidators(): IUnitValidator[] {
    return [...this.validators];
  }

  /**
   * Get validator count
   */
  public getValidatorCount(): number {
    return this.validators.length;
  }

  /**
   * Clear all validators
   */
  public clearValidators(): void {
    this.validators = [];
    this.validationStatistics.validatorCount = 0;
  }

  /**
   * Get validation statistics
   */
  public getValidationStatistics(): ValidationStatistics {
    return { ...this.validationStatistics };
  }

  /**
   * Get validation success rate
   */
  public getValidationSuccessRate(): number {
    if (this.validationStatistics.totalValidations === 0) return 1;
    return this.validationStatistics.successfulValidations / this.validationStatistics.totalValidations;
  }

  /**
   * Get most common errors
   */
  public getMostCommonErrors(): Array<{ error: string; count: number }> {
    const errorCounts: Record<string, number> = {};
    
    this.validationErrors.forEach(error => {
      errorCounts[error] = (errorCounts[error] || 0) + 1;
    });

    return Object.entries(errorCounts)
      .map(([error, count]) => ({ error, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  /**
   * Clear validation rules (alias for clearValidators)
   */
  public clearValidationRules(): void {
    this.clearValidators();
  }

  /**
   * Get validation error count (alias for getErrorCount)
   */
  public getValidationErrorCount(): number {
    return this.getErrorCount();
  }

  /**
   * Update validation statistics
   */
  private updateValidationStatistics(startTime: number, success: boolean): void {
    const endTime = performance.now();
    const validationTime = endTime - startTime;
    
    this.validationStatistics.totalValidations++;
    this.validationStatistics.totalValidationTime += validationTime;
    this.validationStatistics.averageValidationTime = 
      this.validationStatistics.totalValidationTime / this.validationStatistics.totalValidations;
    
    if (success) {
      this.validationStatistics.successfulValidations++;
    } else {
      this.validationStatistics.failedValidations++;
      this.validationStatistics.errorCount = this.validationErrors.length;
    }
  }
}