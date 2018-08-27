import React, {Component} from 'react';

export default class Footer extends Component {
    render() {
        let today = new Date();
        return (
            <footer className="py-5 bg-black">
              <div className="container">
                <p className="m-0 text-center text-white small">
                    Copyright &copy; {today.getFullYear()}  Accounting Data Solutions, LLC</p>
              </div>
            </footer>
        );
    }
}
