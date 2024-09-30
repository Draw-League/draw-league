import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRefs() {
  try {
    const response = yield call(axios.get, '/api/users/all-refs');
    yield put({ type: 'GET_REFS', payload: response.data });
  } catch (error) {
    console.error('Error fetching refs:', error);
  }
}

function* refsSaga () {
  yield takeEvery('FETCH_REFS', fetchRefs);
}

export default refsSaga;
