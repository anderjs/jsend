/**
 * @description: Response interface for all API responses.
 */
export interface Response<T> {
  status?: number;
  message: string;
  result: T;
}

/**
 * @description
 * Session interface for SSO confirmation.
 */
export type Session = Partial<{
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  acr: string;
  sid: string;
  name: string;
  email: string;
  scope: string;
  given_name: string;
  family_name: string;
  session_state: string;
  email_verified: boolean;
  preferred_username: string;
  realm_access: {
    account: {
      roles: string[];
    };
  };
}>;

/**
 * @description
 * Local storage keys for CCC.
 *  - TOKEN: Token for API calls.
 *  - REFRESH_TOKEN: Refresh token for API calls.
 */
export enum LocalStorageKeys {
  TOKEN = "@CCC/token",
  REFRESH_TOKEN = "@CCC/refresh_token",
}

export enum UrlSSOParams {
  token = "token",
  access = "access", 
}

export type Role = {
  id: number;
  name: string;
  description: string;
}

export type Profile = {
  id: number;
  key: string;
  name: string;
  category: string;
  description: string;
  system: number;
}

export type SystemRole = {
  id: number;
  name: string;
  description: string;
  profiles: Profile [];
}

export type Systems = {
  id: number;
  name: string;
  description: string;
  url: string;
  acronym: string;
  isExternal: boolean;
  urlSlug: string;
  functions: Profile []
} []

export type UserSystem = Partial<{
  roles: Role [],
  id: string;
  rut: string;
  email: string;
  holdings: [],
  lastName: string;
  firstName: string;
  enterprises: [],
  enterprise: string | null;
  role: SystemRole 
  systems: Systems
}>


export interface Info {
  exp: number
  iat: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: string
  azp: string
  session_state: string
  acr: string
  "allowed-origins": string[]
  realm_access: RealmAccess
  resource_access: ResourceAccess
  scope: string
  sid: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}

export interface RealmAccess {
  roles: string[]
}

export interface ResourceAccess {
  account: Account
}

export interface Account {
  roles: string[]
}


export type SessionState = {
  token?: string;
  expiresAt?: string;
  refreshToken?: string;
};

export interface CommonSignalConnection {
  info?: Info;
  user?: UserSystem;
  session?: SessionState;
  environment: Record<string, string>;
  loading: boolean;
}

export interface SignalConnection extends CommonSignalConnection {
  onSignal?: (data: CommonSignalConnection) => void;
}