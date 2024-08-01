import React from "react";

export interface ICheckbox {
  [key: string]: unknown;
  checked?: boolean;
}

export function useCheckbox<T extends ICheckbox>(propertyName: string) {
  /**
   * @description
   * Items list with checkbox.
   */
  const [checkboxList, setCheckboxList] = React.useState<T[]>([]);

  /**
   * @description
   * Defines if the checkbox in the table header is checked.
   */
  const [checkboxHead, setCheckboxHead] = React.useState<boolean>(false);

  /**
   * @description
   * Watch changes on "checkboxList" to evaluate if "checkboxHead" must be true or false.
   */
  React.useEffect(() => {
    const length = checkboxList?.length;

    const uncheck = checkboxList?.some((checkbox) => {
      return checkbox.checked === false;
    });

    if (length === 0 || uncheck) {
      setCheckboxHead(false);
      return;
    }

    const check = checkboxList?.every((checkbox) => {
      return checkbox.checked === true;
    });

    if (check) {
      setCheckboxHead(true);
    }
  }, [checkboxList, propertyName]);

  /**
   * @description
   * Handle when a checkbox is clicked.
   */
  const handleChangeCheckbox = (
    checked: boolean,
    dataId: number | undefined
  ) => {
    setCheckboxList((prevState) =>
      prevState.map((checkbox) =>
        checkbox[propertyName] === dataId ? { ...checkbox, checked } : checkbox
      )
    );
  };

  /**
   * @description
   * Handle when the checkbox from table head is clicked.
   */
  const handleChangeCheckboxHead = (checked: boolean) => {
    const newState = checkboxList.map((checkbox) => ({
      ...checkbox,
      checked,
    }));
    setCheckboxList(newState);
  };

  return {
    checkboxList,
    checkboxHead,
    setCheckboxList,
    setCheckboxHead,
    handleChangeCheckbox,
    handleChangeCheckboxHead,
  };
}