import { TableProps, Heading } from "./types";

export type Override<T, U> = Omit<T, keyof U> & U;

export type OverrideBuilder = Override<
  Builder,
  {
    variants: typeof Builder.prototype.variants;
  }
>;

class Builder {
  public variants = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
  };

  public tailwind: string = "";

  public headings: string[] = [];

  constructor(props: Partial<TableProps>) {
    this.headings = this.buildStyle(props.headers ?? []);
  }

  buildStyle(headers: string[] | Heading[]) {
    return headers.map((header: string | Heading) => {
      if (typeof header === "object") {
        switch (header.size) {
          case "sm":
            return this.variants.sm;

          case "md":
            return this.variants.md;

          case "lg":
            return this.variants.lg;

          case "xl":
            return this.variants.xl;

          default:
            return this.variants.md;
        }
      }

      return header;
    });
  }
}

export { Builder };