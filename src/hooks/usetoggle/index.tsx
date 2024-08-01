import React from "react";

/**
 * @description
 * Use toggle hook, to switch values.
 *
 * @example
 * const { isToggled, handleToggle } = useToggle(false);
 *
 * <button disabled={isToggled} onClick={handleToggle} />
 */
export function useToggle(initialState = false) {
  const [isToggled, setIsToggled] = React.useState(initialState);

  const handleToggle = React.useCallback((): void => {
    setIsToggled((currentFunctionState) => !currentFunctionState);
  }, []);

  const forceTo = React.useCallback((status: boolean): void => {
    setIsToggled(status);
  }, []);

  return {
    forceTo,
    isToggled,
    handleToggle,
  };
}