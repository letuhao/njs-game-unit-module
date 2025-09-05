/**
 * Logger interface for consistent logging across the application
 */
export interface ILogger {
  debug(component: string, method: string, message: string, data?: Record<string, unknown>): void;
  info(component: string, method: string, message: string, data?: Record<string, unknown>): void;
  warn(component: string, method: string, message: string, data?: Record<string, unknown>): void;
  error(component: string, method: string, message: string, data?: Record<string, unknown>): void;
}

/**
 * Simple logger implementation
 */
class Logger implements ILogger {
  private logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info';

  public setLogLevel(level: 'debug' | 'info' | 'warn' | 'error'): void {
    this.logLevel = level;
  }

  public debug(component: string, method: string, message: string, data?: Record<string, unknown>): void {
    if (this.shouldLog('debug')) {
      console.debug(`[DEBUG] ${component}.${method}: ${message}`, data || '');
    }
  }

  public info(component: string, method: string, message: string, data?: Record<string, unknown>): void {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${component}.${method}: ${message}`, data || '');
    }
  }

  public warn(component: string, method: string, message: string, data?: Record<string, unknown>): void {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${component}.${method}: ${message}`, data || '');
    }
  }

  public error(component: string, method: string, message: string, data?: Record<string, unknown>): void {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${component}.${method}: ${message}`, data || '');
    }
  }

  private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    return levels[level] >= levels[this.logLevel];
  }
}

// Export singleton instance
export const logger = new Logger();
