import React, {Component} from "react";

export default class TaskList extends Component {
    render() {
        const handle = this.props.taskHandler;
        return (
            <div className="col card-group">
                <div className="card">
                    <div className="card-header">
                        <small>Processing New Orders</small>
                    </div>
                    <div className="card-body">
                        <div className="list-group">
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'po_search')}>1. Search for POs</a>
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'addresses')}>2. Validate Addresses</a>
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'asns')}>3. Create ASN's</a>
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'warehouse')}>4. Send Warehouse Files</a>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <small>After Shipping is Added</small>
                    </div>
                    <div className="card-body">
                        <div className="list-group">
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'send_asns')}>1. Send ASN's</a>
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'prep_inv')}>2. Prepare Invoices</a>
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'send_inv')}>3. Send Invoices</a>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <small>Other Tasks</small>
                    </div>
                    <div className="card-body">
                        <div className="list-group">
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'dfwd_summary')}>Monthly Orders Report</a>
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'year_report')}>Download season detail</a>
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'worldship')}>Send UPS Worldship File</a>
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'packing_slips')}>Send Packing Slips</a>
                            <a href="" className="list-group-item"
                               onClick={e => handle(e, 'homedepot_com')}>Query CommerceHub</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}