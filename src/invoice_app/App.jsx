import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Spinner} from 'reactstrap';
import classnames from 'classnames';
import Header from '../components/Header';
import Results from './AppResults';
import Settings from './AppSettings';
import Upload from './AppUpload';

const App = props => {
    const [activeTab, setActiveTab] = useState('App');
    const tabs = ['App', 'Settings'];
    const {loadingCompanyInfo, companyInfo, intuitGetCompanyInfo, intuitLogin} = props;
    let company;
    let disable = true;

    const Tab = props => {
        const {key, children} = props;
        return (
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === key})}
                    tag='div'
                    onClick={() => {
                        if (activeTab !== key) {
                            setActiveTab(key);
                        }
                    }}>
                    {children}
                </NavLink>
            </NavItem>
        );
    };

    if (!loadingCompanyInfo && !companyInfo) {
        intuitGetCompanyInfo();
    }
    if (!!companyInfo) {
        if (!!companyInfo.error) {
            company = (
                <div>
                    {companyInfo.error === 'Not authenticated' ? (
                        <p>
                            Not connected &mdash; you must either{' '}
                            <Link to='#' onClick={intuitLogin}>
                                Sign in
                            </Link>{' '}
                            or <Link to='/get_app'>Sign up</Link> to use the app.
                        </p>
                    ) : (
                        <p>Not connected. ({companyInfo.error})</p>
                    )}
                </div>
            );
        } else {
            company = (
                <p>
                    You are connected to <strong>{companyInfo.CompanyName}</strong>.
                </p>
            );
            disable = false;
        }
    } else if (loadingCompanyInfo) {
        company = <Spinner />;
    }

    return (
        <Container>
            <Header>Invoice Logistics App</Header>
            <Nav tabs>
                {tabs.map(tab => (
                    <Tab key={tab}>{tab}</Tab>
                ))}
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId={tabs[0]}>
                    <Row>
                        <Col xs='12'>
                            <hr />
                            <h4>Connection</h4>
                            {company}
                        </Col>
                    </Row>
                    <Upload disable={disable} {...props} />
                    <Results {...props} />
                </TabPane>
                <TabPane tabId={tabs[1]}>
                    <Settings />
                </TabPane>
            </TabContent>
        </Container>
    );
};

export default App;
