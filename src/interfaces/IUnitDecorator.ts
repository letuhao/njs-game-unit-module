import type { IUnit } from './IUnit';
import type { UnitContext } from './IUnit';
import { UnitType } from '../enums/UnitType';

/**
 * Core unit decorator interface - basic decorator operations
 */
export interface IUnitDecoratorCore extends IUnit {
  /** Get the wrapped unit */
  getWrappedUnit(): IUnit;

  /** Get the decorator type */
  getDecoratorType(): string;

  /** Check if the decorator is enabled */
  isEnabled(): boolean;

  /** Enable or disable the decorator */
  setEnabled(enabled: boolean): void;
}

/**
 * Unit decorator metadata interface - metadata and configuration
 */
export interface IUnitDecoratorMetadata {
  /** Get decorator metadata */
  getMetadata(): {
    type: string;
    priority: number;
    description: string;
    version: string;
  };

  /** Get the decorator priority (higher = applied first) */
  getPriority(): number;
}

/**
 * Unit decorator validation interface - validation and compatibility
 */
export interface IUnitDecoratorValidation {
  /** Check if this decorator can be applied to a unit */
  canDecorate(unit: IUnit): boolean;
}

/**
 * Complete unit decorator interface
 * Combines all decorator functionality
 */
export interface IUnitDecorator extends 
  IUnitDecoratorCore,
  IUnitDecoratorMetadata,
  IUnitDecoratorValidation {
}

/**
 * Base Unit Decorator Implementation
 * Provides common functionality for unit decorators
 */
export abstract class BaseUnitDecorator implements IUnitDecorator {
  protected enabled: boolean = true;
  protected readonly priority: number = 1;
  protected readonly description: string = '';
  protected readonly version: string = '1.0.0';

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly unitType: UnitType,
    protected readonly wrappedUnit: IUnit
  ) {}

  // IUnit interface implementation - delegate to wrapped unit
  get isActive(): boolean {
    return this.wrappedUnit.isActive && this.enabled;
  }

  calculate(context: UnitContext): number {
    if (!this.enabled) {
      return this.wrappedUnit.calculate(context);
    }

    // Apply pre-calculation logic
    this.beforeCalculation(context);

    // Calculate using wrapped unit
    const result = this.performCalculation(context);

    // Apply post-calculation logic
    this.afterCalculation(result, context);

    return result;
  }

  isResponsive(): boolean {
    return this.wrappedUnit.isResponsive();
  }

  validate(context: UnitContext): boolean {
    return this.wrappedUnit.validate(context) && this.validateDecorator(context);
  }

  toString(): string {
    return `${this.constructor.name}(${this.id}, ${this.name}) -> ${this.wrappedUnit.toString()}`;
  }

  clone(overrides?: Partial<IUnit>): IUnit {
    const cloned = Object.create(Object.getPrototypeOf(this));
    Object.assign(cloned, this, overrides);
    return cloned;
  }

  // IUnitDecoratorCore interface implementation
  getWrappedUnit(): IUnit {
    return this.wrappedUnit;
  }

  getDecoratorType(): string {
    return this.constructor.name;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  // IUnitDecoratorMetadata interface implementation
  getMetadata() {
    return {
      type: this.getDecoratorType(),
      priority: this.priority,
      description: this.description,
      version: this.version,
    };
  }

  getPriority(): number {
    return this.priority;
  }

  // IUnitDecoratorValidation interface implementation
  canDecorate(_unit: IUnit): boolean {
    return true; // Default implementation allows decorating any unit
  }

  /**
   * Abstract methods that subclasses must implement
   */
  protected abstract performCalculation(context: UnitContext): number;
  protected abstract validateDecorator(context: UnitContext): boolean;

  /**
   * Hook methods that subclasses can override
   */
  protected beforeCalculation(_context: UnitContext): void {
    // Default implementation - can be overridden
  }

  protected afterCalculation(_result: number, _context: UnitContext): void {
    // Default implementation - can be overridden
  }
}

/**
 * Unit Decorator Chain - basic chain operations
 */
export interface IUnitDecoratorChainCore {
  /** Add a decorator to the chain */
  addDecorator(decorator: IUnitDecorator): void;

  /** Remove a decorator from the chain */
  removeDecorator(decoratorId: string): boolean;

  /** Get all decorators in the chain */
  getDecorators(): IUnitDecorator[];

  /** Check if the chain has decorators */
  hasDecorators(): boolean;

  /** Clear all decorators */
  clear(): void;
}

/**
 * Unit Decorator Chain - advanced operations
 */
export interface IUnitDecoratorChainAdvanced {
  /** Get decorators by type */
  getDecoratorsByType(type: string): IUnitDecorator[];

  /** Sort decorators by priority */
  sortByPriority(): void;

  /** Apply all decorators to a unit */
  applyDecorators(unit: IUnit): IUnit;
}

/**
 * Complete Unit Decorator Chain interface
 */
export interface IUnitDecoratorChain extends 
  IUnitDecoratorChainCore,
  IUnitDecoratorChainAdvanced {
}

/**
 * Unit Decorator Registry - basic registry operations
 */
export interface IUnitDecoratorRegistryCore {
  /** Register a decorator type */
  registerDecoratorType(
    type: string,
    decoratorClass: new (...args: unknown[]) => IUnitDecorator
  ): void;

  /** Create a decorator instance */
  createDecorator(type: string, unit: IUnit, ...args: unknown[]): IUnitDecorator | undefined;

  /** Get all registered decorator types */
  getRegisteredTypes(): string[];

  /** Check if a decorator type is registered */
  hasDecoratorType(type: string): boolean;
}

/**
 * Unit Decorator Registry - metadata operations
 */
export interface IUnitDecoratorRegistryMetadata {
  /** Get decorator metadata */
  getDecoratorMetadata(type: string): Record<string, unknown>;
}

/**
 * Complete Unit Decorator Registry interface
 */
export interface IUnitDecoratorRegistry extends 
  IUnitDecoratorRegistryCore,
  IUnitDecoratorRegistryMetadata {
}
