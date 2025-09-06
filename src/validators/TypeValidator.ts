import { UnitType } from '../enums/UnitType';
import { Dimension } from '../enums/Dimension';

export interface ITypeValidator {
  validate(value: any, context?: any): { isValid: boolean; error?: string };
  getErrorMessage(value: any): string;
  getName(): string;
  getConfiguration(): any;
  updateConfiguration(config: any): void;
}

export class TypeValidator implements ITypeValidator {
  private allowedTypes: UnitType[] = [];
  private allowedDimensions: Dimension[] = [];
  private strictMode: boolean = false;

  constructor(allowedTypes?: UnitType[], allowedDimensions?: Dimension[], strictMode?: boolean) {
    this.allowedTypes = allowedTypes || [];
    this.allowedDimensions = allowedDimensions || [];
    this.strictMode = strictMode || false;
  }

  validate(value: any, context?: any): { isValid: boolean; error?: string } {
    try {
      const isValid = typeof value === 'number' && !isNaN(value);
      return {
        isValid,
        ...(isValid ? {} : { error: this.getErrorMessage(value) })
      };
    } catch (error) {
      return {
        isValid: false,
        error: 'System error'
      };
    }
  }

  getErrorMessage(value: any): string {
    if (typeof value !== 'number') {
      return `Expected number, got ${typeof value}`;
    }
    if (isNaN(value)) {
      return 'Value is NaN';
    }
    return '';
  }

  getName(): string {
    return 'TypeValidator';
  }

  getConfiguration(): any {
    return {
      allowedTypes: this.allowedTypes,
      allowedDimensions: this.allowedDimensions,
      strictMode: this.strictMode
    };
  }

  updateConfiguration(config: any): void {
    if (config.allowedTypes) this.allowedTypes = config.allowedTypes;
    if (config.allowedDimensions) this.allowedDimensions = config.allowedDimensions;
    if (config.strictMode !== undefined) this.strictMode = config.strictMode;
  }
}
