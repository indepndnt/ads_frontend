import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';

const Footer = () => (
    <footer>
        <p className='text-muted'>
            <Link to='/end-user-license-agreement' className='text-info small'>
                EULA
            </Link>
            &nbsp; &middot; &nbsp;
            <Link to='/privacy-policy' className='text-info small'>
                Privacy Policy
            </Link>
            &nbsp; &middot; &nbsp;
            <Link to='/contact' className='text-info small'>
                Contact Us
            </Link>
        </p>
        <p className='text-muted small'>
            Intuit and QuickBooks are registered trademarks of Intuit Inc. Used with permission.
        </p>
        <p className='text-white'>Copyright &copy; {new Date().getFullYear()} Accounting Data Solutions, LLC</p>
    </footer>
);

export default Footer;
