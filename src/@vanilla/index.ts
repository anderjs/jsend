import { getId, HostVanillaOptions } from "@nectiasw/common";
import { html, LitElement } from "lit";



export function createVanillaRoot({
  id,
  component,
}: HostVanillaOptions): CustomElementConstructor {
  return class App extends LitElement {
    private app: Element | null = null;

    public createRenderRoot() {
      return this;
    }

    async firstUpdated(): Promise<void> {
      const container = this.renderRoot.querySelector(getId(id));

      if (container && !this.app) {
        try {
          this.app = container.appendChild(component);
        } catch (e) {
          console.error("Error al cargar Vanilla app:", e);
        }
      }
    }

    public async disconnectedCallback(): Promise<void> {
      super.disconnectedCallback();

      if (this.app) {
        const container = this.renderRoot.querySelector(getId(id));

        container?.removeChild(this.app);

        this.app = null;
      }
    }

    public render() {
      return html`<div id=${id}></div>`;
    }
  };
}
