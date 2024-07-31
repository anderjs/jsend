import React from "react";

export function useCustomEvent<T>(event: string, callback: (value: T) => void) {
  React.useEffect(() => {
    window?.addEventListener(event, (e) => {
      if (e instanceof CustomEvent) {
        callback(e?.detail);
      }
    });

    return () => {
      window.removeEventListener(event, () => {});
    }
  }, [callback, event]);
}