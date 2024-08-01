import { useQuery, useQueryClient } from "@tanstack/react-query";

interface DefaultConfigHook {
  useQuery?: typeof useQuery | null;
  useQueryClient?: typeof useQueryClient | null;
}

export const defaultConfig: DefaultConfigHook = {
  useQuery: null,
  useQueryClient: null,
}