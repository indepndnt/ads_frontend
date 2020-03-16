import React, {useState} from 'react';
import {Col, Row, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {useHistory, Link} from 'react-router-dom';
import Connect from '../components/IntuitConnect';

const AppSettings = props => {
    let history = useHistory();
    const {realm_id, company_name, companies, switchCompany} = props;
    let switchCompanySection;

    const [newRealmId, setNewRealmId] = useState(realm_id);
    const addVal = '000000';
    const handleSelect = event => {
        setNewRealmId(event.target.value);
    };
    const handleSubmit = () => {
        if (newRealmId === addVal) {
            history.push('/get-app');
        } else {
            switchCompany(newRealmId, companies[newRealmId]);
        }
    };

    if (companies && Object.keys(companies).length > 1) {
        switchCompanySection = (
            <Row>
                <Col>
                    <Form inline tag='span'>
                        <FormGroup className='mr-sm-2'>
                            <Label for='companySelect' className='mr-sm-2'>
                                Switch to
                            </Label>
                            <Input
                                type='select'
                                name='select'
                                id='companySelect'
                                onChange={handleSelect}
                                value={newRealmId}>
                                {Object.entries(companies).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                                <option value={addVal}>Add another company not listed.</option>
                            </Input>
                        </FormGroup>
                        <Button color='primary' onClick={handleSubmit}>
                            Go
                        </Button>
                    </Form>
                </Col>
            </Row>
        );
    }

    return (
        <Row>
            <Col>
                {!!realm_id ? (
                    <Row>
                        <Col>
                            <Link to='/disconnect'>
                                Disconnect <strong> {company_name} </strong>
                            </Link>
                            from the app.
                        </Col>
                    </Row>
                ) : null}
                {switchCompanySection}
                <Row>
                    <Col>
                        To add another company:
                        <Connect />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default AppSettings;
