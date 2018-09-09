import React, {Component} from 'react';
import Header from "../header";
import Section from "../section";
import pythonInfor from "../img/python-infor-logos.png";
import excelInfor from "../img/excel-infor-logos.png";

export default class Service extends Component {
    render() {
        return (
            <React.Fragment>
                <Header heading={<h2 className="masthead-heading mb-0">Project Gallery</h2>}/>
                {/* /admin/new_project (add project) */}
                <Section key="1" image={pythonInfor} swap="true" heading="pylawson"
                         text="Programmatically interact with Lawson financials from within your Python scripts;
                         optionally expose Lawson Add-Ins .NET library for authentication"/>
                <Section key="2" image={excelInfor} swap="false" heading="Lawson 10 Excel Integration"
                         text="Natively integrate Lawson data into your Excel worksheets; GL Query includes links
                         to AP invoice images (AP attachments); GL Query includes link to integrated JE report
                         for research"/>
                {/* /admin/new_project/id (edit) */}
                {/* /admin/delete_project/id" (delete) */}
                <div className="container">
                    <div className="row align-items-center">
                        <small>All product and company names are trademarks&trade; or registered&reg; trademarks of
                            their respective holders. Use of them does not imply any affiliation with or endorsement
                            by them.</small>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}