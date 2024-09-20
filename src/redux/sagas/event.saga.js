
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

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

  function* addEventSaga () {
    yield takeEvery('ADD_EVENT', createEvent);
  }

  export default addEventSaga;

  