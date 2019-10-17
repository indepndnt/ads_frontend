import React from "react";
import { connect } from "react-redux";
import * as action from "./store/actions/creators";
import * as api from "./store/actions/apiV1";
import * as oldapi from "./store/actions/apiLegacy";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Footer from "./components/Footer";
import Landing from "./content/Landing";
import GetApp from "./invoice_app/GetApp";
import Callback from "./invoice_app/IntuitCallback";
import EULA from "./content/EULA";
import PrivacyPolicy from "./content/PrivacyPolicy";
import Contact from "./content/Contact";
import Finance from "./finance/Finance";
import Admin from "./admin/Admin";
import Brainchild from "./brainchild/Brainchild";

class App extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const dest = this.props.redirect;
    const history = useHistory();
    if (!prevProps.redirect && !!dest) {
      if (dest.slice(0, 4) === "http") window.location = dest;
      else history.push(dest);
    }
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar {...this.props} />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/finance" component={Finance} />
            <Route path="/brainchild" component={Brainchild} />
            <Route path="/admin" component={Admin} />

            <Route path="/launch" />
            <Route path="/disconnect" />
            <Route
              path="/intuit_callback"
              render={() => <Callback {...this.props} />}
            />
            <Route path="/get_app" render={() => <GetApp {...this.props} />} />
            <Route path="/end-user-license-agreement" component={EULA} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/contact" render={() => <Contact {...this.props} />} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.session };
};

const mapActionsToProps = {
  contactSubmit: oldapi.submitContact,
  intuitLogin: api.intuitLogin,
  intuitGetApp: api.intuitGetApp,
  intuitCallback: api.intuitCallback,
  intuitLogout: action.intuitLogout,
};

const VisibleApp = connect(
  mapStateToProps,
  mapActionsToProps
)(App);
export default VisibleApp;
