import React, { Component } from 'react';

import Tab from './Tab';

export default class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };
        this.onClickTabItem = this.onClickTabItem.bind(this);
    }

    onClickTabItem(tab) {
        this.setState({ activeTab: tab });
    };

    render() {
        return (
            <div className="tabs">
                <ul className="nav nav-tabs">
                    {this.props.children.map((child) => {
                        return (
                            <Tab
                                activeTab={this.state.activeTab}
                                key={child.props.label}
                                label={child.props.label}
                                onClick={this.onClickTabItem}
                            />
                        );
                    })}
                </ul>
                <div className="tab-content">
                    {this.props.children.map((child) => {
                        return (child.props.label === this.state.activeTab)? child : undefined;
                    })}
                </div>
            </div>
        );
    }
}
