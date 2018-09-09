import React, {Component} from 'react';
import intuit_button from './img/intuit-sign-in.png'

export default class Link extends Component {
    render() {
        if (this.props.link === 'signin') {
            return (
                <React.Fragment>
                    <li className="nav-item">
                        <div className="nav-signin" id="googleSignIn"/>
                    </li>
                    <li className="nav-item">
                        <div className="nav-signin" id="signin3" onClick={this.props.user.intuitSignIn}>
                            <img src={intuit_button} alt="Sign in with Intuit"/>
                        </div>
                    </li>
                </React.Fragment>
            )
        } else if (this.props.link === 'signout') {
            return (
                <li className="nav-item">
                    <a className="nav-link" onClick={this.props.user.logout} href="">{this.props.text}</a>
                </li>
            )
        } else {
            return (
                <li className="nav-item">
                    <a className="nav-link" href="" onClick={(event) => this.props.onLink(event, this.props.link)}>
                        {this.props.text}</a>
                </li>
            );
        }
    }
}
