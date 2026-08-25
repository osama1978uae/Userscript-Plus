import type { Tabs, Timeout } from './UserJS.d.ts';

export type UserJSMeta = {
  name?: string;
  description?: string;
  namespace?: string;
  icon?: string;
  match?: string[];
  'exclude-match'?: string[];
  include?: string[];
  exclude?: string[];
  version?: string;
  'run-at'?: string;
  noframes?: boolean;
  grant?: string[];
  downloadURL?: string;
  supportURL?: string;
  homepageURL?: string;
  license?: string;
  resource?: {
    [name: string]: string;
  };
  require?: string[];
  'inject-into'?: string;
  unwrap?: boolean;
  'top-level-await'?: boolean;
  [key: string]: unknown;
};

export type GSForkQuery = {
  id: number;
  created_at: string;
  daily_installs: number;
  total_installs: number;
  code_updated_at: string;
  support_url: string;
  fan_score: string;
  namespace: string;
  contribution_url: unknown;
  contribution_amount: unknown;
  good_ratings: number;
  ok_ratings: number;
  bad_ratings: number;
  users: {
    id: number;
    name: string;
    url: string;
  }[];
  name: string;
  description: string;
  url: string;
  code_url: string;
  code_urls: {
    name: string;
    code_url: string;
  }[];
  license: string;
  version: string;
  locale: string;
  deleted: boolean;
  _mujs: {
    info: {
      engine: UserJSEngine;
      host?: string;
    };
    code: {
      meta: UserJSMeta | null;
      request(translate: boolean, code_url?: string): Promise<GSForkQuery['_mujs']['code']>;

      code_size?: string[];
      translated?: boolean;
      code?: string;
      data_meta_block?: string;
      data_code_block?: string;
      data_meta?: {
        [meta: string]: string | string[] | { [resource: string]: string };
      };
      data_names?: {
        text: string;
        domain: boolean;
        tld_extra: boolean;
      }[];
    };
    root?: HTMLTableRowElement;
  };
};

export type GSFork = {
  model: 'Script';
  term: string;
  options: {
    fields: string[];
    boost_by: string[];
    where: {
      script_type: number;
      locale: number;
      site_application_id: number;
      available_as_js: boolean;
    };
    order: { daily_installs: string };
    page: number;
    per_page: number;
    includes: string[];
  };
  query: GSForkQuery[];
};

export type UserJSEngine = {
  enabled: boolean;
  name: string;
  /**
   * Legacy
   */
  url?: string;
  token?: string;
  query: string;
  /**
   * Unsupport host for search engines
   */
  unsupported: string[];
};

export type UserJSBlacklist =
  | string
  | {
      enabled: boolean;
      regex: boolean;
      flags: string;
      name: string;
      url: string | string[];
    };

export interface FilterLayout {
  enabled: boolean;
  name: string;
  flag?: string;
  regExp: string;
}

export interface Filters extends FilterLayout {
  reg: RegExp;
  keyReg: RegExp;
  valueReg: RegExp;
}
//#region DEFAULT_CONFIG
export type config = {
  /**
   * List sorting on load
   */
  autoSort: string;
  /**
   * Fetch from engines on load
   */
  autofetch: boolean;
  /**
   * Inject list on load
   */
  autoinject: boolean;
  /**
   * Clear cache on tab close
   */
  clearTabCache: boolean;
  /**
   * `UserScript:` Sync config with UserScript manager
   */
  cache?: boolean;
  /**
   * Fetch all UserScript code on load
   */
  preview: {
    code: boolean;
    metadata: boolean;
  };
  /**
   * `UserScript:` Fullscreen list on load
   */
  autoexpand?: boolean;
  /**
   * Filter UserScripts that match `navigator.language`
   */
  filterlang: boolean;
  /**
   * Redirect UserScript from GreasyFork to SleazyFork
   */
  sleazyredirect: boolean;
  /**
   * `UserScript:` Miliseconds before list closes
   */
  time?: number;
  /**
   * Webpage and host blacklist
   */
  blacklist: UserJSBlacklist[];
  /**
   * Search engines
   */
  engines: UserJSEngine[];
  /**
   * Menu theme
   */
  theme: {
    'even-row': string;
    'odd-row': string;
    'even-err': string;
    'odd-err': string;
    'background-color': string;
    'gf-color': string;
    'sf-color': string;
    'border-b-color': string;
    'gf-btn-color': string;
    'sf-btn-color': string;
    'sf-txt-color': string;
    'txt-color': string;
    'chck-color': string;
    'chck-gf': string;
    'chck-git': string;
    'chck-open': string;
    placeholder: string;
    'position-top': string;
    'position-bottom': string;
    'position-left': string;
    'position-right': string;
    'font-family': string;
    // [key: string ]: string;
  };
  /**
   * Highlight UserScripts recommended by the author or UserScripts created by the author
   */
  recommend: {
    author: boolean;
    others: boolean;
    /**
     * Lets highlight me :)
     */
    authorID: number;
    /**
     * Lets highlight me :)
     */
    authorUrl: string;
    /**
     * Remove UserJS from banned accounts
     */
    blacklist: number[] | string[];
    /**
     * Some UserJS I personally enjoy - `https://greasyfork.org/scripts/{id}`
     */
    list: number[] | string[];
  };
  /**
   * Taken from https://greasyfork.org/scripts/12179
   */
  filters: {
    ASCII: FilterLayout;
    Latin: FilterLayout;
    Games: FilterLayout;
    SocialNetworks: FilterLayout;
    Clutter: FilterLayout;
  };
};
//#endregion
//#region Utilites
/**
 * Object to `[object *]`
 */
export declare function objToStr<O>(obj: O): string;
/**
 * Object is typeof `RegExp`
 */
export declare function isRegExp(obj: unknown): obj is RegExp;
/**
 * Object is typeof `HTMLElement`
 */
export declare function isHTML(obj: unknown): obj is HTMLElement;
/**
 * Object is typeof `Element`
 */
export declare function isElem(obj: unknown): obj is Element;
/**
 * Object is typeof `object` / JSON Object
 */
export declare function isObj(obj: unknown): obj is object;
/**
 * Object is typeof `Function`
 */
export declare function isFN(obj: unknown): obj is () => unknown;
/**
 * Object is `null` or `undefined`
 */
export declare function isNull(obj: unknown): obj is null;
export declare function isNull(obj: unknown): obj is undefined;
/**
 * Object is blank
 */
export declare function isBlank<O>(obj: O): boolean;
/**
 * Object is empty
 */
export declare function isEmpty<O>(obj: O): boolean;

// Element[]
// T extends string ? typeof root extends R ? Element[] : typeof root extends string ? string[] : A extends { keys: true; } ? T[] : [T] :
// typeof root extends R ? Element[] : typeof root extends string ? string[] : A extends { keys: true; } ? T[] : [T]
/**
 * Transform target into Array
 */
export declare function toArray<T, A extends Record<string, boolean>, R>(
  target: T,
  args: A,
  root: R
): T extends null | undefined
  ? []
  : T extends readonly unknown[]
    ? T
    : T extends Window | Document
      ? [T]
      : T extends HTMLElement
        ? T[]
        : T extends string
          ? R extends (Element | Document)
            ? Element[]
            : R extends string
              ? string[]
              : A extends { keys: true }
                ? T[]
                : [T]
          : A extends {
                entries: true;
              }
            ? T extends Record<infer K, infer V>
              ? Array<[K extends string ? K : string, V]>
              : Array<[string, unknown]>
            : A extends {
                  keys: true;
                }
              ? T extends Record<infer K, unknown>
                ? Array<K extends string ? K : string>
                : T extends Set<unknown> | Map<infer K, unknown>
                  ? K[]
                  : string[]
              : A extends {
                    values: true;
                  }
                ? T extends Record<string, infer V>
                  ? V[]
                  : T extends Set<infer V> | Map<unknown, infer V>
                    ? V[]
                    : unknown[]
                : T extends Iterable<infer U>
                  ? U[]
                  : unknown[];
// export declare function toArray<
//   T,
//   A extends Record<string, boolean>,
//   R extends Document | Node | HTMLElement | Element
// >(
//   target?: T | null,
//   args?: A,
//   root?: R | null | undefined
// ): T extends null | undefined
//   ? []
//   : T extends readonly unknown[]
//     ? T
//     : T extends (Window | Document)
//       ? [T]
//       : T extends R
//         ? [T]
//         : T extends string
//           ? A extends {
//               split: true;
//             }
//             ? string[]
//             : Document | Element | HTMLElement | null | undefined extends
//                   Document | Element | HTMLElement
//               ? Element[]
//               : [T]
//           : A extends {
//                 entries: true;
//               }
//             ? T extends Record<infer K, infer V>
//               ? Array<[K extends string ? K : string, V]>
//               : Array<[string, unknown]>
//             : A extends {
//                   keys: true;
//                 }
//               ? T extends Record<infer K, unknown>
//                 ? Array<K extends string ? K : string>
//                 : T extends Set<unknown> | Map<infer K, unknown>
//                   ? K[]
//                   : string[]
//               : A extends {
//                     values: true;
//                   }
//                 ? T extends Record<string, infer V>
//                   ? V[]
//                   : T extends Set<infer V> | Map<unknown, infer V>
//                     ? V[]
//                     : unknown[]
//                 : T extends Iterable<infer U>
//                   ? U[]
//                   : unknown[];

// /**
//  * Type is not 100% accurate
//  */
// export declare function normalizeTarget<T>(
//   target: T,
//   queryString?: boolean,
//   root?: Document | Element
// ): T[];
/**
 * Short hand for `evt.stopPropagation()` and `evt.preventDefault()`
 */
export declare function halt(evt: Event): void;
//#endregion

export interface NameElement extends HTMLTableCellElement {
  _mujs: {
    fmore: HTMLElement;
    fBtns: HTMLElement;
    codeArea: HTMLTextAreaElement;
  };
}

export interface ConfigElement extends HTMLElement {
  _mujs: {
    base: {
      text: string;
      tag: string;
      value: string;
      type: HTMLInputElement['type'];
      attrs: object;
      default: string | boolean | number | UserJSEngine | FilterLayout;
      cache: string | boolean | number | UserJSEngine | FilterLayout;
      elem: HTMLInputElement | HTMLSelectElement;
      elemUrl?: HTMLInputElement;
      elemToken?: HTMLInputElement;
    }[];
    sections: Set<HTMLElement>;
  };
}

export interface CounterElement extends HTMLElement {
  observedAttributes: string[];
  _mujs?: UserJSEngine;
}

declare global {
  interface HTMLElementTagNameMap {
    'main-userjs': HTMLElement;
    'count-frame': CounterElement;
    'mu-js': HTMLElement;
    'mujs-config': ConfigElement;
    /**
     * Made to "look like" a `HTMLButtonElement`
     */
    'mu-jsbtn': HTMLElement; // wtf y did I do this to myself
    /**
     * Made to "look like" a `HTMLAnchorElement`
     */
    'mujs-a': HTMLElement;
    'mujs-addtab': HTMLElement;
    'mujs-body': HTMLElement;
    /**
     * Made to "look like" a `HTMLButtonElement`
     */
    'mujs-btn': HTMLElement; // wtf y did I do this to myself
    'mujs-column': HTMLElement;
    'mujs-elem': HTMLElement;
    'mujs-header': HTMLElement;
    'mujs-host': HTMLElement;
    'mujs-main': HTMLElement;
    'mujs-root': HTMLElement;
    'mujs-row': HTMLElement;
    'mujs-section': HTMLElement;
    'mujs-tabs': HTMLElement;
    'mujs-tab': HTMLElement;
    'mujs-toolbar': HTMLElement;
    'mujs-url': HTMLElement;
  }
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
 */
export declare function ael<
  E extends Document | Window | HTMLElement,
  M extends HTMLElementEventMap | SVGElementEventMap | WindowEventMap,
  K extends keyof M
>(
  el: E,
  type: K,
  listener: (this: E, ev: M[K]) => unknown | EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions | boolean
): void;

/**
 * Returns the first element that is a descendant of node that matches selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function qs<E extends HTMLElement, S extends string>(selector: S, root: E): E | null;

/**
 * Returns all element descendants of node that match selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)
 */
export declare function qsA<E extends HTMLElement, S extends string>(
  selectors: S,
  root: E
): ReturnType<E['querySelectorAll']>;

/**
 * Set attributes for an element.
 * @param elem HTML element
 * @param attr Set attributes for the element
 */
export declare function formAttrs<E extends HTMLElement>(elem: E, attr?: E[keyof E]): E;

// /**
//  * Creates an instance of the element for the specified tag.
//  * @param tagName The name of an element.
//  * @param cname A className for the element.
//  * @param attrs Set attributes for the element.
//  *
//  * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/createElement)
//  */
// export declare function make<
//   M extends HTMLElementTagNameMap, // | SVGElementTagNameMap
//   K extends keyof M,
//   A extends keyof M[K]
// >(
//   tagName: K,
//   cname?:
//     | string
//     | string[]
//     | {
//         [key in A]: Record<string, unknown>;
//       },
//   attrs?: {
//     [key in A]: Record<string, unknown>;
//   }
// ): M[K];

/**
 * Creates an instance of the element for the specified tag.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/createElement)
 * @param tagName - The element to create
 * @param attributes - Set attributes for said element
 * @see {@link document.createElement}
 */
export declare function make<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  ...attributes: unknown[]
): HTMLElementTagNameMap[T];
export declare function make(tagName: string, ...attributes: unknown[]): HTMLElement;

/**
 * Based on uBlock Origin by Raymond Hill (https://github.com/gorhill/uBlock)
 *
 * [uBlock Origin Reference](https://github.com/gorhill/uBlock/blob/master/src/js/dom.js)
 */
export interface dom {
  attr<T extends HTMLElement, A extends string, V>(
    target: T,
    attr: A,
    value?: V
  ): V extends ReturnType<T['getAttribute']> ? V : this;
  prop<T extends HTMLElement, P extends keyof T, V extends T[keyof T]>(
    target: T,
    prop: P,
    value?: V
  ): V | undefined;
  text<T extends HTMLElement, V>(target: T, text?: V): string | null | undefined;
  remove<T extends HTMLElement>(target: T): this;
  cl: {
    add<T extends HTMLElement>(target: T, token: string | string[]): boolean;
    remove<T extends HTMLElement>(target: T, token: string | string[]): boolean;
    toggle<T extends HTMLElement>(target: T, token: string | string[], force?: boolean): boolean;
    has<T extends HTMLElement>(target: T, token: string | string[]): boolean;
  };
}

export class ParseUserJS {
  public code: string;
  public data_meta_block: string;
  public data_code_block: string;
  public data_meta: {
    [meta: string]: string | string[] | { [resource: string]: string };
  };
  public data_names: {
    text: string;
    domain: boolean;
    tld_extra: boolean;
  }[];
  public isUserCSS?: boolean;
  public META_START_COMMENT?: '// ==UserScript==' | '/* ==UserStyle==';
  public META_END_COMMENT?: '// ==/UserScript==' | '==/UserStyle== */';
  public constructor(code: string, isCSS?: boolean);
  public get_meta_block(): string;
  public get_code_block(): string | null;
  public parse_meta(): ParseUserJS['data_meta'];
  public calculate_applies_to_names():
    | ParseUserJS['data_names']
    | {
        domain: false;
        text: 'All sites';
        tld_extra: false;
      };
  public intersect<T>(a: T[], ...arr: T[][]): boolean;
  public static getNames(patterns?: string[]): ParseUserJS['data_names'];
  public request<O extends GSForkQuery>(
    translate: boolean | undefined,
    code_url: O['code_url'],
    obj?: O
  ): Promise<this>;
}

export class BaseContainer {
  public static prompts: HTMLElement[];
  private blacklist: boolean;
  public config: config;

  public webpage: URL;
  public host: string;
  public domain: string;
  public ready: boolean;
  public injected: boolean;
  public frame: HTMLElement;
  public hostCache?: Map<string, HTMLElement>;
  public userjsCache: Map<number, GSForkQuery>;
  public root: HTMLElement;
  public unsaved: boolean;
  public isBlacklisted: boolean;
  public rebuild: boolean;
  public opacityMin: string;
  public opacityMax: string;
  public elementsReady?: boolean;
  public timeouts?: {
    frame: Timeout;
    mouse: Timeout;
  };
  public Tabs?: Tabs;
  public mainframe?: HTMLElement;
  public countframe?: HTMLElement;
  public mainbtn?: HTMLElement;
  public urlBar: HTMLInputElement;
  public rateContainer?: HTMLElement;
  public footer?: HTMLElement;
  public tabbody?: HTMLElement;
  public promptElem?: HTMLElement;
  public toolbar?: HTMLElement;
  public table?: HTMLTableElement;
  public tabhead?: HTMLTableSectionElement;
  public header?: HTMLElement;
  public tbody?: HTMLTableSectionElement;
  public cfgpage: ConfigElement;
  public main: HTMLElement;
  public urlContainer?: HTMLElement;
  public btnframe?: HTMLElement;
  public btnHandles?: HTMLElement;
  public btnHide?: HTMLElement;
  public btnfullscreen?: HTMLElement;
  public closebtn?: HTMLElement;
  public btncfg?: HTMLElement;
  public btnhome?: HTMLElement;
  public btnissue?: HTMLElement;
  public btngreasy?: HTMLElement;
  public btnnav?: HTMLElement;
  public constructor(config?: config);
  public injFN?: () => void;
  public inject(callback: (this: this, shadowRoot: ShadowRoot) => unknown, doc?: Document): this;
  public initFn(): this;
  public init(): boolean;
  public remove(): this;
  public save(): Promise<config>;
  /**
   * @param css - CSS to inject
   * @param name - Name of stylesheet
   * @return Style element
   */
  public loadCSS<C extends string, N extends string>(
    css: C,
    name?: N
  ): HTMLStyleElement | undefined;
  public checkBlacklist<S extends string>(str: S): boolean;
  public setTheme(): this;
  public makePrompt<S extends string>(txt: S, dataset?: object, usePrompt?: boolean): HTMLElement;
  public showError<E extends string | Error>(...ex: E[]): this;
  public refresh(): this;
  public reloadConfig(): this;
  /**
   * Redirects sleazyfork userscripts from greasyfork.org to sleazyfork.org
   *
   * Taken from: https://greasyfork.org/scripts/23840
   */
  public redirect(): this;
  public timeoutFrame<N extends number>(time?: N): Promise<this>;
  public toElem(): HTMLElement[];
  public get rootElem(): HTMLElement | ShadowRoot;
  public [Symbol.iterator](): Generator<GSForkQuery, void, undefined>;
}
