import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../../constants/routes';
import './header.css';

const NavAuth = () => (
  <>
    <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
    <Link className="nav-link" to={ROUTES.STATS}>Stats</Link>
    <SignOutButton />
  </>
)

const NavNonAuth = () => (
  <Link className="nav-link" to={ROUTES.LANDING}>Log in</Link>
)

const Navbar = (props) => {
  return (
    <header className="header">
    <h2 className="logo">MedTrack<span style={{color:"yellow"}}>Fire</span></h2>
    {props.loading && <span>Loading ...</span>}
    <div className="navblock navbar-expand-lg">
      <ul className="navbar-nav ">
        <AuthUserContext.Consumer>
          { user => (user ? <NavAuth /> : <NavNonAuth />)}
        </AuthUserContext.Consumer>
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