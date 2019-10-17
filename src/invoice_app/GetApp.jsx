import React from "react";
import Header from "../components/Header";
import { Container, Spinner } from "reactstrap";

const GetApp = props => {
  const { intuitGetApp, getappLoading, getappError } = props;
  if (getappError) {
    return (
      <React.Fragment>
        <Header heading="Get Invoice Logistics App" />
        <Container>
          <h3>Error connecting app!</h3>
          <p>{getappError}</p>
        </Container>
      </React.Fragment>
    );
  } else if (!getappLoading) {
    intuitGetApp();
  }
  return (
    <React.Fragment>
      <Header heading="Get Invoice Logistics App" />
      <Container>
        <Spinner color="dark" /> Connecting app ...
      </Container>
    </React.Fragment>
  );
};

export default GetApp;
