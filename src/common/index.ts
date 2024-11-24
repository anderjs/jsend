import type { App } from "vue";
import type { Type } from "@angular/core";
import type { SvelteComponent } from "svelte";


export interface HostOptions {
  id: string;
  name: string;
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

export const getId = (id: string) => `#${id}`;