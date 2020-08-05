import React from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../components/Header';
import {Container, Spinner} from 'reactstrap';

const Launch = props => {
    const now = new Date();

    const {login_token, expires_at, intuitLogin, loginLoading, loginError} = props;
    if (!!login_token && expires_at > now) {
        return <Redirect to='/app' />;
    }
    // The /launch call is direct from QuickBooks Online, so the login should include accounting scope
    if (!loginLoading && !loginError) intuitLogin({get_app: true});
    return (
        <React.Fragment>
            <Header>Launch Invoice Logistics App</Header>
            {!!loginError ? (
                <Container>
                    <h3>Error signing in!</h3>
                    <p className='text-danger'>{loginError}</p>
                </Container>
            ) : (
                <Container>
                    <Spinner color='dark' /> Signing in...
                </Container>
            )}
        </React.Fragment>
    );
};

export default Launch;
