import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { handleReviewStars } from '../../actions/restroomActions';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';

function Rating() {
  const dispatch = useDispatch();

  const [defaultRating, setDefaultRating] = useState(0);
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
    <View>
      <CustomRatingBar></CustomRatingBar>
    </View>
  );
}

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImgStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
});

export default Rating;
