import { watchLoginAsync } from "./login/saga";
import { watchServerAsync } from "./connection/saga";
import { all, fork } from "redux-saga/effects";

export default function* () {
  yield all([
    fork(watchLoginAsync), 
    fork(watchServerAsync), 
  ]);
}
