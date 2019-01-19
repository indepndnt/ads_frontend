import React, { Component } from 'react';

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    };

    onClick(event) {
        event.preventDefault();
        this.props.onClick(this.props.label);
    };

    render() {
        let className = 'nav-link';

        if (this.props.activeTab === this.props.label) {
            className += ' active';
        }

        return (
            <li className="nav-item">
                <a className={className} onClick={this.onClick} href="">
                    {this.props.label}
                </a>
            </li>
        );
    }
}
