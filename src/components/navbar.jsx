import React, { Component } from 'react';
import logo from './img/ads_logo_web.png'
import Link from './navlink'

export default class NavBar extends Component {
    render () {
        const onLink = this.props.onLink;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="" onClick={(event) => onLink(event, "home")}>
                        <img src={logo} alt="Accounting Data Solutions"/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            { this.props.links.map(link => (
                                <Link key={link.id} link={link.link} text={link.text} user={this.props.user}
                                      onLink={onLink} />
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

}