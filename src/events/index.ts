const ON_CONNECT_APP = "@CCC/onConnectApp";

const ON_REHYDRATE_APP = "@CCC/onRehydrateApp";

const ON_DISCONNECT_APP = "@CCC/onDisconnectApp";

const GET_ZUSTAND_INSTANCE = "@CCC/getZustandInstance";

const UPDATE_ZUSTAND_INSTANCE = "@CCC/updateZustandInstance";

const SSO_LOGIN = "@CCC/SSO";

const SSO_LOGOUT = "@CCC/SSO/logout";

const SSO_REFRESH = "@CCC/SSO/refresh";

const SSO_ATTEMPT = "@CCC/SSO/attempt";

const SSO_ERROR = "@CCC/SSO/failure";

const SSO_SUCCESS = "@CCC/SSO/success";

const SSO_EXPIRED = "@CCC/SSO/expired";

const SIGNAL = "@CCC/signal";
/**
 * @description
 * This is the list of all the events that the client can emit.
 *  - ON_CONNECT_APP: This event is emitted when the app is connected.
 *  - ON_REHYDRATE_APP: This event is emitted when the app is rehydrated.
 *  - ON_DISCONNECT_APP: This event is emitted when the app is disconnected.
 *  - GET_ZUSTAND_INSTANCE: This event is emitted when the app needs to get the zustand instance.
 *  - UPDATE_ZUSTAND_INSTANCE: This event is emitted when the app needs to update the zustand instance.
 *  - SSO_LOGIN: This event is emitted when the app needs to login.
 *  - SSO_LOGOUT: This event is emitted when the app needs to logout.
 *  - SSO_REFRESH: This event is emitted when the app needs to refresh the token.
 *  - SSO_ATTEMPT: This event is emitted when the app needs to attempt to login.
 *  - SSO_ERROR: This event is emitted when the app needs to attempt to login.
 *  - SIGNAL: This event is emitted when the app needs to attempt to login.
 */
export type Event =
  | typeof ON_CONNECT_APP
  | typeof ON_DISCONNECT_APP
  | typeof ON_REHYDRATE_APP
  | typeof GET_ZUSTAND_INSTANCE
  | typeof UPDATE_ZUSTAND_INSTANCE
  | typeof SSO_LOGIN
  | typeof SSO_LOGOUT
  | typeof SSO_REFRESH
  | typeof SSO_ATTEMPT
  | typeof SSO_ERROR
  | typeof SSO_SUCCESS
  | typeof SIGNAL
  | typeof SSO_EXPIRED;



/**
 * @description
 * This is the list of all the events that the client can emit.
 * - ON_CONNECT_APP: This event is emitted when the app is connected.
 * - ON_REHYDRATE_APP: This event is emitted when the app is rehydrated.
 * - ON_DISCONNECT_APP: This event is emitted when the app is disconnected.
 * - GET_ZUSTAND_INSTANCE: This event is emitted when the app needs to get the zustand instance.
 * - UPDATE_ZUSTAND_INSTANCE: This event is emitted when the app needs to update the zustand instance.
 * - SSO_LOGIN: This event is emitted when the app needs to login.
 * - SSO_LOGOUT: This event is emitted when the app needs to logout.
 * - SSO_REFRESH: This event is emitted when the app needs to refresh the token.
 * - SSO_ATTEMPT: This event is emitted when the app needs to attempt to login.
 */
export enum EventMap  {
  SSO_LOGIN = "@CCC/SSO",
  SSO_ERROR = "@CCC/SSO/failure",
  SSO_LOGOUT = "@CCC/SSO/logout",
  SSO_REFRESH = "@CCC/SSO/refresh",
  SSO_ATTEMPT = "@CCC/SSO/attempt",
  SSO_EXPIRED = "@CCC/SSO/expired",
  SSO_SUCCESS = "@CCC/SSO/success",
  ON_CONNECT_APP = "@CCC/onConnectApp",
  ON_REHYDRATE_APP = "@CCC/onRehydrateApp",
  ON_DISCONNECT_APP = "@CCC/onDisconnectApp",
  GET_ZUSTAND_INSTANCE = "@CCC/getZustandInstance",
  UPDATE_ZUSTAND_INSTANCE = "@CCC/updateZustandInstance",
  SIGNAL = "@CCC/signal",
}