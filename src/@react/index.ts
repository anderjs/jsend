import { html, LitElement } from "lit";
import { getId, HostReactOptions } from "@nectiasw/common";

export type ReactApp = ReturnType<typeof import("react-dom/client").createRoot>;


/**
 * @description
 * Mount an application of react on lit element.
 */
export function createReactRoot({
  id,
  loadReactApp,
}: HostReactOptions): CustomElementConstructor {
  return class App extends LitElement {
    private app: ReactApp | null = null;

    private mount: boolean = true;

    public createRenderRoot() {
      return this;
    }

    async updated(): Promise<void> {
      const container = this.renderRoot.querySelector(getId(id));

      if (container && this.mount) {
        try {
          const React = await import("react");

          const { createRoot } = await import("react-dom/client");

          const App = await loadReactApp();

          const root = createRoot(container);

          root.render(React.createElement(App));

          this.mount = false;

          this.app = root;
        } catch (e) {
          console.error("Error al cargar React app:", e);
        }
      }
    }

    public disconnectedCallback(): void {
      super.disconnectedCallback();

      if (this.app) {
        this.app.unmount();
      }
    }

    public render() {
      return html`<div id=${id}></div>`;
    }
  }
}