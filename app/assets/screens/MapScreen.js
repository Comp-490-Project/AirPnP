import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { auth } from '../../firebase';
import AnimationLoad from '../components/AnimationLoad';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapMarker from '../components/MapMarker';
import SearchBar from '../components/SearchBar';
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
function MapScreen({ navigation }) {
  const reference = useRef(null);

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

  if (!location) {
    return <AnimationLoad />;
  }

  return (
    <View style={styles.container}>
      <MapView
        onPress={() => {
          /*reference.current.snapTo(1) this is not needed anymore without sheet*/;
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
        {useDirections(location, restroomWithDirections)}
      </MapView>
      <SearchBox navigation={navigation}/>
      <MapBottomCard  navigation={navigation} />
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
  texty:{
    position : 'absolute',
    top: 500
  }
});

export default MapScreen;
