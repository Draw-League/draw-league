
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchEvents(action) {
  console.log("fetching all events w/ ref:", action.payload);

  try {
    const eventResponse = yield axios.get('api/events');
    console.log("event response:", eventResponse);

    yield put({type: 'SET_EVENTS', payload: eventResponse.data});
    } catch (error) {
      console.log('event get failed', error);
    }
}

function* createEvent(action) {
    try {
       yield axios.post('/api/events/create-event', action.payload);
       console.log('action.payload', action.payload);
       yield put({ type: 'SET_EVENT', payload: action.payload });

    }
    catch(error) {
      console.log('Error creating event:', error);
    }
  }

  function* deleteEvent(action) {
    console.log("deleting plants, due to action:", action);
  
    try {
      const serverResponse = yield axios({ method: 'DELETE', url: `/api/events/${action.payload}` });
      console.log('serverResponse:', serverResponse);
      yield put({ type: 'FETCH_EVENTS' });
    } catch (error) {
      console.log("Error deleting plant from the server");
    }
  }

  function* addEventSaga () {
    yield takeEvery('ADD_EVENT', createEvent);
    yield takeEvery('FETCH_EVENTS', fetchEvents);
    yield takeEvery('REMOVE_EVENT', deleteEvent)
  }

  export default addEventSaga;

  