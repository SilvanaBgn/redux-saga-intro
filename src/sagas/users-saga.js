// This file will take care of all the sagas related to users actions
import { takeEvery, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/users'; //importing Types and both functions
import * as api from '../api/api-users'

// worker-saga: it executes the middle function
function* getUsersMiddle() {
  try {
    console.log('getUsersMiddle');
    const result = yield call(api.getUsers); // call works as an async await
    console.log('result saga', result);
    yield put(actions.getUsersSuccess({ // put is the dispatch of the saga
      items: result.data.data
    }));
  } catch (e) {}
}

// watcher-saga: it watches an action to intercept it when it was dispatched.
function* watchGetUsersRequest() {
  console.log('watchGetUsersRequest');
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsersMiddle);
}

// here we do a fork for every watcher-saga
const usersSagas = [
  fork(watchGetUsersRequest)
];

export default usersSagas;
