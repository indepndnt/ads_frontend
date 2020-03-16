import React from 'react';
import {Link} from 'react-router-dom';
import HoverImage from 'react-hover-image';
import getAppBtn from './C2QB_green_btn_lg_default.png';
import getAppHvr from './C2QB_green_btn_lg_hover.png';

const ConnectButton = () => (
    <Link to='/get-app' className='d-block text-center md-5'>
        <HoverImage src={getAppBtn} hoverSrc={getAppHvr} alt='Connect to QuickBooks' style={{maxWidth: "256px"}} />
    </Link>
);

export default ConnectButton;
