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
  RESTROOM_REVIEW_EDITED,
  RESTROOM_REVIEW_ADDED,
  RESTROOM_REVIEW_CLEAR,
  RESTROOM_REVIEW_DATA_EDITED,
  RESTROOM_REVIEW_DATA_ADDED,
  RESTROOM_MARKER_ADDED,
} from '../constants/restroomTypes';
import { firebase } from '../firebase';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';

// Get restrooms around passed in latitude and longitude
export const getRestrooms =
  (latitude, longitude) => async (dispatch, getState) => {
    const { location } = getState().userLocation;
    const center = [latitude, longitude];
    var radiusInM = 2500;
    var bounds = geohashQueryBounds(center, radiusInM);
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

    var snapshots = await Promise.all(promises);
    const restrooms = [];
    let closestRestroom;
    let closestMarker;

    // If no restrooms, increase radius of search
    if (snapshots[0].docs.length == 0) {
      radiusInM = 6100;
      bounds = geohashQueryBounds(center, radiusInM);
      for (const b of bounds) {
        const q = firebase
          .firestore()
          .collection('Los-Angeles')
          .orderBy('geohash')
          .startAt(b[0])
          .endAt(b[1]);
        promises.push(q.get());
      }
      snapshots = await Promise.all(promises);
    }

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = doc.get('latitude');
        const lng = doc.get('longitude');
        var restroomInfo;

        if (!closestRestroom) {
          closestRestroom = [lat, lng];
        }

        // Distance to the current closest restroom SO FAR
        const distanceToClosestSoFar =
          (distanceBetween(closestRestroom, center) +
            distanceBetween(center, [location.latitude, location.longitude])) *
          1000;

        // Distance beteween CURRENT restroom and center plus the distance between your location and center
        const totalDistanceInM =
          (distanceBetween([lat, lng], center) +
            distanceBetween(center, [location.latitude, location.longitude])) *
          1000;

        // Distance from search center
        const distanceFromCenterInM =
          distanceBetween([lat, lng], center) * 1000;

        // Handles whether restroom is within radius of search center (or location center)
        if (distanceFromCenterInM <= radiusInM) {
          restroomInfo = doc.data();
          restroomInfo.distance = Math.round(totalDistanceInM * 3.28084);
          restrooms.push(restroomInfo);
        }

        // Handles whether distance to CURRENT restroom is less than that of the closest restroom found SO FAR
        if (totalDistanceInM < distanceToClosestSoFar) {
          closestRestroom = [lat, lng];
          closestMarker = doc.data();
          closestMarker.distance = Math.round(totalDistanceInM * 3.28084);
        }
      }
    }

    dispatch(setMarkerAttributes(closestMarker));

    dispatch({
      type: RESTROOM_DIRECTIONS_CHANGED,
      payload: closestRestroom.join(', '),
    });

    dispatch({
      type: RESTROOM_MARKERS_LOADED,
      payload: restrooms,
    });
  };

// Set current marker attributes
export const setMarkerAttributes = (marker) => async (dispatch, getState) => {
  const {
    address,
    description,
    geohash,
    latitude,
    longitude,
    meanRating,
    reviews,
    name,
    distance,
  } = marker;

  const { userFavorites } = getState().userFavorites;
  const { userVisited } = getState().userVisited;

  // Check if restroom is favorited by the user
  const isFavorited = userFavorites.find(
    (userFavorite) => userFavorite.geohash === geohash
  )
    ? true
    : false;

  // Check if restroom is visited by the user
  const isVisited = userVisited.find((visited) => visited.geohash === geohash)
    ? true
    : false;

  dispatch({
    type: MARKER_ATTRIBUTES_SET,
    payload: {
      address,
      description,
      geohash,
      latitude,
      longitude,
      meanRating,
      reviews,
      name,
      isFavorited,
      isVisited,
      distance,
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

  const newDate = new Date().toString().slice(4, 15).split('');
  newDate.splice(6, 0, ',');
  const createdAt = newDate.join('');

  // Get reference to Firebase document
  const docRef = firebase.firestore().collection('Los-Angeles').doc(geohash);
  const query = await docRef.get();
  const restroomDoc = query.data();
  const restroomReviews = restroomDoc.reviews;

  // Calculate new meanRating assuming user has not yet reviewed
  let newRating =
    (restroomDoc.meanRating * restroomReviews?.length + rating) /
    (restroomReviews?.length + 1);

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

      // Update doc with new meanRating and add new/updated review
      await docRef.update({
        meanRating: newRating,
        reviews: firebase.firestore.FieldValue.arrayUnion({
          comment,
          rating,
          createdAt,
          user,
        }),
      });

      dispatch({
        type: RESTROOM_REVIEW_DATA_EDITED,
        payload: {
          geohash,
          comment,
          rating,
          newRating,
          createdAt,
          user,
        },
      });

      if (image) {
        const response = await fetch(image);
        // Responsible for containing the URI's data in bytes
        const blob = await response.blob();
        const pathRef = firebase.storage().ref(geohash).child(user);
        await pathRef.put(blob);

        const downloadURL = await firebase
          .storage()
          .ref(geohash)
          .child(user)
          .getDownloadURL();

        dispatch({
          type: RESTROOM_REVIEW_EDITED,
          payload: {
            comment,
            rating,
            newRating,
            createdAt,
            image: image && downloadURL,
            user,
          },
        });

        dispatch({
          type: RESTROOM_REVIEW_CLEAR,
        });

        return;
      } else {
        dispatch({
          type: RESTROOM_REVIEW_EDITED,
          payload: {
            comment,
            rating,
            newRating,
            createdAt,
            user,
          },
        });

        dispatch({
          type: RESTROOM_REVIEW_CLEAR,
        });

        return;
      }
    }
  }

  // Update doc with new meanRating and add new/updated review
  await docRef.update({
    meanRating: newRating,
    reviews: firebase.firestore.FieldValue.arrayUnion({
      comment,
      rating,
      createdAt,
      user,
    }),
  });

  dispatch({
    type: RESTROOM_REVIEW_DATA_ADDED,
    payload: {
      geohash,
      comment,
      rating,
      newRating,
      createdAt,
      user,
    },
  });

  if (image) {
    const response = await fetch(image);
    // Responsible for containing the URI's data in bytes
    const blob = await response.blob();
    const pathRef = firebase.storage().ref(geohash).child(user);
    await pathRef.put(blob);

    const downloadURL = await firebase
      .storage()
      .ref(geohash)
      .child(user)
      .getDownloadURL();

    dispatch({
      type: RESTROOM_REVIEW_ADDED,
      payload: {
        comment,
        rating,
        newRating,
        createdAt,
        image: image && downloadURL,
        user,
      },
    });
  } else {
    dispatch({
      type: RESTROOM_REVIEW_ADDED,
      payload: {
        comment,
        rating,
        newRating,
        createdAt,
        user,
      },
    });
  }

  dispatch({
    type: RESTROOM_REVIEW_CLEAR,
  });
};
