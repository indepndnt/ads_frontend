import React from "react";
import { Card, CardGroup, CardHeader, CardBody } from "reactstrap";

const TaskList = props => (
  <CardGroup>
    <Card>
      <CardHeader className="card-header">
        <small>Processing New Orders</small>
      </CardHeader>
      <CardBody>
        <div className="list-group">
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "po_search")}
          >
            1. Search for POs
          </button>
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "addresses")}
          >
            2. Validate Addresses
          </button>
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "asns")}
          >
            3. Create ASN's
          </button>
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "warehouse")}
          >
            4. Send Warehouse Files
          </button>
        </div>
      </CardBody>
    </Card>
    <Card>
      <CardHeader>
        <small>After Shipping is Added</small>
      </CardHeader>
      <CardBody>
        <div className="list-group">
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "send_asns")}
          >
            1. Send ASN's
          </button>
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "prep_inv")}
          >
            2. Prepare Invoices
          </button>
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "send_inv")}
          >
            3. Send Invoices
          </button>
        </div>
      </CardBody>
    </Card>
    <Card>
      <CardHeader>
        <small>Other Tasks</small>
      </CardHeader>
      <CardBody>
        <div className="list-group">
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "dfwd_summary")}
          >
            Monthly Orders Report
          </button>
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "year_report")}
          >
            Download season detail
          </button>
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "worldship")}
          >
            Send UPS Worldship File
          </button>
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "packing_slips")}
          >
            Send Packing Slips
          </button>
          <button
            className="list-group-item"
            onClick={e => props.taskHandler(e, "homedepot_com")}
          >
            Query CommerceHub
          </button>
        </div>
      </CardBody>
    </Card>
  </CardGroup>
);

export default TaskList;
