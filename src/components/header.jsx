import React, {Component} from 'react';

export default class Header extends Component {
    render() {
        return (
            <header className="masthead text-center text-white">
                <div className="masthead-content">
                    <div className="container">
                        {this.props.heading}
                        {this.props.tagLine}
                        {this.props.button}
                    </div>
                </div>
            </header>
        );
    }
}
