import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// - Types
import { TimelineProps, Event as IEvent } from "./types";

// - Styles
import { classes } from "./styles";

// - Styled Components
import {
  StyledDisclosure,
  TimelineDashed,
  TimelineUnion,
} from "./styled";

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const disclosureRef = useRef<HTMLDivElement>(null);

  const [lineHeight, setLineHeight] = useState("0px");

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (disclosureRef.current) {
        const height = `${disclosureRef.current.offsetHeight}px`;

        setLineHeight(height);
      }
    }, 0);
  }, [openCategory]);

  useEffect(() => {
    const openCategoryEvent = events?.find((event) => event.isOpen);

    setOpenCategory(openCategoryEvent ? openCategoryEvent.category : null);
  }, [events]);

    /**
   * @description
   * Optimization.
   */
    const eventsWithData = React.useMemo(
      () => events?.filter((event) => event.data && event.data.length > 0),
      [events]
    );
  
    const handleSetCategory = React.useCallback((event: IEvent) => {
      const isCurrentCategoryOpen = event.category === openCategory;
  
      setOpenCategory(isCurrentCategoryOpen ? null : event.category);
    }, [openCategory]);

  if (!events) {
    return null;
  }

  return (
    <div className={classes.timeline.container}>
      <div className={classes.timeline.title}>Historial del Curso</div>
      {eventsWithData?.map((event, index) => {
        const isCurrentCategoryOpen = event.category === openCategory;

        return (
          <div key={index}>
            <div className={classes.timeline.grid}>
              <button
                className={classes.timeline.button.container}
                onClick={() => handleSetCategory(event)}
              >
                <div className={classes.timeline.button.stack}>
                  <div className={classes.timeline.button.style}></div>
                  {eventsWithData.length > 1 &&
                    index < eventsWithData.length - 1 && <TimelineUnion />}

                  <span className={classes.timeline.button.category}>
                    {event.category}
                  </span>
                </div>
                <ChevronDownIcon
                  className={classes.chevronIcon(isCurrentCategoryOpen)}
                />
              </button>
            </div>
            {isCurrentCategoryOpen && (
              <div className={classes.timeline.grid}>
                <StyledDisclosure
                  isOpen={isCurrentCategoryOpen}
                  lineHeight={lineHeight}
                  ref={disclosureRef}
                >
                  <ol>
                    <TimelineDashed lineHeight={lineHeight} />
                    {event.data.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className={classes.timeline.list.item}
                      >
                        <span className={classes.timeline.list.styles}></span>
                        <h3 className={classes.timeline.list.name}>
                          {item?.name}
                        </h3>
                        <h3 className={classes.timeline.list.date}>
                          {item?.date}
                        </h3>
                        <p className={classes.timeline.list.author}>
                          {item?.author}
                        </p>
                      </li>
                    ))}
                  </ol>
                </StyledDisclosure>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

Timeline.defaultProps = {
  title: "Historial del Curso",
};
