import * as act from '../actions/types';

const session = (state = {}, action) => {
    switch (action.type) {
        case act.SEND_CONTACT_REQUEST:
            state = {
                ...state,
                contactResult: 'loading',
            };
            break;
        case act.SEND_CONTACT_SUCCESS:
            state = {
                ...state,
                contactResult: 'thankyou',
            };
            break;
        case act.SEND_CONTACT_FAILURE:
            state = {
                ...state,
                contactResult: 'sorry',
            };
            break;
        case act.INTUIT_LOGIN_REQUEST:
            state = {
                ...state,
                loginLoading: true,
                redirect: null,
                loginError: null,
            };
            break;
        case act.INTUIT_LOGIN_SUCCESS:
            state = {
                ...state,
                redirect: action.payload.redirect,
            };
            break;
        case act.INTUIT_LOGIN_FAILURE:
            state = {
                ...state,
                loginLoading: false,
                loginError: action.payload,
            };
            break;
        case act.INTUIT_GETAPP_REQUEST:
            state = {
                ...state,
                getappLoading: true,
                redirect: null,
                getappError: null,
            };
            break;
        case act.INTUIT_GETAPP_SUCCESS:
            state = {
                ...state,
                redirect: action.payload.redirect,
            };
            break;
        case act.INTUIT_GETAPP_FAILURE:
            state = {
                ...state,
                getappLoading: false,
                getappError: action.payload,
            };
            break;
        case act.INTUIT_DISCONNECT_REQUEST:
            state = {
                ...state,
                disconnectLoading: true,
                disconnectError: null,
                intuitDisconnected: false,
            };
            break;
        case act.INTUIT_DISCONNECT_SUCCESS:
            state = {
                ...state,
                disconnectLoading: false,
                intuitDisconnected: true,
                loadedUserInfo: false,
            };
            break;
        case act.INTUIT_DISCONNECT_FAILURE:
            state = {
                ...state,
                disconnectLoading: false,
                disconnectError: action.payload,
            };
            break;
        case act.INTUIT_CALLBACK_REQUEST:
            state = {
                ...state,
                receivedToken: false,
                disconnectRequested: false,
                callbackError: null,
            };
            break;
        case act.RECEIVE_LOGIN_TOKEN:
            state = {
                ...state,
                ...action.payload,
                receivedToken: true,
            };
            break;
        case act.INTUIT_CALLBACK_FAILURE:
            state = {
                ...state,
                callbackError: action.payload,
            };
            break;
        case act.INTUIT_LOGOUT_REQUEST:
            state = {};
            break;
        case act.GET_COMPANY_INFO_REQUEST:
            state = {
                ...state,
                loadingCompanyInfo: true,
                companyInfo: null,
            };
            break;
        case act.GET_COMPANY_INFO_SUCCESS:
            state = {
                ...state,
                loadingCompanyInfo: true,
                companyInfo: action.payload,
            };
            break;
        case act.GET_COMPANY_INFO_FAILURE:
            state = {
                ...state,
                loadingCompanyInfo: false,
                companyInfo: {error: action.payload},
            };
            break;
        case act.REFRESH_USER_INFO_REQUEST:
            state = {
                ...state,
                loadingUserInfo: true,
                loadedUserInfo: false,
                userInfoError: null,
            };
            break;
        case act.REFRESH_USER_INFO_SUCCESS:
            state = {
                ...state,
                loadingUserInfo: false,
                loadedUserInfo: true,
            };
            break;
        case act.REFRESH_USER_INFO_FAILURE:
            state = {
                ...state,
                loadingUserInfo: false,
                loadedUserInfo: true,
                userInfoError: action.payload,
            };
            break;
        case act.UPLOAD_INVOICES_REQUEST:
            state = {
                ...state,
                isUploading: true,
                uploadError: null,
            };
            break;
        case act.UPLOAD_INVOICES_SUCCESS:
            state = {
                ...state,
                isUploading: false,
            };
            break;
        case act.UPLOAD_INVOICES_FAILURE:
            state = {
                ...state,
                isUploading: false,
                uploadError: action.payload,
            };
            break;
        default:
    }
    return state;
};

export default session;
