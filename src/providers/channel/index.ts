import { Subject } from "rxjs";
import type { EventMap, Listener } from "./types";
import type { EventMap as EventContext } from "@nectiasw/events";

export const $events: EventMap = {};

export const $channels: Record<string, BroadcastChannel> = {};

export const $observers: Listener = {};

/**
 * @param $event - Event to unsubscribe from.
 * @returns {void}
 */
export function unsubscribeEvent($event: EventContext): void {
  if ($events[$event]) {
    $events[$event]?.unsubscribe();

    delete $events[$event];
  }
}

export function takeSignal<T>(
  $channel: string,
  onNext: (data: T) => void
): void {
  $channels[$channel].onmessage = (event: MessageEvent<T>) => {
    onNext(event.data);
  };

  return;
}

export function destroySignal($channel: string): void {
  $channels[$channel]?.close();

  delete $channels[$channel];
}

export function createSignal<T>($channel: string, data: T): void {
  if ($channels[$channel]) {
    $channels[$channel]?.postMessage(data);

    return;
  }

  $channels[$channel] = new window.BroadcastChannel($channel);
}


/**
 * @description
 * Dispatch
 * @param $name - Event name.
 * @param data - Data to be emitted.
 */
export function dispatch<T>($name: string, data: T): void {
  const event = new CustomEvent($name, {
    detail: data,
  });

  window.dispatchEvent(event);
}

export function createObserver<T>($name: string) {
  const $subject  = new Subject<T>();

  const win = window as unknown as { [key: string ]: Subject<T> };

  try {
    win[$name] = $subject;
  } catch (e) {
    console.warn("Cannot push service to window object");
  }

  return $subject;
}


export function observe<T>($name: string, callback: (args: T) => void) {
  const win = window as unknown as { [key: string ]: Subject<T> };

  if (win[$name]) {
    const subject = win[$name] as Subject<T>;

    return subject.subscribe(callback);
  }

  throw new Error('Cannot find subscription');
}

export function destroy<T>($name: string) {
  const win = window as unknown as { [key: string ]: Subject<T> };

  if (win[$name]) {
    const subject = win[$name] as Subject<T>;

    return subject.unsubscribe();
  }

  throw new Error('Cannot find subscription');
}

export function broadcast<T>($name: string, data: T) {
  const win = window as unknown as { [key: string ]: Subject<T> };

  if (win[$name]) {
    const subject = win[$name] as Subject<T>;

    return subject.next(data);
  }

  throw new Error('Cannot find subscription');
}

export { useBroadcaster, useObserver } from "./hooks";