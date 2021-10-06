import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useLocation() {
  //Custom Hook To Get User Location.
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      //Handle Denied Permissions.
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        console.log('NOT GRANTED');
        return;
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  return location;
}
