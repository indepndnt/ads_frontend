import React, {useState} from 'react';
import {Container, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import Header from '../components/Header';
import classnames from 'classnames';

const Jobs = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <Container>
            <Header>Jobs at Accounting Data Solutions</Header>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '1'})}
                        onClick={() => {
                            toggle('1');
                        }}>
                        Listing
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '2'})}
                        onClick={() => {
                            toggle('2');
                        }}>
                        Typical Stack
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                <div className="section" id="id1">
                    <h2>Remote Full Stack Team Lead</h2>
                    <h4>The Role</h4>
                    <ul>
                        <li>Part-Time - up to 10 flexible hours per week</li>
                        <li>Develop plans and manage the company’s portfolio of projects</li>
                        <li>Design automated test scenarios that improve deployment confidence</li>
                        <li>Develop features, including development, testing, deployment, and post-deployment
                            analysis</li>
                        <li>Promote proper software development practices throughout the team</li>
                    </ul>
                    <h4>Your Experience & Skills</h4>
                    <ul>
                        <li>Experience building web applications from scratch in a production environment</li>
                        <li>Interested in the organizing aspect of a Project Manager type role</li>
                        <li>Passion for both client-side and server-side development</li>
                        <li>Team player, strong communication skills, empathy, and someone who thrives working
                            remotely</li>
                        <li>Passionate about building great user experiences, with a keen eye for details, UX, and
                            design</li>
                        <li>Understands the full lifecycle of software development, including version control, code
                            review, testing, continuous integration, logging, documentation, and debugging</li>
                        <li>Able to work productively on a geographically distributed team</li>
                    </ul>
                    <h4>About the Company</h4>
                    <p>Accounting Data Solutions' mission is to enable small businesses to tap into enterprise-class
                        automated accounting and data integration functionality without an enterprise-class budget.</p>
                    <p>The company started as a one person "side gig" in 2016 and has grown its project portfolio over
                        time to include a handful of business data automation services as well as one exciting foray
                        into computer vision.</p>
                    <h4>Contact Us</h4>
                    <p>Please submit your resume to <a href="mailto:joe@accountingdatasolutions.com">Joe</a>.</p>
                </div>
                </TabPane>
                <TabPane tabId='2'>
                    <h2>Typical Project Stack</h2>
                    <h4>Backend</h4>
                    <ul>
                        <li>Business Logic: Python 3.6+</li>
                        <li>Database: Postgres, SQLalchemy</li>
                        <li>API: FastAPI (Starlette/Pedantic)</li>
                        <li>Testing: PyTest</li>
                    </ul>
                    <h4>Frontend</h4>
                    <ul>
                        <li>React, Redux, Typescript</li>
                        <li>Semantic UI</li>
                    </ul>
                    <h4>CI/CD</h4>
                    <ul>
                        <li>CI: CircleCI</li>
                        <li>CD: Ansible</li>
                        <li>Hosting: DigitalOcean</li>
                        <li>Monitoring: Rollbar</li>
                    </ul>
                </TabPane>
            </TabContent>
        </Container>
    )
};

export default Jobs;