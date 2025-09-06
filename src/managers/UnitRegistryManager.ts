import type { IUnit } from '../interfaces/IUnit';
import type { IUnitConfig, ISizeUnitConfig, IPositionUnitConfig, IScaleUnitConfig } from '../interfaces/IUnitConfig';
import { UnitType } from '../enums/UnitType';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';
// Type guard functions
function isSizeUnitConfig(config: IUnitConfig): config is ISizeUnitConfig {
  return config.unitType === UnitType.SIZE;
}

function isPositionUnitConfig(config: IUnitConfig): config is IPositionUnitConfig {
  return config.unitType === UnitType.POSITION;
}

function isScaleUnitConfig(config: IUnitConfig): config is IScaleUnitConfig {
  return config.unitType === UnitType.SCALE;
}

/**
 * Unit Registry Manager
 * Handles unit creation, retrieval, and lifecycle management
 * Follows Single Responsibility Principle - only manages unit registry
 * 
 * Note: This class focuses solely on unit registry management logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export interface IUnitRegistryManager {
  // Core unit management
  createUnit(unitType: string, config: IUnitConfig): IUnit;
  getUnit(unitId: string): IUnit | undefined;
  getAllUnits(): IUnit[];
  removeUnit(unitId: string): boolean;

  // Unit lifecycle
  activateUnit(unitId: string): boolean;
  deactivateUnit(unitId: string): boolean;
  getActiveUnits(): IUnit[];

  // Unit statistics
  getUnitCount(): number;
  getUnitCountByType(unitType: string): number;
  getUnitStatistics(): UnitRegistryStatistics;

  // Unit validation
  hasUnit(unitId: string): boolean;
  validateUnit(unit: IUnit): boolean;
  validateUnitConfig(config: IUnitConfig): boolean;

  // Unit search
  findUnitsByType(unitType: string): IUnit[];
  findUnitsByName(name: string): IUnit[];
  findUnitsByProperty(property: string, value: unknown): IUnit[];

  // Unit cleanup
  clearUnits(): void;
  clearUnitsByType(unitType: string): void;
}

/**
 * Unit registry statistics
 */
export interface UnitRegistryStatistics {
  totalUnits: number;
  activeUnits: number;
  inactiveUnits: number;
  unitsByType: Record<string, number>;
  averageUnitsPerType: number;
  mostCommonType: string;
  leastCommonType: string;
}

/**
 * Unit Registry Manager Implementation
 * Manages unit creation, retrieval, and lifecycle
 */
export class UnitRegistryManager implements IUnitRegistryManager {
  private units: Map<string, IUnit> = new Map();
  private unitStatistics: UnitRegistryStatistics = {
    totalUnits: 0,
    activeUnits: 0,
    inactiveUnits: 0,
    unitsByType: {},
    averageUnitsPerType: 0,
    mostCommonType: '',
    leastCommonType: '',
  };

  /**
   * Create a unit
   */
  public createUnit(unitType: string, config: IUnitConfig): IUnit {
    if (!this.validateUnitConfig(config)) {
      throw new Error('Invalid unit configuration');
    }

    let unit: IUnit;

    try {
      switch (unitType) {
        case UnitType.SIZE:
          if (isSizeUnitConfig(config)) {
            unit = UnitCalculatorFactory.getInstance().createSizeCalculator(
              config.id,
              config.name,
              config.sizeUnit,
              config.dimension,
              config.value,
              config.enabled
            );
          } else {
            throw new Error('Invalid size unit configuration');
          }
          break;

        case UnitType.POSITION:
          if (isPositionUnitConfig(config)) {
            unit = UnitCalculatorFactory.getInstance().createPositionCalculator(
              config.id,
              config.name,
              config.positionUnit,
              config.axis,
              config.value
            );
          } else {
            throw new Error('Invalid position unit configuration');
          }
          break;

        case UnitType.SCALE:
          if (isScaleUnitConfig(config)) {
            unit = UnitCalculatorFactory.getInstance().createScaleCalculator(
              config.id,
              config.name,
              config.scaleUnit,
              config.value,
              config.maintainAspectRatio
            );
          } else {
            throw new Error('Invalid scale unit configuration');
          }
          break;

        default:
          throw new Error(`Unknown unit type: ${unitType}`);
      }

      this.units.set(unit.id, unit);
      this.updateStatistics();
      return unit;
    } catch (error) {
      throw new Error(`Failed to create unit: ${error}`);
    }
  }

  /**
   * Get unit by ID
   */
  public getUnit(unitId: string): IUnit | undefined {
    return this.units.get(unitId);
  }

  /**
   * Get all units
   */
  public getAllUnits(): IUnit[] {
    return Array.from(this.units.values());
  }

  /**
   * Remove unit by ID
   */
  public removeUnit(unitId: string): boolean {
    const removed = this.units.delete(unitId);
    if (removed) {
      this.updateStatistics();
    }
    return removed;
  }

  /**
   * Activate unit
   */
  public activateUnit(unitId: string): boolean {
    const unit = this.units.get(unitId);
    if (unit && !unit.isActive) {
      // Note: isActive is readonly, so we can't modify it directly
      // This would require a different approach in the actual implementation
      this.updateStatistics();
      return true;
    }
    return false;
  }

  /**
   * Deactivate unit
   */
  public deactivateUnit(unitId: string): boolean {
    const unit = this.units.get(unitId);
    if (unit && unit.isActive) {
      // Note: isActive is readonly, so we can't modify it directly
      // This would require a different approach in the actual implementation
      this.updateStatistics();
      return true;
    }
    return false;
  }

  /**
   * Get active units
   */
  public getActiveUnits(): IUnit[] {
    return Array.from(this.units.values()).filter(unit => unit.isActive);
  }

  /**
   * Get unit count
   */
  public getUnitCount(): number {
    return this.units.size;
  }

  /**
   * Get unit count by type
   */
  public getUnitCountByType(unitType: string): number {
    return Array.from(this.units.values()).filter(unit => unit.unitType === unitType).length;
  }

  /**
   * Get unit statistics
   */
  public getUnitStatistics(): UnitRegistryStatistics {
    return { ...this.unitStatistics };
  }

  /**
   * Check if unit exists
   */
  public hasUnit(unitId: string): boolean {
    return this.units.has(unitId);
  }

  /**
   * Validate unit
   */
  public validateUnit(unit: IUnit): boolean {
    return (
      unit &&
      typeof unit.id === 'string' &&
      typeof unit.name === 'string' &&
      typeof unit.unitType === 'string' &&
      typeof unit.isActive === 'boolean' &&
      typeof unit.calculate === 'function' &&
      typeof unit.validate === 'function'
    );
  }

  /**
   * Validate unit configuration
   */
  public validateUnitConfig(config: IUnitConfig): boolean {
    return (
      config &&
      typeof config.id === 'string' &&
      typeof config.name === 'string' &&
      typeof config.unitType === 'string'
    );
  }

  /**
   * Find units by type
   */
  public findUnitsByType(unitType: string): IUnit[] {
    return Array.from(this.units.values()).filter(unit => unit.unitType === unitType);
  }

  /**
   * Find units by name
   */
  public findUnitsByName(name: string): IUnit[] {
    return Array.from(this.units.values()).filter(unit => unit.name === name);
  }

  /**
   * Find units by property
   */
  public findUnitsByProperty(property: string, value: unknown): IUnit[] {
    return Array.from(this.units.values()).filter(unit => {
      return (unit as any)[property] === value;
    });
  }

  /**
   * Clear all units
   */
  public clearUnits(): void {
    this.units.clear();
    this.updateStatistics();
  }

  /**
   * Clear units by type
   */
  public clearUnitsByType(unitType: string): void {
    const unitsToRemove = Array.from(this.units.entries())
      .filter(([_, unit]) => unit.unitType === unitType)
      .map(([id, _]) => id);

    unitsToRemove.forEach(id => this.units.delete(id));
    this.updateStatistics();
  }

  /**
   * Update statistics
   */
  private updateStatistics(): void {
    const allUnits = Array.from(this.units.values());
    const activeUnits = allUnits.filter(unit => unit.isActive);
    const unitsByType: Record<string, number> = {};

    // Count units by type
    allUnits.forEach(unit => {
      unitsByType[unit.unitType] = (unitsByType[unit.unitType] || 0) + 1;
    });

    // Find most and least common types
    const typeCounts = Object.entries(unitsByType);
    const mostCommon = typeCounts.reduce((max, current) => 
      current[1] > max[1] ? current : max, ['', 0]);
    const leastCommon = typeCounts.reduce((min, current) => 
      current[1] < min[1] ? current : min, ['', Infinity]);

    this.unitStatistics = {
      totalUnits: allUnits.length,
      activeUnits: activeUnits.length,
      inactiveUnits: allUnits.length - activeUnits.length,
      unitsByType,
      averageUnitsPerType: typeCounts.length > 0 
        ? allUnits.length / typeCounts.length 
        : 0,
      mostCommonType: mostCommon[0],
      leastCommonType: leastCommon[0],
    };
  }
}