import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Container, Spinner } from "reactstrap";

const Disconnect = props => {
  const {
    intuitDisconnect,
    disconnectLoading,
    disconnectError,
    intuitDisconnected
  } = props;
  if (disconnectError) {
    return (
      <React.Fragment>
        <Header>Disconnect Invoice Logistics App</Header>
        <Container>
          <h3>Error disconnecting app!</h3>
          <p>{disconnectError}</p>
        </Container>
      </React.Fragment>
    );
  } else if (!!intuitDisconnected) {
    return (
      <React.Fragment>
        <Header>Disconnect Invoice Logistics App</Header>
        <Container>
          <h3>Disconnected</h3>
          <p>
            You have disconnected your Quickbooks Online from the Invoice
            Logistics App.
          </p>
          <p>
            If this was unintentional, you can undo by reconnecting on the{" "}
            <Link to="/get_app">Get App</Link> page.
          </p>
        </Container>
      </React.Fragment>
    );
  } else if (!disconnectLoading) {
    intuitDisconnect();
  }
  return (
    <React.Fragment>
      <Header>Disconnect Invoice Logistics App</Header>
      <Container>
        <Spinner color="dark" /> Disconnecting app ...
      </Container>
    </React.Fragment>
  );
};

export default Disconnect;
