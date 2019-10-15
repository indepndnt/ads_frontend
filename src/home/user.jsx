import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Header from "../base/Header";

export default class UserPage extends Component {
    render() {
        const createDate = this.props.user.createDate;
        const groups = this.props.user.groups;
        return (
            <React.Fragment>
                <Header heading="Your Account" />
                <div className="container">
                    <p>Thank you for being a valued member since {createDate}</p>
                    <p>You are assigned to the following groups:</p>
                    <ul>
                        {groups.map(g => <li key={g.id}>
                            <Link to={g.url}>{g.name}</Link>
                            </li>)}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}