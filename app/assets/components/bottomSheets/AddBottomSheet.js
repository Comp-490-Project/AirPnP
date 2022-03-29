import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { geohashForLocation } from 'geofire-common';
import { useSelector, useDispatch } from 'react-redux';
import { openCamera, openLibrary } from '../../../helpers/mediaPermissions';
import { handleImageInUI, addRestroom } from '../../../actions/restroomActions';
import colors from '../../theme/colors';
import AppButton from '../AppButton';
import Rating from '../Rating';
import { distanceBetween } from 'geofire-common';



function AddBottomSheet({ reference, navigation }) {
  const dispatch = useDispatch();
  var userLocation = useSelector((state) => state.userLocation);
  const { user } = useSelector((state) => state.userAuth);
  const { region, rating, image } = useSelector(
    (state) => state.restroomReview
  );

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCamera = async () => {
    const image = await openCamera();
    dispatch(handleImageInUI(image));
  };

  const handleLibrary = async () => {
    const image = await openLibrary();
    dispatch(handleImageInUI(image));
  };

  const handleSubmit = () => {
    const distanceInM = distanceBetween([region.latitude, region.longitude], [userLocation.location.latitude, userLocation.location.longitude]) * 1000;
    if(distanceInM < 1500){
    dispatch(
      addRestroom({
        description,
        geohash: geohashForLocation([region.latitude, region.longitude]),
        latitude: region.latitude,
        longitude: region.longitude,
        meanRating: rating,
        name,
        user: user.uid,
        image,
      })
    );
    }else{
      return alert("must be within 1500 meters of restroom!");

    }
    setName('');
    setDescription('');

    navigation.navigate('Home');
  };

  const renderCont = () => (
    <View style={styles.swipeBox}>
      <Text>Swipe Down To Close</Text>
      <View style={styles.cont3}>
        <Text style={styles.title}>Name</Text>
        <View style={styles.textInput}>
          <TextInput
            label="Name"
            onChangeText={(text) => setName(text)}
            placeholder="Name Your Place"
            mode="outlined"
            multiline={true}
            value={name}
          />
        </View>
        <Text style={styles.title}>Review</Text>
        <View style={styles.textInput}>
          <TextInput
            label="Description"
            onChangeText={(text) => setDescription(text)}
            placeholder="How Was It?."
            mode="outlined"
            multiline={true}
            value={description}
          />
        </View>
        <Text style={styles.title}>Add a Photo</Text>
        <View style={{ margin: 5 }}>
          <AppButton title="Take Photo" onPress={handleCamera} />
        </View>
        <View style={{ margin: 5 }}>
          <AppButton title="Choose From Library" onPress={handleLibrary} />
        </View>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
        <Text style={styles.title}>Rating</Text>
        <SafeAreaView style={styles.container1}>
          <Rating />
        </SafeAreaView>
        <View style={styles.submitButton}>
          <AppButton title="Submit" style={styles.btn} onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={reference}
      snapPoints={['73.5%', 0]}
      initialSnap={1}
      borderRadius={10}
      renderContent={renderCont}
      enabledContentTapInteraction={false}
    />
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
  cont3: {
    flex: 1,
    width: 300,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    marginTop: 20,
    alignSelf: 'center',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: -50,
  },
  textInput: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageContainer: {
    width: '100%',
    marginBottom: 10,
    marginRight: 10,
    borderColor: colors.black,
    borderWidth: 3,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'center',
  },
  submitButton: {
    position: 'absolute',
    bottom: 110,
    width: 260,
    height: 10,
    alignSelf: 'center',
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
});

export default AddBottomSheet;
