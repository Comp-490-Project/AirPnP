import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { handleReviewStars } from '../../actions/restroomActions';

function Rating() {
  const dispatch = useDispatch();

  const [defaultRating, setDefaultRating] = useState(2);
  const maxRating = [1, 2, 3, 4, 5];

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                setDefaultRating(item);
                dispatch(handleReviewStars(item));
              }}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= defaultRating
                    ? require('../icons/rating/star-filled.png')
                    : require('../icons/rating/star-unfilled.png')
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomRatingBar></CustomRatingBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: -30,
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});

export default Rating;
