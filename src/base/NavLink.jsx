import React, {Component} from 'react';

export default class NavLink extends Component {
    render() {
        if (this.props.link === 'signout') {
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
