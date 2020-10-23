import { combineReducers } from "redux";
import loggedIn from "./session/reducer";
import login from "./login/reducer";
import serverActive from "./connection/reducer";


const reducers = combineReducers({
  login,
  loggedIn,
  serverActive
});

export default reducers;
