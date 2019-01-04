import React, {Component} from 'react';
import User from "./user/User"
import "./App.css";
import NavBar from "./base/NavBar";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from "./base/Footer";
import Visitor from "./home/visitor";
import UserPage from "./home/user";
import Service from "./service/service";
import About from "./home/about";
import Finance from "./finance/Finance";
import Admin from "./admin/Admin";
import Brainchild from "./brainchild/Brainchild";
/*global gapi*/ // eslint-disable-line no-unused-vars
import {library} from '@fortawesome/fontawesome-svg-core'
// repeat, remove
import {
    faPlayCircle, faPauseCircle, faSpinner, faHourglass, faQuestionCircle, faTrash, faInbox, faCompress,
    faFile, faRedo
} from '@fortawesome/free-solid-svg-icons'

library.add(faPlayCircle, faPauseCircle, faSpinner, faHourglass, faQuestionCircle, faTrash, faInbox, faCompress,
    faFile, faRedo);

export default class App extends Component {
    state = {
        navLinks: [
            {id: "public1", text: "Service", link: "service", enabled: false}, /* projects gallery */
            {id: "home_finance", text: "Finance", link: "finance", enabled: false}, /* Service : Home finance */
            {id: "brainchild", text: "Brainchild", link: "brainchild", enabled: false}, /* Service : Brainchild */
            // {id: "quickbooks", text: "QBO", link: "/qbo", enabled: false}, /* Service : qb */
            {id: "public2", text: "Essays", link: "essays", enabled: false}, /* Essays */
            {id: "public3", text: "About", link: "about", enabled: false}, /* About / Contact */
            {id: "admin", text: "Admin", link: "admin", enabled: false}, /* Admin */
            {id: "user", text: "Account", link: "account", enabled: false}, /* Account Profile */
            {id: "visitor", text: "Sign In", link: "signin", enabled: false}, /* Sign in */
            {id: "sign_out", text: "Sign Out", link: "signout", enabled: false}, /* Sign out */
        ],
        page: <div/>
    };

    constructor(props) {
        super(props);
        this.setupVisitor = this.setupVisitor.bind(this);
        this.setupUser = this.setupUser.bind(this);
        this.state.user = new User(this, this.setupUser, this.setupVisitor);
        this.refGoogleSignInButton = React.createRef();
    }

    componentDidMount() {
        // Import Google's authentication API
        const script = document.createElement("script");
        script.onload = () => {
            this.state.user.gapiLoadWhenReady(script)
        };
        script.src = "https://apis.google.com/js/platform.js";
        document.body.appendChild(script);
    }

    setupUser() {
        // Organize the page according to the user who has logged in
        let userLinks = ["public1", "public2", "sign_out"];
        userLinks = userLinks.concat(this.state.user.groups.map(g => g.id));
        const navLinks = this.state.navLinks.map(l => {
            l.enabled = userLinks.includes(l.id);
            return l;
        });
        this.setState({
            navLinks: navLinks,
            // page: <Brainchild/>,
            page: <UserPage user={this.state.user}/>,
        });
        /* set default function on page */
    }

    setupVisitor(message) {
        // Organize the page according to when no one is logged on.
        const publicLinks = ["public1", "public2", "public3", "visitor"];
        const navLinks = this.state.navLinks.map(l => {
            l.enabled = publicLinks.includes(l.id);
            return l;
        });

        this.setState({
            navLinks: navLinks,
            page: <Visitor message={message}/>,
        });

        // Render the Google Sign-In button
        if (this.refGoogleSignInButton.current) {
            this.state.user.renderButton();
        }
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <NavBar links={this.state.navLinks.filter(l => l.enabled)}
                            ref={this.refGoogleSignInButton}
                            user={this.state.user}/>
                    <Route path='/' exact render={() => this.state.page}/>
                    <Route path='/service' component={Service}/>
                    <Route path='/finance' component={Finance}/>
                    <Route path='/brainchild' component={Brainchild}/>
                    <Route path='/essays' component={About}/>
                    <Route path='/admin' component={Admin}/>
                    <Route path='/account' render={() => <UserPage user={this.state.user}/>}/>
                    <Route path='/about' component={About}/>
                    <Footer/>
                </React.Fragment>
            </Router>
        )
    }
}
