import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';
import './header.css';

const Navbar = (props) => {
  return (
    <header className="header">
    <h2 className="logo">MedTrack<span style={{color:"yellow"}}>Fire</span></h2>
    {props.loading && <span>Loading ...</span>}
    <div className="navblock navbar-expand-lg">
      <ul className="navbar-nav ">
        {props.user ? (
          <>
            <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
            <Link className="nav-link" to={ROUTES.STATS}>Stats</Link>
            <SignOutButton />
          </>
        ) : (
          <Link className="nav-link" to={ROUTES.LANDING}>Log in</Link>
        )
        }
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

export default Navbar