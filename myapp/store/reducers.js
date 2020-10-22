import { combineReducers } from "redux";
import loggedIn from "./session/reducer";




const reducers = combineReducers({
  loggedIn,
});

export default reducers;
