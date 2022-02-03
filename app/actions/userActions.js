import * as Location from 'expo-location';

export const getUserLocation = () => async (dispatch) => {
  try {
    //Handle Denied Permissions.
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      dispatch({
        type: 'USER_LOCATION_DENIED',
      });
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getLastKnownPositionAsync({});

    dispatch({
      type: 'USER_LOCATION_GRANTED',
      payload: {
        latitude,
        longitude,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
