import React from 'react';
import './AdminDash.css';
import AdminNav from '../AdminNav/AdminNav'
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function AdminDash({ socket }) {

  const events = useSelector((store) => store.adminDashReducer);
  const dispatch = useDispatch();
  const [currentGame, setCurrentGame] = useState('');


  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, [dispatch]);

  const handlePlay = (e, eventID) => {
    e.preventDefault();
    console.log('Game to PLAY id;', eventID);
    setCurrentGame(eventID);
    dispatch({ type: 'UPDATE_CURRENT_GAME', payload: eventID });
    // setCurrentGame({currentGame});
    // history.push('/ref-dash');
  }

  const removeEvent = (id) => {
    console.log('deleting event with id:', id);
    dispatch({ type: 'REMOVE_EVENT', payload: id });
  }


  const history = useHistory();
  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction) => {
        console.log(`Navigating to: ${direction}`);
        if (direction === 'next') {
          history.push('/ProRules');
        }
        else if (direction === 'back') {
          history.push('/user');
        }
      };

      socket.on('navigate', handleNavigation);
      console.log('socket.id', socket.id);
      return () => {
        socket.off('navigate', handleNavigation);
      };
    }
  }, [socket, history]);
  return (
    <div className="admin-dash-container">
      <AdminNav />
      <br />
      <br />
      <br />
      <br />
      <section style={{ display: 'flex', marginRight: '20px' }}>
        {events.map((event) => (
          <div key={event.id} >
            <div className='event-box'>
              <p> {event.id}</p>
              <p> {event.location_name}</p>
              <p> {event.location_address}</p>
              <p> {event.event_date}</p>
              <p> {event.judge_name}</p>
              <p> {event.judge_code}</p>
              <p> {event.full_name}</p>
              <p> {event.event_code}</p>
              <button className='event-buttons'
                //  value={event.id} onChange={(e) => setCurrentGame(e.target.value)} 
                onClick={(e) => handlePlay(e, event.id)}>Play</button>
              <button className='event-buttons'>Edit</button>
              <button className='event-buttons'>Delete</button>
            </div>
          </div>
        ))
        }
      </section>

      {/* <div >
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
      </div> */}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />



      <div>
        <h2>Welcome, {events.full_name}!</h2>
        <LogOutButton className="btn" />
      </div>
    </div>
  );
}

export default AdminDash;
