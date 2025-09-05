/**
 * Simple Logger Interface for Unit System
 * 
 * This is a minimal logger implementation that can be easily replaced
 * with any logging library in the consuming application.
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface ILogger {
  debug(className: string, method: string, message: string, data?: any): void;
  info(className: string, method: string, message: string, data?: any): void;
  warn(className: string, method: string, message: string, data?: any): void;
  error(className: string, method: string, message: string, data?: any): void;
}

class Logger implements ILogger {
  private static instance: typeof logger;
  private logLevel: LogLevel = LogLevel.INFO;

  private constructor() {}

  public static getInstance(): typeof logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  private formatMessage(className: string, method: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const dataStr = data ? ` | Data: ${JSON.stringify(data)}` : '';
    return `[${timestamp}] [${className}.${method}] ${message}${dataStr}`;
  }

  public debug(className: string, method: string, message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(className, method, message, data));
    }
  }

  public info(className: string, method: string, message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(className, method, message, data));
    }
  }

  public warn(className: string, method: string, message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(className, method, message, data));
    }
  }

  public error(className: string, method: string, message: string, data?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(className, method, message, data));
    }
  }
}

export const logger = Logger.getInstance();
