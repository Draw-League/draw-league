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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <p>This the admin dashboard</p>
       
      </div>
      
      <section className="ref-info">
        {events.map((event) => ( 
            <div key={event.id}> 
              <div className='ref-image'>
               <p> {event.location_name}</p>
              </div>
            </div>
          ))
        }
      </section>

      <div className="container">
      <h2>Welcome, {events.full_name}!</h2>
      <LogOutButton className="btn" />
    </div>
    </div>
  );
}

export default AdminDash;
