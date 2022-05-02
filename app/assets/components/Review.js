import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import StarUnfilled from '../icons/rating/star-unfilled.png';
import AttributeButton from './AttributeButton';
import LightText from './LightText';
import colors from '../theme/colors';
import { firebase } from '../../firebase';

const Review = ({ user, comment, rating }) => {
  const maxRating = [1, 2, 3, 4, 5];

  // const getUsername = async () => {
  //   const docRef = firebase.firestore().collection('users').doc(user);

  //   const snapshot = await docRef.get();

  //   console.log(snapshot.data());
  // };

  // useEffect(() => {
  //   getUsername();
  // }, []);

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <FontAwesomeIcon icon={faUser} size={20} style={styles.faUser} />
          </View>
          <View style={styles.postInfo}>
            <View style={styles.username}>
              <LightText lineHeight={15} fontWeight="bold">
                {user}
              </LightText>
            </View>
            {/* TODO: CreatedAt field in review */}
            <View style={styles.createdAt}>
              <LightText color="#A8A8A8" lineHeight={15}>
                August 19, 2021
              </LightText>
            </View>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.starContainer}>
            {maxRating.map((item, index) =>
              item <= rating ? (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  size={20}
                  style={styles.faStar}
                />
              ) : (
                <Image
                  key={index}
                  source={StarUnfilled}
                  style={{ height: 20, width: 20 }}
                />
              )
            )}
          </View>
          <View style={styles.attributeContainer}>
            <AttributeButton attribute="free" bgColor={colors.primary} />
            <AttributeButton attribute="restaurant" bgColor={colors.primary} />
          </View>
        </View>
      </View>
      <View style={styles.reviewBody}>
        <LightText lineHeight={25}>{comment}</LightText>
      </View>
      {/* TODO: image URI reference in review */}
      <View style={styles.reviewImage}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          style={styles.reviewImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: '#303645',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 75,
    borderRadius: 5,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#CDCDCD',
    alignSelf: 'flex-start',
    borderRadius: 50,
    padding: 7,
    marginRight: 8,
  },
  faUser: {
    color: 'white',
  },
  username: {
    marginBottom: 3,
  },
  ratingContainer: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attributeContainer: {
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starContainer: {
    flexDirection: 'row',
  },
  faStar: {
    color: '#FDC630',
  },
  reviewImage: {
    marginTop: 8,
    height: HEIGHT * 0.1,
    width: WIDTH * 0.4,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Review;
