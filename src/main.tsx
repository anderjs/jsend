/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { Box } from "./components/Box";
export type { BoxProps } from "./components/Box";

export { Row } from "./components/Row";
export type { RowProps } from "./components/Row";

export { Chart } from "./components/Chart";
export type { ChartProps } from "./components/Chart";

export { Modal } from "./components/Modal";
export type { ModalProps } from "./components/Modal";

export { Checkbox } from "./components/Checkbox";
export type { CheckboxProps } from "./components/Checkbox";

export { Dropdown } from "./components/Dropdown";
export type { DropdownProps } from "./components/Dropdown";

export { Flex, FlexItem } from "./components/Flex";
export type { FlexProps, FlexItemProps } from "./components/Flex";

export { Select } from "./components/Select";
export type { SelectProps } from "./components/Select";

export { Switch } from "./components/Switch";
export type { SwitchProps } from "./components/Switch";

export { Datepicker } from "./components/Datepicker";
export type { DatepickerProps } from "./components/Datepicker";

export { RadioButton } from "./components/RadioButton";
export type { RadioButtonProps } from "./components/RadioButton";

export { Text, Error, Title, Success, Subtitle, Description } from "./components/Text";
export type { CommonTextProps } from "./components/Text";

export { Input } from "./components/Input";
export { InputTable } from "./components/Input/variants/InputTable";
export type { InputProps } from "./components/Input";

export { TableInput } from "./components/Tableinput";
export { InputMode } from "./components/Tableinput/types";
export type { TableInputProps } from "./components/Tableinput";

export { Tooltip } from "./components/Tooltip";
export type { TooltipProps } from "./components/Tooltip";

export { TextArea } from "./components/Textarea";
export type { TextAreaProps } from "./components/Textarea";

export { Grid, Colspan } from "./components/Grid";
export type { GridProps, ColspanProps } from "./components/Grid";

export { Counter } from "./components/Counter";
export type { CounterProps } from "./components/Counter";

export { Container } from "./components/Container";
export type { ContainerProps } from "./components/Container";

export { Empty } from "./components/Empty";
export type { EmptyProps } from "./components/Empty";

export { Loading, Wait } from "./components/Loading";
export type { LoadingProps } from "./components/Loading";

export { SingleDeadlineChart } from "./components/DeadlineChart";
export type { SingleDeadlineChartProps, } from "./components/DeadlineChart";

export { Collapse } from "./components/Collapse";
export type { CollapseProps } from "./components/Collapse";

export type { BadgeProps } from "./components/Badge";
export { Badge } from "./components/Badge";
export { BadgeStatus } from "./components/Badge/types";

export { Search } from "./components/Search";
export { ScrollSearch } from "./components/Search/variants/ScrollSearch";
export type { SearchItem, SearchProps, ScrollSearchProps, Client, PendingClientElement, Placeholder } from "./components/Search/types";

export { Pagination } from "./components/Pagination";
export type { PaginationProps } from "./components/Pagination/types";

export { Card, DangerTitle, AlertTitle, CheckTitle } from "./components/Card";
export type { CardProps, CardTitleProps } from "./components/Card/types";

export { Button } from "./components/Button";
export type { ButtonProps, ButtonStyledProps } from "./components/Button/types";

export { TotalHours } from "./components/Totalhours";
export type { TotalHoursProps } from "./components/Totalhours";

// - Common Typings
export type {
  Session,
  Systems,
  SystemRole,
  UserSystem,
  SessionState,
  SignalConnection,
  CommonSignalConnection,
} from "./typings";

// - Enums
export { LocalStorageKeys, UrlSSOParams } from "./typings";
