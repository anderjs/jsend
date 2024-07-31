import React, { ReactNode } from "react";
import styled from "styled-components";
import { classes } from "./styles";

export const SingleDeadlineChart: React.FC<SingleDeadlineChartProps> = ({
  workLine,
}) => {

  if (!workLine) {
    return <div>No se encuentra el Plazo Solicitado.</div>;
  }

  workLine.stages.forEach((stage) => {
    const newdeadlines: Deadline[] = [];

    stage.deadlines = stage.deadlines.sort((a, b) => {
      return b.since - a.since;
    });
    stage.deadlines.forEach((deadline, index) => {
      if (index === 0) {
        if (deadline.since < stage.maxDuration)
          newdeadlines.push({
            id: 0,
            name: "1",
            criticalLevel: "",
            color: "#e5e7eb",
            since: stage.maxDuration,
            until: deadline.since + 1,
          });
      } else {
        if (deadline.since < stage.deadlines[index - 1].until - 1)
          newdeadlines.push({
            id: 0,
            name: "2",
            criticalLevel: "",
            color: "#e5e7eb",
            since: stage.deadlines[index - 1].until - 1,
            until: deadline.since + 1,
          });

        if (
          index === stage.deadlines.length - 1 &&
          deadline.until > stage.minDuration
        )
          newdeadlines.push({
            id: 0,
            name: "3",
            criticalLevel: "",
            color: "#e5e7eb",
            since: deadline.until - 1,
            until: stage.minDuration,
          });
      }
      newdeadlines.push(deadline);
    });
    stage.deadlines = newdeadlines.sort((a, b) => {
      return b.since - a.since;
    });
  });

  return (
    <Container>
      <Workline key={workLine.id}>
        <NameContainer>
          <Name>Plazos de {workLine.name}</Name>
        </NameContainer>
        <ChartContainer>
          {workLine.stages.map((stage) => (
            <ChartItem
              key={stage.id}
              className={
                stage.id === 2 ? classes.middle : classes.firstProperty
              }
            >
              <ChartMain>
                <MetricsContainer>
                  <NumbersContainer>
                    {stage.deadlines.map((deadline) => {
                      const duration = deadline.since;
                      const width = (duration / stage.maxDuration) * 100;

                      return (
                        <DeadlineContainerNumber
                          key={deadline.id}
                          widthPercent={width}
                        >
                          <Since>{deadline.since}</Since>
                        </DeadlineContainerNumber>
                      );
                    })}
                  </NumbersContainer>
                  <Bar>
                    {stage.deadlines.map((deadline, index) => {
                      const duration = deadline.since;
                      const width = (duration / stage.maxDuration) * 100;

                      let marginRight = classes.empty;

                      const marginLeft = classes.empty;

                      if (deadline.color) {
                        if (index !== stage.deadlines.length - 1) {
                          marginRight = classes.marginright;
                        }
                      }

                      return (
                        <DeadlineColorDiv
                          key={deadline.id}
                          className={`${marginRight} ${marginLeft}`}
                          bgColor={deadline.color}
                          widthPercent={width}
                        />
                      );
                    })}
                  </Bar>
                </MetricsContainer>
                <StageContainer>
                  <StageName> Etapa de {stage.name}</StageName>

                  {stage.deadlines.map((deadline) => (
                    <Untill key={deadline.id}>
                      {deadline.color === "#E55257" && deadline.until >= 0
                        ? deadline.until
                        : null}
                    </Untill>
                  ))}
                </StageContainer>
              </ChartMain>
            </ChartItem>
          ))}
        </ChartContainer>
      </Workline>
    </Container>
  );
};

export const Container = styled.div`
  margin-bottom: 1rem;
  display: grid;
`;

export const Workline = styled.div``;

export const NameContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 1.25rem;
  color: #939799;
`;

export const Name = styled.h2``;

export const ChartContainer = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
  width: 89%;
`;

export const ChartItem = styled.div``;

export const ChartMain = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.25rem;
  margin: 0.25rem;
  overflow: hidden;
`;

export const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NumbersContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Since = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 0.25rem;
  font-weight: 500;
  font-size: 0.75rem;
`;

export const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 0.75rem;
`;

export const StageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.75rem;
  font-weight: 400;
`;

export const StageName = styled.div`
  width: 184.74px;
  display: flex;
  justify-content: center;
  margin-right: 85px;
`;

export const Untill = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 0.75rem;
`;

export const DeadlineColorDiv = styled.div<{
  bgColor: string;
  widthPercent: number;
}>`
  background-color: ${(props) => props.bgColor};
  width: ${(props) => (props.widthPercent * 600) / 100}%;
  transition: width 0.5s ease-in-out;
`;

export const DeadlineContainerNumber = styled.div<{ widthPercent: number }>`
  width: ${(props) => (props.widthPercent * 600) / 100}%;
`;

interface Deadline {
  id: number;
  name: string;
  criticalLevel: string;
  color: string;
  since: number;
  until: number;
}

interface Stage {
  id: number;
  name: string;
  minDuration: number;
  maxDuration: number;
  deadlines: Deadline[];
}

export interface Result {
  id: number;
  name: string;
  stages: Stage[];
}

export interface JsonData {
  result: Result[];
}

export type DeadlineChartProps = {
  children?: ReactNode;
};

export type SingleDeadlineChartProps = {
  workLine: Result;
};
