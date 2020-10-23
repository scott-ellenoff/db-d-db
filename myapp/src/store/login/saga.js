import { takeLatest, call, put } from "redux-saga/effects";
import { LOGIN, LOGIN_ASYNC } from "./action-types";
import { fetchService } from "../../utils";
import { login } from "../../utils/path";

function* loginAsync(action) {
  try {
    const user_id = localStorage.getItem('user_id')
    const path = `${login}/${user_id}`
    const response = yield call(fetchService, path, "POST", action.payload);
    const payloadObject = {
      result: response.result,
      error: null,
    };
    yield put({
      type: LOGIN_ASYNC,
      payload: payloadObject,
    });
  } catch (error) {
      const payloadObject = {
        result: error.response.data,
        error: null,
      };

      yield put({
        type: LOGIN_ASYNC,
        payload: payloadObject,
      });
  }
}

export function* watchLoginAsync() {
  yield takeLatest(LOGIN, loginAsync);
}
