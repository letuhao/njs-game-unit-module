import type { IUnitDecorator } from '../interfaces/IUnitDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import type { DiContainer } from '../container/DiContainer';
import { BaseUnitDecorator } from '../interfaces/IUnitDecorator';
import { UnitType } from '../enums/UnitType';
import { TOKENS } from '../container/Tokens';

/**
 * Enhanced Logging Decorator
 * Adds comprehensive logging functionality to any unit
 * Follows Single Responsibility Principle - only handles logging concerns
 */
export class EnhancedLoggingDecorator extends BaseUnitDecorator {
  private logger: any;
  private logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info';
  private logPerformance: boolean = true;
  private logValidation: boolean = true;
  private logCalculation: boolean = true;

  constructor(
    decoratedUnit: IUnit,
    private container: DiContainer,
    options: {
      logLevel?: 'debug' | 'info' | 'warn' | 'error';
      logPerformance?: boolean;
      logValidation?: boolean;
      logCalculation?: boolean;
    } = {}
  ) {
    super(
      `enhanced-logging-${decoratedUnit.id}`,
      `Enhanced Logging Decorator for ${decoratedUnit.name}`,
      decoratedUnit.unitType,
      decoratedUnit
    );
    this.logLevel = options.logLevel || 'info';
    this.logPerformance = options.logPerformance ?? true;
    this.logValidation = options.logValidation ?? true;
    this.logCalculation = options.logCalculation ?? true;
    
    // Resolve logger from DI container
    try {
      this.logger = this.container.resolve(TOKENS.LOGGER);
    } catch (error) {
      // Fallback to console if DI fails
      this.logger = console;
    }
  }

  /**
   * Get the decorated unit
   */
  getDecoratedUnit(): IUnit {
    return this.wrappedUnit;
  }

  /**
   * Calculate with logging
   */
  // Override performCalculation to add logging
  protected performCalculation(context: UnitContext): number {
    const startTime = this.logPerformance ? performance.now() : 0;
    
    try {
      // Log calculation start
      if (this.logCalculation) {
        this.log('debug', 'Calculation started', {
          unitId: this.wrappedUnit.id,
          unitType: this.wrappedUnit.unitType,
          context: this.sanitizeContext(context)
        });
      }

      // Perform calculation
      const result = this.wrappedUnit.calculate(context);

      // Log calculation result
      if (this.logCalculation) {
        const duration = this.logPerformance ? performance.now() - startTime : 0;
        this.log('info', 'Calculation completed', {
          unitId: this.wrappedUnit.id,
          result,
          duration: this.logPerformance ? `${duration.toFixed(2)}ms` : undefined
        });
      }

      return result;
    } catch (error) {
      // Log calculation error
      this.log('error', 'Calculation failed', {
        unitId: this.wrappedUnit.id,
        error: error instanceof Error ? error.message : String(error),
        context: this.sanitizeContext(context)
      });
      throw error;
    }
  }

  // Override beforeCalculation to add logging
  protected beforeCalculation(context: UnitContext): void {
    this.logCalculation && this.log('debug', 'Before calculation', { context: this.sanitizeContext(context) });
  }

  // Override afterCalculation to add logging
  protected afterCalculation(result: number, context: UnitContext): void {
    this.logCalculation && this.log('debug', 'After calculation', { result, context: this.sanitizeContext(context) });
  }

  // Override validateDecorator to add logging
  protected validateDecorator(context: UnitContext): boolean {
    return true; // EnhancedLoggingDecorator doesn't add validation constraints
  }




  /**
   * Set log level
   */
  setLogLevel(level: 'debug' | 'info' | 'warn' | 'error'): void {
    this.logLevel = level;
    this.log('info', 'Log level changed', { newLevel: level });
  }

  /**
   * Enable/disable performance logging
   */
  setPerformanceLogging(enabled: boolean): void {
    this.logPerformance = enabled;
    this.log('info', 'Performance logging changed', { enabled });
  }

  /**
   * Enable/disable validation logging
   */
  setValidationLogging(enabled: boolean): void {
    this.logValidation = enabled;
    this.log('info', 'Validation logging changed', { enabled });
  }

  /**
   * Enable/disable calculation logging
   */
  setCalculationLogging(enabled: boolean): void {
    this.logCalculation = enabled;
    this.log('info', 'Calculation logging changed', { enabled });
  }

  /**
   * Get logging configuration
   */
  getLoggingConfiguration(): {
    logLevel: string;
    logPerformance: boolean;
    logValidation: boolean;
    logCalculation: boolean;
  } {
    return {
      logLevel: this.logLevel,
      logPerformance: this.logPerformance,
      logValidation: this.logValidation,
      logCalculation: this.logCalculation
    };
  }

  /**
   * Internal logging method
   */
  private log(level: 'debug' | 'info' | 'warn' | 'error', message: string, meta?: Record<string, unknown>): void {
    // Check if we should log at this level
    if (!this.shouldLog(level)) {
      return;
    }

    // Format log entry
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      unitId: this.wrappedUnit.id,
      unitType: this.wrappedUnit.unitType,
      ...meta
    };

    // Log using the resolved logger
    if (this.logger && typeof this.logger[level] === 'function') {
      this.logger[level](message, logEntry);
    } else if (this.logger && typeof this.logger.log === 'function') {
      this.logger.log(`[${level.toUpperCase()}] ${message}`, logEntry);
    } else {
      console.log(`[${level.toUpperCase()}] ${message}`, logEntry);
    }
  }

  /**
   * Check if we should log at the given level
   */
  private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    return levels[level] >= levels[this.logLevel];
  }

  /**
   * Sanitize context for logging (remove sensitive data)
   */
  private sanitizeContext(context: UnitContext): Record<string, unknown> {
    if (!context) return {};
    
    const sanitized: Record<string, unknown> = {};
    
    // Only include safe properties
    if (context.parent) {
      sanitized.parent = {
        width: context.parent.width,
        height: context.parent.height
      };
    }
    
    if (context.viewport) {
      sanitized.viewport = {
        width: context.viewport.width,
        height: context.viewport.height
      };
    }
    
    if (context.scene) {
      sanitized.scene = {
        width: context.scene.width,
        height: context.scene.height
      };
    }
    
    return sanitized;
  }

  /**
   * Get the wrapped unit
   */
  getWrappedUnit(): IUnit {
    return this.wrappedUnit;
  }

  /**
   * Get the decorator type
   */
  getDecoratorType(): string {
    return 'EnhancedLoggingDecorator';
  }

  /**
   * Check if the decorator is enabled
   */
  isEnabled(): boolean {
    return this.logLevel !== 'error';
  }

  /**
   * Enable or disable the decorator
   */
  setEnabled(enabled: boolean): void {
    this.logLevel = enabled ? 'info' : 'error';
  }
}
