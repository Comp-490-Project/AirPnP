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
  USER_FEED_STATE_CHANGED,
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

//Get all posts posted at a specified restroom
export const getUserFeed = (geohash) => async (dispatch) =>{ //Action to obtain feed for a specific restroom utilzing the geohash prop.
  const postsDocRef = firebase.firestore().collection('posts').doc(geohash);
  const query = await postsDocRef.get();
  const docData = query.data();
  const userPosts = docData.userPosts; //Reference array fieldValue in doc & set it to userPosts

  dispatch({ //Dispatch posts array 
      type: USER_FEED_STATE_CHANGED,
      payload: userPosts
    })
}

// Get user favorites
export const getUserFavorites = () => async (dispatch, getState) => {
  // Get current user
  const { user } = getState().userAuth;

  // Get references to user document and restrooms collection
  const userDocRef = firebase.firestore().collection('users').doc(user.uid);
  const restroomsRef = firebase.firestore().collection('Los-Angeles');

  // Execute query on user document reference
  const query = await userDocRef.get();

  const { favorites } = query.data();

  if (favorites) {
    const userFavorites = [];

    // For each favorite (geohash), query the corresponding restroom document
    for (const favorite of favorites) {
      const favoriteRestroom = await restroomsRef.doc(favorite).get();
      userFavorites.push(favoriteRestroom.data());
    }

    dispatch({
      type: USER_FAVORITES_LOADED,
      payload: userFavorites,
    });
  }
};

// Add or remove user's favorite
export const favoriteHandler = (geohash) => async (dispatch, getState) => {
  // Get current user and favorites
  const { user } = getState().userAuth;
  const { userFavorites } = getState().userFavorites;

  // Get current restroom marker geohash for validation of removing filled heart from UI
  const { geohash: markerGeohash } = getState().restroomMarker;

  const favoriteFound = userFavorites.find(
    (userFavorite) => userFavorite.geohash == geohash
  )
    ? true
    : false;

  // If not favorited, add as favorite
  if (!favoriteFound) {
    // Add favorite to Firebase
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(geohash),
      });

    // Refresh UI to show red heart
    dispatch({
      type: RESTROOM_MARKER_FAVORITED,
    });

    // Get reference to new favorite restroom
    const newFavoriteRef = firebase
      .firestore()
      .collection('Los-Angeles')
      .doc(geohash);

    // Get data of new favorite restroom
    const newFavoriteData = await newFavoriteRef.get();

    // Add new favorite to userFavorites array
    dispatch({
      type: USER_FAVORITE_ADDED,
      payload: newFavoriteData.data(),
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

    // Check to make sure Favorites Screen and Map Screen geohash refer to same restroom
    if (geohash === markerGeohash) {
      // Refresh UI to show unfilled heart
      dispatch({
        type: RESTROOM_MARKER_UNFAVORITED,
      });
    }

    // Remove favorite from userFavorites array
    dispatch({
      type: USER_FAVORITE_REMOVED,
      payload: geohash,
      loading: false,
    });
  }
};
