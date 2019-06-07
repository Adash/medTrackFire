import React from 'react';
import { Link } from 'react-router-dom';
import PasswordForgetForm from './PasswordForgetForm';

import * as ROUTES from '../../constants/routes';
import './passwordforget.css'

const PasswordForgetPage = (props) => (
  <div className="password_forget_page">
  <div className="logo-box">
    MedTrack<span style={{color:"yellow"}}>Fire</span>
  </div>
  <div className="signinform-container">
    <PasswordForgetForm {...props} />
  </div>
</div>
);

const PasswordForgetLink = () => (
  <p >
    <Link 
      id="q_psw_forget_link" 
      to={ROUTES.PASSWORD_FORGET}
    >Forgot Password</Link>
  </p>
)

export default PasswordForgetPage;

export { PasswordForgetLink, PasswordForgetForm }