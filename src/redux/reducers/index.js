import { combineReducers } from "redux";
import cars from "./cars";
// We can combine mutiple reducers using combineReducers
export default combineReducers({ cars });
