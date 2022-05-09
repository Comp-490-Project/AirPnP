import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import colors from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import LightText from '../components/LightText';
import DirectionsIcon from '../components/DirectionsIcon';
import FeedIcon from '../components/FeedIcon';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import HeartIcon from '../components/HeartIcon';
import ToiletIconRight from '../icons/toilet-icon.png';
import ToiletIconLeft from '../icons/toilet-icon-left.png';
import poopLeftIcon from '../icons/poop-left.png';
import poopRightIcon from '../icons/poop-right.png';
import checkLeftIcon from '../icons/check-left.png';
import checkRightIcon from '../icons/check-right.png';

function RestroomCard({
  navigation,
  name,
  address,
  latitude,
  longitude,
  geohash,
  indexValue,
  favorited,
  visited,
  cardMode,
}) {
  var leftIcon;
  var rightIcon;
  switch (cardMode) {
    case 1:
      leftIcon = ToiletIconLeft;
      rightIcon = ToiletIconRight;
      break;
    case 2:
      leftIcon = checkLeftIcon;
      rightIcon = checkRightIcon;
      break;
    case 3:
      leftIcon = poopLeftIcon;
      rightIcon = poopRightIcon;
      break;
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={
        indexValue % 2 == 0
          ? [colors.firstfavColorLeft, colors.firstfavColorRight]
          : [colors.secondFavColorLeft, colors.secondFavColorRight]
      }
      locations={[0, 0.7]}
      style={styles.cardBackground}
    >
      <View style={styles.cardBodyContainer}>
        <View style={styles.cardHeaderContainer}>
          <LightText fontSize={26} fontWeight={'700'}>
            {name}
          </LightText>
        </View>
        <View style={styles.addressContainer}>
          <LightText fontWeight="500" lineHeight={20}>
            {address}
          </LightText>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Image source={require('../icons/favstaticon.png')} />
            <LightText fontWeight="500" lineHeight={20}>
              {' '}
              {favorited || 0}
              {' others have favorited this restroom!'}
            </LightText>
          </View>
          <View style={styles.stat}>
            <Image source={require('../icons/visitedcheckmark.png')} />
            <LightText fontWeight="500" lineHeight={20}>
              {' '}
              {visited || 0}
              {' others have visited this restroom!'}
            </LightText>
          </View>
        </View>
        {indexValue % 2 == 0 ? (
          <Image source={leftIcon} style={styles.toiletBackgroundLeft} />
        ) : (
          <Image source={rightIcon} style={styles.toiletBackgroundRight} />
        )}
      </View>
      <View style={styles.cardFooterContainer}>
        <View style={styles.btnContainer}>
          <DirectionsIcon latitude={latitude} longitude={longitude} />
        </View>
        <View style={styles.btnContainer}>
          <FeedIcon navigation={navigation} geohash={geohash} />
        </View>
        <View style={styles.btnContainer}>
          <HeartIcon geohash={geohash} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardBackground: {
    width: WIDTH * 0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    marginBottom: 20,
  },
  cardBodyContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 0,
    paddingHorizontal: 20,
  },
  cardHeaderContainer: {
    width: '100%',
  },
  addressContainer: {
    marginVertical: 11,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },
  cardFooterContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnContainer: {
    marginRight: 20,
  },
  toiletBackgroundLeft: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    left: 0,
    bottom: 0,
    height: '105%',
  },
  toiletBackgroundRight: {
    position: 'absolute',
    borderTopRightRadius: 20,
    right: 0,
    bottom: 0,
    height: '105%',
  },
});

export default RestroomCard;
