import React from 'react';
import {Col, Row} from 'reactstrap';
import Connect from '../components/IntuitConnect';

const AppCompany = props => {
    const {company_name} = props;

    return (
        <Row>
            <Col>
                <h4>Connection</h4>
                {!company_name ? (
                    <p>
                        You have no active company connections.
                        <Connect />
                    </p>
                ) : (
                    <p>
                        You are connected to <strong>{company_name}</strong>.
                    </p>
                )}
            </Col>
        </Row>
    );
};

export default AppCompany;
