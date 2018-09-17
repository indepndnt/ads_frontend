import React from 'react';
import intuit_button from '../components/img/intuit-sign-in.png'

const ForwardingSignIn = SignInComponent => {
    const forwardRef = (props, ref) => {
        return <SignInComponent forwardRef={ref} {...props}/>;
    };
    return React.forwardRef(forwardRef)
};

const SignInButtons = ({forwardRef, children, ...props}) => (
    <React.Fragment>
        <li className="nav-item">
            <div className="nav-signin" id="intuitSignIn" onClick={props.user.intuitSignIn}>
                <img src={intuit_button} alt="Sign in with Intuit"/>
            </div>
        </li>
        <li className="nav-item">
            <div className="nav-signin" id="googleSignIn" ref={forwardRef}/>
        </li>
    </React.Fragment>
);

const SignIn = ForwardingSignIn(SignInButtons);

export default SignIn;
