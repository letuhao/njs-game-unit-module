import type { IUnit } from '../interfaces/IUnit';
import type { IUnitConfig } from '../interfaces/IUnitConfig';
import { logger } from '../core/Logger';
import { UnitType } from '../enums/UnitType';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';
import {
  isSizeUnitConfig,
  isPositionUnitConfig,
  isScaleUnitConfig,
} from '../interfaces/IUnitConfig';

/**
 * Core unit registry interface - basic unit operations
 */
export interface IUnitRegistryManagerCore {
  /** Create a new unit based on type and configuration */
  createUnit(unitType: string, config: IUnitConfig): IUnit;

  /** Get a unit by its ID */
  getUnit(unitId: string): IUnit | undefined;

  /** Get all registered units */
  getAllUnits(): IUnit[];

  /** Remove a unit from the registry */
  removeUnit(unitId: string): boolean;
}

/**
 * Unit lifecycle interface - lifecycle operations
 */
export interface IUnitRegistryManagerLifecycle {
  /** Activate a unit */
  activateUnit(unitId: string): boolean;

  /** Deactivate a unit */
  deactivateUnit(unitId: string): boolean;

  /** Get all active units */
  getActiveUnits(): IUnit[];
}

/**
 * Unit statistics interface - statistics operations
 */
export interface IUnitRegistryManagerStatistics {
  /** Get total unit count */
  getUnitCount(): number;

  /** Get unit count by type */
  getUnitCountByType(unitType: UnitType): number;

  /** Get all unit IDs */
  getUnitIds(): string[];
}

/**
 * Complete unit registry manager interface
 * Combines all unit registry manager functionality
 */
export interface IUnitRegistryManager extends 
  IUnitRegistryManagerCore,
  IUnitRegistryManagerLifecycle,
  IUnitRegistryManagerStatistics {
}

/**
 * Unit Registry Manager Implementation
 * Concrete implementation of unit registry management
 */
export class UnitRegistryManager implements IUnitRegistryManager {
  private units: Map<string, IUnit> = new Map();
  private readonly logger: typeof logger = logger;
  private readonly factory: UnitCalculatorFactory = UnitCalculatorFactory.getInstance();

  /**
   * Create a new unit based on type and configuration
   */
  public createUnit(unitType: string, config: IUnitConfig): IUnit {
    this.logger.debug('UnitRegistryManager', 'createUnit', 'Creating unit', {
      unitType,
      unitId: config.id,
      unitName: config.name,
    });

    try {
      const unit = this.createUnitByType(unitType, config);
      if (unit) {
        this.units.set(unit.id, unit);
        this.logger.info('UnitRegistryManager', 'createUnit', 'Unit created successfully', {
          unitId: unit.id,
          unitType: unit.unitType,
        });
        return unit;
      }
      throw new Error(`Failed to create unit of type: ${unitType}`);
    } catch (error) {
      this.logger.error('UnitRegistryManager', 'createUnit', 'Failed to create unit', {
        unitType,
        unitId: config.id,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Get a unit by its ID
   */
  public getUnit(unitId: string): IUnit | undefined {
    const unit = this.units.get(unitId);
    if (!unit) {
      this.logger.debug('UnitRegistryManager', 'getUnit', 'Unit not found', { unitId });
    }
    return unit;
  }

  /**
   * Get all registered units
   */
  public getAllUnits(): IUnit[] {
    return Array.from(this.units.values());
  }

  /**
   * Remove a unit from the registry
   */
  public removeUnit(unitId: string): boolean {
    const unit = this.units.get(unitId);
    if (unit) {
      this.units.delete(unitId);
      this.logger.info('UnitRegistryManager', 'removeUnit', 'Unit removed successfully', {
        unitId,
        unitType: unit.unitType,
      });
      return true;
    }

    this.logger.debug('UnitRegistryManager', 'removeUnit', 'Unit not found for removal', {
      unitId,
    });
    return false;
  }

  /**
   * Activate a unit
   */
  public activateUnit(unitId: string): boolean {
    const unit = this.units.get(unitId);
    if (unit) {
      // Note: This would require IUnit to have an activate method
      // For now, we'll just log the action
      this.logger.info('UnitRegistryManager', 'activateUnit', 'Unit activated', { unitId });
      return true;
    }

    this.logger.warn('UnitRegistryManager', 'activateUnit', 'Unit not found for activation', {
      unitId,
    });
    return false;
  }

  /**
   * Deactivate a unit
   */
  public deactivateUnit(unitId: string): boolean {
    const unit = this.units.get(unitId);
    if (unit) {
      // Note: This would require IUnit to have a deactivate method
      // For now, we'll just log the action
      this.logger.info('UnitRegistryManager', 'deactivateUnit', 'Unit deactivated', { unitId });
      return true;
    }

    this.logger.warn('UnitRegistryManager', 'deactivateUnit', 'Unit not found for deactivation', {
      unitId,
    });
    return false;
  }

  /**
   * Get all active units
   */
  public getActiveUnits(): IUnit[] {
    return Array.from(this.units.values()).filter(unit => unit.isActive);
  }

  /**
   * Get total unit count
   */
  public getUnitCount(): number {
    return this.units.size;
  }

  /**
   * Get unit count by type
   */
  public getUnitCountByType(unitType: UnitType): number {
    return Array.from(this.units.values()).filter(unit => unit.unitType === unitType).length;
  }

  /**
   * Get all unit IDs
   */
  public getUnitIds(): string[] {
    return Array.from(this.units.keys());
  }

  /**
   * Create unit by type using factory
   */
  private createUnitByType(unitType: string, config: IUnitConfig): IUnit | undefined {
    switch (unitType) {
      case UnitType.SIZE:
        if (!isSizeUnitConfig(config)) {
          throw new Error(`Invalid config for size unit: ${config.id}`);
        }
        return this.factory.createSizeUnit(
          config.id,
          config.name,
          config.sizeUnit!,
          config.dimension!,
          config.baseValue,
          config.maintainAspectRatio
        );

      case UnitType.POSITION:
        if (!isPositionUnitConfig(config)) {
          throw new Error(`Invalid config for position unit: ${config.id}`);
        }
        return this.factory.createPositionUnit(
          config.id,
          config.name,
          config.positionUnit!,
          config.axis!,
          config.baseValue
        );

      case UnitType.SCALE:
        if (!isScaleUnitConfig(config)) {
          throw new Error(`Invalid config for scale unit: ${config.id}`);
        }
        return this.factory.createScaleUnit(
          config.id,
          config.name,
          config.scaleUnit!,
          config.baseValue,
          config.maintainAspectRatio
        );

      default:
        throw new Error(`Unknown unit type: ${unitType}`);
    }
  }
}
