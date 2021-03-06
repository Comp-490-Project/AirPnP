import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import AppButton from '../components/AppButton';
import { setRestroomLocation } from '../../actions/restroomActions';
import mapStyle from '../../constants/mapStyle';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { getUserLocation } from '../../actions/userActions';
import AnimationLoad from '../components/AnimationLoad';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import { isPointWithinRadius } from 'geolib';
import ModalAlert from '../components/ModalAlert';
import SafeView from '../components/SafeView';
import LightText from '../components/LightText';
import MarkerImage from '../icons/marker.png';

export default function AddScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const { location } = useSelector((state) => state.userLocation);
  const { region } = useSelector((state) => state.restroomReview);

  const [visible, setVisible] = useState(false);

  function validate() {
    //Returns boolean based on geolib calculation.
    const radius = isPointWithinRadius(
      { latitude: region.latitude, longitude: region.longitude },
      { latitude: location.latitude, longitude: location.longitude },
      50
    );
    if (radius) {
      navigation.navigate('Submit', { location });
    } else {
      setVisible(true);
    }
  }

  useEffect(() => {
    //Fetch location, catch err.
    if (!location) {
      dispatch(getUserLocation());
    } else if (!region.latitude || !region.longitude) {
      dispatch(
        setRestroomLocation({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        })
      );
    }
    <View>
      <AnimationLoad />
    </View>;
  }, [location, region]);

  if (!region.latitude || !region.longitude) {
    return <AnimationLoad />;
  }

  if (!user) {
    //Prompt user to log in if they aren't
    return (
      <SafeView>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.btnLogin}>
              <LightText fontSize={24}>Login</LightText>
            </View>
          </TouchableOpacity>
        </View>
      </SafeView>
    );
  }

  return (
    <View style={{ flex: 1, justifyConetnt: 'center', alignItems: 'center' }}>
      <ModalAlert visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require('../icons/cancel.png')}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../icons/poop-emoji.png')}
            style={{ height: 90, width: 90, marginVertical: 10 }}
          />
        </View>
        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
          Try again, the position is too far from the allowed radius.
        </Text>
      </ModalAlert>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        showsUserLocation={true}
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        loadingEnabled={true}
        initialRegion={region}
        onRegionChangeComplete={(region) =>
          dispatch(setRestroomLocation(region))
        }
      >
        <MapView.Circle
          center={location}
          radius={50}
          fillColor={'rgba(149, 153, 226, 0.5)'}
          stokeWidth={5}
        />
        <Marker.Animated image={MarkerImage} coordinate={region} />
      </MapView>
      <View style={styles.addButton}>
        <AppButton onPress={validate} title="Validate"></AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapView: {
    width: WIDTH,
    height: HEIGHT,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    width: '50%',
    marginBottom: 125,
    height: 10,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    height: HEIGHT - 50,
    maxWidth: WIDTH,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    backgroundColor: '#303645',
    paddingVertical: 15,
    paddingHorizontal: 75,
    borderRadius: 5,
  },
});
