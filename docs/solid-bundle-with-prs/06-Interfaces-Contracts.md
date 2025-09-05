# Interfaces & Contracts

## New Minimal Interfaces

```ts
export interface IUnitContext {
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio?: number;
}

export interface CalculationInput<TUnit> {
  unit: TUnit;
  value: number | string;
  meta?: Record<string, unknown>;
}

export interface CalculationOutput {
  value: number;
  diagnostics?: Record<string, unknown>;
}

export interface ISizeUnitCalculator {
  calculate(ctx: IUnitContext, input: CalculationInput<SizeUnit>): CalculationOutput;
}

export interface IPositionUnitCalculator {
  calculate(ctx: IUnitContext, input: CalculationInput<PositionUnit>): CalculationOutput;
}

export interface IScaleUnitCalculator {
  calculate(ctx: IUnitContext, input: CalculationInput<ScaleUnit>): CalculationOutput;
}
```

## Strategy Types

```ts
export type SizeStrategy = (ctx: IUnitContext, input: CalculationInput<SizeUnit>) => CalculationOutput;
export type PositionStrategy = (ctx: IUnitContext, input: CalculationInput<PositionUnit>) => CalculationOutput;
export type ScaleStrategy = (ctx: IUnitContext, input: CalculationInput<ScaleUnit>) => CalculationOutput;
```

## Result Type (No Throwing)

```ts
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
```

## Segregation Map

- Orchestrators depend on: calculators (interfaces), validators, and metrics interfaces.
- Calculators depend only on: strategy registries and fallbacks.
- Strategies depend only on: math & constants.
- Monitoring/Logging depend on: orchestrators, never calculators.
