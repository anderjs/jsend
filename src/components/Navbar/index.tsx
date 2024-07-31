import React from "react";
import classNames from "clsx";
import styled from "styled-components";
import { navigateToUrl } from "single-spa";
import {
  CogIcon,
  BellIcon,
  ArrowLeftIcon,
  LockClosedIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { useSignal } from "@nectiasw/context/hooks";
import { IN_Permission as Grants } from "@nectiasw/providers/permissions/types";

import { classes } from "./styles";

export interface Route {
  name: string;
  href: string;
}

export type NavbarProps = {
  routes?: Route[];
  selected?: string;
  isDropdown?: boolean;
  previousPath?: string | boolean;
};

export const Navbar: React.FunctionComponent<NavbarProps> = ({
  routes,
  selected,
  isDropdown,
  previousPath,
}) => {
  const signal = useSignal();

  const [triggers, setTriggers] = React.useState(0);

  /**
   * @description
   * Debugging.
   */
  React.useDebugValue(triggers);

  /**
   * @description
   * This function is used to redirect the user to the dashboard.
   */
  const handleClickLogo = () => {
    navigateToUrl("/dashboard");

    setTriggers((t) => t++);
  };

  /**
   * @description
   * This function is used to redirect the user to the settings page.
   */
  const handleClickSettings = () => {
    navigateToUrl("/backoffice/mantainers");

    setTriggers((t) => t++);
  };

  /**
   * @description
   * This function is used to check if the user has the permission to see the settings.
   */
  const isAllowedToSeeSettings = () => {
    if (signal?.user) {
      const core = signal?.user?.systems?.find(
        (s) => s.name === "Integra Negocio"
      );

      const owned = core?.functions?.filter((permission) => {
        return [Grants.CAN_VIEW_MANTAINER].includes(permission.name as Grants);
      });

      return owned?.length === 1;
    }

    return false;
  };

  const handleRedirectRoute = React.useCallback((route?: string) => {
    if (route) {
      navigateToUrl(route);
    }
  }, []);

  const pathname = selected ?? signal?.history?.location?.pathname;

  const isActive =
    pathname?.includes("backoffice/periods") ||
    pathname?.includes("backoffice/mantainers") ||
    pathname?.includes("backoffice/requirements");

  return (
    <>
      {isDropdown ? (
        <NavbarDropdown previousPath={previousPath} />
      ) : (
        <>
          <div className={classes.displayleft}>
            <div className={classes.logo.container}>
              <div className={classes.logo.wrapper}>
                <img
                  alt="Logo"
                  width={150}
                  height={50}
                  className={classes.logo.root}
                  src={`${signal?.environment?.ASSETS}/LogoCCC.png`}
                  onClick={handleClickLogo}
                />
              </div>
              <div className={classes.router.root}>
                <div className={classes.router.routes}>
                  {routes?.map((route) => (
                    <span
                      key={route.name}
                      className={classes.router.route}
                      onClick={() => handleRedirectRoute(route?.href)}
                    >
                      {route.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.displayright}>
            <div className={classes.menu.root}>
              <button className={classes.menu.button} type="button">
                <BellIcon
                  aria-hidden="true"
                  className={classes.menu.headless}
                />
              </button>
              <button className={classes.menu.button} type="button">
                <BellIcon
                  aria-hidden="true"
                  className={classes.menu.headless}
                />
              </button>
              {isAllowedToSeeSettings() ? (
                <button
                  className={classNames(classes.menu.engine, {
                    [classes.menu.active]: isActive,
                    [classes.menu.button]: !isActive,
                  })}
                  type="button"
                  onClick={handleClickSettings}
                >
                  <CogIcon
                    aria-hidden="true"
                    className={classes.menu.headless}
                  />
                </button>
              ) : null}
              <div className={classes.profile.root}>
                <div>
                  <div className={classes.profile.info}>
                    <span className={classes.profile.name}>
                      {signal?.ref && (
                        <>
                          {signal?.ref.firstName} {signal?.ref?.lastName}
                        </>
                      )}
                    </span>

                    <div>
                      <span className={classes.profile.role}>
                        {signal?.ref?.role && (
                          <>{signal?.ref?.role?.toUpperCase()}</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.profile.pick}>
                <img
                  alt="Profile"
                  className={classes.profile.image}
                  src={`${signal?.environment?.ASSETS}/Emoji.png`}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

type NavbarDropdownProps = {
  previousPath?: string | boolean;
};

const NavbarDropdown = ({ previousPath }: NavbarDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const desktopDropdownRef = React.useRef<HTMLDivElement>(null);

  const mobileDropdownRef = React.useRef<HTMLDivElement>(null);

  const signal = useSignal();

  React.useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLDivElement;

      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangePassword = () => {
    signal.history?.push("/backofficesucursal/password-change");
  };

  const handleLogout = () => {
    localStorage.clear();
    signal.history?.push("/login");
  };

  const handleBackClick = () => {
    if (typeof previousPath === "string") {
      window.location.href = previousPath;
    } else if (previousPath) {
      window.history.back();
    }
  };

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <HeaderContainer>
      <HeaderDesktop className="nav-desktop">
        <Logo
          onClick={() => window.location.replace("/home")}
          src={`${signal?.environment?.ASSETS}/LogoCCC.svg`}
        />
        {previousPath && (
          <BackButton onClick={handleBackClick}>
            <div>
              <ArrowLeftIcon className="arrow-1" />
              <ArrowLeftIcon className="arrow-2" />
            </div>
          </BackButton>
        )}
        <UserContainer>
          <NameDiv>
            <p>
              {" "}
              {signal?.ref
                ? `${signal?.ref.firstName} ${signal?.ref?.lastName}`
                : "Nombre Usuario"}
            </p>
            <span>{signal?.ref ? `${signal?.ref.role}` : "Role"}</span>
          </NameDiv>
          <img
            src={`${signal?.environment?.ASSETS}/Emoji.svg`}
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <UserDropdown ref={desktopDropdownRef}>
              <button onClick={handleChangePassword}>
                <LockClosedIcon /> Cambiar contraseña
              </button>
              <span />
              <button onClick={handleLogout}>
                <ArrowRightEndOnRectangleIcon /> Cerrar Sesión
              </button>
            </UserDropdown>
          )}
        </UserContainer>
      </HeaderDesktop>
      <HeaderMobile className="nav-mobile">
        <Logo
          onClick={() => window.location.replace("/home")}
          src={`${signal?.environment?.ASSETS}/LogoCCC-mobile.svg`}
        />
        <img
          src={`${signal?.environment?.ASSETS}/Emoji.svg`}
          onClick={handleToggle}
        />
        {isOpen && (
          <UserDropdown ref={mobileDropdownRef}>
            <button onClick={handleChangePassword}>
              <LockClosedIcon /> Cambiar contraseña
            </button>
            <span />
            <button onClick={handleLogout}>
              <ArrowRightEndOnRectangleIcon /> Cerrar Sesión
            </button>
          </UserDropdown>
        )}
      </HeaderMobile>
    </HeaderContainer>
  );
};

export const HeaderContainer = styled.div`
  position: relative;
  .nav-desktop {
    display: flex;
  }
  .nav-mobile {
    display: none;
  }
  @media (max-width: 500px) {
    .nav-desktop {
      display: none;
    }
    .nav-mobile {
      display: flex;
    }
  }
`;

export const HeaderMobile = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 26px 33px;
  z-index: 11;
  width: 100%;

  img {
    cursor: pointer;
  }
`;

export const HeaderDesktop = styled.div`
  height: 110px;
  width: calc(100% - (64 * 2));
  z-index: 11;
  padding-top: 13px;
  padding-left: 64px;
  padding-right: 64px;
  display: flex;
  align-items: center;
  font-family: Roboto, sans-serif;
`;

export const BackButton = styled.button`
  height: 110px;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  background: white;
  border-radius: 50%;
  border: solid 1px #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;

  svg {
    min-width: 24px;
    width: 24px;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 47px;
    height: 47px;
    min-width: 47px;
    min-height: 47px;
    border-radius: 50%;
    transition: 0.3s;
  }

  &:hover > div {
    background: #f3f3f3;
  }

  .arrow-1 {
    transition: transform 0.6s, filter 0.3s;
    position: absolute;
    transform: translateX(0px);
    filter: opacity(1);
  }
  .arrow-2 {
    transition: transform 0.6s, filter 0.3s;
    position: absolute;
    transform: translateX(15px);
    filter: opacity(0);
  }

  &:hover {
    .arrow-1 {
      transform: translateX(-15px);
      filter: opacity(0);
    }
    .arrow-2 {
      transform: translateX(0);
      filter: opacity(1);
    }
  }
`;

export const UserContainer = styled.div`
  background: white;
  border: solid 1px #f3f3f3;
  max-height: 64px;
  height: 64px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding: 0 18px 0 32px;
  gap: 12px;
  text-align: right;
  color: black;
  position: relative;

  img {
    width: 30px;
    transition: all 0.3s;
    cursor: pointer;

    /* &:hover {
      filter: brightness(0.8);
    } */
  }

  p {
    font-size: 13px;
    font-weight: 600;
    line-height: 10px;
    margin: 0;
  }

  span {
    font-size: 13px;
    font-weight: 400;
    line-height: 10%;
  }
`;

export const Logo = styled.img`
  cursor: pointer;
  max-width: 215px;
`;

export const LogoMobiel = styled.img`
  cursor: pointer;
  width: 163px;
  max-height: 40px;
`;

export const NameDiv = styled.div`
  display: grid;
  gap: 10px;

  span {
    text-transform: capitalize;
  }
`;

export const UserDropdown = styled.div`
  border-radius: 20px;
  border: 1px solid #f3f3f3;
  background: #fff;
  position: absolute;
  bottom: -10px;
  right: 0px;
  transform: translateY(100%);
  padding: 16px;
  width: 249px;
  font-family: Roboto, sans-serif;

  button {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    color: #464646;
    padding: 0px 20px;
    gap: 12px;
    white-space: nowrap;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      background: #f3f3f3;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  span {
    border-top: solid 1px #f3f3f3;
    width: 100%;
    height: 1px;
    display: block;
    margin: 10px 0;
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export enum System {
  SIGN = "Firma Digital",
  INTEGRA = "Integra Negocio",
}
