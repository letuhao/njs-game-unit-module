/**
 * Core unit observer interface - basic observer operations
 */
export interface IUnitObserverCore {
  /** Called when a unit value changes */
  onUnitValueChanged(unitId: string, oldValue: number, newValue: number): void;

  /** Called when a unit is created */
  onUnitCreated(unitId: string, unitType: string): void;

  /** Called when a unit is destroyed */
  onUnitDestroyed(unitId: string): void;
}

/**
 * Unit calculation observer interface - calculation operations
 */
export interface IUnitCalculationObserver {
  /** Called when a unit calculation starts */
  onUnitCalculationStarted(unitId: string): void;

  /** Called when a unit calculation completes */
  onUnitCalculationCompleted(unitId: string, result: number, duration: number): void;

  /** Called when a unit calculation fails */
  onUnitCalculationFailed(unitId: string, error: Error): void;
}

/**
 * Complete unit observer interface
 * Combines all observer functionality
 */
export interface IUnitObserver extends 
  IUnitObserverCore,
  IUnitCalculationObserver {
  /** Generic update method for observer pattern */
  update(eventType: string, data: any): void;
}

/**
 * Core unit subject interface - basic subject operations
 */
export interface IUnitSubjectCore {
  /** Add an observer */
  addObserver(observer: IUnitObserver): void;

  /** Remove an observer */
  removeObserver(observer: IUnitObserver): void;

  /** Check if an observer is registered */
  hasObserver(observer: IUnitObserver): boolean;

  /** Get all registered observers */
  getObservers(): IUnitObserver[];

  /** Clear all observers */
  clearObservers(): void;
}

/**
 * Unit notification interface - notification operations
 */
export interface IUnitSubjectNotification {
  /** Notify all observers of a unit value change */
  notifyValueChanged(unitId: string, oldValue: number, newValue: number): void;

  /** Notify all observers of a unit creation */
  notifyUnitCreated(unitId: string, unitType: string): void;

  /** Notify all observers of a unit destruction */
  notifyUnitDestroyed(unitId: string): void;

  /** Notify all observers of calculation start */
  notifyCalculationStarted(unitId: string): void;

  /** Notify all observers of calculation completion */
  notifyCalculationCompleted(unitId: string, result: number, duration: number): void;

  /** Notify all observers of calculation failure */
  notifyCalculationFailed(unitId: string, error: Error): void;
}

/**
 * Complete unit subject interface
 * Combines all subject functionality
 */
export interface IUnitSubject extends 
  IUnitSubjectCore,
  IUnitSubjectNotification {
}

/**
 * Unit Event Types
 * Defines the types of events that can occur in the unit system
 */
export enum UnitEventType {
  VALUE_CHANGED = 'value_changed',
  UNIT_CREATED = 'unit_created',
  UNIT_DESTROYED = 'unit_destroyed',
  CALCULATION_STARTED = 'calculation_started',
  CALCULATION_COMPLETED = 'calculation_completed',
  CALCULATION_FAILED = 'calculation_failed',
}

/**
 * Unit Event Data
 * Contains information about unit events
 */
export interface IUnitEvent {
  type: UnitEventType;
  unitId: string;
  timestamp: Date;
  data: Record<string, unknown>;
}
