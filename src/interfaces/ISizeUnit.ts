import type { IUnit, UnitContext } from './IUnit';
import type { SizeUnit } from '../enums/SizeUnit';
import type { Dimension } from '../enums/Dimension';
import type { SizeValue } from '../enums/SizeValue';

/**
 * Core size unit interface - basic size operations
 */
export interface ISizeUnitCore extends IUnit {
  /** The type of size unit */
  readonly sizeUnit: SizeUnit;

  /** The dimension this unit affects */
  readonly dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;

  /** Whether to maintain aspect ratio when scaling */
  readonly maintainAspectRatio: boolean;

  /** The base value for the unit */
  readonly baseValue: number | SizeValue;
}

/**
 * Size unit calculation interface - calculation methods
 */
export interface ISizeUnitCalculation {
  /** Calculate size based on context */
  calculateSize(context: UnitContext): number;

  /** Calculate width specifically */
  calculateWidth(context: UnitContext): number;

  /** Calculate height specifically */
  calculateHeight(context: UnitContext): number;
}

/**
 * Size unit constraints interface - constraint operations
 */
export interface ISizeUnitConstraints {
  /** Get the minimum size constraint */
  getMinSize(): number | undefined;

  /** Get the maximum size constraint */
  getMaxSize(): number | undefined;

  /** Set size constraints */
  setSizeConstraints(min?: number, max?: number): void;
}

/**
 * Complete size unit interface
 * Combines all size unit functionality
 */
export interface ISizeUnit extends 
  ISizeUnitCore,
  ISizeUnitCalculation,
  ISizeUnitConstraints {
}
