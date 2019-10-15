import React from 'react';
import {Link} from 'react-router-dom';

const Footer = props => (
    <footer className="py-5 bg-black">
        <div className="container">
            <p className="m-0 text-center text-muted">
                <Link to="/end-user-license-agreement" className="text-muted small">EULA</Link>
                &nbsp; &middot; &nbsp;
                <Link to="/privacy-policy" className="text-muted small">Privacy Policy</Link>
                &nbsp; &middot; &nbsp;
                <Link to="/contact" className="text-muted small">Contact Us</Link>
            </p>
            <p className="m-0 text-center text-white small">
                Copyright &copy; {new Date().getFullYear()} Accounting Data Solutions, LLC
            </p>
        </div>
    </footer>
);

export default Footer;
