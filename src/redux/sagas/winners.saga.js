import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWinners() {
  try {
    const response = yield call(axios.get, '/api/photos');
    yield put({ type: 'GET_IMAGES_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function* winnersSaga () {
  yield takeEvery('FETCH_WINNERS', fetchWinners);
}

export default winnersSaga;
