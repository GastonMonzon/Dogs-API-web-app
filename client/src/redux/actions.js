import { SET_ALL_DOGS, SET_ALL_TEMPERAMENTS, SEARCH_DOG_BY_NAME, SELECT_DOGS_PER_PAGE, TOGGLE_METRIC, HOME_SEARCH_TEMPERAMENT, ORDER_BY, ORDER, FILTER, FORM_SEARCH_TEMPERAMENT, } from "./action-types"
import axios from "axios";

export const setAllDogs = (dogs) => {
  return { type: SET_ALL_DOGS, payload: dogs };
}
export const setAllTemperaments = (temperaments) => {
  return { type: SET_ALL_TEMPERAMENTS, payload: temperaments };
}
export const searchByName = (dog) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${import.meta.env.RAILWAY}/dogs/query/?name=${dog}`);
      dispatch({ type: SEARCH_DOG_BY_NAME, payload: { dogs: data, search: dog } });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const dogsPerPage = (value) => {
  return { type: SELECT_DOGS_PER_PAGE, payload: value };
}
export const searchTemperament = (temperament, isHome) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${import.meta.env.RAILWAY}/temperaments/query/?name=${temperament}`);
      if (isHome) {
        return dispatch({ type: HOME_SEARCH_TEMPERAMENT, payload: { temperaments: data, search: temperament } });
      }
      return dispatch({ type: FORM_SEARCH_TEMPERAMENT, payload: { temperaments: data, search: temperament } });
    } catch (error) {
      console.log(error);
    }
  }
}
export const toggleMetric = () => {
  return { type: TOGGLE_METRIC }
}
export const filters = (filterData) => {
  return { type: FILTER, payload: filterData }
}
export const orderDirection = () => {
  return { type: ORDER }
}
export const orderBy = (orderData) => {
  return { type: ORDER_BY, payload: orderData }
}