import { html, LitElement } from "lit";
import { createApp, type App as Vue } from "vue";
import { getId, type HostVueOptions } from "@nectiasw/common";

export function createVueRoot({
  id,
  loadVueApp,
}: HostVueOptions): CustomElementConstructor {
  return class App extends LitElement {
    private app: Vue | null = null;

    public createRenderRoot() {
      return this;  
    }

    async firstUpdated(): Promise<void> {
      const container = this.renderRoot.querySelector(getId(id));

      if (container && !this.app) {
        try {
          const { default: VueApp } = await loadVueApp();

          this.app = createApp(VueApp);

          this.app.mount(container);
        } catch (e) {
          console.error("Error al cargar Vue app:", e);
        }
      }
    }

    public disconnectedCallback(): void {
      super.disconnectedCallback();

      if (this.app) {
        this.app.unmount();

        this.app = null;
      }
    }

    public render() {
      return html`<div id=${id}></div>`;
    }
  };
}
