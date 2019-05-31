import React from 'react';
import './header.css';
import SignOutButton from '../SignOut';
import GoToStatsButton from '../Navigation/GoToStats';
import GoHomeButton from '../Navigation/GoHome';

const Header = (props) => {
  return (
    <header className="header">
    <h2 className="logo">MedTrack<span style={{color:"yellow"}}>Fire</span></h2>
    {props.loading && <span>Loading ...</span>}
    <div className="navblock navbar-expand-lg">
      <ul className="navbar-nav ">
        <GoHomeButton />
        <GoToStatsButton />
        <SignOutButton />
      </ul>
    </div>
    { props.toggleForm &&
      (<button 
        type="button" 
        className="btn btn-outline-light btn-sm navbutton formbutton"
        onClick={ props.toggleForm }  
      >
        { props.showForm ? "Hide": "Show" } Form
      </button>)}
  </header> 
  )
}

export default Header