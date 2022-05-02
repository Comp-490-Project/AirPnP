import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { auth } from '../../firebase';
import { WIDTH, HEIGHT } from '../../constants/Dimensions';
import AnimationLoad from '../components/AnimationLoad';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapMarker from '../components/MapMarker';
import MapBottomCard from '../components/MapBottomCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserLocation,
  checkUserStatus,
  getUserFavorites,
} from '../../actions/userActions';
import { getRestrooms } from '../../actions/restroomActions';
import { useDirections } from '../../hooks/useDirections';
import SearchBox from '../components/SearchBox';
import CenterBox from '../components/CenterBox';
import mapStyle from '../../constants/mapStyle';

function MapScreen({ navigation }) {
  const dispatch = useDispatch();

  const { location } = useSelector((state) => state.userLocation);
  const { restrooms, restroomWithDirections, mapCenterLocation } = useSelector(
    (state) => state.map
  );

  useEffect(() => {
    if (!location) {
      // Get user location
      dispatch(getUserLocation());
    } else {
      // Get restrooms around user location
      dispatch(getRestrooms(location.latitude, location.longitude));
    }
  }, [location, dispatch]);

  useEffect(() => {
    // Watch for change in user login status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Check if user is logged in
      dispatch(checkUserStatus());
      // If current exist exists, get user favorites
      if (user) {
        dispatch(getUserFavorites());
      }
    });

    return unsubscribe;
  }, []);

  if (!location || !restroomWithDirections) {
    return <AnimationLoad />;
  }

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        customMapStyle={mapStyle}
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
          <MapMarker key={marker.geohash} marker={marker} index={index} />
        ))}
        {useDirections(location, restroomWithDirections)}
      </MapView>
      <View style={styles.searchContainer}>
        <SearchBox navigation={navigation} />
      </View>
      <View style={styles.centerContainer}>
        <CenterBox />
      </View>
      <View style={styles.card}>
        <MapBottomCard navigation={navigation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mapView: {
    width: WIDTH,
    height: HEIGHT,
  },
  searchContainer: {
    position: 'absolute',
    paddingVertical: HEIGHT * 0.04,
    paddingHorizontal: 15,
    right: 0,
  },
  centerContainer: {
    position: 'absolute',
    paddingVertical: HEIGHT * 0.04,
    paddingHorizontal: 15,
    top: 75,
    right: 0,
  },
  card: {
    position: 'absolute',
    bottom: 90,
    right: 0,
    left: 0,
  },
});

export default MapScreen;
