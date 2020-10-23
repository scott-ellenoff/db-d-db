import { watchLoginAsync } from "./login/saga";
import { watchServerAsync } from "./connection/saga";
import { watchAverageAsync } from "./average/saga";
import { watchEffectiveAsync } from "./effective/saga";
import { watchEndPosAsync } from "./endPositions/saga";
import {watchRealizedAsync} from "./realized/saga"
import { all, fork } from "redux-saga/effects";

export default function* () {
  yield all([
    fork(watchLoginAsync), 
    fork(watchServerAsync), 
    fork(watchAverageAsync),
    fork(watchEffectiveAsync),
    fork(watchEndPosAsync),
    fork(watchRealizedAsync)
  ]);
}
