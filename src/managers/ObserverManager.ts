import type { IUnitObserver } from '../observers/IUnitObserver';
import { logger } from '../core/Logger';

/**
 * Core observer manager interface - basic observer operations
 */
export interface IObserverManagerCore {
  /** Add an observer to the manager */
  addObserver(observer: IUnitObserver): void;

  /** Remove an observer from the manager */
  removeObserver(observer: IUnitObserver): boolean;
}

/**
 * Observer notification interface - notification operations
 */
export interface IObserverManagerNotification {
  /** Notify all observers with a generic event */
  notifyObservers(eventType: string, data: Record<string, string | number | boolean>): void;

  /** Notify observers of unit creation */
  notifyUnitCreated(unitId: string, unitType: string): void;

  /** Notify observers of unit destruction */
  notifyUnitDestroyed(unitId: string): void;

  /** Notify observers of unit value change */
  notifyUnitValueChanged(unitId: string, oldValue: number, newValue: number): void;
}

/**
 * Observer management interface - management operations
 */
export interface IObserverManagerManagement {
  /** Get all registered observers */
  getAllObservers(): IUnitObserver[];

  /** Get the number of registered observers */
  getObserverCount(): number;

  /** Clear all observers */
  clearObservers(): void;
}

/**
 * Observer validation interface - validation operations
 */
export interface IObserverManagerValidation {
  /** Check if an observer is registered */
  hasObserver(observer: IUnitObserver): boolean;

  /** Validate an observer before registration */
  validateObserver(observer: IUnitObserver): boolean;
}

/**
 * Complete observer manager interface
 * Combines all observer manager functionality
 */
export interface IObserverManager extends 
  IObserverManagerCore,
  IObserverManagerNotification,
  IObserverManagerManagement,
  IObserverManagerValidation {
}

/**
 * Observer Manager Implementation
 * Concrete implementation of observer management
 */
export class ObserverManager implements IObserverManager {
  private observers: Set<IUnitObserver> = new Set();
  private readonly logger: typeof logger = logger;

  /**
   * Add an observer to the manager
   */
  public addObserver(observer: IUnitObserver): void {
    this.logger.debug('ObserverManager', 'addObserver', 'Adding observer', {
      observerType: observer.constructor.name,
    });

    try {
      if (this.validateObserver(observer)) {
        this.observers.add(observer);
        this.logger.info('ObserverManager', 'addObserver', 'Observer added successfully', {
          observerType: observer.constructor.name,
          totalObservers: this.observers.size,
        });
      } else {
        throw new Error('Invalid observer provided');
      }
    } catch (error) {
      this.logger.error('ObserverManager', 'addObserver', 'Failed to add observer', {
        observerType: observer.constructor.name,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Remove an observer from the manager
   */
  public removeObserver(observer: IUnitObserver): boolean {
    const removed = this.observers.delete(observer);

    if (removed) {
      this.logger.info('ObserverManager', 'removeObserver', 'Observer removed successfully', {
        observerType: observer.constructor.name,
        remainingObservers: this.observers.size,
      });
    } else {
      this.logger.debug('ObserverManager', 'removeObserver', 'Observer not found for removal', {
        observerType: observer.constructor.name,
      });
    }

    return removed;
  }

  /**
   * Notify all observers with a generic event
   */
  public notifyObservers(eventType: string, data: Record<string, string | number | boolean>): void {
    this.logger.debug('ObserverManager', 'notifyObservers', 'Notifying observers', {
      eventType,
      observerCount: this.observers.size,
      dataKeys: Object.keys(data),
    });

    let successCount = 0;
    let errorCount = 0;

    this.observers.forEach(observer => {
      try {
        // Call appropriate observer method based on event type
        switch (eventType) {
          case 'unit_created':
            if (typeof data.unitId === 'string' && typeof data.unitType === 'string') {
              observer.onUnitCreated(data.unitId, data.unitType);
              successCount++;
            }
            break;
          case 'unit_destroyed':
            if (typeof data.unitId === 'string') {
              observer.onUnitDestroyed(data.unitId);
              successCount++;
            }
            break;
          case 'value_changed':
            if (
              typeof data.unitId === 'string' &&
              typeof data.oldValue === 'number' &&
              typeof data.newValue === 'number'
            ) {
              observer.onUnitValueChanged(data.unitId, data.oldValue, data.newValue);
              successCount++;
            }
            break;
          default:
            this.logger.warn('ObserverManager', 'notifyObservers', 'Unknown event type', {
              eventType,
            });
            break;
        }
      } catch (error) {
        errorCount++;
        this.logger.error('ObserverManager', 'notifyObservers', 'Error notifying observer', {
          observerType: observer.constructor.name,
          eventType,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    });

    this.logger.info('ObserverManager', 'notifyObservers', 'Observer notification completed', {
      eventType,
      totalObservers: this.observers.size,
      successCount,
      errorCount,
    });
  }

  /**
   * Notify observers of unit creation
   */
  public notifyUnitCreated(unitId: string, unitType: string): void {
    this.notifyObservers('unit_created', { unitId, unitType });
  }

  /**
   * Notify observers of unit destruction
   */
  public notifyUnitDestroyed(unitId: string): void {
    this.notifyObservers('unit_destroyed', { unitId });
  }

  /**
   * Notify observers of unit value change
   */
  public notifyUnitValueChanged(unitId: string, oldValue: number, newValue: number): void {
    this.notifyObservers('value_changed', { unitId, oldValue, newValue });
  }

  /**
   * Get all registered observers
   */
  public getAllObservers(): IUnitObserver[] {
    return Array.from(this.observers);
  }

  /**
   * Get the number of registered observers
   */
  public getObserverCount(): number {
    return this.observers.size;
  }

  /**
   * Clear all observers
   */
  public clearObservers(): void {
    const count = this.observers.size;
    this.observers.clear();
    this.logger.info('ObserverManager', 'clearObservers', 'All observers cleared', { count });
  }

  /**
   * Check if an observer is registered
   */
  public hasObserver(observer: IUnitObserver): boolean {
    return this.observers.has(observer);
  }

  /**
   * Validate an observer before registration
   */
  public validateObserver(observer: IUnitObserver): boolean {
    if (!observer) {
      this.logger.warn('ObserverManager', 'validateObserver', 'Observer is null or undefined');
      return false;
    }

    if (typeof observer.onUnitCreated !== 'function') {
      this.logger.warn('ObserverManager', 'validateObserver', 'Missing onUnitCreated method');
      return false;
    }

    if (typeof observer.onUnitDestroyed !== 'function') {
      this.logger.warn('ObserverManager', 'validateObserver', 'Missing onUnitDestroyed method');
      return false;
    }

    if (typeof observer.onUnitValueChanged !== 'function') {
      this.logger.warn('ObserverManager', 'validateObserver', 'Missing onUnitValueChanged method');
      return false;
    }

    this.logger.debug('ObserverManager', 'validateObserver', 'Observer validation passed', {
      observerType: observer.constructor.name,
    });
    return true;
  }
}
