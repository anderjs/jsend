import type { App } from "vue";
import type { Type } from "@angular/core";
import type { SvelteComponent } from "svelte";
import type { JSXOutput } from "@builder.io/qwik";


export interface HostOptions {
  id: string;
  name: string;
}

export interface HostQwikOptions {
  id: string;
  loadQwikApp: () => Promise<{
    default: () => JSXOutput;
  }>;
}


export interface HostVueOptions extends HostOptions {
  id: string;
  loadVueApp: () => Promise<{ default: App }>;
}

export interface HostReactOptions extends HostOptions {
  loadReactApp: () => Promise<React.ComponentType<never>>;
}

export interface HostNgOptions extends HostOptions {
  loadNgApp: () => Promise<{
    AppModule: Type<never>;
  }>;
}

export interface HostSvelteOptions extends HostOptions {
  id: string;
  loadSvelteApp: () => Promise<{
    default: typeof SvelteComponent;
  }>;
}

export interface HostSolidOptions extends HostOptions {
  id: string;
  loadSolidApp: () => Promise<() => React.JSX.Element>;
}

export interface HostVanillaOptions {
  id: string;
  component: Element;
}


export const getId = (id: string) => `#${id}`;