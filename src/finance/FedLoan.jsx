import React, {Component} from "react";
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip} from "recharts";
import TableCard from "./TableCard";

export default class FedLoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lifetime: [{q: 'loading...', p: 0, i: 0}],
            numberOfQuarters: 16,
            current: false,
            monthEnd: false,
            payment: false,
        };
        this.redrawAreaChart = this.redrawAreaChart.bind(this);
    }

    componentDidMount() {
        fetch('/api/finance/fedloan', {
            method: 'GET',
            credentials: "same-origin",
        })
            .then(response => response.json())
            .then(data => this.setState({lifetime: data}));
        fetch('/api/finance/fedloanTables', {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(data => this.setState({
                current: <TableCard data={data.current}/>,
                monthEnd: <TableCard data={data.monthEnd}/>,
                payment: <TableCard data={data.payment}/>,
            }));
    }

    redrawAreaChart(event) {
        event.preventDefault();
        this.setState({numberOfQuarters: event.target.value});
    }

    render() {
        return (
            <React.Fragment>
                <div className="card-header">FedLoan History
                    <div className="text-right">
                        <small>Latest {this.state.numberOfQuarters} Quarters</small>
                        <input type="range" name="range" min="3" max={this.state.lifetime.length}
                               value={this.state.numberOfQuarters}
                               onChange={this.redrawAreaChart}/>
                    </div>
                </div>
                <div className="card-body">
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart
                            data={this.state.lifetime.slice(this.state.lifetime.length - this.state.numberOfQuarters)}>
                            <XAxis dataKey="q"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type="linear" stackId="data" stroke="#0b9545" fill="#0b9545" dataKey="p"
                                  name="Principal"/>
                            <Area type="linear" stackId="data" stroke="#f37a30" fill="#f37a30" dataKey="i"
                                  name="Interest"/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="card-deck">
                {this.state.current}
                {this.state.monthEnd}
                {this.state.payment}
                </div>
            </React.Fragment>
        )
    }
}