import React, {Component} from 'react';
import Header from "../base/Header";
import { Redirect } from "react-router-dom";

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitor: "",
            email: "",
            phone: "",
            message: "",
            content: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    };

    handleChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
        this.setState({content: ""});
        fetch('/api/contact', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                visitor: this.state.visitor,
                email: this.state.email,
                phone: this.state.phone,
                message: this.state.message
            }),
            headers: {'Content-Type': 'application/json'}
        })
            .then(this.handleResponse);
        event.preventDefault();
    }

    handleResponse(response) {
        if (response.ok) {
            this.setState({content: <Redirect to={"/thankyou"}/>})
        } else {
            this.setState({
                content: (
                    <div className="box justify-content-center">
                        <h2 className="modal-title text-center">Sorry!</h2>
                        <p>Something went wrong and we were not able to send your message.
                            Please try emailing contact@accountingdatasolutions.com.</p>
                        <hr/>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header heading={<h2 className="masthead-heading mb-0">About Us</h2>}
                        tagLine={<React.Fragment>
                            <p>We are specialists in streamlining the flow of accounting
                                information through the intelligent application of automation and process
                                improvement.</p>
                            <p>Think about your most time-consuming, manual process. Then, when
                                you're ready to talk about how we can put your data to work for you, use the form below
                                to start the conversation!</p>
                        </React.Fragment>}/>
                <div className="container">
                    {this.state.content}
                    <form id="contactForm" className="form-group" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="visitor" id="visitor" required
                                   value={this.state.visitor_name} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" className="form-control flex-grow-1" name="email" id="email"
                                   required value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" className="form-control flex-grow-1" name="phone" id="phone"
                                   value={this.state.phone} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="sr-only">Message Content</label>
                            <textarea className="form-control flex-grow-1" name="message" id="message" rows="6"
                                      placeholder=" type your message here" required value={this.state.message}
                                      onChange={this.handleChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Message</button> &nbsp;
                        or email us at <a href="mailto:contact@accountingdatasolutions.com">
                        contact@accountingdatasolutions.com</a>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}