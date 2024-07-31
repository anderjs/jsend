import React, { ReactNode } from "react";
import {
  Sidebar,
} from "@nectiasw/components/Sidebar";
import { Footer } from "@nectiasw/components/Footer";
import { Navbar } from "@nectiasw/components/Navbar";

import type { SidebarProps } from "@nectiasw/components/Sidebar/types";


import {
  classes,
  Container,
  PageContainer,
  SidebarContainer,
} from "./styles";

import type { SingleSpaCustomEventDetail } from "single-spa";

import { useCustomEvent } from "./hooks";

import { Box } from "@nectiasw/components/Box";

export type LayoutProps = {
  children?: ReactNode;
  includeNavbar?: boolean;
  includeSidebar?: boolean;
  includeFooter?: boolean;
  menu?: Pick<SidebarProps, "panel" | "options"> | undefined;
  previousPath?: string | boolean;
  includeNavbarDropdown?: boolean;
};

/**
 * @description
 * A layout component that includes a navbar, sidebar and a container.
 * @example
 * <TwLayout>
 *  <h1>My Page</h1>
 * </TwLayout>
 */
export const Layout: React.FunctionComponent<LayoutProps> = React.memo(
  ({
    menu,
    children,
    previousPath,
    includeFooter = false,
    includeNavbar = true,
    includeSidebar = true,
    includeNavbarDropdown,
  }: LayoutProps) => {
    const [open, setOpen] = React.useState(true);

    const [selected, setSelected] = React.useState<string>("");

    /**
     * @description
     * Setting custom event callback.
     */
    useCustomEvent<SingleSpaCustomEventDetail>(
      "single-spa:routing-event",
      (detail: SingleSpaCustomEventDetail) => {
        const next = new URL(detail.newUrl);

        setSelected(next.pathname);
      }
    );

    const handleSidebarToggle = () => {
      setOpen((prev) => !prev);
    };

    const isDropdown = includeNavbarDropdown;

    return (
      <PageContainer>
        <div className={classes.grid}>
          {includeNavbar && (
            <Box
              top={"0"}
              left={"0"}
              right={"0"}
              height={"0"}
              zIndex={"10"}
              position="fixed"
            >
              <Navbar
                selected={selected}
                isDropdown={isDropdown}
                previousPath={previousPath}
              />
            </Box>
          )}
          {includeSidebar && (
            <SidebarContainer className={open ? classes.open : classes.close}>
              <Sidebar
                open={open}
                selected={selected}
                panel={menu?.panel}
                options={menu?.options}
                onToggle={handleSidebarToggle}
              />
            </SidebarContainer>
          )}
          <Container open={open}>{children}</Container>
        </div>
        {includeFooter && <Footer />}
      </PageContainer>
    );
  }
);