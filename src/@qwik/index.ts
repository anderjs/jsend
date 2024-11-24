import { html, LitElement } from "lit";
import { render } from "@builder.io/qwik";
import { getId, type HostQwikOptions } from "@nectiasw/common";

export function createQwikRoot({
  id,
  loadQwikApp,
}: HostQwikOptions): CustomElementConstructor {
  return class App extends LitElement {
    private mount: boolean = true;

    public createRenderRoot() {
      return this;
    }

    async updated(): Promise<void> {
      const container = this.renderRoot.querySelector(getId(id));

      if (container && this.mount) {
        try {
          const { default: QwikApp } = await loadQwikApp();

          await render(container, QwikApp);

          this.mount = false;
        } catch (e) {
          console.error("Error al cargar Qwik app:", e);
        }
      }
    }

    public disconnectedCallback(): void {
      super.disconnectedCallback();

      const container = this.renderRoot.querySelector(getId(id));

      if (container) {
        container.innerHTML = "";
      }
    }

    public render() {
      return html`<div id=${id}></div>`;
    }
  };
}
