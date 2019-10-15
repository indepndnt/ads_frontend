import React, {Component} from 'react';
import {connect} from "react-redux";
import * as action from "./store/actions/creators";
import User from "./user/User"
import "./App.css";
import NavBar from "./base/NavBar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Footer from "./base/Footer";
import Visitor from "./home/visitor";
import EULA from "./home/EULA";
import PrivacyPolicy from "./home/PrivacyPolicy";
import UserPage from "./home/user";
import Contact from "./home/contact";
import ThankYou from "./home/thankyou";
import Finance from "./finance/Finance";
import Admin from "./admin/Admin";
import Brainchild from "./brainchild/Brainchild";

class App extends Component {
    state = {
        navLinks: [
            {id: "home_finance", text: "Finance", link: "finance", enabled: false}, /* Service : Home finance */
            {id: "brainchild", text: "Brainchild", link: "brainchild", enabled: false}, /* Service : Brainchild */
            {id: "admin", text: "Admin", link: "admin", enabled: false}, /* Admin */
            {id: "user", text: "Account", link: "account", enabled: false}, /* Account Profile */
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
        let userLinks = this.state.user.groups.map(g => g.id);
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
        const publicLinks = ["visitor"];
        const navLinks = this.state.navLinks.map(l => {
            l.enabled = publicLinks.includes(l.id);
            return l;
        });
        console.log("Visitor message: " + message);

        this.setState({
            navLinks: navLinks,
            page: <Visitor/>,
        });

        // Render the Google Sign-In button
        if (this.refGoogleSignInButton.current) {
            this.state.user.renderButton();
        }
    }

    handleLogin = () => {
        // TODO: handle intuit login
    };

    render() {
        return (
            <Router>
                <React.Fragment>
                    <NavBar links={this.state.navLinks.filter(l => l.enabled)}
                            handleLogin={this.handleLogin} user={this.state.user}/>
                    <Switch>
                        <Route path='/' exact component={Visitor}/>
                        <Route path='/finance' render={() => <Finance googleRef={this.refGoogleSignInButton}/>}/>
                        <Route path='/brainchild' component={Brainchild}/>
                        <Route path='/admin' component={Admin}/>
                        <Route path='/account' render={() => <UserPage user={this.state.user}/>}/>

                        <Route path='/intuit_callback'/>
                        <Route path='/launch'/>
                        <Route path='/get_app'/>
                        <Route path='/disconnect'/>
                        <Route path='/end-user-license-agreement' component={EULA}/>
                        <Route path='/privacy-policy' component={PrivacyPolicy}/>
                        <Route path='/contact' component={Contact}/>
                        <Route path='/thankyou' component={ThankYou}/>
                    </Switch>
                    <Footer/>
                </React.Fragment>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        value: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: dispatch(action.doAction())
    }
};

const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default VisibleApp;