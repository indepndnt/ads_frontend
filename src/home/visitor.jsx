import React, {Component} from "react";
import Header from "../base/Header";
import Section from "../service/section";
import MailingList from "./mailingList";
import img01 from "./01.jpg";
import img02 from "./02.jpg";
import img03 from "./03.jpg";
import { Link } from 'react-router-dom';

export default class Visitor extends Component {
    render() {
        return (
            <React.Fragment>
                <Header
                    heading={<h2 className="masthead-heading mb-0">EDI Compliance Made Simple</h2>}
                    tagLine={<p>The EDI solution for your small business. We bring the simplicity to retail
                        trading.</p>}
                    button={<Link className="btn btn-primary btn-xl rounded-pill mt-5" to={'/about'}>Learn More</Link>}
                />
                <MailingList/>
                <Section key="1" image={img02} swap="true" heading="Save your time for the important things"
                         text="We'll take care of making sure your orders get to the warehouse."/>
                <Section key="2" image={img01} swap="false" heading="Robotic Process Automation"
                         text="means there's no such thing as &quot;can't&quot;"/>
                <Section key="3" image={img03} swap="true" heading="Live shipment tracking"
                         text="right in your QuickBooks Online Invoice" button={
                             <a href="https://kck.st/2vZ4FrQ" className="btn btn-primary btn-lg rounded-pill mt-5">
                                 Learn More</a>}/>
            </React.Fragment>
        )
    }
}