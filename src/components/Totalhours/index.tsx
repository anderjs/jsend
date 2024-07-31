import React from "react";
import styled from "styled-components";

// - Styled

export const BaseColumn: React.FC<BaseColumnProps> = ({
  title,
  value,
  color,
  titleColor,
  borderColor,
  as: StyledComponent = HoursColumn,
  prefix,
}) => (
  <StyledComponent borderColor={borderColor}>
    <Group>
      <Title color={titleColor}>{title}</Title>
      <Value color={color}>{prefix ? `${value} ${prefix}` : value}</Value>
    </Group>
  </StyledComponent>
);

export const TotalHours: React.FunctionComponent<TotalHoursProps> = ({
  hours,
  inputs,
  pending,
  borderColor,

  hoursTitle,
  inputsTitle,
  pendingTitle,

  hoursColor,
  inputColor,
  pendingColor,

  hoursTitleColor,
  inputsTitleColor,
  pendingTitleColor,
}) => (
  <Container>
    <BaseColumn
      title={hoursTitle}
      value={hours}
      color={hoursColor}
      titleColor={hoursTitleColor}
      as={HoursColumn}
    />
    <BaseColumn
      title={inputsTitle}
      value={inputs}
      color={inputColor}
      titleColor={inputsTitleColor}
      as={InputsColumn}
      borderColor={borderColor}
    />
    <BaseColumn
      title={pendingTitle}
      value={pending}
      color={pendingColor}
      titleColor={pendingTitleColor}
      as={PendingColumn}
    />
  </Container>
);

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => props.span && `grid-column: span ${props.span}`};
`;

export const Group = styled.div`
  align-items: flex-start;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: center;
`;

export const Title = styled.h2`
  color: ${(props) => props.color};
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;

export const Value = styled.p`
  color: ${(props) => props.color};
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;

export const HoursColumn = styled(Column)`
  padding: 0px 15px 0px 0px;
  margin-left: -11px;
`;
export const InputsColumn = styled(Column)<StyledColumnProps>`
  border-left: 1px solid ${(props) => props.borderColor};
  border-right: 1px solid ${(props) => props.borderColor};
`;
export const PendingColumn = styled(Column)``;

export type TotalHoursProps = {
  hours?: number;
  inputs?: number;
  pending?: number;

  borderColor?: string;

  hoursColor?: string;
  inputColor?: string;
  pendingColor?: string;

  hoursTitle?: string;
  inputsTitle?: string;
  pendingTitle?: string;

  hoursTitleColor?: string;
  inputsTitleColor?: string;
  pendingTitleColor?: string;
};

export interface BaseColumnProps {
  title?: string;
  value?: number;
  color?: string;
  titleColor?: string;
  borderColor?: string;
  as?: typeof InputsColumn;
  prefix?: string;
}

export type ContainerProps = {
  span?: number;
};

export type StyledColumnProps = {
  borderColor?: string;
};
