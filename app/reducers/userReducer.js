import {
  USER_LOCATION_GRANTED,
  USER_LOCATION_DENIED,
  USER_LOCATION_ERROR,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_FAVORITES_LOADED,
  USER_FAVORITE_ADDED,
  USER_FAVORITE_REMOVED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants/userTypes";

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

export const userStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const userFavoritesReducer = (state = { userFavorites: [] }, action) => {
  switch (action.type) {
    case USER_FAVORITES_LOADED:
      return {
        ...state,
        userFavorites: action.payload,
        userFavoritesLoaded: true,
      };
    case USER_FAVORITE_ADDED:
      return {
        ...state,
        userFavorites: [...state.userFavorites, action.payload],
      };
    case USER_FAVORITE_REMOVED:
      return {
        ...state,
        userFavorites: state.userFavorites.filter(
          (favorite) => favorite !== action.payload
        ),
      };
    default:
      return state;
  }
};
