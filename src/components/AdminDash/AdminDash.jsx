import React from 'react';
import './AdminDash.css';
import AdminNav from '../AdminNav/AdminNav'
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


function AdminDash() {

  const events = useSelector((store) => store.adminDashReducer);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, [dispatch]);

  const removeEvent = (id) => {
    console.log('deleting event with id:', id);
    dispatch({ type: 'REMOVE_EVENT', payload: id});
}

  return (
    <div className="container">
      <AdminNav />
    <section style={{ display: 'flex' }}>
        {events.map((event) => ( 
            <div key={event.id}> 
              <div className='ref-image'>
               <p> {event.location_name}</p>
              </div>
            </div>
          ))
        }
      </section>

      <div >
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <p>This the admin dashboard</p>
       
      </div>
      

      <div>
      <h2>Welcome, {events.full_name}!</h2>
      <LogOutButton className="btn" />
    </div>
    </div>
  );
}

export default AdminDash;
