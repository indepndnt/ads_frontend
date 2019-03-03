import React, {Component} from "react";
import ThinHeader from "../base/ThinHeader";
import Tabs from "../base/Tabs";
import Status from "./Brainchild";
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
                    <Tabs>
                        <Status label="Status" signal={this.signal}/>
                        <a href="#" label="nah"/>
                        <a href="#" label="wat"/>
                    </Tabs>
                </div>
            </React.Fragment>
        )
    }
}