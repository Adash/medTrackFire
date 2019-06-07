import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withAuthentication } from '../Session'

import './app.css' // global css override

import HomePage from '../Home';
import LandingPage from '../Landing';
import Stats from '../Stats';
import PasswordForgetPage from '../PasswordForget';

import * as ROUTES from '../../constants/routes';

const App = () => {
  return (
      <Router> 
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.HOME} component={HomePage}/>
        <Route path={ROUTES.STATS} component={Stats}  />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      </Router>
  )
}

export default withAuthentication(App);