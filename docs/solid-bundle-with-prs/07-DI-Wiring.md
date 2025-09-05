# Dependency Inversion Wiring

Introduce a tiny DI container (no external libs required).

```ts
type Token<T> = string & { __brand: T };
const container = new Map<string, any>();

export function bind<T>(token: Token<T>, ctor: new (...args: any[]) => T) {
  container.set(token, new ctor());
}
export function resolve<T>(token: Token<T>): T {
  const s = container.get(token);
  if (!s) throw new Error(`Token not bound: ${token}`);
  return s as T;
}

// tokens
export const TOKENS = {
  SizeCalc: 'ISizeUnitCalculator' as Token<ISizeUnitCalculator>,
  PositionCalc: 'IPositionUnitCalculator' as Token<IPositionUnitCalculator>,
  ScaleCalc: 'IScaleUnitCalculator' as Token<IScaleUnitCalculator>,
};
```

In the composition root (`container.ts`):

```ts
bind(TOKENS.SizeCalc, RefactoredSizeUnitCalculator);
bind(TOKENS.PositionCalc, RefactoredPositionUnitCalculator);
bind(TOKENS.ScaleCalc, RefactoredScaleUnitCalculator);
```

Consumers request by token, not by concrete imports.
