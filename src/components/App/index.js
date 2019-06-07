import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import './app.css' // global css override

import HomePage from '../Home';
import LandingPage from '../Landing';
import Stats from '../Stats';

import * as ROUTES from '../../constants/routes';

const App = (props) => {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const listener = props.firebase.auth.onAuthStateChanged(authUser => {
      authUser 
        ? setUser(authUser)
        : setUser(null); 
    });
    console.log(user)
    return () => listener(); // remove listener using hooks (effect) api
  });

  return (
  <Router> 
 
    <Route 
      exact path={ROUTES.LANDING}
      render={routeProps => (
        <LandingPage {...routeProps} user={user} />
      )} 
    />
    <Route 
      path={ROUTES.HOME} render={routeProps => (
        <HomePage {...routeProps} user={user} />
      )} 
    />
    <Route 
      path={ROUTES.STATS} render={routeProps => (
        <Stats {...routeProps} user={user} />
      )}  />

  </Router>
  )
}

export default withFirebase(App);