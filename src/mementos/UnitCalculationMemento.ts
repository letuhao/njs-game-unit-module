import type { IUnitMemento } from './IUnitMemento';
import type { UnitContext } from '../interfaces/IUnit';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Unit Calculation Memento
 * Stores calculation state and results using DI
 */
export class UnitCalculationMemento implements IUnitMemento {
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
  
  // Additional properties for test compatibility
  public readonly templateName: string;
  public readonly strategyName: string;
  public readonly validatorNames: string[];
  public readonly isSuccess: boolean;
  public readonly error: Error | undefined;

  private logger: any;

  constructor(
    calculationInput: any,
    calculationContext: UnitContext,
    calculationResult: number,
    unitId: string,
    unitType: string,
    templateName: string = '',
    strategyName: string = '',
    errorMessage: string = '',
    performanceMetrics: {
      totalTime: number;
      stepTimes: Record<string, number>;
      memoryUsage: number;
    } = {
      totalTime: 0,
      stepTimes: {},
      memoryUsage: 0,
    }
  ) {
    this.state = {
      calculationInput,
      calculationContext,
      calculationResult,
      templateName,
      strategyName,
      errorMessage,
      performanceMetrics,
    };
    this.timestamp = new Date();
    this.unitId = unitId;
    this.unitType = unitType;
    this.version = '1.0.0';
    
    // Initialize additional properties
    this.templateName = templateName;
    this.strategyName = strategyName;
    this.validatorNames = []; // Default empty array
    this.isSuccess = !errorMessage;
    this.error = errorMessage ? new Error(errorMessage) : undefined;

    // Resolve logger from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }

    // Calculate metadata
    const stateString = JSON.stringify(this.state);
    this.metadata = {
      unitType,
      stateSize: stateString.length,
      checksum: this.calculateChecksum(stateString),
      description: `Calculation memento for ${unitType} unit`,
    };

    this.logger.debug('UnitCalculationMemento', 'constructor', 'Calculation memento created', {
      unitId,
      unitType,
      templateName,
      strategyName,
      hasError: !!errorMessage,
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
      const stateString = JSON.stringify(this.state);
      const calculatedChecksum = this.calculateChecksum(stateString);
      
      const isValid = calculatedChecksum === this.metadata.checksum;
      
      if (!isValid) {
        this.logger.warn('UnitCalculationMemento', 'validate', 'Memento validation failed', {
          unitId: this.unitId,
          expectedChecksum: this.metadata.checksum,
          calculatedChecksum,
        });
      }

      return isValid;
    } catch (error) {
      this.logger.error('UnitCalculationMemento', 'validate', 'Memento validation error', {
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
    return new UnitCalculationMemento(
      this.state.calculationInput,
      this.state.calculationContext,
      this.state.calculationResult,
      this.unitId,
      this.unitType,
      this.state.templateName,
      this.state.strategyName,
      this.state.errorMessage,
      this.state.performanceMetrics
    );
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `UnitCalculationMemento(${this.unitId}, ${this.unitType}, ${this.state.calculationResult})`;
  }

  /**
   * Get calculation result
   */
  getCalculationResult(): number {
    return this.state.calculationResult;
  }

  /**
   * Get calculation input
   */
  getCalculationInput(): any {
    return this.state.calculationInput;
  }

  /**
   * Get calculation context
   */
  getCalculationContext(): UnitContext {
    return this.state.calculationContext;
  }

  /**
   * Get template name
   */
  getTemplateName(): string {
    return this.state.templateName;
  }

  /**
   * Get strategy name
   */
  getStrategyName(): string {
    return this.state.strategyName;
  }

  /**
   * Get error message
   */
  getErrorMessage(): string {
    return this.state.errorMessage;
  }

  /**
   * Check if calculation had errors
   */
  hasError(): boolean {
    return !!this.state.errorMessage;
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): {
    totalTime: number;
    stepTimes: Record<string, number>;
    memoryUsage: number;
  } {
    return { ...this.state.performanceMetrics };
  }

  /**
   * Convert to JSON
   */
  toJSON(): string {
    return JSON.stringify({
      unitId: this.unitId,
      unitType: this.unitType,
      state: this.state,
      timestamp: this.timestamp.toISOString(),
      version: this.version,
      metadata: this.metadata
    });
  }

  /**
   * Get required properties
   */
  getRequiredProperties(): string[] {
    return ['unitId', 'unitType', 'state', 'timestamp', 'version'];
  }

  /**
   * Get input property
   */
  get input(): any {
    return this.state.calculationInput;
  }

  /**
   * Get context property
   */
  get context(): UnitContext {
    return this.state.calculationContext;
  }

  /**
   * Get result property
   */
  get result(): number {
    return this.state.calculationResult;
  }

  /**
   * Get performance metrics property
   */
  get performanceMetrics(): any {
    return this.state.performanceMetrics;
  }

  /**
   * Get calculation statistics
   */
  getCalculationStatistics(): {
    unitId: string;
    unitType: string;
    result: number;
    hasError: boolean;
    templateName: string;
    strategyName: string;
    totalTime: number;
    memoryUsage: number;
    timestamp: Date;
  } {
    return {
      unitId: this.unitId,
      unitType: this.unitType,
      result: this.state.calculationResult,
      hasError: this.hasError(),
      templateName: this.state.templateName,
      strategyName: this.state.strategyName,
      totalTime: this.state.performanceMetrics.totalTime,
      memoryUsage: this.state.performanceMetrics.memoryUsage,
      timestamp: this.timestamp,
    };
  }

  /**
   * Calculate checksum for state validation
   */
  private calculateChecksum(stateString: string): string {
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
  isExpired(maxAge: number = 3600000): boolean {
    return this.getAge() > maxAge;
  }

  /**
   * Export calculation data
   */
  exportCalculationData(): {
    calculationInput: any;
    calculationContext: UnitContext;
    calculationResult: number;
    templateName: string;
    strategyName: string;
    errorMessage: string;
    performanceMetrics: any;
    unitId: string;
    unitType: string;
    timestamp: string;
  } {
    return {
      calculationInput: this.state.calculationInput,
      calculationContext: this.state.calculationContext,
      calculationResult: this.state.calculationResult,
      templateName: this.state.templateName,
      strategyName: this.state.strategyName,
      errorMessage: this.state.errorMessage,
      performanceMetrics: this.state.performanceMetrics,
      unitId: this.unitId,
      unitType: this.unitType,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Create successful calculation memento
   */
  static createSuccess(
    calculationInput: any,
    calculationContext: UnitContext,
    calculationResult: number,
    unitId: string,
    unitType: string,
    templateName: string = '',
    strategyName: string = '',
    performanceMetrics: {
      totalTime: number;
      stepTimes: Record<string, number>;
      memoryUsage: number;
    } = {
      totalTime: 0,
      stepTimes: {},
      memoryUsage: 0,
    }
  ): UnitCalculationMemento {
    return new UnitCalculationMemento(
      calculationInput,
      calculationContext,
      calculationResult,
      unitId,
      unitType,
      templateName,
      strategyName,
      '', // No error message for success
      performanceMetrics
    );
  }

  /**
   * Create failed calculation memento
   */
  static createFailure(
    calculationInput: any,
    calculationContext: UnitContext,
    unitId: string,
    unitType: string,
    templateName: string = '',
    strategyName: string = '',
    errorMessage: string,
    performanceMetrics: {
      totalTime: number;
      stepTimes: Record<string, number>;
      memoryUsage: number;
    } = {
      totalTime: 0,
      stepTimes: {},
      memoryUsage: 0,
    }
  ): UnitCalculationMemento {
    return new UnitCalculationMemento(
      calculationInput,
      calculationContext,
      NaN, // Invalid result for failed calculation
      unitId,
      unitType,
      templateName,
      strategyName,
      errorMessage,
      performanceMetrics
    );
  }

  // Setter methods for test compatibility
  public setTemplateName(templateName: string): void {
    (this as any).templateName = templateName;
  }

  public setStrategyName(strategyName: string): void {
    (this as any).strategyName = strategyName;
  }

  public setValidatorNames(validatorNames: string[]): void {
    (this as any).validatorNames = validatorNames;
  }

  public setIsSuccess(isSuccess: boolean): void {
    (this as any).isSuccess = isSuccess;
  }

  public setError(error: Error | undefined): void {
    (this as any).error = error;
  }

  public setUnitType(unitType: string): void {
    (this as any).unitType = unitType;
  }

  public setContext(context: UnitContext): void {
    (this as any).context = context;
  }

  public setPerformanceMetrics(metrics: any): void {
    (this as any).performanceMetrics = metrics;
  }
}
