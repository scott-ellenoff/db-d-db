import { combineReducers } from "redux";
import loggedIn from "./session/reducer";
import login from "./login/reducer";
import serverActive from "./connection/reducer";
import getAverage from "./average/reducer";
import getEffective from "./effective/reducer"
import getEndPosition from "./endPositions/reducer";
import getRealized from "./realized/reducer";
import getHistory from "./history/reducer";



const reducers = combineReducers({
  login,
  loggedIn,
  serverActive,
  getAverage,
  getEffective,
  getEndPosition,
  getRealized,
  getHistory
});

export default reducers;
