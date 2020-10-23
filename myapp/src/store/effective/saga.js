import { takeLatest, call, put } from "redux-saga/effects";
import { GET_EFFECTIVE, GET_EFFECTIVE_ASYNC } from "./action-types";
import { fetchService } from "../../utils";
import { effective } from "../../utils/path";

function* getEffectiveAsync(action) {
  try {
    const response = yield call(fetchService, effective, "GET", action.payload);
    const payloadObject = {
      result: response.result,
      error: null,
    };
    yield put({
      type: GET_EFFECTIVE_ASYNC,
      payload: payloadObject,
    });
  } catch (error) {
      const payloadObject = {
        result: error.response.data,
        error: null,
      };

      yield put({
        type: GET_EFFECTIVE_ASYNC,
        payload: payloadObject,
      });
  }
}

export function* watchEffectiveAsync() {
  yield takeLatest(GET_EFFECTIVE, getEffectiveAsync);
}
