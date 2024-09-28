import React from 'react';
import './AdminDash.css';
import AdminNav from '../AdminNav/AdminNav';

function AdminDash() {
  return (
    <div className="container">
      <AdminNav />
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <p>Location:</p>
          <p>Address:</p>
          <p>Time:</p>
          <p>Date:</p>
        </div>
        <div>
          <p>Judge:</p>
          <p>Judge Code:</p>
          <br></br>
          <p>Ref: </p>
          <br></br>
          <p>Game Code:</p>
        </div>
      </div>
      <button className='event-buttons'>Play</button>
      <button className='event-buttons'>Edit</button>
      <button className='event-buttons'>Delete</button>
    </div>
  );
}

export default AdminDash;
