import { takeEvery, put } from 'redux-saga/effects';
import { LOGIN, LOGOUT } from '../actions/auth';

import { API } from '../../configs';
import { axiosPost } from '../../utils/axios';

function* login({ params }) {
  const { email, password } = params;
  const { success, data } = yield axiosPost(API.AUTH.LOGIN, {
    email,
    password,
  });
  if (success) {
    if(data.success) {
      yield put({
        type: LOGIN.SUCCESS,
        data: {user: data.user, tokens: data.tokens},
      });
    } else {
      yield put({
        type: LOGIN.FAIL,
        data: {},
      });
    }
  } else {
    yield put({
      type: LOGIN.FAIL,
      data: {},
    });
  }
}

function* logout({ params }) {
  const { refreshToken } = params;
  const { success, data } = yield axiosPost(API.AUTH.LOGOUT, {
    refreshToken
  });
}

export default function* () {
  yield takeEvery(LOGIN.REQUEST, login);
  yield takeEvery(LOGOUT, logout);
}
