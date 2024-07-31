import classNames from "clsx";
import { ButtonProps } from "./types";

export type Override<T, U> = Omit<T, keyof U> & U;

export type OverrideBuilder = Override<
  Builder,
  {
    backgrounds: typeof Builder.prototype.backgrounds;
    variants: typeof Builder.prototype.variants;
  }
>;

type CommonObject = Record<string, Record<string, string>>;

class Builder {
  private base: string;

  private props: Partial<ButtonProps>;

  public variants: Record<string, string> = {
    xs: "h-7 py-1 px-4 font-medium",
    sm: " h-8 p-bsm py-1 px-4 font-medium",
    lg: "h-10 gap-2 py-1 px-4 font-medium",
    xl: "h-12 gap-2 py-1 px-4 font-medium",
    xxl: "h-14 gap-2 py-1 px-4 font-medium",
    base: "h-9 py-1 px-4 font-medium",
    circle: "rounded-full p-2 w-8 h-8 flex items-center justify-center",
  };

  public fontSize: Record<string, string> = {
    xs: "text-xs",
    sm: "text-sm",
    lg: "text-lg",
    xl: "text-xl",
    xxl: "text-2xl",
    base: "text-base",
  };

  public backgrounds: Record<string, string> = {
    primary: "bg-primary",
    danger: "bg-danger",
    ["danger-outline"]:
      "bg-white border border-[1px] border-solid border-danger text-danger hover:bg-danger hover:border-solid hover:border-white hover:text-white text-contained",
    ["primary-outline"]: "bg-white",
    ["darkened-outline"]: "bg-white",
    ["secondary-outline"]: "bg-white",
    secondary: "bg-secondary",
    secondarymuted: "bg-secondary",
    disabled: "bg-disabled",
    tertiary: "bg-tertiary",
    quaternary: "bg-quaternary",
    quinary: "bg-quinary",
    senary: "bg-senary",
  };

  private disabled: CommonObject = {
    on: {
      danger: "!opacity-50 text-contained",
      primary: "!opacity-50 text-contained",
      secondary: "!opacity-50 text-contained",
      secondarymuted: "bg-opaque text-contained",
      tertiary: "!opacity-50 text-outlined",
      quaternary: "!opacity-50 text-outlined",
      quinary: "!opacity-50 text-white",
      senary: "!opacity-50 text-outlined",
    },
    off: {
      danger:
        "hover:bg-white hover:border-solid hover:border-danger hover:text-danger text-contained",
      primary:
        "hover:bg-white hover:border-solid hover:border-primary hover:text-primary text-contained",
      secondary:
        "hover:bg-white hover:border-solid hover:border-secondary hover:text-secondary text-contained",
      secondarymuted:
        "hover:bg-white hover:border-solid hover:border-secondary hover:text-secondary text-contained",
      tertiary: "text-darkened bg-app hover:bg-white hover:text-primary",
      quaternary:
        "bg-white text-secondary border border-solid border-secondary hover:bg-primary hover:text-white",
      quinary: "bg-quinary text-white text-contained rounded-full",
      senary:
        "text-secondary border border-solid border-secondary hover:bg-secondary hover:text-white",
      ["info-outline"]: `border border-[1px] border-solid border-info text-info hover:bg-info hover:border-solid hover:border-white hover:text-white text-contained`,
      ["danger-outline"]: `border border-[1px] border-solid border-danger text-danger hover:bg-danger hover:border-solid hover:border-white hover:text-white text-contained`,
      ["primary-outline"]: `border border-[1px] border-solid border-primary text-primray hover:bg-primary hover:border-solid hover:border-white hover:text-white text-contained`,
      ["darkened-outline"]: `border border-[1px] border-solid border-darkened text-darkened hover:bg-darkened hover:border-solid hover:border-white hover:text-white text-contained`,
      ["secondary-outline"]: `border border-[1px] border-solid border-secondary text-secondary hover:bg-secondary hover:border-solid hover:border-white hover:text-white text-contained`,
    },
  };

  private active: Record<string, string> = {
    on: "rounded-full bg-white text-primary",
    off: "text-darkened hover:bg-white hover:text-primary",
  };

  public tailwind: string;

  constructor(props: Partial<ButtonProps>, override?: OverrideBuilder) {
    this.base = "rounded-full whitespace-nowrap";

    this.props = props;

    this.buildClassName = this.buildClassName.bind(this);

    this.getDisabledStyle = this.getDisabledStyle.bind(this);

    if (override?.backgrounds) {
      this.backgrounds = override.backgrounds;
    }

    if (override?.variants) {
      this.variants = override.variants;
    }

    this.tailwind = this.buildClassName();
  }

  private getDisabledStyle(): string {
    const { variant, disabled, disabledStyle } = this.props;

    if (disabled) {
      if (typeof disabledStyle === "string") {
        return disabledStyle;
      }
      if (typeof disabledStyle === "object") {
        return Object.entries(disabledStyle)
          .map(([key, value]) => `${key}-${value}`)
          .join(" ");
      }
      return this.disabled.on[variant as string];
    }

    return this.disabled.off[variant as string];
  }

  private buildClassName() {
    const { className, variant, activeAsTab, size, fontSize } = this.props;

    // eslint-disable-next-line no-prototype-builtins
    const hasActiveKey = Object(this.props).hasOwnProperty("activeAsTab");

    const currentBackground: string = this.backgrounds[variant as string];

    if (hasActiveKey) {
      return classNames(
        this.base,
        className && className,
        size && this.variants[size],
        fontSize ? `text-${fontSize}` : size && this.fontSize[size],
        variant && currentBackground,
        activeAsTab ? this.active.on : this.active.off
      );
    }

    return classNames(
      this.base,
      className && className,
      size && this.variants[size],
      fontSize ? `text-${fontSize}` : size && this.fontSize[size],
      variant && currentBackground,
      this.getDisabledStyle()
    );
  }
}

export { Builder };
