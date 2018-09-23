import React, {Component} from 'react';

export default class ThinHeader extends Component {
    render() {
        return (
            <header className="masthead text-center text-white pb-3 pt-5">
                <div className="masthead-content pt-5">
                    <h2>{this.props.heading}</h2>
                </div>
            </header>
        );
    }
}
