# IUnitCommand.ts - Refactoring Plan

## File: `src/commands/IUnitCommand.ts`

## Issues Identified

### 1. **DIP:ConcreteConstruction** (Line 45)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 45 - `new SomeClass()`
- **WHEN**: Phase 4 - Dependency Injection
- **HOW**:
  1. Add DI container parameter to constructor
  2. Replace `new SomeClass()` with `container.resolve(TOKENS.SOME_CLASS)`
  3. Update composition root to bind concrete
- **WHICH**: DI Container with tokens

## Detailed Refactoring Steps

### Step 1: Add DI Container (Phase 4)
```typescript
// BEFORE
export interface IUnitCommand {
  execute(input: IStrategyInput): number;
}

export abstract class BaseUnitCommand implements IUnitCommand {
  constructor() {
    this.someDependency = new SomeClass();
  }
  
  protected createCalculator(): IUnitCalculator {
    return new SomeCalculator();
  }
}

// AFTER
export interface IUnitCommand {
  execute(input: IStrategyInput): number;
}

export abstract class BaseUnitCommand implements IUnitCommand {
  constructor(
    protected container: IDiContainer,
    protected someDependency: ISomeInterface
  ) {}
  
  protected createCalculator(): IUnitCalculator {
    return this.container.resolve(TOKENS.SOME_CALCULATOR);
  }
}
```

### Step 2: Update Concrete Commands
```typescript
// Update all concrete command implementations
export class SomeConcreteCommand extends BaseUnitCommand {
  constructor(
    container: IDiContainer,
    someDependency: ISomeInterface
  ) {
    super(container, someDependency);
  }
}
```

### Step 3: Update Composition Root
```typescript
// In ContainerSetup.ts
container.bind(TOKENS.UNIT_COMMAND)
  .to(SomeConcreteCommand)
  .inSingletonScope();
```

## Dependencies

- **Requires**: DI Container implementation
- **Requires**: Interface segregation for dependencies
- **Requires**: Calculator interfaces
- **Affects**: All concrete command implementations

## Testing Requirements

- Unit tests for command interface
- Integration tests with DI container
- Tests for each concrete command
- Performance tests to ensure no regression

## Success Criteria

- ✅ All dependencies injected via DI
- ✅ No direct instantiation of dependencies
- ✅ Abstract class provides DI container to subclasses
- ✅ All tests pass

## Estimated Effort

- **Time**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Low (interface refactoring)

## Notes

- This is an interface and abstract class, so changes affect all implementations
- Ensure backward compatibility with existing command implementations
- Consider using factory pattern for calculator creation
