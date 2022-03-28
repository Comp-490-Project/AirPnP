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
          latitude: 37.422131,
          longitude: -122.084801,
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
    default:
      return state;
  }
};

export const userFeedReducer = (state = {}, action)=>{
  switch(action.type){
    case USER_FEED_STATE_CHANGED:
      return{
        ...state,
        userPosts: action.payload,
        loading: false
      }
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
