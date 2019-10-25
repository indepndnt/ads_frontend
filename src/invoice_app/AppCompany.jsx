import React from 'react';
import {Col, Row} from 'reactstrap';

const AppCompany = props => {
    const {company_name} = props;

    return (
        <Row>
            <Col>
                <h4>Connection</h4>
                <p>
                    You are connected to <strong>{company_name}</strong>.
                </p>
            </Col>
        </Row>
    );
};

export default AppCompany;
