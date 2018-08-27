import React, {Component} from 'react';

export default class Header extends Component {
    render() {
        return (
            <header className="masthead text-center text-white">
                <div className="masthead-content">
                    <div className="container">
                        <h2 className="masthead-heading mb-0">Live shipment tracking right in your QuickBooks Online Invoice</h2>
                        <p>Our goal is to make it easier for small business owners manage their sales and
                            collections. Help us get started by backing the first Kickstarter to add shipment tracking
                            to QuickBooks Online!</p>
                        <a href="https://kck.st/2vZ4FrQ" className="btn btn-primary btn-xl rounded-pill mt-5">Learn
                            More</a>
                    </div>
                </div>
            </header>
        );
    }
}
