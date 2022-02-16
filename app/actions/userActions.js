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
  RESTROOM_MARKER_FAVORITED,
  RESTROOM_MARKER_UNFAVORITED,
} from '../constants/userTypes';
import { firebase } from '../firebase';
import * as Location from 'expo-location';

// Get user location
export const getUserLocation = () => async (dispatch) => {
  try {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (granted) {
      const lastKnownPosition = await Location.getLastKnownPositionAsync();

      if (!lastKnownPosition) {
        dispatch({ type: USER_LOCATION_ERROR });
        return;
      }

      const {
        coords: { latitude, longitude },
      } = lastKnownPosition;

      dispatch({
        type: USER_LOCATION_GRANTED,
        payload: {
          latitude,
          longitude,
        },
      });
    } else {
      dispatch({
        type: USER_LOCATION_DENIED,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Register User
export const register = (user) => (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    });
  }
};

// Login user
export const login = (user) => (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
};

// Check if user logged in
export const checkUserStatus = () => (dispatch) => {
  try {
    const user = firebase.auth().currentUser;
    //Check Auth Status
    if (user) {
      dispatch({
        type: USER_LOGGED_IN,
        payload: user,
      });
    } else {
      dispatch({
        type: USER_LOGGED_OUT,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Get user favorites
export const getUserFavorites = () => async (dispatch) => {
  const user = firebase.auth().currentUser;

  const query = await firebase.firestore().collection('users');
  query
    .doc(user.uid)
    .get()
    .then((querySnapshot) => {
      const favs = querySnapshot.data();
      if (favs.favorites) {
        const favorites = [];
        favs.favorites.forEach((favKey) => {
          favorites.push(favKey);
        });

        dispatch({
          type: USER_FAVORITES_LOADED,
          payload: favorites,
        });
      }
    });
};

// Add or remove user's favorite
export const favoriteHandler = (geohash) => async (dispatch, getState) => {
  const { user } = getState().userAuth;
  const { userFavorites } = getState().userFavorites;

  if (userFavorites) {
    // If not favorited, add as favorite
    if (!userFavorites.includes(geohash)) {
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          favorites: firebase.firestore.FieldValue.arrayUnion(geohash),
        });

      dispatch({
        type: RESTROOM_MARKER_FAVORITED,
      });

      dispatch({
        type: USER_FAVORITE_ADDED,
        payload: geohash,
      });
    } else {
      // If already favorited, remove as favorite
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          favorites: firebase.firestore.FieldValue.arrayRemove(geohash),
        });

      dispatch({
        type: RESTROOM_MARKER_UNFAVORITED,
      });

      dispatch({
        type: USER_FAVORITE_REMOVED,
        payload: geohash,
      });
    }
  }
};
