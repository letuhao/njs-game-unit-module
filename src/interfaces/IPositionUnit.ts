import type { IUnit, UnitContext } from './IUnit';
import type { PositionUnit } from '../enums/PositionUnit';
import type { Dimension } from '../enums/Dimension';
import type { PositionValue } from '../enums/PositionValue';

/**
 * Core position unit interface - basic position operations
 */
export interface IPositionUnitCore extends IUnit {
  /** The type of position unit */
  readonly positionUnit: PositionUnit;

  /** The axis this unit affects */
  readonly axis: Dimension.X | Dimension.Y | Dimension.XY;

  /** The base value for the unit */
  readonly baseValue: number | PositionValue;
}

/**
 * Position unit calculation interface - calculation methods
 */
export interface IPositionUnitCalculation {
  /** Calculate position based on context */
  calculatePosition(context: UnitContext): number;

  /** Calculate X position specifically */
  calculateX(context: UnitContext): number;

  /** Calculate Y position specifically */
  calculateY(context: UnitContext): number;

  /** Calculate both X and Y positions */
  calculateBoth(context: UnitContext): { x: number; y: number };
}

/**
 * Position unit alignment interface - alignment operations
 */
export interface IPositionUnitAlignment {
  /** Get the alignment type (left, center, right, top, bottom) */
  getAlignment(): string | undefined;

  /** Set alignment for the position unit */
  setAlignment(alignment: string): void;
}

/**
 * Position unit offset interface - offset operations
 */
export interface IPositionUnitOffset {
  /** Get the offset value */
  getOffset(): number;

  /** Set the offset value */
  setOffset(offset: number): void;
}

/**
 * Complete position unit interface
 * Combines all position unit functionality
 */
export interface IPositionUnit extends 
  IPositionUnitCore,
  IPositionUnitCalculation,
  IPositionUnitAlignment,
  IPositionUnitOffset {
}
