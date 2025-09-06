import type { IUnit } from './IUnit';
import type { UnitContext } from './IUnit';
import { UnitType } from '../enums/UnitType';

/**
 * Core unit composite interface - basic composite operations
 */
export interface IUnitCompositeCore extends IUnit {
  /** Add a child unit */
  addChild(unit: IUnit): void;

  /** Remove a child unit */
  removeChild(unit: IUnit): boolean;

  /** Get all child units */
  getChildren(): IUnit[];

  /** Check if the composite has children */
  hasChildren(): boolean;

  /** Get the number of children */
  getChildCount(): number;
}

/**
 * Unit composite search interface - finding and querying operations
 */
export interface IUnitCompositeSearch {
  /** Get a child unit by ID */
  getChildById(id: string): IUnit | undefined;

  /** Find a unit by ID in the entire composite tree */
  findById(id: string): IUnit | undefined;

  /** Get all descendants (children and their children) */
  getAllDescendants(): IUnit[];
}

/**
 * Unit composite hierarchy interface - parent-child relationships
 */
export interface IUnitCompositeHierarchy {
  /** Get the parent composite */
  getParent(): IUnitComposite | undefined;

  /** Set the parent composite */
  setParent(parent: IUnitComposite | undefined): void;

  /** Get the composite depth level */
  getDepth(): number;

  /** Set the composite depth level */
  setDepth(depth: number): void;

  /** Check if the composite is a leaf (no children) */
  isLeaf(): boolean;

  /** Get the root composite (top-level parent) */
  getRoot(): IUnitComposite;

  /** Get the path from root to this composite */
  getPathFromRoot(): IUnitComposite[];
}

/**
 * Unit composite operations interface - execution and traversal
 */
export interface IUnitCompositeOperations {
  /** Execute operation on all children */
  executeOnChildren(operation: (unit: IUnit) => void): void;

  /** Get the total number of units in the composite tree */
  getTotalUnitCount(): number;
}

/**
 * Complete unit composite interface
 * Combines all composite functionality
 */
export interface IUnitComposite extends 
  IUnitCompositeCore,
  IUnitCompositeSearch,
  IUnitCompositeHierarchy,
  IUnitCompositeOperations {
}

/**
 * Base Unit Composite Implementation
 * Provides common functionality for composite units
 */
export abstract class BaseUnitComposite implements IUnitComposite {
  private children: IUnit[] = [];
  private parent: IUnitComposite | undefined;
  private depth: number = 0;
  private active: boolean = true;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly unitType: UnitType,
    public readonly baseValue: number = 0
  ) {}

  // IUnit interface implementation
  abstract calculate(context: UnitContext): number;
  abstract isResponsive(): boolean;

  get isActive(): boolean {
    return this.active;
  }

  set isActive(value: boolean) {
    this.active = value;
  }

  validate(context: UnitContext): boolean {
    return this.children.every(child => child.validate(context));
  }

  toString(): string {
    return `${this.constructor.name}(${this.id}, ${this.name})`;
  }

  clone(overrides?: Partial<IUnit>): IUnit {
    const cloned = Object.create(Object.getPrototypeOf(this));
    Object.assign(cloned, this, overrides);
    return cloned;
  }

  // IUnitCompositeCore interface implementation
  addChild(unit: IUnit): void {
    if (!this.children.includes(unit)) {
      this.children.push(unit);
      if (this.isUnitComposite(unit)) {
        unit.setParent(this);
        unit.setDepth(this.depth + 1);
      }
    }
  }

  removeChild(unit: IUnit): boolean {
    const index = this.children.indexOf(unit);
    if (index > -1) {
      this.children.splice(index, 1);
      if (this.isUnitComposite(unit)) {
        unit.setParent(undefined);
        unit.setDepth(0);
      }
      return true;
    }
    return false;
  }

  getChildren(): IUnit[] {
    return [...this.children];
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  getChildCount(): number {
    return this.children.length;
  }

  // IUnitCompositeSearch interface implementation
  getChildById(id: string): IUnit | undefined {
    return this.children.find(child => child.id === id);
  }

  findById(id: string): IUnit | undefined {
    if (this.id === id) {
      return this;
    }

    for (const child of this.children) {
      if (child.id === id) {
        return child;
      }

      if (this.isUnitComposite(child)) {
        const found = child.findById(id);
        if (found) {
          return found;
        }
      }
    }

    return undefined;
  }

  getAllDescendants(): IUnit[] {
    const descendants: IUnit[] = [];

    const collectDescendants = (unit: IUnit) => {
      descendants.push(unit);
      if (this.isUnitComposite(unit)) {
        unit.executeOnChildren(collectDescendants);
      }
    };

    this.executeOnChildren(collectDescendants);
    return descendants;
  }

  // IUnitCompositeHierarchy interface implementation
  getParent(): IUnitComposite | undefined {
    return this.parent;
  }

  setParent(parent: IUnitComposite | undefined): void {
    this.parent = parent;
    this.depth = parent ? parent.getDepth() + 1 : 0;
  }

  getDepth(): number {
    return this.depth;
  }

  setDepth(depth: number): void {
    this.depth = depth;
  }

  isLeaf(): boolean {
    return this.children.length === 0;
  }

  getRoot(): IUnitComposite {
    let current: IUnitComposite = this;
    while (current.getParent()) {
      current = current.getParent()!;
    }
    return current;
  }

  getPathFromRoot(): IUnitComposite[] {
    const path: IUnitComposite[] = [];
    let current: IUnitComposite | undefined = this;

    while (current) {
      path.unshift(current);
      current = current.getParent();
    }

    return path;
  }

  // IUnitCompositeOperations interface implementation
  executeOnChildren(operation: (unit: IUnit) => void): void {
    this.children.forEach(operation);
  }

  getTotalUnitCount(): number {
    let count = 1; // Count this unit

    for (const child of this.children) {
      if (this.isUnitComposite(child)) {
        count += child.getTotalUnitCount();
      } else {
        count++;
      }
    }

    return count;
  }

  /**
   * Type guard to check if a unit is a composite
   */
  private isUnitComposite(unit: IUnit): unit is IUnitComposite {
    return 'addChild' in unit && 'removeChild' in unit;
  }

  /**
   * Format the composite unit as a string
   */
  public format(format: string): string {
    return `${this.name} (${this.children.length} children)`;
  }
}
