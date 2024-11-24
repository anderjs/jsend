import { html, LitElement } from "lit";
import { type Component } from "svelte";
import { getId, type HostSvelteOptions } from "@nectiasw/common";

export function createSvelteRoot({
  id,
  loadSvelteApp,
}: HostSvelteOptions): CustomElementConstructor {
  return class App extends LitElement {
    private app: Component | null = null;

    public createRenderRoot() {
      return this;
    }

    async firstUpdated(): Promise<void> {
      const container = this.renderRoot.querySelector(getId(id));

      if (container && !this.app) {
        try {
          const { mount } = await import ("svelte");

          const { default: SvelteApp } = await loadSvelteApp();

          mount(SvelteApp, {
            target: container,
          });
        } catch (e) {
          console.error("Error al cargar Svelte app:", e);
        }
      }
    }

    public async disconnectedCallback(): Promise<void> {
      super.disconnectedCallback();

      if (this.app) {
        const { unmount } = await import("svelte");

        unmount(this.app);

        this.app = null;
      }
    }

    public render() {
      return html`<div id=${id}></div>`;
    }
  };
}
