# File-by-File Issues & Fixes

> Paths relative to `unit/`. This list focuses on hotspots found by scanning conditionals and responsibilities.

## adapters/LegacyPositionUnitAdapter.ts
- **Issue:** Large conditional mapping of legacy inputs → modern fields (SRP, OCP).
- **Fix:** Extract mapping functions per legacy version and register them via `ILegacyAdapterRegistry`.

## adapters/LegacySizeUnitAdapter.ts
- **Issue:** Same as above; repetitive conditionals.
- **Fix:** Strategy-based translators; unit tests for each legacy schema sample.

## classes/UnitCalculatorFactory.ts
- **Issue:** Creation + analysis/stats in one class (SRP). Imports concretes (DIP).
- **Fix:** Move analysis to `services/CalculatorIntrospectionService.ts`. Convert factory to request dependencies from `container.ts` using tokens.

## classes/RefactoredSizeUnitCalculator.ts
- **Issue:** Still imports `Logger` and default fallbacks (SRP). Contains branching by `SizeUnit` (OCP).
- **Fix:** Remove logging; use decorator. Replace branching with `SizeValueCalculationStrategyRegistry` lookups.

## classes/RefactoredPositionUnitCalculator.ts
- **Issue:** Similar to size; conditional branches and optional alignment logic inline.
- **Fix:** Extract `AlignmentStrategy` and `OffsetPolicy` to strategy registry.

## classes/ScaleUnitCalculator.ts` / `RefactoredScaleUnitCalculator.ts`
- **Issue:** Mixed concerns: numeric calc + constraints + defaulting.
- **Fix:** Split into (a) strategy calc, (b) `ConstraintPolicy` strategy, (c) `FallbackProvider` injected.

## monitoring/ProductionMonitoringSystem.ts
- **Issue:** Collection + threshold policy + alerting in one place.
- **Fix:** Split into `IMetricsSink`, `IHealthPolicy`, `IAlertEmitter`. Wire via DI. Keep domain unaware.

## strategies/* (Size/Position/Mixed)
- **Issue:** Strategy classes exist but still include conditional sub-branches.
- **Fix:** Flatten by moving each variant to its own strategy file and register them.

## validators/RangeValidator.ts & TypeValidator.ts
- **Issue:** High conditional density; error message formatting logic inline.
- **Fix:** Extract message builders. Provide a `ValidationPipeline` to chain validators.

## commands/BatchCalculationCommand.ts
- **Issue:** Orchestration includes validation and formatting logic.
- **Fix:** Convert to template method steps: parse → validate → execute → format.

## mementos/*
- **Issue:** Caretaker and manager hold policy decisions (e.g., retention).
- **Fix:** Inject `IMementoRetentionPolicy` from config; keep storage opaque to domain.

---

## Cross-Cutting Fixes

1. **Replace magic numbers** with named constants in `constants/`.
2. **Turn strategies into pure functions**: `(ctx, input) => output` with no side-effects.
3. **Add `Result<T, E>` type** to avoid throwing in normal control flow.
