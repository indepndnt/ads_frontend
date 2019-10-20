import React from 'react';
import {connect} from 'react-redux';
import * as action from './store/actions/creators';
import * as api from './store/actions/apiV1';
import * as oldapi from './store/actions/apiLegacy';

import {Route} from 'react-router-dom';
import Branding from './components/Branding';

import Landing from './content/Landing';
import EULA from './content/EULA';
import PrivacyPolicy from './content/PrivacyPolicy';
import Contact from './content/Contact';

import GetApp from './invoice_app/GetApp';
import Callback from './invoice_app/IntuitCallback';
import Launch from './invoice_app/Launch';
import Disconnect from './invoice_app/Disconnect';
import InvoiceApp from './invoice_app/App';

import Finance from './finance/Finance';
import Admin from './admin/Admin';
import Brainchild from './brainchild/Brainchild';

class App extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        // remember user's login when it is received
        if (!prevProps.receivedToken && this.props.receivedToken === true) {
            localStorage.setItem('token', this.props.login_token);
            localStorage.setItem('expires_at', this.props.expires_at);
            this.props.completeLogin();
        }
        // when an external redirect is set (e.g. to Intuit for login)
        if (!prevProps.redirect && !!this.props.redirect) {
            window.location = this.props.redirect;
        }
    }

    render() {
        return (
            <Branding {...this.props}>
                <Route path='/' exact component={Landing} />
                <Route path='/finance' component={Finance} />
                <Route path='/brainchild' component={Brainchild} />
                <Route path='/admin' component={Admin} />

                <Route path='/app' render={() => <InvoiceApp {...this.props} />} />
                <Route path='/launch' render={() => <Launch {...this.props} />} />
                <Route path='/disconnect' render={() => <Disconnect {...this.props} />} />
                <Route path='/intuit-callback' render={() => <Callback {...this.props} />} />
                <Route path='/get-app' render={() => <GetApp {...this.props} />} />
                <Route path='/end-user-license-agreement' component={EULA} />
                <Route path='/privacy-policy' component={PrivacyPolicy} />
                <Route path='/contact' render={() => <Contact {...this.props} />} />
            </Branding>
        );
    }
}

const mapStateToProps = state => {
    return {...state.session};
};

const mapActionsToProps = {
    contactSubmit: oldapi.submitContact,

    intuitLogin: api.intuitLogin,
    intuitGetApp: api.intuitGetApp,
    intuitCallback: api.intuitCallback,
    intuitDisconnect: api.intuitDisconnect,
    intuitGetCompanyInfo: api.intuitGetCompanyInfo,
    intuitUploadInvoices: api.intuitUploadInvoices,

    completeLogin: action.completeLogin,
    reconstituteTokens: action.reconstituteTokens,
    intuitLogout: action.intuitLogout,
};

const VisibleApp = connect(
    mapStateToProps,
    mapActionsToProps
)(App);
export default VisibleApp;
