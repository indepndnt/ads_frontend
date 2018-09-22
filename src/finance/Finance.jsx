import React, {Component} from "react";
import FedLoan from "./FedLoan";

export default class Finance extends Component {
    constructor(props) {
        super(props);
        this.state = {section: false, runButtonDisabled: false};
        this.setFedLoanPage = this.setFedLoanPage.bind(this);
        this.runFedLoanTask = this.runFedLoanTask.bind(this);
    }

    setFedLoanPage(event) {
        event.preventDefault();
        this.setState({section: <FedLoan/>});
    }

    runFedLoanTask(event) {
        event.preventDefault();
        this.setState({runButtonDisabled: true});
        fetch('/api/finance/fedloan', {
            method: 'POST',
            credentials: "same-origin",
        })
            .then(response => {
                if (response.status !== 201) {
                    console.log(response);
                    this.setState({runButtonDisabled: false});
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <header className="masthead text-center text-white pb-3 pt-5">
                    <div className="masthead-content pt-5">
                        <h2>Finances</h2>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="card m-2 w-100">
                                <div className="card-header">Menu</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <a href="" onClick={this.setFedLoanPage}>View Fedloan Summary</a></li>
                                    <li className="list-group-item">
                                        <button className="btn btn-sm btn-primary" onClick={this.runFedLoanTask}
                                                disabled={this.state.runButtonDisabled}>Run Fedloan Task</button></li>
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
                                <div className="card m-2 w-100">
                                    {this.state.section}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}