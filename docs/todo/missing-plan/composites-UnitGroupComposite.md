# UnitGroupComposite.ts - Refactoring Plan

## File: `src/composites/UnitGroupComposite.ts`

## Issues Identified

### 1. **OCP:LargeSwitch** (Line 136)
- **WHY**: 6-branch switch violates Open/Closed Principle
- **WHAT**: Replace switch with Strategy Registry
- **WHERE**: Line 136 - `switch (this.calculationStrategy)`
- **WHEN**: Phase 3 - Strategy Registry Implementation
- **HOW**:
  1. Create strategy functions for each case
  2. Register strategies in registry
  3. Replace switch with registry lookup
  4. Remove switch statement
- **WHICH**: Strategy Registry pattern

### 2. **SRP:CrossCuttingInsideCore** (Line 6)
- **WHY**: Logger import violates Single Responsibility Principle
- **WHAT**: Move logging to decorator or orchestration layer
- **WHERE**: Line 6 - `import { logger } from '../core/Logger';`
- **WHEN**: Phase 5 - Logging Refactoring
- **HOW**: 
  1. Remove logger import
  2. Remove all logger calls from methods
  3. Wrap composite with LoggingDecorator
  4. Update constructor to accept ILogger interface
- **WHICH**: LoggingDecorator pattern

## Detailed Refactoring Steps

### Step 1: Create Strategy Functions (Phase 3)
```typescript
// Create src/strategies/composite/UnitGroupStrategies.ts
export const UNIT_GROUP_STRATEGIES = {
  [CalculationStrategy.SEQUENTIAL]: (units: IUnit[]) => {
    // Sequential calculation logic
  },
  [CalculationStrategy.PARALLEL]: (units: IUnit[]) => {
    // Parallel calculation logic
  },
  [CalculationStrategy.BATCH]: (units: IUnit[]) => {
    // Batch calculation logic
  },
  [CalculationStrategy.CACHED]: (units: IUnit[]) => {
    // Cached calculation logic
  },
  [CalculationStrategy.VALIDATED]: (units: IUnit[]) => {
    // Validated calculation logic
  },
  [CalculationStrategy.OPTIMIZED]: (units: IUnit[]) => {
    // Optimized calculation logic
  }
} as const;
```

### Step 2: Create Strategy Registry (Phase 3)
```typescript
// Create src/strategies/composite/UnitGroupStrategyRegistry.ts
export class UnitGroupStrategyRegistry {
  private strategies = new Map<CalculationStrategy, UnitGroupStrategy>();
  
  register(strategy: CalculationStrategy, handler: UnitGroupStrategy): void {
    this.strategies.set(strategy, handler);
  }
  
  getStrategy(strategy: CalculationStrategy): UnitGroupStrategy {
    const handler = this.strategies.get(strategy);
    if (!handler) {
      throw new Error(`No strategy found for: ${strategy}`);
    }
    return handler;
  }
}
```

### Step 3: Replace Switch Statement (Phase 3)
```typescript
// BEFORE
public calculate(): number[] {
  switch (this.calculationStrategy) {
    case CalculationStrategy.SEQUENTIAL:
      return this.calculateSequential();
    case CalculationStrategy.PARALLEL:
      return this.calculateParallel();
    // ... 4 more cases
  }
}

// AFTER
public calculate(): number[] {
  const strategy = this.strategyRegistry.getStrategy(this.calculationStrategy);
  return strategy(this.units);
}
```

### Step 4: Remove Logging (Phase 5)
```typescript
// BEFORE
import { logger } from '../core/Logger';

export class UnitGroupComposite {
  public calculate(): number[] {
    logger.debug('UnitGroupComposite', 'calculate', 'Starting calculation');
    // ... calculation logic
    logger.info('UnitGroupComposite', 'calculate', 'Calculation completed');
  }
}

// AFTER
export class UnitGroupComposite {
  public calculate(): number[] {
    // ... calculation logic only
  }
}
```

### Step 5: Add DI Container (Phase 4)
```typescript
// BEFORE
export class UnitGroupComposite {
  constructor() {
    this.someDependency = new SomeClass();
  }
}

// AFTER
export class UnitGroupComposite {
  constructor(
    private container: IDiContainer,
    private strategyRegistry: UnitGroupStrategyRegistry,
    private someDependency: ISomeInterface
  ) {}
}
```

## Dependencies

- **Requires**: UnitGroupStrategyRegistry implementation
- **Requires**: Individual strategy functions (6 strategies)
- **Requires**: DI Container implementation
- **Requires**: LoggingDecorator implementation
- **Affects**: All classes using this composite

## Testing Requirements

- Unit tests for each strategy function
- Integration tests with strategy registry
- Composite tests with mocked registry
- Decorator tests for logging functionality
- Performance tests to ensure no regression

## Success Criteria

- ✅ No switch statements
- ✅ All strategies registered in registry
- ✅ Composite uses registry for strategy resolution
- ✅ No logger imports or calls
- ✅ All dependencies injected via DI
- ✅ All tests pass

## Estimated Effort

- **Time**: 4-6 hours
- **Complexity**: High (6 strategies to implement)
- **Risk**: Medium (large refactoring)

## Strategy Implementation Order

1. **High Priority**: SEQUENTIAL, PARALLEL, BATCH
2. **Medium Priority**: CACHED, VALIDATED
3. **Low Priority**: OPTIMIZED

## Notes

- This is a composite class, so it should handle multiple units
- Consider adding unit validation
- Ensure strategies are pure and testable
