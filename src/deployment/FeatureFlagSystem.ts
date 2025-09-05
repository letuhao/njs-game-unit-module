import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Feature Flag System
 * Manages feature flags for deployment and testing using DI
 */
export class FeatureFlagSystem {
  private static instance: FeatureFlagSystem;
  private flags: Map<string, boolean> = new Map();
  private configManager: any;
  private logger: any;

  private constructor() {
    // Resolve dependencies from DI container
    try {
      this.configManager = container.resolve(TOKENS.CONFIG_MANAGER);
    } catch (error) {
      this.configManager = null;
    }

    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }

    this.initializeDefaultFlags();
  }

  /**
   * Get singleton instance
   */
  static getInstance(): FeatureFlagSystem {
    if (!FeatureFlagSystem.instance) {
      FeatureFlagSystem.instance = new FeatureFlagSystem();
    }
    return FeatureFlagSystem.instance;
  }

  /**
   * Check if a feature flag is enabled
   */
  isEnabled(flagName: string): boolean {
    // Try to get from config manager first
    if (this.configManager) {
      try {
        return this.configManager.getFeatureFlag(flagName) ?? false;
      } catch (error) {
        this.logger.warn('FeatureFlagSystem', 'isEnabled', `Config manager error: ${error}`);
      }
    }

    // Fallback to local flags
    return this.flags.get(flagName) ?? false;
  }

  /**
   * Enable a feature flag
   */
  enable(flagName: string): void {
    this.flags.set(flagName, true);
    this.logger.debug('FeatureFlagSystem', 'enable', `Enabled feature flag: ${flagName}`);
  }

  /**
   * Disable a feature flag
   */
  disable(flagName: string): void {
    this.flags.set(flagName, false);
    this.logger.debug('FeatureFlagSystem', 'disable', `Disabled feature flag: ${flagName}`);
  }

  /**
   * Toggle a feature flag
   */
  toggle(flagName: string): boolean {
    const currentValue = this.isEnabled(flagName);
    this.flags.set(flagName, !currentValue);
    this.logger.debug('FeatureFlagSystem', 'toggle', `Toggled feature flag: ${flagName} to ${!currentValue}`);
    return !currentValue;
  }

  /**
   * Set multiple feature flags
   */
  setFlags(flags: Record<string, boolean>): void {
    for (const [name, value] of Object.entries(flags)) {
      this.flags.set(name, value);
    }
    this.logger.debug('FeatureFlagSystem', 'setFlags', `Set ${Object.keys(flags).length} feature flags`);
  }

  /**
   * Get all feature flags
   */
  getAllFlags(): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    for (const [name, value] of this.flags) {
      result[name] = value;
    }
    return result;
  }

  /**
   * Get enabled feature flags
   */
  getEnabledFlags(): string[] {
    return Array.from(this.flags.entries())
      .filter(([, value]) => value)
      .map(([name]) => name);
  }

  /**
   * Get disabled feature flags
   */
  getDisabledFlags(): string[] {
    return Array.from(this.flags.entries())
      .filter(([, value]) => !value)
      .map(([name]) => name);
  }

  /**
   * Clear all feature flags
   */
  clearFlags(): void {
    this.flags.clear();
    this.logger.debug('FeatureFlagSystem', 'clearFlags', 'Cleared all feature flags');
  }

  /**
   * Remove a specific feature flag
   */
  removeFlag(flagName: string): boolean {
    const removed = this.flags.delete(flagName);
    if (removed) {
      this.logger.debug('FeatureFlagSystem', 'removeFlag', `Removed feature flag: ${flagName}`);
    }
    return removed;
  }

  /**
   * Check if feature flag exists
   */
  hasFlag(flagName: string): boolean {
    return this.flags.has(flagName);
  }

  /**
   * Get feature flag count
   */
  getFlagCount(): number {
    return this.flags.size;
  }

  /**
   * Initialize default feature flags
   */
  private initializeDefaultFlags(): void {
    // Default feature flags
    this.flags.set('ENABLE_VALIDATION', true);
    this.flags.set('ENABLE_CACHING', true);
    this.flags.set('ENABLE_LOGGING', true);
    this.flags.set('ENABLE_PERFORMANCE_MONITORING', false);
    this.flags.set('ENABLE_DEBUG_MODE', false);
    this.flags.set('ENABLE_EXPERIMENTAL_FEATURES', false);
    this.flags.set('ENABLE_ANALYTICS', false);
    this.flags.set('ENABLE_ERROR_REPORTING', true);

    this.logger.debug('FeatureFlagSystem', 'initializeDefaultFlags', 'Initialized default feature flags');
  }

  /**
   * Get system statistics
   */
  getStatistics(): {
    totalFlags: number;
    enabledFlags: number;
    disabledFlags: number;
    flagNames: string[];
  } {
    const enabledFlags = this.getEnabledFlags();
    const disabledFlags = this.getDisabledFlags();

    return {
      totalFlags: this.flags.size,
      enabledFlags: enabledFlags.length,
      disabledFlags: disabledFlags.length,
      flagNames: Array.from(this.flags.keys()),
    };
  }

  /**
   * Export feature flags configuration
   */
  exportConfiguration(): {
    flags: Record<string, boolean>;
    timestamp: string;
    version: string;
  } {
    return {
      flags: this.getAllFlags(),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  /**
   * Import feature flags configuration
   */
  importConfiguration(config: {
    flags: Record<string, boolean>;
    timestamp?: string;
    version?: string;
  }): void {
    if (config.flags && typeof config.flags === 'object') {
      this.setFlags(config.flags);
      this.logger.debug('FeatureFlagSystem', 'importConfiguration', `Imported ${Object.keys(config.flags).length} feature flags`);
    } else {
      throw new Error('Invalid configuration format');
    }
  }
}
