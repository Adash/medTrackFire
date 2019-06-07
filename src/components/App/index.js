import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
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
    <AuthUserContext.Provider value={ user }>
      <Router> 
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.HOME} component={HomePage}/>
        <Route path={ROUTES.STATS} component={Stats}  />
      </Router>
    </AuthUserContext.Provider>
  )
}

export default withFirebase(App);