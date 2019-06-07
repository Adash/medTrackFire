import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

const withAuthentication = Component => {
  const WithAuthentication = props => {
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
        <Component {...props} user={ user } />
      </AuthUserContext.Provider>
    )
  }

  return withFirebase(WithAuthentication);
}

export default withAuthentication;