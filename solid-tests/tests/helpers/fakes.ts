export interface DebugEntry { msg: string; meta?: Record<string, unknown>; }
export class FakeLogger {
  public entries: DebugEntry[] = [];
  debug(msg: string, meta?: Record<string, unknown>) { this.entries.push({ msg, meta }); }
}

export const okValidator = <TUnit>() => (/*ctx:any, input:any*/) => {};
export const throwingValidator = <TUnit>(message = 'invalid') => () => { throw new Error(message); };
