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
    calculate: (context: any) => 100,
    validate: (context: any) => true,
    format: (format: string) => '100px',
    clone: () => createMockUnit(),
    getState: () => ({ initialized: true }),
    setState: (state: any) => {},
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
    calculate: (context: any) => 200,
    validate: (context: any) => true,
    format: (format: string) => '200px',
    clone: () => createMockSizeUnit(),
    getState: () => ({ initialized: true }),
    setState: (state: any) => {},
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
    calculate: (context: any) => 150,
    validate: (context: any) => true,
    format: (format: string) => '150px',
    clone: () => createMockPositionUnit(),
    getState: () => ({ initialized: true }),
    setState: (state: any) => {},
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
    calculate: (context: any) => 1.5,
    validate: (context: any) => true,
    format: (format: string) => '1.5x',
    clone: () => createMockScaleUnit(),
    getState: () => ({ initialized: true }),
    setState: (state: any) => {},
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
