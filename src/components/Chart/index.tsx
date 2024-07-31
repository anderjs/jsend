import React from "react";
import classNames from "clsx";

import { Doughnut } from "react-chartjs-2";
import {
  Plugin,
  Legend,
  Tooltip,
  ArcElement,
  Chart as ChartJS,
} from "chart.js";

import { classes } from "./styles";

// - Imports
import { Color } from "@nectiasw/theme";
import { capitalize } from "@nectiasw/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * @description
 * Chart componnet for rendering content based on stages.
 */
export const Chart: React.FunctionComponent<ChartProps> = React.memo(
  ({
    flex,
    label,
    width,
    height,
    aspect = true,
    closed,
    partials = [],
    textStyle,
    fontStyle = "bold 18pt sans-serif",
    className,
    innerText,
    disabled,
  }) => {
    const context = React.useRef();

    /**
     * @description
     * Data sets for the colors and stuff.
     */
    const data = React.useMemo(() => {
      if (closed) {
        return {
          labels: [],
          datasets: [
            {
              data: [100],
              label: "Etapa",
              borderWidth: 2,
              hoverOffset: 4,
              borderColor: "#FFFFFF",
              backgroundColor: [Color.secondary],
              hoverBackgroundColor: [Color.secondary],
            },
          ],
        };
      }

      /**
       * @description
       * Fill spaces blank in case of being disabled.
       */
      if (disabled) {
        return {
          labels: [],
          datasets: [
            {
              data: [100],
              label: "Etapa",
              borderWidth: 2,
              hoverOffset: 4,
              borderColor: "#FFFFFF",
              backgroundColor: [closed ? Color.secondary : "#DFDFDF"],
              hoverBackgroundColor: [closed ? Color.secondary : "#DFDFDF"],
            },
          ],
        };
      }

      return {
        labels: partials.map((partial) => capitalize(partial.level)),
        datasets: [
          {
            label: "Etapa",
            hoverOffset: 4,
            backgroundColor: partials.map((partial) => partial.color),
            hoverBackgroundColor: partials.map((partial) => partial.color),
            data: partials.map((partial) => Number.parseFloat(partial.percent)),
          },
        ],
      };
    }, [closed, disabled, partials]);

    /**
     * @description
     * Getting canvas 2d context to draw text inside shapes.
     */
    const textCenterPlugin = React.useMemo<Plugin>(
      () => ({
        id: "textCenterPlugin",
        beforeDatasetDraw(chart) {
          if (innerText && fontStyle) {
            chart.ctx.save();

            chart.ctx.fillStyle = Color.primary;

            chart.ctx.textAlign = "center";

            chart.ctx.textBaseline = "middle";

            chart.ctx.font = fontStyle;

            chart.ctx.fillText(
              innerText,
              chart?.getDatasetMeta(0)?.data[0]?.x,
              chart?.getDatasetMeta(0)?.data[0]?.y
            );
          }
        },
      }),
      [innerText, fontStyle]
    );

    /**
     * @description
     * Default plugins.
     */
    const defaultPlugins = innerText ? [textCenterPlugin] : [];

    return (
      <div className={classNames(className && className)}>
        <div className={classNames(flex && "flex justify-center items-center")}>
          <Doughnut
            ref={context.current}
            plugins={defaultPlugins as never[]}
            options={{
              maintainAspectRatio: aspect,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      if (disabled) {
                        return label;
                      }
                      
                      return ` Cursos: ${partials[context.dataIndex]?.count ?? 0}`;
                    },
                  },
                },
              },
            }}
            data={data}
            width={width}
            height={height}
          />
        </div>
        <br />
        <div
          className={classNames(
            textStyle && textStyle,
            disabled && "opacity-50",
            "flex justify-center items-center text-center"
          )}
        >
          <h3 className={classes.label}>{label}</h3>
        </div>
      </div>
    );
  }
);


export interface Graph {
  level: string;
  count: number;
  color: string;
  percent: string;
}

export type ChartProps = {
  className?: string;
  partials: Graph [];
  label: string;
  width?: number;
  height?: number;
  labels?: string [];
  closed?: boolean;
  aspect?: boolean;
  flex?: boolean;
  disabled?: boolean;
  drawText?: string;
  textStyle?: string;
  fontStyle?: string;
  innerText?: string;
}