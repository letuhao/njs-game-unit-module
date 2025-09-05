import { LogLevel } from '../../enums/LogLevel';
import { logger } from '../../core/Logger';

/**
 * Strategy function type for log level strategies
 */
export type LogLevelStrategy = (objectName: string, methodName: string, message: string, data: Record<string, unknown>) => void;

/**
 * Registry for log level strategies
 */
export class LogLevelStrategyRegistry {
  private static instance: LogLevelStrategyRegistry;
  private logLevelStrategies: Map<LogLevel, LogLevelStrategy> = new Map();

  private constructor() {
    this.initializeLogLevelStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): LogLevelStrategyRegistry {
    if (!LogLevelStrategyRegistry.instance) {
      LogLevelStrategyRegistry.instance = new LogLevelStrategyRegistry();
    }
    return LogLevelStrategyRegistry.instance;
  }

  /**
   * Get strategy for log level
   */
  public getLogLevelStrategy(logLevel: LogLevel): LogLevelStrategy {
    return this.logLevelStrategies.get(logLevel) || this.getDefaultLogLevelStrategy();
  }

  /**
   * Register custom log level strategy
   */
  public registerLogLevelStrategy(logLevel: LogLevel, strategy: LogLevelStrategy): void {
    this.logLevelStrategies.set(logLevel, strategy);
  }

  /**
   * Initialize log level strategies
   */
  private initializeLogLevelStrategies(): void {
    // Debug strategy
    this.logLevelStrategies.set(LogLevel.DEBUG, (objectName, methodName, message, data) => {
      logger.debug(objectName, methodName, message, data);
    });

    // Info strategy
    this.logLevelStrategies.set(LogLevel.INFO, (objectName, methodName, message, data) => {
      logger.info(objectName, methodName, message, data);
    });

    // Warn strategy
    this.logLevelStrategies.set(LogLevel.WARN, (objectName, methodName, message, data) => {
      logger.warn(objectName, methodName, message, data);
    });

    // Error strategy
    this.logLevelStrategies.set(LogLevel.ERROR, (objectName, methodName, message, data) => {
      logger.error(objectName, methodName, message, data);
    });
  }

  /**
   * Default log level strategy
   */
  private getDefaultLogLevelStrategy(): LogLevelStrategy {
    return (objectName, methodName, message, data) => {
      logger.info(objectName, methodName, message, data);
    };
  }
}
