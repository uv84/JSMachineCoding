import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { 
  fetchUsersRequest,
  fetchUsersSuccess, 
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure
} from '../slices/userSlice';
import type { User } from '../slices/types';
import { api } from './api';

// Worker saga: fetch users
function* fetchUsersSaga() {
  try {
    const users: User[] = yield call(api.fetchUsers);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error instanceof Error ? error.message : 'Failed to fetch users'));
  }
}

// Worker saga: add user
function* addUserSaga(action: PayloadAction<Omit<User, 'id'>>) {
  try {
    const newUser: User = yield call(api.addUser, action.payload);
    yield put(addUserSuccess(newUser));
  } catch (error) {
    yield put(addUserFailure(error instanceof Error ? error.message : 'Failed to add user'));
  }
}

// Watcher saga: watches for action dispatches
export function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeEvery(addUserRequest.type, addUserSaga);
}