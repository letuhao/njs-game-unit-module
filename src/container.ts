// Minimal DI Container (no external deps)
export type Token<T> = string & { __brand: T };

const container = new Map<string, any>();

export function bind<T>(token: Token<T>, factory: () => T) {
  container.set(token, { factory, instance: undefined as T | undefined });
}

export function bindInstance<T>(token: Token<T>, instance: T) {
  container.set(token, { factory: undefined, instance });
}

export function resolve<T>(token: Token<T>): T {
  const slot = container.get(token);
  if (!slot) throw new Error(`Token not bound: ${token}`);
  if (slot.instance) return slot.instance as T;
  if (slot.factory) {
    const inst = slot.factory();
    slot.instance = inst;
    return inst;
  }
  throw new Error(`Token bound without factory/instance: ${token}`);
}

// Tokens
export const TOKENS = {
  SizeCalc: 'ISizeUnitCalculator' as Token<ISizeUnitCalculator>,
  PositionCalc: 'IPositionUnitCalculator' as Token<IPositionUnitCalculator>,
  ScaleCalc: 'IScaleUnitCalculator' as Token<IScaleUnitCalculator>,
};

// Interfaces (adjust paths/types to your project)
export interface IUnitContext { viewportWidth: number; viewportHeight: number; devicePixelRatio?: number; }
export interface CalculationInput<TUnit> { unit: TUnit; value: number | string; meta?: Record<string, unknown>; }
export interface CalculationOutput { value: number; diagnostics?: Record<string, unknown>; }
export interface ISizeUnitCalculator { calculate(ctx: IUnitContext, input: CalculationInput<any>): CalculationOutput; }
export interface IPositionUnitCalculator { calculate(ctx: IUnitContext, input: CalculationInput<any>): CalculationOutput; }
export interface IScaleUnitCalculator { calculate(ctx: IUnitContext, input: CalculationInput<any>): CalculationOutput; }
