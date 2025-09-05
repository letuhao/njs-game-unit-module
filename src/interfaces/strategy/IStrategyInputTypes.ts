import { ISizeStrategyInput } from './ISizeStrategyInput';
import { IPositionStrategyInput } from './IPositionStrategyInput';
import { IScaleStrategyInput } from './IScaleStrategyInput';

/**
 * Union type for all strategy input types
 * Used in strategy methods to accept any valid strategy input type
 */
export type IStrategyInput = ISizeStrategyInput | IPositionStrategyInput | IScaleStrategyInput;
