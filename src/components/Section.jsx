import React from 'react';
import './Section.css';
import {Container, Row, Col} from 'reactstrap';

const Section = props => (
    <section>
        <Container>
            <Row>
                <Col lg={{size: 6, order: props.swap ? 2 : 1}}>
                    <img className='img-fluid rounded-circle' src={props.image} alt='' />
                </Col>
                <Col lg={{size: 6, order: props.swap ? 1 : 2}}>
                    <h2 className='display-4'>{props.heading}</h2>
                    <p>{props.text}</p>
                    {props.children}
                </Col>
            </Row>
        </Container>
    </section>
);

export default Section;
