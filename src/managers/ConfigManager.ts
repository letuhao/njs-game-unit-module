/**
 * Config Manager
 * Manages configuration settings and feature flags
 */
export class ConfigManager {
  private config: Map<string, any> = new Map();

  /**
   * Get a configuration value
   */
  get(key: string): any {
    return this.config.get(key);
  }

  /**
   * Set a configuration value
   */
  set(key: string, value: any): void {
    this.config.set(key, value);
  }

  /**
   * Get a feature flag
   */
  getFeatureFlag(flagName: string): boolean | undefined {
    return this.config.get(`feature.${flagName}`);
  }

  /**
   * Set a feature flag
   */
  setFeatureFlag(flagName: string, value: boolean): void {
    this.config.set(`feature.${flagName}`, value);
  }

  /**
   * Get all configuration
   */
  getAll(): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of this.config) {
      result[key] = value;
    }
    return result;
  }

  /**
   * Clear all configuration
   */
  clear(): void {
    this.config.clear();
  }
}
