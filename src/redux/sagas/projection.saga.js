
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// function* fetchRefs(action) {
//   console.log("fetching refs", action.payload)
//     try {
//       const {currentGame} = action.payload
//       const refResponse= yield axios.get(`/api/projections/ref-intro/${currentGame}`);
//        console.log('action.payload', refResponse.data);
//        const [refDetails] = refResponse.data;
//        yield put({ type: 'SET_REF', payload: refDetails});

//     }
//     catch(error) {
//       console.log('Error fetchRefs Saga:', error);
//     }
//   }

  // function* projectionSaga () {
  //   yield takeLatest('FETCH_REFS', fetchRefs);
  // }

  // export default projectionSaga;