import type { IStrategyComposer } from './IStrategyComposer';
import type { UnitContext } from '../../interfaces/IUnit';
import { SizeUnit } from '../../enums/SizeUnit';
import { SizeValue } from '../../enums/SizeValue';
import { Dimension } from '../../enums/Dimension';

/**
 * Weighted Average Strategy Composer
 * Combines multiple strategies using weighted averaging
 * 
 * Note: This class focuses solely on strategy composition logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class WeightedAverageSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'weighted-average-size-composer';
  readonly description = 'Combines multiple size strategies using weighted averaging';
  readonly priority = 1;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private successfulExecutions = 0;
  private composerStatistics = {
    totalCompositions: 0,
    successfulCompositions: 0,
    failedCompositions: 0,
    averageCompositionTime: 0,
    totalCompositionTime: 0,
    compositionsByType: {} as Record<string, number>,
  };

  public canCompose(_value: SizeValue, _unit: SizeUnit): boolean {
    // Can compose when we have multiple strategies that can handle the same value
    return true; // Always return true for weighted averaging
  }

  public compose(
    value: SizeValue,
    unit: SizeUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number; result: number }>
  ): number {
    const startTime = performance.now();
    this.totalExecutions++;

    try {
      if (strategies.length === 0) {
        throw new Error('No strategies provided for composition');
      }

      // Filter out strategies with invalid results
      const validStrategies = strategies.filter(s => 
        s.strategy && 
        typeof s.weight === 'number' && 
        !isNaN(s.weight) && 
        typeof s.result === 'number' && 
        !isNaN(s.result)
      );

      if (validStrategies.length === 0) {
        throw new Error('No valid strategies found for composition');
      }

      // Calculate weighted average
      const totalWeight = validStrategies.reduce((sum, s) => sum + s.weight, 0);
      const weightedSum = validStrategies.reduce((sum, s) => sum + (s.result * s.weight), 0);
      
      const result = totalWeight > 0 ? weightedSum / totalWeight : validStrategies[0].result;
      
      this.successfulExecutions++;
      this.updateStatistics(true, performance.now() - startTime, 'weighted-average');
      
      return result;
    } catch (error) {
      this.updateStatistics(false, performance.now() - startTime, 'weighted-average');
      throw new Error(`Weighted average composition failed: ${error}`);
    }
  }

  /**
   * Get composer statistics
   */
  public getComposerStatistics() {
    return { ...this.composerStatistics };
  }

  /**
   * Reset composer statistics
   */
  public resetStatistics(): void {
    this.executionTimes = [];
    this.totalExecutions = 0;
    this.successfulExecutions = 0;
    this.composerStatistics = {
      totalCompositions: 0,
      successfulCompositions: 0,
      failedCompositions: 0,
      averageCompositionTime: 0,
      totalCompositionTime: 0,
      compositionsByType: {},
    };
  }

  /**
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.totalExecutions === 0) return 1;
    return this.successfulExecutions / this.totalExecutions;
  }

  /**
   * Update statistics
   */
  private updateStatistics(success: boolean, duration: number, type: string): void {
    this.composerStatistics.totalCompositions++;
    this.composerStatistics.totalCompositionTime += duration;
    this.composerStatistics.averageCompositionTime = 
      this.composerStatistics.totalCompositionTime / this.composerStatistics.totalCompositions;
    
    this.composerStatistics.compositionsByType[type] = 
      (this.composerStatistics.compositionsByType[type] || 0) + 1;
    
    if (success) {
      this.composerStatistics.successfulCompositions++;
    } else {
      this.composerStatistics.failedCompositions++;
    }
  }
}

/**
 * Priority-based Strategy Composer
 * Selects the highest priority strategy that can handle the input
 * 
 * Note: This class focuses solely on strategy composition logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class PriorityBasedSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'priority-based-size-composer';
  readonly description = 'Selects the highest priority strategy that can handle the input';
  readonly priority = 2;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private successfulExecutions = 0;
  private composerStatistics = {
    totalCompositions: 0,
    successfulCompositions: 0,
    failedCompositions: 0,
    averageCompositionTime: 0,
    totalCompositionTime: 0,
    compositionsByType: {} as Record<string, number>,
  };

  public canCompose(_value: SizeValue, _unit: SizeUnit): boolean {
    return true; // Always return true for priority-based selection
  }

  public compose(
    value: SizeValue,
    unit: SizeUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number; result: number }>
  ): number {
    const startTime = performance.now();
    this.totalExecutions++;

    try {
      if (strategies.length === 0) {
        throw new Error('No strategies provided for composition');
      }

      // Sort strategies by priority (assuming strategy has getPriority method)
      const sortedStrategies = strategies
        .filter(s => s.strategy && typeof s.result === 'number' && !isNaN(s.result))
        .sort((a, b) => {
          const priorityA = typeof a.strategy.getPriority === 'function' ? a.strategy.getPriority() : 0;
          const priorityB = typeof b.strategy.getPriority === 'function' ? b.strategy.getPriority() : 0;
          return priorityB - priorityA; // Higher priority first
        });

      if (sortedStrategies.length === 0) {
        throw new Error('No valid strategies found for composition');
      }

      // Return result from highest priority strategy
      const result = sortedStrategies[0].result;
      
      this.successfulExecutions++;
      this.updateStatistics(true, performance.now() - startTime, 'priority-based');
      
      return result;
    } catch (error) {
      this.updateStatistics(false, performance.now() - startTime, 'priority-based');
      throw new Error(`Priority-based composition failed: ${error}`);
    }
  }

  /**
   * Get composer statistics
   */
  public getComposerStatistics() {
    return { ...this.composerStatistics };
  }

  /**
   * Reset composer statistics
   */
  public resetStatistics(): void {
    this.executionTimes = [];
    this.totalExecutions = 0;
    this.successfulExecutions = 0;
    this.composerStatistics = {
      totalCompositions: 0,
      successfulCompositions: 0,
      failedCompositions: 0,
      averageCompositionTime: 0,
      totalCompositionTime: 0,
      compositionsByType: {},
    };
  }

  /**
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.totalExecutions === 0) return 1;
    return this.successfulExecutions / this.totalExecutions;
  }

  /**
   * Update statistics
   */
  private updateStatistics(success: boolean, duration: number, type: string): void {
    this.composerStatistics.totalCompositions++;
    this.composerStatistics.totalCompositionTime += duration;
    this.composerStatistics.averageCompositionTime = 
      this.composerStatistics.totalCompositionTime / this.composerStatistics.totalCompositions;
    
    this.composerStatistics.compositionsByType[type] = 
      (this.composerStatistics.compositionsByType[type] || 0) + 1;
    
    if (success) {
      this.composerStatistics.successfulCompositions++;
    } else {
      this.composerStatistics.failedCompositions++;
    }
  }
}

/**
 * Fallback Strategy Composer
 * Uses fallback strategies when primary strategies fail
 * 
 * Note: This class focuses solely on strategy composition logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class FallbackSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'fallback-size-composer';
  readonly description = 'Uses fallback strategies when primary strategies fail';
  readonly priority = 3;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private successfulExecutions = 0;
  private composerStatistics = {
    totalCompositions: 0,
    successfulCompositions: 0,
    failedCompositions: 0,
    averageCompositionTime: 0,
    totalCompositionTime: 0,
    compositionsByType: {} as Record<string, number>,
  };

  public canCompose(_value: SizeValue, _unit: SizeUnit): boolean {
    return true; // Always return true for fallback composition
  }

  public compose(
    value: SizeValue,
    unit: SizeUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number; result: number }>
  ): number {
    const startTime = performance.now();
    this.totalExecutions++;

    try {
      if (strategies.length === 0) {
        throw new Error('No strategies provided for composition');
      }

      // Try strategies in order until one succeeds
      for (const strategyInfo of strategies) {
        if (strategyInfo.strategy && 
            typeof strategyInfo.result === 'number' && 
            !isNaN(strategyInfo.result)) {
          
          this.successfulExecutions++;
          this.updateStatistics(true, performance.now() - startTime, 'fallback');
          
          return strategyInfo.result;
        }
      }

      throw new Error('No valid strategies found for fallback composition');
    } catch (error) {
      this.updateStatistics(false, performance.now() - startTime, 'fallback');
      throw new Error(`Fallback composition failed: ${error}`);
    }
  }

  /**
   * Get composer statistics
   */
  public getComposerStatistics() {
    return { ...this.composerStatistics };
  }

  /**
   * Reset composer statistics
   */
  public resetStatistics(): void {
    this.executionTimes = [];
    this.totalExecutions = 0;
    this.successfulExecutions = 0;
    this.composerStatistics = {
      totalCompositions: 0,
      successfulCompositions: 0,
      failedCompositions: 0,
      averageCompositionTime: 0,
      totalCompositionTime: 0,
      compositionsByType: {},
    };
  }

  /**
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.totalExecutions === 0) return 1;
    return this.successfulExecutions / this.totalExecutions;
  }

  /**
   * Update statistics
   */
  private updateStatistics(success: boolean, duration: number, type: string): void {
    this.composerStatistics.totalCompositions++;
    this.composerStatistics.totalCompositionTime += duration;
    this.composerStatistics.averageCompositionTime = 
      this.composerStatistics.totalCompositionTime / this.composerStatistics.totalCompositions;
    
    this.composerStatistics.compositionsByType[type] = 
      (this.composerStatistics.compositionsByType[type] || 0) + 1;
    
    if (success) {
      this.composerStatistics.successfulCompositions++;
    } else {
      this.composerStatistics.failedCompositions++;
    }
  }
}