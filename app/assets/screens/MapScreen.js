import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserLocation,
  getUserStatus,
  getUserFavorites,
  favoriteHandler,
} from '../../actions/userActions';
import { getRestrooms, setMarkerAttributes } from '../../actions/mapActions';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import SearchBar from '../components/SearchBar';
import { auth } from '../../firebase';
import colors from '../config/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import AppButton from '../components/AppButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import AnimationLoad from '../components/AnimationLoad';

const restroomKey = 'useFavoritesScreenValue';

export default function MapScreen({ navigation, addRestroom }) {
  const reference = React.useRef();

  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  const dispatch = useDispatch();

  const { location, loading } = useSelector((state) => state.userLocation);
  const { restrooms, mapCenterLocation } = useSelector(
    (state) => state.mapLocation
  );
  const { user } = useSelector((state) => state.userStatus);
  const { description, geohash, meanRating, name, images, isFavorited } =
    useSelector((state) => state.mapMarker);
  const { userFavoritesLoaded } = useSelector((state) => state.userFavorites);

  const handleRating = (id) => {
    restroomKey = id;
    navigation.navigate('review', { restroomKey });
  };

  // Bottomsheet Header
  const renderHeader = () => (
    <View style={styles.bottomSheetHeader}>
      <View style={styles.bottomSheetpanelHeader}>
        <View style={styles.bottomSheetpanelHandle} />
      </View>
    </View>
  );

  // Bottomsheet Inner Content
  const renderInner = () => (
    <ScrollView
      style={{
        height: 650,
        width: Dimensions.get('window').width,
        backgroundColor: colors.white,
      }}
    >
      <View style={styles.bottomSheetPanel}>
        {user && (
          <TouchableOpacity
            onPress={() => {
              dispatch(favoriteHandler(geohash));
            }}
          >
            <Image
              style={styles.heart}
              source={
                !isFavorited
                  ? require('../icons/favorite-heart/heart-unfilled.png')
                  : require('../icons/favorite-heart/heart-filled.png')
              }
            />
          </TouchableOpacity>
        )}
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.panelRestroomName}>{name}</Text>
          <View style={styles.customRatingBarStyle}>
            <Text>Rating: </Text>

            {meanRating && meanRating == 1 ? (
              <Image
                style={styles.starImgStyle}
                source={require('../icons/poop-emoji.png')}
              />
            ) : (
              maxRating.map((item, index) => {
                return (
                  <Image
                    style={styles.starImgStyle}
                    key={index}
                    source={
                      item <= meanRating
                        ? require('../icons/rating/star-filled.png')
                        : require('../icons/rating/star-unfilled.png')
                    }
                  />
                );
              })
            )}
          </View>
          <Text style={styles.panelRestroomDescription}>{description}</Text>
        </View>
        <View style={{ alignContent: 'space-around' }}>
          <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() =>
              Platform.OS === 'ios'
                ? Linking.openURL(`maps:${lat},${long}`)
                : Linking.openURL(`geo:0,0?q=${lat},${long}`)
            }
          >
            <AppButton title={'Navigate'} styles={{ width: '80%' }} />
          </TouchableOpacity>
          {user && (
            <>
              <View Style={{ height: 10, backgroundColor: colors.white }} />
              <TouchableOpacity
                style={{ margin: 5 }}
                onPress={() => handleRating(geohash)}
              >
                <AppButton title={'Rate'} styles={{ width: '80%' }} />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={{ marginTop: 10, marginRight: 10 }}>
          <ScrollView
            style={{ width: Dimensions.get('window').width, height: 200 }}
            pagingEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{
                  width: Dimensions.get('window').width,
                  height: 200,
                  resizeMode: 'center',
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );

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
      dispatch(getUserStatus());
    });

    return unsubscribe;
  }, [loading, location, userFavoritesLoaded, addRestroom]);

  return (
    <>
      {loading ? (
        <AnimationLoad></AnimationLoad>
      ) : (
        <View style={styles.container}>
          <MapView
            style={{ paddingTop: 500 }}
            onPress={() => reference.current.snapTo(1)}
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
              <Marker
                key={index}
                image={require('../../assets/icons/app-logo.png')}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              >
                <Callout
                  tooltip
                  onPress={() => {
                    dispatch(setMarkerAttributes(marker));
                    reference.current.snapTo(0);
                  }}
                >
                  <View>
                    <View style={styles.calloutWindow}>
                      <Text style={styles.name}>{marker.name}</Text>
                      <Text>{marker.description}</Text>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <SearchBar />
          <BottomSheet
            ref={reference}
            snapPoints={['61%', 0]}
            initialSnap={1}
            enabledGestureInteraction={true}
            renderContent={renderInner}
            renderHeader={renderHeader}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    position: 'absolute',
    top: 100,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutWindow: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderRadius: 7,
    borderColor: colors.medium,
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: colors.white,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: colors.white,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  bottomSheetHeader: {
    backgroundColor: colors.white,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetpanelHeader: {
    alignItems: 'center',
  },
  bottomSheetpanelHandle: {
    width: 40,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.lightgray,
    marginBottom: 10,
  },
  bottomSheetPanel: {
    backgroundColor: colors.white,
    padding: 10,
  },
  panelRestroomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  panelRestroomDescription: {
    fontSize: 12,
    fontWeight: 'normal',
    margin: 10,
  },
  heart: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginHorizontal: 15,
  },
  customRatingBarStyle: {
    flexDirection: 'row',
  },
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});
