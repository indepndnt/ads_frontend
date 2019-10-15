import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "./ads_logo_web.png";
import intuit_button from "./intuit-sign-in.png";

const NavBarComponent = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="lg">
      <NavbarBrand tag={Link} to="/">
        <img src={logo} alt="Accounting Data Solutions" />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav>
          {props.links.map(link => (
            <NavItem key={link.id}>
              <NavLink tag={Link} to={link.link}>
                {link.text}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
      <Nav>
        <NavItem>
          {props.user ? (
            <NavLink onClick={props.user.logout}>Sign out</NavLink>
          ) : (
            <NavLink className="nav-signin" onClick={props.handleLogin}>
              <img src={intuit_button} alt="Sign in with Intuit" />
            </NavLink>
          )}
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavBarComponent;
