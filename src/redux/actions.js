import { GET_CARS,  ERROR_CARS } from "./actionTypes";
import { sendRequest } from "../services/sendRequest";

export const getCars = (url,data) => (dispatch) => {
  sendRequest(url,data).then((data) => {
    dispatch({ type: GET_CARS, payload: data?.Results ? data.Results : [] });
  }).catch(err => {
    console.error("Error: ", err)
    dispatch({ type: ERROR_CARS, payload: err });
  })
}
