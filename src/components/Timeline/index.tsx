/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-fallthrough */
import React from "react";
import { format } from "rut.js";
import { capitalize } from "lodash";
import styled from "styled-components";

import { Box } from "@nectiasw/components/Box";
import { Text } from "@nectiasw/components/Text";
import { Card } from "@nectiasw/components/Card";
import { Flex, FlexItem } from "@nectiasw/components/Flex";

import { classes } from "./styles";

export type ParticipantDetailProps = Partial<{
  dateEndOld: string;
  dateEndNew: string;
  dateInitNew: string;
  dateInitOld: string;
  companyCost: boolean;
  financingTypeOld: string;
  financingTypeNew: string;
  checkBipartiteOld: true;
  checkBipartiteNew: false;
  participant: Participant;
  participantValueOld: number;
  participantValueNew: number;
  trainingPlaceOld: Place;
  trainingPlaceNew: Place;
  commentOld: string;
  commentNew: string;
  contractNew: string;
  contractOld: string;
}>;

export type Place = {
  region: string;
  commune: string;
  address: string;
};

type Participant = {
  rut: string;
  name: string;
  names?: {
    namesOld: string;
    namesNew: string;
  };
  paternalLastName?: {
    paternalLastNameOld: string;
    paternalLastNameNew: string;
  };
  maternalLastName?: {
    maternalLastNameOld: string;
    maternalLastNameNew: string;
  };
  dateBirth?: {
    dateBirthOld: string;
    dateBirthNew: string;
  };
  sex?: {
    sexOld: string;
    sexNew: string;
  };
  phone?: {
    phoneOld: string;
    phoneNew: string;
  };
  email?: {
    emailOld: string;
    emailNew: string;
  };
  country?: {
    countryOld: string;
    countryNew: string;
  };
  address?: {
    addressOld: string;
    addressNew: string;
  };
  schoolingCodeName?: {
    schoolingCodeNameOld: string;
    schoolingCodeNameNew: string;
  };
  levelCodeName?: {
    levelCodeNameOld: string;
    levelCodeNameNew: string;
  };
  commune?: {
    communeOld: string;
    communeNew: string;
  };
  franchise?: {
    franchiseOld: number;
    franchiseNew: number;
  };
  viaticMovilization?: {
    authorizedViaticOld: number;
    authorizedViaticNew: number;
    authorizedMobilizationOld: number;
    authorizedMobilizationNew: number;
  };
};

export type DetailTimelineProps = {
  state?: number;
  user?: string;
  date?: string;
  hour?: string;
  action?: string;
  active?: boolean;
  onClick?: () => void;
  onActive?: () => void;
  onInactive?: () => void;
  children?: React.ReactNode;
  details: ParticipantDetailProps;
};

export const DetailTimeline: React.FC<DetailTimelineProps> = React.memo(
  ({
    user,
    hour,
    date,
    state,
    action,
    active,
    details,
    onClick,
    onActive,
    onInactive,
  }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
      const observer = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width);
      });

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        ref.current && observer.unobserve(ref.current);
      };
    }, []);

    const formatAsCLP = React.useCallback((amount?: number) => {
      if (amount) {
        return new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(amount);
      }
    }, []);

    const render = React.useMemo(() => {
      switch (state) {
        /**
         * @description
         * Setted when company cost is either true or false.
         */
        case State["Activity Removal"]:
          return (
            <Box marginBottom={2}>
              <Text tag="p" size="sm" font="bold" color="info">
                Costo empresa
              </Text>
              <Text tag="p" size="lg" font="medium" color="primary">
                No
              </Text>
            </Box>
          );

        /**
         * @description
         * Deleted activity.
         */
        case State["Activity Cancellation"]:
          return (
            <Box marginBottom={2}>
              <Text tag="p" size="sm" font="bold" color="info">
                Costo empresa
              </Text>
              <Text tag="p" size="lg" font="medium" color="primary">
                {details.companyCost ? "Sí" : "No"}
              </Text>
            </Box>
          );

        /**
         * @description
         * Setted when company cost is either true or false.
         */
        case State["Activity Reactivation"]:
          return (
            <Box marginBottom={2}>
              <Text tag="p" size="sm" font="bold" color="info">
                Reactivación de la actividad
              </Text>
              <Text tag="p" size="lg" font="medium" color="primary">
                Sí
              </Text>
            </Box>
          );

        case State["Change in Place"]:
          return (
            <Flex className="mb-2 gap-x-2 gap-y-6" direction="row" wrap="wrap">
              {details?.trainingPlaceNew?.region &&
                details?.trainingPlaceOld?.region && (
                  <FlexItem className={classes.flexItem}>
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Región nueva
                      </Text>
                      <Text
                        tag="p"
                        size="lg"
                        font="medium"
                        color="primary"
                        className="capitalize"
                      >
                        {details.trainingPlaceNew.region}
                      </Text>

                      <Text tag="p" size="sm" font="bold" color="info">
                        Región anterior
                      </Text>
                      <Text
                        tag="p"
                        size="lg"
                        font="medium"
                        color="primary"
                        className="capitalize"
                      >
                        {details.trainingPlaceOld.region}
                      </Text>
                    </>
                  </FlexItem>
                )}
              {details?.trainingPlaceNew?.commune &&
                details?.trainingPlaceOld?.commune && (
                  <FlexItem className={classes.flexItem}>
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Comuna nueva
                      </Text>
                      <Text
                        tag="p"
                        size="lg"
                        font="medium"
                        color="primary"
                        className="capitalize"
                      >
                        {details.trainingPlaceNew.commune}
                      </Text>

                      <Text tag="p" size="sm" font="bold" color="info">
                        Comuna anterior
                      </Text>
                      <Text
                        tag="p"
                        size="lg"
                        font="medium"
                        color="primary"
                        className="capitalize"
                      >
                        {details.trainingPlaceOld.commune}
                      </Text>
                    </>
                  </FlexItem>
                )}
              {details?.trainingPlaceNew?.address &&
                details?.trainingPlaceOld?.address && (
                  <FlexItem className={classes.flexItem}>
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Dirección nueva
                      </Text>
                      <Text
                        tag="p"
                        size="lg"
                        font="medium"
                        color="primary"
                        className="capitalize"
                      >
                        {details.trainingPlaceNew.address}
                      </Text>

                      <Text tag="p" size="sm" font="bold" color="info">
                        Dirección anterior
                      </Text>
                      <Text
                        tag="p"
                        size="lg"
                        font="medium"
                        color="primary"
                        className="capitalize"
                      >
                        {details.trainingPlaceOld.address}
                      </Text>
                    </>
                  </FlexItem>
                )}
            </Flex>
          );

        /**
         * @description
         * Setted when bipartite is either true or false.
         */
        case State["Change of Bipartite Committee"]:
          return (
            <Box marginBottom={2}>
              <Text tag="p" size="sm" font="bold" color="info">
                Comité bipartito
              </Text>
              <Text tag="p" size="lg" font="medium" color="primary">
                {details.checkBipartiteNew ? "Sí" : "No"}
              </Text>
            </Box>
          );

        /**
         * @description
         * Applied to the rules of participant render condition.
         */
        case State["Participant Removal"]:

        /**
         * @description
         * Applied to the rules of participant render condition.
         */
        case State["Participant Cancellation"]:

        /**
         * @description
         * Render when the type is when the participant is annulled.
         */
        case State["Participant Reactivation"]:
          return (
            <Box marginBottom={2}>
              {details?.participant?.name && (
                <>
                  <Text tag="p" size="sm" font="bold" color="info">
                    Participante
                  </Text>
                  <Text tag="p" size="lg" font="medium" color="primary">
                    {details.participant?.name}
                  </Text>
                </>
              )}
              {details?.participant?.rut && (
                <>
                  <Text tag="p" size="sm" font="bold" color="info">
                    Rut
                  </Text>
                  <Text tag="p" size="lg" font="medium" color="primary">
                    {format(details.participant.rut, { dots: true })}
                  </Text>
                </>
              )}
            </Box>
          );

        case State["Change of Financing Account"]:
          return (
            <Box marginBottom={2}>
              <Text tag="p" size="sm" font="bold" color="info">
                Cuenta Nueva
              </Text>
              <Text
                tag="p"
                size="lg"
                font="medium"
                color="primary"
                className="capitalize"
              >
                {capitalize(details.financingTypeNew)}
              </Text>
              <Text tag="p" size="sm" font="bold" color="info">
                Cuenta Anterior
              </Text>
              <Text
                tag="p"
                size="lg"
                font="medium"
                color="primary"
                className="capitalize"
              >
                {capitalize(details.financingTypeOld)}
              </Text>
            </Box>
          );

        case State["Agreed Value per Participant"]:
          return (
            <Box marginBottom={2}>
              <Text tag="p" size="sm" font="bold" color="info">
                Monto Nuevo
              </Text>
              <Text tag="p" size="lg" font="medium" color="primary">
                {formatAsCLP(details.participantValueNew)}
              </Text>
              <Text tag="p" size="sm" font="bold" color="info">
                Monto Anterior
              </Text>
              <Text tag="p" size="lg" font="medium" color="primary">
                {formatAsCLP(details.participantValueOld)}
              </Text>
            </Box>
          );

        case State["Change In Contract Type"]:
          return (
            <Box marginBottom={2}>
              <Text tag="p" size="sm" font="bold" color="info">
                Contrato nuevo
              </Text>
              <Text tag="p" size="lg" font="medium" color="primary">
                {details.contractNew}
              </Text>
              <Text tag="p" size="sm" font="bold" color="info">
                Contrato anterior
              </Text>
              <Text tag="p" size="lg" font="medium" color="primary">
                {details.contractOld}
              </Text>
            </Box>
          );

        case State["Change of Start and End Dates"]:
          return (
            <Flex className="mb-2 gap-x-2 gap-y-6" direction="row" wrap="wrap">
              <FlexItem className={classes.flexItem}>
                {details?.dateInitNew && (
                  <>
                    <Text tag="p" size="sm" font="bold" color="info">
                      Fecha de inicio nueva
                    </Text>
                    <Text tag="p" size="lg" font="medium" color="primary">
                      {details.dateInitNew}
                    </Text>
                  </>
                )}
                {details?.dateInitOld && (
                  <>
                    <Text tag="p" size="sm" font="bold" color="info">
                      Fecha de inicio anterior
                    </Text>
                    <Text tag="p" size="lg" font="medium" color="primary">
                      {details.dateInitOld}
                    </Text>
                  </>
                )}
              </FlexItem>
              <FlexItem className={classes.flexItem}>
                {details?.dateEndNew && (
                  <>
                    <Text tag="p" size="sm" font="bold" color="info">
                      Fecha de término nueva
                    </Text>
                    <Text tag="p" size="lg" font="medium" color="primary">
                      {details.dateEndNew}
                    </Text>
                  </>
                )}
                {details?.dateEndOld && (
                  <>
                    <Text tag="p" size="sm" font="bold" color="info">
                      Fecha de término anterior
                    </Text>
                    <Text tag="p" size="lg" font="medium" color="primary">
                      {details.dateEndOld}
                    </Text>
                  </>
                )}
              </FlexItem>
            </Flex>
          );

        case State["Participant Rectification"]:
          return (
            <Flex className="mb-2 gap-x-2 gap-y-6" direction="row" wrap="wrap">
              <Box className={classes.flexItem}>
                {details?.participant?.name && (
                  <>
                    <Text tag="p" size="sm" font="bold" color="info">
                      Participante
                    </Text>
                    <Text tag="p" size="lg" font="medium" color="primary">
                      {details.participant?.name}
                    </Text>
                  </>
                )}
                {details?.participant?.rut && (
                  <>
                    <Text tag="p" size="sm" font="bold" color="info">
                      Rut
                    </Text>
                    <Text tag="p" size="lg" font="medium" color="primary">
                      {format(details.participant.rut, { dots: true })}
                    </Text>
                  </>
                )}
              </Box>

              {details?.participant?.names && (
                <Box className={classes.flexItem}>
                  {details?.participant?.names?.namesNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Nombre nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.names.namesNew}
                      </Text>
                    </>
                  )}
                  {details?.participant?.names?.namesOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Nombre anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.names.namesOld}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.paternalLastName && (
                <Box className={classes.flexItem}>
                  {details?.participant?.paternalLastName
                    ?.paternalLastNameNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Apellido paterno nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {
                          details.participant.paternalLastName
                            .paternalLastNameNew
                        }
                      </Text>
                    </>
                  )}
                  {details?.participant?.paternalLastName
                    ?.paternalLastNameOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Apellido paterno anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {
                          details.participant.paternalLastName
                            .paternalLastNameOld
                        }
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.maternalLastName && (
                <Box className={classes.flexItem}>
                  {details?.participant?.maternalLastName
                    ?.maternalLastNameNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Apellido materno nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {
                          details.participant.maternalLastName
                            .maternalLastNameNew
                        }
                      </Text>
                    </>
                  )}
                  {details?.participant?.maternalLastName
                    ?.maternalLastNameOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Apellido materno anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {
                          details.participant.maternalLastName
                            .maternalLastNameOld
                        }
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.dateBirth && (
                <Box className={classes.flexItem}>
                  {details?.participant?.dateBirth?.dateBirthNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Fecha de nacimiento nueva
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.dateBirth.dateBirthNew}
                      </Text>
                    </>
                  )}
                  {details?.participant?.dateBirth?.dateBirthOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Fecha de nacimiento anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.dateBirth.dateBirthOld}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.sex && (
                <Box className={classes.flexItem}>
                  {details?.participant?.sex?.sexNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Sexo nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.sex.sexNew === "F"
                          ? "Femenino"
                          : "Masculino"}
                      </Text>
                    </>
                  )}
                  {details?.participant?.sex?.sexOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Sexo anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.sex.sexOld === "F"
                          ? "Femenino"
                          : "Masculino"}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.phone && (
                <Box className={classes.flexItem}>
                  {details?.participant?.phone?.phoneNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Teléfono nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.phone.phoneNew}
                      </Text>
                    </>
                  )}
                  {details?.participant?.phone?.phoneOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Teléfono anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.phone.phoneOld}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.email && (
                <Box className={classes.flexItem}>
                  {details?.participant?.email?.emailNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Email nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.email.emailNew}
                      </Text>
                    </>
                  )}
                  {details?.participant?.email?.emailOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Email anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.email.emailOld}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.country && (
                <Box className={classes.flexItem}>
                  {details?.participant?.country?.countryNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        País nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.country.countryNew}
                      </Text>
                    </>
                  )}
                  {details?.participant?.country?.countryOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        País anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.country.countryOld}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.address && (
                <Box className={classes.flexItem}>
                  {details?.participant?.address?.addressNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Dirección particular nueva
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.address.addressNew}
                      </Text>
                    </>
                  )}
                  {details?.participant?.address?.addressOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Dirección particular anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.address.addressOld}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.schoolingCodeName && (
                <Box className={classes.flexItem}>
                  {details?.participant?.schoolingCodeName
                    ?.schoolingCodeNameNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Código escolaridad nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {
                          details.participant.schoolingCodeName
                            .schoolingCodeNameNew
                        }
                      </Text>
                    </>
                  )}
                  {details?.participant?.schoolingCodeName
                    ?.schoolingCodeNameOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Código escolaridad anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {
                          details.participant.schoolingCodeName
                            .schoolingCodeNameOld
                        }
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.levelCodeName && (
                <Box className={classes.flexItem}>
                  {details?.participant?.levelCodeName?.levelCodeNameNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Nivel ocupacional nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.levelCodeName.levelCodeNameNew}
                      </Text>
                    </>
                  )}
                  {details?.participant?.levelCodeName?.levelCodeNameOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Nivel ocupacional anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.levelCodeName.levelCodeNameOld}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.commune && (
                <Box className={classes.flexItem}>
                  {details?.participant?.commune?.communeNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Comuna laboral nueva
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {capitalize(details.participant.commune.communeNew)}
                      </Text>
                    </>
                  )}
                  {details?.participant?.commune?.communeOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Comuna laboral anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {capitalize(details.participant.commune.communeOld)}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.franchise && (
                <Box className={classes.flexItem}>
                  {details?.participant?.franchise?.franchiseNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        % de franquicia nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.franchise.franchiseNew} %
                      </Text>
                    </>
                  )}
                  {details?.participant?.franchise?.franchiseOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        % de franquicia anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {details.participant.franchise.franchiseOld} %
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.viaticMovilization && (
                <Box className={classes.flexItem}>
                  {details?.participant?.viaticMovilization
                    ?.authorizedMobilizationNew && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Monto de movilización nuevo
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {formatAsCLP(
                          details.participant?.viaticMovilization
                            ?.authorizedMobilizationNew
                        )}
                      </Text>
                    </>
                  )}
                  {details?.participant?.viaticMovilization
                    ?.authorizedMobilizationOld && (
                    <>
                      <Text tag="p" size="sm" font="bold" color="info">
                        Monto de movilización anterior
                      </Text>
                      <Text tag="p" size="lg" font="medium" color="primary">
                        {formatAsCLP(
                          details.participant?.viaticMovilization
                            ?.authorizedMobilizationOld
                        )}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {details?.participant?.viaticMovilization && (
                <>
                  <Box className={classes.flexItem}>
                    {details?.participant?.viaticMovilization
                      ?.authorizedViaticNew && (
                      <>
                        <Text tag="p" size="sm" font="bold" color="info">
                          Monto de viático nuevo
                        </Text>
                        <Text tag="p" size="lg" font="medium" color="primary">
                          {formatAsCLP(
                            details.participant?.viaticMovilization
                              ?.authorizedViaticNew
                          )}
                        </Text>
                      </>
                    )}
                    {details?.participant?.viaticMovilization
                      ?.authorizedViaticOld && (
                      <>
                        <Text tag="p" size="sm" font="bold" color="info">
                          Monto de viático anterior
                        </Text>
                        <Text tag="p" size="lg" font="medium" color="primary">
                          {formatAsCLP(
                            details.participant?.viaticMovilization
                              ?.authorizedViaticOld
                          )}
                        </Text>
                      </>
                    )}
                  </Box>

                  <Box className={classes.flexItem}>
                    {details?.participant?.viaticMovilization
                      ?.authorizedMobilizationNew && (
                      <>
                        <Text tag="p" size="sm" font="bold" color="info">
                          Monto de movilización nuevo
                        </Text>
                        <Text tag="p" size="lg" font="medium" color="primary">
                          {formatAsCLP(
                            details.participant?.viaticMovilization
                              ?.authorizedMobilizationNew
                          )}
                        </Text>
                      </>
                    )}
                    {details?.participant?.viaticMovilization
                      ?.authorizedMobilizationOld && (
                      <>
                        <Text tag="p" size="sm" font="bold" color="info">
                          Monto de movilización anterior
                        </Text>
                        <Text tag="p" size="lg" font="medium" color="primary">
                          {formatAsCLP(
                            details.participant?.viaticMovilization
                              ?.authorizedMobilizationOld
                          )}
                        </Text>
                      </>
                    )}
                  </Box>
                </>
              )}
            </Flex>
          );

        case State["Change in Inscription Comment"]:
          return (
            <Box marginBottom={2}>
              {details?.commentNew && (
                <>
                  <Text tag="p" size="sm" font="bold" color="info">
                    Comentario nuevo
                  </Text>
                  <Card description={details?.commentNew} />
                </>
              )}
              {details?.commentOld && (
                <>
                  <Text
                    tag="p"
                    size="sm"
                    font="bold"
                    color="info"
                    className="mt-2"
                  >
                    Comentario antiguo
                  </Text>
                  <Card description={details?.commentOld} />
                </>
              )}
            </Box>
          );
      }
    }, [formatAsCLP, details, state]);

    return (
      <div className={classes.grid} ref={ref}>
        <div
          className={classes.wrapper}
          onMouseOver={onActive}
          onMouseLeave={onInactive}
        >
          <TimelineItem width={timelineWidth} active={active} onClick={onClick}>
            <Flex direction="col" alignItems="center" className="py-3 px-2">
              <Text
                tag="p"
                size="base"
                font="bold"
                color={active ? "secondary" : "info"}
              >
                {date}
              </Text>
              <div className="self-end">
                <Text
                  tag="p"
                  size="xs"
                  font="medium"
                  color={active ? "secondary" : "info"}
                >
                  {hour} hrs.
                </Text>
              </div>
            </Flex>
            <Box className="h-[100%]">
              <TimelineDashed />
              {active ? (
                <TimelineContainer>
                  <BigCircle />
                  <SmallCircle />
                </TimelineContainer>
              ) : (
                <TimelineDot />
              )}
            </Box>
            <Box className="py-3 px-2">
              <Flex direction="col">
                <Text tag="p" size="lg" font="bold" color="info">
                  {action}
                </Text>
                <Text tag="p" size="lg" font="medium" color="primary">
                  {user}
                </Text>
              </Flex>
            </Box>
          </TimelineItem>
          {active && (
            <TimelineDetail active maxWidth={width - timelineWidth}>
              <Flex direction="col">
                <Text
                  tag="p"
                  size="lg"
                  font="bold"
                  color="info"
                  className="mb-2"
                >
                  Detalle del cambio
                </Text>
              </Flex>
              {render}
            </TimelineDetail>
          )}
        </div>
      </div>
    );
  }
);

export enum State {
  "Analyst Assignament" = 1,
  "Activity Cancellation" = 2,
  "Participant Rectification" = 3,
  "Participant Cancellation" = 4,
  "Participant Removal" = 5,
  "Change of Bipartite Committee" = 6,
  "Agreed Value per Participant" = 7,
  "Activity Removal" = 8,
  "Activity Reactivation" = 9,
  "Participant Reactivation" = 10,
  "Change of Financing Account" = 11,
  "Change of Start and End Dates" = 12,
  "Change in Place" = 13,
  "Change in Inscription Comment" = 14,
  "Change In Contract Type" = 15,
}

const timelineWidth = 300;

export type TimelineItemProps = {
  width?: number;
  active?: boolean;
  maxWidth?: number;
};

export const TimelineItem = styled.div<TimelineItemProps>`
  width: ${(props) => (props.width ? `${props.width}px` : "inherit")};
  gap: 12px;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  border-color: #dfdfdf;
  border-bottom-width: 1px;

  ${(props) =>
    props.active &&
    `
    background-color: #FFF;
  `}

  &:hover {
    cursor: pointer;
  }
`;

export const TimelineDetail = styled.div.attrs<TimelineItemProps>((props) => ({
  style: {
    maxWidth: props.maxWidth ? `${props.maxWidth}px` : "max-content",
  },
}))<TimelineItemProps>`
  width: max-content;
  left: 100%;
  position: absolute;
  padding: 12px 8px 8px 12px;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  border-color: #dfdfdf;
  overflow-wrap: anywhere;

  ${(props) =>
    props.active &&
    `
    background-color: #FFF;
  `};
`;

export const TimelineDashed = styled.div`
  border-left: 2px dashed #dfdfdf;
  border-color: #dfdfdf;
  height: 100%;
`;

export const TimelineUnion = styled.div`
  border-left: 2px dashed #ccc;
  border-color: #ccc;
  height: 100%;
`;

export const TimelineDot = styled.div`
  width: 8px;
  height: 8px;
  position: relative;
  border-radius: 9999px;
  background-color: #cccccc;
  bottom: calc(50% + 4px);
  right: 3px;
`;

export const TimelineContainer = styled.div`
  position: relative;
  height: 12px;
  width: 12px;
  bottom: calc(50% + 6px);
  right: 5.5px;
`;

export const BigCircle = styled.div`
  position: absolute;
  height: 12px;
  width: 12px;
  background-color: #65bfb1;
  border-radius: 50%;
`;

export const SmallCircle = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
  height: 6px;
  width: 6px;
  background-color: #fff;
  border-radius: 50%;
`;
