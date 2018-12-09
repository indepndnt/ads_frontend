import React, {Component} from "react";
import ThinHeader from "../base/ThinHeader";
import {ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell} from "recharts";
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
        const colors = {
            New: '#f47830',
            AsnPrepared: '#d18504',
            Warehouse: '#ab8f00',
            AsnSent: '#839400',
            InvPrepared: '#569626',
            InvSent: '#0b9545',
            Cancel: '#808080',
        };
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
                             outerRadius={70} innerRadius={30} paddingAngle={1}>
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[entry.label]}/>)}
                        </Pie>
                        <Tooltip/>
                        <Legend layout="vertical" align="center" verticalAlign="bottom"/>
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
                                    <small><b>Processing New Orders</b></small>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'po_search')}>1. Search for POs</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'asns')}>2. Create ASN's</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'addresses')}>3. Validate Addresses</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'warehouse')}>4. Send Warehouse Files</a>
                                </div>
                                <div className="list-group">
                                    <small><b>After Shipping is Added</b></small>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'send_asns')}>1. Send ASN's</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'prep_inv')}>2. Prepare Invoices</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'send_inv')}>3. Send Invoices</a>
                                </div>
                                <div className="list-group">
                                    <small><b>Other Tasks</b></small>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'dfwd_summary')}>Monthly Orders Report</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'year_report')}>Download season detail</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'worldship')}>Send UPS Worldship File</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'packing_slips')}>Send Packing Slips</a>
                                    <a href="" className="list-group-item"
                                       onClick={e => this.handleTask(e, 'homedepot_com')}>Query CommerceHub</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}