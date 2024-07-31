import React from "react";
import { Permissions } from "@nectiasw/providers/permissions";
import { SignalContext } from "@nectiasw/context";
import {
  WalletIcon,
  BookOpenIcon,
  ChartBarIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

// - Single SPA
import { navigateToUrl } from "single-spa";

// - Libs
import classNames from "clsx";
import { BrowserHistory } from "history";

// - Bit
import { Box } from "@nectiasw/components/Box";
import { Button } from "@nectiasw/components/Button";
import { IN_Permission } from "@nectiasw/providers/permissions/types";

// - Icons
import Bars3BottomLeftIcon from "@heroicons/react/24/outline/Bars3BottomLeftIcon";

// - Styles
import { classes } from "./styles";

// - Types
import { System, SidebarOptions, SidebarProps } from "./types";

export const Sidebar: React.FunctionComponent<SidebarProps > = React.memo(
  ({ open, panel, options, selected, onToggle }) => {
    /**
     * @description
     * Handle click.
     */
    const handleClickToggle = () => {
      onToggle?.();
    };

    /**
     * @description
     * Better perfomance with history.
     */
    const handleClickRef = React.useCallback((url?: string) => {
      if (url && navigateToUrl) {
        navigateToUrl(url);
      }
    }, []);

    const handleCheckUrlStatus = React.useCallback(
      (
        url: string,
        history: BrowserHistory,
        excepts: (string | RegExp)[] = []
      ) => {
        const currentPath =
          selected?.toLowerCase() ?? history?.location?.pathname.toLowerCase();

        const targetPath = url?.toLowerCase();

        const isExcluded = excepts.some((except) => {
          if (typeof except === "string") {
            return currentPath.includes(except.toLowerCase());
          }
          if (except instanceof RegExp) {
            return except.test(currentPath);
          }
          return false;
        });

        return !isExcluded && currentPath.includes(targetPath);
      },
      [selected]
    );

    return (
      <SignalContext.Consumer>
        {(signal) => {
          const { history, environment } = signal;

          const defaultPanel: SidebarOptions [] = panel ?? [
            {
              path: environment?.SSO_SIGN as string,
              title: "Gestor Documental",
              icon: <DocumentTextIcon className="h-6 w-6" />,
              rules: {
                passport: true,
                systems: [System.SIGN],
              },
            },
            {
              path: environment?.SSO_URL as string,
              title: "Sucursal Virtual",
              icon: <BuildingLibraryIcon className="h-6 w-6" />,
            },
          ];

          const defaultOptions: SidebarOptions [] = options ?? [
            {
              path: "/dashboard",
              title: "Dashboard",
              icon: <ChartBarIcon className="h-6 w-6" />,
            },
            {
              path: "/inscriptions/course/content",
              title: "Contenido del Curso",
              icon: <BookOpenIcon className="h-6 w-6" />,
              rules: {
                system: System.OPTIMUS,
                allow: [IN_Permission.CAN_VIEW_COURSE_CONTENT],
              },
            },
            {
              path: "/inscriptions",
              title: "Inscripciones",
              icon: <DocumentCheckIcon className="h-6 w-6" />,
              rules: {
                system: System.OPTIMUS,
                allow: [IN_Permission.CAN_CREATE_INSCRIPTION],
              },
              except: [
                "/inscriptions/course/content",
                /\/inscriptions\/detail\/\d+$/,
              ],
            },
            {
              path: "/communications",
              title: "Comunicación",
              icon: <MegaphoneIcon className="h-6 w-6" />,
              rules: {
                system: System.OPTIMUS,
                allow: [IN_Permission.CAN_GENERATE_SENCE_COMMUNICATION],
              },
              except: ["/communications/liquidations"],
            },
            {
              path: "/communications/liquidations",
              title: "Liquidación",
              icon: <WalletIcon className="h-6 w-6" />,
              rules: {
                system: System.OPTIMUS,
                allow: [IN_Permission.CAN_GENERATE_SENCE_LIQUIDATION],
              },
            },
          ];

          return (
            <div className={classes.container} data-testid="tw-sidebar">
              <div className={classes.content}>
                <div
                  className={classNames(
                    classes.background,
                    open
                      ? classes.backgroundSize.open
                      : classes.backgroundSize.closed
                  )}
                >
                  <Box marginBottom={8}>
                    {onToggle && (
                      <Button
                        size="lg"
                        variant="tertiary"
                        onClick={handleClickToggle}
                        data-testid="tw-sidebar-icon"
                        fullWidth
                      >
                        <div className={classes.list.wrap}>
                          <div className={classes.menu.icon}>
                            <Bars3BottomLeftIcon />
                          </div>
                          <span
                            className={open ? classes.show : classes.hidden}
                          >
                            Minimizar Menú
                          </span>
                        </div>
                      </Button>
                    )}
                  </Box>
                  <ul className="w-full">
                    {defaultOptions?.map((option) => (
                      <li
                        className="rounded-md text-center mb-1"
                        key={option.title}
                      >
                        {option.rules ? (
                          <Permissions inject={signal?.user} {...option.rules}>
                            <Button
                              size="lg"
                              fullWidth
                              tabWithHover
                              variant="tertiary"
                              Icon={option?.icon}
                              activeAsTab={handleCheckUrlStatus(
                                option.path,
                                history as BrowserHistory,
                                option.except
                              )}
                              onClick={() => handleClickRef(option.path)}
                              className={classNames(open && classes.show)}
                            >
                              {open ? option.title : null}
                            </Button>
                          </Permissions>
                        ) : (
                          <Button
                            size="lg"
                            fullWidth
                            tabWithHover
                            variant="tertiary"
                            Icon={option?.icon}
                            activeAsTab={handleCheckUrlStatus(
                              option.path,
                              history as BrowserHistory
                            )}
                            onClick={() => handleClickRef(option.path)}
                            className={classNames(open && classes.show)}
                          >
                            {open ? option.title : null}
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className={classes.separator} />
                  <ul className="w-full">
                    {defaultPanel.map((option) => (
                      <li className={classes.list.item} key={option.title}>
                        {option.rules ? (
                          <Permissions inject={signal?.user} {...option.rules}>
                            <Button
                              size="lg"
                              fullWidth
                              tabWithHover
                              variant="tertiary"
                              Icon={option?.icon}
                              activeAsTab={handleCheckUrlStatus(
                                option.path,
                                history as BrowserHistory,
                                option.except
                              )}
                              onClick={() => handleClickRef(option.path)}
                              className={classNames(open && classes.show)}
                            >
                              {open ? option.title : null}
                            </Button>
                          </Permissions>
                        ) : (
                          <Button
                            size="lg"
                            fullWidth
                            tabWithHover
                            variant="tertiary"
                            Icon={option?.icon}
                            activeAsTab={handleCheckUrlStatus(
                              option.path,
                              history as BrowserHistory,
                              option.except
                            )}
                            onClick={() => handleClickRef(option.path)}
                            className={classNames(open && classes.show)}
                          >
                            {open ? option.title : null}
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        }}
      </SignalContext.Consumer>
    );
  }
);
