import type { IUnitObserver } from './IUnitObserver';
// LogLevel enum not found, using string for now

const INFO = 'info';
const DEBUG = 'debug';
const WARN = 'warn';
const ERROR = 'error';

/**
 * Logging Observer
 * Integrates directly with the project's existing Logger system
 * Logs unit events for debugging and monitoring purposes
 * 
 * Note: This class focuses solely on logging observation logic. The actual logging
 * is handled by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class LoggingObserver implements IUnitObserver {
  private logLevel: string;
  private observerStatistics = {
    totalEvents: 0,
    eventsByType: {} as Record<string, number>,
    eventsByLevel: {} as Record<string, number>,
    lastEventTime: 0,
    averageEventsPerSecond: 0,
  };

  constructor(logLevel: string = 'INFO') {
    this.logLevel = logLevel;
  }

  /**
   * Called when a unit value changes
   */
  public onUnitValueChanged(unitId: string, oldValue: number, newValue: number): void {
    const event = 'unit_value_changed';
    const data = { unitId, oldValue, newValue, change: newValue - oldValue };

    this.recordEvent(INFO, event, data);
  }

  /**
   * Observe method for compatibility with test expectations
   */
  public observe(unit: any, eventType: string, context?: any): void {
    const event = `unit_${eventType}`;
    const data = { unitId: unit.id, eventType, context };

    this.recordEvent(INFO, event, data);
  }

  /**
   * Update method required by IUnitObserver interface
   * @param unit - The unit being updated
   * @param eventType - The type of event
   * @param data - Additional event data
   */
  public update(unit: any, eventType: string, data?: any): void {
    this.observe(unit, eventType, data);
  }

  /**
   * Called when a unit is created
   */
  public onUnitCreated(unitId: string, unitType: string): void {
    const event = 'unit_created';
    const data = { unitId, unitType };

    this.recordEvent(INFO, event, data);
  }

  /**
   * Called when a unit is destroyed
   */
  public onUnitDestroyed(unitId: string): void {
    const event = 'unit_destroyed';
    const data = { unitId };

    this.recordEvent(INFO, event, data);
  }

  /**
   * Called when a unit calculation starts
   */
  public onUnitCalculationStarted(unitId: string): void {
    const event = 'unit_calculation_started';
    const data = { unitId };

    this.recordEvent(DEBUG, event, data);
  }

  /**
   * Called when a unit calculation completes
   */
  public onUnitCalculationCompleted(unitId: string, result: number, duration: number): void {
    const event = 'unit_calculation_completed';
    const data = { unitId, result, duration };

    this.recordEvent(DEBUG, event, data);
  }

  /**
   * Called when a unit calculation fails
   */
  public onUnitCalculationFailed(unitId: string, error: Error): void {
    const event = 'unit_calculation_failed';
    const data = { unitId, error: error.message, stack: error.stack };

    this.recordEvent(ERROR, event, data);
  }

  /**
   * Called when a unit validation starts
   */
  public onUnitValidationStarted(unitId: string, context: any): void {
    const event = 'unit_validation_started';
    const data = { unitId, context };

    this.recordEvent(DEBUG, event, data);
  }

  /**
   * Called when a unit validation completes
   */
  public onUnitValidationCompleted(unitId: string, isValid: boolean, errors: string[]): void {
    const event = 'unit_validation_completed';
    const data = { unitId, isValid, errors };

    this.recordEvent(isValid ? DEBUG : WARN, event, data);
  }

  /**
   * Called when a unit strategy changes
   */
  public onUnitStrategyChanged(unitId: string, oldStrategy: string, newStrategy: string): void {
    const event = 'unit_strategy_changed';
    const data = { unitId, oldStrategy, newStrategy };

    this.recordEvent(INFO, event, data);
  }

  /**
   * Called when a unit configuration changes
   */
  public onUnitConfigurationChanged(unitId: string, oldConfig: any, newConfig: any): void {
    const event = 'unit_configuration_changed';
    const data = { unitId, oldConfig, newConfig };

    this.recordEvent(INFO, event, data);
  }

  /**
   * Set the log level for this observer
   */
  public setLogLevel(logLevel: string): void {
    this.logLevel = logLevel;
  }

  /**
   * Get the current log level
   */
  public getLogLevel(): string {
    return this.logLevel;
  }

  /**
   * Get observer statistics
   */
  public getObserverStatistics() {
    return { ...this.observerStatistics };
  }

  /**
   * Clear observer statistics
   */
  public clearStatistics(): void {
    this.observerStatistics = {
      totalEvents: 0,
      eventsByType: {},
      eventsByLevel: {} as Record<string, number>,
      lastEventTime: 0,
      averageEventsPerSecond: 0,
    };
  }

  /**
   * Check if an event should be logged based on log level
   */
  public shouldLogEvent(level: string): boolean {
    // Simple log level comparison
    const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const eventLevelIndex = levels.indexOf(level);
    return eventLevelIndex >= currentLevelIndex;
  }

  /**
   * Get events by type
   */
  public getEventsByType(eventType: string): number {
    return this.observerStatistics.eventsByType[eventType] || 0;
  }

  /**
   * Get events by level
   */
  public getEventsByLevel(level: string): number {
    return this.observerStatistics.eventsByLevel[level] || 0;
  }

  /**
   * Get total events count
   */
  public getTotalEvents(): number {
    return this.observerStatistics.totalEvents;
  }

  /**
   * Get average events per second
   */
  public getAverageEventsPerSecond(): number {
    return this.observerStatistics.averageEventsPerSecond;
  }

  /**
   * Record an event
   */
  private recordEvent(level: string, event: string, data: any): void {
    if (!this.shouldLogEvent(level)) {
      return;
    }

    this.observerStatistics.totalEvents++;
    this.observerStatistics.eventsByType[event] = (this.observerStatistics.eventsByType[event] || 0) + 1;
    this.observerStatistics.eventsByLevel[level] = (this.observerStatistics.eventsByLevel[level] || 0) + 1;
    this.observerStatistics.lastEventTime = Date.now();

    this.updateAverageEventsPerSecond();
  }

  /**
   * Update average events per second
   */
  private updateAverageEventsPerSecond(): void {
    const now = Date.now();
    const timeSinceLastEvent = now - this.observerStatistics.lastEventTime;
    
    if (timeSinceLastEvent > 0) {
      this.observerStatistics.averageEventsPerSecond = 
        this.observerStatistics.totalEvents / (timeSinceLastEvent / 1000);
    }
  }
}