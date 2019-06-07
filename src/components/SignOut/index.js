import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignOutButton = ({firebase}) => {
  const [redirect, setRedirect] = useState(false);

  const signOut = () => {
    firebase.fbSignOut()
      .then(setRedirect(true))
      .catch(error => console.log(error))
  }

  return (
    <>
      { redirect && <Redirect to={ROUTES.LANDING} /> }
      <Link
        to="#"
        className="nav-link"
        onClick={ signOut }
      >
        Sign Out
      </Link>
    </>
  )}

export default withFirebase(SignOutButton);