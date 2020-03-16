import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Connect from '../components/IntuitConnect';
import {Container, Spinner} from 'reactstrap';

const Disconnect = props => {
    const now = new Date();
    const {
        intuitDisconnect,
        disconnectLoading,
        disconnectError,
        intuitDisconnected,
        intuitLogout,
        intuitLogin,
        loginError,
        login_token,
        expires_at,
        loginLoading,
    } = props;
    let content = (
        <Container>
            <Spinner color='dark' /> Disconnecting app ...
        </Container>
    );

    if (disconnectError || loginError) {
        content = (
            <Container>
                <h3>Error disconnecting app!</h3>
                <p className='text-danger'>{disconnectError}</p>
                <p className='text-danger'>{loginError}</p>
            </Container>
        );
    } else if (intuitDisconnected) {
        content = (
            <Container>
                <h3>Disconnected</h3>
                <p>You have disconnected your QuickBooks Online from the Invoice Logistics App.</p>
                <p>
                    If this was unintentional, you can undo by reconnecting with the button below.
                    <Connect />
                </p>
                <p>
                    <Link to='/app'>Return to app</Link> or{' '}
                    <Link to='/' onClick={intuitLogout}>
                        sign out
                    </Link>
                    ?
                </p>
            </Container>
        );
    } else if (!!login_token && expires_at > now && !disconnectLoading) {
        intuitDisconnect();
    } else if (!loginLoading) intuitLogin();
    return (
        <React.Fragment>
            <Header>Disconnect Invoice Logistics App</Header>
            {content}{' '}
        </React.Fragment>
    );
};

export default Disconnect;
