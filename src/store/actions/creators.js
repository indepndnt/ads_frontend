import * as act from "./types";

export function contactRequest() {
  return { type: act.CONTACT_REQUEST };
}

export function contactSuccess() {
  return { type: act.CONTACT_SUCCESS };
}

export function contactFailure(message) {
  return { type: act.CONTACT_FAILURE, payload: message };
}

export function intuitLoginRequest() {
  return { type: act.INTUIT_LOGIN_REQUEST };
}

export function intuitLoginSuccess(payload) {
  return { type: act.INTUIT_LOGIN_SUCCESS, payload };
}

export function intuitLoginFailure(message) {
  return { type: act.INTUIT_LOGIN_FAILURE, payload: message };
}

export function intuitGetAppRequest() {
  return { type: act.INTUIT_GETAPP_REQUEST };
}

export function intuitGetAppSuccess(payload) {
  return { type: act.INTUIT_GETAPP_SUCCESS, payload };
}

export function intuitGetAppFailure(message) {
  return { type: act.INTUIT_GETAPP_FAILURE, payload: message };
}

export function intuitCallbackRequest() {
  return { type: act.INTUIT_CALLBACK_REQUEST };
}

export function intuitCallbackSuccess(payload) {
  return { type: act.RECEIVE_LOGIN_TOKEN, payload };
}

export function intuitCallbackFailure(message) {
  return { type: act.INTUIT_CALLBACK_FAILURE, payload: message };
}

export function intuitDisconnectRequest() {
  return { type: act.INTUIT_DISCONNECT_REQUEST };
}

export function intuitDisconnectSuccess() {
  return { type: act.INTUIT_DISCONNECT_SUCCESS };
}

export function intuitDisconnectFailure(message) {
  return { type: act.INTUIT_DISCONNECT_FAILURE, payload: message };
}

export function intuitLogout() {
  return { type: act.INTUIT_LOGOUT };
}

export function completeLogin() {
  return { type: act.LOGIN_COMPLETED };
}

export function reconstituteTokens(token, expires_at) {
  return { type: act.RECONSTITUTE_TOKENS, payload: { token, expires_at } };
}
