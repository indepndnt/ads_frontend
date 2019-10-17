import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer>
    <p className="text-muted">
      <Link to="/end-user-license-agreement" className="text-muted small">
        EULA
      </Link>
      &nbsp; &middot; &nbsp;
      <Link to="/privacy-policy" className="text-muted small">
        Privacy Policy
      </Link>
      &nbsp; &middot; &nbsp;
      <Link to="/contact" className="text-muted small">
        Contact Us
      </Link>
    </p>
    <p className="text-white">
      Copyright &copy; {new Date().getFullYear()} Accounting Data Solutions, LLC
    </p>
  </footer>
);

export default Footer;
