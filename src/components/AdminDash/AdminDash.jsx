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
  const [currentGame, setCurrentGame] = useState({});


  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, [dispatch]);

  const handlePlay = (e, event) => {
    e.preventDefault();
    console.log('Game to PLAY id;', event);
    setCurrentGame(event);
    dispatch({ type: 'UPDATE_CURRENT_GAME', payload: event });
    history.push('/refdash');
    window.open(`/proref/`, "_blank");
  }

  const removeEvent = (id) => {
    console.log('deleting event with id:', id);
    dispatch({ type: 'REMOVE_EVENT', payload: id });
  }

  const editEvent = (id) => {
    history.push(`/edit-event/${id}`);
  }

  const history = useHistory();
  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction, currentGame) => {
        console.log(`Navigating to: ${direction}`);
        console.log(`currentGame: ${currentGame}`);
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
      <section className="events-section">
        {events.map((event) => (
          <div key={event.id} className="event-box">
            <div className="event-details">
              <div className="event-left">
                <p><span className="event-label">Location:</span> <span className="event-info">{event.location_name}</span></p>
                <p><span className="event-label">Address:</span> <span className="event-info">{event.location_address}</span></p>
                <p><span className="event-label">Time:</span> <span className="event-info">{event.time}</span></p>
                <p><span className="event-label">Date:</span> <span className="event-info">{event.event_date}</span></p>
              </div>
              <div className="event-right">
                <p><span className="event-label">Judge:</span> <span className="event-info">{event.judge_name}</span></p>
                <p><span className="event-label">Judge Code:</span> <span className="event-info">{event.judge_code}</span></p>
                <p><span className="event-label">Ref:</span> <span className="event-info">{event.full_name}</span></p>
                <p><span className="event-label">Game Code:</span> <span className="event-info">{event.event_code}</span></p>
              </div>
            </div>
            <div className="event-buttons">
              <button className="event-button" onClick={() => handlePlay(event)}>Play</button>
              <button className="event-button" onClick={() => editEvent(event.id)}>Edit</button>
              <button className="event-button delete" onClick={() => removeEvent(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>

      <div>
        <LogOutButton className="logout-btn" />
      </div>
    </div>
  );
}

{/* <section style={{ display: 'flex', marginRight: '20px' }}>
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
                onClick={() => handlePlay(event.id)}>Play</button>
              <button className='event-buttons' onClick={() => editEvent(event.id)}>Edit</button>
              <button onClick={(e) => handlePlay(e, event)}>Play</button>
              <button className='event-buttons'>Edit</button>
              <button className='event-buttons' onClick={() => removeEvent(event.id)}>Delete</button>
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
      </div> 

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />


      <div>
        <LogOutButton className="btn" />
      </div>
      //*/}

export default AdminDash;
