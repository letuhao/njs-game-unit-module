# BatchCalculationCommand.ts - Refactoring Plan

## File: `src/commands/BatchCalculationCommand.ts`

## Issues Identified

### 1. **SRP:CrossCuttingInsideCore** (Line 4)
- **WHY**: Logger import violates Single Responsibility Principle
- **WHAT**: Move logging to decorator or orchestration layer
- **WHERE**: Line 4 - `import { logger } from '../core/Logger';`
- **WHEN**: Phase 5 - Logging Refactoring
- **HOW**: 
  1. Remove logger import
  2. Remove all logger calls from methods
  3. Wrap command with LoggingDecorator
  4. Update constructor to accept ILogger interface
- **WHICH**: LoggingDecorator pattern

## Detailed Refactoring Steps

### Step 1: Remove Logging (Phase 5)
```typescript
// BEFORE
import { logger } from '../core/Logger';

export class BatchCalculationCommand implements IUnitCommand {
  public execute(input: IStrategyInput): number {
    logger.debug('BatchCalculationCommand', 'execute', 'Starting batch calculation');
    // ... calculation logic
    logger.info('BatchCalculationCommand', 'execute', 'Batch calculation completed');
  }
}

// AFTER
export class BatchCalculationCommand implements IUnitCommand {
  public execute(input: IStrategyInput): number {
    // ... calculation logic only
  }
}
```

### Step 2: Add DI Container (Phase 4)
```typescript
// BEFORE
export class BatchCalculationCommand implements IUnitCommand {
  constructor() {
    this.someDependency = new SomeClass();
  }
}

// AFTER
export class BatchCalculationCommand implements IUnitCommand {
  constructor(
    private container: IDiContainer,
    private someDependency: ISomeInterface
  ) {}
}
```

### Step 3: Update Composition Root
```typescript
// In ContainerSetup.ts
container.bind(TOKENS.BATCH_CALCULATION_COMMAND)
  .to(BatchCalculationCommand)
  .inSingletonScope();
```

## Dependencies

- **Requires**: DI Container implementation
- **Requires**: LoggingDecorator implementation
- **Requires**: Interface segregation for dependencies
- **Affects**: All classes using this command

## Testing Requirements

- Unit tests for command execution logic
- Integration tests with DI container
- Decorator tests for logging functionality
- Performance tests to ensure no regression

## Success Criteria

- ✅ No logger imports or calls
- ✅ All dependencies injected via DI
- ✅ Command focuses only on execution logic
- ✅ Logging handled by decorator
- ✅ All tests pass

## Estimated Effort

- **Time**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Low (well-isolated changes)

## Notes

- This is a command class, so it should focus on execution
- Consider adding undo functionality
- Ensure command is idempotent
