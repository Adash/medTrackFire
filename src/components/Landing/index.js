import React from 'react';
import './landing.css';
import SignInForm from '../SignIn/index'

const Landing = () => (
  <div className="landing_page">
    <div className="logo-box">
      MedTrack<span style={{color:"yellow"}}>Fire</span>
    </div>
    <div className="signinform-container">
      <SignInForm />
    </div>
  </div>
);

export default Landing;