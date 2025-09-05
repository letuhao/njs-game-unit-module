import type { UnitType } from '../enums/UnitType';
import type { IIdentifiable } from './identity/IIdentifiable';
import type { ICalculatable } from './calculation/ICalculatable';
import type { IValidatable } from './validation/IValidatable';
import type { IFormattable } from './formatting/IFormattable';
import type { ICloneable } from './cloning/ICloneable';
import type { IStateful } from './state/IStateful';

/**
 * Base interface for all unit implementations
 * Now uses segregated interfaces to follow Interface Segregation Principle
 */
export interface IUnit extends 
  IIdentifiable,
  ICalculatable,
  IValidatable,
  IFormattable,
  ICloneable<IUnit>,
  IStateful {
  /**
   * Unit type (size, position, scale)
   */
  readonly unitType: UnitType;
}

/**
 * Core context interface - basic context properties
 */
export interface IUnitContextCore {
  /**
   * Additional custom context data
   */
  [key: string]: unknown;
}

/**
 * Parent context interface - parent container information
 */
export interface IUnitContextParent {
  /**
   * Parent container dimensions
   */
  parent?: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

/**
 * Scene context interface - scene information
 */
export interface IUnitContextScene {
  /**
   * Scene dimensions
   */
  scene?: {
    width: number;
    height: number;
  };
}

/**
 * Viewport context interface - viewport information
 */
export interface IUnitContextViewport {
  /**
   * Viewport dimensions
   */
  viewport?: {
    width: number;
    height: number;
  };
}

/**
 * Breakpoint context interface - breakpoint information
 */
export interface IUnitContextBreakpoint {
  /**
   * Current breakpoint information
   */
  breakpoint?: {
    name: string;
    width: number;
    height: number;
  };
}

/**
 * Content context interface - content information
 */
export interface IUnitContextContent {
  /**
   * Content dimensions (for content-based units)
   */
  content?: {
    width: number;
    height: number;
  };
}

/**
 * Complete context information for unit calculations
 * Combines all context functionality
 */
export interface UnitContext extends 
  IUnitContextCore,
  IUnitContextParent,
  IUnitContextScene,
  IUnitContextViewport,
  IUnitContextBreakpoint,
  IUnitContextContent {
}
