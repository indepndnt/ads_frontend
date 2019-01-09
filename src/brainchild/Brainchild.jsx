import React, {Component} from "react";
import ThinHeader from "../base/ThinHeader";
import Order from './order';
import TaskList from './tasks';
import Modal from 'react-bootstrap4-modal';
/*global AbortController*/

export default class Brainchild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStatus: false,
            statusMessage: '',
            orderDates: [],
        };
        this.refreshQueueInterval = null;
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.setRecentEvents = this.setRecentEvents.bind(this);
        this.handleTask = this.handleTask.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.setRecentEvents();
        // this.refreshQueueInterval = setInterval(this.setQueues, 30000);
    }

    componentWillUnmount() {
        // clearInterval(this.refreshQueueInterval);
        this.controller.abort();
    }

    setRecentEvents() {
        fetch('/api/brainchild/events', {
            method: 'GET',
            credentials: "same-origin",
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => this.setState({orderDates: data}));
    }

    handleTask(event, task) {
        event.preventDefault();
        fetch('/api/brainchild/order', {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                task: task,
            }),
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => this.setState({statusMessage: data.message, showStatus: true}))
    }

    closeModal() {
        this.setState({showStatus: false});
    }

    render() {
        return (
            <React.Fragment>
                <ThinHeader heading="Brainchild"/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            {this.state.orderDates.map(d => <Order key={d} date={d}/>)}
                        </div>
                        <Modal visible={this.state.showStatus} onClickBackdrop={this.closeModal}
                               dialogClassName="modal-dialog-centered">
                            <div className="modal-header">
                                <h5 className="modal-title">Task Run</h5>
                            </div>
                            <div className="modal-body">
                                <p>{this.state.statusMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.closeModal}>OK</button>
                            </div>
                        </Modal>
                        <TaskList taskHandler={this.handleTask}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}