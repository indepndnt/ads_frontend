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
import RequestQuote from './content/RequestQuote';
import Jobs from './content/Jobs';
import Contact from './content/Contact';

import GetApp from './invoice_app/GetApp';
import Callback from './invoice_app/IntuitCallback';
import Launch from './invoice_app/Launch';
import Disconnect from './invoice_app/Disconnect';
import InvoiceApp from './invoice_app/App';

import Admin from './admin/Admin';
import Brainchild from './brainchild/Brainchild';
import Finance from './finance/Finance';

class App extends React.Component {
    // TODO: add a timer to renew login token if there's an expires_at
    componentDidUpdate(prevProps, prevState, snapshot) {
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
                <Route path='/jobs' component={Jobs} />

                <Route path='/app' render={() => <InvoiceApp {...this.props} />} />
                <Route path='/launch' render={() => <Launch {...this.props} />} />
                <Route path='/disconnect' render={() => <Disconnect {...this.props} />} />
                <Route path='/intuit-callback' render={() => <Callback {...this.props} />} />
                <Route path='/get-app' render={() => <GetApp {...this.props} />} />
                <Route path='/end-user-license-agreement' component={EULA} />
                <Route path='/privacy-policy' component={PrivacyPolicy} />
                <Route path='/quote' render={() => <RequestQuote {...this.props} />} />
                <Route path='/contact' render={() => <Contact {...this.props} />} />
            </Branding>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.session,
        ...state.user,
    };
};

const mapActionsToProps = {
    ...oldapi,
    ...api,
    ...action,
};

const VisibleApp = connect(mapStateToProps, mapActionsToProps)(App);
export default VisibleApp;
