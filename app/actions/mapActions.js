import {
  RESTROOM_MARKERS_LOADED,
  MARKER_ATTRIBUTES_SET,
  MARKER_IMAGES_SET,
  MAP_CENTER_CHANGE,
} from '../constants/mapTypes';
import { firebase } from '../firebase';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';

// Get restrooms around passed in latitude and longitude
export const getRestrooms = (latitude, longitude) => async (dispatch) => {
  const center = [latitude, longitude];
  const radiusInM = 2500;
  const bounds = geohashQueryBounds(center, radiusInM);
  const promises = [];

  for (const b of bounds) {
    const q = firebase
      .firestore()
      .collection('Los-Angeles')
      .orderBy('geohash')
      .startAt(b[0])
      .endAt(b[1]);
    promises.push(q.get());
  }

  const snapshots = await Promise.all(promises);
  const restrooms = [];

  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const lat = doc.get('latitude');
      const lng = doc.get('longitude');

      const distanceInM = distanceBetween([lat, lng], center) * 1000;

      if (distanceInM <= radiusInM) {
        restrooms.push(doc.data());
      }
    }
  }

  dispatch({
    type: RESTROOM_MARKERS_LOADED,
    payload: restrooms,
  });
};

// Set current marker attributes
export const setMarkerAttributes = (marker) => async (dispatch, getState) => {
  const { description, geohash, latitude, longitude, meanRating, name } =
    marker;

  const { userFavorites } = getState().userFavorites;

  // Check if restroom is favorited by the user
  const isFavorited =
    userFavorites && userFavorites.includes(geohash) ? true : false;

  dispatch({
    type: MARKER_ATTRIBUTES_SET,
    payload: {
      description,
      geohash,
      latitude,
      longitude,
      meanRating,
      name,
      isFavorited,
    },
  });

  // Set the center point of the map to the current marker
  dispatch(setCenterLocation(latitude, longitude));

  const { items: imagesRef } = await firebase.storage().ref(geohash).list();

  const images = [];
  // Get the array of image references as a JSON object
  imagesRef.forEach((imageRef) =>
    // Get the download URL using the path field of the image JSON object first && is temporary till work is fixed
    firebase
      .storage()
      .ref(imageRef._delegate._location.path_)
      .getDownloadURL()
      .then((url) => {
        images.push(url);
      })
      .then(() =>
        dispatch({
          type: MARKER_IMAGES_SET,
          payload: images,
        })
      )
  );
};

// Set the center point of the map to the new center coordinates
export const setCenterLocation = (latitude, longitude) => (dispatch) => {
  dispatch({
    type: MAP_CENTER_CHANGE,
    payload: {
      latitude,
      longitude,
    },
  });
};

// @todo
// Add a new restroom location
// export const addRestroom = () => async (dispatch) => {
//   const restroomRef = firebase.firestore().collection('Los-Angeles');

//   await restroomRef
//     .doc(geohashForLocation([mapRegion.latitude, mapRegion.longitude]))
//     .set({
//       description: description,
//       geohash: geohashForLocation([mapRegion.latitude, mapRegion.longitude]),
//       latitude: mapRegion.latitude,
//       longitude: mapRegion.longitude,
//       name: title,
//       rating: userRating,
//     });
//   setRestrooms((restrooms) => [
//     ...restrooms,
//     {
//       description: description,
//       geohash: geohashForLocation([mapRegion.latitude, mapRegion.longitude]),
//       latitude: mapRegion.latitude,
//       longitude: mapRegion.longitude,
//       name: title,
//       rating: userRating,
//     },
//   ]);
//   navigation.navigate('home');
// }
