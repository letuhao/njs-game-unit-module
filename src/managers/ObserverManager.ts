import type { IObserverManager } from './IObserverManager';
import type { IUnitObserver } from '../interfaces/IUnitObserver';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Observer Manager Implementation
 * Concrete implementation of observer management using DI
 */
export class ObserverManager implements IObserverManager {
  private observers: Set<IUnitObserver> = new Set();
  private logger: any;

  constructor() {
    // Resolve logger from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }
  }

  /**
   * Add an observer to the manager
   */
  public addObserver(observer: IUnitObserver): void {
    this.logger.debug('ObserverManager', 'addObserver', 'Adding observer', {
      observerType: observer.constructor.name,
      totalObservers: this.observers.size + 1,
    });

    this.observers.add(observer);
  }

  /**
   * Remove an observer from the manager
   */
  public removeObserver(observer: IUnitObserver): boolean {
    const removed = this.observers.delete(observer);
    
    this.logger.debug('ObserverManager', 'removeObserver', 'Removing observer', {
      observerType: observer.constructor.name,
      removed,
      totalObservers: this.observers.size,
    });

    return removed;
  }

  /**
   * Notify all observers of a unit event
   */
  public notifyObservers(event: string, data: any): void {
    this.logger.debug('ObserverManager', 'notifyObservers', 'Notifying observers', {
      event,
      observerCount: this.observers.size,
    });

    for (const observer of this.observers) {
      try {
        observer.update(event, data);
      } catch (error) {
        this.logger.error('ObserverManager', 'notifyObservers', 'Observer notification failed', {
          observerType: observer.constructor.name,
          event,
          error,
        });
      }
    }
  }

  /**
   * Get all observers
   */
  public getObservers(): IUnitObserver[] {
    return Array.from(this.observers);
  }

  /**
   * Get observer count
   */
  public getObserverCount(): number {
    return this.observers.size;
  }

  /**
   * Check if observer exists
   */
  public hasObserver(observer: IUnitObserver): boolean {
    return this.observers.has(observer);
  }

  /**
   * Clear all observers
   */
  public clearObservers(): void {
    this.logger.debug('ObserverManager', 'clearObservers', 'Clearing all observers', {
      observerCount: this.observers.size,
    });

    this.observers.clear();
  }

  /**
   * Get observers by type
   */
  public getObserversByType(type: string): IUnitObserver[] {
    return this.getObservers().filter(observer => 
      observer.constructor.name === type
    );
  }

  /**
   * Get observer statistics
   */
  public getStatistics(): {
    totalObservers: number;
    observerTypes: Record<string, number>;
    observerNames: string[];
  } {
    const observerTypes: Record<string, number> = {};
    const observerNames: string[] = [];

    for (const observer of this.observers) {
      const type = observer.constructor.name;
      observerTypes[type] = (observerTypes[type] || 0) + 1;
      observerNames.push(type);
    }

    return {
      totalObservers: this.observers.size,
      observerTypes,
      observerNames,
    };
  }

  /**
   * Validate observer before adding
   */
  private validateObserver(observer: IUnitObserver): boolean {
    if (!observer) {
      this.logger.warn('ObserverManager', 'validateObserver', 'Observer is null or undefined');
      return false;
    }

    if (typeof observer.update !== 'function') {
      this.logger.warn('ObserverManager', 'validateObserver', 'Observer does not have update method');
      return false;
    }

    return true;
  }

  /**
   * Add observer with validation
   */
  public addObserverWithValidation(observer: IUnitObserver): boolean {
    if (!this.validateObserver(observer)) {
      return false;
    }

    this.addObserver(observer);
    return true;
  }

  /**
   * Notify observers with error handling
   */
  public notifyObserversSafely(event: string, data: any): {
    success: boolean;
    errorCount: number;
    successCount: number;
  } {
    let errorCount = 0;
    let successCount = 0;

    for (const observer of this.observers) {
      try {
        observer.update(event, data);
        successCount++;
      } catch (error) {
        errorCount++;
        this.logger.error('ObserverManager', 'notifyObserversSafely', 'Observer notification failed', {
          observerType: observer.constructor.name,
          event,
          error,
        });
      }
    }

    return {
      success: errorCount === 0,
      errorCount,
      successCount,
    };
  }

  /**
   * Get manager metadata
   */
  public getMetadata(): {
    managerType: string;
    observerCount: number;
    loggerAvailable: boolean;
    methods: string[];
  } {
    return {
      managerType: 'ObserverManager',
      observerCount: this.observers.size,
      loggerAvailable: !!this.logger,
      methods: [
        'addObserver',
        'removeObserver',
        'notifyObservers',
        'getObservers',
        'getObserverCount',
        'hasObserver',
        'clearObservers',
        'getObserversByType',
        'getStatistics',
        'addObserverWithValidation',
        'notifyObserversSafely',
      ],
    };
  }
}