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
  // @todo
  // Find a way to do this without using route parameters
  const hashKey = route.params.restroomKey;

  const reference = useRef(null);
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const { rating, image } = useSelector((state) => state.restroomReview);

  const submitHandler = () => {
    const reviewData = {
      hashKey,
      comment,
      userRating: rating,
      imageSource: image,
    };

    dispatch(submitReview(reviewData));

    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Review</Text>
          <View style={styles.TextInput}>
            <TextInput
              label="Review"
              onChangeText={(text) => setComment(text)}
              placeholder="How Was It?"
              mode="outlined"
              multiline
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
  },

  titlecontainer: {
    flex: 1,
    backgroundColor: colors.white,
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
  },
  TextInput: {
    height: 200,
    borderWidth: 3,
    borderRadius: 7.5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
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
