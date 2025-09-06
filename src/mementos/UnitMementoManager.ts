import type { IUnitMementoCaretaker, IUnitMemento } from './IUnitMemento';
import { UnitMementoCaretaker } from './UnitMementoCaretaker';
import { UnitCalculationMemento } from './UnitCalculationMemento';
import type { UnitContext } from '../interfaces/IUnit';
import type { IUnitCalculationTemplate } from '../templates/IUnitCalculationTemplate';
import type { IStrategyInput } from '../interfaces/strategy/IStrategyInputTypes';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Unit Memento Manager
 * Integrates memento system with unit calculations
 * Provides automatic state saving and intelligent restoration
 * 
 * Note: This class focuses solely on memento management logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class UnitMementoManager {
  private readonly caretaker: IUnitMementoCaretaker;
  private autoSaveEnabled: boolean = true;
  private autoSaveThreshold: number = DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT; // ms
  private significantChangeThresholds = {
    timeThreshold: 50, // ms
    resultThreshold: 0.01, // 1% change
  };
  private mementoStatistics = {
    totalMementosCreated: 0,
    totalMementosRestored: 0,
    totalAutoSaves: 0,
    totalManualSaves: 0,
    averageMementoSize: 0,
    memoryUsage: 0,
  };

  constructor() {
    this.caretaker = new UnitMementoCaretaker();
  }

  /**
   * Enable or disable automatic memento saving
   */
  public setAutoSaveEnabled(enabled: boolean): void {
    this.autoSaveEnabled = enabled;
  }

  /**
   * Check if auto-save is enabled
   */
  public isAutoSaveEnabled(): boolean {
    return this.autoSaveEnabled;
  }

  /**
   * Set auto-save threshold
   */
  public setAutoSaveThreshold(threshold: number): void {
    this.autoSaveThreshold = Math.max(0, threshold);
  }

  /**
   * Get auto-save threshold
   */
  public getAutoSaveThreshold(): number {
    return this.autoSaveThreshold;
  }

  /**
   * Create a memento for a unit calculation
   */
  public createMemento(
    unitId: string,
    context: UnitContext,
    result: number,
    template: IUnitCalculationTemplate,
    strategyInput: IStrategyInput,
    performanceMetrics?: Record<string, number>
  ): IUnitMemento {
    const memento = new UnitCalculationMemento(
      strategyInput,
      context,
      result,
      unitId,
      'calculation', // unitType
      template.getCalculationMetadata().templateName,
      'strategy', // strategyName
      '', // errorMessage
      performanceMetrics ? {
        totalTime: performanceMetrics.totalTime || 0,
        stepTimes: (performanceMetrics.stepTimes && typeof performanceMetrics.stepTimes === 'object') ? performanceMetrics.stepTimes as Record<string, number> : {},
        memoryUsage: performanceMetrics.memoryUsage || 0
      } : undefined
    );

    this.mementoStatistics.totalMementosCreated++;
    this.updateMementoStatistics();

    return memento;
  }

  /**
   * Save a memento
   */
  public saveMemento(memento: IUnitMemento): void {
    this.caretaker.saveMemento(memento);
    this.mementoStatistics.totalManualSaves++;
    this.updateMementoStatistics();
  }

  /**
   * Auto-save a memento if conditions are met
   */
  public autoSaveMemento(
    unitId: string,
    context: UnitContext,
    result: number,
    template: IUnitCalculationTemplate,
    strategyInput: IStrategyInput,
    performanceMetrics?: Record<string, number>
  ): boolean {
    if (!this.autoSaveEnabled) {
      return false;
    }

    // Check if enough time has passed since last save
    const lastMemento = this.caretaker.getLatestMemento(unitId);
    if (lastMemento) {
      const timeSinceLastSave = Date.now() - lastMemento.getTimestamp().getTime();
      if (timeSinceLastSave < this.autoSaveThreshold) {
        return false;
      }

      // Check if result has changed significantly
      const lastResult = lastMemento.result;
      if (lastResult !== undefined) {
        const changePercent = Math.abs(result - lastResult) / Math.abs(lastResult);
        if (changePercent < this.significantChangeThresholds.resultThreshold) {
          return false;
        }
      }
    }

    // Create and save memento
    const memento = this.createMemento(unitId, context, result, template, strategyInput, performanceMetrics);
    this.caretaker.saveMemento(memento);
    this.mementoStatistics.totalAutoSaves++;
    this.updateMementoStatistics();

    return true;
  }

  /**
   * Restore a unit to a specific memento
   */
  public restoreToMemento(unitId: string, memento: IUnitMemento): boolean {
    const restored = this.caretaker.restoreToMemento(unitId, memento);
    if (restored) {
      this.mementoStatistics.totalMementosRestored++;
      this.updateMementoStatistics();
    }
    return restored;
  }

  /**
   * Restore to the latest memento for a unit
   */
  public restoreToLatest(unitId: string): boolean {
    const latestMemento = this.caretaker.getLatestMemento(unitId);
    if (!latestMemento) {
      return false;
    }

    return this.restoreToMemento(unitId, latestMemento);
  }

  /**
   * Undo the last operation for a unit
   */
  public undo(unitId: string): boolean {
    const undone = this.caretaker.undo(unitId);
    if (undone) {
      this.mementoStatistics.totalMementosRestored++;
      this.updateMementoStatistics();
    }
    return undone;
  }

  /**
   * Redo the last undone operation for a unit
   */
  public redo(unitId: string): boolean {
    const redone = this.caretaker.redo(unitId);
    if (redone) {
      this.mementoStatistics.totalMementosRestored++;
      this.updateMementoStatistics();
    }
    return redone;
  }

  /**
   * Check if undo is available for a unit
   */
  public canUndo(unitId: string): boolean {
    return this.caretaker.canUndo(unitId);
  }

  /**
   * Check if redo is available for a unit
   */
  public canRedo(unitId: string): boolean {
    return this.caretaker.canRedo(unitId);
  }

  /**
   * Get all mementos for a unit
   */
  public getMementos(unitId: string): IUnitMemento[] {
    return this.caretaker.getMementos(unitId);
  }

  /**
   * Get the latest memento for a unit
   */
  public getLatestMemento(unitId: string): IUnitMemento | undefined {
    return this.caretaker.getLatestMemento(unitId);
  }

  /**
   * Get memento by index for a unit
   */
  public getMementoByIndex(unitId: string, index: number): IUnitMemento | undefined {
    return this.caretaker.getMementoByIndex(unitId, index);
  }


  /**
   * Clear all mementos
   */
  public clearAllMementos(): void {
    this.caretaker.clearAllMementos();
    this.mementoStatistics = {
      totalMementosCreated: 0,
      totalMementosRestored: 0,
      totalAutoSaves: 0,
      totalManualSaves: 0,
      averageMementoSize: 0,
      memoryUsage: 0,
    };
  }

  /**
   * Get memento count for a unit
   */
  public getMementoCount(unitId: string): number;
  public getMementoCount(): number;
  public getMementoCount(unitId?: string): number {
    if (unitId) {
      return this.caretaker.getMementoCount(unitId);
    }
    return this.caretaker.getAllMementos().length;
  }

  /**
   * Store a memento
   */
  public storeMemento(memento: IUnitMemento): void {
    this.caretaker.addMemento(memento);
    this.mementoStatistics.totalManualSaves++;
  }

  /**
   * Check if a memento exists
   */
  public hasMemento(unitId: string): boolean {
    return this.caretaker.getMementoCount(unitId) > 0;
  }

  /**
   * Get a specific memento by unit ID
   */
  public getMemento(unitId: string): IUnitMemento | undefined {
    const mementos = this.caretaker.getMementos(unitId);
    return mementos.length > 0 ? mementos[0] : undefined;
  }

  /**
   * Get all mementos
   */
  public getAllMementos(): IUnitMemento[] {
    return this.caretaker.getAllMementos();
  }

  /**
   * Update a memento
   */
  public updateMemento(memento: IUnitMemento): void {
    this.caretaker.updateMemento(memento);
  }

  /**
   * Delete a memento
   */
  public deleteMemento(unitId: string): void {
    this.caretaker.removeMemento(unitId);
  }

  /**
   * Clear all mementos
   */
  public clearMementos(): void {
    this.caretaker.clearAllMementos();
  }

  /**
   * Find mementos by criteria
   */
  public findMementosByCriteria(criteria: any): IUnitMemento[] {
    return this.caretaker.findMementosByCriteria(criteria);
  }

  /**
   * Get statistics
   */
  public getStatistics(): any {
    return this.mementoStatistics;
  }

  /**
   * Get total memento count
   */
  public getTotalMementoCount(): number {
    return this.caretaker.getTotalMementoCount();
  }

  /**
   * Get memento statistics
   */
  public getMementoStatistics() {
    return { ...this.mementoStatistics };
  }

  /**
   * Get caretaker statistics
   */
  public getCaretakerStatistics() {
    return this.caretaker.getCaretakerStatistics();
  }

  /**
   * Set significant change thresholds
   */
  public setSignificantChangeThresholds(thresholds: {
    timeThreshold?: number;
    resultThreshold?: number;
  }): void {
    if (thresholds.timeThreshold !== undefined) {
      this.significantChangeThresholds.timeThreshold = Math.max(0, thresholds.timeThreshold);
    }
    if (thresholds.resultThreshold !== undefined) {
      this.significantChangeThresholds.resultThreshold = Math.max(0, thresholds.resultThreshold);
    }
  }

  /**
   * Get significant change thresholds
   */
  public getSignificantChangeThresholds() {
    return { ...this.significantChangeThresholds };
  }

  /**
   * Get memory usage
   */
  public getMemoryUsage(): number {
    return this.mementoStatistics.memoryUsage;
  }

  /**
   * Update memento statistics
   */
  private updateMementoStatistics(): void {
    const caretakerStats = this.caretaker.getCaretakerStatistics();
    this.mementoStatistics.memoryUsage = caretakerStats.memoryUsage;
    this.mementoStatistics.averageMementoSize = caretakerStats.totalMementos > 0 
      ? caretakerStats.memoryUsage / caretakerStats.totalMementos 
      : 0;
  }
}