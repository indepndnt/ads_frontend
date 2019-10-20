import React, {useState} from 'react';
import {Row, Col, FormGroup, FormText, Label, Input, Button, Progress} from 'reactstrap';
import classnames from 'classnames';

const AppUpload = props => {
    const [loaded, setLoaded] = useState(0);
    const [file, setFile] = useState('');

    const {intuitUploadInvoices, isUploading, uploadError, disable} = props;
    const handleFile = event => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        intuitUploadInvoices(file, progressEvent => {
            setLoaded((progressEvent.loaded / progressEvent.total) * 100);
        });
    };

    return (
        <Row>
            <Col>
                <hr />
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
                            <Label for='uploadFile'>Select invoice upload file</Label>
                            <Input type='file' name='file' id='uploadFile' onChange={handleFile} disabled={disable} />
                            <FormText>
                                <a href='https://www.accountingdatasolutions.com/static/invoice_app_upload_template.xlsx'>
                                    Download the template file
                                </a>{' '}
                                for guidance on content and format of the upload file accepted.
                            </FormText>
                        </FormGroup>
                    </Col>
                    <Col xs='3'>
                        <Button color={disable ? 'secondary' : 'primary'} onClick={handleUpload} disabled={disable}>
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
            </Col>
        </Row>
    );
};

export default AppUpload;
