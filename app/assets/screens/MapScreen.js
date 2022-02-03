import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLocation } from '../../actions/userActions';
import { getRestrooms } from '../../actions/mapActions';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import SearchBar from '../components/SearchBar';
import { firebase, auth } from '../../firebase';
import colors from '../config/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import AppButton from '../components/AppButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';
import AnimationLoad from '../components/AnimationLoad';

var restroomKey = 'useFavoritesScreenValue';

export default function MapScreen({ navigation, keys, setKeys, addRestroom }) {
  const user = firebase.auth().currentUser;
  const reference = React.useRef();
  const [desc, setDesc] = useState('');
  const [geohash, setGeohash] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [name, setName] = useState('');
  const [rating, setRating] = useState();
  const [favorite, setFavorite] = useState(false);
  // Code copied from 'FavoritesScreen.js'
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [searchAlert, setSearchAlert] = useState(false);
  const [centerLocation, setCenterLocation] = useState(null);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  // SearchBar.js
  const [destinationPlace, setDestinationPlace] = useState(null);

  const dispatch = useDispatch();
  const { location, loading } = useSelector((state) => state.userLocation);
  const { restrooms, markerLoaded } = useSelector((state) => state.restroom);

  const openGps = (lati, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:0,0?q=';
    var url = scheme + `${lati},${lng}`;
    Linking.openURL(url);
  };

  async function getRestroomsSearch() {
    setMarkerLoaded(false);
    const center = [
      destinationPlace.details.geometry.location.lat,
      destinationPlace.details.geometry.location.lng,
    ];
    const radiusInM = 2500;
    const bounds = geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      const q = firebase
        .firestore()
        .collection('Los-Angeles')
        .orderBy('geohash')
        .startAt(b[0])
        .endAt(b[1]);
      promises.push(q.get());
    }

    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs = [];
        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get('latitude');
            const lng = doc.get('longitude');

            const distanceInKm = distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        matchingDocs.forEach((matchingDoc) => {
          setRestrooms((restrooms) => [...restrooms, matchingDoc.data()]);
        });
        setMarkerLoaded(true);
      });
    setSearchAlert(false);
  }

  // Code copied from 'FavoritesScreen.js'
  async function getKeyData() {
    const query = await firebase.firestore().collection('users');
    query
      .doc(user.uid)
      .get()
      .then((querySnapshot) => {
        const favs = querySnapshot.data();
        if (favs.favorites) {
          favs.favorites.forEach((favKey) => {
            setKeys((keys) => [...keys, favKey]);
          });
        }
      });
    setFavoritesLoaded(true);
  }

  restroomAttributes = async (marker) => {
    // Check if marker's geohash property is in favorites array
    // Favorites
    // 9q5dy8mr0v: Lum-Ka-Naad
    // 9q5dwxuc38: California Chicken Cafe,
    // 9q5dyb6cuh: Papa John's Pizza
    setImageUrls([]);

    setDestinationPlace({
      details: {
        geometry: {
          location: {
            lat: marker.latitude,
            lng: marker.longitude,
          },
        },
      },
    });

    setCenterLocation({
      latitude: marker.latitude,
      longitude: marker.longitude,
    });
    setDesc(marker.description);
    setGeohash(marker.geohash);
    setLat(marker.latitude);
    setLong(marker.longitude);
    setName(marker.name);
    setRating(marker.meanRating);

    let images = await firebase.storage().ref(marker.geohash).listAll();
    //get the array of image references as a json object
    images.items.forEach((im) =>
      firebase
        .storage()
        .ref(im._delegate._location.path_)
        .getDownloadURL()
        .then((url) => setImageUrls((imageUrls) => [...imageUrls, url]))
    ); //get the download url using the path field of the image json object first && is temporary till work is fixed

    if (keys.includes(marker.geohash)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }

    reference.current.snapTo(0);
  };

  renderInner = () => (
    <ScrollView
      style={{
        height: 650,
        width: Dimensions.get('window').width,
        backgroundColor: colors.white,
      }}
    >
      <View style={styles.bottomSheetPanel}>
        {user && (
          <TouchableOpacity onPress={favoriteHandler}>
            <Image
              style={styles.heart}
              source={
                !favorite
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

            {rating && rating == 1 ? (
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
                      item <= rating
                        ? require('../icons/rating/star-filled.png')
                        : require('../icons/rating/star-unfilled.png') // could change to a blank image so it wont show
                    }
                  />
                );
              })
            )}
          </View>
          <Text style={styles.panelRestroomDescription}>{desc}</Text>
        </View>
        <View style={{ alignContent: 'space-around' }}>
          <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() => openGps(lat, long)}
          >
            <AppButton title={'Navigate'} styles={{ width: '80%' }} />
          </TouchableOpacity>
          {user && ( //copied from conditional rate
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
            {imageUrls.map((image, index) => (
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
  function handleRating(id) {
    restroomKey = id;
    navigation.navigate('review', { restroomKey });
  }
  renderHeader = () => (
    <View style={styles.bottomSheetHeader}>
      <View style={styles.bottomSheetpanelHeader}>
        <View style={styles.bottomSheetpanelHandle} />
      </View>
    </View>
  );

  const favoriteHandler = async () => {
    const user = firebase.auth().currentUser;
    // If already in user's favorites, remove as favorite
    if (keys.includes(geohash)) {
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          favorites: firebase.firestore.FieldValue.arrayRemove(geohash),
        });
      setKeys(keys.filter((key) => key !== geohash));
      setFavorite(false);
    } else {
      // If not in user's favorites, add as favorite
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          favorites: firebase.firestore.FieldValue.arrayUnion(geohash),
        });
      setKeys((keys) => [...keys, geohash]);
      setFavorite(true);
    }
  };

  useEffect(() => {
    if (!location) {
      dispatch(getUserLocation());
    }

    if (!loading && !markerLoaded) {
      dispatch(getRestrooms(location.latitude, location.longitude));
    }

    if (destinationPlace !== null && searchAlert) {
      getRestroomsSearch();
    }

    // Check to see if user is logged in to get favorites
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !favoritesLoaded) {
        getKeyData();
      }
    });

    return unsubscribe;
  }, [loading, favoritesLoaded, location, addRestroom, destinationPlace]);

  return (
    <>
      {loading ? (
        <AnimationLoad></AnimationLoad>
      ) : (
        <View style={styles.container}>
          <MapView
            style={{ paddingTop: 500 }}
            onPress={() => reference.current.snapTo(1)}
            provider={PROVIDER_GOOGLE} //Google Maps
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            region={{
              latitude:
                destinationPlace !== null
                  ? destinationPlace.details.geometry.location.lat
                  : location.latitude,
              longitude:
                destinationPlace !== null
                  ? destinationPlace.details.geometry.location.lng
                  : location.longitude,
              latitudeDelta: 0.0015,
              longitudeDelta: 0.0121,
            }}
            loadingEnabled={true}
          >
            {markerLoaded &&
              restrooms.map((marker, index) => (
                <Marker
                  key={index}
                  image={require('../../assets/icons/app-logo.png')}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                >
                  <Callout tooltip onPress={() => restroomAttributes(marker)}>
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
          <SearchBar
            setDestinationPlace={setDestinationPlace}
            setSearchAlert={setSearchAlert}
          />
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
