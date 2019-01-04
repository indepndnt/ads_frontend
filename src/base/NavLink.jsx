import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class NavLink extends Component {
    render() {
        if (this.props.link === 'signout') {
            return (
                <li className="nav-item">
                    <Link className="nav-link" onClick={this.props.user.logout} to='/'>{this.props.text}</Link>
                </li>
            )
        } else {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to={'/' + this.props.link}>{this.props.text}</Link>
                </li>
            )
        }
    }
}
