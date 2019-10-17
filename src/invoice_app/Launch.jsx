import React from "react";
import { Redirect } from "react-router-dom";

const Launch = props => {
  const now = new Date();

  const { login_token, expires_at } = props;
  if (!login_token || expires_at < now) {
      const local_login_token = localStorage.getItem("token");
      const local_expires_at = localStorage.getItem("expires_at");
      if (!!local_login_token && local_expires_at > now) {
          this.props.reconstituteTokens(local_login_token, local_expires_at);
      } else props.intuitLogin();
  }

  return <Redirect to="/app" />;
};

export default Launch;
