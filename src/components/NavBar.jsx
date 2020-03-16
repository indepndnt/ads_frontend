import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Spinner,
    Popover,
    PopoverHeader,
    PopoverBody,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavBar.css';
import logo from './ads_logo_web.png';
import SignIn from './IntuitSignIn';

const NavBarComponent = props => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const {links, intuitLogin, intuitLogout, loginLoading, loginError, login_token} = props;

    return (
        <Navbar dark expand='lg'>
            <NavbarBrand tag={Link} to='/'>
                <img src={logo} alt='Accounting Data Solutions' />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                {links ? (
                    <Nav>
                        {links.map(link => (
                            <NavItem key={link.id}>
                                <NavLink tag={Link} to={link.link}>
                                    {link.text}
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                ) : null}
                <Nav id='loginButton'>
                    {!!login_token ? (
                        <NavItem>
                            <NavLink tag={Link} to='/' onClick={intuitLogout}>
                                Sign out
                            </NavLink>
                        </NavItem>
                    ) : loginLoading ? (
                        <Spinner color='primary' size='lg' />
                    ) : (
                        <NavItem>
                            <NavLink>
                                <SignIn onClick={intuitLogin} />
                            </NavLink>
                            <Popover placement='bottom' isOpen={!!loginError} target='loginButton'>
                                <PopoverHeader>Login Error</PopoverHeader>
                                <PopoverBody>{loginError}</PopoverBody>
                            </Popover>
                        </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavBarComponent;
