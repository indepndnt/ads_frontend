import React, {Component} from 'react';

export default class Link extends Component {
    render() {
        if (this.props.link === 'signin') {
            return (
                <li className="nav-item">
                    <div className="" id="signin2"/>
                </li>
            )
        } else if (this.props.link === 'signout') {
            return (
                <li className="nav-item">
                    <a className="nav-link" onClick={this.props.user.disconnect} href="">{this.props.text}</a>
                </li>
            )
        } else {
            return (
                <li className="nav-item">
                    <a className="nav-link" href={this.props.link}>{this.props.text}</a>
                </li>
            );
        }
    }
}
