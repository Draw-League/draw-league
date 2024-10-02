import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWinners(action) {
  try {
    const response = yield call(axios.get, `/api/drawings/top/${action.payload}`);
    yield put({ type: 'SET_WINNERS', payload: response.data });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function* winnersSaga () {
  yield takeEvery('FETCH_WINNERS', fetchWinners);
}

export default winnersSaga;
