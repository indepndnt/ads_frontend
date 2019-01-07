import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import IntegratedEDI from './edi';
import QrCode from './qrCode';

export default class Service extends Component {
    render() {
        return (
            <Switch>
                <Route path='/service' exact component={IntegratedEDI}/>
                <Route path='/service/qrcode' component={QrCode}/>
            </Switch>
        )
    }
}