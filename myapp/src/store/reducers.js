import { combineReducers } from "redux";
import loggedIn from "./session/reducer";
import login from "./login/reducer";
import serverActive from "./connection/reducer";
import getAverage from "./average/reducer";
import getEffective from "./effective/reducer"



const reducers = combineReducers({
  login,
  loggedIn,
  serverActive,
  getAverage,
  getEffective
});

export default reducers;
