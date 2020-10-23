import { takeLatest, call, put } from "redux-saga/effects";
import { SERVER_ACTIVE, SERVER_ACTIVE_ASYNC } from "./action-types";
import { fetchService } from "../../utils";
import { server } from "../../utils/path";

function* serverAsync(action) {
  try {
    const response = yield call(fetchService, server, "GET", action.payload);
    const payloadObject = {
      result: response.result,
      error: null,
    };
    yield put({
      type: SERVER_ACTIVE_ASYNC,
      payload: payloadObject,
    });
  } catch (error) {
      const payloadObject = {
        result: error.response.data,
        error: null,
      };

      yield put({
        type: SERVER_ACTIVE_ASYNC,
        payload: payloadObject,
      });
  }
}

export function* watchServerAsync() {
  yield takeLatest(SERVER_ACTIVE, serverAsync);
}
