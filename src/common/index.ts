import type { App } from "vue";
import type { Type } from "@angular/core";
import type { SvelteComponent } from "svelte";
import type { JSXOutput } from "@builder.io/qwik";
import type { ComponentType } from "react";

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
  loadVueApp: () => Promise<App>;
}

export interface HostReactOptions extends HostOptions {
  loadReactApp: () => Promise<ComponentType<never>>;
}

export interface HostNgOptions extends HostOptions {
  loadNgApp: () => Promise<Type<never>>;
}

export interface HostSvelteOptions extends HostOptions {
  id: string;
  loadSvelteApp: () => Promise<SvelteComponent>;
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
