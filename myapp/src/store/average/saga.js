import { takeLatest, call, put } from "redux-saga/effects";
import { GET_AVERAGE, GET_AVERAGE_ASYNC } from "./action-types";
import { fetchService } from "../../utils";
import { average } from "../../utils/path";

function* getAverageAsync(action) {
  try {
    const response = yield call(fetchService, average, "GET", action.payload);
    console.log(response)
    const payloadObject = {
      result: response.result,
      error: null,
    };
    yield put({
      type: GET_AVERAGE_ASYNC,
      payload: payloadObject,
    });
  } catch (error) {
      const payloadObject = {
        result: error.response.data,
        error: null,
      };

      yield put({
        type: GET_AVERAGE_ASYNC,
        payload: payloadObject,
      });
  }
}

export function* watchAverageAsync() {
  yield takeLatest(GET_AVERAGE, getAverageAsync);
}
