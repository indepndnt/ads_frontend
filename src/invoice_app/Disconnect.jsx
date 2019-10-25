import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import {Container, Spinner} from 'reactstrap';

const Disconnect = props => {
    const {intuitDisconnect, disconnectLoading, disconnectError, intuitDisconnected, intuitLogout} = props;
    if (!disconnectLoading && !disconnectError && !intuitDisconnected) {
        intuitDisconnect();
    }
    return (
        <React.Fragment>
            <Header>Disconnect Invoice Logistics App</Header>
            {!!disconnectError ? (
                <Container>
                    <h3>Error disconnecting app!</h3>
                    <p className="text-danger">{disconnectError}</p>
                </Container>
            ) : !!intuitDisconnected ? (
                <Container>
                    <h3>Disconnected</h3>
                    <p>You have disconnected your Quickbooks Online from the Invoice Logistics App.</p>
                    <p>
                        If this was unintentional, you can undo by reconnecting on the{' '}
                        <Link to='/get-app'>Get App</Link> page.
                    </p>
                    <p>
                        <Link to='/app'>Return to app</Link> or <Link to="/" onClick={intuitLogout}>sign out</Link>?
                    </p>
                </Container>
            ) : (
                <Container>
                    <Spinner color='dark' /> Disconnecting app ...
                </Container>
            )}{' '}
        </React.Fragment>
    );
};

export default Disconnect;
