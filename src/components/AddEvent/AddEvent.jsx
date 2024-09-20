import React, { useState } from 'react';
import './AddEvent.css';
import { useDispatch } from 'react-redux';

function AddEvent() {
  const [newEvent, setNewEvent] = useState({
    theme: '',
    promptOne: '',
    promptTwo: '',
    promptThree: '',
    eventDate: '',
    eventCode: '',
    locationName: '',
    locationAddress: '',
    judgeName: '',
    judgeJob: '',
    judgeLike: '',
    judgeKnow: '',
    judgeImg: '',
    judgeCode: '',
    createdBy: 0,
  });

  const dispatch = useDispatch();

  const createEvent = (event) => {
    event.preventDefault();

    dispatch({
      type: 'ADD_EVENT',
      payload: newEvent, // Send the entire newEvent object
    });
  };

  return (
    <div className="container">
      <div>
        <p>This is the add an event page</p>
        <h3>Event Details</h3>
        <form onSubmit={createEvent}>
          <input
            type="text"
            placeholder="Theme"
            name="theme"
            value={newEvent.theme}
            onChange={(event) => setNewEvent({ ...newEvent, theme: event.target.value })}
          />
          {console.log('new event.theme', newEvent.theme)}
          <input
            type="text"
            placeholder="Prompt One"
            name="promptOne"
            value={newEvent.promptOne}
            onChange={(event) => setNewEvent({ ...newEvent, promptOne: event.target.value })}
          />
          <input
            type="text"
            placeholder="Prompt Two"
            name="promptTwo"
            value={newEvent.promptTwo}
            onChange={(event) => setNewEvent({ ...newEvent, promptTwo: event.target.value })}
          />
          <input
            type="text"
            placeholder="Prompt Three"
            name="promptThree"
            value={newEvent.promptThree}
            onChange={(event) => setNewEvent({ ...newEvent, promptThree: event.target.value })}
          />
          <input
            type="date"
            placeholder="Event Date"
            name="eventDate"
            value={newEvent.eventDate}
            onChange={(event) => setNewEvent({ ...newEvent, eventDate: event.target.value })}
          />
          <input
            type="text"
            placeholder="Location Name"
            name="locationName"
            value={newEvent.locationName}
            onChange={(event) => setNewEvent({ ...newEvent, locationName: event.target.value })}
          />
          <input
            type="text"
            placeholder="Location Address"
            name="locationAddress"
            value={newEvent.locationAddress}
            onChange={(event) => setNewEvent({ ...newEvent, locationAddress: event.target.value })}
          />
          <input
            type="text"
            placeholder="Judge's Name"
            name="judgeName"
            value={newEvent.judgeName}
            onChange={(event) => setNewEvent({ ...newEvent, judgeName: event.target.value })}
          />
          <input
            type="text"
            placeholder="Judge's Job"
            name="judgeJob"
            value={newEvent.judgeJob}
            onChange={(event) => setNewEvent({ ...newEvent, judgeJob: event.target.value })}
          />
          <input
            type="text"
            placeholder="Judge Likes"
            name="judgeLike"
            value={newEvent.judgeLike}
            onChange={(event) => setNewEvent({ ...newEvent, judgeLike: event.target.value })}
          />
          <input
            type="text"
            placeholder="Judge Knows"
            name="judgeKnow"
            value={newEvent.judgeKnow}
            onChange={(event) => setNewEvent({ ...newEvent, judgeKnow: event.target.value })}
          />
          <input
            type="text"
            placeholder="Judge's Picture"
            name="judgeImg"
            value={newEvent.judgeImg}
            onChange={(event) => setNewEvent({ ...newEvent, judgeImg: event.target.value })}
          />
          <button type="submit" className="btn_desktop">Add Event</button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
