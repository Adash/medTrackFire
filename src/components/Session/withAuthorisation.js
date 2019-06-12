import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorisation = condition => Component => {
  class WithAuthorisation extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        }
      );
    }
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorisation);
}

// try to do the same as above but using effect and function component
// const withAuthorisationHook = condition => Component => {
//   const WithAuthorisationHook = (...props) => {
//     useEffect(()=> {

//     })
//   }
//   return (
//     <Component />
//   )
// }

export default withAuthorisation;