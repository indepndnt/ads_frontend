import * as act from '../actions/types';

const companyData = (realm_id, payload) => {
    if (!payload || payload.length < 1) {
        return {
            realm_id: null,
            company_name: null,
            companies: {},
            uploads: {},
        };
    }
    const retVal = {
        companies: payload.reduce((acc, co) => {
            acc[co.realm_id] = co.company_name;
            return acc;
        }, {}),
        uploads: payload.reduce((acc, co) => {
            acc[co.realm_id] = co.uploads;
            return acc;
        }, {}),
    };
    if (!(realm_id in retVal.companies)) realm_id = payload[0].realm_id;
    retVal.realm_id = realm_id;
    retVal.company_name = retVal.companies[realm_id];
    return retVal;
};

const defaultState = {
    links: [],
    login_token: null,
    expires_at: null,
    realm_id: null,
};

const user = (state = defaultState, action) => {
    switch (action.type) {
        case act.RECEIVE_LOGIN_TOKEN:
            const {token, expires_in} = action.payload.login_token;
            let expires_at = new Date();
            expires_at.setSeconds(expires_at.getSeconds() + expires_in - 30);
            state = {
                ...state,
                ...companyData(state.realm_id, action.payload.companies),
                login_token: token,
                expires_at,
            };
            break;
        case act.INTUIT_LOGIN_FAILURE:
            state = {
                ...state,
                login_token: null,
                expires_at: null,
            };
            break;
        case act.INTUIT_LOGOUT_REQUEST:
            state = defaultState;
            break;
        case act.REFRESH_USER_INFO_SUCCESS:
            state = {
                ...state,
                ...companyData(state.realm_id, action.payload.companies),
            };
            break;
        case act.UPLOAD_INVOICES_SUCCESS:
            let newUploads = {...state.uploads};
            newUploads[state.realm_id] = [action.payload, ...newUploads[state.realm_id]];
            state = {
                ...state,
                uploads: newUploads,
            };
            break;
        case act.SWITCH_COMPANY:
            state = {
                ...state,
                ...action.payload,
            };
            break;
        case act.INTUIT_LOGOUT:
            let slimState = {};
            for (let [key, value] of Object.entries(state)) {
                if (['links', 'realm_id', 'company_name'].indexOf(key) >= 0) {
                    slimState[key] = value;
                }
            }
            state = slimState;
            break;
        case act.INTUIT_DISCONNECT_SUCCESS:
            state = {
                ...state,
                realm_id: null,
                company_name: null,
            };
            break;
        default:
    }
    return state;
};

export default user;
