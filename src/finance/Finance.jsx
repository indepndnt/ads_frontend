import React, { Component } from "react";
import FedLoan from "./FedLoan";
import Header from "../components/Header";
import User from "../user/User";

export default class Finance extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      section: false,
      runButtonDisabled: false,
      user: new User(this, props.setupUser, props.setupVisitor)
    };
  }

  componentDidMount() {
    // Import Google's authentication API
    const script = document.createElement("script");
    script.onload = () => {
      this.state.user.gapiLoadWhenReady(script);
    };
    script.src = "https://apis.google.com/js/platform.js";
    document.body.appendChild(script);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Render the Google Sign-In button
    if (this.ref.current) {
      this.state.user.renderButton();
    }
  }

  setFedLoanPage = event => {
    event.preventDefault();
    this.setState({ section: <FedLoan /> });
  };

  runFedLoanTask = event => {
    event.preventDefault();
    this.setState({ runButtonDisabled: true });
    fetch("/api/finance/fedloan", {
      method: "POST",
      credentials: "same-origin"
    }).then(response => {
      if (response.status !== 201) {
        console.log(response);
        this.setState({ runButtonDisabled: false });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header>Finance</Header>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="card m-2 w-100">
                <div className="card-header">Menu</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div
                      className="nav-signin"
                      id="googleSignIn"
                      ref={this.ref}
                    />
                  </li>
                  <li className="list-group-item">
                    <button onClick={this.setFedLoanPage}>
                      View Fedloan Summary
                    </button>
                  </li>
                  <li className="list-group-item">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={this.runFedLoanTask}
                      disabled={this.state.runButtonDisabled}
                    >
                      Run Fedloan Task
                    </button>
                  </li>
                </ul>
              </div>
              {/*<div className="card m-2 w-100">*/}
              {/*<div className="card-header">Upload</div>*/}
              {/*<div className="card-body">*/}
              {/*<form action="/home/ofx" method="POST" encType="multipart/form-data">*/}
              {/*<div className="box">*/}
              {/*<div className="form-group">*/}
              {/*<label htmlFor="ofxfile">OFX File</label>*/}
              {/*<input className="form-control" type="file" value="" name="ofxfile"*/}
              {/*id="ofxfile"/>*/}
              {/*<label htmlFor="finame">Bank Name</label>*/}
              {/*<input className="form-control" type="text" value="Citi" name="finame"*/}
              {/*id="finame"/>*/}
              {/*</div>*/}
              {/*<button type="submit" className="btn btn-primary form-group">Upload</button>*/}
              {/*</div>*/}
              {/*</form>*/}
              {/*</div>*/}
              {/*</div>*/}
            </div>
            <div className="col-8">
              <div className="row">
                <div className="card m-2 w-100">{this.state.section}</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
