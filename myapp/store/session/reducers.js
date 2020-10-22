import { combineReducers } from "redux";
import registration from "./registration/reducer";
import login from "./login/reducer";
import professionRequest from "./profession/reducer";
import loggedIn from "./session/reducer";
import userInfo from "./getUser/reducer";
import getWakatime from './wakatime/reducer';
import getLastReport from './reports/getReports/reducer';
import postReport from './reports/postReports/reducer';
import getActiveSprint from './sprints/getSprints/reducer';



const reducers = combineReducers({
  registration,
  login,
  professionRequest,
  loggedIn,
  userInfo,
  getWakatime,
  getLastReport,
  postReport,
  getActiveSprint
});

export default reducers;
