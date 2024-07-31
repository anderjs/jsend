export type PaginationProps = {
  page: number;
  pages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  onClickPage?: (page: number) => void;
  onClickLimit?: (limit: string) => void;
  className?: string;
  info?: string
  total?: number;
  limit?: string;
  current?: number;
};



/**
 * @description
 * Maximum offset for the pagination.
 */
export const OFFSET_RANGE = 2; // number of links to be displayed before and after the current page