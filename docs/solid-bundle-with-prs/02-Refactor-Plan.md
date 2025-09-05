# Refactor Plan — Cursor Execution Guide

This plan is incremental and safe. Each phase ends with acceptance criteria and test gates.

> Start each phase on a short-lived branch. Merge only when tests pass.

## Phase 1 — Introduce Narrow Interfaces & Type Segregation

**Goal:** Reduce fat interfaces and clarify responsibilities.

**Tasks**
1. Split `interfaces/IUnit.ts` into minimal read-only contracts used by calculators:
   - `IUnitContext` (env/screen/viewport hints)
   - `ISizeUnitCalculator`, `IPositionUnitCalculator`, `IScaleUnitCalculator` (pure calculate APIs)
2. Update consumers to depend only on these narrow interfaces.
3. Remove any `throw new Error("Not implemented")` from interface implementations.

**Acceptance Criteria**
- No interface method returns `never` or throws for "not implemented".
- All calculators expose **pure** `calculate(..)` methods returning value + diagnostics.

## Phase 2 — Strategy Registry (OCP)

**Goal:** Add behaviors without editing existing code.

**Tasks**
1. Create registries:
   - `strategies/value/SizeValueCalculationStrategyRegistry.ts`
   - `strategies/value/PositionValueCalculationStrategyRegistry.ts`
2. Replace conditionals in calculators with registry lookups:
   - Register strategy by key (e.g., `SizeUnit.PERCENT_WIDTH`, `PositionUnit.CENTER_X`, ...).
   - Move current branches into separate strategy classes/functions.
3. Add a single extension point: `registry.register(key, strategy)`.

**Acceptance Criteria**
- Adding a new variant only touches a new strategy file + registration code.
- Branch counts in calculators reduced by ≥70%.

## Phase 3 — Dependency Inversion (DIP)

**Goal:** Decouple creation from usage.

**Tasks**
1. Introduce a minimal DI container (`container.ts`) with maps for tokens→constructors.
2. Bind interfaces to implementations in one module:
   - `ISizeUnitCalculator` → `RefactoredSizeUnitCalculator`
   - `IPositionUnitCalculator` → `RefactoredPositionUnitCalculator`
3. Refactor `UnitCalculatorFactory` to request dependencies by token instead of importing concretes.

**Acceptance Criteria**
- Unit tests can swap implementations by rebinding tokens without touching production code.

## Phase 4 — SRP: Split Orchestration vs Computation

**Goal:** Keep calculators pure and small.

**Tasks**
1. Move logging/validation/caching out of `*Calculator` classes:
   - Use decorators: `ValidationDecorator`, `CachingDecorator` (already present — rewire to wrap, not embed).
2. Ensure calculators perform only numeric transformation; decorators handle cross-cutting concerns.

**Acceptance Criteria**
- Calculators have no imports from `Logger`, `validators`, or caches.
- Decorator tests prove behavior composition order.

## Phase 5 — Anti-Legacy Adapters

**Goal:** Contain legacy decision paths.

**Tasks**
1. Freeze `adapters/Legacy*` behind a `ILegacyAdapter` interface.
2. Add translation strategies to map legacy inputs → modern strategy keys.

**Acceptance Criteria**
- No new code imports `Legacy*` directly.
- Coverage includes translation edge cases formerly handled by `if/else` ladders.

## Phase 6 — Observability Boundaries

**Goal:** Separate monitoring/reporting from domain logic.

**Tasks**
1. Extract `monitoring/ProductionMonitoringSystem.ts` policy thresholds into `MonitoringConfig` with DI-provided config.
2. Expose an `IMetrics` interface used by orchestrators only (not calculators).

**Acceptance Criteria**
- Domain layer has zero dependency on monitoring/logging packages.

## Phase 7 — Harden Tests & Contracts

**Goal:** Prevent regressions.

**Tasks**
1. Add golden tests for each strategy input/output pair.
2. Add mutation tests (or differential tests) for calculators to lock math semantics.
3. Turn on coverage gate ≥ 90% for `strategies` and `calculators` folders.

**Acceptance Criteria**
- PR fails if a strategy output changes without updating snapshot/golden spec.

## Phase 8 — Performance Pass

**Goal:** Keep hot paths fast without harming readability.

**Tasks**
1. Micro-profile `strategies/value/*` with 1e6 iterations; ensure GC-neutral loops.
2. Inline tiny functions in hot paths if benchmarks prove it.
3. Offer a `fast` build flag to reduce diagnostics for production.

**Acceptance Criteria**
- 20–30% speedup on synthetic benchmarks; no public API changes.

