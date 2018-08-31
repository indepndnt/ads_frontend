import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';
import NavBar from './components/navbar';
import Header from './components/header';
import Section from "./components/section";
import MailingList from "./components/mailingList"
import Footer from './components/footer';
/* global gapi */

export default class App extends Component {
    state = {
        navLinks: [
            {id: "public1", text: "Service", link: "/projects", enabled: false},           /* projects gallery */
            {id: "home_finance", text: "Finance", link: "/home/finances", enabled: false}, /* Service : Home finance */
            {id: "brainchild", text: "Brainchild", link: "/brainchild", enabled: false},   /* Service : Brainchild */
            {id: "quickbooks", text: "QBO", link: "/qbo", enabled: false},                 /* Service : qb */
            {id: "public2", text: "Essays", link: "/essays", enabled: false},              /* Essays */
            {id: "public3", text: "About", link: "/home/about", enabled: false},           /* About / Contact */
            {id: "admin", text: "Admin", link: "/admin", enabled: false},                  /* Admin */
            {id: "user", text: "Account", link: "/account", enabled: false},               /* Account Profile */
            {id: "visitor", text: "Sign In", link: "signin", enabled: false},              /* Sign in */
            {id: "sign_out", text: "Sign Out", link: "signout", enabled: false},           /* Sign out */
        ],
    };
    componentWillMount() {
        // Import Google's authentication API
        const script = document.createElement("script");
        script.onload = () => {
            this.gapiLoadWhenReady(script)
        };
        script.src = "https://apis.google.com/js/platform.js";
        document.body.appendChild(script);
    }
    gapiLoadWhenReady(script) {
        // Load the auth2 instance
        const boundGoogleInit = this.googleInit.bind(this);
        if (script.getAttribute('gapi_processed')) {
            gapi.load('auth2', function () {
                gapi.auth2.init({
                    client_id: '444058961244-j1ceheocuu09gfllsr0omgle5963n32i.apps.googleusercontent.com',
                    // Scopes to request in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
                }).then(auth => boundGoogleInit(auth));
            });
        } else { setTimeout(() => {this.gapiLoadWhenReady(script)}, 100) }
    }
    googleInit(auth2) {
        // Google API has successfully instantiated here
        const signedIn = auth2.isSignedIn.get();
        if (signedIn) {this.setUser()} else {this.setVisitor()}
    }
    renderGoogleButton() {
        // Render the Google Sign-In button and bind it to the setUser method
        const boundSetUser = this.setUser.bind(this);
        gapi.signin2.render('signin2', {
            'scope': 'profile email',
            'width': '100px',
            'height': '26px',
            'theme': 'dark',
            'onsuccess': () => {boundSetUser()},
            // 'onfailure': () => {}
        });
    }

    setVisitor() {
        // Organize the page according to when no one is logged on.
        const publicLinks = ["public1", "public2", "public3", "visitor"];
        const navLinks = this.state.navLinks.map(l => {
            l.enabled = publicLinks.includes(l.id);
            return l;
        });
        this.setState({navLinks});

        this.renderGoogleButton();
        this.addHeader();
        this.addSections();
    }

    setUser() {
        // Organize the page according to the user who has logged in
        const auth2 = gapi.auth2.getAuthInstance();
        const user = auth2.currentUser.get();
        console.log(user.getBasicProfile().getName());

        let userLinks = ["public1", "public2", "sign_out"];

        $.ajax({
            type: 'POST',
            url: '/api/session',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            success: function (user) {
                setLinks(user.groups)
                /* set default function on page */
            },
            data: {token: user.getAuthResponse().id_token}
        });

        const setLinks = (function (groups) {
            userLinks = userLinks.concat(groups);
            const navLinks = this.state.navLinks.map(l => {
                l.enabled = userLinks.includes(l.id);
                l.user = user;
                return l;
            });
            this.setState({navLinks});
        }).bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <NavBar links={this.state.navLinks.filter(l => l.enabled)}/>
                {this.state.header}
                {this.state.sections}
                <Footer/>
            </React.Fragment>
        )
    }

    addHeader() {
        const header = <Header />;
        this.setState({header});
    }

    addSections() {
        const sections = (
            <React.Fragment>
                <Section key="1" image="01.jpg" swap="true" heading="Robotic Process Automation as a Service (RPAaaS)"
                         text=""/>
                <Section key="2" image="02.jpg" swap="false"
                         heading="Let Robotic Process Automation return your time to you!" text=""/>
                <Section key="3" image="03.jpg" swap="true"
                         heading="Get back to what you started out to do, while accounting takes care of itself"
                         text=""/>
                <MailingList />
            </React.Fragment>
        );
        this.setState({sections})
    }
}