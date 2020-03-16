import React from 'react';
import HoverImage from 'react-hover-image';
import signInBtn from './Sign_in_blue_btn_lg_default.png';
import signInHvr from './Sign_in_blue_btn_lg_hover.png';

const SignInButton = props => (
    <div className='d-block text-center md-5'>
        <HoverImage src={signInBtn} hoverSrc={signInHvr} alt='Sign in with Intuit' onClick={props.onClick} />
    </div>
);

export default SignInButton;
