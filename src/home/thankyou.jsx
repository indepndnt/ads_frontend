import React, {Component} from 'react';
import Header from "../base/Header";

export default class About extends Component {
    render() {
        return (
            <React.Fragment>
                <Header heading={<h2 className="masthead-heading mb-0">Thank you!</h2>}/>
                <p>Your message has been sent and we will respond at our earliest opportunity. Thank you!</p>
            </React.Fragment>
        )
    }
}