import { RESTROOMS_LOADED } from '../constants/types';
import { firebase } from '../firebase';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';

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
    type: RESTROOMS_LOADED,
    payload: restrooms,
  });
};
