import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import MapView from 'react-native-maps';
import AppButton from '../components/AppButton';
import markerImage from '../icons/marker.png';
import AnimationLoad from '../components/AnimationLoad';
import CustomAlertComponent from '../components/CustomAlertComponent';
import AddBottomSheet from '../components/bottomSheets/AddBottomSheet';

import { getUserLocation } from '../../actions/userActions';
import { setRestroomLocation } from '../../actions/restroomActions';
import { useSelector, useDispatch } from 'react-redux';

function AddScreen({ navigation }) {
  const reference = useRef(null);

  const dispatch = useDispatch();

  const { location } = useSelector((state) => state.userLocation);
  const { user } = useSelector((state) => state.userAuth);
  const { region } = useSelector((state) => state.restroomReview);

  useEffect(() => {
    if (!location) {
      dispatch(getUserLocation());
    } else if (!region.latitude || !region.longitude) {
      dispatch(
        setRestroomLocation({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        })
      );
    }
  }, [location, region]);

  if (!region.latitude || !region.longitude) {
    return <AnimationLoad />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsMyLocationButton={true}
        showsUserLocation={true}
        initialRegion={region}
        onRegionChangeComplete={(region) =>
          dispatch(setRestroomLocation(region))
        }
      ></MapView>
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={markerImage} />
      </View>
      {user ? (
        <View style={styles.addButton}>
          <AppButton title="Add" onPress={() => reference.current.snapTo(0)} />
        </View>
      ) : (
        <CustomAlertComponent navigation={navigation} />
      )}
      <AddBottomSheet reference={reference} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -50,
    position: 'absolute',
    top: '55%',
  },
  marker: {
    // @todo
    // This needs to be responsive in regards to the latDelta/longDelta values in the MapView
    height: 48,
    width: 48,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    width: 200,
    marginBottom: 125,
    height: 10,
  },
});

export default AddScreen;
