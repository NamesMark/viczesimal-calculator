/* tslint:disable */
/* eslint-disable */
/**
* @param {string} vicz
* @returns {number}
*/
export function vicz_to_dec(vicz: string): number;
/**
* @param {number} decimal
* @returns {string}
*/
export function dec_to_vicz(decimal: number): string;
/**
* @param {string} expression
* @returns {string}
*/
export function calculate_vicz_expression(expression: string): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly vicz_to_dec: (a: number, b: number) => number;
  readonly dec_to_vicz: (a: number, b: number) => void;
  readonly calculate_vicz_expression: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
