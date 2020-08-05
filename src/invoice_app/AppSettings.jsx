import React, {useState} from 'react';
import {Col, Row, FormGroup, Input, Button, Table} from 'reactstrap';
import {useHistory, Link} from 'react-router-dom';
import Connect from '../components/IntuitConnect';

const AppSettings = props => {
    let history = useHistory();
    const {realm_id, companies, switchCompany} = props;

    const [newRealmId, setNewRealmId] = useState(realm_id);
    const [showConnect, setShowConnect] = useState(false);
    const handleSelect = event => {
        const newRealm = event.target.value;
        setNewRealmId(newRealm);
        switchCompany(newRealm, companies[newRealm]);
    };
    const handleDisconnect = realm => {
        switchCompany(realm, companies[realm]);
        history.push('/disconnect');
    }
    const handleAddButton = () => {
        setShowConnect(!showConnect);
    };

    return (
        <Row>
            <Col>
                {companies ? (
                    <Table hover responsive size="sm">
                        <thead>
                        <tr>
                            <th>Selected</th>
                            <th>Company</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {Object.entries(companies).map(([key, value]) => (
                            <tr key={key}>
                                <th scope="row">
                                    <FormGroup check>
                                        <Input type="radio" name="select" value={key} onChange={handleSelect}
                                               checked={key === newRealmId}/>
                                    </FormGroup>
                                </th>
                                <td>{value}</td>
                                <td>
                                    <Link to="/disconnect" onClick={() => handleDisconnect(key)}>Disconnect</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                ) : (<Row><Col>You have no companies connected.</Col></Row>)}
                <Row>
                    <Col>
                        <Button color='primary' onClick={handleAddButton}>
                            Add New Company
                        </Button>
                        {showConnect ? <Connect/> : null}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default AppSettings;
