import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Nav from '../Nav/Nav';

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>

      <Nav />

      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            dispatch({ type: 'CLEAR_REGISTRATION_ERROR' });
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
