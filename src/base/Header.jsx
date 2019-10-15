import React from "react";

const Header = props => (
  <header className="masthead text-center pb-3 pt-5">
    <div className="masthead-content pt-5">
      <h2>{props.heading}</h2>
    </div>
  </header>
);

export default Header;
