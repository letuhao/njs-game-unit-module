# Design Patterns Guide — Before/After

## 1) Strategy + Registry (replace conditionals)

**Before (simplified):**
```ts
switch (unit) {
  case SizeUnit.PERCENT_WIDTH: /* calc */ break;
  case SizeUnit.PERCENT_HEIGHT: /* calc */ break;
  // many more...
}
```

**After:**
```ts
// strategies/value/size/PercentWidthStrategy.ts
export const PercentWidthStrategy: SizeStrategy = (ctx, input) => /* calc */;

// registry
registry.register(SizeUnit.PERCENT_WIDTH, PercentWidthStrategy);

// usage
const strategy = registry.resolve(input.unit);
return strategy(ctx, input);
```

## 2) Decorator (validation, caching, logging)

Keep calculators pure and decorate them:

```ts
const core = container.resolve<ISizeUnitCalculator>('ISizeUnitCalculator');
const validated = new ValidationDecorator(core, [RangeValidator, TypeValidator]);
const cached = new CachingDecorator(validated, cache);
const instrumented = new LoggingDecorator(cached, logger);
export default instrumented;
```

## 3) Factory → Composition Root (DIP)

Move wiring from `UnitCalculatorFactory` into a composition root (`container.ts`), so tests can swap implementations.

## 4) Template Method (repeatable pipelines)

For `commands/*`, extract a template (parse → validate → calculate → format) to reduce duplication.

## 5) Memento (already present)

Ensure memento objects store serializable calculation inputs/outputs; caretakers live outside calculators.
