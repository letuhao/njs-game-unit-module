import type { ISizeStrategyInput } from './ISizeStrategyInput';
import type { IPositionStrategyInput } from './IPositionStrategyInput';
import type { IScaleStrategyInput } from './IScaleStrategyInput';
import { UnitType } from '../../enums/UnitType';

/**
 * Core strategy input interface - basic properties
 */
export interface IStrategyInputCore {
  /** Unique identifier for the strategy input */
  readonly id: string;

  /** Human-readable name for the strategy input */
  readonly name: string;

  /** Unit type this strategy input is for */
  readonly unitType: UnitType;

  /** Whether the strategy input is valid */
  readonly isValid: boolean;
}

/**
 * Strategy input access interface - input access methods
 */
export interface IStrategyInputAccess {
  /** Get the size strategy input (if applicable) */
  getSizeInput(): ISizeStrategyInput | undefined;

  /** Get the position strategy input (if applicable) */
  getPositionInput(): IPositionStrategyInput | undefined;

  /** Get the scale strategy input (if applicable) */
  getScaleInput(): IScaleStrategyInput | undefined;
}

/**
 * Strategy input operations interface - operations and methods
 */
export interface IStrategyInputOperations {
  /** Validate the strategy input */
  validate(): boolean;

  /** Clone the strategy input */
  clone(): IStrategyInput;

  /** Get the calculated value */
  getValue(): number;

  /** Get the input type */
  getType(): string;
}

/**
 * Complete strategy input interface
 * Combines all strategy input functionality
 */
export interface IStrategyInput extends 
  IStrategyInputCore,
  IStrategyInputAccess,
  IStrategyInputOperations {
}

/**
 * Strategy input factory interface - creation methods
 */
export interface IStrategyInputFactory {
  /** Create a size strategy input */
  createSizeInput(config: {
    id: string;
    name: string;
    value: number | string;
    unit: string;
    dimension: string;
  }): IStrategyInput;

  /** Create a position strategy input */
  createPositionInput(config: {
    id: string;
    name: string;
    value: number | string;
    unit: string;
    axis: string;
  }): IStrategyInput;

  /** Create a scale strategy input */
  createScaleInput(config: {
    id: string;
    name: string;
    value: number | string;
    unit: string;
  }): IStrategyInput;

  /** Create a strategy input from a generic config */
  createFromConfig(config: {
    id: string;
    name: string;
    unitType: UnitType;
    value: number | string;
    unit: string;
    dimension?: string;
    axis?: string;
  }): IStrategyInput;
}

/**
 * Strategy input validator interface - validation methods
 */
export interface IStrategyInputValidator {
  /** Validate a strategy input */
  validate(input: IStrategyInput): boolean;

  /** Get validation errors */
  getErrors(): string[];

  /** Clear validation errors */
  clearErrors(): void;

  /** Check if the input is valid for the given unit type */
  isValidForUnitType(input: IStrategyInput, unitType: UnitType): boolean;
}
