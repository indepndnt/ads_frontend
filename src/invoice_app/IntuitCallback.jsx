import React, {useState} from 'react';
import {useLocation, Redirect} from 'react-router-dom';
import Header from '../components/Header';
import {Container, Spinner} from 'reactstrap';

const Callback = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    const {intuitCallback, receivedToken, callbackError, disconnectRequested} = props;

    if (!isLoading && !receivedToken) {
        setIsLoading(true);
        let payload = {};
        for (let entry of query) {
            const [key, value] = entry;
            payload[key] = value;
        }

        let setup = {};
        const state = payload.state.split(':');
        if (state.length > 1 && state[1] === 'DISCONNECT') {
            setup.realm_id = payload.realm_id;
            setup.disconnectRequested = true;
        }
        intuitCallback(payload, setup);
    }

    if (!!receivedToken) {
        if (!!disconnectRequested) return <Redirect to='/disconnect' />;
        else return <Redirect to='/app' />;
    }

    return (
        <React.Fragment>
            <Header>Launch Invoice Logistics App</Header>
            {callbackError ? (
                <Container>
                    <h3>Error connecting app!</h3>
                    <p>{callbackError}</p>
                </Container>
            ) : (
                <Container>
                    <Spinner color='dark' /> Launching app ...
                </Container>
            )}
        </React.Fragment>
    );
};

export default Callback;
