import { takeLatest, put, delay } from "@redux-saga/core/effects";
import {
  GET_USER_INFO_INIT,
  handleGetUserInfoSuccess,
  handleGetUserInfoError
} from "./githubActions";
import { getUserInfo } from "./githubApi";
import { AnyAction } from "redux";

export function* fetchUserInfo(action: AnyAction) {
  yield delay(250);
  try {
    const userInfo = yield getUserInfo(action.payload);
    yield put(handleGetUserInfoSuccess(userInfo));
  } catch (e) {
    yield put(handleGetUserInfoError());
  }
}

function* githubSaga() {
  yield takeLatest(GET_USER_INFO_INIT, fetchUserInfo);
}

export default githubSaga;
