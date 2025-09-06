import { PositionUnit } from '../../enums/PositionUnit';
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
 * Calculate parent left position
 */
function calculateParentLeftPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate parent top position
 */
function calculateParentTopPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate parent center x position
 */
function calculateParentCenterXPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate parent center y position
 */
function calculateParentCenterYPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate viewport left position
 */
function calculateViewportLeftPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate viewport top position
 */
function calculateViewportTopPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate viewport center x position
 */
function calculateViewportCenterXPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate viewport center y position
 */
function calculateViewportCenterYPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate scene center x position
 */
function calculateSceneCenterXPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate scene center y position
 */
function calculateSceneCenterYPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate content left position
 */
function calculateContentLeftPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate content right position
 */
function calculateContentRightPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate content top position
 */
function calculateContentTopPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate content bottom position
 */
function calculateContentBottomPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate random position
 */
function calculateRandomPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Calculate viewport position
 */
function calculateViewportPosition(input: IPositionStrategyInput): number {
  return typeof input.value === 'number' ? input.value : 0;
}

/**
 * Map of all position unit strategies
 */
export const POSITION_UNIT_STRATEGIES: Record<PositionUnit, PositionUnitStrategy> = {
  [PositionUnit.PIXEL]: calculatePixelPosition,
  [PositionUnit.PERCENT]: calculatePercentagePosition,
  [PositionUnit.PERCENTAGE]: calculatePercentagePosition,
  [PositionUnit.VIEWPORT_WIDTH]: calculateViewportWidthPosition,
  [PositionUnit.VIEWPORT_HEIGHT]: calculateViewportHeightPosition,
  [PositionUnit.VIEWPORT_LEFT]: calculateViewportLeftPosition,
  [PositionUnit.VIEWPORT_TOP]: calculateViewportTopPosition,
  [PositionUnit.VIEWPORT_CENTER_X]: calculateViewportCenterXPosition,
  [PositionUnit.VIEWPORT_CENTER_Y]: calculateViewportCenterYPosition,
  [PositionUnit.PARENT_WIDTH]: calculateParentWidthPosition,
  [PositionUnit.PARENT_HEIGHT]: calculateParentHeightPosition,
  [PositionUnit.PARENT_LEFT]: calculateParentLeftPosition,
  [PositionUnit.PARENT_TOP]: calculateParentTopPosition,
  [PositionUnit.PARENT_CENTER_X]: calculateParentCenterXPosition,
  [PositionUnit.PARENT_CENTER_Y]: calculateParentCenterYPosition,
  [PositionUnit.SCENE_CENTER_X]: calculateSceneCenterXPosition,
  [PositionUnit.SCENE_CENTER_Y]: calculateSceneCenterYPosition,
  [PositionUnit.CONTENT_LEFT]: calculateContentLeftPosition,
  [PositionUnit.CONTENT_RIGHT]: calculateContentRightPosition,
  [PositionUnit.CONTENT_TOP]: calculateContentTopPosition,
  [PositionUnit.CONTENT_BOTTOM]: calculateContentBottomPosition,
  [PositionUnit.CENTER]: calculateCenterPosition,
  [PositionUnit.LEFT]: calculateLeftPosition,
  [PositionUnit.RIGHT]: calculateRightPosition,
  [PositionUnit.TOP]: calculateTopPosition,
  [PositionUnit.BOTTOM]: calculateBottomPosition,
  [PositionUnit.RANDOM]: calculateRandomPosition,
  [PositionUnit.VIEWPORT]: calculateViewportPosition,
} as const;
