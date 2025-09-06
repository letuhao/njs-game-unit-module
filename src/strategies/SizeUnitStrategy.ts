import type { ITemplateInput } from '../interfaces/template/ITemplateInputTypes';
import type { UnitContext } from '../interfaces/IUnit';

export class SizeUnitStrategy {
  public readonly unitType: string = 'size';
  public readonly strategyId: string = 'size-unit-strategy';

  calculate(input: ITemplateInput, context: UnitContext): number {
    // Basic size calculation logic
    return input.value * 1.0; // Default multiplier
  }

  getPriority(): number {
    return 1;
  }

  getStrategyInfo(): any {
    return {
      strategyId: this.strategyId,
      unitType: this.unitType,
      priority: this.getPriority(),
      description: 'Basic size unit calculation strategy'
    };
  }

  canHandle(input: ITemplateInput): boolean {
    return input && typeof input.value === 'number' && input.value >= 0;
  }
}
