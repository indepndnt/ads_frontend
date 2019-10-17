import * as act from "./creators";

export function submitContact(visitor, email, phone, message) {
  return dispatch => {
    dispatch(act.contactRequest());
    fetch("/api/contact", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({
        visitor,
        email,
        phone,
        message
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to send email.");
        } else {
          dispatch(act.contactSuccess());
        }
      })
      .catch(err => {
        dispatch(act.contactFailure(err.message));
      });
  };
}
