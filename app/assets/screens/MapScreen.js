import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { auth } from '../../firebase';
import AnimationLoad from '../components/AnimationLoad';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapMarker from '../components/MapMarker';
import SearchBar from '../components/SearchBar';
import MapBottomSheet from '../components/bottomSheets/MapBottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserLocation,
  checkUserStatus,
  getUserFavorites,
} from '../../actions/userActions';
import { getRestrooms } from '../../actions/restroomActions';

function MapScreen({ navigation }) {
  const reference = useRef(null);

  const dispatch = useDispatch();

  const { location, loading } = useSelector((state) => state.userLocation);
  const { restrooms, mapCenterLocation } = useSelector((state) => state.map);
  const { user } = useSelector((state) => state.userAuth);
  const { userFavoritesLoaded } = useSelector((state) => state.userFavorites);

  // @todo
  // Find a way to do this without using restroomKey
  const handleRating = (id) => {
    reference.current.snapTo(1);
    navigation.navigate('Review', { restroomKey: id });
  };

  useEffect(() => {
    // Get user location
    if (!location) {
      dispatch(getUserLocation());
    }

    // Get restrooms around user location
    if (!loading) {
      dispatch(getRestrooms(location.latitude, location.longitude));
    }

    // If there is a user, load favorites once
    if (user && !userFavoritesLoaded) {
      dispatch(getUserFavorites());
    }

    // Watch for change in user login status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Check if user is logged in
      dispatch(checkUserStatus());
    });

    console.log('test');

    return unsubscribe;
  }, [loading, location, userFavoritesLoaded]);

  if (loading) {
    return <AnimationLoad />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{ paddingTop: 500 }}
        onPress={() => {
          reference.current.snapTo(1);
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={{
          latitude: mapCenterLocation
            ? mapCenterLocation.latitude
            : location.latitude,
          longitude: mapCenterLocation
            ? mapCenterLocation.longitude
            : location.longitude,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0121,
        }}
        loadingEnabled={true}
      >
        {restrooms.map((marker, index) => (
          <MapMarker
            key={marker.geohash}
            marker={marker}
            reference={reference}
            index={index}
          />
        ))}
      </MapView>
      <SearchBar />
      <MapBottomSheet reference={reference} handleRating={handleRating} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
