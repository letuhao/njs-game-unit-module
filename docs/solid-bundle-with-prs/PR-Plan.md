# PR Plan — Batches for Cursor

_Generated: 20250905-1444_

## P1-Interfaces: batch 1

**Branch:** `p1-interfaces-01-20250905-1444`

**Tasks:**
- - [ ] ISP:FatInterface at `unit/composites/IUnitComposite.ts:9` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/decorators/IUnitDecorator.ts:9` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/IPhaserUnitContext.ts:9` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/IPositionUnit.ts:10` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/IScaleUnit.ts:9` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/ISizeUnit.ts:10` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/IStrategyInput.ts:35` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)

**Suggested commits (one per file):**
- refactor(unit/composites/IUnitComposite.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/decorators/IUnitDecorator.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/interfaces/IPhaserUnitContext.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/interfaces/IPositionUnit.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/interfaces/IScaleUnit.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/interfaces/ISizeUnit.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/interfaces/IStrategyInput.ts): isp:fatinterface — apply SOLID fixes

**PR Description Template:**

```
P1-Interfaces: batch 1

- Phase: P1-Interfaces
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p1-interfaces-01-20250905-1444
# (edit files)
git add -A
git commit -m "P1-Interfaces: batch 1: apply SOLID fixes"
# push and open PR on your platform
```

## P1-Interfaces: batch 2

**Branch:** `p1-interfaces-02-20250905-1444`

**Tasks:**
- - [ ] ISP:FatInterface at `unit/interfaces/IStrategyInput.ts:72` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/IStrategyInput.ts:109` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/IUnit.ts:65` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/strategy/IPositionStrategyInput.ts:10` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/strategy/ISizeStrategyInput.ts:10` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/strategy/IStrategyInput.ts:11` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/interfaces/strategy/IStrategyInput.ts:50` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)

**Suggested commits (one per file):**
- refactor(unit/interfaces/IStrategyInput.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/interfaces/IUnit.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/interfaces/strategy/IPositionStrategyInput.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/interfaces/strategy/ISizeStrategyInput.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/interfaces/strategy/IStrategyInput.ts): isp:fatinterface — apply SOLID fixes

**PR Description Template:**

```
P1-Interfaces: batch 2

- Phase: P1-Interfaces
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p1-interfaces-02-20250905-1444
# (edit files)
git add -A
git commit -m "P1-Interfaces: batch 2: apply SOLID fixes"
# push and open PR on your platform
```

## P1-Interfaces: batch 3

**Branch:** `p1-interfaces-03-20250905-1444`

**Tasks:**
- - [ ] ISP:FatInterface at `unit/managers/CommandManager.ts:11` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/managers/ObserverManager.ts:10` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/managers/PerformanceManager.ts:9` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/managers/StrategyManager.ts:10` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/managers/UnitRegistryManager.ts:18` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/managers/UnitSystemManager.ts:24` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/managers/ValidationManager.ts:12` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)

**Suggested commits (one per file):**
- refactor(unit/managers/CommandManager.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/managers/ObserverManager.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/managers/PerformanceManager.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/managers/StrategyManager.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/managers/UnitRegistryManager.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/managers/UnitSystemManager.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/managers/ValidationManager.ts): isp:fatinterface — apply SOLID fixes

**PR Description Template:**

```
P1-Interfaces: batch 3

- Phase: P1-Interfaces
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p1-interfaces-03-20250905-1444
# (edit files)
git add -A
git commit -m "P1-Interfaces: batch 3: apply SOLID fixes"
# push and open PR on your platform
```

## P1-Interfaces: batch 4

**Branch:** `p1-interfaces-04-20250905-1444`

**Tasks:**
- - [ ] ISP:FatInterface at `unit/mementos/IUnitMemento.ts:5` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/mementos/IUnitMemento.ts:124` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/monitoring/ProductionMonitoringSystem.ts:21` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/observers/IUnitObserver.ts:29` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/strategies/cache/IStrategyCache.ts:32` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/strategies/composition/IStrategyComposer.ts:7` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/strategies/value-calculation/IPositionValueCalculationStrategy.ts:50` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)

**Suggested commits (one per file):**
- refactor(unit/mementos/IUnitMemento.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/monitoring/ProductionMonitoringSystem.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/observers/IUnitObserver.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/strategies/cache/IStrategyCache.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/strategies/composition/IStrategyComposer.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/strategies/value-calculation/IPositionValueCalculationStrategy.ts): isp:fatinterface — apply SOLID fixes

**PR Description Template:**

```
P1-Interfaces: batch 4

- Phase: P1-Interfaces
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p1-interfaces-04-20250905-1444
# (edit files)
git add -A
git commit -m "P1-Interfaces: batch 4: apply SOLID fixes"
# push and open PR on your platform
```

## P1-Interfaces: batch 5

**Branch:** `p1-interfaces-05-20250905-1444`

**Tasks:**
- - [ ] ISP:FatInterface at `unit/strategies/value-calculation/IScaleValueCalculationStrategy.ts:43` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)
- - [ ] ISP:FatInterface at `unit/templates/IUnitCalculationTemplate.ts:9` → Split into narrowly-scoped interfaces per responsibility. (How: Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).)

**Suggested commits (one per file):**
- refactor(unit/strategies/value-calculation/IScaleValueCalculationStrategy.ts): isp:fatinterface — apply SOLID fixes
- refactor(unit/templates/IUnitCalculationTemplate.ts): isp:fatinterface — apply SOLID fixes

**PR Description Template:**

```
P1-Interfaces: batch 5

- Phase: P1-Interfaces
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p1-interfaces-05-20250905-1444
# (edit files)
git add -A
git commit -m "P1-Interfaces: batch 5: apply SOLID fixes"
# push and open PR on your platform
```

## P2-Strategy-Registry: batch 1

**Branch:** `p2-strategy-registry-01-20250905-1444`

**Tasks:**
- - [ ] OCP:LargeSwitch at `unit/classes/PositionUnitCalculator.ts:52` → Replace switch on `this.positionUnit` (19 branches) with Strategy Registry. (How: Create a strategy function per case and register by key; resolve at runtime.)
- - [ ] OCP:LargeSwitch at `unit/classes/ScaleUnitCalculator.ts:52` → Replace switch on `this.scaleUnit` (12 branches) with Strategy Registry. (How: Create a strategy function per case and register by key; resolve at runtime.)
- - [ ] OCP:LargeSwitch at `unit/classes/SizeUnitCalculator.ts:55` → Replace switch on `this.sizeUnit` (9 branches) with Strategy Registry. (How: Create a strategy function per case and register by key; resolve at runtime.)
- - [ ] OCP:LargeSwitch at `unit/classes/SizeUnitCalculator.ts:295` → Replace switch on `this.sizeUnit` (9 branches) with Strategy Registry. (How: Create a strategy function per case and register by key; resolve at runtime.)
- - [ ] OCP:LargeSwitch at `unit/composites/UnitGroupComposite.ts:136` → Replace switch on `this.calculationStrategy` (6 branches) with Strategy Registry. (How: Create a strategy function per case and register by key; resolve at runtime.)
- - [ ] OCP:LargeSwitch at `unit/observers/LoggingObserver.ts:97` → Replace switch on `level` (5 branches) with Strategy Registry. (How: Create a strategy function per case and register by key; resolve at runtime.)
- - [ ] OCP:LargeSwitch at `unit/strategies/MixedUnitStrategy.ts:257` → Replace switch on `unit` (5 branches) with Strategy Registry. (How: Create a strategy function per case and register by key; resolve at runtime.)

**Suggested commits (one per file):**
- refactor(unit/classes/PositionUnitCalculator.ts): ocp:largeswitch — apply SOLID fixes
- refactor(unit/classes/ScaleUnitCalculator.ts): ocp:largeswitch — apply SOLID fixes
- refactor(unit/classes/SizeUnitCalculator.ts): ocp:largeswitch — apply SOLID fixes
- refactor(unit/composites/UnitGroupComposite.ts): ocp:largeswitch — apply SOLID fixes
- refactor(unit/observers/LoggingObserver.ts): ocp:largeswitch — apply SOLID fixes
- refactor(unit/strategies/MixedUnitStrategy.ts): ocp:largeswitch — apply SOLID fixes

**PR Description Template:**

```
P2-Strategy-Registry: batch 1

- Phase: P2-Strategy-Registry
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p2-strategy-registry-01-20250905-1444
# (edit files)
git add -A
git commit -m "P2-Strategy-Registry: batch 1: apply SOLID fixes"
# push and open PR on your platform
```

## P2-Strategy-Registry: batch 2

**Branch:** `p2-strategy-registry-02-20250905-1444`

**Tasks:**
- - [ ] OCP:LargeSwitch at `unit/strategies/PositionUnitStrategy.ts:141` → Replace switch on `input` (6 branches) with Strategy Registry. (How: Create a strategy function per case and register by key; resolve at runtime.)
- - [ ] OCP:LargeSwitch at `unit/strategies/ScaleUnitStrategy.ts:133` → Replace switch on `input` (7 branches) with Strategy Registry. (How: Create a strategy function per case and register by key; resolve at runtime.)
- - [ ] OCP:IfChain at `unit/strategies/value/PositionValueCalculationStrategies.ts:105-115` → Flatten 3 branch chain on `axisUnit` to a registry lookup. (How: Map keys to handler functions; remove conditional duplication.)
- - [ ] OCP:IfChain at `unit/strategies/value/SizeValueCalculationStrategies.ts:108-131` → Flatten 7 branch chain on `dimension` to a registry lookup. (How: Map keys to handler functions; remove conditional duplication.)
- - [ ] OCP:IfChain at `unit/strategies/value/SizeValueCalculationStrategies.ts:110-131` → Flatten 6 branch chain on `dimension` to a registry lookup. (How: Map keys to handler functions; remove conditional duplication.)
- - [ ] OCP:IfChain at `unit/strategies/value/SizeValueCalculationStrategies.ts:112-131` → Flatten 5 branch chain on `dimension` to a registry lookup. (How: Map keys to handler functions; remove conditional duplication.)
- - [ ] OCP:IfChain at `unit/strategies/value/SizeValueCalculationStrategies.ts:118-131` → Flatten 5 branch chain on `dimension` to a registry lookup. (How: Map keys to handler functions; remove conditional duplication.)

**Suggested commits (one per file):**
- refactor(unit/strategies/PositionUnitStrategy.ts): ocp:largeswitch — apply SOLID fixes
- refactor(unit/strategies/ScaleUnitStrategy.ts): ocp:largeswitch — apply SOLID fixes
- refactor(unit/strategies/value/PositionValueCalculationStrategies.ts): ocp:ifchain — apply SOLID fixes
- refactor(unit/strategies/value/SizeValueCalculationStrategies.ts): ocp:ifchain — apply SOLID fixes

**PR Description Template:**

```
P2-Strategy-Registry: batch 2

- Phase: P2-Strategy-Registry
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p2-strategy-registry-02-20250905-1444
# (edit files)
git add -A
git commit -m "P2-Strategy-Registry: batch 2: apply SOLID fixes"
# push and open PR on your platform
```

## P2-Strategy-Registry: batch 3

**Branch:** `p2-strategy-registry-03-20250905-1444`

**Tasks:**
- - [ ] OCP:IfChain at `unit/strategies/value/SizeValueCalculationStrategies.ts:120-131` → Flatten 4 branch chain on `dimension` to a registry lookup. (How: Map keys to handler functions; remove conditional duplication.)
- - [ ] OCP:IfChain at `unit/strategies/value/SizeValueCalculationStrategies.ts:122-131` → Flatten 3 branch chain on `dimension` to a registry lookup. (How: Map keys to handler functions; remove conditional duplication.)
- - [ ] OCP:IfChain at `unit/strategies/value/SizeValueCalculationStrategies.ts:128-131` → Flatten 3 branch chain on `dimension` to a registry lookup. (How: Map keys to handler functions; remove conditional duplication.)
- - [ ] OCP:IfChain at `unit/strategies/value/SizeValueCalculationStrategies.ts:186-189` → Flatten 3 branch chain on `dimension` to a registry lookup. (How: Map keys to handler functions; remove conditional duplication.)

**Suggested commits (one per file):**
- refactor(unit/strategies/value/SizeValueCalculationStrategies.ts): ocp:ifchain — apply SOLID fixes

**PR Description Template:**

```
P2-Strategy-Registry: batch 3

- Phase: P2-Strategy-Registry
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p2-strategy-registry-03-20250905-1444
# (edit files)
git add -A
git commit -m "P2-Strategy-Registry: batch 3: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 1

**Branch:** `p3-di-01-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/adapters/IUnitAdapter.ts:90` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/adapters/LegacyPositionUnitAdapter.ts:70` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/adapters/LegacySizeUnitAdapter.ts:72` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/classes/EnhancedSizeUnitCalculator.ts:66` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/classes/PositionUnitCalculator.ts:169` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/classes/RandomValueNumber.ts:14` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/classes/RefactoredPositionUnitCalculator.ts:44` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/adapters/IUnitAdapter.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/adapters/LegacyPositionUnitAdapter.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/adapters/LegacySizeUnitAdapter.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/classes/EnhancedSizeUnitCalculator.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/classes/PositionUnitCalculator.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/classes/RandomValueNumber.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/classes/RefactoredPositionUnitCalculator.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 1

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-01-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 1: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 2

**Branch:** `p3-di-02-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/classes/RefactoredScaleUnitCalculator.ts:43` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/classes/RefactoredSizeUnitCalculator.ts:53` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/classes/ScaleUnitCalculator.ts:260` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/classes/SizeUnitCalculator.ts:130` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/classes/UnitCalculatorFactory.ts:30` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/commands/CalculatePositionCommand.ts:19` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/commands/CalculateSizeCommand.ts:19` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/classes/RefactoredScaleUnitCalculator.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/classes/RefactoredSizeUnitCalculator.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/classes/ScaleUnitCalculator.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/classes/SizeUnitCalculator.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/classes/UnitCalculatorFactory.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/commands/CalculatePositionCommand.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/commands/CalculateSizeCommand.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 2

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-02-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 2: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 3

**Branch:** `p3-di-03-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/commands/IUnitCommand.ts:45` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/decorators/ValidationDecorator.ts:351` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/deployment/FeatureFlagSystem.ts:33` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/examples/ContainerIntegrationExample.ts:49` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/examples/PhaserGameObjectExample.ts:123` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/interfaces/IPhaserUnitContext.ts:197` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/managers/ObserverManager.ts:36` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/commands/IUnitCommand.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/decorators/ValidationDecorator.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/deployment/FeatureFlagSystem.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/examples/ContainerIntegrationExample.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/examples/PhaserGameObjectExample.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/interfaces/IPhaserUnitContext.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/managers/ObserverManager.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 3

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-03-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 3: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 4

**Branch:** `p3-di-04-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/managers/PerformanceManager.ts:54` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/managers/StrategyManager.ts:36` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/managers/UnitRegistryManager.ts:41` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/managers/UnitSystemManager.ts:77` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/managers/ValidationManager.ts:72` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/mementos/IUnitMemento.ts:60` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/mementos/UnitCalculationMemento.ts:267` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/managers/PerformanceManager.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/managers/StrategyManager.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/managers/UnitRegistryManager.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/managers/UnitSystemManager.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/managers/ValidationManager.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/mementos/IUnitMemento.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/mementos/UnitCalculationMemento.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 4

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-04-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 4: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 5

**Branch:** `p3-di-05-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/mementos/UnitMementoCaretaker.ts:12` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/mementos/UnitMementoManager.ts:26` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/monitoring/ProductionMonitoringSystem.ts:124` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/observers/LoggingObserver.ts:78` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/observers/PerformanceObserver.ts:56` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/strategies/cache/StrategyCache.ts:16` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/strategies/composition/SizeStrategyComposers.ts:275` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/mementos/UnitMementoCaretaker.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/mementos/UnitMementoManager.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/monitoring/ProductionMonitoringSystem.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/observers/LoggingObserver.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/observers/PerformanceObserver.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/strategies/cache/StrategyCache.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/strategies/composition/SizeStrategyComposers.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 5

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-05-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 5: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 6

**Branch:** `p3-di-06-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/templates/IUnitCalculationTemplate.ts:54` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/templates/PositionCalculationTemplate.ts:25` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/templates/ScaleCalculationTemplate.ts:25` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/templates/SizeCalculationTemplate.ts:24` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/AdvancedFeatures.test.ts:28` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/BatchCalculationCommand.test.ts:21` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/CachingDecorator.test.ts:40` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/templates/IUnitCalculationTemplate.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/templates/PositionCalculationTemplate.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/templates/ScaleCalculationTemplate.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/templates/SizeCalculationTemplate.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/AdvancedFeatures.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/BatchCalculationCommand.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/CachingDecorator.test.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 6

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-06-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 6: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 7

**Branch:** `p3-di-07-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/test/CalculatePositionCommand.test.ts:12` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/CalculateSizeCommand.test.ts:12` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/CalculatorRefactoringComparison.test.ts:22` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/CompleteCalculatorRefactoring.test.ts:44` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/CompleteStrategyPatternImplementation.test.ts:45` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/LegacyPositionUnitAdapter.test.ts:24` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/LegacySizeUnitAdapter.test.ts:24` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/test/CalculatePositionCommand.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/CalculateSizeCommand.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/CalculatorRefactoringComparison.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/CompleteCalculatorRefactoring.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/CompleteStrategyPatternImplementation.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/LegacyPositionUnitAdapter.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/LegacySizeUnitAdapter.test.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 7

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-07-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 7: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 8

**Branch:** `p3-di-08-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/test/LoggingObserver.test.ts:30` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/MixedUnitStrategy.test.ts:11` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/PerformanceComparisonSystem.test.ts:19` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/PerformanceObserver.test.ts:29` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/PositionCalculationTemplate.test.ts:33` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/PositionUnitCalculator.test.ts:17` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/ProductionMonitoringSystem.test.ts:42` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/test/LoggingObserver.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/MixedUnitStrategy.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/PerformanceComparisonSystem.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/PerformanceObserver.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/PositionCalculationTemplate.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/PositionUnitCalculator.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/ProductionMonitoringSystem.test.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 8

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-08-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 8: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 9

**Branch:** `p3-di-09-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/test/RangeValidator.test.ts:26` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/RefactoredSizeUnitCalculator.test.ts:21` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/RefactoredUnitSystemManager.test.ts:28` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/ScaleCalculationTemplate.test.ts:32` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/ScaleUnitCalculator.test.ts:16` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/SizeCalculationTemplate.test.ts:33` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/SizeUnitCalculator.test.ts:17` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/test/RangeValidator.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/RefactoredSizeUnitCalculator.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/RefactoredUnitSystemManager.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/ScaleCalculationTemplate.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/ScaleUnitCalculator.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/SizeCalculationTemplate.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/SizeUnitCalculator.test.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 9

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-09-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 9: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 10

**Branch:** `p3-di-10-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/test/SizeUnitStrategy.test.ts:11` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/StrategyPatternImplementation.test.ts:19` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/TypeValidator.test.ts:21` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/UnitCalculationMemento.test.ts:29` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/UnitGroupComposite.test.ts:49` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/UnitMementoManager.test.ts:23` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/test/UnitSystemManager.test.ts:24` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/test/SizeUnitStrategy.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/StrategyPatternImplementation.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/TypeValidator.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/UnitCalculationMemento.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/UnitGroupComposite.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/UnitMementoManager.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/test/UnitSystemManager.test.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 10

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-10-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 10: apply SOLID fixes"
# push and open PR on your platform
```

## P3-DI: batch 11

**Branch:** `p3-di-11-20250905-1444`

**Tasks:**
- - [ ] DIP:ConcreteConstruction at `unit/test/ValidationDecorator.test.ts:39` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)
- - [ ] DIP:ConcreteConstruction at `unit/testing/performance/PerformanceComparisonSystem.ts:60` → Request abstractions via DI tokens; bind concretes in composition root. (How: Introduce DI container; replace `new` with `resolve(TOKENS.X)`.)

**Suggested commits (one per file):**
- refactor(unit/test/ValidationDecorator.test.ts): dip:concreteconstruction — apply SOLID fixes
- refactor(unit/testing/performance/PerformanceComparisonSystem.ts): dip:concreteconstruction — apply SOLID fixes

**PR Description Template:**

```
P3-DI: batch 11

- Phase: P3-DI
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p3-di-11-20250905-1444
# (edit files)
git add -A
git commit -m "P3-DI: batch 11: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 1

**Branch:** `p4-srp-decorators-01-20250905-1444`

**Tasks:**
- - [ ] SRP:CrossCuttingInsideCore at `unit/classes/EnhancedSizeUnitCalculator.ts:15` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/classes/RefactoredPositionUnitCalculator.ts:10` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/classes/RefactoredScaleUnitCalculator.ts:8` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/classes/RefactoredSizeUnitCalculator.ts:9` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/commands/BatchCalculationCommand.ts:4` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/composites/UnitGroupComposite.ts:6` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:ManyExportsLargeFile at `unit/constants/UnitSystemConstants.ts` → Split into modules per responsibility (calc, validation, format, types). (How: Move each export to focused file; keep public surface minimal.)

**Suggested commits (one per file):**
- refactor(unit/classes/EnhancedSizeUnitCalculator.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/classes/RefactoredPositionUnitCalculator.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/classes/RefactoredScaleUnitCalculator.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/classes/RefactoredSizeUnitCalculator.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/commands/BatchCalculationCommand.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/composites/UnitGroupComposite.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/constants/UnitSystemConstants.ts): srp:manyexportslargefile — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 1

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-01-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 1: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 2

**Branch:** `p4-srp-decorators-02-20250905-1444`

**Tasks:**
- - [ ] SRP:ManyExportsLargeFile at `unit/interfaces/ILegacyUnit.ts` → Split into modules per responsibility (calc, validation, format, types). (How: Move each export to focused file; keep public surface minimal.)
- - [ ] SRP:ManyExportsLargeFile at `unit/interfaces/IStrategyInput.ts` → Split into modules per responsibility (calc, validation, format, types). (How: Move each export to focused file; keep public surface minimal.)
- - [ ] SRP/Readability:LongFunction at `unit/interfaces/IStrategyInput.ts:367` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP:ManyExportsLargeFile at `unit/interfaces/ITemplateInput.ts` → Split into modules per responsibility (calc, validation, format, types). (How: Move each export to focused file; keep public surface minimal.)
- - [ ] SRP:ManyExportsLargeFile at `unit/interfaces/IValidationInput.ts` → Split into modules per responsibility (calc, validation, format, types). (How: Move each export to focused file; keep public surface minimal.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/managers/CommandManager.ts:3` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/managers/ObserverManager.ts:3` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)

**Suggested commits (one per file):**
- refactor(unit/interfaces/ILegacyUnit.ts): srp:manyexportslargefile — apply SOLID fixes
- refactor(unit/interfaces/IStrategyInput.ts): srp/readability:longfunction, srp:manyexportslargefile — apply SOLID fixes
- refactor(unit/interfaces/ITemplateInput.ts): srp:manyexportslargefile — apply SOLID fixes
- refactor(unit/interfaces/IValidationInput.ts): srp:manyexportslargefile — apply SOLID fixes
- refactor(unit/managers/CommandManager.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/managers/ObserverManager.ts): srp:crosscuttinginsidecore — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 2

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-02-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 2: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 3

**Branch:** `p4-srp-decorators-03-20250905-1444`

**Tasks:**
- - [ ] SRP:CrossCuttingInsideCore at `unit/managers/PerformanceManager.ts:1` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/managers/StrategyManager.ts:3` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/managers/UnitRegistryManager.ts:4` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/managers/UnitSystemManager.ts:17` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/managers/ValidationManager.ts:5` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/mementos/UnitMementoCaretaker.ts:3` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/mementos/UnitMementoManager.ts:7` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)

**Suggested commits (one per file):**
- refactor(unit/managers/PerformanceManager.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/managers/StrategyManager.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/managers/UnitRegistryManager.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/managers/UnitSystemManager.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/managers/ValidationManager.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/mementos/UnitMementoCaretaker.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/mementos/UnitMementoManager.ts): srp:crosscuttinginsidecore — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 3

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-03-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 3: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 4

**Branch:** `p4-srp-decorators-04-20250905-1444`

**Tasks:**
- - [ ] SRP:CrossCuttingInsideCore at `unit/monitoring/ProductionMonitoringSystem.ts:3` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/observers/LoggingObserver.ts:2` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/observers/PerformanceObserver.ts:2` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/strategies/MixedUnitStrategy.ts:5` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/strategies/cache/StrategyCache.ts:3` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/strategies/composition/SizeStrategyComposers.ts:6` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/strategies/value/PositionValueCalculationStrategies.ts:7` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)

**Suggested commits (one per file):**
- refactor(unit/monitoring/ProductionMonitoringSystem.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/observers/LoggingObserver.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/observers/PerformanceObserver.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/strategies/MixedUnitStrategy.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/strategies/cache/StrategyCache.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/strategies/composition/SizeStrategyComposers.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/strategies/value/PositionValueCalculationStrategies.ts): srp:crosscuttinginsidecore — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 4

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-04-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 4: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 5

**Branch:** `p4-srp-decorators-05-20250905-1444`

**Tasks:**
- - [ ] SRP:CrossCuttingInsideCore at `unit/strategies/value/PositionValueCalculationStrategyRegistry.ts:6` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/strategies/value/ScaleValueCalculationStrategies.ts:6` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/strategies/value/ScaleValueCalculationStrategyRegistry.ts:5` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/strategies/value/SizeValueCalculationStrategies.ts:7` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/strategies/value/SizeValueCalculationStrategyRegistry.ts:6` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/templates/PositionCalculationTemplate.ts:9` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/templates/ScaleCalculationTemplate.ts:9` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)

**Suggested commits (one per file):**
- refactor(unit/strategies/value/PositionValueCalculationStrategyRegistry.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/strategies/value/ScaleValueCalculationStrategies.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/strategies/value/ScaleValueCalculationStrategyRegistry.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/strategies/value/SizeValueCalculationStrategies.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/strategies/value/SizeValueCalculationStrategyRegistry.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/templates/PositionCalculationTemplate.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/templates/ScaleCalculationTemplate.ts): srp:crosscuttinginsidecore — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 5

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-05-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 5: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 6

**Branch:** `p4-srp-decorators-06-20250905-1444`

**Tasks:**
- - [ ] SRP:CrossCuttingInsideCore at `unit/templates/SizeCalculationTemplate.ts:9` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP/Readability:LongFunction at `unit/test/AdvancedFeatures.test.ts:18` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/BatchCalculationCommand.test.ts:7` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/CachingDecorator.test.ts:48` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/CalculatePositionCommand.test.ts:5` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/CalculateSizeCommand.test.ts:5` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/test/CalculatorRefactoringComparison.test.ts:35` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)

**Suggested commits (one per file):**
- refactor(unit/templates/SizeCalculationTemplate.ts): srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/test/AdvancedFeatures.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/BatchCalculationCommand.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/CachingDecorator.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/CalculatePositionCommand.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/CalculateSizeCommand.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/CalculatorRefactoringComparison.test.ts): srp:crosscuttinginsidecore — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 6

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-06-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 6: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 7

**Branch:** `p4-srp-decorators-07-20250905-1444`

**Tasks:**
- - [ ] SRP/Readability:LongFunction at `unit/test/CalculatorRefactoringComparison.test.ts:15` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/CalculatorRefactoringComparison.test.ts:49` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/CalculatorRefactoringComparison.test.ts:220` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/CompleteCalculatorRefactoring.test.ts:36` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/CompleteCalculatorRefactoring.test.ts:505` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/CompleteStrategyPatternImplementation.test.ts:38` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/CompleteStrategyPatternImplementation.test.ts:255` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)

**Suggested commits (one per file):**
- refactor(unit/test/CalculatorRefactoringComparison.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/CompleteCalculatorRefactoring.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/CompleteStrategyPatternImplementation.test.ts): srp/readability:longfunction — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 7

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-07-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 7: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 8

**Branch:** `p4-srp-decorators-08-20250905-1444`

**Tasks:**
- - [ ] SRP/Readability:LongFunction at `unit/test/LegacyPositionUnitAdapter.test.ts:9` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/LegacySizeUnitAdapter.test.ts:9` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/test/LoggerPerformanceComparison.test.ts:1` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP/Readability:LongFunction at `unit/test/LoggerPerformanceComparison.test.ts:15` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/test/LoggingObserver.test.ts:4` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP/Readability:LongFunction at `unit/test/LoggingObserver.test.ts:9` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/MixedUnitStrategy.test.ts:6` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)

**Suggested commits (one per file):**
- refactor(unit/test/LegacyPositionUnitAdapter.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/LegacySizeUnitAdapter.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/LoggerPerformanceComparison.test.ts): srp/readability:longfunction, srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/test/LoggingObserver.test.ts): srp/readability:longfunction, srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/test/MixedUnitStrategy.test.ts): srp/readability:longfunction — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 8

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-08-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 8: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 9

**Branch:** `p4-srp-decorators-09-20250905-1444`

**Tasks:**
- - [ ] SRP:CrossCuttingInsideCore at `unit/test/PerformanceComparisonSystem.test.ts:164` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP/Readability:LongFunction at `unit/test/PerformanceComparisonSystem.test.ts:15` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/PerformanceComparisonSystem.test.ts:22` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/PerformanceComparisonSystem.test.ts:23` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/test/PerformanceObserver.test.ts:3` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP/Readability:LongFunction at `unit/test/PerformanceObserver.test.ts:8` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/PositionCalculationTemplate.test.ts:27` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)

**Suggested commits (one per file):**
- refactor(unit/test/PerformanceComparisonSystem.test.ts): srp/readability:longfunction, srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/test/PerformanceObserver.test.ts): srp/readability:longfunction, srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/test/PositionCalculationTemplate.test.ts): srp/readability:longfunction — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 9

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-09-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 9: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 10

**Branch:** `p4-srp-decorators-10-20250905-1444`

**Tasks:**
- - [ ] SRP/Readability:LongFunction at `unit/test/PositionUnitCalculator.test.ts:7` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/test/ProductionMonitoringSystem.test.ts:10` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP/Readability:LongFunction at `unit/test/ProductionMonitoringSystem.test.ts:12` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/ProductionMonitoringSystem.test.ts:108` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/ProductionMonitoringSystem.test.ts:452` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/RangeValidator.test.ts:12` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/RefactoredSizeUnitCalculator.test.ts:15` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)

**Suggested commits (one per file):**
- refactor(unit/test/PositionUnitCalculator.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/ProductionMonitoringSystem.test.ts): srp/readability:longfunction, srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/test/RangeValidator.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/RefactoredSizeUnitCalculator.test.ts): srp/readability:longfunction — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 10

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-10-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 10: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 11

**Branch:** `p4-srp-decorators-11-20250905-1444`

**Tasks:**
- - [ ] SRP/Readability:LongFunction at `unit/test/RefactoredUnitSystemManager.test.ts:23` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/ScaleCalculationTemplate.test.ts:26` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/ScaleUnitCalculator.test.ts:6` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/SizeCalculationTemplate.test.ts:27` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/SizeUnitCalculator.test.ts:7` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/SizeUnitStrategy.test.ts:6` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/SizeUnitStrategy.test.ts:43` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)

**Suggested commits (one per file):**
- refactor(unit/test/RefactoredUnitSystemManager.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/ScaleCalculationTemplate.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/ScaleUnitCalculator.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/SizeCalculationTemplate.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/SizeUnitCalculator.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/SizeUnitStrategy.test.ts): srp/readability:longfunction — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 11

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-11-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 11: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 12

**Branch:** `p4-srp-decorators-12-20250905-1444`

**Tasks:**
- - [ ] SRP/Readability:LongFunction at `unit/test/StrategyPatternImplementation.test.ts:14` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/StrategyPatternImplementation.test.ts:28` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/TypeValidator.test.ts:7` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/TypeValidator.test.ts:211` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/TypeValidator.test.ts:296` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/UnitCalculationMemento.test.ts:7` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/UnitCalculatorFactory.test.ts:15` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)

**Suggested commits (one per file):**
- refactor(unit/test/StrategyPatternImplementation.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/TypeValidator.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/UnitCalculationMemento.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/UnitCalculatorFactory.test.ts): srp/readability:longfunction — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 12

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-12-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 12: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 13

**Branch:** `p4-srp-decorators-13-20250905-1444`

**Tasks:**
- - [ ] SRP:CrossCuttingInsideCore at `unit/test/UnitGroupComposite.test.ts:7` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP/Readability:LongFunction at `unit/test/UnitGroupComposite.test.ts:53` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/UnitMementoManager.test.ts:15` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/UnitSystemManager.test.ts:20` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP:CrossCuttingInsideCore at `unit/test/ValidationDecorator.test.ts:559` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)
- - [ ] SRP/Readability:LongFunction at `unit/test/ValidationDecorator.test.ts:43` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)
- - [ ] SRP/Readability:LongFunction at `unit/test/ValidationDecorator.test.ts:223` → Split into small pure helpers with descriptive names. (How: Extract steps: parse → validate → compute → format; keep each < 40 lines.)

**Suggested commits (one per file):**
- refactor(unit/test/UnitGroupComposite.test.ts): srp/readability:longfunction, srp:crosscuttinginsidecore — apply SOLID fixes
- refactor(unit/test/UnitMementoManager.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/UnitSystemManager.test.ts): srp/readability:longfunction — apply SOLID fixes
- refactor(unit/test/ValidationDecorator.test.ts): srp/readability:longfunction, srp:crosscuttinginsidecore — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 13

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-13-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 13: apply SOLID fixes"
# push and open PR on your platform
```

## P4-SRP-Decorators: batch 14

**Branch:** `p4-srp-decorators-14-20250905-1444`

**Tasks:**
- - [ ] SRP:CrossCuttingInsideCore at `unit/testing/performance/PerformanceComparisonSystem.ts:109` → Move logging to a decorator or orchestration layer. (How: Wrap calculator with LoggingDecorator; remove console/logger from core.)

**Suggested commits (one per file):**
- refactor(unit/testing/performance/PerformanceComparisonSystem.ts): srp:crosscuttinginsidecore — apply SOLID fixes

**PR Description Template:**

```
P4-SRP-Decorators: batch 14

- Phase: P4-SRP-Decorators
- This PR applies SOLID refactors to the files listed below.
- Checklist:
  - [ ] All unit tests added/updated
  - [ ] Coverage thresholds satisfied
  - [ ] No public API changes without docs
  - [ ] Lint passes
```

**Git helper:**

```bash
git checkout -b p4-srp-decorators-14-20250905-1444
# (edit files)
git add -A
git commit -m "P4-SRP-Decorators: batch 14: apply SOLID fixes"
# push and open PR on your platform
```
