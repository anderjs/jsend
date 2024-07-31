import { Color } from "@nectiasw/theme";

export type SearchItem = {
  label: string;
  value: string;
};

export type Placeholder = {
  label?: string;
  type?: "number" | "text" | "id";
};

type EventUI = React.UIEvent<HTMLDivElement>;

export type SearchProps = {
  value?: string;
  selected?: string;
  options?: string[];
  placeholder?: Placeholder;
  placeholderText?: string;
  onReachingLimit?: () => void;
  onInputChange?: (value: string) => void;
  onChange?: (value: string) => void;
  onAdding?: (search: SearchItem) => void;
  onDelete?: (search: SearchItem) => void;
  onPress?: () => void;
  onSearch?: () => void;
  onClearInput?: () => void;
  values?: SearchItem[];
  classNames?: {
    root?: string;
    input?: string;
    search?: string;
    dropdown?: string;
  };
  length?: number;
  search?: string;
  dropdown?: boolean;
  backgroundColor?: string;
};


export type Client = {
  rut?: string;
  name?: string;
}

export type PendingClientElement = {
  uuid: string;
  width?: number;
}

export interface ScrollSearchProps {
  search?: string;
  results?: Client [];
  property?: keyof Client;
  pending?: PendingClientElement [];
  show?: boolean;
  shallow?: boolean;
  loading?: boolean;
  searching?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onFocusOut?: () => void;
  onScroll?: (e: EventUI) => void;
  onInputChange?: (value: string) => void;
  onResultSelect?: (result: Client) => void;
  barColor?: Color;
  loaderColor?: Color;
  searchColor?: Color;
  spacingColor?: Color;
  placeholderColor?: Color;
  dropdownItemColor?: Color;
  renderItem?: (item: Client) => React.ReactNode;
}

export const defaults = {
  value: "",
};
