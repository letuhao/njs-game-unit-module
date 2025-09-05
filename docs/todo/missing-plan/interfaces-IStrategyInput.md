# IStrategyInput.ts - Refactoring Plan

## File: `src/interfaces/IStrategyInput.ts`

## Issues Identified

### 1. **ISP:FatInterface** (Line 35, 72, 109)
- **WHY**: Interface has too many responsibilities, violating Interface Segregation Principle
- **WHAT**: Split into narrowly-scoped interfaces per responsibility
- **WHERE**: Lines 35, 72, 109 - Interface definitions
- **WHEN**: Phase 2 - Interface Segregation
- **HOW**:
  1. Extract calculation interfaces
  2. Extract validation interfaces
  3. Extract formatting interfaces
  4. Keep only essential methods in base interface
- **WHICH**: Interface segregation pattern

### 2. **SRP:ManyExportsLargeFile** (Line 1)
- **WHY**: File has too many exports, violating Single Responsibility Principle
- **WHAT**: Split into modules per responsibility
- **WHERE**: Line 1 - File structure
- **WHEN**: Phase 2 - Interface Segregation
- **HOW**:
  1. Move each export to focused file
  2. Keep public surface minimal
  3. Create index file for exports
- **WHICH**: File splitting pattern

### 3. **SRP/Readability:LongFunction** (Line 367)
- **WHY**: Function is too long, violating Single Responsibility Principle
- **WHAT**: Split into small pure helpers with descriptive names
- **WHERE**: Line 367 - Long function
- **WHEN**: Phase 6 - Test Refactoring
- **HOW**:
  1. Extract steps: parse → validate → compute → format
  2. Keep each < 40 lines
  3. Use descriptive names
- **WHICH**: Function splitting pattern

## Detailed Refactoring Steps

### Step 1: Create Segregated Interfaces (Phase 2)
```typescript
// Create src/interfaces/strategy/ICalculationInput.ts
export interface ICalculationInput {
  readonly value: number;
  readonly unit: UnitType;
  calculate(): number;
}

// Create src/interfaces/strategy/IValidationInput.ts
export interface IValidationInput {
  readonly value: number;
  readonly unit: UnitType;
  validate(): boolean;
}

// Create src/interfaces/strategy/IFormattingInput.ts
export interface IFormattingInput {
  readonly value: number;
  readonly unit: UnitType;
  format(): string;
}

// Create src/interfaces/strategy/IContextInput.ts
export interface IContextInput {
  readonly context: IPhaserUnitContext;
  readonly gameObject: IGameObject;
  getContext(): IPhaserUnitContext;
}
```

### Step 2: Split File Structure (Phase 2)
```typescript
// Create src/interfaces/strategy/calculation/ICalculationInput.ts
export interface ICalculationInput {
  // Calculation-specific methods
}

// Create src/interfaces/strategy/validation/IValidationInput.ts
export interface IValidationInput {
  // Validation-specific methods
}

// Create src/interfaces/strategy/formatting/IFormattingInput.ts
export interface IFormattingInput {
  // Formatting-specific methods
}

// Create src/interfaces/strategy/context/IContextInput.ts
export interface IContextInput {
  // Context-specific methods
}
```

### Step 3: Create Index File (Phase 2)
```typescript
// Create src/interfaces/strategy/index.ts
export * from './calculation/ICalculationInput';
export * from './validation/IValidationInput';
export * from './formatting/IFormattingInput';
export * from './context/IContextInput';
export * from './IBaseStrategyInput';
```

### Step 4: Split Long Function (Phase 6)
```typescript
// BEFORE - Long function (Line 367)
public processInput(input: IStrategyInput): IProcessedInput {
  // 100+ lines of complex logic
  // parse → validate → compute → format
}

// AFTER - Split into helpers
private parseInput(input: IStrategyInput): IParsedInput {
  // Parse logic < 40 lines
}

private validateInput(parsed: IParsedInput): IValidatedInput {
  // Validation logic < 40 lines
}

private computeInput(validated: IValidatedInput): IComputedInput {
  // Computation logic < 40 lines
}

private formatInput(computed: IComputedInput): IProcessedInput {
  // Formatting logic < 40 lines
}

public processInput(input: IStrategyInput): IProcessedInput {
  const parsed = this.parseInput(input);
  const validated = this.validateInput(parsed);
  const computed = this.computeInput(validated);
  return this.formatInput(computed);
}
```

## Dependencies

- **Requires**: Interface segregation implementation
- **Requires**: File structure reorganization
- **Requires**: Update all consumers of IStrategyInput
- **Affects**: All classes using IStrategyInput

## Testing Requirements

- Unit tests for each segregated interface
- Integration tests for composite interfaces
- Tests for file splitting
- Tests for function splitting
- Performance tests to ensure no regression

## Success Criteria

- ✅ No fat interfaces
- ✅ Each interface has single responsibility
- ✅ File structure is organized
- ✅ Long functions are split
- ✅ All tests pass

## Estimated Effort

- **Time**: 8-10 hours
- **Complexity**: High (affects many implementations)
- **Risk**: High (breaking changes)

## Interface Segregation Order

1. **High Priority**: ICalculationInput, IValidationInput
2. **Medium Priority**: IFormattingInput, IContextInput
3. **Low Priority**: Composite interfaces

## Notes

- This is a critical interface, so changes affect many classes
- Ensure backward compatibility during migration
- Consider using adapter pattern for legacy code
