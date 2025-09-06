import type { IUnitDecorator } from '../interfaces/IUnitDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { BaseUnitDecorator } from '../interfaces/IUnitDecorator';
import { UnitType } from '../enums/UnitType';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Validation Decorator
 * Adds validation functionality to units using DI
 */
export class ValidationDecorator extends BaseUnitDecorator {
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

  constructor(wrappedUnit: IUnit, strictMode?: boolean) {
    super(
      `validation-${wrappedUnit.id}`,
      `Validation Decorator for ${wrappedUnit.name}`,
      wrappedUnit.unitType,
      wrappedUnit
    );
    
    // Resolve validation manager from DI container
    try {
      this.validationManager = container.resolve(TOKENS.VALIDATION_MANAGER);
    } catch (error) {
      // Fallback to basic validation if DI fails
      this.validationManager = null;
    }

    // Set strict mode if provided
    if (strictMode !== undefined) {
      this.strictMode = strictMode;
    }
  }

  /**
   * Strict mode for validation
   */
  private strictMode: boolean = false;

  /**
   * Get the decorated unit
   */
  getDecoratedUnit(): IUnit {
    return this.wrappedUnit;
  }

  /**
   * Get the unit property (for test compatibility)
   */
  get unit(): IUnit {
    return this.wrappedUnit;
  }

  /**
   * Validate input
   */
  validateInput(input: any): boolean {
    try {
      // Basic input validation
      if (input === null || input === undefined) {
        return false;
      }

      // Validate based on input type
      if (typeof input === 'object') {
        return this.validateObjectInput(input);
      }

      if (typeof input === 'number') {
        return this.validateNumberInput(input);
      }

      if (typeof input === 'string') {
        return this.validateStringInput(input);
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validate context
   */
  validateContext(context: UnitContext): boolean {
    try {
      if (!context || typeof context !== 'object') {
        return false;
      }

      // Check for required context properties
      const requiredProperties = ['parent', 'scene', 'viewport'];
      for (const prop of requiredProperties) {
        if (!(prop in context)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validate unit
   */
  validateUnit(unit: IUnit): boolean {
    try {
      if (!unit || typeof unit !== 'object') {
        return false;
      }

      // Check for required unit properties
      const requiredProperties = ['id', 'name', 'unitType', 'calculate', 'validate'];
      for (const prop of requiredProperties) {
        if (!(prop in unit)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Wrap unit with validation
   */
  wrapUnit(unit: IUnit): IUnit {
    return new ValidationDecorator(unit) as any;
  }

  /**
   * Validate object input
   */
  private validateObjectInput(input: any): boolean {
    if (Array.isArray(input)) {
      return input.every(item => this.validateInput(item));
    }

    // Validate object properties
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        if (!this.validateInput(input[key])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Validate number input
   */
  private validateNumberInput(input: number): boolean {
    return !isNaN(input) && isFinite(input);
  }

  /**
   * Validate string input
   */
  private validateStringInput(input: string): boolean {
    return typeof input === 'string' && input.length > 0;
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
    const result = this.wrappedUnit.calculate(context);

    // Validate result
    this.validateResult(result, context);

    return result;
  }

  /**
   * Check if responsive with validation
   */
  isResponsive(): boolean {
    return this.wrappedUnit.isResponsive();
  }

  /**
   * Get active state with validation
   */
  get isActive(): boolean {
    return this.wrappedUnit.isActive;
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
        return this.validationManager.validateUnit(this.wrappedUnit, context);
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
    if (!this.wrappedUnit.isActive) {
      this.addValidationError('unit_inactive', 'Unit is not active', context);
      isValid = false;
    }

    // Check if unit can be calculated
    if (typeof this.wrappedUnit.calculate !== 'function') {
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
    return `ValidationDecorator(${this.wrappedUnit.toString()})`;
  }

  /**
   * Clone the decorator
   */
  clone(): ValidationDecorator {
    const cloned = new ValidationDecorator(this.wrappedUnit);
    cloned.validationRules = [...this.validationRules];
    return cloned;
  }

  // Override performCalculation to add validation
  protected performCalculation(context: UnitContext): number {
    // Validate before calculation
    if (!this.validateDecorator(context)) {
      throw new Error('Validation failed before calculation');
    }
    
    // Perform calculation using wrapped unit
    return this.wrappedUnit.calculate(context);
  }

  // Override validateDecorator to add validation rules
  protected validateDecorator(context: UnitContext): boolean {
    // Run all validation rules
    for (const rule of this.validationRules) {
      try {
        if (!rule.validator(this.wrappedUnit, context)) {
          this.addValidationError(rule.name, rule.message, context);
          return false;
        }
      } catch (error) {
        this.addValidationError(rule.name, `Validation error: ${error instanceof Error ? error.message : String(error)}`, context);
        return false;
      }
    }
    return true;
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