
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchRefs(action) {
  console.log("fetching refs", action.payload)
    try {
      const refResponse= yield axios.get(`/api/projection/ref-intro/${action.payload}`);
       console.log('action.payload', refResponse.data);
       yield put({ type: 'SET_REF', payload: refResponse.data});

    }
    catch(error) {
      console.log('Error fetchRefs Saga:', error);
    }
  }

  function* projectionSaga () {
    yield takeEvery('FETCH_REFS', fetchRefs);
  }

  export default projectionSaga;