import {
  RESTROOM_MARKERS_LOADED,
  MARKER_ATTRIBUTES_SET,
  MARKER_IMAGES_SET,
  MAP_CENTER_CHANGE,
  RESTROOM_REVIEW_IMAGE_UPLOADED,
  RESTROOM_REVIEW_IMAGE_REMOVED,
  RESTROOM_REVIEW_STARS_CHANGED,
  RESTROOM_REVIEW_CLEAR,
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
//   navigation.navigate('Home');
// }

// Set the stars (Rating component) in review object
export const handleReviewStars = (stars) => {
  return {
    type: RESTROOM_REVIEW_STARS_CHANGED,
    payload: stars,
  };
};

// Set or remove image in Review Screen user interface
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

// Submit restroom review
export const submitReview = (review) => async (dispatch, getState) => {
  // Submit the review  with the geohash and check if user has a current review using userID
  const {
    user: { uid },
  } = getState().userAuth;
  const query = await firebase.firestore().collection('Los-Angeles');
  let restroomInformation;

  query
    .doc(review.hashKey)
    .get()
    .then((querySnapshot) => {
      restroomInformation = querySnapshot.data();
      // If it doesnt have any reviews, create review array, meanRating field and add to restroom
      if (!restroomInformation.reviews) {
        query.doc(review.hashKey).update({
          meanRating: review.userRating,
          reviews: firebase.firestore.FieldValue.arrayUnion({
            Comment: review.comment,
            Rating: review.userRating,
            userID: uid,
          }),
        });
      } else {
        // Calculate the new meanRating if this user has not reviewed before
        let newMeanRating =
          (restroomInformation.reviews.length * restroomInformation.meanRating +
            review.userRating) /
          (restroomInformation.reviews.length + 1);
        let oldMeanRating;
        // Now check if user has reviewed this restroom before
        for (let i = 0; i < restroomInformation.reviews.length; i++) {
          if (uid === restroomInformation.reviews[i].userID) {
            oldMeanRating = restroomInformation.reviews[i].Rating;
            query.doc(review.hashKey).update({
              reviews: firebase.firestore.FieldValue.arrayRemove({
                Comment: restroomInformation.reviews[i].Comment,
                Rating: restroomInformation.reviews[i].Rating,
                userID: restroomInformation.reviews[i].userID,
              }),
            });
            // Since it was reviewed by this user before,
            //  we update the new mean calculation reflecting the new rating
            newMeanRating =
              (restroomInformation.reviews.length *
                restroomInformation.meanRating +
                review.userRating -
                oldMeanRating) /
              restroomInformation.reviews.length;
          }
        }

        query.doc(review.hashKey).update({
          meanRating: newMeanRating,
          reviews: firebase.firestore.FieldValue.arrayUnion({
            Comment: review.comment,
            Rating: review.userRating,
            userID: uid,
          }),
        });
      }
    });

  if (review.imageSource) {
    const response = await fetch(review.imageSource);
    // Responsible for containing the URI's data in bytes
    const blob = await response.blob();
    const ref = firebase.storage().ref(review.hashKey).child(uid);
    ref.put(blob);
  }

  dispatch({
    type: RESTROOM_REVIEW_CLEAR,
  });
};
