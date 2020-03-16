import React, {useState} from 'react';
import {Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import Header from '../components/Header';
import SignIn from '../components/IntuitSignIn';
import Company from './AppCompany';
import Results from './AppResults';
import Settings from './AppSettings';
import Upload from './AppUpload';

const App = props => {
    const {intuitRefreshUserInfo, loadingUserInfo, loadedUserInfo, userInfoError, intuitLogin} = props;
    const [activeTab, setActiveTab] = useState('App');
    const tabs = ['App', 'Settings'];
    const live = !!props.login_token;

    if (!live) {
        return (
            <Container>
                <Header>Invoice Logistics App</Header>
                <Row>
                    <Col>
                        <p>You are not signed in. You must sign in with Intuit to access the app.</p>
                        <SignIn onClick={intuitLogin} />
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!loadedUserInfo && !loadingUserInfo) {
        intuitRefreshUserInfo();
    }

    return (
        <Container>
            <Header>Invoice Logistics App</Header>
            <Nav tabs>
                {tabs.map(tab => (
                    <NavItem key={tab}>
                        <NavLink
                            className={classnames({active: activeTab === tab})}
                            tag='div'
                            onClick={() => {
                                if (activeTab !== tab) setActiveTab(tab);
                            }}>
                            {tab}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId={tabs[0]}>
                    {!!userInfoError ? (
                        <p className='text-danger'>There was a problem loading your app data. "{userInfoError}"</p>
                    ) : null}
                    <Company {...props} />
                    <Upload {...props} />
                    <Results {...props} />
                </TabPane>
                <TabPane tabId={tabs[1]}>
                    <Settings {...props} />
                </TabPane>
            </TabContent>
        </Container>
    );
};

export default App;
