import { SizeUnit } from '../../enums/SizeUnit';
import type { ISizeStrategyInput } from '../../interfaces/strategy/ISizeStrategyInput';
import type { SizeUnitStrategy } from '../registry/SizeUnitStrategyRegistry';

/**
 * Size unit strategy implementations
 * Replaces switch statements in SizeUnitCalculator
 */

/**
 * Calculate size for PIXEL unit
 */
export const calculatePixelSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  return input.value as number;
};

/**
 * Calculate size for PERCENTAGE unit
 */
export const calculatePercentageSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  const percentage = input.value as number;
  const parentWidth = input.context?.parent?.width || 100;
  return (percentage / 100) * parentWidth;
};

/**
 * Calculate size for VIEWPORT_WIDTH unit
 */
export const calculateViewportWidthSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  const percentage = input.value as number;
  const viewportWidth = input.context?.viewport?.width || 1000;
  return (percentage / 100) * viewportWidth;
};

/**
 * Calculate size for VIEWPORT_HEIGHT unit
 */
export const calculateViewportHeightSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  const percentage = input.value as number;
  const viewportHeight = input.context?.viewport?.height || 600;
  return (percentage / 100) * viewportHeight;
};

/**
 * Calculate size for PARENT_WIDTH unit
 */
export const calculateParentWidthSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  const percentage = input.value as number;
  const parentWidth = input.context?.parent?.width || 100;
  return (percentage / 100) * parentWidth;
};

/**
 * Calculate size for PARENT_HEIGHT unit
 */
export const calculateParentHeightSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  const percentage = input.value as number;
  const parentHeight = input.context?.parent?.height || 100;
  return (percentage / 100) * parentHeight;
};

/**
 * Calculate size for AUTO unit
 */
export const calculateAutoSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  // Auto sizing logic - could be based on content or other factors
  const parentWidth = input.context?.parent?.width || 100;
  return parentWidth * 0.8; // Default to 80% of parent width
};

/**
 * Calculate size for CENTER unit
 */
export const calculateCenterSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  const parentWidth = input.context?.parent?.width || 100;
  const contentWidth = input.context?.content?.width || 50;
  return Math.max(0, parentWidth - contentWidth) / 2;
};

/**
 * Calculate size for STRETCH unit
 */
export const calculateStretchSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  const parentWidth = input.context?.parent?.width || 100;
  return parentWidth; // Stretch to fill parent width
};


/**
 * Calculate fill size
 */
export const calculateFillSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  return typeof input.value === 'number' ? input.value : 100;
};

/**
 * Calculate scene width size
 */
export const calculateSceneWidthSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  return typeof input.value === 'number' ? input.value : 100;
};

/**
 * Calculate scene height size
 */
export const calculateSceneHeightSize: SizeUnitStrategy = (input: ISizeStrategyInput): number => {
  return typeof input.value === 'number' ? input.value : 100;
};

/**
 * Map of all size unit strategies
 */
export const SIZE_UNIT_STRATEGIES: Record<SizeUnit, SizeUnitStrategy> = {
  [SizeUnit.PIXEL]: calculatePixelSize,
  [SizeUnit.PERCENT]: calculatePercentageSize,
  [SizeUnit.PERCENTAGE]: calculatePercentageSize,
  [SizeUnit.FILL]: calculateFillSize,
  [SizeUnit.PARENT_WIDTH]: calculateParentWidthSize,
  [SizeUnit.PARENT_HEIGHT]: calculateParentHeightSize,
  [SizeUnit.SCENE_WIDTH]: calculateSceneWidthSize,
  [SizeUnit.SCENE_HEIGHT]: calculateSceneHeightSize,
  [SizeUnit.VIEWPORT_WIDTH]: calculateViewportWidthSize,
  [SizeUnit.VIEWPORT_HEIGHT]: calculateViewportHeightSize,
  [SizeUnit.AUTO]: calculateAutoSize,
} as const;
