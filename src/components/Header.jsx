import React from "react";
import "./Header.css";

const Header = props => (
  <header>
    <h2>{props.heading}</h2>
  </header>
);

export default Header;
