import React from "react";
import moment from "moment";
import classNames from "clsx";
import { classes } from "./styles";
import { capitalize } from "@nectiasw/utils";

import { Select } from "@nectiasw/components/Select";
import { Tooltip } from "@nectiasw/components/Tooltip";

import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import {
  CalendarIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import {
  StyledDay,
  StyledIcon,
  StyledInput,
  StyledHeader,
  StyledTableInput,
} from "./styled";
import { isBefore, isAfter, isSameDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

/**
 * @description
 * Handle date and sync dates.
 */
export const Datepicker: React.FC<DatepickerProps> = React.memo((props) => {
  const {
    dayRef,
    format,
    minDate,
    maxDate,
    readOnly,
    disabled,
    onChange,
    className,
    isSelectable,
    isTableInput,
    formatDisabled,
    tooltipMinDate,
    tooltipMaxDate,
    placeholderText,
  } = props;

  const calendar = React.useRef();

  const [open, setOpen] = React.useState<boolean>(false);

  const yearRef = new Date().getFullYear();

  const [year, setYear] = React.useState<number>(
    props?.date ? props?.date?.getFullYear() : yearRef
  );

  const handleChange = React.useCallback(
    (date: Date | null) => {
      if (date) {
        onChange?.(date);
      }
    },
    [onChange]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      !/[0-9/]/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Tab"
    ) {
      event.preventDefault();
    }
  };

  const handleCalendarOpen = () => {
    if (props?.disabled) {
      return;
    }

    setOpen(true);
  };

  const handleCalendarClose = () => {
    setOpen(false);
  };

  // Generate years array
  const generateYearOptions = (): YearOption[] => {
    const currentYear = new Date().getFullYear();

    const startYear = currentYear - 100;

    const endYear = currentYear + 100;

    const years = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );

    return years.map((year) => ({
      key: year.toString(),
      label: year.toString(),
      value: year.toString(),
    }));
  };

  const renderCustomInput = React.useMemo(() => {
    return isTableInput ? <StyledTableInput /> : <StyledInput />;
  }, [isTableInput]);

  const renderCustomHeader = React.useCallback(
    (params: ReactDatePickerCustomHeaderProps) => {
      const {
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      } = params;

      const newDate = new Date(date);

      const monthName = date?.toLocaleString("default", { month: "long" });

      let compYear = date ? date?.getFullYear() : year;

      const handleYearChange = (value: number) => {
        compYear = value;
        setYear(value);
        newDate.setFullYear(value);
        handleChange(newDate);
        handleCalendarClose();
      };

      return (
        <StyledHeader>
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <ArrowLongLeftIcon className="w-6 h-6" />
          </button>
          {isSelectable ? (
            <>
              <div className="flex align-center">
                <span className={classes.date}>{capitalize(monthName)}</span>
                <Select
                  size="base"
                  options={generateYearOptions()}
                  value={compYear}
                  onSelect={(option: { value: string }) =>
                    handleYearChange(parseInt(option.value))
                  }
                  variant="outlined-black"
                  className="ml-4"
                  handleKeyDown={handleKeyDown}
                  isSearchable
                  listHeight={200}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <span className={classes.date}>
                  {capitalize(monthName)} {date?.getFullYear()}
                </span>
              </div>
            </>
          )}

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <ArrowLongRightIcon height={6} width={6} />
          </button>
        </StyledHeader>
      );
    },
    [handleChange, isSelectable, year]
  );

  /**
   * @description
   * Render custom day.
   */
  const renderCustomDay = React.useCallback(
    (day: number, date: Date) => {
      if (isSameDay(dayRef as Date, date)) {
        return props?.debug && tooltipMinDate ? (
          <Tooltip text={tooltipMinDate} active>
            <StyledDay about="today" className={classNames(classes.day)}>
              {day}
            </StyledDay>
          </Tooltip>
        ) : (
          <StyledDay about="today" className={classNames(classes.day)}>
            {day}
          </StyledDay>
        );
      }

      if (minDate && tooltipMinDate && isBefore(date, minDate)) {
        return (
          <Tooltip active={props?.debug} text={tooltipMinDate}>
            <StyledDay className={classNames(classes.day)}>{day}</StyledDay>
          </Tooltip>
        );
      }

      if (maxDate && tooltipMaxDate && isAfter(date, maxDate)) {
        return (
          <Tooltip active={props?.debug} text={tooltipMaxDate}>
            <StyledDay className={classNames(classes.day)}>{day}</StyledDay>
          </Tooltip>
        );
      }

      return <StyledDay className={classNames(classes.day)}>{day}</StyledDay>;
    },
    [dayRef, minDate, maxDate, tooltipMaxDate, tooltipMinDate, props.debug]
  );

  if (formatDisabled) {
    return (
      <div className={classNames(classes.container)}>
        {!isTableInput && (
          <StyledIcon
            ref={calendar.current}
            disabled={props?.disabled}
            onClick={open ? handleCalendarClose : handleCalendarOpen}
          >
            <CalendarIcon className="w-6 h-6" />
          </StyledIcon>
        )}
        <DatePicker
          open={open}
          locale="es"
          minDate={minDate}
          maxDate={maxDate}
          readOnly={readOnly}
          disabled={disabled}
          selected={props?.date}
          wrapperClassName={className}
          customInput={renderCustomInput}
          placeholderText={placeholderText}
          renderDayContents={renderCustomDay}
          onCalendarOpen={handleCalendarOpen}
          onInputClick={handleCalendarOpen}
          className="custom-datepicker"
          onChange={handleChange}
          onClickOutside={handleCalendarClose}
          onCalendarClose={handleCalendarClose}
          renderCustomHeader={renderCustomHeader}
          onKeyDown={handleKeyDown}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>
    );
  }

  const value = props?.date ? moment(props.date).format(format) : "";

  return (
    <div className={classNames(classes.container)}>
      {!isTableInput && (
        <StyledIcon
          ref={calendar.current}
          disabled={props?.disabled}
          onClick={open ? handleCalendarClose : handleCalendarOpen}
        >
          <CalendarIcon className="w-6 h-6" />
        </StyledIcon>
      )}
      <DatePicker
        open={open}
        locale="es"
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        selected={props?.date}
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleChange}
        className="custom-datepicker"
        wrapperClassName={className}
        customInput={renderCustomInput}
        placeholderText={placeholderText}
        renderDayContents={renderCustomDay}
        onCalendarOpen={handleCalendarOpen}
        onClickOutside={handleCalendarClose}
        onCalendarClose={handleCalendarClose}
        renderCustomHeader={renderCustomHeader}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
});

Datepicker.defaultProps = {
  format: "DD/MM/YYYY",
  formatDisabled: true,
  isSelectable: false,
};

export type DatepickerProps = {
  date?: Date;
  dayRef?: Date;
  format?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholderText?: string;
  onChange?: (date: Date) => void;
  className?: string;
  debug?: boolean;
  minDate?: Date;
  maxDate?: Date;
  tooltipMinDate?: string;
  tooltipMaxDate?: string;
  isTableInput?: boolean;
  formatDisabled?: boolean;
  isSelectable?: boolean;
};

export type YearOption = {
  key: string;
  label: string;
  value: string;
};
