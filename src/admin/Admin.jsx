import React, {Component} from "react";
import ThinHeader from "../base/ThinHeader";
import Tabs from "../base/Tabs";
import Status from "./Status";
import Brainchild from "./Brainchild";
import Users from "./Users";

export default class Admin extends Component {
    render() {
        return (
            <React.Fragment>
                <ThinHeader heading="Site Maintenance"/>
                <div className="container">
                    <Tabs>
                        <Status label="Workers"/>
                        <Users label="Users"/>
                        <Brainchild label="Brainchild"/>
                    </Tabs>
                </div>
            </React.Fragment>
        )
    }
}