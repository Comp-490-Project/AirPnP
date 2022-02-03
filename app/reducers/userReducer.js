import {
  USER_LOCATION_GRANTED,
  USER_LOCATION_DENIED,
} from '../constants/types';

export const userLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOCATION_GRANTED:
      return {
        ...state,
        location: action.payload,
        loading: false,
      };
    case USER_LOCATION_DENIED:
      return {
        ...state,
        location: {},
        loading: false,
      };
    default:
      return state;
  }
};
