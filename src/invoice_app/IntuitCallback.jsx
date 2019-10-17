import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Container, Spinner } from "reactstrap";

const Callback = props => {
  const query = new URLSearchParams(useLocation().search);
  const { intuitCallback, callbackLoading, callbackError } = props;

  if (callbackError) {
    return (
      <React.Fragment>
        <Header heading="Launch Invoice Logistics App" />
        <Container>
          <h3>Error connecting app!</h3>
          <p>{callbackError}</p>
        </Container>
      </React.Fragment>
    );
  } else if (!callbackLoading) {
    let result = {};
    for (let entry of query) {
      const [key, value] = entry;
      result[key] = value;
    }
    intuitCallback(result);
  }
  return (
    <React.Fragment>
      <Header heading="Launch Invoice Logistics App" />
      <Container>
        <Spinner color="dark" /> Launching app ...
      </Container>
    </React.Fragment>
  );
};

export default Callback;
