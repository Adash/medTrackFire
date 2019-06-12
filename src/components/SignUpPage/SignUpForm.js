import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  EMAIL: '',
  PASSWORDONE: '',
  PASSWORDTWO: '',
  ERROR: null,
  SENT: false,
}

const SignUpFormBase = (props) => {
  const [email, setEmail] = useState(INITIAL_STATE.EMAIL);
  const [passwordOne, setPasswordOne] = useState(INITIAL_STATE.PASSWORDONE);
  const [passwordTwo, setPasswordTwo] = useState(INITIAL_STATE.PASSWORDTWO);
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

  const onPasswordOneChange = event => {
    setPasswordOne(event.target.value);
  }

  const onPasswordTwoChange = event => {
    setPasswordTwo(event.target.value)
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
      <input 
        name="passwordOne"
        value={ passwordOne }
        onChange={ onPasswordOneChange }
        type="text"
        placeholder="password"
        className="q_input"
      />
      <input 
        name="passwordTwo"
        value={ passwordTwo }
        onChange={ onPasswordTwoChange }
        type="text"
        placeholder="retype passowrd"
        className="q_input"
      />
      <button 
        disabled={ isInvalid }
        className="btn btn-secondary"
        type="submit"
        id="main_button"
      >Sign Up
      </button>
      <p><Link id="q_login_link"  to={ROUTES.LANDING} >Log in</Link></p>

      { error && <p>{ error.message }</p> }
      { sent && <p style={{ color: 'yellow' }}>Signing up...</p> }
    </form>

  )
}

const SignUpFormForm = withFirebase(SignUpFormBase);

export default SignUpFormForm;

