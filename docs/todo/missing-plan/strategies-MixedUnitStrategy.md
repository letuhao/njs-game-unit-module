# MixedUnitStrategy.ts - Refactoring Plan

## File: `src/strategies/MixedUnitStrategy.ts`

## Issues Identified

### 1. **OCP:LargeSwitch** (Line 257)
- **WHY**: 5-branch switch violates Open/Closed Principle
- **WHAT**: Replace switch with Strategy Registry
- **WHERE**: Line 257 - `switch (unit)`
- **WHEN**: Phase 3 - Strategy Registry Implementation
- **HOW**:
  1. Create strategy functions for each case
  2. Register strategies in registry
  3. Replace switch with registry lookup
  4. Remove switch statement
- **WHICH**: Strategy Registry pattern

### 2. **SRP:CrossCuttingInsideCore** (Line 5)
- **WHY**: Logger import violates Single Responsibility Principle
- **WHAT**: Move logging to decorator or orchestration layer
- **WHERE**: Line 5 - `import { logger } from '../core/Logger';`
- **WHEN**: Phase 5 - Logging Refactoring
- **HOW**: 
  1. Remove logger import
  2. Remove all logger calls from methods
  3. Wrap strategy with LoggingDecorator
  4. Update constructor to accept ILogger interface
- **WHICH**: LoggingDecorator pattern

## Detailed Refactoring Steps

### Step 1: Create Strategy Functions (Phase 3)
```typescript
// Create src/strategies/mixed/MixedUnitStrategies.ts
export const MIXED_UNIT_STRATEGIES = {
  [UnitType.SIZE]: (input: IMixedStrategyInput) => {
    // Size calculation logic
  },
  [UnitType.POSITION]: (input: IMixedStrategyInput) => {
    // Position calculation logic
  },
  [UnitType.SCALE]: (input: IMixedStrategyInput) => {
    // Scale calculation logic
  },
  [UnitType.MIXED]: (input: IMixedStrategyInput) => {
    // Mixed calculation logic
  },
  [UnitType.UNKNOWN]: (input: IMixedStrategyInput) => {
    // Unknown calculation logic
  }
} as const;
```

### Step 2: Create Strategy Registry (Phase 3)
```typescript
// Create src/strategies/mixed/MixedUnitStrategyRegistry.ts
export class MixedUnitStrategyRegistry {
  private strategies = new Map<UnitType, MixedUnitStrategy>();
  
  register(unitType: UnitType, strategy: MixedUnitStrategy): void {
    this.strategies.set(unitType, strategy);
  }
  
  getStrategy(unitType: UnitType): MixedUnitStrategy {
    const strategy = this.strategies.get(unitType);
    if (!strategy) {
      throw new Error(`No strategy found for unit type: ${unitType}`);
    }
    return strategy;
  }
}
```

### Step 3: Replace Switch Statement (Phase 3)
```typescript
// BEFORE
public calculate(input: IMixedStrategyInput): number {
  switch (input.unitType) {
    case UnitType.SIZE:
      return this.calculateSize(input);
    case UnitType.POSITION:
      return this.calculatePosition(input);
    case UnitType.SCALE:
      return this.calculateScale(input);
    case UnitType.MIXED:
      return this.calculateMixed(input);
    case UnitType.UNKNOWN:
      return this.calculateUnknown(input);
  }
}

// AFTER
public calculate(input: IMixedStrategyInput): number {
  const strategy = this.strategyRegistry.getStrategy(input.unitType);
  return strategy(input);
}
```

### Step 4: Remove Logging (Phase 5)
```typescript
// BEFORE
import { logger } from '../core/Logger';

export class MixedUnitStrategy {
  public calculate(input: IMixedStrategyInput): number {
    logger.debug('MixedUnitStrategy', 'calculate', 'Starting calculation');
    // ... calculation logic
    logger.info('MixedUnitStrategy', 'calculate', 'Calculation completed');
  }
}

// AFTER
export class MixedUnitStrategy {
  public calculate(input: IMixedStrategyInput): number {
    // ... calculation logic only
  }
}
```

### Step 5: Add DI Container (Phase 4)
```typescript
// BEFORE
export class MixedUnitStrategy {
  constructor() {
    this.someDependency = new SomeClass();
  }
}

// AFTER
export class MixedUnitStrategy {
  constructor(
    private container: IDiContainer,
    private strategyRegistry: MixedUnitStrategyRegistry,
    private someDependency: ISomeInterface
  ) {}
}
```

## Dependencies

- **Requires**: MixedUnitStrategyRegistry implementation
- **Requires**: Individual strategy functions (5 strategies)
- **Requires**: DI Container implementation
- **Requires**: LoggingDecorator implementation
- **Affects**: All classes using this strategy

## Testing Requirements

- Unit tests for each strategy function
- Integration tests with strategy registry
- Strategy tests with mocked registry
- Decorator tests for logging functionality
- Performance tests to ensure no regression

## Success Criteria

- ✅ No switch statements
- ✅ All strategies registered in registry
- ✅ Strategy uses registry for strategy resolution
- ✅ No logger imports or calls
- ✅ All dependencies injected via DI
- ✅ All tests pass

## Estimated Effort

- **Time**: 4-6 hours
- **Complexity**: High (5 strategies to implement)
- **Risk**: Medium (large refactoring)

## Strategy Implementation Order

1. **High Priority**: SIZE, POSITION, SCALE
2. **Medium Priority**: MIXED
3. **Low Priority**: UNKNOWN

## Notes

- This is a mixed strategy, so it handles multiple unit types
- Consider creating separate strategies for each unit type
- Ensure strategy functions are pure and testable
