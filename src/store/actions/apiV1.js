import * as act from "./creators";

export function intuitLogin() {
  return dispatch => {
    dispatch(act.intuitLoginRequest());
    fetch("/api/v1/start")
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
    fetch("/api/v1/start?get_app=true")
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
    fetch("/api/v1/token", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {"content-type": "application/json"}
    })
        .then(responseToJsonWithErrorHandling)
        .then(payload => dispatch(act.intuitCallbackSuccess(payload)))
        .catch(err => {
          dispatch(act.intuitCallbackFailure(err.message));
        });
  };
}

export function responseToJsonWithErrorHandling(response) {
  const contentLength = response.headers.get("content-length");
  const contentType = response.headers.get("content-type");
  if (!response.ok) {
    if (!contentLength) {
      throw new Error(response.statusText);
    } else if (contentType && contentType.indexOf("application/json") !== -1) {
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
