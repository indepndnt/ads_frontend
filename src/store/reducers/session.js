import * as act from "../actions/types";

const session = (
  state = {
    links: []
  },
  action
) => {
  switch (action.type) {
    case act.CONTACT_REQUEST:
      state = {
        ...state,
        contactResult: "loading"
      };
      break;
    case act.CONTACT_SUCCESS:
      state = {
        ...state,
        contactResult: "thankyou"
      };
      break;
    case act.CONTACT_FAILURE:
      state = {
        ...state,
        contactResult: "sorry"
      };
      break;
    case act.INTUIT_LOGIN_REQUEST:
      state = {
        ...state,
        loginLoading: true,
        redirect: null,
        loginError: null
      };
      break;
    case act.INTUIT_LOGIN_SUCCESS:
      state = {
        ...state,
        redirect: action.payload.redirect
      };
      break;
    case act.INTUIT_LOGIN_FAILURE:
      state = {
        ...state,
        loginLoading: false,
        loginError: action.payload
      };
      break;
    case act.INTUIT_GETAPP_REQUEST:
      state = {
        ...state,
        getappLoading: true,
        redirect: null,
        getappError: null
      };
      break;
    case act.INTUIT_GETAPP_SUCCESS:
      state = {
        ...state,
        redirect: action.payload.redirect
      };
      break;
    case act.INTUIT_GETAPP_FAILURE:
      state = {
        ...state,
        getappLoading: false,
        getappError: action.payload
      };
      break;
    case act.INTUIT_DISCONNECT_REQUEST:
      state = {
        ...state,
        disconnectLoading: true,
        disconnectError: null,
        intuitDisconnected: false
      };
      break;
    case act.INTUIT_DISCONNECT_SUCCESS:
      state = {
        ...state,
        disconnectLoading: false,
        intuitDisconnected: true
      };
      break;
    case act.INTUIT_DISCONNECT_FAILURE:
      state = {
        ...state,
        disconnectLoading: false,
        disconnectError: action.payload
      };
      break;
    case act.INTUIT_CALLBACK_REQUEST:
      state = {
        ...state,
        callbackLoading: true,
        redirect: null,
        callbackError: null
      };
      break;
    case act.RECEIVE_LOGIN_TOKEN:
      const { token, expires_in } = action.payload.login_token;
      let expires_at = new Date();
      expires_at.setSeconds(expires_at.getSeconds() + expires_in - 30);
      state = {
        ...state,
        ...action.payload,
        login_token: token,
        expires_at,
        receivedToken: true
      };
      break;
    case act.INTUIT_CALLBACK_FAILURE:
      state = {
        ...state,
        callbackLoading: false,
        callbackError: action.payload
      };
      break;
    case act.INTUIT_LOGOUT:
      state = {
        links: [],
        loginLoading: false,
        getappLoading: false
      };
      break;
    case act.LOGIN_COMPLETED:
      let slimState = {};
      for (let [key, value] of Object.entries(state)) {
        if ([
          "receivedToken",
          "loginLoading",
          "loginError",
          "getappLoading",
          "getappError",
          "callbackLoading",
          "callbackError",
          "redirect",
        ].indexOf(key)) {
          slimState[key] = value;
        }
      }
      state = slimState;
      break;
    case act.RECONSTITUTE_TOKENS:
      state = {
        ...state,
        ...action.payload
      };
      break;
    default:
  }
  return state;
};

export default session;
