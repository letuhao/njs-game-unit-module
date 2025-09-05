import type { IUnitDecorator } from './IUnitDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { DiContainer } from '../container/DiContainer';
import { EnhancedLoggingDecorator } from './EnhancedLoggingDecorator';
import { PerformanceLoggingDecorator } from './PerformanceLoggingDecorator';
import { ValidationDecorator } from './ValidationDecorator';
import { CachingDecorator } from './CachingDecorator';

/**
 * Decorator Factory
 * Creates and applies decorators to units
 * Follows Factory Pattern and Single Responsibility Principle
 */
export class DecoratorFactory {
  constructor(private container: DiContainer) {}

  /**
   * Apply logging decorator to a unit
   */
  public applyLoggingDecorator(
    unit: IUnit,
    options: {
      logLevel?: 'debug' | 'info' | 'warn' | 'error';
      logPerformance?: boolean;
      logValidation?: boolean;
      logCalculation?: boolean;
    } = {}
  ): IUnitDecorator {
    return new EnhancedLoggingDecorator(unit, this.container, options);
  }

  /**
   * Apply performance decorator to a unit
   */
  public applyPerformanceDecorator(
    unit: IUnit,
    options: {
      logThreshold?: number;
      trackMetrics?: boolean;
      logSlowOperations?: boolean;
    } = {}
  ): IUnitDecorator {
    return new PerformanceLoggingDecorator(unit, this.container, options);
  }

  /**
   * Apply validation decorator to a unit
   */
  public applyValidationDecorator(unit: IUnit): IUnitDecorator {
    return new ValidationDecorator(unit);
  }

  /**
   * Apply caching decorator to a unit
   */
  public applyCachingDecorator(
    unit: IUnit,
    keyFunction: (context: any) => string
  ): IUnitDecorator {
    return new CachingDecorator(unit, keyFunction);
  }

  /**
   * Apply multiple decorators to a unit
   */
  public applyDecorators(
    unit: IUnit,
    decoratorConfig: {
      logging?: {
        enabled: boolean;
        options?: {
          logLevel?: 'debug' | 'info' | 'warn' | 'error';
          logPerformance?: boolean;
          logValidation?: boolean;
          logCalculation?: boolean;
        };
      };
      performance?: {
        enabled: boolean;
        options?: {
          logThreshold?: number;
          trackMetrics?: boolean;
          logSlowOperations?: boolean;
        };
      };
      validation?: {
        enabled: boolean;
      };
      caching?: {
        enabled: boolean;
        keyFunction?: (context: any) => string;
      };
    }
  ): IUnitDecorator {
    let decoratedUnit: IUnitDecorator = unit as IUnitDecorator;

    // Apply decorators in order (inner to outer)
    if (decoratorConfig.caching?.enabled) {
      const keyFunction = decoratorConfig.caching.keyFunction || 
        ((context: any) => JSON.stringify(context));
      decoratedUnit = this.applyCachingDecorator(decoratedUnit, keyFunction);
    }

    if (decoratorConfig.validation?.enabled) {
      decoratedUnit = this.applyValidationDecorator(decoratedUnit);
    }

    if (decoratorConfig.performance?.enabled) {
      decoratedUnit = this.applyPerformanceDecorator(
        decoratedUnit, 
        decoratorConfig.performance.options || {}
      );
    }

    if (decoratorConfig.logging?.enabled) {
      decoratedUnit = this.applyLoggingDecorator(
        decoratedUnit, 
        decoratorConfig.logging.options || {}
      );
    }

    return decoratedUnit;
  }

  /**
   * Create a fully decorated unit with all decorators
   */
  public createFullyDecoratedUnit(
    unit: IUnit,
    options: {
      enableLogging?: boolean;
      enablePerformance?: boolean;
      enableValidation?: boolean;
      enableCaching?: boolean;
      logLevel?: 'debug' | 'info' | 'warn' | 'error';
      performanceThreshold?: number;
      cacheKeyFunction?: (context: any) => string;
    } = {}
  ): IUnitDecorator {
    return this.applyDecorators(unit, {
      logging: {
        enabled: options.enableLogging ?? true,
        options: {
          logLevel: options.logLevel || 'info'
        }
      },
      performance: {
        enabled: options.enablePerformance ?? true,
        options: {
          logThreshold: options.performanceThreshold || 50,
          trackMetrics: true,
          logSlowOperations: true
        }
      },
      validation: {
        enabled: options.enableValidation ?? true
      },
      caching: {
        enabled: options.enableCaching ?? false,
        keyFunction: options.cacheKeyFunction || ((context: any) => JSON.stringify(context))
      }
    });
  }

  /**
   * Create a production-ready decorated unit (minimal logging)
   */
  public createProductionDecoratedUnit(unit: IUnit): IUnitDecorator {
    return this.applyDecorators(unit, {
      logging: {
        enabled: true,
        options: {
          logLevel: 'warn',
          logPerformance: false,
          logValidation: false,
          logCalculation: false
        }
      },
      performance: {
        enabled: true,
        options: {
          logThreshold: 100,
          trackMetrics: true,
          logSlowOperations: false
        }
      },
      validation: {
        enabled: true
      },
      caching: {
        enabled: true,
        keyFunction: (context: any) => JSON.stringify(context)
      }
    });
  }

  /**
   * Create a development-ready decorated unit (full logging)
   */
  public createDevelopmentDecoratedUnit(unit: IUnit): IUnitDecorator {
    return this.applyDecorators(unit, {
      logging: {
        enabled: true,
        options: {
          logLevel: 'debug',
          logPerformance: true,
          logValidation: true,
          logCalculation: true
        }
      },
      performance: {
        enabled: true,
        options: {
          logThreshold: 10,
          trackMetrics: true,
          logSlowOperations: true
        }
      },
      validation: {
        enabled: true
      },
      caching: {
        enabled: false
      }
    });
  }

  /**
   * Get available decorator types
   */
  public getAvailableDecorators(): string[] {
    return ['logging', 'performance', 'validation', 'caching'];
  }

  /**
   * Get decorator configuration template
   */
  public getDecoratorConfigurationTemplate(): Record<string, any> {
    return {
      logging: {
        enabled: true,
        options: {
          logLevel: 'info',
          logPerformance: true,
          logValidation: true,
          logCalculation: true
        }
      },
      performance: {
        enabled: true,
        options: {
          logThreshold: 50,
          trackMetrics: true,
          logSlowOperations: true
        }
      },
      validation: {
        enabled: true
      },
      caching: {
        enabled: false,
        keyFunction: '(context) => JSON.stringify(context)'
      }
    };
  }
}
