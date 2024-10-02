import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LogOutButton(props) {
  const [isLoggingOut, setIsLoggingOut] = useState(false); 
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggingOut && !user.id) {
      history.push('/home');
      setIsLoggingOut(false);
    }
  }, [user, isLoggingOut, history]);

  const handleLogout = () => {
    if (!isLoggingOut) {
      setIsLoggingOut(true);
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <button
      className={props.className}
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
