import React from 'react';
import logo from '../components/img/ads_logo_web.png'
import Link from './navlink'
import SignIn from './SignInLinks';

const ForwardingNavBar = NavBarComponent => {
    const forwardRef = (props, ref) => {
        return <NavBarComponent forwardRef={ref} {...props}/>;
    };
    return React.forwardRef(forwardRef)
};

const StatelessNavBar = ({forwardRef, children, ...props}) => (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <div className="container">
            <a className="navbar-brand" href="" onClick={(event) => this.onLink(event, "home")}>
                <img src={logo} alt="Accounting Data Solutions"/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    {props.links.map(link => (link.link === 'signin' ?
                        <SignIn key={link.id} user={props.user} ref={forwardRef}/> :
                        <Link key={link.id} link={link.link} text={link.text} user={props.user}
                              onLink={this.onLink}/>))
                    }
                </ul>
            </div>
        </div>
    </nav>
);

const NavBar = ForwardingNavBar(StatelessNavBar);

export default NavBar;