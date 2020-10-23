import { takeLatest, call, put } from "redux-saga/effects";
import { LOGIN, LOGIN_ASYNC } from "./action-types";
import { fetchService } from "../../utils";
import { login } from "../../utils/path";
import { navigate } from "@reach/router";

function* loginAsync(action) {
  try {
    const response = yield call(fetchService, login, "POST", action.payload);
    const payloadObject = {
      result: response.result,
      error: null,
    };
    yield put({
      type: LOGIN_ASYNC,
      payload: payloadObject,
    });
  } catch (error) {
    if (error.response === undefined) navigate("/error500");
    else {
      const payloadObject = {
        result: null,
        error: error.response.data,
      };

      yield put({
        type: LOGIN_ASYNC,
        payload: payloadObject,
      });
    }
  }
}

export function* watchLoginAsync() {
  yield takeLatest(LOGIN, loginAsync);
}
