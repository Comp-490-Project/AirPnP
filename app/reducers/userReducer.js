import {
  USER_LOCATION_GRANTED,
  USER_LOCATION_DENIED,
  USER_LOCATION_ERROR,
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
    case USER_LOCATION_ERROR:
      return {
        ...state,
        location: {
          latitude: 37.422131,
          longitude: -122.084801,
        },
        loading: false,
      };
    default:
      return state;
  }
};
