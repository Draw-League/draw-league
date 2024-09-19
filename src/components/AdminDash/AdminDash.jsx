import React from 'react';
import './AdminDash.css';
import AdminNav from '../AdminNav/AdminNav'
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AdminDash() {
  return (
    <div className="container">
      <AdminNav />
      <div>
        <p>This the admin dashboard</p>
        <p>It will get </p>
      </div>
    </div>
  );
}

export default AdminDash;
