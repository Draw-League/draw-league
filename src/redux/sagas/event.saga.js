
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* createEvent() {
    try {
      const response = yield axios.post('/api/events/create-event');
      console.log('response.data', response.data);
      yield put({ type: 'SET_EVENT', payload: response.data });
    }
    catch(error) {
      console.log('Error creating event:', error);
    }
  }

  function* addEventSaga () {
    yield takeEvery('ADD_EVENT', createEvent);
  }

  export default addEventSaga;

  