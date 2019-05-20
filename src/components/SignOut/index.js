import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({firebase}) => (
  <button
    className="btn btn-outline-warning"
    onClick={ firebase.fbSignOut }
  >
    Sign Out
  </button>
)

export default withFirebase(SignOutButton);