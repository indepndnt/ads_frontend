import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./Branding.css";

const Branding = props => {
  const { children, ...rest } = props;
  return (
    <BrowserRouter>
      <React.Fragment>
        <NavBar {...rest} />
        <Switch>{children}</Switch>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
};

export default Branding;
