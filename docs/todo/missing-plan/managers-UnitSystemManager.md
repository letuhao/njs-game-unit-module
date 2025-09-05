# UnitSystemManager.ts - Refactoring Plan

## File: `src/managers/UnitSystemManager.ts`

## Issues Identified

### 1. **ISP:FatInterface** (Line 24)
- **WHY**: Interface has too many responsibilities, violating Interface Segregation Principle
- **WHAT**: Split into narrowly-scoped interfaces per responsibility
- **WHERE**: Line 24 - Interface definition
- **WHEN**: Phase 2 - Interface Segregation
- **HOW**:
  1. Extract calculation interfaces
  2. Extract validation interfaces
  3. Extract formatting interfaces
  4. Keep only essential methods in base interface
- **WHICH**: Interface segregation pattern

### 2. **SRP:CrossCuttingInsideCore** (Line 17)
- **WHY**: Logger import violates Single Responsibility Principle
- **WHAT**: Move logging to decorator or orchestration layer
- **WHERE**: Line 17 - `import { logger } from '../core/Logger';`
- **WHEN**: Phase 5 - Logging Refactoring
- **HOW**: 
  1. Remove logger import
  2. Remove all logger calls from methods
  3. Wrap manager with LoggingDecorator
  4. Update constructor to accept ILogger interface
- **WHICH**: LoggingDecorator pattern

### 3. **DIP:ConcreteConstruction** (Line 77)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 77 - `new SomeClass()`
- **WHEN**: Phase 4 - Dependency Injection
- **HOW**:
  1. Add DI container parameter to constructor
  2. Replace `new SomeClass()` with `container.resolve(TOKENS.SOME_CLASS)`
  3. Update composition root to bind concrete
- **WHICH**: DI Container with tokens

## Detailed Refactoring Steps

### Step 1: Create Segregated Interfaces (Phase 2)
```typescript
// Create src/interfaces/managers/ICalculationManager.ts
export interface ICalculationManager {
  calculate(input: IStrategyInput): number;
  calculateBatch(inputs: IStrategyInput[]): number[];
}

// Create src/interfaces/managers/IValidationManager.ts
export interface IValidationManager {
  validate(input: IValidationInput): boolean;
  validateBatch(inputs: IValidationInput[]): boolean[];
}

// Create src/interfaces/managers/IFormattingManager.ts
export interface IFormattingManager {
  format(value: number): string;
  formatBatch(values: number[]): string[];
}

// Create src/interfaces/managers/IConfigurationManager.ts
export interface IConfigurationManager {
  getConfig(): IUnitSystemConfig;
  setConfig(config: IUnitSystemConfig): void;
  updateConfig(updates: Partial<IUnitSystemConfig>): void;
}
```

### Step 2: Update Base Interface (Phase 2)
```typescript
// AFTER - Segregated base interface
export interface IUnitSystemManager extends ICalculationManager, IValidationManager, IFormattingManager, IConfigurationManager {
  // Only essential methods that all managers must have
  // Specific functionality is provided by composition
}
```

### Step 3: Remove Logging (Phase 5)
```typescript
// BEFORE
import { logger } from '../core/Logger';

export class UnitSystemManager implements IUnitSystemManager {
  public calculate(input: IStrategyInput): number {
    logger.debug('UnitSystemManager', 'calculate', 'Starting calculation');
    // ... calculation logic
    logger.info('UnitSystemManager', 'calculate', 'Calculation completed');
  }
}

// AFTER
export class UnitSystemManager implements IUnitSystemManager {
  public calculate(input: IStrategyInput): number {
    // ... calculation logic only
  }
}
```

### Step 4: Add DI Container (Phase 4)
```typescript
// BEFORE
export class UnitSystemManager implements IUnitSystemManager {
  constructor() {
    this.calculationManager = new CalculationManager();
    this.validationManager = new ValidationManager();
    this.formattingManager = new FormattingManager();
  }
}

// AFTER
export class UnitSystemManager implements IUnitSystemManager {
  constructor(
    private container: IDiContainer,
    private calculationManager: ICalculationManager,
    private validationManager: IValidationManager,
    private formattingManager: IFormattingManager
  ) {}
}
```

### Step 5: Update Composition Root
```typescript
// In ContainerSetup.ts
container.bind(TOKENS.UNIT_SYSTEM_MANAGER)
  .to(UnitSystemManager)
  .inSingletonScope();
```

## Dependencies

- **Requires**: Interface segregation implementation
- **Requires**: DI Container implementation
- **Requires**: LoggingDecorator implementation
- **Requires**: Manager interfaces
- **Affects**: All classes using this manager

## Testing Requirements

- Unit tests for each segregated interface
- Integration tests with DI container
- Decorator tests for logging functionality
- Manager tests with mocked dependencies
- Performance tests to ensure no regression

## Success Criteria

- ✅ No fat interfaces
- ✅ Each interface has single responsibility
- ✅ No logger imports or calls
- ✅ All dependencies injected via DI
- ✅ Manager focuses only on orchestration
- ✅ All tests pass

## Estimated Effort

- **Time**: 6-8 hours
- **Complexity**: High (affects many implementations)
- **Risk**: High (breaking changes)

## Interface Segregation Order

1. **High Priority**: ICalculationManager, IValidationManager
2. **Medium Priority**: IFormattingManager, IConfigurationManager
3. **Low Priority**: Composite interfaces

## Notes

- This is a critical manager, so changes affect many classes
- Ensure backward compatibility during migration
- Consider using adapter pattern for legacy code
