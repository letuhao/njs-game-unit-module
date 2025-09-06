/**
 * Test Utilities
 * Common test utilities and mock objects
 */

import { IUnit } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { Dimension } from '../enums/Dimension';

/**
 * Create mock context for testing
 */
export function createMockContext(): any {
  return {
    parent: { width: 800, height: 600, x: 0, y: 0 },
    scene: { width: 1920, height: 1080 },
    viewport: { width: 1366, height: 768 },
    content: { width: 200, height: 150 },
    breakpoint: { width: 768, height: 1024 },
    device: { type: 'desktop', orientation: 'landscape' },
    theme: { name: 'dark', version: '1.0' },
  };
}

/**
 * Create mock unit for testing
 */
export function createMockUnit(): IUnit {
  return {
    id: 'test-unit',
    name: 'Test Unit',
    unitType: UnitType.SIZE,
    isActive: true,
    calculate: (context: any) => 100,
    validate: (context: any) => true,
    isResponsive: () => true,
    format: (format: string) => {
      switch (format) {
        case 'json':
          return JSON.stringify({ id: 'test-unit-1', value: 100 });
        case 'px':
          return '100px';
        default:
          return '100px';
      }
    },
    clone: () => createMockUnit(),
  };
}

/**
 * Create mock size unit for testing
 */
export function createMockSizeUnit(): IUnit {
  return {
    id: 'test-size-unit',
    name: 'Test Size Unit',
    unitType: UnitType.SIZE,
    isActive: true,
    calculate: (context: any) => 200,
    validate: (context: any) => true,
    isResponsive: () => true,
    format: (format: string) => {
      switch (format) {
        case 'json':
          return JSON.stringify({ id: 'test-unit-2', value: 200 });
        case 'px':
          return '200px';
        default:
          return '200px';
      }
    },
    clone: () => createMockSizeUnit(),
  };
}

/**
 * Create mock position unit for testing
 */
export function createMockPositionUnit(): IUnit {
  return {
    id: 'test-position-unit',
    name: 'Test Position Unit',
    unitType: UnitType.POSITION,
    isActive: true,
    calculate: (context: any) => 150,
    validate: (context: any) => true,
    isResponsive: () => true,
    format: (format: string) => {
      switch (format) {
        case 'json':
          return JSON.stringify({ id: 'test-position-unit', value: 150 });
        case 'px':
          return '150px';
        default:
          return '150px';
      }
    },
    clone: () => createMockPositionUnit(),
  };
}

/**
 * Create mock scale unit for testing
 */
export function createMockScaleUnit(): IUnit {
  return {
    id: 'test-scale-unit',
    name: 'Test Scale Unit',
    unitType: UnitType.SCALE,
    isActive: true,
    calculate: (context: any) => 1.5,
    validate: (context: any) => true,
    isResponsive: () => true,
    format: (format: string) => {
      switch (format) {
        case 'json':
          return JSON.stringify({ id: 'test-scale-unit', value: 1.5 });
        case 'x':
          return '1.5x';
        default:
          return '1.5x';
      }
    },
    clone: () => createMockScaleUnit(),
  };
}

/**
 * Create mock input for testing
 */
export function createMockInput(): any {
  return {
    value: 100,
    unit: SizeUnit.PIXEL,
    dimension: Dimension.WIDTH,
  };
}

/**
 * Create mock validator for testing
 */
export function createMockValidator(): any {
  return {
    validate: (input: any) => true,
    strictMode: true,
  };
}

/**
 * Create mock strategy for testing
 */
export function createMockStrategy(): any {
  return {
    strategyId: 'test-strategy',
    canHandle: (input: any) => true,
    calculate: (input: any, context: any) => 100,
    getPriority: () => 1,
  };
}

/**
 * Create mock registry for testing
 */
export function createMockRegistry(): any {
  return {
    registerStrategy: (strategy: any) => {},
    resolveStrategy: (id: string) => createMockStrategy(),
    getRegisteredStrategies: () => [createMockStrategy()],
    preWarmCache: () => {},
  };
}

/**
 * Create mock manager for testing
 */
export function createMockManager(): any {
  return {
    createUnit: (config: any) => ({ success: true, unit: createMockUnit() }),
    getUnit: (id: string) => createMockUnit(),
    getAllUnits: () => [createMockUnit()],
    updateUnit: (id: string, config: any) => ({ success: true, unit: createMockUnit() }),
    deleteUnit: (id: string) => ({ success: true }),
    calculateUnit: (id: string, context: any) => 100,
    validateUnit: (id: string, context: any) => true,
  };
}

/**
 * Create mock decorator for testing
 */
export function createMockDecorator(): any {
  return {
    decorate: (unit: IUnit) => unit,
    validateInput: (input: any) => true,
    validateContext: (context: any) => true,
    validateUnit: (unit: IUnit) => true,
    wrapUnit: (unit: IUnit) => unit,
  };
}

/**
 * Create mock memento for testing
 */
export function createMockMemento(): any {
  return {
    unitId: 'test-unit',
    unitType: UnitType.SIZE,
    input: createMockInput(),
    context: createMockContext(),
    result: 100,
    timestamp: new Date(),
    isValid: true,
    error: undefined,
  };
}

/**
 * Create mock command for testing
 */
export function createMockCommand(): any {
  return {
    execute: () => ({ success: true, result: 100 }),
    undo: () => ({ success: true }),
    canExecute: () => true,
    getDescription: () => 'Test Command',
  };
}

/**
 * Create mock observer for testing
 */
export function createMockObserver(): any {
  return {
    update: (data: any) => {},
    getId: () => 'test-observer',
    isActive: () => true,
    activate: () => {},
    deactivate: () => {},
  };
}

/**
 * Create mock factory for testing
 */
export function createMockFactory(): any {
  return {
    create: (config: any) => createMockUnit(),
    createFromType: (type: UnitType) => createMockUnit(),
    canCreate: (config: any) => true,
    getSupportedTypes: () => [UnitType.SIZE, UnitType.POSITION, UnitType.SCALE],
  };
}

/**
 * Create mock cache for testing
 */
export function createMockCache(): any {
  return {
    get: (key: string) => undefined,
    set: (key: string, value: any) => {},
    has: (key: string) => false,
    clear: () => {},
    size: () => 0,
  };
}

/**
 * Create mock logger for testing
 */
export function createMockLogger(): any {
  return {
    debug: (message: string, data?: any) => {},
    info: (message: string, data?: any) => {},
    warn: (message: string, data?: any) => {},
    error: (message: string, data?: any) => {},
    log: (level: string, message: string, data?: any) => {},
  };
}

/**
 * Create mock performance monitor for testing
 */
export function createMockPerformanceMonitor(): any {
  return {
    startTimer: (name: string) => {},
    endTimer: (name: string) => 100,
    getMetrics: () => ({ totalTime: 100, averageTime: 50, callCount: 2 }),
    reset: () => {},
  };
}

/**
 * Create mock validation result for testing
 */
export function createMockValidationResult(): any {
  return {
    isValid: true,
    errors: [],
    warnings: [],
    data: {},
  };
}

/**
 * Create mock calculation result for testing
 */
export function createMockCalculationResult(): any {
  return {
    success: true,
    result: 100,
    unit: 'px',
    context: createMockContext(),
    timestamp: new Date(),
  };
}

/**
 * Create mock error for testing
 */
export function createMockError(): Error {
  return new Error('Test error');
}

/**
 * Create mock configuration for testing
 */
export function createMockConfig(): any {
  return {
    id: 'test-config',
    name: 'Test Configuration',
    unitType: UnitType.SIZE,
    value: 100,
    unit: SizeUnit.PIXEL,
    dimension: Dimension.WIDTH,
    enabled: true,
    strict: false,
  };
}

/**
 * Create mock context with specific properties
 */
export function createMockContextWith(properties: Partial<any>): any {
  return {
    ...createMockContext(),
    ...properties,
  };
}

/**
 * Create mock unit with specific properties
 */
export function createMockUnitWith(properties: Partial<IUnit>): IUnit {
  return {
    ...createMockUnit(),
    ...properties,
  };
}

/**
 * Create mock input with specific properties
 */
export function createMockInputWith(properties: Partial<any>): any {
  return {
    ...createMockInput(),
    ...properties,
  };
}

/**
 * Wait for async operations to complete
 */
export function waitForAsync(ms: number = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create a spy function for testing
 */
export function createSpy(): jest.Mock {
  return jest.fn();
}

/**
 * Create a mock function that returns a specific value
 */
export function createMockFunction<T>(returnValue: T): jest.Mock<T> {
  return jest.fn(() => returnValue);
}

/**
 * Create a mock function that throws an error
 */
export function createMockErrorFunction(error: Error): jest.Mock {
  return jest.fn(() => {
    throw error;
  });
}

/**
 * Create a mock function that resolves to a specific value
 */
export function createMockPromiseFunction<T>(returnValue: T): jest.Mock<Promise<T>> {
  return jest.fn(() => Promise.resolve(returnValue));
}

/**
 * Create a mock function that rejects with an error
 */
export function createMockRejectFunction(error: Error): jest.Mock<Promise<never>> {
  return jest.fn(() => Promise.reject(error));
}

// Calculator helper functions
export function setCalculatorProperties(calculator: any): void {
  // Set default properties for calculators
  if (calculator.setMinSize) calculator.setMinSize(1);
  if (calculator.setMaxSize) calculator.setMaxSize(1000);
  if (calculator.setMaintainAspectRatio) calculator.setMaintainAspectRatio(false);
}

export function setCalculatorPropertiesForDimension(calculator: any, dimension: any): void {
  setCalculatorProperties(calculator);
  // Additional dimension-specific properties can be set here
}

export function setCalculatorPropertiesForUnit(calculator: any, unit: any): void {
  setCalculatorProperties(calculator);
  // Additional unit-specific properties can be set here
}

export function setCalculatorPropertiesForConfiguration(calculator: any, config: any): void {
  setCalculatorProperties(calculator);
  // Additional configuration-specific properties can be set here
}

// Validator helper functions
export function setCustomValidatorProperties(validator: any, allowedTypes?: any[], allowedDimensions?: any[], strictMode?: boolean): void {
  if (allowedTypes) validator.allowedTypes = allowedTypes;
  if (allowedDimensions) validator.allowedDimensions = allowedDimensions;
  if (strictMode !== undefined) validator.strictMode = strictMode;
}

export function setInvalidValidatorProperties(validator: any): void {
  validator.allowedTypes = [];
  validator.allowedDimensions = [];
  validator.strictMode = false;
}

// Memento helper functions
export function setMementoProperties(memento: any): void {
  // Set default memento properties
  if (memento.setTemplateName) memento.setTemplateName('test-template');
  if (memento.setStrategyName) memento.setStrategyName('test-strategy');
  if (memento.setValidatorNames) memento.setValidatorNames(['test-validator']);
  if (memento.setIsSuccess) memento.setIsSuccess(true);
  if (memento.setError) memento.setError(undefined);
}

export function setDefaultMementoProperties(memento: any): void {
  setMementoProperties(memento);
}

export function setMementoWithMissingProperties(memento: any): void {
  // Set memento with some missing properties for testing
  if (memento.setTemplateName) memento.setTemplateName('test-template');
  if (memento.setStrategyName) memento.setStrategyName('test-strategy');
}

export function setMementoWithUnitType(memento: any, unitType: any): void {
  setMementoProperties(memento);
  if (memento.setUnitType) memento.setUnitType(unitType);
}

export function setMementoWithContext(memento: any, context: any): void {
  setMementoProperties(memento);
  if (memento.setContext) memento.setContext(context);
}

export function setMementoWithPerformanceMetrics(memento: any, metrics: any): void {
  setMementoProperties(memento);
  if (memento.setPerformanceMetrics) memento.setPerformanceMetrics(metrics);
}

// Composite helper functions
export function setDefaultCompositeProperties(composite: any): void {
  // Set default composite properties
  if (composite.setStrategy) composite.setStrategy('sequential');
}

export function setCustomCompositeProperties(composite: any): void {
  setDefaultCompositeProperties(composite);
  // Additional custom properties can be set here
}

export function setInvalidCompositeProperties(composite: any): void {
  // Set invalid composite properties for testing
  if (composite.setStrategy) composite.setStrategy('invalid-strategy');
}

export function setCompositeStrategy(composite: any, strategy: any): void {
  setDefaultCompositeProperties(composite);
  if (composite.setStrategy) composite.setStrategy(strategy);
}

// Manager helper functions
export function setCustomManagerProperties(manager: any): void {
  // Set custom manager properties
  if (manager.setMaxUnits) manager.setMaxUnits(100);
  if (manager.setCacheSize) manager.setCacheSize(50);
}

export function setInvalidManagerProperties(manager: any): void {
  // Set invalid manager properties for testing
  if (manager.setMaxUnits) manager.setMaxUnits(-1);
  if (manager.setCacheSize) manager.setCacheSize(-1);
}

// Decorator helper functions
export function setDefaultDecoratorProperties(decorator: any): void {
  // Set default decorator properties
  if (decorator.setStrictMode) decorator.setStrictMode(false);
}

export function setCustomDecoratorProperties(decorator: any): void {
  setDefaultDecoratorProperties(decorator);
  // Additional custom properties can be set here
}

export function setInvalidDecoratorProperties(decorator: any): void {
  // Set invalid decorator properties for testing
  if (decorator.setStrictMode) decorator.setStrictMode(true);
}

export function setDecoratorWithUnit(decorator: any, unit: any): void {
  setDefaultDecoratorProperties(decorator);
  if (decorator.setUnit) decorator.setUnit(unit);
}

export function setDecoratorWithValidator(decorator: any, validator: any): void {
  setDefaultDecoratorProperties(decorator);
  if (decorator.setValidator) decorator.setValidator(validator);
}
