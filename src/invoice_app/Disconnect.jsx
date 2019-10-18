import React from "react";
import Header from "../components/Header";
import {Container, Spinner} from "reactstrap";

const Disconnect = props => {
    const { intuitDisconnect, disconnectLoading, disconnectError, intuitDisconnected } = props;
    if (disconnectError) {
        return (
            <React.Fragment>
                <Header heading="Disconnect Invoice Logistics App" />
                <Container>
                    <h3>Error discconnecting app!</h3>
                    <p>{disconnectError}</p>
                </Container>
            </React.Fragment>
        );
    } else if (!!intuitDisconnected) {
        return (
            <React.Fragment>
                <Header heading="Disconnect Invoice Logistics App" />
                <Container>
                    <h3>Discconnected</h3>
                    <p>You have disconnected your Quickbooks Online from the Invoice Logistics App.</p>
                </Container>
            </React.Fragment>
        );
    } else if (!disconnectLoading) {
        intuitDisconnect();
    }
    return (
        <React.Fragment>
            <Header heading="Disconnect Invoice Logistics App" />
            <Container>
                <Spinner color="dark" /> Disconnecting app ...
            </Container>
        </React.Fragment>
    );
};

export default Disconnect;
