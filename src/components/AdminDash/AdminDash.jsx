import React from 'react';
import './AdminDash.css';
import AdminNav from '../AdminNav/AdminNav'
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AdminDash() {

  const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <AdminNav />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <p>This the admin dashboard</p>
       
      </div>
      <div className="container">
      <h2>Welcome, {user.full_name}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Your Role: {user.user_role} </p>
      <LogOutButton className="btn" />
    </div>
    </div>
  );
}

export default AdminDash;
