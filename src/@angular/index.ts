import { html, LitElement } from "lit";
import { getId, HostNgOptions } from "@nectiasw/common";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

export type AngularApp = {
  destroy: () => void;
};

export function createAngularRoot({
  id,
  loadNgApp,
}: HostNgOptions): CustomElementConstructor {
  return class App extends LitElement {
    private runtime: AngularApp | null = null;

    public createRenderRoot() {
      return this;
    }

    async firstUpdated(): Promise<void> {
      const container = this.renderRoot.querySelector(getId(id));

      if (container && !this.runtime) {
        try {
          const { AppModule } = await loadNgApp();

          const platform = platformBrowserDynamic();

          const moduleRef = await platform.bootstrapModule(AppModule);

          this.runtime = {
            destroy: () => moduleRef.destroy(),
          };

          const appRoot = container.querySelector("app-root");

          if (appRoot) {
            container.appendChild(appRoot);
          }
        } catch (e) {
          console.error("Error al cargar Angular app:", e);
        }
      }
    }

    public disconnectedCallback(): void {
      super.disconnectedCallback();

      if (this.runtime) {
        this.runtime.destroy();

        this.runtime = null;
      }
    }

    public render() {
      return html`
        <div id=${id}>
          <app-root></app-root>
        </div>
      `;
    }
  };
}
