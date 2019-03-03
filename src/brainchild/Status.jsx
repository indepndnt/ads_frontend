import React, {Component} from "react";
import Order from './order';

export default class Status extends Component {
    constructor(props) {
        console.log('status constructor');
        super(props);
        this.state = {
            orderDates: [],
        };
        // this.signal = this.props.signal;
        this.setRecentEvents = this.setRecentEvents.bind(this);
    }

    componentDidMount() {
        console.log('status did mount');
        // this.setRecentEvents();
    }

    setRecentEvents() {
        console.log('set recent events');
        fetch('/api/brainchild/events', {
            method: 'GET',
            credentials: "same-origin",
            // signal: this.signal,
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