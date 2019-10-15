import React from "react";
import { Link } from 'react-router-dom';
import Header from "../base/Header";
import Section from "./section";
import img01 from "./01.jpg";
import img03 from "./03.jpg";

const Visitor = (props) => {
    return (
        <React.Fragment>
            <Header heading="Invoice Logistics"/>
            <p className="text-center text-danger">{props.message}</p>
            <Section key="1" image={img01} swap="false" heading="Free Invoice Upload"
                     text="Free app to upload invoices to QuickBooks Online!" button={
                <Link to="/get_app" className="btn btn-lg rounded-pill mt-5 intuitGetApp">
                    Get App Now!
                </Link>
            }/>
            <Section key="2" image={img03} swap="true" heading="Live shipment tracking"
                     text="right in your QuickBooks Online Invoice" button={
                <a href="https://kck.st/2vZ4FrQ" className="btn btn-primary btn-lg rounded-pill mt-5">
                    Learn More</a>}/>
        </React.Fragment>
    )
};

export default Visitor;