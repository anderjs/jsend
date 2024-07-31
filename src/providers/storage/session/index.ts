import { create } from "zustand";
import { HttpStatusCode } from "axios";
import { jwtDecode } from "jwt-decode";
import crypto from "crypto-js";

import {
  Response,
  UserSystem,
} from "@nectiasw/typings";
import {
  HttpClient,
  HttpClientOptions,
} from "@nectiasw/providers/https";


import { devtools, persist, createJSONStorage } from "zustand/middleware";

import { secretKey } from "../crypto";
import { Root as Info } from "../types";

type Session = {
  token?: string | null;
  expiresAt?: string | null;
  refreshToken?: string | null;
};

type State = {
  info: Info | null;
  error: Error | null;
  session: Session | null;
  user: UserSystem | null;
  api: HttpClient | null;
  active?: boolean;
  hasHydrated: boolean;
};

type Actions = {
  reset: () => void;

  setHydrated: (hydrated: boolean) => void;

  setHttp: (api: HttpClientOptions) => void;

  setError: (error: Error) => void;

  setUser: (user?: Session) => Promise<void>;

  sync: (
    token?: Session["token"],
    refreshToken?: Session["refreshToken"]
  ) => Promise<void>;

  attempt: (
    rehydrate?: boolean,
    args?: Partial<Session>
  ) => Promise<AttemptResponse | void>;

  login: (
    token: string,
    refreshToken: string
  ) => Promise<AttemptResponse | void>;
};

type AttemptResponse = Response<
  UserSystem & {
    token: string;
  }
>;

export const initialState: State = {
  api: null,
  info: null,
  user: null,
  error: null,
  session: null,
  active: false,
  hasHydrated: false,
};

/**
 * @description
 * This store is used to store the session data.
 *  - token
 *  - refreshToken
 */
export const useSessionStore = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        /**
         * @param user - The user data to be stored in the session.
         */
        setUser: async (user?: Session, system?: UserSystem) => {
          if (user) {
            set({
              user: system ?? null,
              session: user,
            });
          }
        },

        reset: () => {
          set({
            ...initialState,
          });
        },

        setHydrated(hydrated: boolean) {
          set({ hasHydrated: hydrated });
        },

        sync: async (
          token?: Session["token"],
          refreshToken?: Session["refreshToken"]
        ) => {
          const { api, session } = get();

          if (api) {
            try {
              const refresh = refreshToken ?? session?.refreshToken;

              const access = `Bearer ${token ?? session?.token}`;

              if (session?.refreshToken && session?.token) {
                const { status, data } = await api.get<AttemptResponse>(
                  "/api/sso/session",
                  {
                    headers: {
                      ["Authorization"]: access,
                      ["X-Access-Token"]: refresh,
                    },
                  }
                );

                if (status === HttpStatusCode.Ok || status === HttpStatusCode.Created) {
                  const ref: Session = {
                    token: data?.result.token,
                    refreshToken: session?.refreshToken,
                  };

                  set({
                    active: true,
                    session: ref,
                    user: data?.result as UserSystem,
                    info: jwtDecode(data?.result.token) as Info,
                  });
                }
              } else {
                const error = new Error("Invalid session");

                set({
                  user: null,
                  info: null,
                  error: error,
                  active: false,
                  session: null,
                });
              }
            } catch (err) {
              set({ error: err as Error });
            }
          }
        },

        attempt: async (rehydrate?: boolean, args?: Partial<Session>) => {
          if (rehydrate) {
            if (args?.token && args?.refreshToken) {
              const { api } = get();

              if (api) {
                try {
                  const { status, data } = await api.get<AttemptResponse>(
                    "/api/sso/session",
                    {
                      headers: {
                        ["X-Access-Token"]: args?.refreshToken,
                        ["Authorization"]: `Bearer ${args?.token}`,
                      },
                    }
                  );

                  if (
                    status === HttpStatusCode.Ok ||
                    status === HttpStatusCode.Created
                  ) {
                    const ref: Session = {
                      token: data?.result.token,
                      refreshToken: args?.refreshToken,
                    };

                    set({
                      active: true,
                      session: ref,
                      user: data?.result as UserSystem,
                      info: jwtDecode(data?.result?.token) as Info,
                    });

                    return data;
                  } else {
                    const error = new Error("Invalid session");

                    set({
                      error,
                      user: null,
                      info: null,
                      session: null,
                      active: false,
                    });
                  }
                } catch (error) {
                  set({ error: error as Error });
                }
              }
            }
          }
        },

        login: async (
          token: string,
          refreshToken: string
        ): Promise<AttemptResponse | void> => {
          const { api } = get();

          if (api) {
            try {
              const { status, data } = await api.get<AttemptResponse>(
                "/api/sso/session",
                {
                  headers: {
                    ["X-Access-Token"]: refreshToken,
                    ["Authorization"]: `Bearer ${token}`,
                  },
                }
              );

              if (status === HttpStatusCode.Ok || status === HttpStatusCode.Created) {
                const ref: Session = {
                  token: data?.result?.token,
                  refreshToken,
                }

                set({
                  active: true,
                  session: ref,
                  user: data?.result as UserSystem,
                  info: jwtDecode(data?.result.token) as Info,
                });
              } else {
                throw new Error("Invalid session");
              }

              return data;
            } catch (error) {
              set({ error: error as Error });
            }
          }
        },

        setError: (error: Error) => set({ error }),

        setHttp: (api: HttpClientOptions) => {
          const client = new HttpClient(api);

          set({ api: client });
        },
      }),
      {
        name: "@ccc/store",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage() {
          return (state) => {
            if (state?.hasHydrated) {
              return {
                ...state,
                hasHydrated: true,
              };
            }
          };
        },
        partialize: (state) => ({
          info: state.info,
          user: state.user,
          session: state.session,
        }),
        serialize: (state) => {
          const { stringify } = JSON;

          const serialized = stringify(state);

          return crypto.AES.encrypt(serialized, secretKey).toString();
        },
        deserialize: (encryptedState) => {
          const { parse } = JSON;

          const bytes = crypto.AES.decrypt(encryptedState, secretKey);

          return parse(bytes.toString(crypto.enc.Utf8));
        },
      }
    )
  )
);

