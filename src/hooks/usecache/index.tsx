/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import * as rq from "@tanstack/react-query";
import { defaultConfig } from "./config";

export type UseCacheOptions<T> = {
  sequence?: boolean;
  cacheKey: readonly string[];
  defaultValue?: T;
};

export function useCache<T>({
  defaultValue,
  sequence,
  cacheKey,
}: UseCacheOptions<T>) {
  const useReactQuery = defaultConfig.useQuery ?? rq.useQuery;

  const useReactQueryClient = defaultConfig.useQueryClient ?? rq.useQueryClient;

  const cache: rq.UseQueryResult<T> = useReactQuery({
    enabled: false,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: (cache) => cache,
    queryKey: cacheKey,
  });

  const client = useReactQueryClient();

  /**
   * @description
   * Check if is cached.
   */
  const isStored = Boolean(cache.data);

  /**
   * @description
   * Saves the information to cache.
   */
  const store = (data: T) => {
    client.setQueryData(cacheKey, data);
  };

  /**
   * @description
   * Purges the current cache of the query.
   */
  const purge = (queryKeys?: readonly string[]) => {
    if (sequence) {
      cacheKey.forEach((key) => {
        if (key) {
          client.resetQueries();
        }
      });

      return;
    }

    if (isStored) {
      client.resetQueries(cacheKey ?? queryKeys);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      store(defaultValue);
    }
  }, []);

  return { cache, defaultValue, isStored, store, purge };
}