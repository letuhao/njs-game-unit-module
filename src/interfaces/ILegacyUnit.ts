/**
 * Legacy Unit Interface
 * Defines the interface for legacy unit implementations
 */

import { UnitType } from '../enums/UnitType';

/**
 * Legacy unit interface for backward compatibility
 */
export interface ILegacyUnit {
  /**
   * Unique identifier for the unit
   */
  readonly id: string;

  /**
   * Human-readable name for the unit
   */
  readonly name: string;

  /**
   * Type of unit (size, position, scale)
   */
  readonly unitType: UnitType;

  /**
   * Calculate the unit value
   * @param context - The calculation context
   * @returns The calculated value
   */
  calculate(context: any): number;

  /**
   * Validate the unit
   * @param context - The validation context
   * @returns Whether the unit is valid
   */
  validate(context: any): boolean;

  /**
   * Format the unit value
   * @param format - The format string
   * @returns The formatted value
   */
  format(format: string): string;

  /**
   * Clone the unit
   * @returns A new instance of the unit
   */
  clone(): ILegacyUnit;

  /**
   * Get the current state of the unit
   * @returns The unit state
   */
  getState(): Record<string, unknown>;

  /**
   * Set the state of the unit
   * @param state - The new state
   */
  setState(state: Record<string, unknown>): void;

  /**
   * Get the unit configuration
   * @returns The unit configuration
   */
  getConfig(): Record<string, unknown>;

  /**
   * Update the unit configuration
   * @param config - The new configuration
   */
  updateConfig(config: Record<string, unknown>): void;

  /**
   * Check if the unit is enabled
   * @returns Whether the unit is enabled
   */
  isEnabled(): boolean;

  /**
   * Enable or disable the unit
   * @param enabled - Whether to enable the unit
   */
  setEnabled(enabled: boolean): void;

  /**
   * Get the unit metadata
   * @returns The unit metadata
   */
  getMetadata(): Record<string, unknown>;

  /**
   * Set the unit metadata
   * @param metadata - The new metadata
   */
  setMetadata(metadata: Record<string, unknown>): void;

  /**
   * Unit metadata
   */
  readonly metadata: Record<string, unknown>;
}

/**
 * Legacy size unit interface
 */
export interface ILegacySizeUnit extends ILegacyUnit {
  readonly unitType: UnitType.SIZE;
  readonly sizeValue: number;
  readonly sizeUnit: string;
  readonly dimension: string;
}

/**
 * Legacy position unit interface
 */
export interface ILegacyPositionUnit extends ILegacyUnit {
  readonly unitType: UnitType.POSITION;
  readonly positionValue: number;
  readonly positionUnit: string;
  readonly axis: string;
}

/**
 * Legacy scale unit interface
 */
export interface ILegacyScaleUnit extends ILegacyUnit {
  readonly unitType: UnitType.SCALE;
  readonly scaleValue: number;
  readonly scaleUnit: string;
  readonly dimension: string;
}

/**
 * Legacy unit factory interface
 */
export interface ILegacyUnitFactory {
  /**
   * Create a legacy size unit
   * @param config - The unit configuration
   * @returns The created legacy size unit
   */
  createSizeUnit(config: Record<string, unknown>): ILegacySizeUnit;

  /**
   * Create a legacy position unit
   * @param config - The unit configuration
   * @returns The created legacy position unit
   */
  createPositionUnit(config: Record<string, unknown>): ILegacyPositionUnit;

  /**
   * Create a legacy scale unit
   * @param config - The unit configuration
   * @returns The created legacy scale unit
   */
  createScaleUnit(config: Record<string, unknown>): ILegacyScaleUnit;

  /**
   * Create a legacy unit from configuration
   * @param config - The unit configuration
   * @returns The created legacy unit
   */
  createUnit(config: Record<string, unknown>): ILegacyUnit;
}

/**
 * Legacy unit adapter interface
 */
export interface ILegacyUnitAdapter {
  /**
   * Adapt a legacy unit to a modern unit
   * @param legacyUnit - The legacy unit to adapt
   * @returns The adapted modern unit
   */
  adapt(legacyUnit: ILegacyUnit): any;

  /**
   * Check if the adapter can handle the unit type
   * @param unitType - The unit type to check
   * @returns Whether the adapter can handle the unit type
   */
  canHandle(unitType: UnitType): boolean;

  /**
   * Get the supported unit types
   * @returns Array of supported unit types
   */
  getSupportedTypes(): UnitType[];
}
