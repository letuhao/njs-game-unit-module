import { ISizeValueCalculationStrategy } from './ISizeValueCalculationStrategy';
import { SizeValue } from '../../enums/SizeValue';
import { SizeUnit } from '../../enums/SizeUnit';
import { Dimension } from '../../enums/Dimension';

export class PixelSizeValueStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'pixel-size-value';
  readonly sizeValue = SizeValue.PIXEL;
  readonly sizeUnit = SizeUnit.PIXEL;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): boolean {
    return sizeValue === SizeValue.PIXEL && sizeUnit === SizeUnit.PIXEL;
  }

  calculate(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): number {
    return 100; // Default pixel value
  }

  getPriority(): number {
    return 1;
  }
}

export class FillSizeValueStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'fill-size-value';
  readonly sizeValue = SizeValue.FILL;
  readonly sizeUnit = SizeUnit.PERCENT;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): boolean {
    return sizeValue === SizeValue.FILL && sizeUnit === SizeUnit.PERCENT;
  }

  calculate(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): number {
    return 100; // Default fill value
  }

  getPriority(): number {
    return 2;
  }
}

export class AutoSizeValueStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'auto-size-value';
  readonly sizeValue = SizeValue.AUTO;
  readonly sizeUnit = SizeUnit.AUTO;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): boolean {
    return sizeValue === SizeValue.AUTO && sizeUnit === SizeUnit.AUTO;
  }

  calculate(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): number {
    return 0; // Auto size
  }

  getPriority(): number {
    return 3;
  }
}

export class ParentWidthSizeValueCalculationStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'parent-width-size-value';
  readonly sizeValue = SizeValue.PARENT_WIDTH;
  readonly sizeUnit = SizeUnit.PERCENT;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): boolean {
    return sizeValue === SizeValue.PARENT_WIDTH && sizeUnit === SizeUnit.PERCENT;
  }

  calculate(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): number {
    return 100; // Default parent width value
  }

  getPriority(): number {
    return 4;
  }
}

export class ViewportWidthSizeValueCalculationStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'viewport-width-size-value';
  readonly sizeValue = SizeValue.VIEWPORT_WIDTH;
  readonly sizeUnit = SizeUnit.PERCENT;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): boolean {
    return sizeValue === SizeValue.VIEWPORT_WIDTH && sizeUnit === SizeUnit.PERCENT;
  }

  calculate(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): number {
    return 100; // Default viewport width value
  }

  getPriority(): number {
    return 5;
  }
}