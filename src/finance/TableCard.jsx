import React, {Component} from "react";

export default class TableCard extends Component {
    render() {
        console.log('table', this.props.data);
        if (!this.props.data) {
            return false;
        }
        const title = this.props.data.title;
        const header = this.props.data.data[0].headings;
        const data = this.props.data.data.slice(1);
        return (
            <div className="card m-2">
                <div className="card-header">{title}</div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-bordered table-sm">
                            <thead>
                            <tr>
                                {header.map(heading => <th>{heading}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map(row =>
                                    <tr>{row.columns.map(item =>
                                        <td>{item}</td>)
                                    }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}