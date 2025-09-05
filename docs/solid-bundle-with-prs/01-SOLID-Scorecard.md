# SOLID Scorecard — `unit`

Overall score: **6.6 / 10**

| Principle | Score | Key Risks |
|---|---:|---|
| SRP — Single Responsibility | **6.5** | God-classes mixing computation, orchestration, and logging; utilities with unrelated helpers |
| OCP — Open/Closed | **6.0** | Adding new size/position behaviors requires editing conditionals instead of extension |
| LSP — Liskov Substitution | **8.5** | Mostly OK; shallow inheritance; interfaces respected |
| ISP — Interface Segregation | **6.5** | Fat interfaces; some implementations with `throw new Error("Not implemented")` |
| DIP — Dependency Inversion | **5.5** | High-level logic depends on concrete classes instead of abstractions; DI not systematic |

## Evidence Snapshots

> Note: Paths are relative to `unit/`.

### Conditional Complexity (OCP pressure)
- `adapters/LegacyPositionUnitAdapter.ts`, `adapters/LegacySizeUnitAdapter.ts`
- `classes/Refactored*Calculator.ts`, `classes/*Calculator.ts`
- `strategies/*Strategy.ts`, `validators/*Validator.ts`

Multiple `if/else` and `switch` branches hint that variants are added by editing code instead of registering new behaviors.

### Mixed Responsibilities (SRP breaks)
- `classes/UnitCalculatorFactory.ts` — creation, analysis (stats), and implicit policy knowledge.
- `classes/*Calculator.ts` — computation + caching/logging/validation concerns bleed in some places.
- `monitoring/ProductionMonitoringSystem.ts` — collection, health checks, policy thresholds, and alerting stubs in one place.

### Fat Interfaces (ISP breaks)
- `interfaces/IUnit*.ts`, `interfaces/IStrategyInput.ts` — some types bundle too many fields for all consumers.

### Direct Concrete Dependencies (DIP breaks)
- Factory & strategies directly import concrete calculator classes rather than interfaces; no container to swap implementations at runtime/test.

## Consequences
- **Fragility**: new unit types or value policies require risky edits in multiple files.
- **Low testability**: tight coupling to concretes; hard to mock.
- **Performance risk**: logic lives in monolith calculators; late micro-optimizations bleed into domain logic.

See `04-File-by-File-Issues.md` for concrete locations and fixes.
