import type { ScaleUnit } from '../../enums/ScaleUnit';
import type { IScaleStrategyInput } from '../../interfaces/strategy/IScaleStrategyInput';
import type { ScaleUnitStrategy } from '../registry/ScaleUnitStrategyRegistry';

/**
 * Scale unit strategy implementations
 * Replaces switch statements in ScaleUnitCalculator
 */

/**
 * Calculate scale for PIXEL unit
 */
export const calculatePixelScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  return input.value as number;
};

/**
 * Calculate scale for PERCENTAGE unit
 */
export const calculatePercentageScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  const percentage = input.value as number;
  return percentage / 100; // Convert percentage to decimal scale
};

/**
 * Calculate scale for VIEWPORT_WIDTH unit
 */
export const calculateViewportWidthScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  const percentage = input.value as number;
  const viewportWidth = input.context?.viewport?.width || 1000;
  const baseWidth = 1000; // Base width for 1.0 scale
  return (percentage / 100) * (viewportWidth / baseWidth);
};

/**
 * Calculate scale for VIEWPORT_HEIGHT unit
 */
export const calculateViewportHeightScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  const percentage = input.value as number;
  const viewportHeight = input.context?.viewport?.height || 600;
  const baseHeight = 600; // Base height for 1.0 scale
  return (percentage / 100) * (viewportHeight / baseHeight);
};

/**
 * Calculate scale for PARENT_WIDTH unit
 */
export const calculateParentWidthScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  const percentage = input.value as number;
  const parentWidth = input.context?.parent?.width || 100;
  const baseWidth = 100; // Base width for 1.0 scale
  return (percentage / 100) * (parentWidth / baseWidth);
};

/**
 * Calculate scale for PARENT_HEIGHT unit
 */
export const calculateParentHeightScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  const percentage = input.value as number;
  const parentHeight = input.context?.parent?.height || 100;
  const baseHeight = 100; // Base height for 1.0 scale
  return (percentage / 100) * (parentHeight / baseHeight);
};

/**
 * Calculate scale for AUTO unit
 */
export const calculateAutoScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  // Auto scaling logic - could be based on content or other factors
  const viewportWidth = input.context?.viewport?.width || 1000;
  const baseWidth = 1000;
  return viewportWidth / baseWidth;
};

/**
 * Calculate scale for CENTER unit
 */
export const calculateCenterScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  // Center scaling maintains aspect ratio
  const viewportWidth = input.context?.viewport?.width || 1000;
  const viewportHeight = input.context?.viewport?.height || 600;
  const baseWidth = 1000;
  const baseHeight = 600;
  
  const scaleX = viewportWidth / baseWidth;
  const scaleY = viewportHeight / baseHeight;
  
  return Math.min(scaleX, scaleY); // Use smaller scale to maintain aspect ratio
};

/**
 * Calculate scale for STRETCH unit
 */
export const calculateStretchScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  // Stretch scaling fills available space
  const viewportWidth = input.context?.viewport?.width || 1000;
  const viewportHeight = input.context?.viewport?.height || 600;
  const baseWidth = 1000;
  const baseHeight = 600;
  
  const scaleX = viewportWidth / baseWidth;
  const scaleY = viewportHeight / baseHeight;
  
  return Math.max(scaleX, scaleY); // Use larger scale to fill space
};

/**
 * Calculate scale for ASPECT_RATIO unit
 */
export const calculateAspectRatioScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  const aspectRatio = input.value as number;
  const viewportWidth = input.context?.viewport?.width || 1000;
  const viewportHeight = input.context?.viewport?.height || 600;
  
  const currentAspectRatio = viewportWidth / viewportHeight;
  return aspectRatio / currentAspectRatio;
};

/**
 * Calculate scale for MIN unit
 */
export const calculateMinScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  const viewportWidth = input.context?.viewport?.width || 1000;
  const viewportHeight = input.context?.viewport?.height || 600;
  const baseWidth = 1000;
  const baseHeight = 600;
  
  const scaleX = viewportWidth / baseWidth;
  const scaleY = viewportHeight / baseHeight;
  
  return Math.min(scaleX, scaleY);
};

/**
 * Calculate scale for MAX unit
 */
export const calculateMaxScale: ScaleUnitStrategy = (input: IScaleStrategyInput): number => {
  const viewportWidth = input.context?.viewport?.width || 1000;
  const viewportHeight = input.context?.viewport?.height || 600;
  const baseWidth = 1000;
  const baseHeight = 600;
  
  const scaleX = viewportWidth / baseWidth;
  const scaleY = viewportHeight / baseHeight;
  
  return Math.max(scaleX, scaleY);
};

/**
 * Map of all scale unit strategies
 */
export const SCALE_UNIT_STRATEGIES: Record<ScaleUnit, ScaleUnitStrategy> = {
  [ScaleUnit.FIXED]: calculatePixelScale,
  [ScaleUnit.RESPONSIVE]: calculatePercentageScale,
  [ScaleUnit.VIEWPORT_WIDTH]: calculateViewportWidthScale,
  [ScaleUnit.VIEWPORT_HEIGHT]: calculateViewportHeightScale,
  [ScaleUnit.PARENT_WIDTH]: calculateParentWidthScale,
  [ScaleUnit.PARENT_HEIGHT]: calculateParentHeightScale,
  [ScaleUnit.AUTO]: calculateAutoScale,
} as const;
