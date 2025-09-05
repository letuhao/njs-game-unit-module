# RefactoredScaleUnitCalculator.ts - Refactoring Plan

## File: `src/classes/RefactoredScaleUnitCalculator.ts`

## Issues Identified

### 1. **SRP:CrossCuttingInsideCore** (Line 8)
- **WHY**: Logger import violates Single Responsibility Principle
- **WHAT**: Move logging to decorator or orchestration layer
- **WHERE**: Line 8 - `import { logger } from '../core/Logger';`
- **WHEN**: Phase 5 - Logging Refactoring
- **HOW**: 
  1. Remove logger import
  2. Remove all logger calls from methods
  3. Wrap calculator with LoggingDecorator
  4. Update constructor to accept ILogger interface
- **WHICH**: LoggingDecorator pattern

### 2. **DIP:ConcreteConstruction** (Line 43)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 43 - `new SomeClass()`
- **WHEN**: Phase 4 - Dependency Injection
- **HOW**:
  1. Add DI container parameter to constructor
  2. Replace `new SomeClass()` with `container.resolve(TOKENS.SOME_CLASS)`
  3. Update composition root to bind concrete
- **WHICH**: DI Container with tokens

## Detailed Refactoring Steps

### Step 1: Remove Logging (Phase 5)
```typescript
// BEFORE
import { logger } from '../core/Logger';

export class RefactoredScaleUnitCalculator {
  public calculate(input: IScaleStrategyInput): number {
    logger.debug('RefactoredScaleUnitCalculator', 'calculate', 'Starting calculation');
    // ... calculation logic
    logger.info('RefactoredScaleUnitCalculator', 'calculate', 'Calculation completed');
  }
}

// AFTER
export class RefactoredScaleUnitCalculator {
  public calculate(input: IScaleStrategyInput): number {
    // ... calculation logic only
  }
}
```

### Step 2: Add DI Container (Phase 4)
```typescript
// BEFORE
export class RefactoredScaleUnitCalculator {
  constructor() {
    this.someDependency = new SomeClass();
  }
}

// AFTER
export class RefactoredScaleUnitCalculator {
  constructor(
    private container: IDiContainer,
    private someDependency: ISomeInterface
  ) {}
}
```

### Step 3: Update Composition Root
```typescript
// In ContainerSetup.ts
container.bind(TOKENS.REFACTORED_SCALE_CALCULATOR)
  .to(RefactoredScaleUnitCalculator)
  .inSingletonScope();
```

## Dependencies

- **Requires**: DI Container implementation
- **Requires**: LoggingDecorator implementation
- **Requires**: Interface segregation for dependencies
- **Affects**: All classes using this calculator

## Testing Requirements

- Unit tests for calculation logic only
- Integration tests with DI container
- Decorator tests for logging functionality
- Performance tests to ensure no regression

## Success Criteria

- ✅ No logger imports or calls
- ✅ All dependencies injected via DI
- ✅ Calculator focuses only on calculation logic
- ✅ Logging handled by decorator
- ✅ All tests pass

## Estimated Effort

- **Time**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Low (well-isolated changes)

## Notes

- This is a refactored version, so it should already have better structure
- Focus on removing logging and adding DI
- Ensure backward compatibility with existing usage
