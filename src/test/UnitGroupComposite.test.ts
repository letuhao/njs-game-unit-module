import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { UnitGroupComposite } from '../composites/UnitGroupComposite';
import { CalculationStrategy } from '../enums/CalculationStrategy';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import { logger } from '../core/Logger';
import { container, TOKENS } from '../container/DiContainer';

// Mock unit for testing
class MockUnit implements IUnit {
  readonly id: string;
  readonly name: string;
  readonly unitType: UnitType;
  readonly isActive: boolean = true;

  constructor(id: string, name: string, unitType: UnitType = UnitType.SIZE) {
    this.id = id;
    this.name = name;
    this.unitType = unitType;
  }

  calculate(context: UnitContext): number {
    // Return a value based on unit type and context
    switch (this.unitType) {
      case UnitType.SIZE:
        return (context.parent?.width || 100) + parseInt(this.id.split('-')[1] || '0');
      case UnitType.POSITION:
        return (context.parent?.x || 0) + parseInt(this.id.split('-')[1] || '0');
      case UnitType.SCALE:
        return 1.0 + parseInt(this.id.split('-')[1] || '0') / 10;
      default:
        return 0;
    }
  }

  validate(context: UnitContext): boolean {
    return context !== null && context !== undefined;
  }

  isResponsive(): boolean {
    return true;
  }

  toString(): string {
    return `MockUnit(${this.id})`;
  }

  clone(_overrides?: Partial<IUnit>): IUnit {
    return new MockUnit(this.id, this.name, this.unitType);
  }
}

describe('UnitGroupComposite', () => {
  let composite: UnitGroupComposite;
  let mockContext: UnitContext;
  let loggerSpy: any;

  beforeEach(() => {
    // Mock Logger instance
    const mockLogger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    // Mock the logger module
    jest.doMock('../core/Logger', () => ({
      logger: mockLogger,
    }));

    loggerSpy = mockLogger;

    // Use DI container to resolve composite instead of direct instantiation
    try {
      composite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
      // Set properties for the resolved composite
      (composite as any).id = 'test-composite';
      (composite as any).name = 'Test Composite';
      (composite as any).calculationStrategy = CalculationStrategy.SEQUENTIAL;
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      composite = new UnitGroupComposite('test-composite', 'Test Composite', CalculationStrategy.SEQUENTIAL);
    }

    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create composite with correct properties', () => {
      expect(composite.id).toBe('test-composite');
      expect(composite.name).toBe('Test Composite');
      expect(composite.calculationStrategy).toBe(CalculationStrategy.SEQUENTIAL);
    });

    it('should create composite with default values', () => {
      let defaultComposite: UnitGroupComposite;
      try {
        defaultComposite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
        (defaultComposite as any).id = 'default-composite';
        (defaultComposite as any).name = 'Default Composite';
        (defaultComposite as any).calculationStrategy = CalculationStrategy.SEQUENTIAL;
      } catch (error) {
        defaultComposite = new UnitGroupComposite('default-composite', 'Default Composite', CalculationStrategy.SEQUENTIAL);
      }

      expect(defaultComposite).toBeInstanceOf(UnitGroupComposite);
      expect(defaultComposite.id).toBe('default-composite');
      expect(defaultComposite.name).toBe('Default Composite');
    });
  });

  describe('unit management', () => {
    it('should add units to composite', () => {
      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);

      composite.addUnit(unit1);
      composite.addUnit(unit2);

      expect(composite.getUnits()).toContain(unit1);
      expect(composite.getUnits()).toContain(unit2);
      expect(composite.getUnits().length).toBe(2);
    });

    it('should remove units from composite', () => {
      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);

      composite.addUnit(unit1);
      composite.addUnit(unit2);
      expect(composite.getUnits().length).toBe(2);

      composite.removeUnit(unit1.id);
      expect(composite.getUnits()).not.toContain(unit1);
      expect(composite.getUnits()).toContain(unit2);
      expect(composite.getUnits().length).toBe(1);
    });

    it('should not add duplicate units', () => {
      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);

      composite.addUnit(unit1);
      composite.addUnit(unit2);

      expect(composite.getUnits().length).toBe(1);
      expect(composite.getUnits()).toContain(unit1);
    });

    it('should clear all units', () => {
      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);

      composite.addUnit(unit1);
      composite.addUnit(unit2);
      expect(composite.getUnits().length).toBe(2);

      composite.clearUnits();
      expect(composite.getUnits().length).toBe(0);
    });
  });

  describe('calculation', () => {
    beforeEach(() => {
      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);
      const unit3 = new MockUnit('unit-3', 'Unit 3', UnitType.SCALE);

      composite.addUnit(unit1);
      composite.addUnit(unit2);
      composite.addUnit(unit3);
    });

    it('should calculate using sequential strategy', () => {
      let sequentialComposite: UnitGroupComposite;
      try {
        sequentialComposite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
        (sequentialComposite as any).id = 'sequential-composite';
        (sequentialComposite as any).name = 'Sequential Composite';
        (sequentialComposite as any).calculationStrategy = CalculationStrategy.SEQUENTIAL;
      } catch (error) {
        sequentialComposite = new UnitGroupComposite('sequential-composite', 'Sequential Composite', CalculationStrategy.SEQUENTIAL);
      }

      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);
      
      sequentialComposite.addUnit(unit1);
      sequentialComposite.addUnit(unit2);

      const result = sequentialComposite.calculate(mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate using parallel strategy', () => {
      let parallelComposite: UnitGroupComposite;
      try {
        parallelComposite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
        (parallelComposite as any).id = 'parallel-composite';
        (parallelComposite as any).name = 'Parallel Composite';
        (parallelComposite as any).calculationStrategy = CalculationStrategy.PARALLEL;
      } catch (error) {
        parallelComposite = new UnitGroupComposite('parallel-composite', 'Parallel Composite', CalculationStrategy.PARALLEL);
      }

      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);
      
      parallelComposite.addUnit(unit1);
      parallelComposite.addUnit(unit2);

      const result = parallelComposite.calculate(mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate using weighted strategy', () => {
      let weightedComposite: UnitGroupComposite;
      try {
        weightedComposite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
        (weightedComposite as any).id = 'weighted-composite';
        (weightedComposite as any).name = 'Weighted Composite';
        (weightedComposite as any).calculationStrategy = CalculationStrategy.WEIGHTED;
      } catch (error) {
        weightedComposite = new UnitGroupComposite('weighted-composite', 'Weighted Composite', CalculationStrategy.WEIGHTED);
      }

      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);
      
      weightedComposite.addUnit(unit1);
      weightedComposite.addUnit(unit2);

      const result = weightedComposite.calculate(mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle empty composite', () => {
      let emptyComposite: UnitGroupComposite;
      try {
        emptyComposite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
        (emptyComposite as any).id = 'empty-composite';
        (emptyComposite as any).name = 'Empty Composite';
        (emptyComposite as any).calculationStrategy = CalculationStrategy.SEQUENTIAL;
      } catch (error) {
        emptyComposite = new UnitGroupComposite('empty-composite', 'Empty Composite', CalculationStrategy.SEQUENTIAL);
      }

      const result = emptyComposite.calculate(mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBe(0);
    });
  });

  describe('validation', () => {
    beforeEach(() => {
      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);

      composite.addUnit(unit1);
      composite.addUnit(unit2);
    });

    it('should validate all units in composite', () => {
      const result = composite.validate(mockContext);
      expect(result).toBe(true);
    });

    it('should return false if any unit validation fails', () => {
      // Mock a unit that fails validation
      const failingUnit = {
        id: 'failing-unit',
        name: 'Failing Unit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: jest.fn().mockReturnValue(100),
        validate: jest.fn().mockReturnValue(false),
        isResponsive: jest.fn().mockReturnValue(true),
        toString: jest.fn().mockReturnValue('FailingUnit(failing-unit)'),
        clone: jest.fn().mockReturnValue({}),
      } as IUnit;

      composite.addUnit(failingUnit);

      const result = composite.validate(mockContext);
      expect(result).toBe(false);
    });

    it('should handle missing context gracefully', () => {
      const result = composite.validate(null as any);
      expect(result).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle calculation errors gracefully', () => {
      // Mock a unit that throws an error during calculation
      const errorUnit = {
        id: 'error-unit',
        name: 'Error Unit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: jest.fn().mockImplementation(() => {
          throw new Error('Calculation failed');
        }),
        validate: jest.fn().mockReturnValue(true),
        isResponsive: jest.fn().mockReturnValue(true),
        toString: jest.fn().mockReturnValue('ErrorUnit(error-unit)'),
        clone: jest.fn().mockReturnValue({}),
      } as IUnit;

      composite.addUnit(errorUnit);

      expect(() => composite.calculate(mockContext)).toThrow('Calculation failed');
    });

    it('should handle missing context gracefully', () => {
      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      composite.addUnit(unit1);

      const result = composite.calculate(null as any);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('performance', () => {
    it('should calculate efficiently with many units', () => {
      // Add many units to test performance
      for (let i = 0; i < 100; i++) {
        const unit = new MockUnit(`unit-${i}`, `Unit ${i}`, UnitType.SIZE);
        composite.addUnit(unit);
      }

      const startTime = performance.now();
      const result = composite.calculate(mockContext);
      const endTime = performance.now();

      expect(typeof result).toBe('number');
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle rapid calculations', () => {
      const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
      const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);

      composite.addUnit(unit1);
      composite.addUnit(unit2);

      const results = [];
      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        const result = composite.calculate(mockContext);
        results.push(result);
      }

      const endTime = performance.now();

      results.forEach(result => {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      });

      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });
  });

  describe('integration', () => {
    it('should work with different unit types', () => {
      const unitTypes = [UnitType.SIZE, UnitType.POSITION, UnitType.SCALE];
      
      for (const unitType of unitTypes) {
        let typeComposite: UnitGroupComposite;
        try {
          typeComposite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
          (typeComposite as any).id = `type-composite-${unitType}`;
          (typeComposite as any).name = `Type Composite ${unitType}`;
          (typeComposite as any).calculationStrategy = CalculationStrategy.SEQUENTIAL;
        } catch (error) {
          typeComposite = new UnitGroupComposite(`type-composite-${unitType}`, `Type Composite ${unitType}`, CalculationStrategy.SEQUENTIAL);
        }

        const unit = new MockUnit(`unit-${unitType}`, `Unit ${unitType}`, unitType);
        typeComposite.addUnit(unit);

        const result = typeComposite.calculate(mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should work with different calculation strategies', () => {
      const strategies = [CalculationStrategy.SEQUENTIAL, CalculationStrategy.PARALLEL, CalculationStrategy.WEIGHTED];
      
      for (const strategy of strategies) {
        let strategyComposite: UnitGroupComposite;
        try {
          strategyComposite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
          (strategyComposite as any).id = `strategy-composite-${strategy}`;
          (strategyComposite as any).name = `Strategy Composite ${strategy}`;
          (strategyComposite as any).calculationStrategy = strategy;
        } catch (error) {
          strategyComposite = new UnitGroupComposite(`strategy-composite-${strategy}`, `Strategy Composite ${strategy}`, strategy);
        }

        const unit1 = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
        const unit2 = new MockUnit('unit-2', 'Unit 2', UnitType.POSITION);
        
        strategyComposite.addUnit(unit1);
        strategyComposite.addUnit(unit2);

        const result = strategyComposite.calculate(mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
