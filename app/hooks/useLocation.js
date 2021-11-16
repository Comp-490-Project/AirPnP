import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
  //Custom Hooks
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } = await Location.getLastKnownPositionAsync({});

      setLocation({ latitude, longitude });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, loading };
}
