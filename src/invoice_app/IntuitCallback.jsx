import React, {useState} from 'react';
import {useLocation, Redirect} from 'react-router-dom';
import Header from '../components/Header';
import {Container, Spinner} from 'reactstrap';

const Callback = props => {
    const [isLoading, setIsLoading] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    const {intuitCallback, receivedToken, callbackError} = props;

    if (!isLoading && !receivedToken) {
        setIsLoading(true);
        let result = {};
        for (let entry of query) {
            const [key, value] = entry;
            result[key] = value;
        }
        intuitCallback(result);
    }

    if (!!receivedToken) {
        setIsLoading(false);
        return <Redirect to='/app' />;
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
