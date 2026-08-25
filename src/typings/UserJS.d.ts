// import GM from '@types/greasemonkey';
// import '@types/tampermonkey';
import '@violentmonkey/types';
import { config, ConfigElement, UserJSEngine, type GSForkQuery } from './types';
import './scheduler';

/** [i18n directory](https://github.com/magicoflolis/Userscript-Plus/tree/master/src/_locales) */
export const translations: {
  [i18n: string]: {
    [key: string]: string;
  };
};
/** [source code](https://github.com/magicoflolis/Userscript-Plus/blob/master/src/sass/_main.scss) */
export const main_css: string;

export const BLANK_PAGE: 'about:blank';

/**
 * Some sites will alter or remove document functions
 * To get around this we bind them to the `_self` object
 *
 * This method is based on uBlock Origin `scriptlets.js` file
 *
 * [scriptlets.js](https://github.com/gorhill/uBlock/blob/master/src/js/resources/scriptlets.js)
 */
export interface safeHandles {
  XMLHttpRequest: typeof XMLHttpRequest;
  CustomEvent: typeof CustomEvent;
  HTMLElement: typeof HTMLElement;
  customElements: typeof customElements;
  createElement: typeof document.createElement;
  createElementNS: typeof document.createElementNS;
  createTextNode: typeof document.createTextNode;
  setTimeout: typeof setTimeout;
  clearTimeout: typeof clearTimeout;
  navigator: typeof navigator;
  // customElements: typeof customElements;
  /** Taken from [scheduler-polyfill](https://github.com/GoogleChromeLabs/scheduler-polyfill) */
  scheduler: typeof scheduler;
  /**
   * Groups members of an iterable according to the return value of the passed callback.
   * @param items An iterable.
   * @param keySelector A callback which will be invoked for each item in items.
   */
  groupBy<K extends PropertyKey, T>(
    items: Iterable<T>,
    keySelector: (item: T, index: number) => K
  ): Partial<Record<K, T[]>>;
}

export class Safe {
  public constructor();
  public _self: safeHandles | null;
}

export interface Translations {
  createdby: string;
  name: string;
  daily_installs: string;
  close: string;
  filterA: string;
  max: string;
  min: string;
  search: string;
  search_placeholder: string;
  install: string;
  issue: string;
  version_number: string;
  updated: string;
  total_installs: string;
  ratings: string;
  good: string;
  ok: string;
  bad: string;
  created_date: string;
  redirect: string;
  filter: string;
  dtime: string;
  save: string;
  reset: string;
  preview_code: string;
  saveFile: string;
  newTab: string;
  applies_to: string;
  license: string;
  no_license: string;
  antifeatures: string;
  userjs_fullscreen: string;
  listing_none: string;
  export_config: string;
  export_theme: string;
  import_config: string;
  import_theme: string;
  code_size: string;
  prmpt_css: string;
  userjs_inject: string;
  userjs_close: string;
  userjs_sync: string;
  userjs_autoinject: string;
  auto_fetch: string;
}

export interface LanguageTranslations {
  ar: Translations;
  de: Translations;
  en: Translations;
  en_GB: Translations;
  es: Translations;
  fr: Translations;
  ja: Translations;
  nl: Translations;
  pl: Translations;
  ru: Translations;
  zh: Translations;
  zh_CN: Translations;
  zh_TW: Translations;
}

// export declare const translations: LanguageTranslations;

export declare function i18n$<K extends keyof Translations>(
  key: string
): Translations[K] | 'INVALID KEY';

export declare function observe<E extends Node>(
  element: E,
  listener: MutationCallback,
  options: MutationObserverInit
): MutationObserver;

/**
 * Opens a new window and loads a document specified by a given URL. Also, opens a new window that uses the url parameter and the name parameter to collect the output of the write method and the writeln method.
 * @param url Specifies a MIME type for the document.
 *
 * [Violentmonkey Reference](https://violentmonkey.github.io/api/gm/#gm_openintab)
 *
 * [Greasespot Reference](https://wiki.greasespot.net/GM.openInTab)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/open)
 */
export declare function openTab(url: string | URL): WindowProxy | null;

export class StorageSystem {
  public static prefix: string;
  public static events: Set<() => void | number>;
  /**
   * Alias of `window.localStorage.getItem`
   */
  public static getItem<K extends string>(key: K): string | null;

  public static has<K extends string>(key: K): boolean;

  /**
   * Alias of `window.localStorage.setItem`
   */
  public static setItem<K extends string, V extends string>(key: K, value: V): StorageSystem;

  /**
   * Alias of `window.localStorage.removeItem`
   */
  public static remove<K extends string>(key: K): StorageSystem;

  public static addListener<T>(
    name: string,
    callback: VMScriptGMValueChangeCallback<T>
  ): number | StorageSystem;

  public static attach(): StorageSystem;

  /**
   * Set value - Saves key to either GM managed storage or `window.localStorage`
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_setvalue)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
   */
  public static setValue<K extends string, V>(key: K, v: V): Promise<StorageSystem>;

  /**
   * Get value
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_getvalue)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
   */
  public static getValue<K extends string, D>(key: K, def?: D): Promise<D>;
}

export interface Network {
  // requestURL: string | Request | URL
  /**
   * Fetch a URL with fetch API as fallback
   *
   * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest)
   *
   * [XMLHttpRequest MDN Reference](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest)
   *
   * [Fetch MDN Reference](https://developer.mozilla.org/docs/Web/API/Fetch_API)
   */
  req<R = string | Request | URL, T = string | Blob | ArrayBuffer | Document | object | Response>(
    requestURL: R,
    method: Request['method'],
    responseType: VMScriptResponseType,
    data: VMScriptGMXHRDetails<T> | RequestInit,
    useFetch: boolean
  ): Promise<T>;
  format(bytes: number, decimals: number): string;
  sizes: string[];
}
//#region Testing crap
export class Timeout {
  public ids: number[];
  public constructor();
  public set<R>(delay: number, reason?: R | undefined): Promise<unknown>;
  public clear(...ids: number[]): this;
}
export class Tabs {
  // public eventListeners: {
  //   [event in keyof tabEvents]: Set<{ listener: tabEvents[event]; options?: { once: true } }>;
  // };
  public events: Set<{
    type: keyof tabEvents;
    listener: tabEvents[keyof tabEvents];
    options?: { once: true };
  }>;
  public pool: Set<HTMLElement>;
  public blank: typeof BLANK_PAGE;
  // public BANG: string;
  public protocal: 'mujs:';
  public protoReg: RegExp;
  public el: {
    [key: string]: HTMLElement;
  };
  public custom: () => void;
  public constructor(root: HTMLElement);
  public get _pool(): HTMLElement[];
  public get _active(): HTMLElement | null;
  public getTab<H>(hostname: H): HTMLElement | null;
  public validate<H>(hostname: H): string;
  public addListener<K extends keyof tabEvents>(
    type: K,
    listener: tabEvents[K],
    options?: {
      once: true;
    }
  ): void;
  private dispatch<K extends keyof tabEvents>(type: K, ...args: unknown[]): this;
  public intFN<H>(hostname: H): this;
  public active<T extends HTMLElement>(tab: T, build?: boolean | undefined): this;
  public close<T extends HTMLElement>(tab: T): this;
  public create(hostname?: string | undefined): HTMLElement | null;
}
export interface tabEvents {
  active: (this: Tabs, tab: HTMLElement, build: boolean) => void;
  close: (this: Tabs, tab: HTMLElement) => void;
  create: (
    this: Tabs,
    tab: HTMLElement,
    tabHost: HTMLElement,
    tabClose: HTMLElement,
    host: string,
    hostname: string | undefined
  ) => void;
  internal: (this: Tabs, tab: HTMLElement) => void;
}

export class Container {
  public static prompts: HTMLElement[];
  public webpage: URL;
  public host: string;
  public domain: string;
  public ready: boolean;
  public injected: boolean;
  // public shadowRoot?: ShadowRoot;
  // public shadowSupport: boolean;
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
  public injFN?: () => void;
  public inject(
    // callback: (this: this, shadowRoot: this['shadowRoot']) => any,
    callback: (this: this, shadowRoot: ShadowRoot) => unknown,
    doc?: Document
  ): this;
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

export class List {
  public constructor(hostname?: string);
  private intEngines: UserJSEngine[];
  private intHost: string;
  public dispatch(ujs: GSForkQuery): this;
  public get engines(): UserJSEngine[];
  public get host(): List['intHost'];
  public setEngines<E extends UserJSEngine>(engines?: E[]): E[];
  public setHost<S extends string>(hostname: S): S;
  public getDomain<S extends string>(str?: S): S;
  public build(): this;
  public sortRecords(): this;
  public groupBy(): Record<string | number | symbol, unknown[]>;
  public [Symbol.iterator](): Generator<GSForkQuery, void, undefined>;
}
//#endregion

declare global {
  let translations: {
    [i18n: string]: {
      [key: string]: string;
    };
  };
  let userjs: {
    /**
     * this should always be `true` otherwise the script won't execute
     */
    UserJS: boolean;
    isMobile?: boolean;
  };
}
