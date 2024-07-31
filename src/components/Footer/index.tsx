/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { Flex } from "@nectiasw/components/Flex";
import { Button } from "@nectiasw/components/Button";

import { LifebuoyIcon } from "@heroicons/react/24/outline";

// - SSVG
import { WorldSVG, LinkedinSVG, LogoSVG, YoutubeSVG } from "./svg";


import { useSignal } from "@nectiasw/context/hooks";
import { FooterContainer, Icons } from "./styled";

// - Styles
import { classes } from "./styles";


declare global {
  interface Window {
    gtag: (...args: any) => void;
  }
}

export const Footer: React.FC = React.memo(() => {
  const { loading } = useSignal();

  const handleOpenNewTab = React.useCallback((url: string, name: string) => {
    if (window.gtag) {
      window.gtag('event', `Click ${name}`, {
        'event_category': 'Redes Sociales',
        'event_label': name
      });
    }
    window.open(url, "_blank");
  }, []);

  
  const handleHelp = React.useCallback(() => {
    if (window.gtag) {
      window.gtag('event', "Click Mesa Ayuda", {
        'event_category': 'Footer Mesa de Ayuda',
        'event_label': 'Mesa de Ayuda'
      });
    }
    window.location.href = "mailto:soporte@ccc.cl";
  }, []);

  return (
    <>
      {loading || (
        <FooterContainer>
          <Icons className="px-16">
            <Button
              size="xl"
              variant="quaternary"
              className="mobile-btn m-auto w-full justify-center"
              onClick={() => handleHelp()}
            >
              <LifebuoyIcon className="w-6 h-6" />
              <span>Mesa de Ayuda</span>
            </Button>
            <LogoSVG
              className={classes.img}
              onClick={() =>
                handleOpenNewTab(
                  "https://www.ccc.cl",
                  "Pagina Web CCC"
                )
              }
            />
            <Flex justifyContent="center" alignItems="center" gap={10}>
              <WorldSVG
                onClick={() =>
                  handleOpenNewTab(
                    "https://www.ccc.cl",
                    "Pagina Web CCC"
                  )
                }
              />
              <LinkedinSVG
                onClick={() =>
                  handleOpenNewTab(
                    "https://www.linkedin.com/company/otic-c-mara-chilena-de-la-construcci-n/?originalSubdomain=cl",
                    "Logo LinkedIn"
                  )
                }
              />
              <YoutubeSVG
                onClick={() =>
                  handleOpenNewTab(
                    "https://www.youtube.com/channel/UCxHlCqIZxdhQvNVuyFr3NYQ",
                    "Logo Youtube"
                  )
                }
              />
            </Flex>
            <Button
              size="xl"
              variant="quaternary"
              className='desktop-btn'
              onClick={handleHelp}
            >
              <LifebuoyIcon className="w-6 h-6" />
              <span>Mesa de Ayuda</span>
            </Button>
          </Icons>
          <span />
        </FooterContainer>
      )}
    </>
  );
});
