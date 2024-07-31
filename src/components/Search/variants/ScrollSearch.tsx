import React from "react";
import { Color } from "@nectiasw/theme";

import { Client, ScrollSearchProps } from "../types";

import {
  Loader,
  Spacing,
  Dropdown,
  SearchBar,
  SearchInput,
  DropdownItem,
  SearchContainer,
  SkeletonDropdownItem,
} from "./styled";
import { Wait } from "@nectiasw/components/Loading";

export const ScrollSearch = React.memo(
  React.forwardRef<HTMLDivElement, ScrollSearchProps>(function ScrollSearchRef(
    {
      show,
      search,
      pending,
      shallow,
      results,
      loading,
      onFocus,
      onScroll,
      searching,
      onFocusOut,
      placeholder,
      onInputChange,
      onResultSelect,
      barColor,
      renderItem,
      property,
      searchColor,
      loaderColor,
      spacingColor,
      placeholderColor,
      dropdownItemColor,
    },
    ref
  ) {
    const stack = results ?? [];

    const skeletons = pending ?? [];

    const injectBarColor = barColor ?? Color.secondary;

    const injectSearchColor = searchColor ?? Color.secondary;

    const injectLoaderColor = loaderColor ?? Color.secondary;

    const injectSpacingColor = spacingColor ?? Color.secondary;

    /**
     * @description
     * Handle the current search,
     */
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onInputChange) onInputChange(e?.target?.value);
      },
      [onInputChange]
    );

    /**
     * @description
     * Handles the current result change.
     */
    const handleResultChange = React.useCallback(
      (c: Client) => onResultSelect && onResultSelect(c),
      [onResultSelect]
    );

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      onScroll && onScroll(e);
    };

    const handleFocus = () => {
      onFocus && onFocus();
    };

    const handleFocusOut = () => {
      if (onFocus && onFocusOut) {
        onFocusOut();
      }
    };

    return (
      <SearchContainer>
        <SearchBar theming={injectBarColor}>
          <SearchInput
            type="text"
            autoFocus
            value={search}
            theming={injectSearchColor}
            onFocus={handleFocus}
            onBlur={handleFocusOut}
            onChange={handleChange}
            placeholder={placeholder ?? "Escribe el RUT o Nombre del Cliente"}
            placeholderColor={placeholderColor ?? Color.secondary}
          />
        </SearchBar>
        <>
          {searching && (
            <Dropdown>
              <Loader theming={injectLoaderColor}>
                <Wait status />
              </Loader>
            </Dropdown>
          )}
          {show && (
            <Dropdown ref={ref} onScroll={handleScroll}>
              {stack?.map((result, index) => (
                <DropdownItem
                  key={property ? result?.[property] : index}
                  theming={dropdownItemColor ?? Color.primary}
                  onClick={() => handleResultChange(result)}
                >
                  {renderItem?.(result)}
                </DropdownItem>
              ))}
              {loading &&
                skeletons?.map((skeleton) => (
                  <SkeletonDropdownItem
                    key={skeleton?.uuid}
                    width={skeleton?.width}
                  />
                ))}
            </Dropdown>
          )}
          {shallow && loading === false && searching === false && (
            <Dropdown>
              <Spacing theming={injectSpacingColor}>
                <p>No se encontraron resultados para su búsqueda</p>
              </Spacing>
            </Dropdown>
          )}
        </>
      </SearchContainer>
    );
  })
);

export default ScrollSearch;
