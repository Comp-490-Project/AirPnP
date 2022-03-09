import {
  RESTROOM_MARKERS_LOADED,
  RESTROOM_DIRECTIONS_CHANGED,
  MARKER_ATTRIBUTES_SET,
  MARKER_IMAGES_SET,
  MAP_CENTER_CHANGE,
  RESTROOM_CREATE_LOCATION_CHANGED,
  RESTROOM_REVIEW_IMAGE_UPLOADED,
  RESTROOM_REVIEW_IMAGE_REMOVED,
  RESTROOM_REVIEW_STARS_CHANGED,
  RESTROOM_REVIEW_CLEAR,
  RESTROOM_MARKER_ADDED,
} from '../constants/restroomTypes';
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
  let closestRestroom;
  let closestMarker;
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const lat = doc.get('latitude');
      const lng = doc.get('longitude');
      
      if (!closestRestroom) {
        closestRestroom = [lat, lng];
      }

      const distanceInM = distanceBetween([lat, lng], center) * 1000;
      const closestDistance = distanceBetween(closestRestroom, center) * 1000;

      if (distanceInM <= radiusInM) {
        restrooms.push(doc.data());
      }

      if (distanceInM < closestDistance) {
        closestRestroom = [lat, lng];
        closestMarker = doc.data();
        setMarkerAttributes(closestMarker);
      }
    }
  }
  

  dispatch({
    type: RESTROOM_MARKERS_LOADED,
    payload: restrooms,
  });

  dispatch({
    type: RESTROOM_DIRECTIONS_CHANGED,
    payload: closestRestroom.join(', '),
  });
  
  
};

// Set current marker attributes
export const setMarkerAttributes = (marker) => async (dispatch, getState) => {
  const { description, geohash, latitude, longitude, meanRating, name } =
    marker;

  const { userFavorites } = getState().userFavorites;

  // Check if restroom is favorited by the user
  const isFavorited = userFavorites.find(
    (userFavorite) => userFavorite.geohash == geohash
  )
    ? true
    : false;

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

  dispatch({
    type: RESTROOM_DIRECTIONS_CHANGED,
    payload: [latitude, longitude].join(', '),
  });

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
export const setMapCenterLocation = (latitude, longitude) => (dispatch) => {
  dispatch({
    type: MAP_CENTER_CHANGE,
    payload: {
      latitude,
      longitude,
    },
  });
};

// Set restroom location for adding a restroom
export const setRestroomLocation = (location) => {
  return {
    type: RESTROOM_CREATE_LOCATION_CHANGED,
    payload: location,
  };
};

// Add a new restroom
export const addRestroom = (restroom) => async (dispatch) => {
  // @todo
  // Change this to Los-Angeles collection when ready for production
  const restroomRef = firebase.firestore().collection('testing');

  await restroomRef.doc(restroom.geohash).set({
    description: restroom.description,
    geohash: restroom.geohash,
    latitude: restroom.latitude,
    longitude: restroom.longitude,
    meanRating: restroom.meanRating,
    name: restroom.name,
    user: restroom.user,
  });

  if (restroom.image) {
    const response = await fetch(restroom.image);
    // Responsible for containing the URI's data in bytes
    const blob = await response.blob();
    const pathRef = firebase
      .storage()
      .ref(restroom.geohash)
      .child(restroom.user);
    await pathRef.put(blob);
  }

  delete restroom.image;
  delete restroom.user;

  dispatch({
    type: RESTROOM_MARKER_ADDED,
    payload: restroom,
  });

  dispatch({
    type: RESTROOM_REVIEW_CLEAR,
  });
};

// Set the stars (Rating component) in restroom object
export const handleReviewStars = (stars) => {
  return {
    type: RESTROOM_REVIEW_STARS_CHANGED,
    payload: stars,
  };
};

// Set or remove image in Review Screen or Add Screen user interface
export const handleImageInUI = (image) => {
  if (image) {
    return {
      type: RESTROOM_REVIEW_IMAGE_UPLOADED,
      payload: image,
    };
  } else {
    return {
      type: RESTROOM_REVIEW_IMAGE_REMOVED,
    };
  }
};

// Submit restroom review to Firebase
export const submitReview = (review) => async (dispatch, getState) => {
  // Get user from Redux auth slice
  const {
    user: { uid: user },
  } = getState().userAuth;

  const { geohash, comment, rating, image } = review;

  // Get reference to Firebase document
  const docRef = firebase.firestore().collection('Los-Angeles').doc(geohash);

  const query = await docRef.get();

  const restroomDoc = query.data();

  const restroomReviews = restroomDoc.reviews;

  // Calculate new meanRating assuming user has not yet reviewed
  let newRating =
    (restroomDoc.meanRating * restroomReviews?.length + rating) /
    (restroomReviews?.length + 1);

  if (restroomReviews) {
    // For each review, check if user has already reviewed
    for (const review of restroomReviews) {
      if (review.user === user) {
        // Remove previous review
        await docRef.update({
          reviews: restroomReviews.filter((review) => review.user !== user),
        });

        // Calculate new meanRating according to previous user review
        newRating =
          (restroomDoc.meanRating * restroomReviews.length -
            review.rating +
            rating) /
          restroomReviews.length;
      }
    }

    // Update doc with new meanRating and add new/updated review
    await docRef.update({
      meanRating: newRating,
      reviews: firebase.firestore.FieldValue.arrayUnion({
        comment,
        rating,
        user,
      }),
    });
  } else {
    // First review of restroom
    await docRef.update({
      meanRating: rating,
      reviews: firebase.firestore.FieldValue.arrayUnion({
        comment,
        rating,
        user,
      }),
    });
  }

  if (image) {
    const response = await fetch(image);
    // Responsible for containing the URI's data in bytes
    const blob = await response.blob();
    const pathRef = firebase.storage().ref(geohash).child(user);
    await pathRef.put(blob);
  }

  dispatch({
    type: RESTROOM_REVIEW_CLEAR,
  });
};
