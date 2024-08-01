import React from "react";
import classNames from "clsx";
import styled from "styled-components";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { classes } from "./styles";

export const Collapse: React.FunctionComponent<CollapseProps> = React.memo(
  ({ child, className, children, override, title, width }) => {
    if (child) {
      return (
        <Disclosure className={override} as="div">
          {({ open }) => (
            <>
              <Disclosure.Button className={classes.container.button}>
                <div>
                  <span
                    className={classNames(classes.container.child, className)}
                  >
                    {title && title}
                  </span>
                </div>
                <div
                  className={classNames(
                    open ? classes.icon.root : classes.icon.container
                  )}
                >
                  <ChevronDownIcon
                    className={classNames(
                      classes.icon.size,
                      open && classes.icon.open,
                      open || classes.icon.close
                    )}
                  />
                </div>
              </Disclosure.Button>
              <Transition show={open} {...transition}>
                <Disclosure.Panel
                  as="div"
                  className={classes.container.content}
                >
                  {children}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      );
    }

    if (override || className) {
      return (
        <StyledCollapse width={width}>
          <Disclosure as="div" className={classes.container.disclosure}>
            {({ open }) => (
              <>
                <Disclosure.Button className={classes.container.button}>
                  <div>
                    <span
                      className={classNames(classes.container.text, className)}
                    >
                      {title && title}
                    </span>
                  </div>
                  <div
                    className={classNames(
                      open ? classes.icon.root : classes.icon.container
                    )}
                  >
                    <ChevronDownIcon
                      className={classNames(
                        classes.icon.size,
                        open && classes.icon.open,
                        open || classes.icon.close
                      )}
                    />
                  </div>
                </Disclosure.Button>
                <Transition show={open} {...transition}>
                  <Disclosure.Panel
                    as="div"
                    className={classes.container.content}
                  >
                    {children}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </StyledCollapse>
      );
    }

    return (
      <StyledCollapse width={width}>
        <Disclosure as="div" className={classes.container.disclosure}>
          {({ open }) => (
            <>
              <Disclosure.Button className={classes.container.button}>
                <div>
                  <span className={classes.container.text}>
                    {title && title}
                  </span>
                </div>
                <div
                  className={classNames(
                    open ? classes.icon.root : classes.icon.container
                  )}
                >
                  <ChevronDownIcon
                    className={classNames(
                      classes.icon.size,
                      open && classes.icon.open,
                      open || classes.icon.close
                    )}
                  />
                </div>
              </Disclosure.Button>
              <Transition show={open} {...transition}>
                <Disclosure.Panel
                  as="div"
                  className={classes.container.content}
                >
                  {children}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </StyledCollapse>
    );
  }
);

export const StyledCollapse = styled.div<{ width?: string }>`
  width: ${({ width }) => width};
  height: max-content;
  gap: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 42px;
  background-color: white;
  border-radius: 36px;
  padding: 11px, 12px, 11px, 28px;
`;

export type CollapseProps = {
  isOpen?: boolean;
  title?: string;
  child?: boolean;
  width?: string;
  className?: string;
  override?: string;
  onCollapse?: () => void;
  uncontrollable?: boolean;
  children?: React.ReactNode;
};

/**
 * @description
 * Transition for the collapse component.
 */
const transition = {
  enter: "transition ease-out duration-300",
  enterTo: "opacity-100",
  enterFrom: "opacity-0",
  leave: "transition ease-in duration-300",
  leaveTo: "opacity-0",
  leaveFrom: "opacity-100",
};
