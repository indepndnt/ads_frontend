import React, {Component} from "react";
import ThinHeader from "../base/ThinHeader";
import Tabs from "../base/Tabs";
import Status from "./Status";
import Test from "./Test"

export default class Brainchild extends Component {
    render() {
        return (
            <React.Fragment>
                <ThinHeader heading="Brainchild"/>
                <div className="container">
                    <Tabs>
                        <Status label="Status"/>
                        <Test label="Test"/>
                    </Tabs>
                </div>
            </React.Fragment>
        )
    }
}