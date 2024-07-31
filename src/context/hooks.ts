import { useContext } from "react";
import { SignalContext } from ".";

export function useSignal () {
  const context = useContext(SignalContext);
  
  return context;
}