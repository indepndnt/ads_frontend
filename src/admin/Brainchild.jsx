import React, {Component} from "react";
import TaskList from './tasks';
// import Modal from 'react-bootstrap4-modal';

export default class Brainchild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStatus: false,
            statusMessage: '',
        };
        this.handleTask = this.handleTask.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleTask(event, task) {
        event.preventDefault();
        fetch('/api/brainchild/order', {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                task: task,
            }),
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
                <TaskList taskHandler={this.handleTask}/>
                {/*<Modal visible={this.state.showStatus} onClickBackdrop={this.closeModal}*/}
                {/*       dialogClassName="modal-dialog-centered">*/}
                    <div className="modal-header">
                        <h5 className="modal-title">Task Run</h5>
                    </div>
                    <div className="modal-body">
                        <p>{this.state.statusMessage}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.closeModal}>OK</button>
                    </div>
            </React.Fragment>
        )
    }
}