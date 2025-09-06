export interface IRangeValidator {
  readonly min: number;
  readonly max: number;
  validate(value: number): boolean;
  getErrorMessage(value: number): string;
}

export class RangeValidator implements IRangeValidator {
  constructor(
    public readonly min: number,
    public readonly max: number
  ) {
    if (min > max) {
      throw new Error('Min value cannot be greater than max value');
    }
  }

  validate(value: number): boolean {
    return value >= this.min && value <= this.max;
  }

  getErrorMessage(value: number): string {
    if (value < this.min) {
      return `Value ${value} is below minimum ${this.min}`;
    }
    if (value > this.max) {
      return `Value ${value} is above maximum ${this.max}`;
    }
    return '';
  }

  getName(): string {
    return 'RangeValidator';
  }

  getConfiguration(): any {
    return {
      min: this.min,
      max: this.max,
      type: 'range'
    };
  }

  updateConfiguration(config: any): void {
    // RangeValidator is immutable, so this is a no-op
    // In a real implementation, you might want to create a new instance
  }
}
