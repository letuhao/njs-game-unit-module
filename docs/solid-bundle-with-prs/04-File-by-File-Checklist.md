# File-by-File SOLID Refactor Checklist


## unit/adapters/IUnitAdapter.ts

- Lines: 147  |  Exports: 3

### DIP:ConcreteConstruction — unit/adapters/IUnitAdapter.ts:90
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/adapters/IUnitAdapter.ts:90`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/adapters/LegacyPositionUnitAdapter.ts

- Lines: 208  |  Exports: 1

### DIP:ConcreteConstruction — unit/adapters/LegacyPositionUnitAdapter.ts:70
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/adapters/LegacyPositionUnitAdapter.ts:70`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/adapters/LegacySizeUnitAdapter.ts

- Lines: 195  |  Exports: 1

### DIP:ConcreteConstruction — unit/adapters/LegacySizeUnitAdapter.ts:72
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/adapters/LegacySizeUnitAdapter.ts:72`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/classes/EnhancedSizeUnitCalculator.ts

- Lines: 494  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/classes/EnhancedSizeUnitCalculator.ts:15
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/classes/EnhancedSizeUnitCalculator.ts:15`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/classes/EnhancedSizeUnitCalculator.ts:66
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/classes/EnhancedSizeUnitCalculator.ts:66`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/classes/PositionUnitCalculator.ts

- Lines: 388  |  Exports: 1

### OCP:LargeSwitch — unit/classes/PositionUnitCalculator.ts:52
**Why:** Adding new variants requires editing this switch, risking regressions.
**What:** Replace switch on `this.positionUnit` (19 branches) with Strategy Registry.
**Where:** `unit/classes/PositionUnitCalculator.ts:52`
**How:** Create a strategy function per case and register by key; resolve at runtime.
**Which:** Use Strategy pattern + Registry (see 03-Design-Patterns-Guide.md).


### DIP:ConcreteConstruction — unit/classes/PositionUnitCalculator.ts:169
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/classes/PositionUnitCalculator.ts:169`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/classes/RandomValueNumber.ts

- Lines: 70  |  Exports: 1

### DIP:ConcreteConstruction — unit/classes/RandomValueNumber.ts:14
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/classes/RandomValueNumber.ts:14`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/classes/RefactoredPositionUnitCalculator.ts

- Lines: 361  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/classes/RefactoredPositionUnitCalculator.ts:10
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/classes/RefactoredPositionUnitCalculator.ts:10`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/classes/RefactoredPositionUnitCalculator.ts:44
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/classes/RefactoredPositionUnitCalculator.ts:44`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/classes/RefactoredScaleUnitCalculator.ts

- Lines: 352  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/classes/RefactoredScaleUnitCalculator.ts:8
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/classes/RefactoredScaleUnitCalculator.ts:8`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/classes/RefactoredScaleUnitCalculator.ts:43
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/classes/RefactoredScaleUnitCalculator.ts:43`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/classes/RefactoredSizeUnitCalculator.ts

- Lines: 356  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/classes/RefactoredSizeUnitCalculator.ts:9
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/classes/RefactoredSizeUnitCalculator.ts:9`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/classes/RefactoredSizeUnitCalculator.ts:53
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/classes/RefactoredSizeUnitCalculator.ts:53`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/classes/ScaleUnitCalculator.ts

- Lines: 502  |  Exports: 1

### OCP:LargeSwitch — unit/classes/ScaleUnitCalculator.ts:52
**Why:** Adding new variants requires editing this switch, risking regressions.
**What:** Replace switch on `this.scaleUnit` (12 branches) with Strategy Registry.
**Where:** `unit/classes/ScaleUnitCalculator.ts:52`
**How:** Create a strategy function per case and register by key; resolve at runtime.
**Which:** Use Strategy pattern + Registry (see 03-Design-Patterns-Guide.md).


### DIP:ConcreteConstruction — unit/classes/ScaleUnitCalculator.ts:260
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/classes/ScaleUnitCalculator.ts:260`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/classes/SizeUnitCalculator.ts

- Lines: 363  |  Exports: 1

### OCP:LargeSwitch — unit/classes/SizeUnitCalculator.ts:55
**Why:** Adding new variants requires editing this switch, risking regressions.
**What:** Replace switch on `this.sizeUnit` (9 branches) with Strategy Registry.
**Where:** `unit/classes/SizeUnitCalculator.ts:55`
**How:** Create a strategy function per case and register by key; resolve at runtime.
**Which:** Use Strategy pattern + Registry (see 03-Design-Patterns-Guide.md).


### OCP:LargeSwitch — unit/classes/SizeUnitCalculator.ts:295
**Why:** Adding new variants requires editing this switch, risking regressions.
**What:** Replace switch on `this.sizeUnit` (9 branches) with Strategy Registry.
**Where:** `unit/classes/SizeUnitCalculator.ts:295`
**How:** Create a strategy function per case and register by key; resolve at runtime.
**Which:** Use Strategy pattern + Registry (see 03-Design-Patterns-Guide.md).


### DIP:ConcreteConstruction — unit/classes/SizeUnitCalculator.ts:130
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/classes/SizeUnitCalculator.ts:130`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/classes/UnitCalculatorFactory.ts

- Lines: 327  |  Exports: 1

### DIP:ConcreteConstruction — unit/classes/UnitCalculatorFactory.ts:30
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/classes/UnitCalculatorFactory.ts:30`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/commands/BatchCalculationCommand.ts

- Lines: 195  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/commands/BatchCalculationCommand.ts:4
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/commands/BatchCalculationCommand.ts:4`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/commands/CalculatePositionCommand.ts

- Lines: 76  |  Exports: 1

### DIP:ConcreteConstruction — unit/commands/CalculatePositionCommand.ts:19
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/commands/CalculatePositionCommand.ts:19`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/commands/CalculateSizeCommand.ts

- Lines: 76  |  Exports: 1

### DIP:ConcreteConstruction — unit/commands/CalculateSizeCommand.ts:19
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/commands/CalculateSizeCommand.ts:19`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/commands/IUnitCommand.ts

- Lines: 99  |  Exports: 2

### DIP:ConcreteConstruction — unit/commands/IUnitCommand.ts:45
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/commands/IUnitCommand.ts:45`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/composites/IUnitComposite.ts

- Lines: 260  |  Exports: 1

### ISP:FatInterface — unit/composites/IUnitComposite.ts:9
**Why:** `IUnitComposite` exposes 17 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/composites/IUnitComposite.ts:9`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/composites/UnitGroupComposite.ts

- Lines: 254  |  Exports: 1

### OCP:LargeSwitch — unit/composites/UnitGroupComposite.ts:136
**Why:** Adding new variants requires editing this switch, risking regressions.
**What:** Replace switch on `this.calculationStrategy` (6 branches) with Strategy Registry.
**Where:** `unit/composites/UnitGroupComposite.ts:136`
**How:** Create a strategy function per case and register by key; resolve at runtime.
**Which:** Use Strategy pattern + Registry (see 03-Design-Patterns-Guide.md).


### SRP:CrossCuttingInsideCore — unit/composites/UnitGroupComposite.ts:6
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/composites/UnitGroupComposite.ts:6`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/constants/UnitSystemConstants.ts

- Lines: 428  |  Exports: 13

### SRP:ManyExportsLargeFile — unit/constants/UnitSystemConstants.ts
**Why:** Large file with many exports likely mixes responsibilities.
**What:** Split into modules per responsibility (calc, validation, format, types).
**Where:** `unit/constants/UnitSystemConstants.ts`
**How:** Move each export to focused file; keep public surface minimal.
**Which:** SRP; module boundaries.


## unit/decorators/IUnitDecorator.ts

- Lines: 198  |  Exports: 3

### ISP:FatInterface — unit/decorators/IUnitDecorator.ts:9
**Why:** `IUnitDecorator` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/decorators/IUnitDecorator.ts:9`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/decorators/ValidationDecorator.ts

- Lines: 355  |  Exports: 1

### DIP:ConcreteConstruction — unit/decorators/ValidationDecorator.ts:351
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/decorators/ValidationDecorator.ts:351`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/deployment/FeatureFlagSystem.ts

- Lines: 244  |  Exports: 4

### DIP:ConcreteConstruction — unit/deployment/FeatureFlagSystem.ts:33
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/deployment/FeatureFlagSystem.ts:33`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/examples/ContainerIntegrationExample.ts

- Lines: 341  |  Exports: 4

### DIP:ConcreteConstruction — unit/examples/ContainerIntegrationExample.ts:49
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/examples/ContainerIntegrationExample.ts:49`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/examples/PhaserGameObjectExample.ts

- Lines: 212  |  Exports: 5

### DIP:ConcreteConstruction — unit/examples/PhaserGameObjectExample.ts:123
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/examples/PhaserGameObjectExample.ts:123`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/interfaces/ILegacyUnit.ts

- Lines: 414  |  Exports: 19

### SRP:ManyExportsLargeFile — unit/interfaces/ILegacyUnit.ts
**Why:** Large file with many exports likely mixes responsibilities.
**What:** Split into modules per responsibility (calc, validation, format, types).
**Where:** `unit/interfaces/ILegacyUnit.ts`
**How:** Move each export to focused file; keep public surface minimal.
**Which:** SRP; module boundaries.


## unit/interfaces/IPhaserUnitContext.ts

- Lines: 279  |  Exports: 3

### ISP:FatInterface — unit/interfaces/IPhaserUnitContext.ts:9
**Why:** `IPhaserUnitContext` exposes 22 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/IPhaserUnitContext.ts:9`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### DIP:ConcreteConstruction — unit/interfaces/IPhaserUnitContext.ts:197
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/interfaces/IPhaserUnitContext.ts:197`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/interfaces/IPositionUnit.ts

- Lines: 83  |  Exports: 1

### ISP:FatInterface — unit/interfaces/IPositionUnit.ts:10
**Why:** `IPositionUnit` exposes 12 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/IPositionUnit.ts:10`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/interfaces/IScaleUnit.ts

- Lines: 89  |  Exports: 1

### ISP:FatInterface — unit/interfaces/IScaleUnit.ts:9
**Why:** `IScaleUnit` exposes 13 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/IScaleUnit.ts:9`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/interfaces/ISizeUnit.ts

- Lines: 76  |  Exports: 1

### ISP:FatInterface — unit/interfaces/ISizeUnit.ts:10
**Why:** `ISizeUnit` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/ISizeUnit.ts:10`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/interfaces/IStrategyInput.ts

- Lines: 477  |  Exports: 16

### ISP:FatInterface — unit/interfaces/IStrategyInput.ts:35
**Why:** `ISizeStrategyInput` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/IStrategyInput.ts:35`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### ISP:FatInterface — unit/interfaces/IStrategyInput.ts:72
**Why:** `IPositionStrategyInput` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/IStrategyInput.ts:72`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### ISP:FatInterface — unit/interfaces/IStrategyInput.ts:109
**Why:** `IScaleStrategyInput` exposes 10 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/IStrategyInput.ts:109`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### SRP:ManyExportsLargeFile — unit/interfaces/IStrategyInput.ts
**Why:** Large file with many exports likely mixes responsibilities.
**What:** Split into modules per responsibility (calc, validation, format, types).
**Where:** `unit/interfaces/IStrategyInput.ts`
**How:** Move each export to focused file; keep public surface minimal.
**Which:** SRP; module boundaries.


### SRP/Readability:LongFunction — unit/interfaces/IStrategyInput.ts:367
**Why:** Function spans ~111 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/interfaces/IStrategyInput.ts:367`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/interfaces/ITemplateInput.ts

- Lines: 294  |  Exports: 16

### SRP:ManyExportsLargeFile — unit/interfaces/ITemplateInput.ts
**Why:** Large file with many exports likely mixes responsibilities.
**What:** Split into modules per responsibility (calc, validation, format, types).
**Where:** `unit/interfaces/ITemplateInput.ts`
**How:** Move each export to focused file; keep public surface minimal.
**Which:** SRP; module boundaries.


## unit/interfaces/IUnit.ts

- Lines: 113  |  Exports: 2

### ISP:FatInterface — unit/interfaces/IUnit.ts:65
**Why:** `UnitContext` exposes 19 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/IUnit.ts:65`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/interfaces/IValidationInput.ts

- Lines: 433  |  Exports: 25

### SRP:ManyExportsLargeFile — unit/interfaces/IValidationInput.ts
**Why:** Large file with many exports likely mixes responsibilities.
**What:** Split into modules per responsibility (calc, validation, format, types).
**Where:** `unit/interfaces/IValidationInput.ts`
**How:** Move each export to focused file; keep public surface minimal.
**Which:** SRP; module boundaries.


## unit/interfaces/strategy/IPositionStrategyInput.ts

- Lines: 103  |  Exports: 3

### ISP:FatInterface — unit/interfaces/strategy/IPositionStrategyInput.ts:10
**Why:** `IPositionStrategyInput` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/strategy/IPositionStrategyInput.ts:10`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/interfaces/strategy/ISizeStrategyInput.ts

- Lines: 103  |  Exports: 3

### ISP:FatInterface — unit/interfaces/strategy/ISizeStrategyInput.ts:10
**Why:** `ISizeStrategyInput` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/strategy/ISizeStrategyInput.ts:10`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/interfaces/strategy/IStrategyInput.ts

- Lines: 105  |  Exports: 3

### ISP:FatInterface — unit/interfaces/strategy/IStrategyInput.ts:11
**Why:** `IStrategyInput` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/strategy/IStrategyInput.ts:11`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### ISP:FatInterface — unit/interfaces/strategy/IStrategyInput.ts:50
**Why:** `IStrategyInputFactory` exposes 25 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/interfaces/strategy/IStrategyInput.ts:50`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/managers/CommandManager.ts

- Lines: 275  |  Exports: 2

### ISP:FatInterface — unit/managers/CommandManager.ts:11
**Why:** `ICommandManager` exposes 13 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/managers/CommandManager.ts:11`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### SRP:CrossCuttingInsideCore — unit/managers/CommandManager.ts:3
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/managers/CommandManager.ts:3`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/managers/ObserverManager.ts

- Lines: 229  |  Exports: 2

### ISP:FatInterface — unit/managers/ObserverManager.ts:10
**Why:** `IObserverManager` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/managers/ObserverManager.ts:10`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### SRP:CrossCuttingInsideCore — unit/managers/ObserverManager.ts:3
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/managers/ObserverManager.ts:3`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/managers/ObserverManager.ts:36
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/managers/ObserverManager.ts:36`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/managers/PerformanceManager.ts

- Lines: 331  |  Exports: 2

### ISP:FatInterface — unit/managers/PerformanceManager.ts:9
**Why:** `IPerformanceManager` exposes 24 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/managers/PerformanceManager.ts:9`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### SRP:CrossCuttingInsideCore — unit/managers/PerformanceManager.ts:1
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/managers/PerformanceManager.ts:1`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/managers/PerformanceManager.ts:54
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/managers/PerformanceManager.ts:54`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/managers/StrategyManager.ts

- Lines: 220  |  Exports: 2

### ISP:FatInterface — unit/managers/StrategyManager.ts:10
**Why:** `IStrategyManager` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/managers/StrategyManager.ts:10`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### SRP:CrossCuttingInsideCore — unit/managers/StrategyManager.ts:3
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/managers/StrategyManager.ts:3`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/managers/StrategyManager.ts:36
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/managers/StrategyManager.ts:36`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/managers/UnitRegistryManager.ts

- Lines: 224  |  Exports: 2

### ISP:FatInterface — unit/managers/UnitRegistryManager.ts:18
**Why:** `IUnitRegistryManager` exposes 10 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/managers/UnitRegistryManager.ts:18`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### SRP:CrossCuttingInsideCore — unit/managers/UnitRegistryManager.ts:4
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/managers/UnitRegistryManager.ts:4`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/managers/UnitRegistryManager.ts:41
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/managers/UnitRegistryManager.ts:41`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/managers/UnitSystemManager.ts

- Lines: 328  |  Exports: 2

### ISP:FatInterface — unit/managers/UnitSystemManager.ts:24
**Why:** `IUnitSystemManager` exposes 22 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/managers/UnitSystemManager.ts:24`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### SRP:CrossCuttingInsideCore — unit/managers/UnitSystemManager.ts:17
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/managers/UnitSystemManager.ts:17`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/managers/UnitSystemManager.ts:77
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/managers/UnitSystemManager.ts:77`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/managers/ValidationManager.ts

- Lines: 361  |  Exports: 2

### ISP:FatInterface — unit/managers/ValidationManager.ts:12
**Why:** `IValidationManager` exposes 16 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/managers/ValidationManager.ts:12`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### SRP:CrossCuttingInsideCore — unit/managers/ValidationManager.ts:5
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/managers/ValidationManager.ts:5`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/managers/ValidationManager.ts:72
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/managers/ValidationManager.ts:72`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/mementos/IUnitMemento.ts

- Lines: 172  |  Exports: 3

### ISP:FatInterface — unit/mementos/IUnitMemento.ts:5
**Why:** `IUnitMemento` exposes 12 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/mementos/IUnitMemento.ts:5`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### ISP:FatInterface — unit/mementos/IUnitMemento.ts:124
**Why:** `IUnitMementoCaretaker` exposes 20 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/mementos/IUnitMemento.ts:124`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### DIP:ConcreteConstruction — unit/mementos/IUnitMemento.ts:60
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/mementos/IUnitMemento.ts:60`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/mementos/UnitCalculationMemento.ts

- Lines: 318  |  Exports: 1

### DIP:ConcreteConstruction — unit/mementos/UnitCalculationMemento.ts:267
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/mementos/UnitCalculationMemento.ts:267`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/mementos/UnitMementoCaretaker.ts

- Lines: 417  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/mementos/UnitMementoCaretaker.ts:3
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/mementos/UnitMementoCaretaker.ts:3`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/mementos/UnitMementoCaretaker.ts:12
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/mementos/UnitMementoCaretaker.ts:12`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/mementos/UnitMementoManager.ts

- Lines: 496  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/mementos/UnitMementoManager.ts:7
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/mementos/UnitMementoManager.ts:7`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/mementos/UnitMementoManager.ts:26
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/mementos/UnitMementoManager.ts:26`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/monitoring/ProductionMonitoringSystem.ts

- Lines: 588  |  Exports: 5

### ISP:FatInterface — unit/monitoring/ProductionMonitoringSystem.ts:21
**Why:** `Alert` exposes 10 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/monitoring/ProductionMonitoringSystem.ts:21`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### SRP:CrossCuttingInsideCore — unit/monitoring/ProductionMonitoringSystem.ts:3
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/monitoring/ProductionMonitoringSystem.ts:3`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/monitoring/ProductionMonitoringSystem.ts:124
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/monitoring/ProductionMonitoringSystem.ts:124`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/observers/IUnitObserver.ts

- Lines: 86  |  Exports: 3

### ISP:FatInterface — unit/observers/IUnitObserver.ts:29
**Why:** `IUnitSubject` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/observers/IUnitObserver.ts:29`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/observers/LoggingObserver.ts

- Lines: 133  |  Exports: 1

### OCP:LargeSwitch — unit/observers/LoggingObserver.ts:97
**Why:** Adding new variants requires editing this switch, risking regressions.
**What:** Replace switch on `level` (5 branches) with Strategy Registry.
**Where:** `unit/observers/LoggingObserver.ts:97`
**How:** Create a strategy function per case and register by key; resolve at runtime.
**Which:** Use Strategy pattern + Registry (see 03-Design-Patterns-Guide.md).


### SRP:CrossCuttingInsideCore — unit/observers/LoggingObserver.ts:2
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/observers/LoggingObserver.ts:2`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/observers/LoggingObserver.ts:78
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/observers/LoggingObserver.ts:78`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/observers/PerformanceObserver.ts

- Lines: 264  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/observers/PerformanceObserver.ts:2
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/observers/PerformanceObserver.ts:2`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/observers/PerformanceObserver.ts:56
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/observers/PerformanceObserver.ts:56`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/strategies/MixedUnitStrategy.ts

- Lines: 383  |  Exports: 1

### OCP:LargeSwitch — unit/strategies/MixedUnitStrategy.ts:257
**Why:** Adding new variants requires editing this switch, risking regressions.
**What:** Replace switch on `unit` (5 branches) with Strategy Registry.
**Where:** `unit/strategies/MixedUnitStrategy.ts:257`
**How:** Create a strategy function per case and register by key; resolve at runtime.
**Which:** Use Strategy pattern + Registry (see 03-Design-Patterns-Guide.md).


### SRP:CrossCuttingInsideCore — unit/strategies/MixedUnitStrategy.ts:5
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/strategies/MixedUnitStrategy.ts:5`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/strategies/PositionUnitStrategy.ts

- Lines: 363  |  Exports: 1

### OCP:LargeSwitch — unit/strategies/PositionUnitStrategy.ts:141
**Why:** Adding new variants requires editing this switch, risking regressions.
**What:** Replace switch on `input` (6 branches) with Strategy Registry.
**Where:** `unit/strategies/PositionUnitStrategy.ts:141`
**How:** Create a strategy function per case and register by key; resolve at runtime.
**Which:** Use Strategy pattern + Registry (see 03-Design-Patterns-Guide.md).


## unit/strategies/ScaleUnitStrategy.ts

- Lines: 275  |  Exports: 1

### OCP:LargeSwitch — unit/strategies/ScaleUnitStrategy.ts:133
**Why:** Adding new variants requires editing this switch, risking regressions.
**What:** Replace switch on `input` (7 branches) with Strategy Registry.
**Where:** `unit/strategies/ScaleUnitStrategy.ts:133`
**How:** Create a strategy function per case and register by key; resolve at runtime.
**Which:** Use Strategy pattern + Registry (see 03-Design-Patterns-Guide.md).


## unit/strategies/cache/IStrategyCache.ts

- Lines: 120  |  Exports: 3

### ISP:FatInterface — unit/strategies/cache/IStrategyCache.ts:32
**Why:** `IStrategyCache` exposes 23 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/strategies/cache/IStrategyCache.ts:32`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/strategies/cache/StrategyCache.ts

- Lines: 294  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/strategies/cache/StrategyCache.ts:3
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/strategies/cache/StrategyCache.ts:3`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/strategies/cache/StrategyCache.ts:16
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/strategies/cache/StrategyCache.ts:16`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/strategies/composition/IStrategyComposer.ts

- Lines: 61  |  Exports: 1

### ISP:FatInterface — unit/strategies/composition/IStrategyComposer.ts:7
**Why:** `IStrategyComposer` exposes 15 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/strategies/composition/IStrategyComposer.ts:7`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/strategies/composition/SizeStrategyComposers.ts

- Lines: 432  |  Exports: 3

### SRP:CrossCuttingInsideCore — unit/strategies/composition/SizeStrategyComposers.ts:6
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/strategies/composition/SizeStrategyComposers.ts:6`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/strategies/composition/SizeStrategyComposers.ts:275
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/strategies/composition/SizeStrategyComposers.ts:275`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/strategies/value/PositionValueCalculationStrategies.ts

- Lines: 323  |  Exports: 5

### OCP:IfChain — unit/strategies/value/PositionValueCalculationStrategies.ts:105-115
**Why:** Long if/else chains on one variable make extension risky and unreadable.
**What:** Flatten 3 branch chain on `axisUnit` to a registry lookup.
**Where:** `unit/strategies/value/PositionValueCalculationStrategies.ts:105-115`
**How:** Map keys to handler functions; remove conditional duplication.
**Which:** Strategy map object or class registry.


### SRP:CrossCuttingInsideCore — unit/strategies/value/PositionValueCalculationStrategies.ts:7
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/strategies/value/PositionValueCalculationStrategies.ts:7`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/strategies/value/PositionValueCalculationStrategyRegistry.ts

- Lines: 203  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/strategies/value/PositionValueCalculationStrategyRegistry.ts:6
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/strategies/value/PositionValueCalculationStrategyRegistry.ts:6`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/strategies/value/ScaleValueCalculationStrategies.ts

- Lines: 241  |  Exports: 5

### SRP:CrossCuttingInsideCore — unit/strategies/value/ScaleValueCalculationStrategies.ts:6
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/strategies/value/ScaleValueCalculationStrategies.ts:6`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/strategies/value/ScaleValueCalculationStrategyRegistry.ts

- Lines: 185  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/strategies/value/ScaleValueCalculationStrategyRegistry.ts:5
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/strategies/value/ScaleValueCalculationStrategyRegistry.ts:5`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/strategies/value/SizeValueCalculationStrategies.ts

- Lines: 322  |  Exports: 5

### OCP:IfChain — unit/strategies/value/SizeValueCalculationStrategies.ts:108-131
**Why:** Long if/else chains on one variable make extension risky and unreadable.
**What:** Flatten 7 branch chain on `dimension` to a registry lookup.
**Where:** `unit/strategies/value/SizeValueCalculationStrategies.ts:108-131`
**How:** Map keys to handler functions; remove conditional duplication.
**Which:** Strategy map object or class registry.


### OCP:IfChain — unit/strategies/value/SizeValueCalculationStrategies.ts:110-131
**Why:** Long if/else chains on one variable make extension risky and unreadable.
**What:** Flatten 6 branch chain on `dimension` to a registry lookup.
**Where:** `unit/strategies/value/SizeValueCalculationStrategies.ts:110-131`
**How:** Map keys to handler functions; remove conditional duplication.
**Which:** Strategy map object or class registry.


### OCP:IfChain — unit/strategies/value/SizeValueCalculationStrategies.ts:112-131
**Why:** Long if/else chains on one variable make extension risky and unreadable.
**What:** Flatten 5 branch chain on `dimension` to a registry lookup.
**Where:** `unit/strategies/value/SizeValueCalculationStrategies.ts:112-131`
**How:** Map keys to handler functions; remove conditional duplication.
**Which:** Strategy map object or class registry.


### OCP:IfChain — unit/strategies/value/SizeValueCalculationStrategies.ts:118-131
**Why:** Long if/else chains on one variable make extension risky and unreadable.
**What:** Flatten 5 branch chain on `dimension` to a registry lookup.
**Where:** `unit/strategies/value/SizeValueCalculationStrategies.ts:118-131`
**How:** Map keys to handler functions; remove conditional duplication.
**Which:** Strategy map object or class registry.


### OCP:IfChain — unit/strategies/value/SizeValueCalculationStrategies.ts:120-131
**Why:** Long if/else chains on one variable make extension risky and unreadable.
**What:** Flatten 4 branch chain on `dimension` to a registry lookup.
**Where:** `unit/strategies/value/SizeValueCalculationStrategies.ts:120-131`
**How:** Map keys to handler functions; remove conditional duplication.
**Which:** Strategy map object or class registry.


### OCP:IfChain — unit/strategies/value/SizeValueCalculationStrategies.ts:122-131
**Why:** Long if/else chains on one variable make extension risky and unreadable.
**What:** Flatten 3 branch chain on `dimension` to a registry lookup.
**Where:** `unit/strategies/value/SizeValueCalculationStrategies.ts:122-131`
**How:** Map keys to handler functions; remove conditional duplication.
**Which:** Strategy map object or class registry.


### OCP:IfChain — unit/strategies/value/SizeValueCalculationStrategies.ts:128-131
**Why:** Long if/else chains on one variable make extension risky and unreadable.
**What:** Flatten 3 branch chain on `dimension` to a registry lookup.
**Where:** `unit/strategies/value/SizeValueCalculationStrategies.ts:128-131`
**How:** Map keys to handler functions; remove conditional duplication.
**Which:** Strategy map object or class registry.


### OCP:IfChain — unit/strategies/value/SizeValueCalculationStrategies.ts:186-189
**Why:** Long if/else chains on one variable make extension risky and unreadable.
**What:** Flatten 3 branch chain on `dimension` to a registry lookup.
**Where:** `unit/strategies/value/SizeValueCalculationStrategies.ts:186-189`
**How:** Map keys to handler functions; remove conditional duplication.
**Which:** Strategy map object or class registry.


### SRP:CrossCuttingInsideCore — unit/strategies/value/SizeValueCalculationStrategies.ts:7
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/strategies/value/SizeValueCalculationStrategies.ts:7`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/strategies/value/SizeValueCalculationStrategyRegistry.ts

- Lines: 317  |  Exports: 1

### SRP:CrossCuttingInsideCore — unit/strategies/value/SizeValueCalculationStrategyRegistry.ts:6
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/strategies/value/SizeValueCalculationStrategyRegistry.ts:6`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


## unit/strategies/value-calculation/IPositionValueCalculationStrategy.ts

- Lines: 128  |  Exports: 2

### ISP:FatInterface — unit/strategies/value-calculation/IPositionValueCalculationStrategy.ts:50
**Why:** `IPositionValueCalculationStrategyRegistry` exposes 17 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/strategies/value-calculation/IPositionValueCalculationStrategy.ts:50`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/strategies/value-calculation/IScaleValueCalculationStrategy.ts

- Lines: 110  |  Exports: 2

### ISP:FatInterface — unit/strategies/value-calculation/IScaleValueCalculationStrategy.ts:43
**Why:** `IScaleValueCalculationStrategyRegistry` exposes 15 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/strategies/value-calculation/IScaleValueCalculationStrategy.ts:43`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


## unit/templates/IUnitCalculationTemplate.ts

- Lines: 191  |  Exports: 1

### ISP:FatInterface — unit/templates/IUnitCalculationTemplate.ts:9
**Why:** `IUnitCalculationTemplate` exposes 11 members; implementers are forced to depend on methods they don't use.
**What:** Split into narrowly-scoped interfaces per responsibility.
**Where:** `unit/templates/IUnitCalculationTemplate.ts:9`
**How:** Extract read-only calculation interfaces (e.g., ISizeUnitCalculator, etc.).
**Which:** Interface Segregation; see 06-Interfaces-Contracts.md.


### DIP:ConcreteConstruction — unit/templates/IUnitCalculationTemplate.ts:54
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/templates/IUnitCalculationTemplate.ts:54`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/templates/PositionCalculationTemplate.ts

- Lines: 291  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/templates/PositionCalculationTemplate.ts:9
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/templates/PositionCalculationTemplate.ts:9`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/templates/PositionCalculationTemplate.ts:25
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/templates/PositionCalculationTemplate.ts:25`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/templates/ScaleCalculationTemplate.ts

- Lines: 286  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/templates/ScaleCalculationTemplate.ts:9
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/templates/ScaleCalculationTemplate.ts:9`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/templates/ScaleCalculationTemplate.ts:25
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/templates/ScaleCalculationTemplate.ts:25`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/templates/SizeCalculationTemplate.ts

- Lines: 290  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/templates/SizeCalculationTemplate.ts:9
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/templates/SizeCalculationTemplate.ts:9`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/templates/SizeCalculationTemplate.ts:24
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/templates/SizeCalculationTemplate.ts:24`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


## unit/test/AdvancedFeatures.test.ts

- Lines: 365  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/AdvancedFeatures.test.ts:28
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/AdvancedFeatures.test.ts:28`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/AdvancedFeatures.test.ts:18
**Why:** Function spans ~348 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/AdvancedFeatures.test.ts:18`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/BatchCalculationCommand.test.ts

- Lines: 296  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/BatchCalculationCommand.test.ts:21
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/BatchCalculationCommand.test.ts:21`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/BatchCalculationCommand.test.ts:7
**Why:** Function spans ~290 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/BatchCalculationCommand.test.ts:7`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/CachingDecorator.test.ts

- Lines: 293  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/CachingDecorator.test.ts:40
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/CachingDecorator.test.ts:40`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/CachingDecorator.test.ts:48
**Why:** Function spans ~246 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CachingDecorator.test.ts:48`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/CalculatePositionCommand.test.ts

- Lines: 275  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/CalculatePositionCommand.test.ts:12
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/CalculatePositionCommand.test.ts:12`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/CalculatePositionCommand.test.ts:5
**Why:** Function spans ~271 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CalculatePositionCommand.test.ts:5`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/CalculateSizeCommand.test.ts

- Lines: 281  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/CalculateSizeCommand.test.ts:12
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/CalculateSizeCommand.test.ts:12`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/CalculateSizeCommand.test.ts:5
**Why:** Function spans ~277 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CalculateSizeCommand.test.ts:5`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/CalculatorRefactoringComparison.test.ts

- Lines: 486  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/test/CalculatorRefactoringComparison.test.ts:35
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/test/CalculatorRefactoringComparison.test.ts:35`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/test/CalculatorRefactoringComparison.test.ts:22
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/CalculatorRefactoringComparison.test.ts:22`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/CalculatorRefactoringComparison.test.ts:15
**Why:** Function spans ~472 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CalculatorRefactoringComparison.test.ts:15`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/CalculatorRefactoringComparison.test.ts:49
**Why:** Function spans ~126 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CalculatorRefactoringComparison.test.ts:49`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/CalculatorRefactoringComparison.test.ts:220
**Why:** Function spans ~87 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CalculatorRefactoringComparison.test.ts:220`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/CompleteCalculatorRefactoring.test.ts

- Lines: 595  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/CompleteCalculatorRefactoring.test.ts:44
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/CompleteCalculatorRefactoring.test.ts:44`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/CompleteCalculatorRefactoring.test.ts:36
**Why:** Function spans ~560 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CompleteCalculatorRefactoring.test.ts:36`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/CompleteCalculatorRefactoring.test.ts:505
**Why:** Function spans ~90 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CompleteCalculatorRefactoring.test.ts:505`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/CompleteStrategyPatternImplementation.test.ts

- Lines: 460  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/CompleteStrategyPatternImplementation.test.ts:45
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/CompleteStrategyPatternImplementation.test.ts:45`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/CompleteStrategyPatternImplementation.test.ts:38
**Why:** Function spans ~423 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CompleteStrategyPatternImplementation.test.ts:38`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/CompleteStrategyPatternImplementation.test.ts:255
**Why:** Function spans ~91 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/CompleteStrategyPatternImplementation.test.ts:255`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/LegacyPositionUnitAdapter.test.ts

- Lines: 315  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/LegacyPositionUnitAdapter.test.ts:24
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/LegacyPositionUnitAdapter.test.ts:24`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/LegacyPositionUnitAdapter.test.ts:9
**Why:** Function spans ~307 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/LegacyPositionUnitAdapter.test.ts:9`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/LegacySizeUnitAdapter.test.ts

- Lines: 303  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/LegacySizeUnitAdapter.test.ts:24
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/LegacySizeUnitAdapter.test.ts:24`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/LegacySizeUnitAdapter.test.ts:9
**Why:** Function spans ~295 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/LegacySizeUnitAdapter.test.ts:9`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/LoggerPerformanceComparison.test.ts

- Lines: 349  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/test/LoggerPerformanceComparison.test.ts:1
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/test/LoggerPerformanceComparison.test.ts:1`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### SRP/Readability:LongFunction — unit/test/LoggerPerformanceComparison.test.ts:15
**Why:** Function spans ~335 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/LoggerPerformanceComparison.test.ts:15`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/LoggingObserver.test.ts

- Lines: 430  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/test/LoggingObserver.test.ts:4
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/test/LoggingObserver.test.ts:4`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/test/LoggingObserver.test.ts:30
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/LoggingObserver.test.ts:30`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/LoggingObserver.test.ts:9
**Why:** Function spans ~422 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/LoggingObserver.test.ts:9`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/MixedUnitStrategy.test.ts

- Lines: 164  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/MixedUnitStrategy.test.ts:11
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/MixedUnitStrategy.test.ts:11`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/MixedUnitStrategy.test.ts:6
**Why:** Function spans ~159 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/MixedUnitStrategy.test.ts:6`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/PerformanceComparisonSystem.test.ts

- Lines: 354  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/test/PerformanceComparisonSystem.test.ts:164
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/test/PerformanceComparisonSystem.test.ts:164`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/test/PerformanceComparisonSystem.test.ts:19
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/PerformanceComparisonSystem.test.ts:19`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/PerformanceComparisonSystem.test.ts:15
**Why:** Function spans ~340 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/PerformanceComparisonSystem.test.ts:15`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/PerformanceComparisonSystem.test.ts:22
**Why:** Function spans ~285 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/PerformanceComparisonSystem.test.ts:22`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/PerformanceComparisonSystem.test.ts:23
**Why:** Function spans ~150 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/PerformanceComparisonSystem.test.ts:23`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/PerformanceObserver.test.ts

- Lines: 486  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/test/PerformanceObserver.test.ts:3
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/test/PerformanceObserver.test.ts:3`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/test/PerformanceObserver.test.ts:29
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/PerformanceObserver.test.ts:29`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/PerformanceObserver.test.ts:8
**Why:** Function spans ~479 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/PerformanceObserver.test.ts:8`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/PositionCalculationTemplate.test.ts

- Lines: 282  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/PositionCalculationTemplate.test.ts:33
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/PositionCalculationTemplate.test.ts:33`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/PositionCalculationTemplate.test.ts:27
**Why:** Function spans ~256 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/PositionCalculationTemplate.test.ts:27`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/PositionUnitCalculator.test.ts

- Lines: 195  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/PositionUnitCalculator.test.ts:17
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/PositionUnitCalculator.test.ts:17`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/PositionUnitCalculator.test.ts:7
**Why:** Function spans ~189 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/PositionUnitCalculator.test.ts:7`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/ProductionMonitoringSystem.test.ts

- Lines: 547  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/test/ProductionMonitoringSystem.test.ts:10
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/test/ProductionMonitoringSystem.test.ts:10`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/test/ProductionMonitoringSystem.test.ts:42
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/ProductionMonitoringSystem.test.ts:42`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/ProductionMonitoringSystem.test.ts:12
**Why:** Function spans ~536 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/ProductionMonitoringSystem.test.ts:12`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/ProductionMonitoringSystem.test.ts:108
**Why:** Function spans ~80 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/ProductionMonitoringSystem.test.ts:108`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/ProductionMonitoringSystem.test.ts:452
**Why:** Function spans ~95 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/ProductionMonitoringSystem.test.ts:452`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/RangeValidator.test.ts

- Lines: 478  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/RangeValidator.test.ts:26
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/RangeValidator.test.ts:26`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/RangeValidator.test.ts:12
**Why:** Function spans ~467 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/RangeValidator.test.ts:12`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/RefactoredSizeUnitCalculator.test.ts

- Lines: 560  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/RefactoredSizeUnitCalculator.test.ts:21
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/RefactoredSizeUnitCalculator.test.ts:21`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/RefactoredSizeUnitCalculator.test.ts:15
**Why:** Function spans ~546 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/RefactoredSizeUnitCalculator.test.ts:15`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/RefactoredUnitSystemManager.test.ts

- Lines: 447  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/RefactoredUnitSystemManager.test.ts:28
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/RefactoredUnitSystemManager.test.ts:28`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/RefactoredUnitSystemManager.test.ts:23
**Why:** Function spans ~425 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/RefactoredUnitSystemManager.test.ts:23`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/ScaleCalculationTemplate.test.ts

- Lines: 275  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/ScaleCalculationTemplate.test.ts:32
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/ScaleCalculationTemplate.test.ts:32`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/ScaleCalculationTemplate.test.ts:26
**Why:** Function spans ~250 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/ScaleCalculationTemplate.test.ts:26`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/ScaleUnitCalculator.test.ts

- Lines: 317  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/ScaleUnitCalculator.test.ts:16
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/ScaleUnitCalculator.test.ts:16`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/ScaleUnitCalculator.test.ts:6
**Why:** Function spans ~312 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/ScaleUnitCalculator.test.ts:6`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/SizeCalculationTemplate.test.ts

- Lines: 283  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/SizeCalculationTemplate.test.ts:33
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/SizeCalculationTemplate.test.ts:33`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/SizeCalculationTemplate.test.ts:27
**Why:** Function spans ~257 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/SizeCalculationTemplate.test.ts:27`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/SizeUnitCalculator.test.ts

- Lines: 441  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/SizeUnitCalculator.test.ts:17
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/SizeUnitCalculator.test.ts:17`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/SizeUnitCalculator.test.ts:7
**Why:** Function spans ~435 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/SizeUnitCalculator.test.ts:7`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/SizeUnitStrategy.test.ts

- Lines: 237  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/SizeUnitStrategy.test.ts:11
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/SizeUnitStrategy.test.ts:11`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/SizeUnitStrategy.test.ts:6
**Why:** Function spans ~232 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/SizeUnitStrategy.test.ts:6`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/SizeUnitStrategy.test.ts:43
**Why:** Function spans ~91 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/SizeUnitStrategy.test.ts:43`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/StrategyPatternImplementation.test.ts

- Lines: 477  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/StrategyPatternImplementation.test.ts:19
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/StrategyPatternImplementation.test.ts:19`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/StrategyPatternImplementation.test.ts:14
**Why:** Function spans ~464 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/StrategyPatternImplementation.test.ts:14`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/StrategyPatternImplementation.test.ts:28
**Why:** Function spans ~83 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/StrategyPatternImplementation.test.ts:28`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/TypeValidator.test.ts

- Lines: 625  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/TypeValidator.test.ts:21
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/TypeValidator.test.ts:21`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/TypeValidator.test.ts:7
**Why:** Function spans ~619 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/TypeValidator.test.ts:7`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/TypeValidator.test.ts:211
**Why:** Function spans ~84 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/TypeValidator.test.ts:211`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/TypeValidator.test.ts:296
**Why:** Function spans ~80 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/TypeValidator.test.ts:296`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/UnitCalculationMemento.test.ts

- Lines: 782  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/UnitCalculationMemento.test.ts:29
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/UnitCalculationMemento.test.ts:29`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/UnitCalculationMemento.test.ts:7
**Why:** Function spans ~776 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/UnitCalculationMemento.test.ts:7`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/UnitCalculatorFactory.test.ts

- Lines: 365  |  Exports: 0

### SRP/Readability:LongFunction — unit/test/UnitCalculatorFactory.test.ts:15
**Why:** Function spans ~351 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/UnitCalculatorFactory.test.ts:15`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/UnitGroupComposite.test.ts

- Lines: 394  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/test/UnitGroupComposite.test.ts:7
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/test/UnitGroupComposite.test.ts:7`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/test/UnitGroupComposite.test.ts:49
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/UnitGroupComposite.test.ts:49`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/UnitGroupComposite.test.ts:53
**Why:** Function spans ~342 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/UnitGroupComposite.test.ts:53`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/UnitMementoManager.test.ts

- Lines: 630  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/UnitMementoManager.test.ts:23
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/UnitMementoManager.test.ts:23`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/UnitMementoManager.test.ts:15
**Why:** Function spans ~616 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/UnitMementoManager.test.ts:15`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/UnitSystemManager.test.ts

- Lines: 166  |  Exports: 0

### DIP:ConcreteConstruction — unit/test/UnitSystemManager.test.ts:24
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/UnitSystemManager.test.ts:24`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/UnitSystemManager.test.ts:20
**Why:** Function spans ~147 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/UnitSystemManager.test.ts:20`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/test/ValidationDecorator.test.ts

- Lines: 669  |  Exports: 0

### SRP:CrossCuttingInsideCore — unit/test/ValidationDecorator.test.ts:559
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/test/ValidationDecorator.test.ts:559`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/test/ValidationDecorator.test.ts:39
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/test/ValidationDecorator.test.ts:39`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.


### SRP/Readability:LongFunction — unit/test/ValidationDecorator.test.ts:43
**Why:** Function spans ~627 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/ValidationDecorator.test.ts:43`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


### SRP/Readability:LongFunction — unit/test/ValidationDecorator.test.ts:223
**Why:** Function spans ~113 lines; hard to test and understand.
**What:** Split into small pure helpers with descriptive names.
**Where:** `unit/test/ValidationDecorator.test.ts:223`
**How:** Extract steps: parse → validate → compute → format; keep each < 40 lines.
**Which:** Template Method; small pure functions.


## unit/testing/performance/PerformanceComparisonSystem.ts

- Lines: 360  |  Exports: 4

### SRP:CrossCuttingInsideCore — unit/testing/performance/PerformanceComparisonSystem.ts:109
**Why:** Core calculators should not handle logging; it couples concerns and complicates tests.
**What:** Move logging to a decorator or orchestration layer.
**Where:** `unit/testing/performance/PerformanceComparisonSystem.ts:109`
**How:** Wrap calculator with LoggingDecorator; remove console/logger from core.
**Which:** Decorator pattern with DI wiring.


### DIP:ConcreteConstruction — unit/testing/performance/PerformanceComparisonSystem.ts:60
**Why:** High-level code instantiates concretes directly; cannot swap in tests or change implementations.
**What:** Request abstractions via DI tokens; bind concretes in composition root.
**Where:** `unit/testing/performance/PerformanceComparisonSystem.ts:60`
**How:** Introduce DI container; replace `new` with `resolve(TOKENS.X)`.
**Which:** Dependency Inversion; see 07-DI-Wiring.md.
