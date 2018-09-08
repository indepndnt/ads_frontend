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
    idProvider;
    googleUserInstance;

    constructor(context) {
        this.context = context;
        this._userData = {first_name: '', last_name: '', email: '', groups: []};
        this.logout = this.logout.bind(this);
        this.intuitSignIn = this.intuitSignIn.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
    }

    set userData(data) {
        for (const [key, value] of Object.entries(data)) {
            this._userData[key] = value
        }
    }

    get groups() {
        return this._userData.groups;
    }

    get firstName() {
        return this._userData.first_name;
    }

    get lastName() {
        return this._userData.last_name;
    }

    get email() {
        return this._userData.email;
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
                this.context.setupVisitor(this);
            },
            success: function (data, textStatus, jqXHR) {
                console.log('success - data:', data, 'textStatus:', textStatus, 'jqXHR:', jqXHR);
                this.context.setupVisitor(this);
            }
        });

        if (this.idProvider === 'google') {
            this.googleUserInstance.disconnect();
        } else if (this.idProvider === 'intuit') {
            console.log('log out from intuit how?')
        }
        this.idProvider = '';
        return false;
    }

    intuitSignIn() {
        this.idProvider = 'intuit';
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
        this.idProvider = 'google';
        const auth2 = gapi.auth2.getAuthInstance();
        this.googleUserInstance = auth2.currentUser.get();
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

    constructor() {
        super();
        this.setupVisitor = this.setupVisitor.bind(this);
        this.setupUser = this.setupUser.bind(this);
        this.checkForLoggedInUser = this.checkForLoggedInUser.bind(this);
    }

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
        const afterGoogleInit = this.checkForLoggedInUser;
        if (script.getAttribute('gapi_processed')) {
            gapi.load('auth2', function () {
                gapi.auth2.init({
                    client_id: '444058961244-j1ceheocuu09gfllsr0omgle5963n32i.apps.googleusercontent.com',
                    // Scopes to request in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
                }).then(auth2 => afterGoogleInit(auth2));
            });
        } else { setTimeout(() => {this.gapiLoadWhenReady(script)}, 100) }
    }

    googleSignIn(user) {
        const setupUser = this.setupUser;
        user.googleSignIn();
        $.ajax({
            context: this,
            type: 'POST',
            url: '/api/session',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {token: user.googleUserInstance.getAuthResponse().id_token},
            success: function (userData) {
                user.userData = userData;
                setupUser(user);
            },
        });
    }

    checkForLoggedInUser(googleAuthInstance) {
        // Google API has successfully instantiated here
        const user = new User(this);
        const setupUser = this.setupUser;
        const setupVisitor = this.setupVisitor;

        if (googleAuthInstance.isSignedIn.get()) {
            this.googleSignIn(user);
        } else {
            $.ajax({
                context: this,
                type: 'GET',
                url: '/api/session',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                success: function (userData) {
                    user.idProvider = 'intuit';
                    user.userData = userData;
                    setupUser(user);
                },
                error: function () {
                    setupVisitor(user);
                },
            });
        }
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
        this.setHeader('welcome');
    }

    setupVisitor(user) {
        // Organize the page according to when no one is logged on.
        const publicLinks = ["public1", "public2", "public3", "visitor"];
        const navLinks = this.state.navLinks.map(l => {
            l.enabled = publicLinks.includes(l.id);
            l.user = user;
            return l;
        });
        this.setState({navLinks});

        // Render the Google Sign-In button
        const signIn = this.googleSignIn.bind(this);
        gapi.signin2.render('signin2', {
            'scope': 'profile email',
            'width': '100px',
            'height': '26px',
            'theme': 'dark',
            'onsuccess': () => {signIn(new User(this))},
            // 'onfailure': () => {}
        });
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