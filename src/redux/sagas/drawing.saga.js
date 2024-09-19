import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* uploadImage(action) {
  try {
    const response = yield call(axios.post, '/api/photos', { path: action.payload });
    yield put({ type: 'UPLOAD_IMAGE_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

function* fetchImages() {
  try {
    const response = yield call(axios.get, '/api/photos');
    yield put({ type: 'GET_IMAGES_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

export default function* drawingSaga() {
  yield takeLatest('UPLOAD_IMAGE_REQUEST', uploadImage);
  yield takeLatest('GET_IMAGES_REQUEST', fetchImages);
}
