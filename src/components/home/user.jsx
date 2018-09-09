import React, {Component} from "react";
import Header from "../header";

export default class UserPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Header
                    heading={<h2 className="masthead-heading mb-0">Thank you for joining us!</h2>}
                    tagLine={<p>Your email address has been added to the mailing list, and you will be notified when
                        the app is launched! If you have not already done so, please visit the Kickstarter page by
                        clicking the button below and make a pledge!</p>}
                    button={<a href="https://kck.st/2vZ4FrQ" className="btn btn-primary btn-xl rounded-pill mt-5">
                        Count me in!</a>}/>
            </React.Fragment>
        )
    }
}