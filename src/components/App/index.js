import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from '../Home';
import LandingPage from '../Landing';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router> 
    <>
 
    <Route exact path={ROUTES.LANDING} component={LandingPage} />
    <Route path={ROUTES.HOME} component={HomePage} />

    </>
  </Router>
)

export default App;