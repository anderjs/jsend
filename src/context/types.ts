import { UserSystem } from '@nectiasw/typings';


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