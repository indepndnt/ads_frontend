import React, {Component} from 'react';
import "./App.css";
import $ from "jquery";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Visitor from "./components/home/visitor";
import UserPage from "./components/home/user";
import Service from "./components/service/service"
import About from "./components/home/about"

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

    googleSignIn(setupUser) {
        this.idProvider = 'google';
        const auth2 = gapi.auth2.getAuthInstance();
        this.googleUserInstance = auth2.currentUser.get();
        $.ajax({
            context: this,
            type: 'POST',
            url: '/api/session',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {token: this.googleUserInstance.getAuthResponse().id_token},
            success: function (userData) {
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                this.userData = userData;
                setupUser(this);
            },
        });
    }
}

export default class App extends Component {
    state = {
        navLinks: [
            {id: "public1", text: "Service", link: "service", enabled: false}, /* projects gallery */
            {id: "home_finance", text: "Finance", link: "/home/finances", enabled: false}, /* Service : Home finance */
            {id: "brainchild", text: "Brainchild", link: "/brainchild", enabled: false}, /* Service : Brainchild */
            {id: "quickbooks", text: "QBO", link: "/qbo", enabled: false}, /* Service : qb */
            {id: "public2", text: "Essays", link: "essays", enabled: false}, /* Essays */
            {id: "public3", text: "About", link: "about", enabled: false}, /* About / Contact */
            {id: "admin", text: "Admin", link: "/admin", enabled: false}, /* Admin */
            {id: "user", text: "Account", link: "/account", enabled: false}, /* Account Profile */
            {id: "visitor", text: "Sign In", link: "signin", enabled: false}, /* Sign in */
            {id: "sign_out", text: "Sign Out", link: "signout", enabled: false}, /* Sign out */
        ],
    };

    constructor() {
        super();
        this.state.user = new User(this);
        this.setupVisitor = this.setupVisitor.bind(this);
        this.setupUser = this.setupUser.bind(this);
        this.checkForLoggedInUser = this.checkForLoggedInUser.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
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
        } else {
            setTimeout(() => {
                this.gapiLoadWhenReady(script)
            }, 100)
        }
    }

    googleSignIn() {
        this.state.user.googleSignIn(this.setupUser);
    }

    checkForLoggedInUser(googleAuthInstance) {
        // Google API has successfully instantiated here
        const user = this.state.user;
        const setupUser = this.setupUser;
        const setupVisitor = this.setupVisitor;

        if (googleAuthInstance.isSignedIn.get()) {
            this.googleSignIn();
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
            return l;
        });
        this.setState({
            navLinks: navLinks,
            page: <UserPage/>,
            user: user,
        });
        /* set default function on page */
    }

    setupVisitor(user) {
        // Organize the page according to when no one is logged on.
        const publicLinks = ["public1", "public2", "public3", "visitor"];
        const navLinks = this.state.navLinks.map(l => {
            l.enabled = publicLinks.includes(l.id);
            return l;
        });

        this.setState({
            navLinks: navLinks,
            page: <Visitor/>,
            user: user,
        });

        // Render the Google Sign-In button
        if ($('#googleSignIn')) {
            gapi.signin2.render('googleSignIn', {
                'scope': 'profile email',
                'width': 100,
                'height': 26,
                'theme': 'dark',
                'onsuccess': this.googleSignIn,
                // 'onfailure': () => {}
            });
        }
    }

    navigateTo(event, link) {
        event.preventDefault();
        switch (link) {
            case "home":
                if (this.state.user.idProvider) {
                    this.setupUser(this.state.user)
                } else {
                    this.setupVisitor(this.state.user)
                }
                break;
            case "service":
                this.setState({page: <Service/>});
                break;
            case "essays":
                window.location = '/essays';
                break;
            case "about":
                this.setState({page: <About/>});
                break;
            default:
                window.location = link;
                break;
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBar links={this.state.navLinks.filter(l => l.enabled)}
                        onLink={this.navigateTo}
                        user={this.state.user}/>
                {this.state.page}
                <Footer/>
            </React.Fragment>
        )
    }
}