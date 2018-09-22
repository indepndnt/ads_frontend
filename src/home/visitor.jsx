import React, {Component} from "react";
import Header from "../base/Header";
import Section from "../service/section";
import MailingList from "./mailingList";
import img01 from "./01.jpg";
import img02 from "./02.jpg";
import img03 from "./03.jpg";

export default class Visitor extends Component {
    render() {
        return (
            <React.Fragment>
                <Header
                    heading={<h2 className="masthead-heading mb-0">Live shipment tracking right in your QuickBooks
                        Online Invoice</h2>}
                    tagLine={<p>Our goal is to make it easier for small business owners manage their sales and
                        collections. Help us get started by backing the first Kickstarter to add shipment tracking
                        to QuickBooks Online!</p>}
                    button={<a href="https://kck.st/2vZ4FrQ" className="btn btn-primary btn-xl rounded-pill mt-5">Learn
                        More</a>}/>
                <Section key="1" image={img01} swap="true" heading="Robotic Process Automation as a Service (RPAaaS)"
                         text=""/>
                <Section key="2" image={img02} swap="false"
                         heading="Let Robotic Process Automation return your time to you!" text=""/>
                <Section key="3" image={img03} swap="true"
                         heading="Get back to what you started out to do, while accounting takes care of itself"
                         text=""/>
                <MailingList/>
            </React.Fragment>
        )
    }
}