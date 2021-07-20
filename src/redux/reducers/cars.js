import { GET_CARS, ERROR_CARS } from "../actionTypes";

const initialState = {
  data: [],
  carsData: [],
  error:null,
  carsError:null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CARS: {
      return {
        ...state,
        carsData: action.payload
      };
    }
    case ERROR_CARS: {
      return {
        ...state,
        carsError: action.payload
      };
    }
    default:
      return state;
  }
}
