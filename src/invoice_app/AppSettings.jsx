import React from 'react';
import {Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';

const AppSettings = () => {
    return (
        <Row>
            <Col>
                <hr />
                <p>
                    <Link to='/disconnect'>Disconnect</Link> your company from the app.
                </p>
            </Col>
        </Row>
    );
};

export default AppSettings;
