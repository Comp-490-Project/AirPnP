import {
  USER_LOCATION_GRANTED,
  USER_LOCATION_DENIED,
  USER_LOCATION_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_FAVORITES_LOADED,
  USER_FAVORITE_ADDED,
  USER_FAVORITE_REMOVED,
  USERS_FAVORITE_RESTROOMS_LOADED,
  USER_FAVORITE_RESTROOM_REMOVED,
} from '../constants/userTypes';

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
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
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
    default:
      return state;
  }
};

export const userFavoritesReducer = (state = { userFavorites: [],userFavoriteRestrooms: [] }, action) => {
  switch (action.type) {
    case USER_FAVORITES_LOADED:
      return {
        ...state,
        userFavorites: action.payload,
        userFavoritesLoaded: true,
      };
      case USERS_FAVORITE_RESTROOMS_LOADED:
        return {
          ...state,
          userFavoriteRestrooms: action.payload,
          usersFavoriteRestroomsLoaded: true,
        };
        case USER_FAVORITE_RESTROOM_REMOVED:
          return {
            ...state,
            userFavoriteRestrooms: state.userFavoriteRestrooms.filter(
              (favorite) => favorite !== action.payload
              
            ),//userFavoritesLoaded: false,
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
        //userFavoritesLoaded: false,
      };
    default:
      return state;
  }
};
