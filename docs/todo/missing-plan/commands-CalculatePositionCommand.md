# CalculatePositionCommand.ts - Refactoring Plan

## File: `src/commands/CalculatePositionCommand.ts`

## Issues Identified

### 1. **DIP:ConcreteConstruction** (Line 19)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 19 - `new SomeClass()`
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
export class CalculatePositionCommand implements IUnitCommand {
  constructor() {
    this.positionCalculator = new PositionUnitCalculator();
  }
  
  public execute(input: IPositionStrategyInput): number {
    return this.positionCalculator.calculate(input);
  }
}

// AFTER
export class CalculatePositionCommand implements IUnitCommand {
  constructor(
    private container: IDiContainer,
    private positionCalculator: IPositionUnitCalculator
  ) {}
  
  public execute(input: IPositionStrategyInput): number {
    return this.positionCalculator.calculate(input);
  }
}
```

### Step 2: Update Composition Root
```typescript
// In ContainerSetup.ts
container.bind(TOKENS.CALCULATE_POSITION_COMMAND)
  .to(CalculatePositionCommand)
  .inSingletonScope();
```

## Dependencies

- **Requires**: DI Container implementation
- **Requires**: PositionUnitCalculator interface
- **Requires**: PositionStrategyInput interface
- **Affects**: All classes using this command

## Testing Requirements

- Unit tests for command execution logic
- Integration tests with DI container
- Tests for position calculation
- Performance tests to ensure no regression

## Success Criteria

- ✅ All dependencies injected via DI
- ✅ No direct instantiation of dependencies
- ✅ Command focuses only on execution logic
- ✅ All tests pass

## Estimated Effort

- **Time**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Low (command pattern refactoring)

## Notes

- This is a command class, so it should focus on execution
- Consider adding validation for input
- Ensure command is idempotent
