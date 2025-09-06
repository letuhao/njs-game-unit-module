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
   * Check if undo is available for a unit
   */
  public canUndo(unitId: string): boolean {
    const undoStack = this.undoStack.get(unitId);
    return !!(undoStack && undoStack.length > 0);
  }

  /**
   * Check if redo is available for a unit
   */
  public canRedo(unitId: string): boolean {
    const redoStack = this.redoStack.get(unitId);
    return !!(redoStack && redoStack.length > 0);
  }

  /**
   * Clear all mementos
   */
  public clearMementos(): void {
    this.mementos.clear();
    this.undoStack.clear();
    this.redoStack.clear();
    this.updateCaretakerStatistics();
  }

  /**
   * Get a memento by unit ID
   * @param unitId - The unit ID
   * @returns The memento or undefined if not found
   */
  public getMemento(unitId: string): IUnitMemento | undefined {
    const unitMementos = this.mementos.get(unitId);
    return unitMementos && unitMementos.length > 0 ? unitMementos[unitMementos.length - 1] : undefined;
  }

  /**
   * Get the latest memento for a unit
   * @param unitId - The unit ID
   * @returns The latest memento or undefined if not found
   */
  public getLatestMemento(unitId: string): IUnitMemento | undefined {
    return this.getMemento(unitId);
  }

  /**
   * Remove a memento
   * @param unitId - The unit ID
   * @returns True if removed, false otherwise
   */
  public removeMemento(unitId: string): boolean {
    const hadMementos = this.mementos.has(unitId);
    this.mementos.delete(unitId);
    this.undoStack.delete(unitId);
    this.redoStack.delete(unitId);
    this.updateCaretakerStatistics();
    return hadMementos;
  }

  /**
   * Get all mementos
   * @returns Array of all mementos
   */
  public getAllMementos(): IUnitMemento[] {
    const allMementos: IUnitMemento[] = [];
    for (const mementos of this.mementos.values()) {
      allMementos.push(...mementos);
    }
    return allMementos;
  }

  /**
   * Restore to a specific memento
   * @param unitId - The unit ID
   * @param memento - The memento to restore to
   * @returns The restored state
   */
  public restoreToMemento(unitId: string, memento: IUnitMemento): any {
    return memento.restore();
  }

  /**
   * Undo the last operation for a unit
   * @param unitId - The unit ID
   * @returns The undone state or undefined if no undo available
   */
  public undo(unitId: string): any | undefined {
    const undoStack = this.undoStack.get(unitId);
    if (!undoStack || undoStack.length === 0) {
      return undefined;
    }

    const memento = undoStack.pop();
    if (memento) {
      // Move to redo stack
      const redoStack = this.redoStack.get(unitId) || [];
      redoStack.push(memento);
      this.redoStack.set(unitId, redoStack);

      this.caretakerStatistics.totalUndos++;
      this.updateCaretakerStatistics();

      return memento.restore();
    }

    return undefined;
  }

  /**
   * Redo the last undone operation for a unit
   * @param unitId - The unit ID
   * @returns The redone state or undefined if no redo available
   */
  public redo(unitId: string): any | undefined {
    const redoStack = this.redoStack.get(unitId);
    if (!redoStack || redoStack.length === 0) {
      return undefined;
    }

    const memento = redoStack.pop();
    if (memento) {
      // Move back to undo stack
      const undoStack = this.undoStack.get(unitId) || [];
      undoStack.push(memento);
      this.undoStack.set(unitId, undoStack);

      this.caretakerStatistics.totalRedos++;
      this.updateCaretakerStatistics();

      return memento.restore();
    }

    return undefined;
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
   * Add a memento
   * @param memento - The memento to add
   */
  public addMemento(memento: IUnitMemento): void {
    this.saveMemento(memento);
  }

  /**
   * Update a memento
   * @param memento - The memento to update
   */
  public updateMemento(memento: IUnitMemento): void {
    this.saveMemento(memento);
  }

  /**
   * Find mementos by criteria
   * @param criteria - The search criteria
   * @returns Array of matching mementos
   */
  public findMementosByCriteria(criteria: any): IUnitMemento[] {
    const allMementos = this.getAllMementos();
    return allMementos.filter(memento => {
      // Simple criteria matching - can be enhanced based on specific needs
      if (criteria.unitId && memento.unitId !== criteria.unitId) {
        return false;
      }
      if (criteria.unitType && memento.unitType !== criteria.unitType) {
        return false;
      }
      if (criteria.strategyName && memento.strategyName !== criteria.strategyName) {
        return false;
      }
      return true;
    });
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