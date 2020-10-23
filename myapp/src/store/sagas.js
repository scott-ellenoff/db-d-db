import { watchLoginAsync } from "./login/saga";
import { all, fork } from "redux-saga/effects";

export default function* () {
  yield all([
    fork(watchLoginAsync), 
  ]);
}
