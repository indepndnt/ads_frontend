import * as act from './creators';
import axios from 'axios';
import {saveAs} from 'file-saver';

export function intuitLogin(pathway) {
    return (dispatch) => {
        dispatch(act.intuitLoginRequest());
        axios
            .get('/api/v1/start/' + pathway)
            .then((response) => dispatch(act.intuitLoginSuccess(response.data)))
            .catch((err) => dispatch(act.intuitLoginFailure(err.message)));
    };
}

export function intuitLogout() {
    return (dispatch, getState) => {
        const {login_token} = getState().user;
        dispatch(act.intuitLogoutRequest());
        axios
            .delete('/api/v1/user', {headers: {Authorization: 'Bearer ' + login_token}})
            .catch((err) => dispatch(act.intuitLoginFailure(err.message)));
    };
}

export function intuitGetApp() {
    return (dispatch) => {
        dispatch(act.intuitGetAppRequest());
        axios
            .get('/api/v1/start/get_app')
            .then((response) => dispatch(act.intuitGetAppSuccess(response.data)))
            .catch((err) => dispatch(act.intuitGetAppFailure(err.message)));
    };
}

export function intuitCallback(data, setup) {
    return (dispatch) => {
        dispatch(act.intuitCallbackRequest());
        axios
            .post('/api/v1/token', data)
            .then((response) => dispatch(act.intuitCallbackSuccess({...setup, ...response.data})))
            .catch((err) => dispatch(act.intuitCallbackFailure(err.message)));
    };
}

export function intuitDisconnect() {
    return (dispatch, getState) => {
        const {realm_id, login_token} = getState().user;
        dispatch(act.intuitDisconnectRequest());
        axios
            .delete('/api/v1/token', {params: {realm_id}, headers: {Authorization: 'Bearer ' + login_token}})
            .then(() => dispatch(act.intuitDisconnectSuccess()))
            .catch((err) => dispatch(act.intuitDisconnectFailure(err.message)));
    };
}

export function intuitGetCompanyInfo() {
    return (dispatch, getState) => {
        const {realm_id, login_token} = getState().user;
        dispatch(act.companyInfoRequest());
        axios
            .get('/api/v1/company-info', {params: {realm_id}, headers: {Authorization: 'Bearer ' + login_token}})
            .then((response) => dispatch(act.companyInfoSuccess(response.data)))
            .catch((err) => dispatch(act.companyInfoFailure(err.message)));
    };
}

export function intuitRefreshUserInfo() {
    return (dispatch, getState) => {
        const {login_token} = getState().user;
        dispatch(act.userInfoRequest());
        axios
            .get('/api/v1/user', {headers: {Authorization: 'Bearer ' + login_token}})
            .then((response) => dispatch(act.userInfoSuccess(response.data)))
            .catch((err) => {
                if (err.response) dispatch(act.intuitLoginFailure(err.response.data.detail));
                else dispatch(act.userInfoFailure(err.message));
            });
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
            .then((response) => {
                console.log(response.statusText);
                dispatch(act.uploadInvoicesSuccess(response.data));
            })
            .catch((err) => {
                console.log(err.message);
                dispatch(act.uploadInvoicesFailure(err.message));
            });
    };
}

export function uploadLabels(file, onProgress) {
    return (dispatch) => {
        dispatch(act.uploadLabelsRequest());
        const data = new FormData();
        data.append('file', file);
        axios
            .post('/api/v1/labels', data, {
                responseType: 'blob',
                onUploadProgress: onProgress,
            })
            .then((response) => {
                const filename =
                    response.headers['content-disposition']
                        .split('filename=')[1]
                        .split(';')[0]
                        .replace(/^"(.*)"$/, '$1') + '.pdf';
                saveAs(new Blob([response.data], {type: 'application/pdf'}), filename);
                dispatch(act.uploadLabelsSuccess(response.data));
            })
            .catch((err) => {
                console.log(err.message);
                dispatch(act.uploadLabelsFailure(err.message));
            });
    };
}

export function sendContact(data) {
    return (dispatch) => {
        dispatch(act.sendContactRequest());
        axios
            .post('/api/v1/contact', data)
            .then(() => {
                dispatch(act.sendContactSuccess());
            })
            .catch((err) => {
                dispatch(act.sendContactFailure(err.message));
            });
    };
}
