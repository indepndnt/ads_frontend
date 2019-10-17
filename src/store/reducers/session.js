import * as act from "../actions/types";

const session = (
  state = {
    links: [],
    loginLoading: false,
    getappLoading: false
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
    case act.INTUIT_CALLBACK_REQUEST:
      state = {
        ...state,
        callbackLoading: true,
        redirect: null,
        callbackError: null
      };
      break;
    case act.INTUIT_CALLBACK_SUCCESS:
      state = {
        ...state,
        ...action.payload,
        redirect: "/launch",
        user: action.payload.given_name + " " + action.payload.family_name
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
    default:
  }
  return state;
};

export default session;
