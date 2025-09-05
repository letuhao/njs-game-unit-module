import type { IUnitMementoCaretaker, IUnitMemento } from './IUnitMemento';
import { UnitMemento } from './IUnitMemento';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Unit Memento Caretaker Implementation
 * Manages memento storage, retrieval, and restoration
 * Provides advanced features like history management and undo/redo
 * 
 * Note: This class focuses solely on memento management logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class UnitMementoCaretaker implements IUnitMementoCaretaker {
  private mementos: Map<string, IUnitMemento[]> = new Map();
  private maxMementosPerUnit: number = 50;
  private maxTotalMementos: number = 1000;
  private undoStack: Map<string, IUnitMemento[]> = new Map();
  private redoStack: Map<string, IUnitMemento[]> = new Map();
  private caretakerStatistics = {
    totalMementos: 0,
    totalUndos: 0,
    totalRedos: 0,
    averageMementosPerUnit: 0,
    memoryUsage: 0,
  };

  /**
   * Save a memento for a unit
   */
  public saveMemento(memento: IUnitMemento): void {
    const unitId = memento.getUnitId();

    if (!this.mementos.has(unitId)) {
      this.mementos.set(unitId, []);
    }

    const unitMementos = this.mementos.get(unitId)!;

    // Check if we need to remove old mementos
    if (unitMementos.length >= this.maxMementosPerUnit) {
      unitMementos.shift(); // Remove oldest memento
    }

    // Add new memento
    unitMementos.push(memento);
    this.caretakerStatistics.totalMementos++;

    // Check total memento limit
    this.enforceTotalMementoLimit();

    // Update statistics
    this.updateCaretakerStatistics();
  }

  /**
   * Get the latest memento for a unit
   */
  public getLatestMemento(unitId: string): IUnitMemento | undefined {
    const unitMementos = this.mementos.get(unitId);
    if (!unitMementos || unitMementos.length === 0) {
      return undefined;
    }

    return unitMementos[unitMementos.length - 1];
  }

  /**
   * Get all mementos for a unit
   */
  public getMementos(unitId: string): IUnitMemento[] {
    return this.mementos.get(unitId) || [];
  }

  /**
   * Get memento by index for a unit
   */
  public getMementoByIndex(unitId: string, index: number): IUnitMemento | undefined {
    const unitMementos = this.mementos.get(unitId);
    if (!unitMementos || index < 0 || index >= unitMementos.length) {
      return undefined;
    }

    return unitMementos[index];
  }

  /**
   * Restore a unit to a specific memento
   */
  public restoreToMemento(unitId: string, memento: IUnitMemento): boolean {
    try {
      // Save current state to undo stack
      const currentMemento = this.getLatestMemento(unitId);
      if (currentMemento) {
        this.addToUndoStack(unitId, currentMemento);
      }

      // Restore to the specified memento
      const restored = memento.restore();
      if (restored) {
        // Add to redo stack
        this.addToRedoStack(unitId, memento);
        this.caretakerStatistics.totalUndos++;
      }

      return restored;
    } catch (error) {
      return false;
    }
  }

  /**
   * Undo the last operation for a unit
   */
  public undo(unitId: string): boolean {
    const undoStack = this.undoStack.get(unitId);
    if (!undoStack || undoStack.length === 0) {
      return false;
    }

    try {
      const memento = undoStack.pop()!;
      const restored = memento.restore();
      
      if (restored) {
        // Move to redo stack
        this.addToRedoStack(unitId, memento);
        this.caretakerStatistics.totalUndos++;
      }

      return restored;
    } catch (error) {
      return false;
    }
  }

  /**
   * Redo the last undone operation for a unit
   */
  public redo(unitId: string): boolean {
    const redoStack = this.redoStack.get(unitId);
    if (!redoStack || redoStack.length === 0) {
      return false;
    }

    try {
      const memento = redoStack.pop()!;
      const restored = memento.restore();
      
      if (restored) {
        // Move back to undo stack
        this.addToUndoStack(unitId, memento);
        this.caretakerStatistics.totalRedos++;
      }

      return restored;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if undo is available for a unit
   */
  public canUndo(unitId: string): boolean {
    const undoStack = this.undoStack.get(unitId);
    return undoStack && undoStack.length > 0;
  }

  /**
   * Check if redo is available for a unit
   */
  public canRedo(unitId: string): boolean {
    const redoStack = this.redoStack.get(unitId);
    return redoStack && redoStack.length > 0;
  }

  /**
   * Clear all mementos for a unit
   */
  public clearMementos(unitId: string): void {
    this.mementos.delete(unitId);
    this.undoStack.delete(unitId);
    this.redoStack.delete(unitId);
    this.updateCaretakerStatistics();
  }

  /**
   * Clear all mementos
   */
  public clearAllMementos(): void {
    this.mementos.clear();
    this.undoStack.clear();
    this.redoStack.clear();
    this.caretakerStatistics = {
      totalMementos: 0,
      totalUndos: 0,
      totalRedos: 0,
      averageMementosPerUnit: 0,
      memoryUsage: 0,
    };
  }

  /**
   * Get memento count for a unit
   */
  public getMementoCount(unitId: string): number {
    const unitMementos = this.mementos.get(unitId);
    return unitMementos ? unitMementos.length : 0;
  }

  /**
   * Get total memento count
   */
  public getTotalMementoCount(): number {
    return this.caretakerStatistics.totalMementos;
  }

  /**
   * Get caretaker statistics
   */
  public getCaretakerStatistics() {
    return { ...this.caretakerStatistics };
  }

  /**
   * Set maximum mementos per unit
   */
  public setMaxMementosPerUnit(max: number): void {
    this.maxMementosPerUnit = Math.max(1, max);
  }

  /**
   * Set maximum total mementos
   */
  public setMaxTotalMementos(max: number): void {
    this.maxTotalMementos = Math.max(1, max);
  }

  /**
   * Get memory usage estimate
   */
  public getMemoryUsage(): number {
    return this.caretakerStatistics.memoryUsage;
  }

  /**
   * Add memento to undo stack
   */
  private addToUndoStack(unitId: string, memento: IUnitMemento): void {
    if (!this.undoStack.has(unitId)) {
      this.undoStack.set(unitId, []);
    }

    const undoStack = this.undoStack.get(unitId)!;
    undoStack.push(memento);

    // Limit undo stack size
    if (undoStack.length > this.maxMementosPerUnit) {
      undoStack.shift();
    }
  }

  /**
   * Add memento to redo stack
   */
  private addToRedoStack(unitId: string, memento: IUnitMemento): void {
    if (!this.redoStack.has(unitId)) {
      this.redoStack.set(unitId, []);
    }

    const redoStack = this.redoStack.get(unitId)!;
    redoStack.push(memento);

    // Limit redo stack size
    if (redoStack.length > this.maxMementosPerUnit) {
      redoStack.shift();
    }
  }

  /**
   * Enforce total memento limit
   */
  private enforceTotalMementoLimit(): void {
    if (this.caretakerStatistics.totalMementos <= this.maxTotalMementos) {
      return;
    }

    // Remove oldest mementos from all units
    const unitsToProcess = Array.from(this.mementos.keys());
    let removedCount = 0;

    for (const unitId of unitsToProcess) {
      const unitMementos = this.mementos.get(unitId)!;
      
      while (unitMementos.length > 0 && this.caretakerStatistics.totalMementos - removedCount > this.maxTotalMementos) {
        unitMementos.shift();
        removedCount++;
      }

      if (unitMementos.length === 0) {
        this.mementos.delete(unitId);
      }
    }

    this.caretakerStatistics.totalMementos -= removedCount;
  }

  /**
   * Update caretaker statistics
   */
  private updateCaretakerStatistics(): void {
    const totalUnits = this.mementos.size;
    this.caretakerStatistics.averageMementosPerUnit = totalUnits > 0 
      ? this.caretakerStatistics.totalMementos / totalUnits 
      : 0;

    // Estimate memory usage (rough calculation)
    this.caretakerStatistics.memoryUsage = this.caretakerStatistics.totalMementos * 1024; // 1KB per memento estimate
  }
}