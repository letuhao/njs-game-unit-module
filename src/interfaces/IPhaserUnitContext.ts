import type { UnitContext } from '../interfaces/IUnit';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

// Minimal Phaser types for browser compatibility
declare const Phaser: any;

/**
 * Phaser Unit Context Interface
 * Defines the contract for Phaser-specific unit contexts
 */
export interface IPhaserUnitContext extends UnitContext {
  readonly scene: any;
  readonly game: any;
  readonly gameObject: any;
  readonly phaserParent?: any;
  [key: string]: any;
}

/**
 * Phaser Unit Context Implementation
 * Provides Phaser-specific unit context using DI
 */
export class PhaserUnitContext implements IPhaserUnitContext {
  public readonly scene: any;
  public readonly game: any;
  public readonly gameObject: any;
  public readonly phaserParent?: any;

  private logger: any;

  constructor(scene: any, game: any, gameObject: any, phaserParent?: any) {
    this.scene = scene;
    this.game = game;
    this.gameObject = gameObject;
    this.phaserParent = phaserParent;

    // Resolve logger from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }
  }

  /**
   * Get parent context
   */
  get parent(): any {
    if (this.phaserParent) {
      return {
        x: this.phaserParent.x || 0,
        y: this.phaserParent.y || 0,
        width: this.phaserParent.width || 0,
        height: this.phaserParent.height || 0,
      };
    }
    return undefined;
  }

  /**
   * Get viewport context
   */
  get viewport(): any {
    return this.scene?.viewport || {
      width: this.game?.config?.width || 800,
      height: this.game?.config?.height || 600,
    };
  }

  /**
   * Get content context
   */
  get content(): any {
    return {
      width: this.gameObject?.width || 0,
      height: this.gameObject?.height || 0,
    };
  }

  /**
   * Get scene context
   */
  get sceneContext(): any {
    return {
      width: this.scene?.width || 800,
      height: this.scene?.height || 600,
    };
  }

  /**
   * Validate context
   */
  validate(): boolean {
    if (!this.scene) {
      this.logger.warn('PhaserUnitContext', 'validate', 'Scene is required');
      return false;
    }
    if (!this.game) {
      this.logger.warn('PhaserUnitContext', 'validate', 'Game is required');
      return false;
    }
    if (!this.gameObject) {
      this.logger.warn('PhaserUnitContext', 'validate', 'GameObject is required');
      return false;
    }
    return true;
  }

  /**
   * Get context metadata
   */
  getMetadata(): {
    scene: string;
    game: string;
    gameObject: string;
    hasParent: boolean;
    viewport: { width: number; height: number };
    content: { width: number; height: number };
  } {
    return {
      scene: this.scene?.scene?.key || 'unknown',
      game: this.game?.version || 'unknown',
      gameObject: this.gameObject?.constructor?.name || 'unknown',
      hasParent: !!this.parent,
      viewport: this.viewport,
      content: this.content,
    };
  }

  /**
   * Clone context
   */
  clone(): PhaserUnitContext {
    return new PhaserUnitContext(this.scene, this.game, this.gameObject, this.phaserParent);
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `PhaserUnitContext(${this.scene?.scene?.key || 'unknown'}, ${this.gameObject?.constructor?.name || 'unknown'})`;
  }
}

/**
 * Phaser Unit Context Factory
 * Creates Phaser unit contexts using DI
 */
export class PhaserUnitContextFactory {
  private static logger: any;

  static {
    // Initialize logger from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }
  }

  /**
   * Create context from a Phaser GameObject
   */
  static fromGameObject(gameObject: any): PhaserUnitContext {
    return new PhaserUnitContext(gameObject.scene, gameObject.scene.game, gameObject, gameObject.parent);
  }

  /**
   * Create context with parent relationship
   */
  static withParent(
    gameObject: any,
    parent: any
  ): PhaserUnitContext {
    return new PhaserUnitContext(gameObject.scene, gameObject.scene.game, gameObject, parent);
  }

  /**
   * Create context from scene
   */
  static fromScene(scene: any): PhaserUnitContext {
    return new PhaserUnitContext(scene, scene.game, scene, undefined);
  }

  /**
   * Create context from game
   */
  static fromGame(game: any): PhaserUnitContext {
    return new PhaserUnitContext(game.scene, game, game, undefined);
  }

  /**
   * Create context with custom parameters
   */
  static create(
    scene: any,
    game: any,
    gameObject: any,
    parent?: any
  ): PhaserUnitContext {
    return new PhaserUnitContext(scene, game, gameObject, parent);
  }

  /**
   * Validate context creation parameters
   */
  static validateParameters(scene: any, game: any, gameObject: any): boolean {
    if (!scene) {
      this.logger.warn('PhaserUnitContextFactory', 'validateParameters', 'Scene is required');
      return false;
    }
    if (!game) {
      this.logger.warn('PhaserUnitContextFactory', 'validateParameters', 'Game is required');
      return false;
    }
    if (!gameObject) {
      this.logger.warn('PhaserUnitContextFactory', 'validateParameters', 'GameObject is required');
      return false;
    }
    return true;
  }

  /**
   * Get factory statistics
   */
  static getStatistics(): {
    loggerAvailable: boolean;
    factoryMethods: string[];
  } {
    return {
      loggerAvailable: !!this.logger,
      factoryMethods: [
        'fromGameObject',
        'withParent',
        'fromScene',
        'fromGame',
        'create',
      ],
    };
  }
}