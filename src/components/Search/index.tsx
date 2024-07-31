import React from "react";
import { v4 as uuid } from "uuid";
import {
  GroupBase,
  components,
  ActionMeta,
  StylesConfig,
  InputActionMeta,
  MultiValueRemoveProps,
} from "react-select";

import { classes } from "./styles";
import { SearchItem, SearchProps, defaults } from "./types";

import {
  StyledSelect,
  SearchContainer,
  StyledDropdown,
  StyledDropdownContainer,
} from "./styled";
import { XCircleIcon } from "@heroicons/react/24/outline";

/**
 * @description
 * This file contains the Search component for the Tailwind CSS framework.
 */
export const Search: React.FunctionComponent<SearchProps> = React.memo(
  ({
    value,
    values = [],
    length,
    search,
    options = ["Nombre", "ID Sence", "SSC"],
    classNames,
    placeholder,
    onAdding,
    onDelete,
    onSearch,
    onChange,
    onPress,
    dropdown = true,
    onClearInput,
    onInputChange,
    onReachingLimit,
    backgroundColor,
    placeholderText,
  }) => {
    /**
     * @description
     * This function is called when the user types in the search input.
     */
    const handleChange = (v: string, { action }: InputActionMeta) => {
      if (action === "input-change") {
        if (length && values) {
          if (values?.length >= length) {
            return;
          }
        }

        if (placeholder?.type === "number") {
          const isNumber = /^\d*$/.test(v);

          if (isNumber && onInputChange) {
            return onInputChange(v);
          }

          return;
        }

        onInputChange && onInputChange(v);
      }
    };

    /**
     * @description
     * This function is called when the user clicks on the search icon.
     */
    const handleKeyDown = (e: { keyCode: number }) => {
      /**
       * @description
       * Check if the user has reached the maximum number of values.
       * If the user has reached the maximum number of values, then we do not add the value.
       */
      if (length && values) {
        if (values?.length >= length) {
          if (onReachingLimit) return onReachingLimit();

          return;
        }
      }

      const enterKey = 13;
      /**
       * @description
       * If the user clicks on the enter key, then we call the onAdding or onSearch function.
       */
      if (e.keyCode === enterKey && onAdding) {
        if (search) {
          /**
           * @description
           * If the user only types spaces, then we do not add the value.
           */
          const isFullSpace = /^([ ]*|\n*)$/.test(search);

          if (isFullSpace) {
            return;
          }

          onAdding({
            value: uuid(),
            label: search.trim(),
          });
        }

        return;
      }

      if (e.keyCode === enterKey && onSearch) {
        onSearch();
      }
    };

    /**
     * @description
     * This function is called when I want to delete a value.
     */
    const handleChangeOption = React.useCallback(
      (_value: SearchItem, { action, removedValue }: ActionMeta<SearchItem>) => {
        /**
         * @description
         * If the action is remove-value, then we call the onDelete function.
         */
        if (action === "remove-value" && onDelete) onDelete(removedValue);
      },
      [onDelete]
    );

    /**
     * @description
     * This function is called when the user selects an option in the dropdown.
     * @param value - The value of the dropdown.
     */
    const handleChangeDropdown = (value: string) => {
      if (onChange) onChange(value);
    };

    /**
     * @description
     * This function is called when the user clicks on the search icon.
     */
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();

      if (search || search === defaults.value) {
        if (search.length > 0 && values?.length === 0) {
          const isFullSpace = /^([ ]*|\n*)$/.test(search);

          if (isFullSpace) {
            return;
          }

          if (onPress) {
            onPress();

            return;
          }
        }

        if (onSearch) onSearch();
      }
    };

    /**
     * @description
     * Easy way to add styles to the react-select component.
     * @see https://react-select.com/styles
     * @see https://react-select.com/advanced#styling-with-classes
     * @see https://react-select.com/advanced#styling-with-objects
     */
    const styles = React.useMemo(
      (): StylesConfig => ({
        multiValue: (base) => ({
          ...base,
          color: "#464646",
          alignItems: "center",
          padding: "0.5rem 0.5rem 0.5rem 0.75rem",
          backgroundColor: "#F3F3F3",
          fontSize: "1.125rem",
          borderRadius: 25,
          fontWeight: 500,
        }),
        multiValueRemove: (base) => ({
          ...base,
        }),
        valueContainer: (base) => ({
          ...base,
        }),
        input: (base) => ({
          ...base,
        }),
      }),
      []
    );

    return (
      <div className={classNames?.root ?? "flex justify-start w-full"}>
        {dropdown && (
          <div className={classNames?.dropdown ?? "w-1/6 grid"}>
            <StyledDropdownContainer className={classes.dropdown.container}>
              <StyledDropdown
                options={options ?? []}
                uncontrollable={false}
                orientation="bottom"
                classNames={{
                  root: classes.dropdown.root,
                  item: classes.dropdown.item,
                  title: classes.dropdown.title,
                  items: classes.dropdown.items,
                }}
                selected={value}
                onChange={handleChangeDropdown}
              />
            </StyledDropdownContainer>
          </div>
        )}
        <div className={classNames?.input ?? (dropdown ? "w-2/3" : "w-5/6")}>
          <StyledSelect
            isMulti
            autoFocus
            value={values}
            options={values}
            menuIsOpen={false}
            inputValue={search}
            dropdown={dropdown}
            onKeyDown={handleKeyDown}
            onInputChange={handleChange}
            blurInputOnSelect={false}
            components={{
              DropdownIndicator: React.useCallback(
                () => <React.Fragment />,
                []
              ),
              MultiValueRemove: React.useCallback(
                (
                  props: MultiValueRemoveProps<
                    unknown,
                    boolean,
                    GroupBase<unknown>
                  >
                ) => (
                  <div {...props.innerProps}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-info hover:cursor-pointer"
                    >
                      <path
                        className="flex items-center justify-center"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                ),
                []
              ),
              IndicatorsContainer: (props) => (
                <>
                  {onClearInput && (
                    <XCircleIcon
                      className={classes.icon.xcircle}
                      onClick={onClearInput}
                    />
                  )}
                  <components.IndicatorsContainer {...props} />
                </>
              ),
            }}
            onChange={(v, a) =>
              handleChangeOption(v as SearchItem, a as ActionMeta<SearchItem>)
            }
            styles={styles}
            isClearable={false}
            placeholder={placeholderText ?? placeholder?.label}
          />
        </div>
        <div className={classNames?.search ?? "w-16 grid"}>
          <SearchContainer color={backgroundColor} onClick={handleSearch}>
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </SearchContainer>
        </div>
      </div>
    );
  }
);