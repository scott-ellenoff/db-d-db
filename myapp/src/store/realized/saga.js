import { takeLatest, call, put } from "redux-saga/effects";
import { GET_REALIZED, GET_REALIZED_ASYNC } from "./action-types";
import { fetchService } from "../../utils";
import { realized } from "../../utils/path";

function* getRealizedAsync(action) {
  try {
    const response = yield call(fetchService, realized, "GET", action.payload);
    const payloadObject = {
      result: response.result,
      error: null,
    };
    yield put({
      type: GET_REALIZED_ASYNC,
      payload: payloadObject,
    });
  } catch (error) {
      const payloadObject = {
        result: error.response.data,
        error: null,
      };

      yield put({
        type: GET_REALIZED_ASYNC,
        payload: payloadObject,
      });
  }
}

export function* watchRealizedAsync() {
  yield takeLatest(GET_REALIZED, getRealizedAsync);
}
