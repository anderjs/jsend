import classNames from "clsx";
import type { SelectProps } from ".";

export type Override<T, U> = Omit<T, keyof U> & U;

export type OverrideBuilder = Override<
  Builder,
  {
    backgrounds: typeof Builder.prototype.backgrounds;
    variants: typeof Builder.prototype.variants;
  }
>;

class Builder {
  private base: string;

  private props: Partial<SelectProps>;

  public variants = {
    xs: "text-xs font-medium",
    sm: "text-sm font-medium",
    lg: "font-medium",
    xl: "font-medium",
    xxl: "font-medium",
    base: "font-medium",
  };

  public backgrounds: Record<string, string> = {
    outline: "text-secondary",
    primary: "text-primary primary",
    secondary: "text-secondary secondary",
    hoursPicker: "text-info",
  };

  private disabled: Record<string, Record<string, string>> = {
    on: {
      primary: "",
      secondary: "",
      hoursPicker: "",
    },
    off: {
      primary: "",
      secondary: "",
      hoursPicker: "",
    },
  };

  public tailwind: string;

  public option?: string;

  public text: string;

  constructor(props: Partial<SelectProps>, override?: OverrideBuilder) {
    this.base = "w-full";

    this.props = props;

    this.tailwind = this.buildClassName();

    this.text = this.getText();

    if (override?.backgrounds) {
      this.backgrounds = override.backgrounds;
    }

    if (override?.variants) {
      this.variants = override.variants;
    }
  }

  private buildClassName() {
    const { variant, size, disabled } = this.props;
    return classNames(
      this.base,
      size && this.variants[size],
      variant && this.backgrounds[variant],
      variant &&
        (disabled ? this.disabled.on[variant] : this.disabled.off[variant])
    );
  }

  public getText() {
    const { size } = this.props;

    return classNames(size && this.variants[size]);
  }
}

export { Builder };
