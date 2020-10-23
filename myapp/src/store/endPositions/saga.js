import { takeLatest, call, put } from "redux-saga/effects";
import { GET_END_POSITIONS, GET_END_POSITIONS_ASYNC } from "./action-types";
import { fetchService } from "../../utils";
import { endpos } from "../../utils/path";

function* endPosAsync(action) {
  try {
    const response = yield call(fetchService, endpos, "GET", action.payload);
    const payloadObject = {
      result: response.result,
      error: null,
    };
    yield put({
      type: GET_END_POSITIONS_ASYNC,
      payload: payloadObject,
    });
  } catch (error) {
      const payloadObject = {
        result: error.response.data,
        error: null,
      };

      yield put({
        type: GET_END_POSITIONS_ASYNC,
        payload: payloadObject,
      });
  }
}

export function* watchEndPosAsync() {
  yield takeLatest(GET_END_POSITIONS, endPosAsync);
}
