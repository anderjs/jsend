export const defaultCacheQueryOptions = {
    enabled: false,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: <T extends object>(cache: T) => cache
  };