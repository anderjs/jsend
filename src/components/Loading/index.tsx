import React from "react";
import classNames from "clsx";
import { StageSpinner } from "react-spinners-kit";
import { Color } from "@nectiasw/theme";
import './index.css';

export type LoadingProps = {
  status?: boolean;
  centered?: boolean;
  children?: React.ReactNode;
};

/**
 * @description
 * Loading component for the application on TailwindCSS.
 */
export const Loading: React.FunctionComponent<LoadingProps> = ({ status }) => {
  return status ? (
    <div className="loading">
      <div className="spinner center">
        <br />
        <StageSpinner loading={status} color={Color.secondary} size={80} />
      </div>
    </div>
  ) : null;
};

/**
 * @description
 * Wait component for the application on TailwindCSS.
 */
export const Wait: React.FunctionComponent<LoadingProps> = React.memo(
  ({ children, centered = true, status }) => {
    return (
      <>
        {status ? (
          <div
            className={classNames(
              centered && "flex justify-center items-center m-1"
            )}
          >
            <StageSpinner loading={status} color={Color.secondary} size={80} />
          </div>
        ) : (
          children
        )}
      </>
    );
  }
);