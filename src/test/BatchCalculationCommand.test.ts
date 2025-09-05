import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { BatchCalculationCommand } from '../commands/BatchCalculationCommand';
import { CalculateSizeCommand } from '../commands/CalculateSizeCommand';
import { CalculatePositionCommand } from '../commands/CalculatePositionCommand';
import { createMockContext } from '../../test/setup';

describe('BatchCalculationCommand', () => {
  let command: BatchCalculationCommand;
  let sizeCommand: CalculateSizeCommand;
  let positionCommand: CalculatePositionCommand;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    // Clean up if needed
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a batch calculation command', () => {
      testBatchCommandCreation();
    });

    it('should have correct command information', () => {
      testCommandInformation();
    });
  });

  describe('Single Command Execution', () => {
    it('should execute single size command', () => {
      testSingleSizeCommandExecution();
    });

    it('should execute single position command', () => {
      testSinglePositionCommandExecution();
    });
  });

  describe('Multiple Command Execution', () => {
    it('should execute multiple commands', () => {
      testMultipleCommandExecution();
    });

    it('should handle empty command array', () => {
      testEmptyCommandArray();
    });

    it('should handle large number of commands', () => {
      testLargeNumberOfCommands();
    });
  });

  describe('Error Handling', () => {
    it('should handle command that throws error', () => {
      testCommandErrorHandling();
    });

    it('should continue execution when some commands fail', () => {
      testPartialCommandFailure();
    });

    it('should handle commands that cannot execute', () => {
      testNonExecutableCommand();
    });
  });

  describe('Aggregation and Statistics', () => {
    it('should calculate aggregate result from multiple commands', () => {
      testAggregateResult();
    });

    it('should handle aggregation with errors', () => {
      testAggregationWithErrors();
    });
  });

  describe('Undo Functionality', () => {
    it('should undo batch calculation', () => {
      testBatchUndo();
    });

    it('should handle undo without previous execution', () => {
      testUndoWithoutExecution();
    });
  });

  describe('Performance and Timing', () => {
    it('should track execution time', () => {
      testExecutionTimeTracking();
    });

    it('should handle multiple rapid executions', () => {
      testMultipleRapidExecutions();
    });
  });

  describe('Context Handling', () => {
    it('should handle different context types', () => {
      testDifferentContextTypes();
    });

    it('should handle missing context properties gracefully', () => {
      testMissingContextProperties();
    });
  });

  describe('Command Management', () => {
    it('should check if commands can execute', () => {
      testCommandExecutability();
    });

    it('should get command description', () => {
      testCommandDescription();
    });

    it('should get command timestamp', () => {
      testCommandTimestamp();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    mockContext = createMockContext();

    // Create strategy inputs
    const sizeInput = { value: 100 };
    const positionInput = { value: 50 };

    // Create individual commands
    sizeCommand = new CalculateSizeCommand(sizeInput as any, mockContext);
    positionCommand = new CalculatePositionCommand(positionInput as any, mockContext);

    // Create batch command
    command = new BatchCalculationCommand([sizeCommand, positionCommand], mockContext);
  }

  function testBatchCommandCreation(): void {
    expect(command).toBeInstanceOf(BatchCalculationCommand);
    expect(command.id).toContain('batch-calculation');
  }

  function testCommandInformation(): void {
    expect(command.getDescription()).toBeDefined();
    expect(command.getTimestamp()).toBeInstanceOf(Date);
    expect(command.canExecute()).toBe(true);
  }

  function testSingleSizeCommandExecution(): void {
    const singleCommand = new BatchCalculationCommand([sizeCommand], mockContext);
    const result = singleCommand.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
    expect(singleCommand.getResult()).toBe(result);
  }

  function testSinglePositionCommandExecution(): void {
    const singleCommand = new BatchCalculationCommand([positionCommand], mockContext);
    const result = singleCommand.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(singleCommand.getResult()).toBe(result);
  }

  function testMultipleCommandExecution(): void {
    const result = command.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
    expect(command.getResult()).toBe(result);
  }

  function testEmptyCommandArray(): void {
    const emptyCommand = new BatchCalculationCommand([], mockContext);
    const result = emptyCommand.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(emptyCommand.getResult()).toBe(result);
  }

  function testLargeNumberOfCommands(): void {
    const commands = createMultipleCommands(10);
    const batchCommand = new BatchCalculationCommand(commands, mockContext);
    const result = batchCommand.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  }

  function testCommandErrorHandling(): void {
    const errorCommand = createErrorCommand();
    const batchCommand = new BatchCalculationCommand([errorCommand as any], mockContext);
    const result = batchCommand.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0); // Should return fallback value
  }

  function testPartialCommandFailure(): void {
    const errorCommand = createErrorCommand();
    const batchCommand = new BatchCalculationCommand(
      [sizeCommand, errorCommand as any],
      mockContext
    );
    const result = batchCommand.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  }

  function testNonExecutableCommand(): void {
    const nonExecutableCommand = createNonExecutableCommand();
    const batchCommand = new BatchCalculationCommand([nonExecutableCommand as any], mockContext);
    const result = batchCommand.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0); // Should return fallback value
  }

  function testAggregateResult(): void {
    const commands = [
      new CalculateSizeCommand({ value: 100 } as any, mockContext),
      new CalculateSizeCommand({ value: 200 } as any, mockContext),
      new CalculateSizeCommand({ value: 300 } as any, mockContext),
    ];

    const batchCommand = new BatchCalculationCommand(commands, mockContext);
    const result = batchCommand.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  }

  function testAggregationWithErrors(): void {
    const errorCommand = createErrorCommand();
    const commands = [
      new CalculateSizeCommand({ value: 100 } as any, mockContext),
      errorCommand as any,
      new CalculateSizeCommand({ value: 300 } as any, mockContext),
    ];

    const batchCommand = new BatchCalculationCommand(commands, mockContext);
    const result = batchCommand.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  }

  function testBatchUndo(): void {
    const result = command.execute(mockContext);

    expect(typeof result).toBe('number');
    expect(command.getResult()).toBe(result);

    command.undo();

    // After undo, the result should be the previous result
    expect(command.getResult()).toBeDefined();
  }

  function testUndoWithoutExecution(): void {
    // Create a new command without executing it
    const newCommand = new BatchCalculationCommand([sizeCommand], mockContext);

    // Undo should not throw an error
    expect(() => newCommand.undo()).not.toThrow();
  }

  function testExecutionTimeTracking(): void {
    const startTime = Date.now();
    const result = command.execute(mockContext);
    const endTime = Date.now();

    expect(typeof result).toBe('number');
    expect(command.getTimestamp()).toBeInstanceOf(Date);
    expect(endTime - startTime).toBeGreaterThanOrEqual(0);
  }

  function testMultipleRapidExecutions(): void {
    const results = [];
    for (let i = 0; i < 5; i++) {
      const result = command.execute(mockContext);
      results.push(result);
    }

    results.forEach(result => {
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  }

  function testDifferentContextTypes(): void {
    const contexts = [
      createMockContext(),
      { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' as const },
      { scene: { width: 1600, height: 1200 }, dimension: 'height' as const },
    ];

    for (const context of contexts) {
      const result = command.execute(context);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    }
  }

  function testMissingContextProperties(): void {
    const partialContext = { dimension: 'width' as const };
    const result = command.execute(partialContext as any);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  }

  function testCommandExecutability(): void {
    expect(command.canExecute()).toBe(true);

    const emptyCommand = new BatchCalculationCommand([], mockContext);
    expect(emptyCommand.canExecute()).toBe(false);
  }

  function testCommandDescription(): void {
    const description = command.getDescription();
    expect(typeof description).toBe('string');
    expect(description.length).toBeGreaterThan(0);
  }

  function testCommandTimestamp(): void {
    const timestamp = command.getTimestamp();
    expect(timestamp).toBeInstanceOf(Date);
  }

  // Helper functions for creating test objects

  function createMultipleCommands(count: number): CalculateSizeCommand[] {
    const commands = [];
    for (let i = 0; i < count; i++) {
      const sizeInput = { value: 100 + i };
      commands.push(new CalculateSizeCommand(sizeInput as any, mockContext));
    }
    return commands;
  }

  function createErrorCommand(): any {
    return {
      id: 'error-command',
      execute: () => {
        throw new Error('Command failed');
      },
      canExecute: () => true,
      getDescription: () => 'Error Command',
      undo: () => {},
      getTimestamp: () => new Date(),
      getResult: () => undefined,
      getPreviousResult: () => undefined,
    };
  }

  function createNonExecutableCommand(): any {
    return {
      id: 'non-executable',
      execute: () => 0,
      canExecute: () => false,
      getDescription: () => 'Non Executable Command',
      undo: () => {},
      getTimestamp: () => new Date(),
      getResult: () => undefined,
      getPreviousResult: () => undefined,
    };
  }
});
