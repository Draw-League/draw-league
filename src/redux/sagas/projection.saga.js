
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchRefs(action) {
    try {
       yield axios.post('/api/projections/ref-intro', action.payload);
       console.log('action.payload', action.payload);
       yield put({ type: 'SET_REF', payload: action.payload });

    }
    catch(error) {
      console.log('Error fetchRegs Saga:', error);
    }
  }

  function* projectionSaga () {
    yield takeEvery('FETCH_REFS', fetchRefs);
  }

  export default projectionSaga;