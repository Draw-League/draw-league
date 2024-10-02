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
  // const [currentGame, setCurrentGame] = useState({});


  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, [dispatch]);

  const handlePlay = (e, event) => {
    e.preventDefault();
    console.log('Game to PLAY id;', event);
    // setCurrentGame(event);
   dispatch({ type: 'UPDATE_CURRENT_GAME', payload: event });
   window.open(`/prorules/`, "_blank");
   history.push('/refdash');
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
      const handleNavigation = (direction) => {
        console.log(`Navigating to: ${direction}`);
        // console.log(`currentGame: ${currentGame}`);
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
      <section className="admin-events-section">
        {events.map((event) => (
          <div key={event.id} className="admin-event-box">
            <div className="admin-event-details">
              <div className="admin-event-left">
                <div>
                  <p>
                    <span className="admin-event-label">Event #:</span>{' '}
                    <span className="admin-event-info">{event.event_id}</span>
                  </p>
                </div>
                <p>
                  <span className="admin-event-label">Location:</span>{' '}
                  <span className="admin-event-info">{event.location_name}</span>
                </p>
                <p>
                  <span className="admin-event-label">Address:</span>{' '}
                  <span className="admin-event-info">{event.location_address}</span>
                </p>
                <p>
                  <span className="admin-event-label">Time:</span>{' '}
                  <span className="admin-event-info">{event.time}</span>
                </p>
                <p>
                  <span className="admin-event-label">Date:</span>{' '}
                  <span className="admin-event-info">{event.event_date}</span>
                </p>
              </div>
              <div className="admin-event-right">
                <p>
                  <span className="admin-event-label">Judge:</span>{' '}
                  <span className="admin-event-info">{event.judge_name}</span>
                </p>
                <p>
                  <span className="admin-event-label">Judge Code:</span>{' '}
                  <span className="admin-event-info">{event.judge_code}</span>
                </p>
                <p>
                  <span className="admin-event-label">Ref:</span>{' '}
                  <span className="admin-event-info">{event.full_name}</span>
                </p>
                <p>
                  <span className="admin-event-label">Game Code:</span>{' '}
                  <span className="admin-event-info">{event.event_code}</span>
                </p>
              </div>
            </div>
            <div className="admin-event-buttons">
              <button className="admin-event-button" onClick={(e) => handlePlay(e, event)}>Play</button>
              <button className="admin-event-button" onClick={() => editEvent(event.id)}>Edit</button>
              <button className="admin-event-button admin-delete-button" onClick={() => removeEvent(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>

      <div>
        <LogOutButton className="admin-logout-btn" />
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
                onClick={(e) => handlePlay(e, event )}>Play</button>
              <button className='event-buttons' onClick={() => editEvent(event.id)}>Edit</button>
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
      <br /> */}


<div>
  <LogOutButton className="btn" />
</div>


export default AdminDash;
