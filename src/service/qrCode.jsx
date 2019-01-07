import React, {Component} from 'react';
import ThinHeader from "../base/ThinHeader";

export default class QrCode extends Component {
    state = {
        qrCodeValue: null,
        qrCodeImage: null,
        fileImage: null,
        returnValue: null,
        error: null
    };

    render() {
        return (
            <React.Fragment>
                <ThinHeader heading={<h2 className="masthead-heading mb-0">QR Codes Demonstration</h2>}/>
                <div className="container">
                    <div className="col-md-6">
                        <form action="/api/service/qrcode" method="POST">
                            <div className="form-group">
                                <label htmlFor="qrCodeValue">Value for QR Code</label>
                                <input type="text" className="form-control" value={this.state.qrCodeValue}
                                       name="qrCodeValue" id="qrCodeValue"/>
                            </div>
                            <button type="submit" className="btn btn-primary form-group">Generate</button>
                            <h2>Generated QR Code:</h2>
                            <img src={this.state.qrCodeImage} alt='QR Code'/>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <form action="/api/service/qrcode" method="POST" encType="multipart/form-data">
                            <div className="error-msg">Error: {this.state.error}</div>
                            <div className="form-group">
                                <label htmlFor="qrCodeFile">Image File</label>
                                <input className="form-control" type="file" value="" name="qrCodeFile"
                                       id="qrCodeFile"/>
                            </div>
                            <button type="submit" className="btn btn-primary form-group">Upload</button>
                            <h2>Uploaded QR Code:</h2>
                            <img src={this.state.fileImage} alt='QR Code'/>
                            <h2>Value:</h2>
                            {this.state.returnValue}
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}