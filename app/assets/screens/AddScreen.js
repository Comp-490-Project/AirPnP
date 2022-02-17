import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import MapView from 'react-native-maps';
import AppButton from '../components/AppButton';
import { firebase } from '../../firebase';
import markerImage from '../icons/marker.png';
import BottomSheet from 'reanimated-bottom-sheet';
import Rating from '../components/Rating';
import colors from '../theme/colors';
import * as ImagePicker from 'expo-image-picker';
import AnimationLoad from '../components/AnimationLoad';
import CustomAlertComponent from '../components/CustomAlertComponent';
import { geohashForLocation } from 'geofire-common';
import { userRating } from '../components/Rating';

import { getUserLocation } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { addRestroom } from '../../actions/restroomActions';

function AddScreen({ navigation }) {
  const sheetRef = React.useRef(null);
  const dispatch = useDispatch();

  const { location } = useSelector((state) => state.userLocation);
  const { user } = useSelector((state) => state.userAuth);

  const [mapRegion, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState(null);

  const renderCont = () => (
    <View style={styles.swipeBox}>
      <Text>Swipe Down To Close</Text>
      <View style={styles.cont3}>
        <Text style={styles.title}>Name</Text>
        <View style={styles.TextInput}>
          <TextInput
            label="Title:"
            onChangeText={(title) => setTitle(title)}
            placeholder="Name Your Place"
            mode="outlined"
            multiline={true}
            value={title}
          />
        </View>
        <Text style={styles.title}>Review</Text>
        <View style={styles.TextInput}>
          <TextInput
            label="Description:"
            onChangeText={(description) => setDescription(description)}
            placeholder="How Was It?."
            mode="outlined"
            multiline={true}
            value={description}
          />
        </View>
        <Text style={styles.title}>Add a Photo</Text>
        <View style={{ margin: 5 }}>
          <AppButton title="Take Photo" onPress={openCamera}></AppButton>
        </View>
        <View style={{ margin: 5 }}>
          <AppButton
            title="Choose From Library"
            onPress={openLibrary}
          ></AppButton>
        </View>
        <View style={styles.imageContainer}>
          {imageSource !== '' && (
            <Image source={{ uri: imageSource }} style={styles.image} />
          )}
        </View>
        <Text style={styles.title}>Rating</Text>
        <SafeAreaView style={styles.container1}>
          <Rating></Rating>
        </SafeAreaView>
        <View style={styles.submitButton}>
          <AppButton
            title="Submit"
            onPress={() => {
              dispatch(
                addRestroom({
                  description: description,
                  latitude: mapRegion.longitude,
                  longitude: mapRegion.longitude,
                  geohash: geohashForLocation([
                    mapRegion.latitude,
                    mapRegion.longitude,
                  ]),
                  meanRating: userRating,
                  name: title,
                  user: user.uid,
                })
              );
              uploadImage(imageSource, user.uid);
              setDescription('');
              setTitle('');
              setImageSource(null);
              setRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              });

              navigation.navigate('home');
            }}
            style={styles.btn}
          ></AppButton>
        </View>
      </View>
    </View>
  );

  const openLibrary = async () => {
    //Function is triggered when "Choose From Library" button is pressed.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync; //Awaits for user input for Permissions.
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to acess your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImageSource(result.uri);
    }
  };

  const openCamera = async () => {
    //Function is triggered when "Take Photo" button is pressed.
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync(); //Awaits for user input for Permissions.
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to acess your photos!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setImageSource(result.uri, user.uid);
    }
  };

  const uploadImage = async (uri, user) => {
    const response = await fetch(uri);
    const blob = await response.blob(); //Responsible for containing the uri's data in bytes.
    var ref = firebase
      .storage()
      .ref(geohashForLocation([mapRegion.latitude, mapRegion.longitude]))
      .child(user);
    return ref.put(blob);
  };

  useEffect(() => {
    if (!location) {
      dispatch(getUserLocation());
    }
    setRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    });
  }, [location]);

  if (location === null) {
    //Loading Animations Here
    return <AnimationLoad />;
  }

  if (mapRegion === null) {
    return <AnimationLoad />;
  }

  const onRegionChange = (mapRegion) => {
    setRegion(mapRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsMyLocationButton={true}
        showsUserLocation={true}
        initialRegion={mapRegion}
        onRegionChangeComplete={onRegionChange}
      ></MapView>
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={markerImage} />
      </View>
      {user && (
        <View style={styles.addButton}>
          <AppButton title="Add" onPress={() => sheetRef.current.snapTo(0)} />
        </View>
      )}
      {!user && (
        <CustomAlertComponent navigation={navigation}></CustomAlertComponent>
      )}
      <BottomSheet
        ref={sheetRef}
        snapPoints={['73.5%', 0]}
        initialSnap={1}
        borderRadius={10}
        renderContent={renderCont}
        enabledContentTapInteraction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  swipeBox: {
    backgroundColor: 'white',
    padding: 16,
    height: 1200,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderColor: 'black',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  alertContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 300,
    top: 100,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    width: 200,
    marginBottom: 125,
    height: 10,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -50,
    position: 'absolute',
    top: '55%',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: {
    //TODO: This needs to be responsive in regards to the latDelta/longDelta values in the MapView.
    height: 48,
    width: 48,
  },
  cont1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingLeft: 13,
  },
  title: {
    fontSize: 35,
    marginTop: 20,
    alignSelf: 'center',
  },
  cont3: {
    flex: 1,
    width: 300,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    paddingRight: 80,
    lineHeight: 25,
  },
  btn: {
    backgroundColor: '#E2443B',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 0,
    width: 290,
    position: 'relative',
    alignItems: 'center',
  },
  submitButton: {
    position: 'absolute',
    bottom: 110,
    width: 260,
    height: 10,
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 20,
    color: '#FFF',
  },
  TextInput: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  TextInputText: {
    height: 50,
    borderWidth: 3,
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignContent: 'center',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: -50,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'center',
  },
  imageContainer: {
    width: '100%',
    marginBottom: 10,
    marginRight: 10,
    borderColor: colors.black,
    borderWidth: 3,
    borderRadius: 20,
  },
});

export default AddScreen;
