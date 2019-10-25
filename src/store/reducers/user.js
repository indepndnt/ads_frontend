import * as act from '../actions/types';

const user = (
    state = {
        links: [],
        login_token: null,
        expires_at: null,
        realm_id: null,
    },
    action
) => {
    let companyList;
    switch (action.type) {
        case act.RECEIVE_LOGIN_TOKEN:
            const {token, expires_in} = action.payload.login_token;
            companyList = action.payload.companies;
            let expires_at = new Date();
            expires_at.setSeconds(expires_at.getSeconds() + expires_in - 30);
            state = {
                ...state,
                login_token: token,
                expires_at,
            };
            if (!state.realm_id && companyList.length > 0) {
                state.realm_id = companyList[0].realm_id;
                state.company_name = companyList[0].company_name;
            }
            break;
        case act.INTUIT_LOGIN_FAILURE:
            state = {
                ...state,
                login_token: null,
                expires_at: null
            };
            break;
        case act.REFRESH_USER_INFO_SUCCESS:
            companyList = action.payload.companies;
            let companies = companyList.reduce((acc, co) => {acc[co.realm_id] = co.company_name; return acc}, {});
            let uploads = companyList.reduce((acc, co) => {acc[co.realm_id] = co.uploads; return acc}, {});
            state = {
                ...state,
                companies,
                uploads,
            };
            if (!state.realm_id && companyList.length > 0) {
                state.realm_id = companyList[0].realm_id;
                state.company_name = companyList[0].company_name;
            }
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
