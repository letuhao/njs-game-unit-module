import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';

/**
 * Validation Manager
 * Manages validation rules and validation logic
 */
export class ValidationManager {
  private validationRules: Map<string, (unit: IUnit, context: UnitContext) => boolean> = new Map();

  /**
   * Register a validation rule
   */
  registerRule(name: string, validator: (unit: IUnit, context: UnitContext) => boolean): void {
    this.validationRules.set(name, validator);
  }

  /**
   * Unregister a validation rule
   */
  unregisterRule(name: string): boolean {
    return this.validationRules.delete(name);
  }

  /**
   * Validate a unit
   */
  validateUnit(unit: IUnit, context: UnitContext): boolean {
    for (const [name, validator] of this.validationRules) {
      try {
        if (!validator(unit, context)) {
          return false;
        }
      } catch (error) {
        console.warn(`Validation rule '${name}' failed:`, error);
        return false;
      }
    }
    return true;
  }

  /**
   * Get validation rules
   */
  getValidationRules(): string[] {
    return Array.from(this.validationRules.keys());
  }

  /**
   * Clear all validation rules
   */
  clearRules(): void {
    this.validationRules.clear();
  }
}