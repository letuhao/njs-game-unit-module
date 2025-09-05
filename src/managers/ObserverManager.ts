import type { IUnitObserver } from '../observers/IUnitObserver';

/**
 * Observer Manager
 * Handles observer registration, notification, and lifecycle management
 * Follows Single Responsibility Principle - only manages observers
 * 
 * Note: This class focuses solely on observer management logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export interface IObserverManager {
  // Observer registration
  addObserver(observer: IUnitObserver): void;
  removeObserver(observer: IUnitObserver): boolean;

  // Observer notification
  notifyObservers(eventType: string, data: Record<string, string | number | boolean>): void;
  notifyUnitCreated(unitId: string, unitType: string): void;
  notifyUnitDestroyed(unitId: string): void;
  notifyUnitValueChanged(unitId: string, oldValue: number, newValue: number): void;

  // Observer management
  getAllObservers(): IUnitObserver[];
  getObserverCount(): number;
  clearObservers(): void;

  // Observer validation
  hasObserver(observer: IUnitObserver): boolean;
  validateObserver(observer: IUnitObserver): boolean;
}

/**
 * Observer Manager Implementation
 * Manages observer registration, notification, and lifecycle
 */
export class ObserverManager implements IObserverManager {
  private observers: IUnitObserver[] = [];
  private notificationStatistics = {
    totalNotifications: 0,
    successfulNotifications: 0,
    failedNotifications: 0,
    averageNotificationTime: 0,
  };

  /**
   * Add an observer
   */
  public addObserver(observer: IUnitObserver): void {
    if (!this.hasObserver(observer)) {
      this.observers.push(observer);
    }
  }

  /**
   * Remove an observer
   */
  public removeObserver(observer: IUnitObserver): boolean {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Notify all observers of an event
   */
  public notifyObservers(eventType: string, data: Record<string, string | number | boolean>): void {
    const startTime = performance.now();
    
    for (const observer of this.observers) {
      try {
        observer.update(eventType, data);
        this.notificationStatistics.successfulNotifications++;
      } catch (error) {
        this.notificationStatistics.failedNotifications++;
      }
    }
    
    this.updateNotificationStatistics(startTime);
  }

  /**
   * Notify observers of unit creation
   */
  public notifyUnitCreated(unitId: string, unitType: string): void {
    this.notifyObservers('unitCreated', {
      unitId,
      unitType,
      timestamp: Date.now(),
    });
  }

  /**
   * Notify observers of unit destruction
   */
  public notifyUnitDestroyed(unitId: string): void {
    this.notifyObservers('unitDestroyed', {
      unitId,
      timestamp: Date.now(),
    });
  }

  /**
   * Notify observers of unit value change
   */
  public notifyUnitValueChanged(unitId: string, oldValue: number, newValue: number): void {
    this.notifyObservers('unitValueChanged', {
      unitId,
      oldValue,
      newValue,
      timestamp: Date.now(),
    });
  }

  /**
   * Get all observers
   */
  public getAllObservers(): IUnitObserver[] {
    return [...this.observers];
  }

  /**
   * Get observer count
   */
  public getObserverCount(): number {
    return this.observers.length;
  }

  /**
   * Clear all observers
   */
  public clearObservers(): void {
    this.observers = [];
  }

  /**
   * Check if observer exists
   */
  public hasObserver(observer: IUnitObserver): boolean {
    return this.observers.includes(observer);
  }

  /**
   * Validate observer
   */
  public validateObserver(observer: IUnitObserver): boolean {
    return observer && typeof observer.update === 'function';
  }

  /**
   * Get notification statistics
   */
  public getNotificationStatistics() {
    return { ...this.notificationStatistics };
  }

  /**
   * Clear notification statistics
   */
  public clearNotificationStatistics(): void {
    this.notificationStatistics = {
      totalNotifications: 0,
      successfulNotifications: 0,
      failedNotifications: 0,
      averageNotificationTime: 0,
    };
  }

  /**
   * Update notification statistics
   */
  private updateNotificationStatistics(startTime: number): void {
    const endTime = performance.now();
    const notificationTime = endTime - startTime;
    
    this.notificationStatistics.totalNotifications++;
    
    // Update average notification time
    const totalTime = this.notificationStatistics.averageNotificationTime * 
      (this.notificationStatistics.totalNotifications - 1);
    this.notificationStatistics.averageNotificationTime = 
      (totalTime + notificationTime) / this.notificationStatistics.totalNotifications;
  }
}