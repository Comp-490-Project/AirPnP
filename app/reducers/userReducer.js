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
  USER_FEED_STATE_CHANGED,
  USER_FEED_STATE_CLEARED,
  USER_LOGOUT_FAIL,
  USER_VISITED_RESTROOMS_LOADED,
  USER_VISITED_ADDED,
  USER_VISITED_REMOVED,
} from '../constants/userTypes';

export const userLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOCATION_GRANTED:
      return {
        ...state,
        location: action.payload,
      };
    case USER_LOCATION_DENIED:
      return {
        ...state,
        location: {},
      };
    case USER_LOCATION_ERROR:
      return {
        ...state,
        location: {
          latitude: 34.2404,
          longitude: -118.5273,
        },
      };
    default:
      return state;
  }
};

export const userAuthReducer = (state = {}, action) => {
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
    case USER_LOGOUT_FAIL:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const userFeedReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FEED_STATE_CHANGED:
      return {
        ...state,
        userPosts: action.payload,
        loading: false,
      };
    case USER_FEED_STATE_CLEARED:
      return {
        ...state,
        userPosts: [],
        loading: true,
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
          (favorite) => favorite.geohash !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const userVisitedReducer = (state = { userVisited: [] }, action) => {
  switch (action.type) {
    case USER_VISITED_RESTROOMS_LOADED:
      return {
        ...state,
        userVisited: action.payload,
      };
    case USER_VISITED_ADDED:
      return {
        ...state,
        userVisited: [...state.userVisited, action.payload],
      };
    case USER_VISITED_REMOVED:
      return {
        ...state,
        userVisited: state.userVisited.filter(
          (visit) => visit.geohash !== action.payload
        ),
      };
    default:
      return state;
  }
};
