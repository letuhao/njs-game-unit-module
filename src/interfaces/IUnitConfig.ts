/**
 * Unit Configuration Interface
 * Defines the configuration structure for creating units
 */

import { UnitType } from '../enums/UnitType';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { Dimension } from '../enums/Dimension';

/**
 * Base unit configuration interface
 */
export interface IUnitConfig {
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
   * Whether the unit is enabled
   */
  readonly enabled?: boolean;

  /**
   * Additional metadata
   */
  readonly metadata?: Record<string, unknown>;
}

/**
 * Size unit configuration interface
 */
export interface ISizeUnitConfig extends IUnitConfig {
  readonly unitType: UnitType.SIZE;
  readonly value: number | SizeValue;
  readonly sizeUnit: SizeUnit;
  readonly dimension: Dimension;
}

/**
 * Position unit configuration interface
 */
export interface IPositionUnitConfig extends IUnitConfig {
  readonly unitType: UnitType.POSITION;
  readonly value: number | PositionValue;
  readonly positionUnit: PositionUnit;
  readonly dimension: Dimension;
}

/**
 * Scale unit configuration interface
 */
export interface IScaleUnitConfig extends IUnitConfig {
  readonly unitType: UnitType.SCALE;
  readonly value: number | ScaleValue;
  readonly scaleUnit: ScaleUnit;
  readonly dimension: Dimension;
}

/**
 * Union type for all unit configurations
 */
export type UnitConfig = ISizeUnitConfig | IPositionUnitConfig | IScaleUnitConfig;

/**
 * Unit creation result interface
 */
export interface IUnitResult {
  /**
   * Whether the unit creation was successful
   */
  readonly success: boolean;

  /**
   * The created unit (if successful)
   */
  readonly unit?: IUnit;

  /**
   * Error message (if failed)
   */
  readonly error?: string;

  /**
   * Additional metadata
   */
  readonly metadata?: Record<string, unknown>;
}

/**
 * Unit update result interface
 */
export interface IUnitUpdateResult {
  /**
   * Whether the unit update was successful
   */
  readonly success: boolean;

  /**
   * The updated unit (if successful)
   */
  readonly unit?: IUnit;

  /**
   * Error message (if failed)
   */
  readonly error?: string;

  /**
   * Previous unit state (for rollback)
   */
  readonly previousUnit?: IUnit;
}

/**
 * Unit deletion result interface
 */
export interface IUnitDeleteResult {
  /**
   * Whether the unit deletion was successful
   */
  readonly success: boolean;

  /**
   * Error message (if failed)
   */
  readonly error?: string;

  /**
   * Deleted unit ID
   */
  readonly deletedUnitId?: string;
}

/**
 * Unit calculation result interface
 */
export interface IUnitCalculationResult {
  /**
   * Whether the calculation was successful
   */
  readonly success: boolean;

  /**
   * The calculated result (if successful)
   */
  readonly result?: number;

  /**
   * Error message (if failed)
   */
  readonly error?: string;

  /**
   * Calculation metadata
   */
  readonly metadata?: {
    readonly unitId: string;
    readonly unitType: UnitType;
    readonly calculationTime: number;
    readonly context: Record<string, unknown>;
  };
}

/**
 * Unit validation result interface
 */
export interface IUnitValidationResult {
  /**
   * Whether the validation was successful
   */
  readonly success: boolean;

  /**
   * Whether the unit is valid
   */
  readonly isValid?: boolean;

  /**
   * Validation errors (if any)
   */
  readonly errors?: string[];

  /**
   * Validation warnings (if any)
   */
  readonly warnings?: string[];

  /**
   * Validation metadata
   */
  readonly metadata?: {
    readonly unitId: string;
    readonly unitType: UnitType;
    readonly validationTime: number;
    readonly context: Record<string, unknown>;
  };
}

/**
 * Unit statistics interface
 */
export interface IUnitStatistics {
  /**
   * Total number of units
   */
  readonly totalUnits: number;

  /**
   * Number of units by type
   */
  readonly unitsByType: Record<UnitType, number>;

  /**
   * Number of active units
   */
  readonly activeUnits: number;

  /**
   * Number of inactive units
   */
  readonly inactiveUnits: number;

  /**
   * Average calculation time
   */
  readonly averageCalculationTime: number;

  /**
   * Total calculations performed
   */
  readonly totalCalculations: number;

  /**
   * Validation success rate
   */
  readonly validationSuccessRate: number;
}

/**
 * Unit manager status interface
 */
export interface IUnitManagerStatus {
  /**
   * Whether the manager is initialized
   */
  readonly isInitialized: boolean;

  /**
   * Total number of units
   */
  readonly totalUnits: number;

  /**
   * Number of active strategies
   */
  readonly activeStrategies: number;

  /**
   * Number of registered observers
   */
  readonly registeredObservers: number;

  /**
   * Number of validation errors
   */
  readonly validationErrors: number;

  /**
   * Statistics about the unit system
   */
  readonly statistics: IUnitStatistics;
}

/**
 * Unit configuration factory interface
 */
export interface IUnitConfigFactory {
  /**
   * Create a size unit configuration
   */
  createSizeUnitConfig(
    id: string,
    name: string,
    value: number | SizeValue,
    options: {
      sizeUnit: SizeUnit;
      dimension: Dimension;
      enabled?: boolean;
      metadata?: Record<string, unknown>;
    }
  ): ISizeUnitConfig;

  /**
   * Create a position unit configuration
   */
  createPositionUnitConfig(
    id: string,
    name: string,
    value: number | PositionValue,
    options: {
      positionUnit: PositionUnit;
      dimension: Dimension;
      enabled?: boolean;
      metadata?: Record<string, unknown>;
    }
  ): IPositionUnitConfig;

  /**
   * Create a scale unit configuration
   */
  createScaleUnitConfig(
    id: string,
    name: string,
    value: number | ScaleValue,
    options: {
      scaleUnit: ScaleUnit;
      dimension: Dimension;
      enabled?: boolean;
      metadata?: Record<string, unknown>;
    }
  ): IScaleUnitConfig;

  /**
   * Validate a unit configuration
   */
  validateConfig(config: UnitConfig): IUnitValidationResult;
}

/**
 * Unit configuration factory implementation
 */
export class UnitConfigFactory implements IUnitConfigFactory {
  createSizeUnitConfig(
    id: string,
    name: string,
    value: number | SizeValue,
    options: {
      sizeUnit: SizeUnit;
      dimension: Dimension;
      enabled?: boolean;
      metadata?: Record<string, unknown>;
    }
  ): ISizeUnitConfig {
    return {
      id,
      name,
      unitType: UnitType.SIZE,
      value,
      sizeUnit: options.sizeUnit,
      dimension: options.dimension,
      enabled: options.enabled ?? true,
      metadata: options.metadata,
    };
  }

  createPositionUnitConfig(
    id: string,
    name: string,
    value: number | PositionValue,
    options: {
      positionUnit: PositionUnit;
      dimension: Dimension;
      enabled?: boolean;
      metadata?: Record<string, unknown>;
    }
  ): IPositionUnitConfig {
    return {
      id,
      name,
      unitType: UnitType.POSITION,
      value,
      positionUnit: options.positionUnit,
      dimension: options.dimension,
      enabled: options.enabled ?? true,
      metadata: options.metadata,
    };
  }

  createScaleUnitConfig(
    id: string,
    name: string,
    value: number | ScaleValue,
    options: {
      scaleUnit: ScaleUnit;
      dimension: Dimension;
      enabled?: boolean;
      metadata?: Record<string, unknown>;
    }
  ): IScaleUnitConfig {
    return {
      id,
      name,
      unitType: UnitType.SCALE,
      value,
      scaleUnit: options.scaleUnit,
      dimension: options.dimension,
      enabled: options.enabled ?? true,
      metadata: options.metadata,
    };
  }

  validateConfig(config: UnitConfig): IUnitValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate required fields
    if (!config.id || config.id.trim() === '') {
      errors.push('Unit ID is required');
    }

    if (!config.name || config.name.trim() === '') {
      errors.push('Unit name is required');
    }

    if (!config.unitType) {
      errors.push('Unit type is required');
    }

    // Validate based on unit type
    switch (config.unitType) {
      case UnitType.SIZE:
        const sizeConfig = config as ISizeUnitConfig;
        if (!sizeConfig.sizeUnit) {
          errors.push('Size unit is required for size units');
        }
        if (!sizeConfig.dimension) {
          errors.push('Dimension is required for size units');
        }
        break;

      case UnitType.POSITION:
        const positionConfig = config as IPositionUnitConfig;
        if (!positionConfig.positionUnit) {
          errors.push('Position unit is required for position units');
        }
        if (!positionConfig.dimension) {
          errors.push('Dimension is required for position units');
        }
        break;

      case UnitType.SCALE:
        const scaleConfig = config as IScaleUnitConfig;
        if (!scaleConfig.scaleUnit) {
          errors.push('Scale unit is required for scale units');
        }
        if (!scaleConfig.dimension) {
          errors.push('Dimension is required for scale units');
        }
        break;
    }

    return {
      success: errors.length === 0,
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
      metadata: {
        unitId: config.id,
        unitType: config.unitType,
        validationTime: 0,
        context: {},
      },
    };
  }
}
