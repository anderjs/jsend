import { html, LitElement } from "lit";
import { getId, type HostSolidOptions } from "@nectiasw/common";

/**
 * @description
 * Mount an application of solid on lit element.
 */
export function createSolidRoot({
  id,
  loadSolidApp,
}: HostSolidOptions): CustomElementConstructor {
  return class App extends LitElement {
    private dispose: (() => void) | null = null; 

    private mount: boolean = true;

    public createRenderRoot() {
      return this;
    }

    async updated(): Promise<void> {
      const container = this.renderRoot.querySelector(getId(id));

      if (container && this.mount) {
        try {
          const { render } = await import("solid-js/web");

          const node = await loadSolidApp();

          this.dispose = render(node as never, container);

          this.mount = false;
        } catch (e) {
          console.error("Error al cargar React app:", e);
        }
      }
    }

    public disconnectedCallback(): void {
      super.disconnectedCallback();

      if (this.dispose) {
        this.dispose();

        this.dispose = null;
      }
    }

    public render() {
      return html`<div id=${id}></div>`;
    }
  }
}