import { Type } from "@angular/core";

export interface HostOptions {
  id: string;
  name: string;
}

export interface HostReactOptions extends HostOptions {
  loadReactApp: () => Promise<React.ComponentType<never>>;
}

export interface HostNgOptions extends HostOptions {
  loadNgApp: () => Promise<{
    AppModule: Type<never>;
  }>;
}
