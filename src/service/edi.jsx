import React, {Component} from 'react';
import Header from "../base/Header";
import EDIPricing from './ediPricing';
import {Link} from "react-router-dom";

export default class IntegratedEDI extends Component {
    render() {
        return (
            <React.Fragment>
                <Header
                    heading={<h2 className="masthead-heading mb-0">Integrated EDI</h2>}
                    tagLine={<h3>Up-front Pricing, No Surprises</h3>}
                    button={<Link className="btn btn-success rounded-pill mt-3" to={'/about'}>Contact Us to Get Started</Link>}
                />
                <EDIPricing/>
            </React.Fragment>
        )
    }
}