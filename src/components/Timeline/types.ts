export type Stage = {
  name: string;
  date: string;
  author: string;
  uuid?: string;
};


export type Event = {
  category: string;
  data: Stage[];
  isOpen: boolean;
};

export type EventUI = Event & {
  uuid: string;
}

export type TimelineProps = {
  events: Event[] | null;
  title?: string;
};

export type TimelineDashedProps = {
  lineHeight: string;
};

export type IDisclosureProps = {
  isOpen: boolean;
  lineHeight: string;
  ref?: React.RefObject<HTMLDivElement>;
};
