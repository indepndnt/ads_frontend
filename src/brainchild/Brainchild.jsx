import React, {Component} from "react";
import ThinHeader from "../base/ThinHeader";
import {ResponsiveContainer, PieChart, Pie, Tooltip} from "recharts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
/*global AbortController*/

export default class Brainchild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusBody: '',
            statusFooter: '',
            recentEvents: [{date: '', text: 'loading ...'}],
        };
        this.refreshQueueInterval = null;
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.setRecentEvents = this.setRecentEvents.bind(this);
        this.setStatusChart = this.setStatusChart.bind(this);
        this.handleTask = this.handleTask.bind(this);
    }

    componentDidMount() {
        this.setRecentEvents();
        this.setStatusChart();
        // this.refreshQueueInterval = setInterval(this.setQueues, 30000);
    }

    componentWillUnmount() {
        // clearInterval(this.refreshQueueInterval);
        this.controller.abort();
    }

    setStatusChart() {
        fetch('/api/brainchild/status', {
            method: 'GET',
            credentials: "same-origin",
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => this.setState({
                statusBody: <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie data={data}
                             nameKey="label" dataKey="value" label={({index}) => data[index].label}
                             innerRadius={40} paddingAngle={1}/>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>,
                statusFooter: data.footer,
            }))
    }

    setRecentEvents() {
        fetch('/api/brainchild/events', {
            method: 'GET',
            credentials: "same-origin",
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => this.setState({recentEvents: data}));
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
            .then(data => {
                this.setState({
                    statusBody: <p>{data.message}</p>,
                    statusFooter: <button onClick={this.setStatusChart}>Chart</button>
                });
            })
    }

    render() {
        return (
            <React.Fragment>
                <ThinHeader heading="Brainchild"/>
                <div className="container">
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-header">
                                <h3>Status</h3>
                            </div>
                            <div className="card-body">
                                {this.state.statusBody}
                            </div>
                            <div className="card-footer text-right">
                                {this.state.statusFooter}
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3>Recent Events</h3>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    {this.state.recentEvents.map(po =>
                                        <a href={"/brainchild/inv_detail?po_date=" + po.date}
                                           key={po.date} className="list-group-item">
                                            <span className="badge">{po.date}</span><FontAwesomeIcon
                                            icon="inbox"/> {po.text}
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="card-footer text-right">
                                <a href="/brainchild/inv_detail"><FontAwesomeIcon icon="play-circle"/> View All
                                    Activity</a>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3>Tasks</h3>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'po_search')}>Search for POs</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'asns')}>Create ASN's</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'worldship')}>Send UPS Worldship
                                        File</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'warehouse')}>Send Warehouse Files</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'packing_slips')}>Send Packing Slips</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'send_asns')}>Send ASN's</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'prep_inv')}>Prepare Invoices</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'send_inv')}>Send Invoices</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'dfwd_summary')}>Monthly Orders for
                                        validating DFWD billing</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'year_report')}>Download season detail</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}