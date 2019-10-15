import React, {Component} from "react";
/*global AbortController*/

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            id: '',
            email: '',
            created: '',
            groups: [],
            allGroups: {},
            accountList: [],
            error: false
        };
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.getUserList = this.getUserList.bind(this);
        this.onUserClick = this.onUserClick.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    componentDidMount() {
        this.getUserList();
    }

    getUserList(event) {
        if (event !== undefined) {event.preventDefault()}
        fetch('/api/admin/users?query=' + this.state.query + '&userId=' + this.state.id, {
            method: 'GET',
            credentials: "same-origin",
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    onUserClick(event, userId) {
        event.preventDefault();
        fetch('/api/admin/users?userId=' + userId, {
            method: 'GET',
            credentials: "same-origin",
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    onButtonClick(event) {
        event.preventDefault();
        let method = '';
        let data = {};
        if (event.target.value === 'update') {
            method = 'PUT';
            data.userId = this.state.id;
            data.email = this.state.email;
            data.groups = this.state.groups;
        } else if (event.target.value === 'delete') {
            method = 'DELETE';
            data.userId = this.state.id;
        } else {return}
        fetch('/api/admin/users', {
            method: method,
            credentials: "same-origin",
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    handleCheckbox(event) {
        let updatedGroups = this.state.groups;
        if (event.target.checked) {
            updatedGroups.push(event.target.name);
        } else {
            updatedGroups = updatedGroups.filter(item => item !== event.target.name)
        }
        this.setState({groups: updatedGroups})
    }

    handleInput(event) {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        const {allGroups, groups, accountList} = this.state;
        return (
            <React.Fragment>
                <form className="w-100">
                    <div className="row">
                        <div className="col-6">
                            <h1>Edit Account</h1>

                            {this.state.error ?
                                <div className="error-msg">Error: {this.state.error}</div> : ""}

                            <div className="form-group row">
                                <label htmlFor="email" className="col-2 col-form-label">Account email:</label>
                                <div className="col-10">
                                    <input name="email" id="email" required type="email" value={this.state.email}
                                           onChange={this.handleInput} className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="created" className="col-2 col-form-label">Created:</label>
                                <div className="col-10">
                                    <input name="created" id="created" value={this.state.created}
                                           className="form-control-plaintext"/>
                                </div>
                            </div>
                            <input name="user_id" id="user_id" type="hidden" value={this.state.id}/>
                        </div>
                        <div className="col-6">
                            <br/>
                            <h4>Groups:</h4>
                            <div className="form-group row">
                                <div className="col-8">
                                    {Object.keys(allGroups).map((group) =>
                                        <div key={group} className="form-check">
                                            <input type="checkbox" checked={groups.includes(group)}
                                                   onChange={this.handleCheckbox} name={group} id={group}
                                                   className="form-check-input"/>
                                            <label htmlFor={group} className="form-check-label">
                                                {allGroups[group].name}
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-success" onClick={this.onButtonClick}
                                            value="update">Update
                                    </button>
                                    <button className="btn btn-danger" onClick={this.onButtonClick}
                                            value="delete">Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <hr/>
                <div className="row">
                    <div className="col">
                        <h4>Select Account</h4>
                        <form className="form-inline">
                            <label htmlFor="query">
                                <input name="query" id="query" onChange={this.handleInput} value={this.state.query}/>
                            </label>
                            <button className="btn btn-default" onClick={this.getUserList}>Filter</button>
                        </form>
                        <ul>
                            {accountList.map((acct) => {
                                return (
                                    <li key={acct[1]}>
                                        <button onClick={(e) => this.onUserClick(e, acct[1])}>{acct[0]}</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}