import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import './Landing.css';
import img02 from './02.jpg';
import img03 from './03.jpg';

const Landing = () => {
    return (
        <Container>
            <Row>&nbsp;</Row>
            <Row>
                <Col md={{size: 5}}>
                    <Row>
                        <Col sm={6}>
                            <img className='img-fluid rounded-circle' src={img03} alt='' />
                        </Col>
                        <Col sm={6}>
                            <p className='display-4'>Invoice Logistics</p>
                            <p className='lead'>Free app for QuickBooks Online</p>
                        </Col>
                    </Row>
                    <Link to='/get-app' className='btn btn-lg rounded-pill mt-5 intuitGetApp'>
                        Get App Now!
                    </Link>
                    <ul>
                        <li>Batch upload invoices</li>
                    </ul>
                </Col>
                <Col md={{size: 5, offset: 1}}>
                    <Row>
                        <Col sm={6}>
                            <img className='img-fluid rounded-circle' src={img02} alt='' />
                        </Col>
                        <Col sm={6}>
                            <p className='display-4'>Sellwood</p>
                            <p className='lead'>Solutions for Amazon FBA sellers</p>
                        </Col>
                    </Row>
                    <Link to='/quote' className='btn btn-lg rounded-pill mt-5 btn-primary'>
                        Get Started!
                    </Link>
                    <ul>
                        <li>Create Inbound Shipment Plan from warehouse receipts</li>
                        <li>Send package data to MWS from warehouse</li>
                        <li>Forward labels from MWS to warehouse team</li>
                        <li>Handles kitting and item number conversions</li>
                        <li>Customized to your exact specifications</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Landing;
