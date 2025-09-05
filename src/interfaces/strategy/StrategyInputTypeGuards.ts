import { ISizeStrategyInput } from './ISizeStrategyInput';
import { IPositionStrategyInput } from './IPositionStrategyInput';
import { IScaleStrategyInput } from './IScaleStrategyInput';
import { IStrategyInput } from './IStrategyInputTypes';

/**
 * Type guard to check if input is a size strategy input
 */
export function isSizeStrategyInput(input: unknown): input is ISizeStrategyInput {
  if (!input || typeof input !== 'object') return false;

  const strategyInput = input as ISizeStrategyInput;
  return (
    'value' in strategyInput ||
    'dimension' in strategyInput ||
    'unit' in strategyInput ||
    'valueType' in strategyInput ||
    'sizeString' in strategyInput ||
    'sizeArray' in strategyInput
  );
}

/**
 * Type guard to check if input is a position strategy input
 */
export function isPositionStrategyInput(input: unknown): input is IPositionStrategyInput {
  if (!input || typeof input !== 'object') return false;

  const strategyInput = input as IPositionStrategyInput;
  return (
    'value' in strategyInput ||
    'axis' in strategyInput ||
    'unit' in strategyInput ||
    'valueType' in strategyInput ||
    'positionString' in strategyInput ||
    'positionArray' in strategyInput
  );
}

/**
 * Type guard to check if input is a scale strategy input
 */
export function isScaleStrategyInput(input: unknown): input is IScaleStrategyInput {
  if (!input || typeof input !== 'object') return false;

  const strategyInput = input as IScaleStrategyInput;
  return (
    'value' in strategyInput ||
    'unit' in strategyInput ||
    'valueType' in strategyInput ||
    'scaleString' in strategyInput ||
    'scaleArray' in strategyInput
  );
}

/**
 * Type guard to check if input is any type of strategy input
 */
export function isStrategyInput(input: unknown): input is IStrategyInput {
  return (
    isSizeStrategyInput(input) ||
    isPositionStrategyInput(input) ||
    isScaleStrategyInput(input)
  );
}
