import type { IUnit, UnitContext } from './IUnit';
import type { ScaleUnit } from '../enums/ScaleUnit';
import type { ScaleValue } from '../enums/ScaleValue';

/**
 * Core scale unit interface - basic scale operations
 */
export interface IScaleUnitCore extends IUnit {
  /** The type of scale unit */
  readonly scaleUnit: ScaleUnit;

  /** The base value for the unit */
  readonly baseValue: number | ScaleValue;

  /** Whether to maintain aspect ratio when scaling */
  readonly maintainAspectRatio: boolean;
}

/**
 * Scale unit calculation interface - calculation methods
 */
export interface IScaleUnitCalculation {
  /** Calculate scale based on context */
  calculateScale(context: UnitContext): number;

  /** Calculate X scale specifically */
  calculateScaleX(context: UnitContext): number;

  /** Calculate Y scale specifically */
  calculateScaleY(context: UnitContext): number;

  /** Calculate both X and Y scales */
  calculateBoth(context: UnitContext): { scaleX: number; scaleY: number };
}

/**
 * Scale unit constraints interface - constraint operations
 */
export interface IScaleUnitConstraints {
  /** Get the minimum scale constraint */
  getMinScale(): number | undefined;

  /** Get the maximum scale constraint */
  getMaxScale(): number | undefined;

  /** Set scale constraints */
  setScaleConstraints(min?: number, max?: number): void;
}

/**
 * Scale unit uniform interface - uniform scaling operations
 */
export interface IScaleUnitUniform {
  /** Check if scaling should be uniform (same for X and Y) */
  isUniformScaling(): boolean;

  /** Set uniform scaling mode */
  setUniformScaling(uniform: boolean): void;
}

/**
 * Complete scale unit interface
 * Combines all scale unit functionality
 */
export interface IScaleUnit extends 
  IScaleUnitCore,
  IScaleUnitCalculation,
  IScaleUnitConstraints,
  IScaleUnitUniform {
}
