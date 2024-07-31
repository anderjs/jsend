import React from "react";
import classNames from "clsx";
import { range as _range } from "lodash";

// - Dropdown Component
import { Dropdown } from "@nectiasw/components/Dropdown";

// - Pagination Built In Types
import { PaginationProps, OFFSET_RANGE } from "./types";

// - Pagination Styles
import { classes } from "./styles";

const options: string[] = ["5", "10", "15", "20", "50"];

export const Pagination: React.FunctionComponent<PaginationProps> = React.memo(
  ({
    page,
    info,
    limit,
    hasNext,
    hasPrev,
    current,
    className,
    onClickPage,
    onClickLimit,
    total,
  }) => {
    /**
     * @description
     * This is a memoized value that will be used to render the pagination.
     */

    const offsetBy = React.useMemo(() => {
      if (total && limit) {
        const maxPages = Math.ceil(total / +limit);

        const currentPage = page || 1;

        let start = currentPage - OFFSET_RANGE;

        let end = currentPage + OFFSET_RANGE;

        if (start <= 1) {
          end += Math.abs(start) + 1;

          start = 1;
        }

        if (end > maxPages) {
          start -= end - maxPages;

          end = maxPages;
        }

        const pages = _range(start, end + 1);

        return pages.filter((page: number) => page > 0);
      }

      return [];
    }, [page, total, limit]);
    /**
     * @description
     * This is a memoized function that will be used to handle the click event.
     */
    const handleClickPage = React.useCallback(
      (p: number) => {
        if (page !== p && onClickPage) onClickPage(p);
      },
      [page, onClickPage]
    );

    /**
     * @description
     * When the user clicks on the limit dropdown, this function will be called.
     * @param value
     */
    const handleClickLimit = (value: string) => {
      if (limit !== value && onClickLimit) onClickLimit(value);
    };

    return (
      <div className={classNames(className && className)}>
        <div className={classes.container}>
          <div className={classes.controls.root}>
            <span className={classes.controls.prev}></span>
            <span className={classes.controls.next}></span>
          </div>
          <div className={classes.filter.root}>
            <div>
              <p className={classes.filter.show}>
                Mostrar
                <span className={classes.filter.info}>
                  <Dropdown
                    selected={limit}
                    options={options}
                    onChange={handleClickLimit}
                    uncontrollable={false}
                    orientation="top"
                  />
                </span>
                {info}
              </p>
            </div>
            <div className={classes.filter.end}>
              <p className={classes.filter.show}>
                {total && (
                  <>
                    {total > 0 && (
                      <>
                        {limit && (
                          <>{hasNext ? parseInt(limit) * page : current}</>
                        )}{" "}
                        de {total} resultados
                      </>
                    )}
                  </>
                )}
              </p>
              <nav className={classes.pagination.root}>
                {hasPrev && (
                  <a
                    about="page"
                    className={classes.pagination.controlsLeft}
                    onClick={() => handleClickPage(page - 1)}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
                {offsetBy.map((p) => (
                  <React.Fragment key={p}>
                    <a
                      about="page"
                      className={
                        p === page
                          ? classes.pagination.active
                          : classes.pagination.page
                      }
                      onClick={() => handleClickPage(p)}
                    >
                      {p}
                    </a>
                  </React.Fragment>
                ))}
                {hasNext && (
                  <a
                    about="page"
                    className={classes.pagination.controlsRight}
                    onClick={() => handleClickPage(page + 1)}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
