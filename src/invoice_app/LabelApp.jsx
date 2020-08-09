import React, {useState} from 'react';
import {
    Button,
    Col,
    Container,
    FormGroup, FormText,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Progress,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import classnames from 'classnames';
import Header from '../components/Header';

const LabelApp = props => {
    const [loaded, setLoaded] = useState(0);
    const [file, setFile] = useState('');

    const {doUpload, isUploading, uploadError} = props;
    const handleFile = event => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        doUpload(file, progressEvent => {
            setLoaded((progressEvent.loaded / progressEvent.total) * 100);
        });
    };

    return (
        <Container>
            <Header>Invoice Logistics App</Header>
            <Nav tabs>
                <NavItem>
                    <NavLink className='active' tag='div'>
                        Label Generator
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab='label'>
                <TabPane tabId='label'>
                    <h4>Upload</h4>
                    <Row className={classnames({'d-none': !isUploading})}>
                        <Col>
                            <Progress max='100' color='success' value={loaded}>
                                {Math.round(loaded)}%
                            </Progress>
                        </Col>{' '}
                    </Row>
                    <Row className={classnames({'d-none': isUploading})}>
                        <Col xs='9'>
                            <FormGroup>
                                <Label for='uploadFile'>Select label upload file</Label>
                                <Input type='file' name='file' id='uploadFile' onChange={handleFile} />
                                <FormText>
                                    <a href='https://www.accountingdatasolutions.com/static/label_upload_template.xlsx'>
                                        Download the template file
                                    </a>{' '}
                                    for guidance on content and format of the upload file accepted.
                                </FormText>
                            </FormGroup>
                        </Col>
                        <Col xs='3'>
                            <Button color='primary' onClick={handleUpload}>
                                Upload
                            </Button>
                        </Col>
                    </Row>
                    <Row className={classnames({'d-none': !uploadError})}>
                        <Col>
                            <h5 className='text-danger'>Upload Error</h5>
                            <div className='text-danger'>{uploadError}</div>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </Container>
    );
};

export default LabelApp;
