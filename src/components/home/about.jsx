import React, {Component} from 'react';
import Header from "../header";

export default class About extends Component {
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
                    <form action="/home/contact/submit" method="POST">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="name" id="name" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" className="form-control flex-grow-1" name="email" id="email"
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" className="form-control flex-grow-1" name="phone" id="phone"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="sr-only">Message Content</label>
                            <textarea className="form-control flex-grow-1" name="message" id="message" rows="6"
                                      placeholder=" type your message here" required/>
                        </div>
                        <div className="form-group">
                            <input type="hidden" name="save" value="contact"/>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}