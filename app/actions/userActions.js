import {
  USER_LOCATION_GRANTED,
  USER_LOCATION_DENIED,
  USER_LOCATION_ERROR,
} from '../constants/types';
import * as Location from 'expo-location';

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
