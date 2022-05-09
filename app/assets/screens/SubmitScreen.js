import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../theme/colors';
import BackButton from '../icons/back-btn.png';
import SafeView from '../components/SafeView';
import LightText from '../components/LightText';
import OptionCard from '../components/cards/OptionCard';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import mapStyle from '../../constants/mapStyle';
import MapView, { Marker } from 'react-native-maps';
import Rating from '../components/Rating';
import { LinearGradient } from 'expo-linear-gradient';
import { openCamera, openLibrary } from '../../helpers/mediaPermissions';
import { handleImageInUI, addRestroom } from '../../actions/restroomActions';
import { useDispatch, useSelector } from 'react-redux';
import { geohashForLocation } from 'geofire-common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCamera,
  faPhotoFilm,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { addUserAddedRestroom } from '../../actions/userActions';
import AppButton from '../components/AppButton';

export default function SubmitScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const { location } = route.params;
  const { region, rating, image } = useSelector(
    (state) => state.restroomReview
  );
  const { user } = useSelector((state) => state.userAuth);

  const handleCamera = async () => {
    const image = await openCamera();
    dispatch(handleImageInUI(image));
  };

  const handleLibrary = async () => {
    const image = await openLibrary();
    dispatch(handleImageInUI(image));
  };

  const handleSubmit = async () => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=AIzaSyB42EXr3NqNkoICmr6l2fBQCQ0a9P3yiQI`
    );

    res.json().then((data) => {
      dispatch(
        addRestroom({
          geohash: geohashForLocation([region.latitude, region.longitude]),
          name,
          address: data.results[0].formatted_address,
          latitude: region.latitude,
          longitude: region.longitude,
          meanRating: rating,
          user: user.uid,
        })
      );

      dispatch(
        addUserAddedRestroom({
          geohash: geohashForLocation([region.latitude, region.longitude]),
          name,
          address: data.results[0].formatted_address,
          latitude: region.latitude,
          longitude: region.longitude,
          meanRating: rating,
          user: user.uid,
        })
      );

      navigation.navigate('Home');
    });
  };

  return (
    <SafeView>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image style={styles.backButton} source={BackButton} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <LightText fontSize={24} fontWeight="bold" textAlign="center">
          Add Details
        </LightText>
        <MapView
          style={styles.mapView}
          customMapStyle={mapStyle}
          showsUserLocation
          showsMyLocationButton={false}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0006,
            longitudeDelta: 0.0006,
          }}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>
        <LightText fontSize={18}>Rate This Restroom</LightText>
        <View style={styles.ratingContainer}>
          <Rating />
        </View>
        <LightText fontSize={18}>Enter Restroom Name</LightText>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[colors.secondary, colors.primary]}
          locations={[0, 1]}
          style={styles.gradientOutline}
        >
          <View style={styles.formGroup}>
            <TextInput
              style={styles.formInput}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </LinearGradient>
        <LightText fontSize={18}>Indicate Restroom Details</LightText>
        <View style={styles.optionContainer}>
          <View style={styles.option}>
            <OptionCard icon="dollar" title="FREE" bg={colors.secondary} />
          </View>
          <View style={styles.option}>
            <OptionCard
              icon="wheelchair"
              title="HANDICAP"
              bg={colors.secondary}
            />
          </View>
        </View>
        <LightText fontSize={18}>Upload Restroom Images</LightText>
        <View
          style={[styles.mediaContainer, { marginBottom: !image ? 20 : 0 }]}
        >
          <TouchableOpacity onPress={handleCamera}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.secondary, colors.primary]}
              locations={[0, 1]}
              style={styles.gradientSubmit}
            >
              <View style={styles.btnContainer}>
                <FontAwesomeIcon
                  icon={faCamera}
                  size={20}
                  color={colors.white}
                  style={styles.iconLeft}
                />
                <LightText fontSize={18}>Camera</LightText>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLibrary}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.secondary, colors.primary]}
              locations={[0, 1]}
              style={styles.gradientSubmit}
            >
              <View style={styles.btnContainer}>
                <FontAwesomeIcon
                  icon={faPhotoFilm}
                  size={20}
                  color={colors.white}
                  style={styles.iconLeft}
                />
                <LightText fontSize={18}>Photos</LightText>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {image && (
          <View style={styles.uploadSuccess}>
            <LightText fontSize={14}>Uploaded Image</LightText>
            <FontAwesomeIcon
              icon={faCheck}
              size={20}
              color={colors.green}
              style={styles.iconRight}
            />
          </View>
        )}
        <TouchableOpacity onPress={handleSubmit}>
          <AppButton title="Submit" />
        </TouchableOpacity>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 15,
  },
  container: {
    maxWidth: WIDTH,
    minHeight: HEIGHT,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  mapView: {
    height: HEIGHT * 0.3,
    width: '100%',
    marginVertical: 12,
  },
  ratingContainer: {
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  textInput: {
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  gradientOutline: {
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: HEIGHT * 0.05,
    borderRadius: 4,
  },
  formGroup: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    position: 'relative',
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: 10,
    width: '99.3%',
    height: '93%',
    borderRadius: 3,
    color: colors.backgroundLight,
  },
  optionContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  option: {
    marginRight: 10,
  },
  mediaContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  gradientSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  btnContainer: {
    backgroundColor: colors.backgroundDark,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 25,
    marginVertical: 1,
    marginHorizontal: 1.5,
  },
  iconLeft: {
    marginRight: 5,
  },
  iconRight: {
    marginLeft: 5,
  },
  uploadSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
