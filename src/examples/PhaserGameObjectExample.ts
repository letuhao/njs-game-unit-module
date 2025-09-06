import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

// Mock Phaser for demonstration purposes
declare namespace Phaser {
  class Scene {
    constructor(config: { key: string });
    add: {
      existing(gameObject: any): any;
    };
  }
}

/**
 * Responsive Sprite
 * Example sprite that uses DI for responsive calculations
 */
export class ResponsiveSprite {
  public scene: any;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public scale: number;
  public texture: string;
  public parent: ResponsiveContainer | undefined;

  private sizeCalculator: any;
  private positionCalculator: any;
  private scaleCalculator: any;

  constructor(scene: any, x: number, y: number, texture: string) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.scale = 1.0;
    this.texture = texture;

    // Resolve calculators from DI container
    try {
      this.sizeCalculator = container.resolve(TOKENS.SIZE_CALCULATOR);
      this.positionCalculator = container.resolve(TOKENS.POSITION_CALCULATOR);
      this.scaleCalculator = container.resolve(TOKENS.SCALE_CALCULATOR);
    } catch (error) {
      console.warn('Failed to resolve calculators from DI container:', error);
      // Fallback to null - will use direct calculations
      this.sizeCalculator = null;
      this.positionCalculator = null;
      this.scaleCalculator = null;
    }
  }

  /**
   * Update sprite using DI calculators
   */
  update(): void {
    // Update size
    const size = this.getSize();
    this.width = size.width;
    this.height = size.height;

    // Update position
    const position = this.getPosition();
    this.x = position.x;
    this.y = position.y;

    // Update scale
    this.scale = this.getScale();
  }

  /**
   * Get size using DI calculator
   */
  getSize(): { width: number; height: number } {
    if (this.sizeCalculator) {
      try {
        const context = this.createUnitContext();
        const width = this.sizeCalculator.calculateWidth(context);
        const height = this.sizeCalculator.calculateHeight(context);
        return { width, height };
      } catch (error) {
        console.warn('Size calculation failed, using fallback:', error);
      }
    }
    return { width: this.width, height: this.height };
  }

  /**
   * Get position using DI calculator
   */
  getPosition(): { x: number; y: number } {
    if (this.positionCalculator) {
      try {
        const context = this.createUnitContext();
        const x = this.positionCalculator.calculateX(context);
        const y = this.positionCalculator.calculateY(context);
        return { x, y };
      } catch (error) {
        console.warn('Position calculation failed, using fallback:', error);
      }
    }
    return { x: this.x, y: this.y };
  }

  /**
   * Get scale using DI calculator
   */
  getScale(): number {
    if (this.scaleCalculator) {
      try {
        const context = this.createUnitContext();
        return this.scaleCalculator.calculate(context);
      } catch (error) {
        console.warn('Scale calculation failed, using fallback:', error);
      }
    }
    return this.scale;
  }

  /**
   * Create unit context for calculations
   */
  private createUnitContext(): any {
    return {
      scene: this.scene,
      parent: this.parent ? {
        x: this.parent.x,
        y: this.parent.y,
        width: this.parent.width,
        height: this.parent.height,
      } : undefined,
      viewport: this.scene?.viewport,
      content: {
        width: this.width,
        height: this.height,
      },
    };
  }

  /**
   * Get sprite statistics
   */
  getStatistics(): {
    position: { x: number; y: number };
    size: { width: number; height: number };
    scale: number;
    texture: string;
    hasCalculators: boolean;
  } {
    return {
      position: this.getPosition(),
      size: this.getSize(),
      scale: this.getScale(),
      texture: this.texture,
      hasCalculators: !!(this.sizeCalculator && this.positionCalculator && this.scaleCalculator),
    };
  }
}

/**
 * Responsive Container
 * Example container that uses DI for unit calculations
 */
export class ResponsiveContainer {
  public scene: any;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public children: ResponsiveSprite[] = [];

  private sizeCalculator: any;
  private positionCalculator: any;
  private scaleCalculator: any;

  constructor(scene: any, width: number, height: number) {
    this.scene = scene;
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;

    // Resolve calculators from DI container
    try {
      this.sizeCalculator = container.resolve(TOKENS.SIZE_CALCULATOR);
      this.positionCalculator = container.resolve(TOKENS.POSITION_CALCULATOR);
      this.scaleCalculator = container.resolve(TOKENS.SCALE_CALCULATOR);
    } catch (error) {
      console.warn('Failed to resolve calculators from DI container:', error);
      // Fallback to null - will use direct calculations
      this.sizeCalculator = null;
      this.positionCalculator = null;
      this.scaleCalculator = null;
    }
  }

  /**
   * Add a responsive sprite
   */
  addResponsiveChild(sprite: ResponsiveSprite): void {
    sprite.parent = this;
    this.children.push(sprite);
  }

  /**
   * Remove a responsive sprite
   */
  removeResponsiveChild(sprite: ResponsiveSprite): boolean {
    const index = this.children.indexOf(sprite);
    if (index !== -1) {
      this.children.splice(index, 1);
      sprite.parent = undefined;
      return true;
    }
    return false;
  }

  /**
   * Update layout using DI calculators
   */
  updateLayout(): void {
    // Update container size
    const size = this.getSize();
    this.width = size.width;
    this.height = size.height;

    // Update container position
    const position = this.getPosition();
    this.x = position.x;
    this.y = position.y;

    // Update children
    for (const child of this.children) {
      child.update();
    }
  }

  /**
   * Get size using DI calculator
   */
  getSize(): { width: number; height: number } {
    if (this.sizeCalculator) {
      try {
        const context = this.createUnitContext();
        const width = this.sizeCalculator.calculateWidth(context);
        const height = this.sizeCalculator.calculateHeight(context);
        return { width, height };
      } catch (error) {
        console.warn('Size calculation failed, using fallback:', error);
      }
    }
    return { width: this.width, height: this.height };
  }

  /**
   * Get position using DI calculator
   */
  getPosition(): { x: number; y: number } {
    if (this.positionCalculator) {
      try {
        const context = this.createUnitContext();
        const x = this.positionCalculator.calculateX(context);
        const y = this.positionCalculator.calculateY(context);
        return { x, y };
      } catch (error) {
        console.warn('Position calculation failed, using fallback:', error);
      }
    }
    return { x: this.x, y: this.y };
  }

  /**
   * Create unit context for calculations
   */
  private createUnitContext(): any {
    return {
      scene: this.scene,
      viewport: this.scene?.viewport,
      content: {
        width: this.width,
        height: this.height,
      },
    };
  }

  /**
   * Get container statistics
   */
  getStatistics(): {
    position: { x: number; y: number };
    size: { width: number; height: number };
    childrenCount: number;
    hasCalculators: boolean;
  } {
    return {
      position: { x: this.x, y: this.y },
      size: { width: this.width, height: this.height },
      childrenCount: this.children.length,
      hasCalculators: !!(this.sizeCalculator && this.positionCalculator && this.scaleCalculator),
    };
  }
}

/**
 * Phaser GameObject Example Scene
 * Demonstrates how to use the DI container with Phaser game objects
 */
export class PhaserGameObjectExample extends Phaser.Scene {
  private container!: ResponsiveContainer;
  private responsiveSprites: ResponsiveSprite[] = [];

  constructor() {
    super({ key: 'PhaserGameObjectExample' });
  }

  create() {
    // Create responsive container
    this.container = new ResponsiveContainer(this, 400, 300);
    this.add.existing(this.container);

    // Create responsive sprites
    for (let i = 0; i < 5; i++) {
      const sprite = new ResponsiveSprite(this, 0, 0, 'sprite');
      this.container.addResponsiveChild(sprite);
      this.responsiveSprites.push(sprite);
    }

    // Initial layout update
    this.updateLayout();
  }

  /**
   * Update layout
   */
  updateLayout(): void {
    this.container.updateLayout();
  }

  /**
   * Get example statistics
   */
  getExampleStatistics(): {
    container: {
      position: { x: number; y: number };
      size: { width: number; height: number };
      childrenCount: number;
      hasCalculators: boolean;
    };
    sprites: Array<{
      position: { x: number; y: number };
      size: { width: number; height: number };
      scale: number;
      texture: string;
      hasCalculators: boolean;
    }>;
  } {
    return {
      container: this.container.getStatistics(),
      sprites: this.responsiveSprites.map(sprite => sprite.getStatistics()),
    };
  }
}
