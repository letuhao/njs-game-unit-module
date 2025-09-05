import type { IUnit } from '../interfaces/IUnit';
import type { IUnitConfig, IUnitResult, IUnitUpdateResult, IUnitDeleteResult, IUnitCalculationResult, IUnitValidationResult } from '../interfaces/IUnitConfig';
import type { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import { CommandManager, ICommandManager } from './CommandManager';
import { ObserverManager, IObserverManager } from './ObserverManager';
import { PerformanceManager, IPerformanceManager } from './PerformanceManager';
import { StrategyManager, IStrategyManager } from './StrategyManager';
import { UnitRegistryManager, IUnitRegistryManager } from './UnitRegistryManager';
import { ValidationManager, IValidationManager } from './ValidationManager';

/**
 * Unit System Manager
 * Orchestrates all unit system components using focused managers
 * Follows Single Responsibility Principle - only coordinates between managers
 * 
 * Note: This class focuses solely on system coordination logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export interface IUnitSystemManager {
  // System lifecycle
  initialize(): void;
  shutdown(): void;
  getSystemStatus(): {
    initialized: boolean;
    statistics: {
      totalUnits: number;
      totalStrategies: number;
      totalObservers: number;
      validationErrors: number;
    };
  };

  // Performance and monitoring
  getPerformanceMetrics(): {
    totalCalculations: number;
    averageCalculationTime: number;
    memoryUsage: number;
    errorRate: number;
  };

  // Configuration
  getConfiguration(): SystemConfiguration;
  updateConfiguration(config: Partial<SystemConfiguration>): void;

  // System health
  getSystemHealth(): SystemHealth;
  performHealthCheck(): HealthCheckResult;
}

/**
 * System configuration interface
 */
export interface SystemConfiguration {
  maxUnits: number;
  maxStrategies: number;
  maxObservers: number;
  performanceMonitoring: boolean;
  validationEnabled: boolean;
  memoryLimit: number;
}

/**
 * System health interface
 */
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  score: number;
  issues: string[];
  recommendations: string[];
}

/**
 * Health check result interface
 */
export interface HealthCheckResult {
  passed: boolean;
  checks: Array<{
    name: string;
    passed: boolean;
    message: string;
  }>;
  overallScore: number;
}

/**
 * Unit System Manager Implementation
 * Orchestrates all unit system components
 */
export class UnitSystemManager implements IUnitSystemManager {
  private isInitialized: boolean = false;
  private configuration: SystemConfiguration = {
    maxUnits: 1000,
    maxStrategies: 100,
    maxObservers: 50,
    performanceMonitoring: true,
    validationEnabled: true,
    memoryLimit: 100 * 1024 * 1024, // 100MB
  };

  // Focused managers
  private commandManager: ICommandManager;
  private observerManager: IObserverManager;
  private performanceManager: IPerformanceManager;
  private strategyManager: IStrategyManager;
  private unitRegistryManager: IUnitRegistryManager;
  private validationManager: IValidationManager;

  constructor() {
    this.commandManager = new CommandManager();
    this.observerManager = new ObserverManager();
    this.performanceManager = new PerformanceManager();
    this.strategyManager = new StrategyManager();
    this.unitRegistryManager = new UnitRegistryManager();
    this.validationManager = new ValidationManager();
  }

  /**
   * Initialize the unit system
   */
  public initialize(): void {
    if (this.isInitialized) {
      return;
    }

    try {
      // Initialize performance monitoring
      if (this.configuration.performanceMonitoring) {
        this.performanceManager.setMemoryLimit(this.configuration.memoryLimit);
      }

      this.isInitialized = true;
    } catch (error) {
      this.isInitialized = false;
      throw new Error(`Failed to initialize unit system: ${error}`);
    }
  }

  /**
   * Shutdown the unit system
   */
  public shutdown(): void {
    if (!this.isInitialized) {
      return;
    }

    try {
      // Clear all managers
      this.commandManager.clearCommandHistory();
      this.observerManager.clearObservers();
      this.performanceManager.resetPerformanceMetrics();
      this.strategyManager.clearStrategies();
      this.unitRegistryManager.clearUnits();
      this.validationManager.clearValidators();

      this.isInitialized = false;
    } catch (error) {
      // Continue shutdown even if some operations fail
    }
  }

  /**
   * Get system status
   */
  public getSystemStatus() {
    return {
      initialized: this.isInitialized,
      statistics: {
        totalUnits: this.unitRegistryManager.getUnitCount(),
        totalStrategies: this.strategyManager.getStrategyCount(),
        totalObservers: this.observerManager.getObserverCount(),
        validationErrors: this.validationManager.getErrorCount(),
      },
    };
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics() {
    const performanceMetrics = this.performanceManager.getPerformanceMetrics();
    return {
      totalCalculations: performanceMetrics.totalOperations,
      averageCalculationTime: performanceMetrics.averageExecutionTime,
      memoryUsage: performanceMetrics.memoryUsage,
      errorRate: performanceMetrics.errorRate,
    };
  }

  /**
   * Get system configuration
   */
  public getConfiguration(): SystemConfiguration {
    return { ...this.configuration };
  }

  /**
   * Create a new unit
   */
  public createUnit(config: IUnitConfig): IUnitResult {
    try {
      if (!this.isInitialized) {
        return {
          success: false,
          error: 'Unit system not initialized',
        };
      }

      // Validate configuration
      const validationResult = this.validationManager.validateUnitConfig(config);
      if (!validationResult.isValid) {
        return {
          success: false,
          error: `Invalid unit configuration: ${validationResult.errors?.join(', ')}`,
        };
      }

      // Create unit using appropriate factory
      const unit = this.createUnitFromConfig(config);
      if (!unit) {
        return {
          success: false,
          error: 'Failed to create unit',
        };
      }

      // Register unit
      this.unitRegistryManager.registerUnit(unit);

      return {
        success: true,
        unit,
        metadata: {
          unitId: unit.id,
          unitType: unit.unitType,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create unit: ${error}`,
      };
    }
  }

  /**
   * Get a unit by ID
   */
  public getUnit(id: string): IUnit | undefined {
    try {
      return this.unitRegistryManager.getUnit(id);
    } catch (error) {
      return undefined;
    }
  }

  /**
   * Get all units
   */
  public getAllUnits(): IUnit[] {
    try {
      return this.unitRegistryManager.getAllUnits();
    } catch (error) {
      return [];
    }
  }

  /**
   * Update a unit
   */
  public updateUnit(id: string, config: IUnitConfig): IUnitUpdateResult {
    try {
      const existingUnit = this.getUnit(id);
      if (!existingUnit) {
        return {
          success: false,
          error: 'Unit not found',
        };
      }

      // Validate new configuration
      const validationResult = this.validationManager.validateUnitConfig(config);
      if (!validationResult.isValid) {
        return {
          success: false,
          error: `Invalid unit configuration: ${validationResult.errors?.join(', ')}`,
        };
      }

      // Create updated unit
      const updatedUnit = this.createUnitFromConfig(config);
      if (!updatedUnit) {
        return {
          success: false,
          error: 'Failed to create updated unit',
        };
      }

      // Update in registry
      this.unitRegistryManager.updateUnit(id, updatedUnit);

      return {
        success: true,
        unit: updatedUnit,
        previousUnit: existingUnit,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to update unit: ${error}`,
      };
    }
  }

  /**
   * Delete a unit
   */
  public deleteUnit(id: string): IUnitDeleteResult {
    try {
      const existingUnit = this.getUnit(id);
      if (!existingUnit) {
        return {
          success: false,
          error: 'Unit not found',
        };
      }

      // Remove from registry
      this.unitRegistryManager.unregisterUnit(id);

      return {
        success: true,
        deletedUnitId: id,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to delete unit: ${error}`,
      };
    }
  }

  /**
   * Calculate unit value
   */
  public calculateUnit(id: string, context: UnitContext): IUnitCalculationResult {
    try {
      const unit = this.getUnit(id);
      if (!unit) {
        return {
          success: false,
          error: 'Unit not found',
        };
      }

      const startTime = performance.now();
      const result = unit.calculate(context);
      const endTime = performance.now();

      return {
        success: true,
        result,
        metadata: {
          unitId: id,
          unitType: unit.unitType,
          calculationTime: endTime - startTime,
          context,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to calculate unit: ${error}`,
      };
    }
  }

  /**
   * Validate a unit
   */
  public validateUnit(id: string, context: UnitContext): IUnitValidationResult {
    try {
      const unit = this.getUnit(id);
      if (!unit) {
        return {
          success: false,
          error: 'Unit not found',
        };
      }

      const startTime = performance.now();
      const isValid = unit.validate(context);
      const endTime = performance.now();

      return {
        success: true,
        isValid,
        metadata: {
          unitId: id,
          unitType: unit.unitType,
          validationTime: endTime - startTime,
          context,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to validate unit: ${error}`,
      };
    }
  }

  /**
   * Create unit from configuration
   */
  private createUnitFromConfig(config: IUnitConfig): IUnit | null {
    try {
      // This is a simplified implementation
      // In a real implementation, you would use appropriate factories
      const unit: IUnit = {
        id: config.id,
        name: config.name,
        unitType: config.unitType,
        calculate: (context: UnitContext) => 100, // Placeholder
        validate: (context: UnitContext) => true, // Placeholder
        format: (format: string) => '100px', // Placeholder
        clone: () => this.createUnitFromConfig(config)!, // Placeholder
        getState: () => ({ initialized: true }), // Placeholder
        setState: (state: any) => {}, // Placeholder
      };

      return unit;
    } catch (error) {
      return null;
    }
  }

  /**
   * Update system configuration
   */
  public updateConfiguration(config: Partial<SystemConfiguration>): void {
    this.configuration = { ...this.configuration, ...config };
    
    // Apply configuration changes
    if (config.memoryLimit) {
      this.performanceManager.setMemoryLimit(config.memoryLimit);
    }
  }

  /**
   * Get system health
   */
  public getSystemHealth(): SystemHealth {
    const status = this.getSystemStatus();
    const performance = this.getPerformanceMetrics();
    const healthCheck = this.performHealthCheck();

    let overallScore = healthCheck.overallScore;
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check unit count
    if (status.totalUnits > this.configuration.maxUnits * 0.9) {
      issues.push('High unit count approaching limit');
      recommendations.push('Consider removing unused units');
      overallScore -= 20;
    }

    // Check memory usage
    if (performance.memoryUsage > this.configuration.memoryLimit * 0.8) {
      issues.push('High memory usage');
      recommendations.push('Consider optimizing memory usage or increasing limit');
      overallScore -= 15;
    }

    // Check error rate
    if (performance.errorRate > 0.1) {
      issues.push('High error rate detected');
      recommendations.push('Investigate and fix error sources');
      overallScore -= 25;
    }

    // Check validation errors
    if (status.validationErrors > 0) {
      issues.push('Validation errors present');
      recommendations.push('Fix validation errors');
      overallScore -= 10;
    }

    // Determine status
    let systemStatus: 'healthy' | 'degraded' | 'critical';
    if (overallScore >= 80) {
      systemStatus = 'healthy';
    } else if (overallScore >= 60) {
      systemStatus = 'degraded';
    } else {
      systemStatus = 'critical';
    }

    return {
      status: systemStatus,
      score: Math.max(0, overallScore),
      issues,
      recommendations,
    };
  }

  /**
   * Perform health check
   */
  public performHealthCheck(): HealthCheckResult {
    const checks = [
      {
        name: 'System Initialized',
        passed: this.isInitialized,
        message: this.isInitialized ? 'System is initialized' : 'System is not initialized',
      },
      {
        name: 'Performance Manager',
        passed: this.performanceManager !== undefined,
        message: this.performanceManager ? 'Performance manager is available' : 'Performance manager is missing',
      },
      {
        name: 'Strategy Manager',
        passed: this.strategyManager !== undefined,
        message: this.strategyManager ? 'Strategy manager is available' : 'Strategy manager is missing',
      },
      {
        name: 'Unit Registry Manager',
        passed: this.unitRegistryManager !== undefined,
        message: this.unitRegistryManager ? 'Unit registry manager is available' : 'Unit registry manager is missing',
      },
      {
        name: 'Validation Manager',
        passed: this.validationManager !== undefined,
        message: this.validationManager ? 'Validation manager is available' : 'Validation manager is missing',
      },
      {
        name: 'Observer Manager',
        passed: this.observerManager !== undefined,
        message: this.observerManager ? 'Observer manager is available' : 'Observer manager is missing',
      },
      {
        name: 'Command Manager',
        passed: this.commandManager !== undefined,
        message: this.commandManager ? 'Command manager is available' : 'Command manager is missing',
      },
    ];

    const passedChecks = checks.filter(check => check.passed).length;
    const overallScore = (passedChecks / checks.length) * 100;

    return {
      passed: passedChecks === checks.length,
      checks,
      overallScore,
    };
  }

  /**
   * Get focused managers (for advanced usage)
   */
  public getManagers() {
    return {
      commandManager: this.commandManager,
      observerManager: this.observerManager,
      performanceManager: this.performanceManager,
      strategyManager: this.strategyManager,
      unitRegistryManager: this.unitRegistryManager,
      validationManager: this.validationManager,
    };
  }
}