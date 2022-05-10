import React, { useEffect, useRef } from 'react';
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
  getUserAddedRestrooms,
  getUserVisitedRestrooms,
} from '../../actions/userActions';
import { getRestrooms } from '../../actions/restroomActions';
import { useDirections } from '../../hooks/useDirections';
import SearchBox from '../components/SearchBox';
import CenterBox from '../components/CenterBox';
import mapStyle from '../../constants/mapStyle';

function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const { location } = useSelector((state) => state.userLocation);
  const { restrooms, restroomWithDirections } = useSelector(
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
        dispatch(getUserAddedRestrooms());
        dispatch(getUserVisitedRestrooms());
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (location && restroomWithDirections) {
      const destinationArr = restroomWithDirections.split(', ');
      const formattedDest = {
        latitude: Number(destinationArr[0]),
        longitude: Number(destinationArr[1]),
      };

      mapRef.current.fitToCoordinates(
        [
          { latitude: location.latitude, longitude: location.longitude },
          {
            latitude: formattedDest.latitude,
            longitude: formattedDest.longitude,
          },
        ],
        {
          edgePadding: { top: 150, left: 300, right: 300, bottom: 150 },
          animated: true,
        }
      );
    }
  }, [location, restroomWithDirections]);

  if (!location || !restroomWithDirections) {
    return <AnimationLoad />;
  }

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        showsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0121,
        }}
        mapPadding={{
          bottom: 500,
        }}
        loadingEnabled
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
