import React from 'react';
import PasswordForgetForm from './PasswordForgetForm';

import './passwordforget.css'

const PasswordForgetPage = (props) => (
  <div className="password_forget_page">
  <div className="logo-box">
    Password<span style={{color:"yellow"}}>Reset</span>
  </div>
  <div className="signinform-container">
    <PasswordForgetForm {...props} />
  </div>
</div>
);

export default PasswordForgetPage;

export { PasswordForgetForm }