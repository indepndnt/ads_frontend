import React from 'react';
import {Col, Row, Table} from 'reactstrap';

const AppResults = props => {
    const uploads = props.realm_id ? props.uploads[props.realm_id] : [];
    const statusReport = {
        "0": {text: "Completed", color: "white"},
        "1": {text: "Reserved", color: "dark"},
        "2": {text: "Template Data Error", color: "danger"},
        "3": {text: "Failed-Continuing", color: "warning"},
        "4": {text: "Failed-Terminated", color: "danger"},
        "5": {text: "Reserved", color: "dark"},
        "6": {text: "Reserved", color: "dark"},
        "7": {text: "Information", color: "light"},
        "8": {text: "No Results", color: "warning"},
        "9": {text: "Failed-Unknown", color: "danger"},
    };

    return (
        <Row>
            <Col>
                <hr />
                <h4>Results</h4>
                {!uploads ? (
                    <Row>No recent uploads to this company.</Row>
                ) : (
                    uploads.map((upload, idx) => {
                        return (
                            <Row key={idx}>
                                <Col sm='4'>
                                    <p>
                                        File <strong>{upload.filename}</strong>
                                        <br />
                                        <small>uploaded {upload.timestamp}</small>
                                    </p>
                                </Col>
                                <Col sm='8'>
                                    <Table hover responsive>
                                        <thead>
                                            <th>Row(s)</th>
                                            <th>Status</th>
                                            <th>Message</th>
                                        </thead>
                                        <tbody>
                                            {upload.results.map((result, key) => (
                                                <tr key={key} className={`bg-${statusReport[result.status].color}`}>
                                                    <td>{result.rows}</td>
                                                    <td>{statusReport[result.status].text}</td>
                                                    <td>{result.message}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        );
                    })
                )}
            </Col>
        </Row>
    );
};

export default AppResults;
