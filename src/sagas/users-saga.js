// This file will take care of all the sagas related to users actions
import { takeEvery, takeLatest, take, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/users'; //importing Types and both functions
import * as api from '../api/api-users'

//---GET---//
// worker-saga: it executes the middle function
function* getUsersMiddle() {
  try {
    const result = yield call(api.getUsers); // call works as an async await
    console.log('Saga getUsersMiddle - result_saga', result);
    yield put(actions.getUsersSuccess({ // put is the dispatch of the saga
      items: result.data.data
    }));
  } catch (e) {
    yield put(actions.usersError({
      error: 'An error ocurred when trying to get the user'
    }));
  }
}

// watcher-saga: it watches an action to intercept it when it was dispatched.
function* watchGetUsersRequest() {
  console.log('watchGetUsersRequest');
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsersMiddle);
}

//---CREATE---//
function* createUserMiddle(action) {
  console.log('Saga createUser - action:', action);
  try {
    const {firstName, lastName} = action.payload;
    yield call(api.createUser, {
      firstName,
      lastName
    });
    yield call(getUsersMiddle);
  } catch(e) {
    yield put(actions.usersError({
      error: 'An error ocurred when trying to create the user'
    }));
  }
}

function* watchCreateUserRequest() {
  // takeLatest will stop every other saga that was executing in the takeLatest queue and will only execute this last one.
  // i.e. If we have 2 buttons filters for the users-list, when we press the 2nd filter quickly after the 1st one, it's cause we don't care about the result of the 1st one
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUserMiddle);
}

//---DELETE---//
function* deleteUserMiddle(userId) {
  console.log('Saga deleteUser');
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsersMiddle);
  } catch(e) {
    yield put(actions.usersError({
      error: 'An error ocurred when trying to delete the user'
    }));
  }
}

function* watchDeleteUserRequest() {
  // take is a lower level effect, so we cannot pass a worker-saga
  // we wrap it in a while(true), it's blocking saga, for when we want to wait for an action or api call to resolve before we allow the user to call it again.
  // i.e: Logging out the current user, Validating a reset password token, Sending the reset password email, Actually resetting the password
  while(true) {
    const action = yield take(actions.Types.DELETE_USER_REQUEST, deleteUserMiddle);
    yield call(deleteUserMiddle, {
      userId: action.payload.userId
    })
  }
}

// here we do a fork for every watcher-saga
const usersSagas = [
  fork(watchGetUsersRequest), 
  fork(watchCreateUserRequest), 
  fork(watchDeleteUserRequest) 
];

export default usersSagas;
