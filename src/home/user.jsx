import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Header from "../base/Header";

export default class UserPage extends Component {
    render() {
        const email = this.props.user.email;
        const createDate = this.props.user.createDate;
        const groups = this.props.user.groups;
        return (
            <React.Fragment>
                <Header
                    heading={<h2 className="masthead-heading mb-0">
                        <small>Your Account</small>
                    </h2>}
                    tagLine={<p>Your email address is {email}</p>}
                />
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