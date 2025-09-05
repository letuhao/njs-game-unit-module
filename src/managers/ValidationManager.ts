import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Validation Manager
 * Manages validation rules and validation logic using DI
 */
export class ValidationManager {
  private validationRules: Map<string, (unit: IUnit, context: UnitContext) => boolean> = new Map();
  private logger: any;

  constructor() {
    // Resolve logger from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }
  }

  /**
   * Register a validation rule
   */
  registerRule(name: string, validator: (unit: IUnit, context: UnitContext) => boolean): void {
    this.validationRules.set(name, validator);
    this.logger.debug('ValidationManager', 'registerRule', 'Validation rule registered', { name });
  }

  /**
   * Unregister a validation rule
   */
  unregisterRule(name: string): boolean {
    const removed = this.validationRules.delete(name);
    this.logger.debug('ValidationManager', 'unregisterRule', 'Validation rule unregistered', { name, removed });
    return removed;
  }

  /**
   * Validate a unit
   */
  validateUnit(unit: IUnit, context: UnitContext): boolean {
    this.logger.debug('ValidationManager', 'validateUnit', 'Validating unit', { 
      unitId: unit.id, 
      unitType: unit.unitType 
    });

    for (const [name, validator] of this.validationRules) {
      try {
        if (!validator(unit, context)) {
          this.logger.warn('ValidationManager', 'validateUnit', 'Validation rule failed', { 
            ruleName: name, 
            unitId: unit.id 
          });
          return false;
        }
      } catch (error) {
        this.logger.error('ValidationManager', 'validateUnit', 'Validation rule error', { 
          ruleName: name, 
          unitId: unit.id, 
          error: error instanceof Error ? error.message : String(error)
        });
        return false;
      }
    }

    this.logger.debug('ValidationManager', 'validateUnit', 'Unit validation passed', { 
      unitId: unit.id 
    });
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