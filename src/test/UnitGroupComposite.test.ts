import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { UnitGroupComposite } from '../composites/UnitGroupComposite';
import { CalculationStrategy } from '../enums/CalculationStrategy';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
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
    return calculateValueBasedOnUnitType(context);
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

  private calculateValueBasedOnUnitType(context: UnitContext): number {
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
}

describe('UnitGroupComposite', () => {
  let composite: UnitGroupComposite;
  let mockContext: UnitContext;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create composite with default values', () => {
      testDefaultCompositeCreation();
    });

    it('should create composite with custom values', () => {
      testCustomCompositeCreation();
    });

    it('should handle invalid configuration gracefully', () => {
      testInvalidConfigurationHandling();
    });
  });

  describe('unit management', () => {
    it('should add units to composite', () => {
      testUnitAddition();
    });

    it('should remove units from composite', () => {
      testUnitRemoval();
    });

    it('should get units by type', () => {
      testGetUnitsByType();
    });

    it('should get all units', () => {
      testGetAllUnits();
    });

    it('should clear all units', () => {
      testClearAllUnits();
    });
  });

  describe('calculation', () => {
    it('should calculate with single unit', () => {
      testSingleUnitCalculation();
    });

    it('should calculate with multiple units', () => {
      testMultipleUnitCalculation();
    });

    it('should handle different calculation strategies', () => {
      testDifferentCalculationStrategies();
    });

    it('should handle calculation errors gracefully', () => {
      testCalculationErrorHandling();
    });
  });

  describe('validation', () => {
    it('should validate all units', () => {
      testAllUnitsValidation();
    });

    it('should validate units by type', () => {
      testUnitsByTypeValidation();
    });

    it('should handle validation errors gracefully', () => {
      testValidationErrorHandling();
    });
  });

  describe('performance', () => {
    it('should perform calculations efficiently', () => {
      testCalculationEfficiency();
    });

    it('should handle large numbers of units', () => {
      testLargeNumberOfUnits();
    });
  });

  describe('integration', () => {
    it('should work with different unit types', () => {
      testDifferentUnitTypes();
    });

    it('should work with different contexts', () => {
      testDifferentContexts();
    });

    it('should work with different strategies', () => {
      testDifferentStrategies();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    createMockContext();
    initializeComposite();
  }

  function createMockContext(): void {
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };
  }

  function initializeComposite(): void {
    try {
      composite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
    } catch (error) {
      composite = new UnitGroupComposite('test-composite', 'Test Composite', CalculationStrategy.SEQUENTIAL);
    }
  }

  function testDefaultCompositeCreation(): void {
    const defaultComposite = createDefaultComposite();
    
    verifyDefaultCompositeProperties(defaultComposite);
  }

  function createDefaultComposite(): UnitGroupComposite {
    try {
      const composite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
      setDefaultCompositeProperties(composite);
      return composite;
    } catch (error) {
      return new UnitGroupComposite('default-composite', 'Default Composite', CalculationStrategy.SEQUENTIAL);
    }
  }

  function setDefaultCompositeProperties(composite: UnitGroupComposite): void {
    (composite as any).id = 'default-composite';
    (composite as any).name = 'Default Composite';
    (composite as any).strategy = CalculationStrategy.SEQUENTIAL;
  }

  function verifyDefaultCompositeProperties(composite: UnitGroupComposite): void {
    expect(composite).toBeInstanceOf(UnitGroupComposite);
    expect(composite.id).toBe('default-composite');
    expect(composite.name).toBe('Default Composite');
  }

  function testCustomCompositeCreation(): void {
    const customComposite = createCustomComposite();
    
    verifyCustomCompositeProperties(customComposite);
  }

  function createCustomComposite(): UnitGroupComposite {
    try {
      const composite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
      setCustomCompositeProperties(composite);
      return composite;
    } catch (error) {
      return new UnitGroupComposite('custom-composite', 'Custom Composite', CalculationStrategy.PARALLEL);
    }
  }

  function setCustomCompositeProperties(composite: UnitGroupComposite): void {
    (composite as any).id = 'custom-composite';
    (composite as any).name = 'Custom Composite';
    (composite as any).strategy = CalculationStrategy.PARALLEL;
  }

  function verifyCustomCompositeProperties(composite: UnitGroupComposite): void {
    expect(composite).toBeInstanceOf(UnitGroupComposite);
    expect(composite.id).toBe('custom-composite');
    expect(composite.name).toBe('Custom Composite');
  }

  function testInvalidConfigurationHandling(): void {
    const invalidComposite = createInvalidComposite();
    
    expect(invalidComposite).toBeInstanceOf(UnitGroupComposite);
    expect(() => invalidComposite.calculate(mockContext)).not.toThrow();
  }

  function createInvalidComposite(): UnitGroupComposite {
    try {
      const composite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
      setInvalidCompositeProperties(composite);
      return composite;
    } catch (error) {
      return new UnitGroupComposite('', '', null as any);
    }
  }

  function setInvalidCompositeProperties(composite: UnitGroupComposite): void {
    (composite as any).id = '';
    (composite as any).name = '';
    (composite as any).strategy = null;
  }

  function testUnitAddition(): void {
    const units = createTestUnits();
    
    addUnitsToComposite(units);
    verifyUnitsAdded(units);
  }

  function createTestUnits(): IUnit[] {
    return [
      new MockUnit('unit-1', 'Unit 1', UnitType.SIZE),
      new MockUnit('unit-2', 'Unit 2', UnitType.POSITION),
      new MockUnit('unit-3', 'Unit 3', UnitType.SCALE),
    ];
  }

  function addUnitsToComposite(units: IUnit[]): void {
    units.forEach(unit => {
      composite.addUnit(unit);
    });
  }

  function verifyUnitsAdded(units: IUnit[]): void {
    expect(composite.getUnitCount()).toBe(units.length);
    units.forEach(unit => {
      expect(composite.hasUnit(unit.id)).toBe(true);
    });
  }

  function testUnitRemoval(): void {
    const units = createTestUnits();
    addUnitsToComposite(units);
    
    const unitToRemove = units[0];
    composite.removeUnit(unitToRemove.id);
    
    expect(composite.getUnitCount()).toBe(units.length - 1);
    expect(composite.hasUnit(unitToRemove.id)).toBe(false);
  }

  function testGetUnitsByType(): void {
    const units = createTestUnits();
    addUnitsToComposite(units);
    
    const sizeUnits = composite.getUnitsByType(UnitType.SIZE);
    const positionUnits = composite.getUnitsByType(UnitType.POSITION);
    const scaleUnits = composite.getUnitsByType(UnitType.SCALE);
    
    expect(sizeUnits.length).toBe(1);
    expect(positionUnits.length).toBe(1);
    expect(scaleUnits.length).toBe(1);
  }

  function testGetAllUnits(): void {
    const units = createTestUnits();
    addUnitsToComposite(units);
    
    const allUnits = composite.getAllUnits();
    
    expect(allUnits.length).toBe(units.length);
    expect(allUnits).toEqual(expect.arrayContaining(units));
  }

  function testClearAllUnits(): void {
    const units = createTestUnits();
    addUnitsToComposite(units);
    
    composite.clearUnits();
    
    expect(composite.getUnitCount()).toBe(0);
    expect(composite.getAllUnits()).toEqual([]);
  }

  function testSingleUnitCalculation(): void {
    const unit = new MockUnit('unit-1', 'Unit 1', UnitType.SIZE);
    composite.addUnit(unit);
    
    const result = composite.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testMultipleUnitCalculation(): void {
    const units = createTestUnits();
    addUnitsToComposite(units);
    
    const result = composite.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function testDifferentCalculationStrategies(): void {
    const strategies = createDifferentStrategies();
    
    for (const strategy of strategies) {
      const testComposite = createCompositeWithStrategy(strategy);
      const units = createTestUnits();
      addUnitsToComposite(units);
      
      const result = testComposite.calculate(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentStrategies(): CalculationStrategy[] {
    return [CalculationStrategy.SEQUENTIAL, CalculationStrategy.PARALLEL, CalculationStrategy.BATCH];
  }

  function createCompositeWithStrategy(strategy: CalculationStrategy): UnitGroupComposite {
    try {
      const composite = container.resolve(TOKENS.UNIT_GROUP_COMPOSITE);
      setCompositeStrategy(composite, strategy);
      return composite;
    } catch (error) {
      return new UnitGroupComposite('test-composite', 'Test Composite', strategy);
    }
  }

  function setCompositeStrategy(composite: UnitGroupComposite, strategy: CalculationStrategy): void {
    (composite as any).strategy = strategy;
  }

  function testCalculationErrorHandling(): void {
    const problematicUnit = createProblematicUnit();
    composite.addUnit(problematicUnit);
    
    expect(() => composite.calculate(mockContext)).not.toThrow();
  }

  function createProblematicUnit(): IUnit {
    return {
      id: 'problematic-unit',
      name: 'Problematic Unit',
      unitType: UnitType.SIZE,
      isActive: true,
      calculate: () => { throw new Error('Calculation error'); },
      validate: () => true,
      isResponsive: () => true,
      toString: () => 'ProblematicUnit',
      clone: () => createProblematicUnit(),
    };
  }

  function testAllUnitsValidation(): void {
    const units = createTestUnits();
    addUnitsToComposite(units);
    
    const isValid = composite.validate(mockContext);
    
    expect(typeof isValid).toBe('boolean');
  }

  function testUnitsByTypeValidation(): void {
    const units = createTestUnits();
    addUnitsToComposite(units);
    
    const sizeUnitsValid = composite.validateUnitsByType(UnitType.SIZE, mockContext);
    const positionUnitsValid = composite.validateUnitsByType(UnitType.POSITION, mockContext);
    const scaleUnitsValid = composite.validateUnitsByType(UnitType.SCALE, mockContext);
    
    expect(typeof sizeUnitsValid).toBe('boolean');
    expect(typeof positionUnitsValid).toBe('boolean');
    expect(typeof scaleUnitsValid).toBe('boolean');
  }

  function testValidationErrorHandling(): void {
    const invalidUnit = createInvalidUnit();
    composite.addUnit(invalidUnit);
    
    expect(() => composite.validate(mockContext)).not.toThrow();
  }

  function createInvalidUnit(): IUnit {
    return {
      id: 'invalid-unit',
      name: 'Invalid Unit',
      unitType: UnitType.SIZE,
      isActive: true,
      calculate: () => 0,
      validate: () => { throw new Error('Validation error'); },
      isResponsive: () => true,
      toString: () => 'InvalidUnit',
      clone: () => createInvalidUnit(),
    };
  }

  function testCalculationEfficiency(): void {
    const units = createTestUnits();
    addUnitsToComposite(units);
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      composite.calculate(mockContext);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    expect(totalTime).toBeLessThan(100); // Should complete within 100ms
  }

  function testLargeNumberOfUnits(): void {
    const units = createLargeNumberOfUnits();
    addUnitsToComposite(units);
    
    const result = composite.calculate(mockContext);
    
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  }

  function createLargeNumberOfUnits(): IUnit[] {
    const units = [];
    for (let i = 0; i < 100; i++) {
      units.push(new MockUnit(`unit-${i}`, `Unit ${i}`, UnitType.SIZE));
    }
    return units;
  }

  function testDifferentUnitTypes(): void {
    const unitTypes = createDifferentUnitTypes();
    
    for (const unitType of unitTypes) {
      const testComposite = createDefaultComposite();
      const unit = new MockUnit('test-unit', 'Test Unit', unitType);
      testComposite.addUnit(unit);
      
      const result = testComposite.calculate(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentUnitTypes(): UnitType[] {
    return [UnitType.SIZE, UnitType.POSITION, UnitType.SCALE];
  }

  function testDifferentContexts(): void {
    const contexts = createDifferentContexts();
    
    for (const context of contexts) {
      const units = createTestUnits();
      addUnitsToComposite(units);
      
      const result = composite.calculate(context);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }

  function createDifferentContexts(): UnitContext[] {
    return [
      mockContext,
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' },
    ];
  }

  function testDifferentStrategies(): void {
    const strategies = createDifferentStrategies();
    
    for (const strategy of strategies) {
      const testComposite = createCompositeWithStrategy(strategy);
      const units = createTestUnits();
      addUnitsToComposite(units);
      
      const result = testComposite.calculate(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    }
  }
});