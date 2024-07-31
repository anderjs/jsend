/* eslint-disable no-case-declarations */
import { bearer } from "@nectiasw/utils/bearer";
import { ContextProps } from "@nectiasw/context";
import { HttpClient, URLMapping } from "@nectiasw/providers/https";


export enum Method {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type Arguments = {
  endpoint: string;
  baseURL: string;
  method?: Method;
  normalize?: boolean;
};

export interface FetchRequest<T> {
  result: T;
  status: number;
  message: string;
}

/**
 * @description
 * Sends a request to the server.
 * This is commonly used on useQuery hooks from react-query.
 * @param session - session object.
 */
export function signalHttps<
  T,
  M = Record<string, never>,
  S extends ContextProps["session"] = ContextProps["session"]
>(session: S, args: Arguments, config?: URLMapping, mutation?: M) {
  return async () => {
    const headers: Record<string, string> = {};

    const defaultParams = config?.params ?? [];

    if (session?.token) {
      headers["Authorization"] = bearer(session.token);
    }

    if (session?.refreshToken) {
      headers["X-Access-Token"] = session.refreshToken;
    }

    const built = defaultParams.length > 0 ? defaultParams.join("/") : null;

    const api = new HttpClient({
      baseURL: args.baseURL,
      headers,
    });

    type Context = FetchRequest<T>;

    switch (args.method) {
      case Method.GET:
        if (args.normalize) {
          const getRef = await api.get<Context>({
            provide: built ? args.endpoint.concat("/", built) : args.endpoint,
            query: config?.query,
          });

          return getRef?.data;
        }

        const getRef = await api.get<Context>({
          provide: built ? args.endpoint.concat("/", built) : args.endpoint,
          query: config?.query,
        });

        return getRef?.data;

      case Method.DELETE:
        if (args.normalize) {
          const deleteRef = await api.delete<Context>({
            provide: built ? args.endpoint.concat("/", built) : args.endpoint,
            query: config?.query,
          });

          return deleteRef?.data;
        }

        const deleteRef = await api.delete<Context>({
          provide: built ? args.endpoint.concat("/", built) : args.endpoint,
          query: config?.query,
        });

        return deleteRef?.data;

      case Method.POST:
        const postRef = await api.post<Context, M>(
          {
            provide: built ? args.endpoint.concat("/", built) : args.endpoint,
            query: config?.query,
          },
          mutation
        );

        return postRef?.data;

      case Method.PUT:
        const putRef = await api.put<Context, M>(
          {
            provide: built ? args.endpoint.concat("/", built) : args.endpoint,
            query: config?.query,
          },
          mutation
        );

        return putRef?.data;

      case Method.PATCH:
        const patchRef = await api.patch<Context, M>(
          {
            provide: built ? args.endpoint.concat("/", built) : args.endpoint,
            query: config?.query,
          },
          mutation
        );

        return patchRef?.data;

      default:
        const { data } = await api.get<Context>({
          provide: built ? args.endpoint.concat("/", built) : args.endpoint,
          query: config?.query,
        });

        return data;
    }
  };
}
