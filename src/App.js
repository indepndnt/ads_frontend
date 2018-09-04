import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';
import NavBar from './components/navbar';
import Header from './components/header';
import Section from "./components/section";
import MailingList from "./components/mailingList"
import Footer from './components/footer';
/* global gapi */

class User {
    id_provider;
    google_user_instance;
    intuit_user_instance;
    user_data;
    context;

    get user() {
        if (this.id_provider === 'google') {
            return this.google_user_instance;
        } else if (this.id_provider === 'intuit') {
            return this.intuit_user_instance;
        } else {
            console.log("Error: no identity provider set to get user");
        }
    }

    get groups() {
        return this.user_data.groups;
    }

    get firstName() {
        return this.user_data.first_name;
    }

    get lastName() {
        return this.user_data.last_name;
    }

    get email() {
        return this.user_data.email;
    }

    constructor(context) {
        this.context = context;
        this.logout = this.logout.bind(this);
        this.intuitSignIn = this.intuitSignIn.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.setUserData = this.setUserData.bind(this);
    }

    logout(event) {
        event.preventDefault();
        $.ajax({
            context: this,
            type: 'DELETE',
            url: '/api/session',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('error - xhr:', jqXHR, 'textStatus:', textStatus, 'errorThrown:', errorThrown);
                $.ajax({
                    type: 'DELETE',
                    url: '/api/session',
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                    async: false
                });
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                this.context.setVisitor(this);
            },
            success: function (data, textStatus, jqXHR) {
                console.log('success - data:', data, 'textStatus:', textStatus, 'jqXHR:', jqXHR);
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                this.context.setVisitor(this);
            }
        });

        if (this.id_provider === 'google') {
            this.google_user_instance.disconnect();
        } else if (this.id_provider === 'intuit') {
            console.log('log out from intuit how?')
        }
        this.id_provider = '';
        return false;
    }

    intuitSignIn() {
        this.id_provider = 'intuit';
        $.ajax({
            type: 'POST',
            url: '/api/intuit-sso',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            success: function (url) {
                window.location = url;
            }
        });
    }

    googleSignIn() {
        this.id_provider = 'google';
        const auth2 = gapi.auth2.getAuthInstance();
        this.google_user_instance = auth2.currentUser.get();
    }

    setUserData(data) {
        this.user_data = data;
    }
}


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
        if (signedIn) {this.setGoogleUser()} else {this.intuitInit()}
    }
    renderGoogleButton() {
        // Render the Google Sign-In button and bind it to the setGoogleUser method
        const boundSetUser = this.setGoogleUser.bind(this);
        gapi.signin2.render('signin2', {
            'scope': 'profile email',
            'width': '100px',
            'height': '26px',
            'theme': 'dark',
            'onsuccess': () => {boundSetUser()},
            // 'onfailure': () => {}
        });
    }

    intuitInit() {
        const user = new User(this);
        const setLinks = this.setupUser.bind(this);
        const visit = this.setVisitor.bind(this);
        $.ajax({
            type: 'GET',
            url: '/api/session',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            success: function (userData) {
                user.id_provider = 'intuit';
                user.setUserData(userData);
                setLinks(user);
            },
            error: function () {
                visit(user);
            },
        });
    }

    setGoogleUser() {
        const user = new User(this);
        user.googleSignIn();

        const setLinks = this.setupUser.bind(this);
        $.ajax({
            type: 'POST',
            url: '/api/session',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            success: function (userData) {
                user.setUserData(userData);
                setLinks(user);
            },
            data: {token: user.user.getAuthResponse().id_token}
        });
    }

    setupUser(user) {
        // Organize the page according to the user who has logged in
        let userLinks = ["public1", "public2", "sign_out"];
        userLinks = userLinks.concat(user.groups);
        const navLinks = this.state.navLinks.map(l => {
            l.enabled = userLinks.includes(l.id);
            l.user = user;
            return l;
        });
        this.setState({
            navLinks: navLinks,
            sections: "",
        });
        /* set default function on page */
        console.log(user.id_provider, user.email, user.firstName, user.lastName);
        console.log(user.groups);
        this.setHeader('welcome');
    }

    setVisitor(user) {
        // Organize the page according to when no one is logged on.
        const publicLinks = ["public1", "public2", "public3", "visitor"];
        const navLinks = this.state.navLinks.map(l => {
            l.enabled = publicLinks.includes(l.id);
            l.user = user;
            return l;
        });
        this.setState({navLinks});

        this.renderGoogleButton();
        this.setHeader("visitor");
        this.setSections();
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

    headerValues(index) {
        switch (index) {
            case "welcome":
                return {
                    heading: <h2 className="masthead-heading mb-0">Thank you for joining us!</h2>,
                    tagLine: <p>Your email address has been added to the mailing list, and you will be notified when
                        the app is launched! If you have not already done so, please visit the Kickstarter page by
                        clicking the button below and make a pledge!</p>,
                    button: <a href="https://kck.st/2vZ4FrQ" className="btn btn-primary btn-xl rounded-pill mt-5">
                        Count me in!</a>,
                };
            default:
                return {
                    heading: <h2 className="masthead-heading mb-0">Live shipment tracking right in your QuickBooks
                        Online Invoice</h2>,
                    tagLine: <p>Our goal is to make it easier for small business owners manage their sales and
                        collections. Help us get started by backing the first Kickstarter to add shipment tracking
                        to QuickBooks Online!</p>,
                    button: <a href="https://kck.st/2vZ4FrQ" className="btn btn-primary btn-xl rounded-pill mt-5">Learn
                        More</a>,
                };
        }
    }

    setHeader(index) {
        if (index === null) {
            this.setState({header: ""})
        } else {
            const p = this.headerValues(index);
            this.setState({
                header: <Header heading={p.heading} tagLine={p.tagLine} button={p.button} />
            })
        }
    }

    setSections() {
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