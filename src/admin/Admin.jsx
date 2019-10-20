import React, {useState} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import Header from '../components/Header';
import Status from './Status';
import Brainchild from './Brainchild';
import Users from './Users';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <React.Fragment>
            <Header>Site Maintenance</Header>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '1'})}
                        onClick={() => {
                            toggle('1');
                        }}>
                        Workers
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '2'})}
                        onClick={() => {
                            toggle('2');
                        }}>
                        Users
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '3'})}
                        onClick={() => {
                            toggle('3');
                        }}>
                        Brainchild
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <Status label='Workers' />
                </TabPane>
                <TabPane tabId='2'>
                    <Users label='Users' />
                </TabPane>
                <TabPane tabId='3'>
                    <Brainchild label='Brainchild' />
                </TabPane>
            </TabContent>
        </React.Fragment>
    );
};

export default Admin;
