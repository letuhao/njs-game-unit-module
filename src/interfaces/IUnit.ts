import type { UnitType } from '../enums/UnitType';

/**
 * Base interface for all unit implementations
 * Provides common functionality for size, position, and scale units
 */
export interface IUnit {
  /**
   * Unique identifier for the unit
   */
  readonly id: string;

  /**
   * Human-readable name for the unit
   */
  readonly name: string;

  /**
   * Unit type (size, position, scale)
   */
  readonly unitType: UnitType;

  /**
   * Whether this unit is currently active/enabled
   */
  readonly isActive: boolean;

  /**
   * Calculate the actual value based on context
   * @param context - Context information for calculation
   * @returns Calculated numeric value
   */
  calculate(context: UnitContext): number;

  /**
   * Validate if the unit can be used in the given context
   * @param context - Context to validate against
   * @returns True if valid, false otherwise
   */
  validate(context: UnitContext): boolean;

  /**
   * Check if the unit is responsive (changes with context)
   * @returns True if responsive, false if static
   */
  isResponsive(): boolean;

  /**
   * Get a string representation of the unit
   * @returns String representation
   */
  toString(): string;

  /**
   * Clone the unit with optional modifications
   * @param overrides - Properties to override in the clone
   * @returns New unit instance
   */
  clone(overrides?: Partial<IUnit>): IUnit;
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
