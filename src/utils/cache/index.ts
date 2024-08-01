export const defaultCacheQueryOptions = {
    enabled: false,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: (cache) => cache
  };