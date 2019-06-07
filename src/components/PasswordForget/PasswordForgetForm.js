import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  EMAIL: '',
  ERROR: null,
  SENT: false,
}

const PasswordForgetFormBase = (props) => {
  const [email, setEmail] = useState(INITIAL_STATE.EMAIL);
  const [error, setError] = useState(INITIAL_STATE.ERROR);
  const [sent, setSent] = useState(INITIAL_STATE.SENT);

  const onSubmit = event => {
    event.preventDefault();

    props.firebase.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail(INITIAL_STATE.EMAIL);
        setError(INITIAL_STATE.ERROR);
        setSent(true);
        setTimeout(
          () => props.history.push(ROUTES.LANDING),
          1500
        );

      })
      .catch(error => {
        setError(error);
      })
  }

  const onChange = event => {
    setEmail(event.target.value);
  }

  const isInvalid = email === '';

  return (
    <form onSubmit={ onSubmit } >
      <input 
        name="email"
        value={ email }
        onChange={ onChange }
        type="text"
        placeholder="email"
        className="q_input"
      />
      <button 
        disabled={ isInvalid }
        className="btn btn-secondary"
        type="submit"
        id="q_psw_reset_button"
      >Reset Password
      </button>
      <p><Link id="q_login_link"  to={ROUTES.LANDING} >Log in</Link></p>

      { error && <p>{ error.message }</p> }
      { sent && <p style={{ color: 'yellow' }}>Password reset email sent</p> }
    </form>

  )
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetForm;

