
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchRefs(action) {
    try {
      const refResponse= yield axios.get(`/api/projections/ref-intro/:id/${ action.payload}`);
       console.log('action.payload', action.payload);
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