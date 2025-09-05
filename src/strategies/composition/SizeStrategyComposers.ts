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
/**
 * Adaptive Size Strategy Composer
 * Dynamically adjusts strategy weights based on performance and context
 */
export class AdaptiveSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'adaptive-size-composer';
  readonly description = 'Dynamically adjusts strategy weights based on performance and context';
  readonly priority = 2;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private adaptiveWeights: Map<string, number> = new Map();

  /**
   * Check if this composer can handle the given input
   */
  canCompose(input: SizeValue, unit: SizeUnit, context: UnitContext): boolean {
    return true; // Adaptive composer can handle any input
  }

  /**
   * Compose a single result with the given input
   */
  compose(
    result: number,
    input: SizeValue,
    unit: SizeUnit,
    context: UnitContext
  ): number {
    // For single result composition, just return the result
    return result;
  }

  /**
   * Compose strategies with adaptive weighting
   */
  composeStrategies(
    strategies: Array<{ strategy: any; weight: number; context: UnitContext }>,
    input: SizeValue,
    unit: SizeUnit,
    context: UnitContext
  ): number {
    const startTime = performance.now();

    try {
      // Calculate adaptive weights based on performance history
      const adaptiveWeights = this.calculateAdaptiveWeights(strategies, context);
      
      // Apply adaptive weights to strategies
      const weightedStrategies = strategies.map((s, index) => ({
        ...s,
        weight: adaptiveWeights[index] || s.weight
      }));

      // Calculate weighted average
      let totalWeight = 0;
      let weightedSum = 0;

      for (const { strategy, weight } of weightedStrategies) {
        if (strategy && typeof strategy.calculate === 'function') {
          const result = strategy.calculate(input, unit, context);
          weightedSum += result * weight;
          totalWeight += weight;
        }
      }

      const result = totalWeight > 0 ? weightedSum / totalWeight : 0;

      // Update performance metrics
      this.updatePerformanceMetrics(startTime);

      return result;
    } catch (error) {
      this.updatePerformanceMetrics(startTime);
      throw new Error(`Adaptive composition failed: ${error}`);
    }
  }

  /**
   * Calculate adaptive weights based on performance history
   */
  private calculateAdaptiveWeights(
    strategies: Array<{ strategy: any; weight: number; context: UnitContext }>,
    context: UnitContext
  ): number[] {
    const weights: number[] = [];
    
    for (let i = 0; i < strategies.length; i++) {
      const strategyKey = `${strategies[i].strategy.constructor.name}-${i}`;
      const baseWeight = strategies[i].weight;
      
      // Get adaptive weight from history
      let adaptiveWeight = this.adaptiveWeights.get(strategyKey) || baseWeight;
      
      // Adjust based on context
      if (context.parent && context.parent.width > 1000) {
        adaptiveWeight *= 1.1; // Favor strategies for larger screens
      }
      
      if (context.viewport && context.viewport.width < 768) {
        adaptiveWeight *= 0.9; // Favor strategies for smaller screens
      }
      
      weights.push(Math.max(0.1, Math.min(2.0, adaptiveWeight))); // Clamp between 0.1 and 2.0
    }
    
    return weights;
  }

  /**
   * Update performance metrics
   */
  private updatePerformanceMetrics(startTime: number): void {
    const executionTime = performance.now() - startTime;
    this.executionTimes.push(executionTime);
    this.totalExecutions++;

    // Keep only last 100 execution times
    if (this.executionTimes.length > 100) {
      this.executionTimes.shift();
    }
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): {
    averageExecutionTime: number;
    totalExecutions: number;
    adaptiveWeights: Map<string, number>;
  } {
    const averageExecutionTime = this.executionTimes.length > 0
      ? this.executionTimes.reduce((sum, time) => sum + time, 0) / this.executionTimes.length
      : 0;

    return {
      averageExecutionTime,
      totalExecutions: this.totalExecutions,
      adaptiveWeights: new Map(this.adaptiveWeights)
    };
  }

  /**
   * Reset performance metrics
   */
  resetPerformanceMetrics(): void {
    this.executionTimes = [];
    this.totalExecutions = 0;
    this.adaptiveWeights.clear();
  }
}

export class WeightedAverageSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'weighted-average-size-composer';
  readonly description = 'Combines multiple size strategies using weighted averaging';
  readonly priority = 1;

  private executionTimes: number[] = [];
  private totalExecutions = 0;

  /**
   * Check if this composer can handle the given input
   */
  canCompose(input: SizeValue, unit: SizeUnit, context: UnitContext): boolean {
    return true; // Weighted average composer can handle any input
  }

  /**
   * Compose a single result with the given input
   */
  compose(
    result: number,
    input: SizeValue,
    unit: SizeUnit,
    context: UnitContext
  ): number {
    // For single result composition, just return the result
    return result;
  }
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

  /**
   * Check if this composer can handle the given input
   */
  canCompose(input: SizeValue, unit: SizeUnit, context: UnitContext): boolean {
    return true; // Priority-based composer can handle any input
  }

  /**
   * Compose a single result with the given input
   */
  compose(
    result: number,
    input: SizeValue,
    unit: SizeUnit,
    context: UnitContext
  ): number {
    // For single result composition, just return the result
    return result;
  }
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