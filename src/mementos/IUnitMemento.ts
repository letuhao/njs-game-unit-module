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
  readonly metadata: {
    unitType: string;
    stateSize: number;
    checksum: string;
    description: string;
  };

  /**
   * Get the state
   */
  getState(): any;

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