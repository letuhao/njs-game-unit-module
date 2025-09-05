import type { IUnitDecorator } from './IUnitDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Validation Decorator
 * Adds validation functionality to units using DI
 */
export class ValidationDecorator implements IUnitDecorator {
  private readonly decoratedUnit: IUnit;
  private validationRules: Array<{
    name: string;
    validator: (unit: IUnit, context: UnitContext) => boolean;
    message: string;
  }> = [];
  private validationErrors: Array<{
    rule: string;
    message: string;
    timestamp: Date;
    context: UnitContext;
  }> = [];
  private validationManager: any;

  constructor(decoratedUnit: IUnit) {
    this.decoratedUnit = decoratedUnit;
    
    // Resolve validation manager from DI container
    try {
      this.validationManager = container.resolve(TOKENS.VALIDATION_MANAGER);
    } catch (error) {
      // Fallback to basic validation if DI fails
      this.validationManager = null;
    }
  }

  /**
   * Get the decorated unit
   */
  getDecoratedUnit(): IUnit {
    return this.decoratedUnit;
  }

  /**
   * Calculate with validation
   */
  calculate(context: UnitContext): number {
    // Validate before calculation
    if (!this.validate(context)) {
      throw new Error(`Validation failed: ${this.getValidationErrors().map(e => e.message).join(', ')}`);
    }

    // Perform calculation
    const result = this.decoratedUnit.calculate(context);

    // Validate result
    this.validateResult(result, context);

    return result;
  }

  /**
   * Check if responsive with validation
   */
  isResponsive(): boolean {
    return this.decoratedUnit.isResponsive();
  }

  /**
   * Get active state with validation
   */
  get isActive(): boolean {
    return this.decoratedUnit.isActive;
  }

  /**
   * Validate unit with enhanced validation
   */
  validate(context: UnitContext): boolean {
    // Clear previous errors
    this.validationErrors = [];

    // Use validation manager if available
    if (this.validationManager) {
      try {
        return this.validationManager.validateUnit(this.decoratedUnit, context);
      } catch (error) {
        this.addValidationError('validation_manager', `Validation manager error: ${error}`, context);
      }
    }

    // Fallback to basic validation
    return this.basicValidation(context);
  }

  /**
   * Basic validation fallback
   */
  private basicValidation(context: UnitContext): boolean {
    let isValid = true;

    // Check if unit is active
    if (!this.decoratedUnit.isActive) {
      this.addValidationError('unit_inactive', 'Unit is not active', context);
      isValid = false;
    }

    // Check if unit can be calculated
    if (typeof this.decoratedUnit.calculate !== 'function') {
      this.addValidationError('invalid_calculate', 'Unit does not have calculate method', context);
      isValid = false;
    }

    // Check context validity
    if (!context) {
      this.addValidationError('invalid_context', 'Context is required', context);
      isValid = false;
    }

    return isValid;
  }

  /**
   * Validate calculation result
   */
  private validateResult(result: number, context: UnitContext): void {
    if (typeof result !== 'number') {
      this.addValidationError('invalid_result_type', 'Calculation result must be a number', context);
    }

    if (isNaN(result)) {
      this.addValidationError('nan_result', 'Calculation result is NaN', context);
    }

    if (!isFinite(result)) {
      this.addValidationError('infinite_result', 'Calculation result is infinite', context);
    }
  }

  /**
   * Add validation rule
   */
  addValidationRule(
    name: string,
    validator: (unit: IUnit, context: UnitContext) => boolean,
    message: string
  ): void {
    this.validationRules.push({ name, validator, message });
  }

  /**
   * Remove validation rule
   */
  removeValidationRule(name: string): boolean {
    const index = this.validationRules.findIndex(rule => rule.name === name);
    if (index !== -1) {
      this.validationRules.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get validation errors
   */
  getValidationErrors(): Array<{
    rule: string;
    message: string;
    timestamp: Date;
    context: UnitContext;
  }> {
    return [...this.validationErrors];
  }

  /**
   * Clear validation errors
   */
  clearValidationErrors(): void {
    this.validationErrors = [];
  }

  /**
   * Get validation statistics
   */
  getValidationStatistics(): {
    totalRules: number;
    totalErrors: number;
    errorCountByRule: Record<string, number>;
    lastValidationTime: Date | null;
  } {
    const errorCountByRule: Record<string, number> = {};
    let lastValidationTime: Date | null = null;

    for (const error of this.validationErrors) {
      errorCountByRule[error.rule] = (errorCountByRule[error.rule] || 0) + 1;
      if (!lastValidationTime || error.timestamp > lastValidationTime) {
        lastValidationTime = error.timestamp;
      }
    }

    return {
      totalRules: this.validationRules.length,
      totalErrors: this.validationErrors.length,
      errorCountByRule,
      lastValidationTime,
    };
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `ValidationDecorator(${this.decoratedUnit.toString()})`;
  }

  /**
   * Clone the decorator
   */
  clone(): ValidationDecorator {
    const cloned = new ValidationDecorator(this.decoratedUnit);
    cloned.validationRules = [...this.validationRules];
    return cloned;
  }

  /**
   * Add a validation error
   */
  private addValidationError(rule: string, message: string, context?: UnitContext): void {
    this.validationErrors.push({
      rule,
      message,
      timestamp: new Date(),
      context: context || ({} as UnitContext),
    });
  }
}