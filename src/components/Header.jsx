import React from "react";
import "./Header.css";

const Header = props => (
  <header>
    <h2>{props.children}</h2>
  </header>
);

export default Header;
