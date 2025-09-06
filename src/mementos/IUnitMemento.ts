import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Unit Memento Interface
 * Defines the contract for unit mementos
 */
export interface IUnitMemento {
  readonly state: any;
  readonly timestamp: Date;
  readonly unitId: string;
  readonly unitType: string;
  readonly version: string;
  readonly result?: any;
  readonly metadata: {
    unitType: string;
    stateSize: number;
    checksum: string;
    description: string;
  };

  /**
   * Restore the unit state from this memento
   * @returns The restored unit state
   */
  restore(): any;

  /**
   * Get the state
   */
  getState(): any;

  /**
   * Get the strategy name
   */
  strategyName?: string;

  /**
   * Get the timestamp
   */
  getTimestamp(): Date;

  /**
   * Get the unit ID
   */
  getUnitId(): string;

  /**
   * Get the unit type
   */
  getUnitType(): string;

  /**
   * Get the version
   */
  getVersion(): string;

  /**
   * Get the metadata
   */
  getMetadata(): any;

  /**
   * Validate the memento
   */
  validate(): boolean;

  /**
   * Clone the memento
   */
  clone(): IUnitMemento;

  /**
   * Get string representation
   */
  toString(): string;
}

/**
 * Unit Memento Implementation
 * Provides unit memento functionality using DI
 */
export class UnitMemento implements IUnitMemento {
  public readonly state: any;
  public readonly timestamp: Date;
  public readonly unitId: string;
  public readonly unitType: string;
  public readonly version: string;
  public readonly metadata: {
    unitType: string;
    stateSize: number;
    checksum: string;
    description: string;
  };

  private logger: any;

  constructor(
    state: any,
    unitId: string,
    unitType: string,
    description: string = '',
    version: string = '1.0.0'
  ) {
    this.state = state;
    this.timestamp = new Date();
    this.unitId = unitId;
    this.unitType = unitType;
    this.version = version;

    // Resolve logger from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }

    // Calculate metadata
    const stateString = JSON.stringify(state);
    this.metadata = {
      unitType,
      stateSize: stateString.length,
      checksum: this.calculateChecksum(stateString),
      description,
    };

    this.logger.debug('UnitMemento', 'constructor', 'Memento created', {
      unitId,
      unitType,
      stateSize: this.metadata.stateSize,
    });
  }

  /**
   * Get the state
   */
  getState(): any {
    return this.state;
  }

  /**
   * Restore the unit state from this memento
   * @returns The restored unit state
   */
  restore(): any {
    return this.state;
  }

  /**
   * Get the timestamp
   */
  getTimestamp(): Date {
    return this.timestamp;
  }

  /**
   * Get the unit ID
   */
  getUnitId(): string {
    return this.unitId;
  }

  /**
   * Get the unit type
   */
  getUnitType(): string {
    return this.unitType;
  }

  /**
   * Get the version
   */
  getVersion(): string {
    return this.version;
  }

  /**
   * Get the metadata
   */
  getMetadata(): any {
    return { ...this.metadata };
  }

  /**
   * Validate the memento
   */
  validate(): boolean {
    try {
      // Check if state is valid JSON
      const stateString = JSON.stringify(this.state);
      const calculatedChecksum = this.calculateChecksum(stateString);
      
      const isValid = calculatedChecksum === this.metadata.checksum;
      
      if (!isValid) {
        this.logger.warn('UnitMemento', 'validate', 'Memento validation failed', {
          unitId: this.unitId,
          expectedChecksum: this.metadata.checksum,
          calculatedChecksum,
        });
      }

      return isValid;
    } catch (error) {
      this.logger.error('UnitMemento', 'validate', 'Memento validation error', {
        unitId: this.unitId,
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Clone the memento
   */
  clone(): IUnitMemento {
    return new UnitMemento(
      JSON.parse(JSON.stringify(this.state)),
      this.unitId,
      this.unitType,
      this.metadata.description,
      this.version
    );
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `UnitMemento(${this.unitId}, ${this.unitType}, ${this.version})`;
  }

  /**
   * Calculate checksum for state validation
   */
  private calculateChecksum(stateString: string): string {
    // Simple checksum calculation
    let hash = 0;
    for (let i = 0; i < stateString.length; i++) {
      const char = stateString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  /**
   * Get memento age in milliseconds
   */
  getAge(): number {
    return Date.now() - this.timestamp.getTime();
  }

  /**
   * Check if memento is expired
   */
  isExpired(maxAge: number = 3600000): boolean { // Default 1 hour
    return this.getAge() > maxAge;
  }

  /**
   * Get memento statistics
   */
  getStatistics(): {
    unitId: string;
    unitType: string;
    version: string;
    stateSize: number;
    age: number;
    isValid: boolean;
  } {
    return {
      unitId: this.unitId,
      unitType: this.unitType,
      version: this.version,
      stateSize: this.metadata.stateSize,
      age: this.getAge(),
      isValid: this.validate(),
    };
  }

  /**
   * Export memento data
   */
  exportData(): {
    state: any;
    unitId: string;
    unitType: string;
    version: string;
    metadata: any;
    timestamp: string;
  } {
    return {
      state: this.state,
      unitId: this.unitId,
      unitType: this.unitType,
      version: this.version,
      metadata: this.metadata,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Create memento from data
   */
  static fromData(data: {
    state: any;
    unitId: string;
    unitType: string;
    version: string;
    metadata: any;
    timestamp: string;
  }): UnitMemento {
    const memento = new UnitMemento(
      data.state,
      data.unitId,
      data.unitType,
      data.metadata.description,
      data.version
    );
    
    // Override timestamp if provided
    if (data.timestamp) {
      (memento as any).timestamp = new Date(data.timestamp);
    }
    
    return memento;
  }
}

/**
 * Unit Memento Caretaker Interface
 * Defines the contract for managing unit mementos
 */
export interface IUnitMementoCaretaker {
  /**
   * Save a memento
   * @param memento - The memento to save
   */
  saveMemento(memento: IUnitMemento): void;

  /**
   * Get a memento by unit ID
   * @param unitId - The unit ID
   * @returns The memento or undefined if not found
   */
  getMemento(unitId: string): IUnitMemento | undefined;

  /**
   * Get all mementos for a unit
   * @param unitId - The unit ID
   * @returns Array of mementos for the unit
   */
  getMementos(unitId: string): IUnitMemento[];

  /**
   * Get a memento by index for a unit
   * @param unitId - The unit ID
   * @param index - The index of the memento
   * @returns The memento or undefined if not found
   */
  getMementoByIndex(unitId: string, index: number): IUnitMemento | undefined;

  /**
   * Get the latest memento for a unit
   * @param unitId - The unit ID
   * @returns The latest memento or undefined if not found
   */
  getLatestMemento(unitId: string): IUnitMemento | undefined;

  /**
   * Remove a memento
   * @param unitId - The unit ID
   * @returns True if removed, false otherwise
   */
  removeMemento(unitId: string): boolean;

  /**
   * Get all mementos
   * @returns Array of all mementos
   */
  getAllMementos(): IUnitMemento[];

  /**
   * Clear all mementos
   */
  clearMementos(): void;

  /**
   * Clear all mementos for all units
   */
  clearAllMementos(): void;

  /**
   * Get the count of mementos for a unit
   * @param unitId - The unit ID
   * @returns The number of mementos for the unit
   */
  getMementoCount(unitId: string): number;

  /**
   * Add a memento
   * @param memento - The memento to add
   */
  addMemento(memento: IUnitMemento): void;

  /**
   * Update a memento
   * @param memento - The memento to update
   */
  updateMemento(memento: IUnitMemento): void;

  /**
   * Find mementos by criteria
   * @param criteria - The search criteria
   * @returns Array of matching mementos
   */
  findMementosByCriteria(criteria: any): IUnitMemento[];

  /**
   * Get total memento count across all units
   * @returns The total number of mementos
   */
  getTotalMementoCount(): number;

  /**
   * Get caretaker statistics
   * @returns The caretaker statistics
   */
  getCaretakerStatistics(): any;

  /**
   * Restore to a specific memento
   * @param unitId - The unit ID
   * @param memento - The memento to restore to
   * @returns The restored state
   */
  restoreToMemento(unitId: string, memento: IUnitMemento): any;

  /**
   * Undo the last operation for a unit
   * @param unitId - The unit ID
   * @returns The undone state or undefined if no undo available
   */
  undo(unitId: string): any | undefined;

  /**
   * Redo the last undone operation for a unit
   * @param unitId - The unit ID
   * @returns The redone state or undefined if no redo available
   */
  redo(unitId: string): any | undefined;

  /**
   * Check if undo is available for a unit
   * @param unitId - The unit ID
   * @returns True if undo is available, false otherwise
   */
  canUndo(unitId: string): boolean;

  /**
   * Check if redo is available for a unit
   * @param unitId - The unit ID
   * @returns True if redo is available, false otherwise
   */
  canRedo(unitId: string): boolean;
}