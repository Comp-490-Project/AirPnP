import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import AttributeButton from './AttributeButton';
import DarkText from './DarkText';
import colors from '../theme/colors';

const Review = () => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <FontAwesomeIcon icon={faUser} size={20} style={styles.faUser} />
          </View>
          <View style={styles.postInfo}>
            <View style={styles.username}>
              <DarkText color={colors.black} lineHeight={15} fontWeight="bold">
                @johndoe
              </DarkText>
            </View>
            <View style={styles.createdAt}>
              <DarkText color="#706F6F" lineHeight={15}>
                August 19, 2021
              </DarkText>
            </View>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.starContainer}>
            <FontAwesomeIcon icon={faStar} size={20} style={styles.faStar} />
            <FontAwesomeIcon icon={faStar} size={20} style={styles.faStar} />
            <FontAwesomeIcon icon={faStar} size={20} style={styles.faStar} />
            <FontAwesomeIcon icon={faStar} size={20} style={styles.faStar} />
            <FontAwesomeIcon icon={faStar} size={20} style={styles.faStar} />
          </View>
          <View style={styles.attributeContainer}>
            <AttributeButton attribute="free" bgColor={colors.primary} />
            <AttributeButton attribute="restaurant" bgColor={colors.primary} />
          </View>
        </View>
      </View>
      <View style={styles.reviewBody}>
        <DarkText color={colors.black} lineHeight={25}>
          Adipiscing sed consequat, ullamcorpera curabitur sollicitudin ornare
          felis massa ac. Tellus cursus sed commodo ut. Metus id erat id vitae.
          Tortor donec vitae mi viverra. Sed consectetur tincidunt vivamus
          malesuada leo, volutpat ut scelerisque.
        </DarkText>
      </View>
      <View style={styles.reviewImage}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/9225708/pexels-photo-9225708.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
          style={styles.reviewImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: '#E2E2E2',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 75,
    borderRadius: 5,
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
