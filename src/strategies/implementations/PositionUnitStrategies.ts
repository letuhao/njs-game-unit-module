import type { PositionUnit } from '../../enums/PositionUnit';
import type { IPositionStrategyInput } from '../../interfaces/strategy/IPositionStrategyInput';
import type { PositionUnitStrategy } from '../registry/PositionUnitStrategyRegistry';

/**
 * Position unit strategy implementations
 * Replaces switch statements in PositionUnitCalculator
 */

/**
 * Calculate position for PIXEL unit
 */
export const calculatePixelPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  return input.value as number;
};

/**
 * Calculate position for PERCENTAGE unit
 */
export const calculatePercentagePosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  const percentage = input.value as number;
  const parentWidth = input.context?.parent?.width || 100;
  return (percentage / 100) * parentWidth;
};

/**
 * Calculate position for VIEWPORT_WIDTH unit
 */
export const calculateViewportWidthPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  const percentage = input.value as number;
  const viewportWidth = input.context?.viewport?.width || 1000;
  return (percentage / 100) * viewportWidth;
};

/**
 * Calculate position for VIEWPORT_HEIGHT unit
 */
export const calculateViewportHeightPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  const percentage = input.value as number;
  const viewportHeight = input.context?.viewport?.height || 600;
  return (percentage / 100) * viewportHeight;
};

/**
 * Calculate position for PARENT_WIDTH unit
 */
export const calculateParentWidthPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  const percentage = input.value as number;
  const parentWidth = input.context?.parent?.width || 100;
  return (percentage / 100) * parentWidth;
};

/**
 * Calculate position for PARENT_HEIGHT unit
 */
export const calculateParentHeightPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  const percentage = input.value as number;
  const parentHeight = input.context?.parent?.height || 100;
  return (percentage / 100) * parentHeight;
};

/**
 * Calculate position for AUTO unit
 */
export const calculateAutoPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  // Auto positioning logic - could be based on content or other factors
  const parentWidth = input.context?.parent?.width || 100;
  return parentWidth * 0.1; // Default to 10% from left
};

/**
 * Calculate position for CENTER unit
 */
export const calculateCenterPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  const parentWidth = input.context?.parent?.width || 100;
  const contentWidth = input.context?.content?.width || 50;
  return Math.max(0, parentWidth - contentWidth) / 2;
};

/**
 * Calculate position for LEFT unit
 */
export const calculateLeftPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  return 0; // Always position at left edge
};

/**
 * Calculate position for RIGHT unit
 */
export const calculateRightPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  const parentWidth = input.context?.parent?.width || 100;
  const contentWidth = input.context?.content?.width || 50;
  return parentWidth - contentWidth;
};

/**
 * Calculate position for TOP unit
 */
export const calculateTopPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  return 0; // Always position at top edge
};

/**
 * Calculate position for BOTTOM unit
 */
export const calculateBottomPosition: PositionUnitStrategy = (input: IPositionStrategyInput): number => {
  const parentHeight = input.context?.parent?.height || 100;
  const contentHeight = input.context?.content?.height || 50;
  return parentHeight - contentHeight;
};

/**
 * Map of all position unit strategies
 */
export const POSITION_UNIT_STRATEGIES: Record<PositionUnit, PositionUnitStrategy> = {
  [PositionUnit.PIXEL]: calculatePixelPosition,
  [PositionUnit.PERCENT]: calculatePercentagePosition,
  [PositionUnit.VIEWPORT_WIDTH]: calculateViewportWidthPosition,
  [PositionUnit.VIEWPORT_HEIGHT]: calculateViewportHeightPosition,
  [PositionUnit.PARENT_WIDTH]: calculateParentWidthPosition,
  [PositionUnit.PARENT_HEIGHT]: calculateParentHeightPosition,
  [PositionUnit.CENTER]: calculateCenterPosition,
  [PositionUnit.LEFT]: calculateLeftPosition,
  [PositionUnit.RIGHT]: calculateRightPosition,
  [PositionUnit.TOP]: calculateTopPosition,
  [PositionUnit.BOTTOM]: calculateBottomPosition,
} as const;
