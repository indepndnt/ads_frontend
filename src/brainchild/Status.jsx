import React, {Component} from "react";
import Order from './order';
/*global AbortController*/

export default class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDates: [],
        };
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.setRecentEvents = this.setRecentEvents.bind(this);
    }

    componentDidMount() {
        this.setRecentEvents();
    }

    componentWillUnmount() {
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

    render() {
        return (
            <div className="row">
                <div className="col">
                    {this.state.orderDates.map(d => <Order key={d} date={d}/>)}
                </div>
            </div>
        )
    }
}