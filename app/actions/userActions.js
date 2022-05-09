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
  USER_LOGOUT_FAIL,
  USER_FAVORITES_LOADED,
  USER_FAVORITE_ADDED,
  USER_FAVORITE_REMOVED,
  RESTROOM_MARKER_FAVORITED,
  RESTROOM_MARKER_UNFAVORITED,
  USER_ADDED_RESTROOMS_LOADED,
  USER_ADDED_RESTROOM_ADDED,
  USER_VISITED_RESTROOMS_LOADED,
  USER_VISITED_ADDED,
  USER_VISITED_REMOVED,
  USER_VISITED_CLEAR,
  RESTROOM_MARKER_VISITED,
  RESTROOM_MARKER_UNVISITED,
  USER_FEED_STATE_CHANGED,
  USER_FEED_STATE_CLEARED,
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

// Logout user
export const logout = (user) => (dispatch) => {
  try {
    dispatch({
      type: USER_LOGGED_OUT,
    });

    dispatch({
      type: USER_VISITED_CLEAR,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
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
export const getUserFeed = (geohash) => async (dispatch) => {
  //Action to obtain feed for a specific restroom utilzing the geohash prop.
  const postsDocRef = firebase.firestore().collection('posts').doc(geohash);
  const query = await postsDocRef.get();
  const docData = query.data();

  if (docData) {
    const userPosts = docData.userPosts; //Reference array fieldValue in doc & set it to userPosts
    dispatch({
      //Dispatch posts array
      type: USER_FEED_STATE_CHANGED,
      payload: userPosts,
    });
  } else {
    dispatch({
      //Dispatch posts array
      type: USER_FEED_STATE_CHANGED,
      payload: [],
    });
  }
};

// Clear user feed
export const clearUserFeed = () => {
  return {
    type: USER_FEED_STATE_CLEARED,
  };
};

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

// Get user added restrooms (development: testing, production: Los-Angeles)
export const getUserAddedRestrooms = () => async (dispatch, getState) => {
  const { user } = getState().userAuth;

  const addedRRRef = firebase.firestore().collection('testing');
  const addedRRQuery = addedRRRef.where('user', '==', user.uid);
  const addedRRData = await addedRRQuery.get();

  const addedRestrooms = [];
  addedRRData.forEach((addedRR) => addedRestrooms.push(addedRR));

  dispatch({
    type: USER_ADDED_RESTROOMS_LOADED,
    payload: addedRestrooms,
  });
};

// Add user added restroom to state array
export const addUserAddedRestroom = (restroom) => {
  return {
    type: USER_ADDED_RESTROOM_ADDED,
    payload: restroom,
  };
};

// Get user visited restrooms
export const getUserVisitedRestrooms = () => async (dispatch, getState) => {
  // Get current user
  const { user } = getState().userAuth;

  // Get reference to user document and toilet collection
  const userDocRef = firebase.firestore().collection('users').doc(user.uid);
  const restroomsRef = firebase.firestore().collection('Los-Angeles');

  const snapshot = await userDocRef.get();

  const { visited } = snapshot.data();

  if (visited) {
    const userVisited = [];

    for (const visit of visited) {
      const visitedRestroom = await restroomsRef.doc(visit).get();
      userVisited.push(visitedRestroom.data());
    }

    dispatch({
      type: USER_VISITED_RESTROOMS_LOADED,
      payload: userVisited,
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

// Add or remove user's visited restroom
export const visitHandler = (geohash) => async (dispatch, getState) => {
  // Get current user and visited restrooms
  const { user } = getState().userAuth;
  const { userVisited } = getState().userVisited;

  // Get current restroom marker geohash for validation of unchecking visited in UI
  const { geohash: markerGeohash } = getState().restroomMarker;

  const visitedFound = userVisited.find((visited) => visited.geohash == geohash)
    ? true
    : false;

  // If not visited, mark as visited
  if (!visitedFound) {
    // Add visited to Firebase
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        visited: firebase.firestore.FieldValue.arrayUnion(geohash),
      });

    // Update UI for current marker (restroom info)
    dispatch({
      type: RESTROOM_MARKER_VISITED,
    });

    // Get reference to new visited restroom
    const newVisitedRef = firebase
      .firestore()
      .collection('Los-Angeles')
      .doc(geohash);

    // Get data of new visited restroom
    const newVisitData = await newVisitedRef.get();

    // Add new visited to userVisited array
    dispatch({
      type: USER_VISITED_ADDED,
      payload: newVisitData.data(),
    });
  } else {
    // If already visited, remove as visited
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        visited: firebase.firestore.FieldValue.arrayRemove(geohash),
      });

    // Check to make sure Visited Screen and Restroom Info geohash refer to same restroom
    if (geohash === markerGeohash) {
      // Refresh UI to show uncolored visited icon
      dispatch({
        type: RESTROOM_MARKER_UNVISITED,
      });
    }

    // Remove visited from userVisited array
    dispatch({
      type: USER_VISITED_REMOVED,
      payload: geohash,
      loading: false,
    });
  }
};
