import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';
import { UnitType } from '../enums/UnitType';
import { Dimension } from '../enums/Dimension';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { SizeValue } from '../enums/SizeValue';
import { PositionValue } from '../enums/PositionValue';
import { ScaleValue } from '../enums/ScaleValue';

/**
 * Responsive Container
 * Example container that uses DI for unit calculations
 */
export class ResponsiveContainer {
  public id: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public parent: ResponsiveContainer | undefined;
  public children: ResponsiveContainer[] = [];
  public scene: any;

  private sizeCalculator: any;
  private positionCalculator: any;
  private scaleCalculator: any;

  constructor(scene: any, id: string, x: number, y: number, parent?: ResponsiveContainer) {
    this.scene = scene;
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.parent = parent;

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
   * Clone the container using DI
   */
  clone(): ResponsiveContainer {
    // Return a new instance with same properties
    return new ResponsiveContainer(this.scene, this.id, this.x, this.y, this.parent);
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
    return 1.0;
  }

  /**
   * Add a child container
   */
  addChild(child: ResponsiveContainer): void {
    child.parent = this;
    this.children.push(child);
  }

  /**
   * Remove a child container
   */
  removeChild(child: ResponsiveContainer): boolean {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = undefined;
      return true;
    }
    return false;
  }

  /**
   * Update layout using DI calculators
   */
  updateLayout(): void {
    // Update size
    const size = this.getSize();
    this.width = size.width;
    this.height = size.height;

    // Update position
    const position = this.getPosition();
    this.x = position.x;
    this.y = position.y;

    // Update children
    for (const child of this.children) {
      child.updateLayout();
    }
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
   * Get container statistics
   */
  getStatistics(): {
    id: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    scale: number;
    childrenCount: number;
    hasCalculators: boolean;
  } {
    return {
      id: this.id,
      position: this.getPosition(),
      size: this.getSize(),
      scale: this.getScale(),
      childrenCount: this.children.length,
      hasCalculators: !!(this.sizeCalculator && this.positionCalculator && this.scaleCalculator),
    };
  }
}

/**
 * Container Integration Example
 * Demonstrates how to use the DI container with responsive containers
 */
export class ContainerIntegrationExample {
  private containers: ResponsiveContainer[] = [];
  private scene: any;

  constructor(scene: any) {
    this.scene = scene;
  }

  /**
   * Create example containers
   */
  createExampleContainers(): void {
    // Create main container
    const mainContainer = new ResponsiveContainer(this.scene, 'main', 0, 0);
    this.containers.push(mainContainer);

    // Create child containers
    for (let i = 0; i < 3; i++) {
      const child = new ResponsiveContainer(this.scene, `child-${i}`, i * 100, i * 100, mainContainer);
      mainContainer.addChild(child);
      this.containers.push(child);
    }
  }

  /**
   * Update all containers
   */
  updateContainers(): void {
    for (const container of this.containers) {
      container.updateLayout();
    }
  }

  /**
   * Get example statistics
   */
  getExampleStatistics(): {
    totalContainers: number;
    containers: Array<{
      id: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
      scale: number;
      childrenCount: number;
      hasCalculators: boolean;
    }>;
  } {
    return {
      totalContainers: this.containers.length,
      containers: this.containers.map(container => container.getStatistics()),
    };
  }

  /**
   * Clear all containers
   */
  clearContainers(): void {
    this.containers = [];
  }
}
