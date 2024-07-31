import { Subject } from "rxjs";
import { EventMap as Ref } from "@nectiasw/events";

export type EventMap = {
  [key in Ref]?: Subject<never>;
};

export type Listener = {
  [key in Ref]?: typeof Subject;
};
