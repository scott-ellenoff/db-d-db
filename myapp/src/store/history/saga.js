import { takeLatest, call, put } from "redux-saga/effects";
import { GET_HISTORY, GET_HISTORY_ASYNC } from "./action-types";
import { fetchService } from "../../utils";
import { history } from "../../utils/path";

function* historyAsync(action) {
  try {
    const response = yield call(fetchService, history, "GET", action.payload);
    console.log(response)
    const payloadObject = {
      result: response.result,
      error: null,
    };
    yield put({
      type: GET_HISTORY_ASYNC,
      payload: payloadObject,
    });
  } catch (error) {
      const payloadObject = {
        result: error.response.data,
        error: null,
      };

      yield put({
        type: GET_HISTORY_ASYNC,
        payload: payloadObject,
      });
  }
}

export function* watchHistoryAsync() {
  yield takeLatest(GET_HISTORY, historyAsync);
}
