import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Section from '../components/Section';
import './Landing.css';
import img02 from './02.jpg';
import img03 from './03.jpg';

const Landing = () => {
    return (
        <React.Fragment>
            <Header>Invoice Logistics</Header>
            <Section
                key='1'
                image={img03}
                swap={false}
                heading='Free Invoice Upload'
                text='Free app to upload invoices to QuickBooks Online!'>
                <Link to='/get-app' className='btn btn-lg rounded-pill mt-5 intuitGetApp'>
                    Get App Now!
                </Link>
            </Section>
            <Section
                key='2'
                image={img02}
                swap={true}
                heading='Live shipment tracking'
                text='right in your QuickBooks Online Invoice'>
                <a href='https://kck.st/2vZ4FrQ' className='btn btn-primary btn-lg rounded-pill mt-5'>
                    Learn More
                </a>
            </Section>
        </React.Fragment>
    );
};

export default Landing;
