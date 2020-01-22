import * as act from './creators';
import axios from 'axios';

export function intuitLogin() {
    return dispatch => {
        dispatch(act.intuitLoginRequest());
        axios
            .get('/api/v1/start')
            .then(response => dispatch(act.intuitLoginSuccess(response.data)))
            .catch(err => dispatch(act.intuitLoginFailure(err.message)));
    };
}

export function intuitGetApp() {
    return dispatch => {
        dispatch(act.intuitGetAppRequest());
        axios
            .get('/api/v1/start', {params: {get_app: true}})
            .then(response => dispatch(act.intuitGetAppSuccess(response.data)))
            .catch(err => dispatch(act.intuitGetAppFailure(err.message)));
    };
}

export function intuitCallback(data) {
    return dispatch => {
        dispatch(act.intuitCallbackRequest());
        axios
            .post('/api/v1/token', data)
            .then(response => dispatch(act.intuitCallbackSuccess(response.data)))
            .catch(err => dispatch(act.intuitCallbackFailure(err.message)));
    };
}

export function intuitDisconnect() {
    return (dispatch, getState) => {
        const {realm_id, login_token} = getState().user;
        dispatch(act.intuitDisconnectRequest());
        axios
            .delete('/api/v1/token', {params: {realm_id}, headers: {Authorization: 'Bearer ' + login_token}})
            .then(() => dispatch(act.intuitDisconnectSuccess()))
            .catch(err => dispatch(act.intuitDisconnectFailure(err.message)));
    };
}

export function intuitGetCompanyInfo() {
    return (dispatch, getState) => {
        const {realm_id, login_token} = getState().user;
        dispatch(act.companyInfoRequest());
        axios
            .get('/api/v1/company-info', {params: {realm_id}, headers: {Authorization: 'Bearer ' + login_token}})
            .then(response => dispatch(act.companyInfoSuccess(response.data)))
            .catch(err => dispatch(act.companyInfoFailure(err.message)));
    };
}

export function intuitRefreshUserInfo() {
    return (dispatch, getState) => {
        const {login_token} = getState().user;
        dispatch(act.userInfoRequest());
        axios
            .get('/api/v1/user', {headers: {Authorization: 'Bearer ' + login_token}})
            .then(response => dispatch(act.userInfoSuccess(response.data)))
            .catch(err => dispatch(act.userInfoFailure(err.message)));
    };
}

export function intuitUploadInvoices(file, onProgress) {
    return (dispatch, getState) => {
        const {realm_id, login_token} = getState().user;
        dispatch(act.uploadInvoicesRequest());
        const data = new FormData();
        data.append('file', file);
        axios
            .post('/api/v1/invoices', data, {
                params: {realm_id},
                headers: {Authorization: 'Bearer ' + login_token},
                onUploadProgress: onProgress,
            })
            .then(response => {
                console.log(response.statusText);
                dispatch(act.uploadInvoicesSuccess(response.data));
            })
            .catch(err => {
                console.log(err.message);
                dispatch(act.uploadInvoicesFailure(err.message));
            });
    };
}

export function sendContact(data) {
    return dispatch => {
        dispatch(act.sendContactRequest());
        axios
            .post('/api/v1/contact', data)
            .then(response => {
                dispatch(act.sendContactSuccess());
            })
            .catch(err => {
                dispatch(act.sendContactFailure(err.message));
            });
    };
}
