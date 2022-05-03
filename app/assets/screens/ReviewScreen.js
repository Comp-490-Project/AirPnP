import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Rating from '../components/Rating';
import AppButton from '../components/AppButton';
import colors from '../theme/colors';
import ReviewBottomSheet from '../components/bottomSheets/ReviewBottomSheet';
import { useSelector, useDispatch } from 'react-redux';
import { submitReview } from '../../actions/restroomActions';

function ReviewScreen({ navigation, route }) {
  const reference = useRef(null);
  const dispatch = useDispatch();

  const { geohash } = route.params;

  const [comment, setComment] = useState('');
  const { rating, image } = useSelector((state) => state.restroomReview);

  const submitHandler = () => {
    const reviewData = {
      geohash,
      comment,
      rating,
      image,
    };

    dispatch(submitReview(reviewData));

    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{color: colors.white}}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Review</Text>
          <View style={styles.TextInput}>
            <TextInput
              label="Review"
              onChangeText={(text) => setComment(text)}
              placeholder="How Was It?"
              mode="outlined"
              multiline
              color= 'white'
            />
          </View>
          <Text style={styles.title}>Rating</Text>
          <SafeAreaView style={styles.ratingcontainer}>
            <Rating />
          </SafeAreaView>
          <TouchableOpacity style={{ margin: 5 }}>
            <AppButton
              title="Add Photo"
              onPress={() => reference.current.snapTo(0)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5 }}>
            <AppButton title="Submit Review" onPress={submitHandler} />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {image !== '' && (
              <Image source={{ uri: image }} style={styles.image} />
            )}
          </View>
        </View>
      </ScrollView>
      <ReviewBottomSheet reference={reference} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    color: colors.white,
  },

  titlecontainer: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    color: colors.white,
    width: '100%',
    paddingHorizontal: 20,
  },
  ratingcontainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    marginTop: 30,
    alignSelf: 'center',
    color: colors.white,
  },
  TextInput: {
    height: 200,
    borderWidth: 3,
    borderRadius: 7.5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.white,
  },
  imageContainer: {
    width: '100%',
    marginBottom: 10,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 350,
  },
});

export default ReviewScreen;
