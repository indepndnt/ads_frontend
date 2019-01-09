import React, {Component} from "react";
import {PieChart, Pie, Tooltip, Cell} from "recharts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
/*global AbortController*/

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusBody: 'loading...',
            orderText: 'loading...',
            showDetail: false,
            detail: [],
        };
        this.numFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
        this.controller = new AbortController();
        this.signal = this.controller.signal;

        this.setStatusChart = this.setStatusChart.bind(this);
        this.toggleDetail = this.toggleDetail.bind(this);
        this.loadDetail = this.loadDetail.bind(this);
    }

    componentDidMount() {
        this.setStatusChart();
    }

    componentWillUnmount() {
        this.controller.abort();
    }

    setStatusChart(event) {
        if (event) {
            event.preventDefault();
        }
        const colors = {
            New: '#f47830',
            AsnPrepared: '#d18504',
            Warehouse: '#ab8f00',
            AsnSent: '#839400',
            InvPrepared: '#569626',
            InvSent: '#0b9545',
            Cancel: '#808080',
        };
        const radian = Math.PI / 180;
        const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, name}) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.1;
            const x = cx + radius * Math.cos(-midAngle * radian);
            const y = cy + radius * Math.sin(-midAngle * radian);
            const textAnchor = (x > cx ? 'start' : 'end');
            const textAngle = `rotate(${x > cx ? 0 - midAngle : 180 - midAngle}, ${x}, ${y})`;
            return (
                <text x={x} y={y} fontSize={12} textAnchor={textAnchor} fill="white"
                      dominantBaseline="central" transform={textAngle}>
                    {name}
                </text>
            )
        };
        fetch('/api/brainchild/status?date=' + this.props.date, {
            method: 'GET',
            credentials: "same-origin",
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => {
                this.loadDetail();
                const totalOrder = data.map(x => x.value).reduce((sum, x) => sum + x);
                this.setState({
                    orderText: this.numFormat.format(totalOrder) + ' order',
                    statusBody: <PieChart width={160} height={160}>
                        <Pie data={data} labelLine={false}
                             nameKey="label" dataKey="value" label={renderCustomizedLabel}
                             outerRadius={80} innerRadius={10} paddingAngle={1}>
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[entry.label]}/>)}
                        </Pie>
                        <Tooltip formatter={value => this.numFormat.format(value)}/>
                    </PieChart>
                })})
    }

    loadDetail() {
        fetch('/api/brainchild/detail?date=' + this.props.date, {
            method: 'GET',
            credentials: "same-origin",
            signal: this.signal,
        })
            .then(response => response.json())
            .then(data => {
                this.setState({detail: data.detail})
            })
    }

    toggleDetail(event) {
        event.preventDefault();
        const newVisibility = !this.state.showDetail;
        this.setState({showDetail: newVisibility});
    }

    render() {
        return (
            <div className="row border border border-info align-items-start">
                <div className="col-auto">
                    {this.state.statusBody}
                </div>
                <div className="col">
                    <div className="row align-items-center">
                        <div className="col-6">
                            {this.props.date} <FontAwesomeIcon icon="inbox"/> {this.state.orderText}
                        </div>
                        <div className="col-6 justify-content-end">
                            <a href="" className="badge badge-pill badge-success"
                               onClick={this.setStatusChart}>Refresh</a>
                            <a href="" className="badge badge-pill badge-success"
                               onClick={this.toggleDetail}>Detail</a>
                            <a href={"/api/brainchild/export?date=" + this.props.date}
                               className="badge badge-pill badge-success" download>Download</a>
                        </div>
                    </div>
                    <div className={"row mw-100 d-" + (this.state.showDetail ? "flex" : "none")}>
                        <div className="col pre-scrollable overflow-auto">
                            <table className="table table-sm table-striped">
                                <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Order</th>
                                    <th>Invoice</th>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Unit Price</th>
                                    <th>Line Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.detail.map((line, idx) =>
                                    <tr key={idx}>
                                        <td>{line.status}</td>
                                        <td>{line.orderId}</td>
                                        <td>{line.invNum}</td>
                                        <td>{line.itemId}</td>
                                        <td className="text-right">{line.quantity}</td>
                                        <td className="text-right">{this.numFormat.format(line.unitPrice)}</td>
                                        <td className="text-right">{this.numFormat.format(line.lineTotal)}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}