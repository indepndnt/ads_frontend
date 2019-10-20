import * as act from './creators';
import axios from 'axios';

axios.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    const expires_at = localStorage.getItem('expires_at');
    if (new Date() < expires_at) {
        request.headers['Authorization'] = 'Bearer ' + token;
    }
});

export function intuitLogin() {
    return dispatch => {
        dispatch(act.intuitLoginRequest());
        fetch('/api/v1/start')
            .then(responseToJsonWithErrorHandling)
            .then(payload => dispatch(act.intuitLoginSuccess(payload)))
            .catch(err => {
                dispatch(act.intuitLoginFailure(err.message));
            });
    };
}

export function intuitGetApp() {
    return dispatch => {
        dispatch(act.intuitGetAppRequest());
        fetch('/api/v1/start?get_app=true')
            .then(responseToJsonWithErrorHandling)
            .then(payload => dispatch(act.intuitGetAppSuccess(payload)))
            .catch(err => {
                dispatch(act.intuitGetAppFailure(err.message));
            });
    };
}

export function intuitCallback(params) {
    return dispatch => {
        dispatch(act.intuitCallbackRequest());
        fetch('/api/v1/token', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {'Content-Type': 'application/json'},
        })
            .then(responseToJsonWithErrorHandling)
            .then(payload => dispatch(act.intuitCallbackSuccess(payload)))
            .catch(err => {
                dispatch(act.intuitCallbackFailure(err.message));
            });
    };
}

export function intuitDisconnect() {
    return dispatch => {
        dispatch(act.intuitDisconnectRequest());
        fetch('/api/v1/token', {
            method: 'DELETE',
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        })
            .then(response => {
                if (response.ok) dispatch(act.intuitDisconnectSuccess());
                else throw new Error(response.statusText);
            })
            .catch(err => {
                dispatch(act.intuitDisconnectFailure(err.message));
            });
    };
}

export function intuitGetCompanyInfo() {
    return dispatch => {
        dispatch(act.companyInfoRequest());
        fetch('/api/v1/company-info', {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        })
            .then(responseToJsonWithErrorHandling)
            .then(payload => dispatch(act.companyInfoSuccess(payload)))
            .catch(err => {
                dispatch(act.companyInfoFailure(err.message));
            });
    };
}

export function intuitUploadInvoices(file, onProgress) {
    return dispatch => {
        dispatch(act.uploadInvoicesRequest());
        const data = new FormData();
        data.append('file', file);
        axios
            .post('/api/v1/invoices', data, {
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

export function responseToJsonWithErrorHandling(response) {
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
        if (!contentLength) {
            throw new Error(response.statusText);
        } else if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json().then(data => {
                let message = data.detail;
                if (!message) {
                    message = JSON.stringify(data);
                }
                throw new Error(message);
            });
        } else {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
    }
    return response.json();
}
