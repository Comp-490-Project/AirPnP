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
function MapScreen({ navigation }) {
  const dispatch = useDispatch();

  const { location } = useSelector((state) => state.userLocation);
  const { restrooms, restroomWithDirections, mapCenterLocation } = useSelector(
    (state) => state.map
  );

  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d',
        },
      ],
    },
  ];

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
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        showsUserLocation={true}
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
      <SearchBox navigation={navigation} />
      <CenterBox />
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
  card: {
    position: 'absolute',
    bottom: 90,
    right: 0,
    left: 0,
  },
});

export default MapScreen;
