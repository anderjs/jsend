/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { observe, broadcast } from ".";

export function useObserver<T>(event: string, callback: (data: T) => void) {
  const [pause, setPause] = useState(false);

  /**
   * @description
   * This function is used to subscribe to an event.
   */
  useEffect(() => {
    const { unsubscribe } = observe(event, callback);

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    status: pause,
    pause: useCallback(() => setPause(true), []),
    resume: useCallback(() => setPause(false), []),
  };
}

/**
 * @description
 * This function is used to broadcast an event.
 * @param event - Event name to be broadcasted.
 */
export function useBroadcaster<T>(event: string, callback?: () => void, name?: string) {
  useEffect(() => {
    if (callback) {
      callback();

      if (name) {
        broadcast(event, name);
      }
    }
  }, [event]);

  return useCallback((data: T) => {
    broadcast(event, data);
  }, [event]);
}
