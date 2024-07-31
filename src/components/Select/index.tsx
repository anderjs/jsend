import React from "react";
import { formatHourTime, removeHourFormat } from "@nectiasw/utils/time";
import {
  components,
  StylesConfig,
  InputActionMeta,
  IndicatorsContainerProps,
  DropdownIndicatorProps,
} from "react-select";
import { StyledSelect } from "./styled";
import { ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { OverrideBuilder } from "./builder";

enum Binding {
  TIME = 2,
  LEADING = 1,
  FORMATTED = 3,
}

/**
 * @description
 * This is a description of the TwSelect component and what it does in one or two sentences.
 */
export const Select: React.FunctionComponent<SelectProps> = React.memo(
  (props) => {
    const {
      time,
      value,
      size,
      hours,
      variant,
      options,
      control,
      devtools,
      onClear,
      onPick,
      onSelect,
      position,
      disabled,
      className,
      container,
      listHeight,
      placeholder,
      defaultValue,
      onTypingHour,
      isSearchable,
      optionFontSize,
      handleKeyDown,
    } = props;

    const [open, setOpen] = React.useState<boolean>(false);

    const handleChange = React.useCallback(
      (value: unknown) => {
        onSelect?.(value as Option);
      },
      [onSelect]
    );

    const handleClear = React.useCallback(() => {
      onClear?.();
    }, [onClear]);

    const handleHour = React.useCallback(
      (value: unknown) => {
        const ref = value as Option;

        onTypingHour?.(undefined);

        onPick?.(ref);
      },
      [onPick, onTypingHour]
    );

    const handleChangeInput = React.useCallback(
      (input: string, { action }: InputActionMeta) => {
        const lengthRequired = 5;

        if (action === "input-change" && input.length <= lengthRequired) {
          const format = removeHourFormat(input);

          const isHourFormat = new RegExp(
            /^(?:(?:[01]?\d|2[0-3])([0-5]\d)?)?$/
          );

          const isAlmostHour = new RegExp(
            /^(?:0\d{3}|1\d{3}|2[0-3]\d{2}|[0-5]\d{2}|00\d|000)$/
          );

          if (
            input === defaultString ||
            isHourFormat.test(format) ||
            isAlmostHour.test(format)
          ) {
            return onTypingHour?.(input);
          }
        }

        /**
         * @description
         * Making the hour selected on the input.
         */
        if (action == "menu-close" && time) {
          const isHourFormat = new RegExp(
            /^(?:(?:[01]?\d|2[0-3])([0-5]\d)?)?$/
          );

          /**
           * @description
           * Removing the format.
           */
          const normalize = removeHourFormat(time);

          /**
           * @description
           * Formatiing the time.
           */
          const contextTimeRef = formatHourTime(time);

          /**
           * @descriptionr
           * When the menu is closed the current typing hour is disabled.
           */
          onTypingHour?.(undefined);

          /**
           * @description
           * Checking the valid hour.
           */
          if (
            isHourFormat.test(normalize) &&
            contextTimeRef.length === lengthRequired
          ) {
            return onPick?.({
              key: contextTimeRef,
              label: contextTimeRef,
              value: contextTimeRef,
            });
          }

          /**
           * @description
           * Is not? then we put the default option.
           */
          if (options?.length) {
            onPick?.(undefined);

            onTypingHour?.(undefined);
          }
        }
      },
      [onTypingHour, onPick, time, options]
    );

    /**
     * @description
     * Keydown to detect where am deleting a character.
     */
    const handleKeydown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (time) {
          if (e.key === "Enter") {
            e.preventDefault();

            setOpen(false);

            return onTypingHour?.(time);
          }

          if (e.key === "Backspace" && e.target instanceof HTMLInputElement) {
            const { selectionStart } = e.target;

            const input = removeHourFormat(time);

            /**
             * @description
             * Will not allow to edit hour if minutes are allowed invalidating weird behaviours.
             */
            if (
              (selectionStart === Binding.LEADING ||
                selectionStart === Binding.TIME) &&
              input.length >= Binding.FORMATTED
            ) {
              onTypingHour?.(undefined);
            }
          }
        }
      },
      [time, onTypingHour]
    );

    /**
     * @description
     * Add a Clear Input button if the function has been passed via props.
     */
    const IndicatorsContainer = React.useCallback(
      (props: IndicatorsContainerProps) => {
        return (
          <>
            {onClear && (
              <span className="w-6 h-6" onClick={handleClear}>
                <XCircleIcon className="w-6 h-6" onClick={handleClear} />
              </span>
            )}
            <components.IndicatorsContainer {...props} />
          </>
        );
      },
      [onClear, handleClear]
    );

    const styles = React.useMemo<StylesConfig>(() => {
      if (hours) {
        return {
          option: (provided, state) => {
            const option = state.data as Option;

            const innerRef = state.selectProps.value;

            if (value && option.label === defaultValue) {
              return {
                ...provided,
                backgroundColor: "#F3F3F3",
              };
            }

            return {
              ...provided,
              backgroundColor:
                option.label === innerRef || option.label === defaultValue
                  ? "#F3F3F3"
                  : "#FFFFFF",
            };
          },
          control: (provided) => ({
            ...provided,
            display: "flex",
            padding: "2px",
            alignItems: "center",
            flexDirection: "row-reverse",
          }),
        };
      }
      return {
        option: (provided, state) => {
          const option = state.data as Option;

          const innerRef = state.selectProps.value;

          if (value && option.label === defaultValue) {
            return {
              ...provided,
              backgroundColor: "#F3F3F3",
            };
          }

          return {
            ...provided,
            ...option,
            backgroundColor:
              option.label === innerRef || option.label === defaultValue
                ? "#F3F3F3"
                : "#FFFFFF",
          };
        },
        input: (provided) => {
          return {
            ...provided,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          };
        },
        control: (provided) => {
          return {
            ...provided,
            ...control,
            width: "100%",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          };
        },
        placeholder: (provided) => {
          return {
            ...provided,
            ...placeholder,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          };
        },
      };
    }, [hours, value, defaultValue, control, placeholder]);

    /**
     * @description
     * Components rendering.
     */
    const customComponents = React.useMemo(
      () => ({
        DropdownIndicator,
        IndicatorSeparator,
      }),
      []
    );

    /**
     * @description
     * Default syled components.
     */
    const defaultComponents = React.useMemo(
      () => ({ IndicatorsContainer }),
      [IndicatorsContainer]
    );

    const filterOptions = (): boolean => {
      return true;
    };

    const handleOpenMenu = () => {
      setOpen(true);
    };

    const handleCloseMenu = () => {
      setOpen(false);
    };

    if (hours) {
      return (
        <div className={container}>
          <StyledSelect
            size={size}
            hours={hours}
            isRtl={false}
            value={value}
            styles={styles}
            variant={variant}
            options={options}
            disabled={disabled}
            placeholder={value}
            position={position}
            isClearable={false}
            isSearchable={true}
            className={className}
            onChange={handleHour}
            menuIsOpen={devtools || open}
            components={customComponents}
            filterOption={filterOptions}
            onKeyDown={handleKeydown}
            onInputChange={handleChangeInput}
            inputValue={formatHourTime(time ?? defaultString)}
            onMenuOpen={handleOpenMenu}
            onMenuClose={handleCloseMenu}
          />
        </div>
      );
    }

    return (
      <div className={container}>
        <StyledSelect
          size={size}
          value={value}
          styles={styles}
          variant={variant}
          options={options}
          disabled={disabled}
          position={position}
          isClearable={false}
          isSearchable={isSearchable}
          className={className}
          onChange={handleChange}
          menuIsOpen={devtools}
          placeholder={value ?? defaultValue}
          isDisabled={disabled}
          optionFontSize={optionFontSize}
          components={defaultComponents}
          onKeyDown={handleKeyDown}
          listHeight={listHeight}
        />
      </div>
    );
  }
);

Select.defaultProps = {
  options: [],
  control: {},
  isSearchable: false,
};

export type Option = {
  key: string | number;
  value: string;
  label: string;
  history?: string;
};

export type SelectProps = {
  disabled?: boolean;
  options?: Option[];
  devtools?: boolean;
  optionFontSize?: string;
  value?: string | number;
  onSelect?: (value: Option) => void;
  onPick?: (hour?: Option) => void;
  size: "xs" | "sm" | "base" | "lg" | "xl" | "xxl";
  variant:
    | "primary"
    | "secondary"
    | "outline"
    | "outlined-primary"
    | "outlined-black"
    | "outlined-gray"
    | "tertiary"
    | "hours"
    | "hoursPicker";
  className?: string;
  container?: string;
  defaultValue?: string;
  control?: React.CSSProperties;
  hours?: boolean;
  option?: React.CSSProperties;
  placeholder?: React.CSSProperties;
  time?: string;
  override?: OverrideBuilder;
  onTypingHour?: (hour?: string) => void;
  position?:
    | "absolute"
    | "relative"
    | "fixed"
    | "sticky"
    | "static"
    | "inherit"
    | "initial"
    | "unset";
  isSearchable?: boolean;
  onClear?: () => void;
  listHeight?: number;
  handleKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
};

export type OptionListProps = {
  active?: boolean;
};

const defaultString = "";

const IndicatorSeparator = () => null;

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ClockIcon className="w-6 h-6" />
    </components.DropdownIndicator>
  );
};
