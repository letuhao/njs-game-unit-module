/**
 * Dependency Injection Container
 * Provides a simple DI container for managing dependencies
 */

export type Constructor<T = any> = new (...args: any[]) => T;
export type Factory<T = any> = (...args: any[]) => T;
export type Token<T = any> = string | symbol | Constructor<T>;

export interface ServiceDefinition<T = any> {
  token: Token<T>;
  factory: Factory<T>;
  singleton?: boolean;
  dependencies?: Token[];
}

export interface ContainerOptions {
  strictMode?: boolean;
  autoResolve?: boolean;
}

/**
 * Dependency Injection Container
 */
export class DiContainer {
  private services = new Map<Token, ServiceDefinition>();
  private instances = new Map<Token, any>();
  private options: ContainerOptions;

  constructor(options: ContainerOptions = {}) {
    this.options = {
      strictMode: false,
      autoResolve: true,
      ...options,
    };
  }

  /**
   * Register a service with the container
   */
  register<T>(definition: ServiceDefinition<T>): void {
    this.services.set(definition.token, definition);
  }

  /**
   * Register a singleton service
   */
  registerSingleton<T>(token: Token<T>, factory: Factory<T>, dependencies?: Token[]): void {
    this.register({
      token,
      factory,
      singleton: true,
      dependencies: dependencies || [],
    });
  }

  /**
   * Register a transient service
   */
  registerTransient<T>(token: Token<T>, factory: Factory<T>, dependencies?: Token[]): void {
    this.register({
      token,
      factory,
      singleton: false,
      dependencies: dependencies || [],
    });
  }

  /**
   * Register a class constructor
   */
  registerClass<T>(token: Token<T>, constructor: Constructor<T>, dependencies?: Token[]): void {
    this.register({
      token,
      factory: (...args) => new constructor(...args),
      singleton: false,
      dependencies: dependencies || [],
    });
  }

  /**
   * Register a singleton class
   */
  registerSingletonClass<T>(token: Token<T>, constructor: Constructor<T>, dependencies?: Token[]): void {
    this.register({
      token,
      factory: (...args) => new constructor(...args),
      singleton: true,
      dependencies: dependencies || [],
    });
  }

  /**
   * Resolve a service from the container
   */
  resolve<T>(token: Token<T>): T {
    const definition = this.services.get(token);
    if (!definition) {
      const errorMessage = `Service not found for token: ${String(token)}`;
      if (this.options.strictMode) {
        throw new Error(`${errorMessage}. Available tokens: ${this.getRegisteredTokens().map(t => String(t)).join(', ')}`);
      }
      throw new Error(errorMessage);
    }

    // Return singleton instance if it exists
    if (definition.singleton && this.instances.has(token)) {
      return this.instances.get(token);
    }

    try {
      // Resolve dependencies
      const dependencies = definition.dependencies?.map(dep => this.resolve(dep)) || [];

      // Create instance
      const instance = definition.factory(...dependencies);

      // Store singleton instance
      if (definition.singleton) {
        this.instances.set(token, instance);
      }

      return instance;
    } catch (error) {
      throw new Error(`Failed to resolve service for token ${String(token)}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Check if a service is registered
   */
  has(token: Token): boolean {
    return this.services.has(token);
  }

  /**
   * Get all registered tokens
   */
  getRegisteredTokens(): Token[] {
    return Array.from(this.services.keys());
  }

  /**
   * Clear all services and instances
   */
  clear(): void {
    this.services.clear();
    this.instances.clear();
  }

  /**
   * Remove a specific service
   */
  remove(token: Token): boolean {
    const removed = this.services.delete(token);
    this.instances.delete(token);
    return removed;
  }

  /**
   * Get service definition
   */
  getDefinition<T>(token: Token<T>): ServiceDefinition<T> | undefined {
    return this.services.get(token);
  }

  /**
   * Check if a service is a singleton
   */
  isSingleton(token: Token): boolean {
    const definition = this.services.get(token);
    return definition?.singleton ?? false;
  }

  /**
   * Get container statistics
   */
  getStatistics(): {
    totalServices: number;
    singletonServices: number;
    transientServices: number;
    instantiatedServices: number;
  } {
    const totalServices = this.services.size;
    const singletonServices = Array.from(this.services.values()).filter(s => s.singleton).length;
    const transientServices = totalServices - singletonServices;
    const instantiatedServices = this.instances.size;

    return {
      totalServices,
      singletonServices,
      transientServices,
      instantiatedServices,
    };
  }

  /**
   * Validate all registered services can be resolved
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    for (const [token, definition] of this.services) {
      try {
        // Check if dependencies exist
        if (definition.dependencies) {
          for (const dep of definition.dependencies) {
            if (!this.services.has(dep)) {
              errors.push(`Service ${String(token)} depends on missing service ${String(dep)}`);
            }
          }
        }
      } catch (error) {
        errors.push(`Service ${String(token)} validation failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Create a child container with inherited services
   */
  createChild(): DiContainer {
    const child = new DiContainer(this.options);
    
    // Copy all services to child
    for (const [token, definition] of this.services) {
      child.services.set(token, definition);
    }
    
    return child;
  }

  /**
   * Get dependency graph for debugging
   */
  getDependencyGraph(): Map<string, string[]> {
    const graph = new Map<string, string[]>();
    
    for (const [token, definition] of this.services) {
      const tokenStr = String(token);
      const dependencies = definition.dependencies?.map(dep => String(dep)) || [];
      graph.set(tokenStr, dependencies);
    }
    
    return graph;
  }
}

/**
 * Global container instance
 */
export const container = new DiContainer();

// Re-export TOKENS for convenience
export { TOKENS } from './Tokens';
