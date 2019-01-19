import React, {Component} from "react";
import ThinHeader from "../base/ThinHeader";
import Tabs from "../base/Tabs";
import Status from "./Status";

export default class Admin extends Component {
    render() {
        return (
            <React.Fragment>
                <ThinHeader heading="Site Maintenance"/>
                <div className="container">
                    <Tabs>
                        <Status label="Workers"/>
                        <a label="Users" className="btn btn-primary" href="/admin/accounts">Maintain Users</a>
                        <a label="Essays" className="btn btn-primary" href="/essays/drafts">Maintain Draft Essays</a>
                    </Tabs>
                </div>
            </React.Fragment>
        )
    }
}