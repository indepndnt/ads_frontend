import React from 'react';
import Header from '../components/Header';
import {Container, Spinner} from 'reactstrap';

const GetApp = props => {
    const {intuitGetApp, getappLoading, getappError} = props;
    if (!getappError && !getappLoading) {
        intuitGetApp();
    }
    return (
        <React.Fragment>
            <Header>Get Invoice Logistics App</Header>
            {!!getappError ? (
                <Container>
                    <h3>Error connecting app!</h3>
                    <p className='text-danger'>{getappError}</p>
                </Container>
            ) : (
                <Container>
                    <Spinner color='dark' /> Connecting app ...
                </Container>
            )}
        </React.Fragment>
    );
};

export default GetApp;
