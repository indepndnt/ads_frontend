import React, {useState} from 'react';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import Header from '../components/Header';
import Company from './AppCompany';
import Results from './AppResults';
import Settings from './AppSettings';
import Upload from './AppUpload';

const App = props => {
    const {intuitRefreshUserInfo, loadingUserInfo, loadedUserInfo, userInfoError} = props;
    const [activeTab, setActiveTab] = useState('App');
    const tabs = ['App', 'Settings'];

    if (!loadedUserInfo && !loadingUserInfo) {
        intuitRefreshUserInfo();
    }

    const Tab = props => {
        const {name} = props;
        return (
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === name})}
                    tag='div'
                    onClick={() => {
                        if (activeTab !== name) setActiveTab(name);
                    }}>
                    {name}
                </NavLink>
            </NavItem>
        );
    };

    return (
        <Container>
            <Header>Invoice Logistics App</Header>
            <Nav tabs>
                {tabs.map(tab => (
                    <Tab key={tab} name={tab} />
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
