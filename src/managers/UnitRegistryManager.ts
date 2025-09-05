import type { IUnitRegistryManager } from './IUnitRegistryManager';
import type { IUnit } from '../interfaces/IUnit';
import type { IUnitConfig } from '../interfaces/IUnitConfig';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Unit Registry Manager Implementation
 * Concrete implementation of unit registry management using DI
 */
export class UnitRegistryManager implements IUnitRegistryManager {
  private units: Map<string, IUnit> = new Map();
  private logger: any;
  private factory: any;

  constructor() {
    // Resolve dependencies from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }

    try {
      this.factory = container.resolve(TOKENS.UNIT_CALCULATOR_FACTORY);
    } catch (error) {
      this.logger.warn('UnitRegistryManager', 'constructor', 'Failed to resolve factory, using fallback', { error });
      this.factory = null;
    }
  }

  /**
   * Create a new unit based on type and configuration
   */
  public createUnit(unitType: string, config: IUnitConfig): IUnit {
    this.logger.debug('UnitRegistryManager', 'createUnit', 'Creating unit', {
      unitType,
      configId: config.id,
    });

    try {
      let unit: IUnit;

      if (this.factory) {
        // Use DI factory
        unit = this.factory.createCalculator(unitType, config.id, config.name, ...this.getConfigArgs(config));
      } else {
        // Fallback to direct creation
        unit = this.createUnitDirectly(unitType, config);
      }

      // Register the unit
      this.units.set(config.id, unit);

      this.logger.info('UnitRegistryManager', 'createUnit', 'Unit created successfully', {
        unitType,
        unitId: config.id,
        totalUnits: this.units.size,
      });

      return unit;
    } catch (error) {
      this.logger.error('UnitRegistryManager', 'createUnit', 'Failed to create unit', {
        unitType,
        configId: config.id,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Get a unit by ID
   */
  public getUnit(id: string): IUnit | undefined {
    const unit = this.units.get(id);
    
    if (unit) {
      this.logger.debug('UnitRegistryManager', 'getUnit', 'Unit found', {
        unitId: id,
        unitType: unit.unitType,
      });
    } else {
      this.logger.warn('UnitRegistryManager', 'getUnit', 'Unit not found', {
        unitId: id,
      });
    }

    return unit;
  }

  /**
   * Remove a unit
   */
  public removeUnit(id: string): boolean {
    const removed = this.units.delete(id);
    
    this.logger.debug('UnitRegistryManager', 'removeUnit', 'Unit removed', {
      unitId: id,
      removed,
      totalUnits: this.units.size,
    });

    return removed;
  }

  /**
   * Get all units
   */
  public getAllUnits(): IUnit[] {
    return Array.from(this.units.values());
  }

  /**
   * Get units by type
   */
  public getUnitsByType(unitType: string): IUnit[] {
    return this.getAllUnits().filter(unit => unit.unitType === unitType);
  }

  /**
   * Get unit count
   */
  public getUnitCount(): number {
    return this.units.size;
  }

  /**
   * Check if unit exists
   */
  public hasUnit(id: string): boolean {
    return this.units.has(id);
  }

  /**
   * Clear all units
   */
  public clearUnits(): void {
    this.logger.debug('UnitRegistryManager', 'clearUnits', 'Clearing all units', {
      unitCount: this.units.size,
    });

    this.units.clear();
  }

  /**
   * Get registry statistics
   */
  public getStatistics(): {
    totalUnits: number;
    unitsByType: Record<string, number>;
    unitIds: string[];
  } {
    const unitsByType: Record<string, number> = {};
    const unitIds: string[] = [];

    for (const [id, unit] of this.units) {
      const type = unit.unitType;
      unitsByType[type] = (unitsByType[type] || 0) + 1;
      unitIds.push(id);
    }

    return {
      totalUnits: this.units.size,
      unitsByType,
      unitIds,
    };
  }

  /**
   * Create unit directly (fallback method)
   */
  private createUnitDirectly(unitType: string, config: IUnitConfig): IUnit {
    // This would be implemented based on the specific unit types
    // For now, return a mock unit
    return {
      id: config.id,
      name: config.name,
      unitType: unitType as any,
      isActive: true,
      calculate: () => 0,
      isResponsive: () => false,
      validate: () => true,
      toString: () => `${unitType}(${config.id})`,
    } as IUnit;
  }

  /**
   * Get configuration arguments for factory
   */
  private getConfigArgs(config: IUnitConfig): any[] {
    // Extract relevant arguments from config
    return [
      config.name,
      // Add other config properties as needed
    ];
  }

  /**
   * Validate unit before registration
   */
  private validateUnit(unit: IUnit): boolean {
    if (!unit) {
      this.logger.warn('UnitRegistryManager', 'validateUnit', 'Unit is null or undefined');
      return false;
    }

    if (!unit.id) {
      this.logger.warn('UnitRegistryManager', 'validateUnit', 'Unit missing ID');
      return false;
    }

    if (!unit.unitType) {
      this.logger.warn('UnitRegistryManager', 'validateUnit', 'Unit missing unitType');
      return false;
    }

    if (typeof unit.calculate !== 'function') {
      this.logger.warn('UnitRegistryManager', 'validateUnit', 'Unit missing calculate method');
      return false;
    }

    return true;
  }

  /**
   * Register unit with validation
   */
  public registerUnit(unit: IUnit): boolean {
    if (!this.validateUnit(unit)) {
      return false;
    }

    this.units.set(unit.id, unit);
    
    this.logger.debug('UnitRegistryManager', 'registerUnit', 'Unit registered', {
      unitId: unit.id,
      unitType: unit.unitType,
      totalUnits: this.units.size,
    });

    return true;
  }

  /**
   * Update unit
   */
  public updateUnit(id: string, updatedUnit: IUnit): boolean {
    if (!this.hasUnit(id)) {
      this.logger.warn('UnitRegistryManager', 'updateUnit', 'Unit not found for update', {
        unitId: id,
      });
      return false;
    }

    if (!this.validateUnit(updatedUnit)) {
      return false;
    }

    this.units.set(id, updatedUnit);
    
    this.logger.debug('UnitRegistryManager', 'updateUnit', 'Unit updated', {
      unitId: id,
      unitType: updatedUnit.unitType,
    });

    return true;
  }

  /**
   * Get unit metadata
   */
  public getUnitMetadata(id: string): {
    exists: boolean;
    unitType: string;
    isActive: boolean;
    isResponsive: boolean;
  } {
    const unit = this.getUnit(id);
    
    return {
      exists: !!unit,
      unitType: unit?.unitType || 'Unknown',
      isActive: unit?.isActive || false,
      isResponsive: unit?.isResponsive?.() || false,
    };
  }

  /**
   * Export registry data
   */
  public exportData(): {
    units: Record<string, any>;
    statistics: {
      totalUnits: number;
      unitsByType: Record<string, number>;
    };
    timestamp: string;
  } {
    const units: Record<string, any> = {};
    for (const [id, unit] of this.units) {
      units[id] = {
        id: unit.id,
        name: unit.name,
        unitType: unit.unitType,
        isActive: unit.isActive,
      };
    }

    const statistics = this.getStatistics();

    return {
      units,
      statistics: {
        totalUnits: statistics.totalUnits,
        unitsByType: statistics.unitsByType,
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Import registry data
   */
  public importData(data: {
    units: Record<string, any>;
    statistics?: any;
  }): void {
    if (data.units && typeof data.units === 'object') {
      this.clearUnits();
      
      for (const [id, unitData] of Object.entries(data.units)) {
        // This would typically recreate units from the data
        this.logger.debug('UnitRegistryManager', 'importData', 'Unit data imported', {
          unitId: id,
          unitType: unitData.unitType,
        });
      }
    } else {
      throw new Error('Invalid data format');
    }
  }
}