import React from 'react';
import './header.css';

const Header = (props) => {
  return (
    <header className="header">
    <h2 className="logo">MedTrack<span style={{color:"yellow"}}>Fire</span></h2>
    <button 
      type="button" 
      className="btn btn-outline-light btn-sm navbutton"
      onClick={ props.toggleForm }  
    >
      { props.showForm ? "Hide": "Show" } Form
    </button>
  </header> 
  )
}

export default Header