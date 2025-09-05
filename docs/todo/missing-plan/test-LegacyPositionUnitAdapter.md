# LegacyPositionUnitAdapter.test.ts - Refactoring Plan

## File: `src/test/LegacyPositionUnitAdapter.test.ts`

## Issues Identified

### 1. **DIP:ConcreteConstruction** (Line 24)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 24 - `new SomeClass()`
- **WHEN**: Phase 4 - Dependency Injection
- **HOW**:
  1. Add DI container parameter to constructor
  2. Replace `new SomeClass()` with `container.resolve(TOKENS.SOME_CLASS)`
  3. Update composition root to bind concrete
- **WHICH**: DI Container with tokens

### 2. **SRP/Readability:LongFunction** (Line 9)
- **WHY**: Function is too long, violating Single Responsibility Principle
- **WHAT**: Split into small pure helpers with descriptive names
- **WHERE**: Line 9 - Long function
- **WHEN**: Phase 6 - Test Refactoring
- **HOW**:
  1. Extract steps: parse → validate → compute → format
  2. Keep each < 40 lines
  3. Use descriptive names
- **WHICH**: Function splitting pattern

## Detailed Refactoring Steps

### Step 1: Split Long Function (Phase 6)
```typescript
// BEFORE - Long function (Line 9)
describe('LegacyPositionUnitAdapter', () => {
  it('should adapt legacy position unit correctly', () => {
    // 100+ lines of complex test logic
    // setup → test → assert → cleanup
  });
});

// AFTER - Split into helpers
describe('LegacyPositionUnitAdapter', () => {
  let adapter: LegacyPositionUnitAdapter;
  let mockContainer: IDiContainer;
  let mockCalculator: IPositionUnitCalculator;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  it('should adapt legacy position unit correctly', () => {
    const input = createLegacyPositionInput();
    const expected = createExpectedOutput();
    
    const result = adapter.adapt(input);
    
    assertPositionAdaptation(result, expected);
  });

  // Helper functions
  function setupTestEnvironment(): void {
    // Setup logic < 40 lines
  }

  function cleanupTestEnvironment(): void {
    // Cleanup logic < 40 lines
  }

  function createLegacyPositionInput(): ILegacyPositionUnit {
    // Input creation logic < 40 lines
  }

  function createExpectedOutput(): IPositionStrategyInput {
    // Expected output creation logic < 40 lines
  }

  function assertPositionAdaptation(result: IPositionStrategyInput, expected: IPositionStrategyInput): void {
    // Assertion logic < 40 lines
  }
});
```

### Step 2: Add DI Container (Phase 4)
```typescript
// BEFORE
describe('LegacyPositionUnitAdapter', () => {
  let adapter: LegacyPositionUnitAdapter;

  beforeEach(() => {
    adapter = new LegacyPositionUnitAdapter();
  });
});

// AFTER
describe('LegacyPositionUnitAdapter', () => {
  let adapter: LegacyPositionUnitAdapter;
  let mockContainer: IDiContainer;
  let mockCalculator: IPositionUnitCalculator;

  beforeEach(() => {
    mockContainer = createMockContainer();
    mockCalculator = createMockCalculator();
    adapter = new LegacyPositionUnitAdapter(mockContainer, mockCalculator);
  });
});
```

### Step 3: Create Test Helpers
```typescript
// Create src/test/helpers/LegacyPositionTestHelpers.ts
export class LegacyPositionTestHelpers {
  static createMockContainer(): IDiContainer {
    // Mock container creation
  }

  static createMockCalculator(): IPositionUnitCalculator {
    // Mock calculator creation
  }

  static createLegacyPositionInput(): ILegacyPositionUnit {
    // Input creation
  }

  static createExpectedOutput(): IPositionStrategyInput {
    // Expected output creation
  }

  static assertPositionAdaptation(result: IPositionStrategyInput, expected: IPositionStrategyInput): void {
    // Assertion logic
  }
}
```

## Dependencies

- **Requires**: DI Container implementation
- **Requires**: Test helper functions
- **Requires**: Mock implementations
- **Affects**: Test execution and coverage

## Testing Requirements

- Unit tests for each helper function
- Integration tests with DI container
- Tests for adapter functionality
- Performance tests to ensure no regression

## Success Criteria

- ✅ No long functions
- ✅ All functions < 40 lines
- ✅ All dependencies injected via DI
- ✅ Test helpers are reusable
- ✅ All tests pass

## Estimated Effort

- **Time**: 3-4 hours
- **Complexity**: Medium
- **Risk**: Low (test refactoring)

## Function Splitting Order

1. **High Priority**: setupTestEnvironment, cleanupTestEnvironment
2. **Medium Priority**: createLegacyPositionInput, createExpectedOutput
3. **Low Priority**: assertPositionAdaptation

## Notes

- This is a test file, so focus on readability and maintainability
- Ensure test helpers are pure and testable
- Consider using test data builders
