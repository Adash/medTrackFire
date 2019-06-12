import React from 'react';
import SignUpForm from './SignUpForm';

//import * as ROUTES from '../../constants/routes';
import './signuppage.css'

const SignUpPage = (props) => (
  <div className="sign_up_page">
  <div className="logo-box">
    Sign<span style={{color:"yellow"}}>Up</span>
  </div>
  <div className="signinform-container">
    <SignUpForm {...props} />
  </div>
</div>
);


export default SignUpPage;
