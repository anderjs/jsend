import React from "react";
import classNames from "clsx";
import {
  Menu,
  Transition,
} from "@headlessui/react";
import {
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";

import { classes } from "./styles";

/**
 * @description
 * This file contains the styles for the tw-dropdown component.
 *  @see https://tailwindcss.com/docs/transition-property
 *  @see https://tailwindcss.com/docs/transition-duration
 *  @see https://tailwindcss.com/docs/transition-timing-function
 */
const transition = {
  enter: "transition ease-out duration-100",
  enterTo: "transform opacity-100 scale-100",
  enterFrom: "transform opacity-0 scale-95",
  leave: "transition ease-in duration-75",
  leaveTo: "transform opacity-0 scale-95",
  leaveFrom: "transform opacity-100 scale-100",
};
/**
 * @description
 * A dropdown component that uses Tailwind CSS for styling.
 *  - Uses the Headless UI library for dropdown functionality.
 *  - Uses the Heroicons library for the chevron icon.
 *  - Uses the clsx library for conditional class names.
 *  - Uses the React.memo hook to prevent unnecessary re-renders.
 *  - Uses the React.FunctionComponent type for type safety.
 */
export const Dropdown: React.FunctionComponent<DropdownProps> = React.memo(
  ({
    icon,
    selected,
    options,
    disabled,
    onChange,
    itemColor,
    orientation,
    uncontrollable,
    classNames: styles,
  }) => {
    const [selectedValue, setSelectedValue] = React.useState(selected);

    /**
     * @description
     * A callback function that handles the change event.
     * - If the dropdown is uncontrollable, it will update the selected value.
     * - If the dropdown is controlled, it will call the onChange function.
     */
    const handleChange = React.useCallback(
      (value: string) => {
        if (uncontrollable) {
          return setSelectedValue(value);
        }

        if (onChange) {
          return onChange(value);
        }
      },
      [uncontrollable, onChange]
    );

    /**
     * @description
     * Returns orientation specific class names.
     * This is used to position the dropdown menu.
     */
    const refStyles = React.useMemo(() => {
      const kind = {
        top: classes.options.top,
        left: classes.options.left,
        right: classes.options.right,
        bottom: classes.options.bottom,
      };

      const key = orientation as keyof typeof kind;

      return classNames(kind[key], styles?.items ?? classes.options.items);
    }, [orientation, styles?.items]);

    const JSXOrientation = React.useMemo(() => {
      switch (orientation) {
        case "top":
          return (
            <ChevronUpIcon
              className={classes.container.chevron}
              aria-hidden="true"
            />
          );

        case "left":
          return (
            <ChevronLeftIcon
              className={classes.container.chevron}
              aria-hidden="true"
            />
          );

        case "right":
          return (
            <ChevronRightIcon
              className={classes.container.chevron}
              aria-hidden="true"
            />
          );

        case "bottom":
          return (
            <ChevronDownIcon
              className={classes.container.chevron}
              aria-hidden="true"
            />
          );
      }
    }, [orientation]);

    /**
     * @description
     * Render icon <Icon />
     */
    if (icon) {
      return (
        <Menu as="div" className={styles?.root ?? classes.container.root}>
          <div className={classes.container.circle}>
            <Menu.Button
              disabled={disabled}
              about={styles?.title ? "no-controls" : "controls"}
              className={classNames(
                styles?.title ?? classes.container.ellipsis
              )}
            >
              {icon}
            </Menu.Button>
          </div>
          <Transition {...transition}>
            <Menu.Items className={refStyles}>
              <div className={classes.options.padding}>
                {options.map((option: string | Option) => {
                  const { label, value } = formatOption(option);

                  return (
                    <Menu.Item
                      key={value}
                      disabled={disabled}
                      as={React.Fragment}
                    >
                      {({ active }) => (
                        <div
                          className={classNames(
                            classes.options.item(itemColor ?? "primary"),
                            active && classes.options.active,
                            styles?.option && styles.option
                          )}
                          onClick={() => handleChange(value)}
                        >
                          {label}
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      );
    }

    return (
      <Menu as="div" className={styles?.root ?? classes.container.root}>
        <div className={classes.container.button}>
          <Menu.Button
            disabled={disabled}
            about={styles?.title ? "no-controls" : "controls"}
            className={classNames(styles?.title ?? classes.container.title)}
          >
            {uncontrollable ? selectedValue : selected}
            {JSXOrientation}
          </Menu.Button>
        </div>
        <Transition {...transition} as={React.Fragment}>
          <Menu.Items className={refStyles}>
            <div className={classes.options.padding}>
              {options.map((option: string | Option) => {
                const { label, value } = formatOption(option);

                return (
                  <Menu.Item disabled={disabled} key={value}>
                    {({ active }) => (
                      <div
                        className={classNames(
                          classes.options.item(itemColor ?? "primary"),
                          active && classes.options.active,
                          styles?.option && styles.option
                        )}
                        onClick={() => handleChange(value)}
                      >
                        {label}
                      </div>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
);

const formatOption = (option: string | Option) => {
  switch (typeof option) {
    case "string":
      return {
        label: option,
        value: option,
      };

    case "object":
      return {
        label: option.label,
        value: option.value,
      };

    default:
      return {
        label: option,
        value: option,
      };
  }
};

Dropdown.defaultProps = {
  itemColor: "primary",
  uncontrollable: true,
  orientation: "bottom",
  selected: "Select an option",
};

/**
 * @description
 * This type contains the props for the tw-dropdown component.
 *  - selected: The selected option.
 *  - options: The options to be displayed.
 *  - disabled: If the dropdown is disabled.
 *  - onChange: The function to be called when the selected option changes.
 */
export type DropdownProps = {
  classNames?: {
    root?: string;
    item?: string;
    title?: string;
    items?: string;
    option?: string;
  };
  selected?: string;
  options: string[] | Option[];
  disabled?: boolean;
  onChange?: (value: string) => void;
  uncontrollable?: boolean;
  orientation?: "left" | "right" | "top" | "bottom";
  search?: boolean;
  icon?: React.ReactNode;
  itemColor?: string;
};

export type Option = {
  label: string | React.ReactNode;
  value: string;
};
