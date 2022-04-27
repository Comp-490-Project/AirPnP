import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import colors from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import LightText from '../components/LightText';
import DirectionsIcon from '../components/DirectionsIcon';
import FeedIcon from '../components/FeedIcon';
import ToiletIcon from '../icons/toilet-icon.png';
import ToiletIcon2 from '../icons/toilet2.png';
import { WIDTH } from '../../constants/Dimensions';
import HeartIcon from '../components/HeartIcon';

function RestroomCard({
  navigation,
  name,
  address,
  latitude,
  longitude,
  geohash,
  indexValue,
}) {
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
      <View style={styles.cardContainer}>
        <View style={styles.headingContainer}>
          <LightText fontSize={26} fontWeight={'700'}>
            {name}
          </LightText>
        </View>
        <View style={styles.addressContainer}>
          <LightText fontWeight="500" lineHeight={20}>
            {address}
          </LightText>
        </View>
        <View style={styles.stats}>
          <Image source={require('../icons/favstaticon.png')} />
          <LightText fontWeight="500" lineHeight={20}>
            {' 5 other have favorited this restroom!'}
          </LightText>
        </View>
        <View style={styles.stats2}>
          <Image source={require('../icons/visitedcheckmark.png')} />
          <LightText fontWeight="500" lineHeight={20}>
            {' 5 others have visited this restroom!'}
          </LightText>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.btnContainer}>
            <DirectionsIcon latitude={latitude} longitude={longitude} />
            <FeedIcon navigation={navigation} geohash={geohash} />
            <HeartIcon geohash={geohash} />
          </View>
        </View>
        {indexValue % 2 == 0 ? (
          <Image source={ToiletIcon2} style={styles.toiletBackground2} />
        ) : (
          <Image source={ToiletIcon} style={styles.toiletBackground} />
        )}
        <View style={styles.shadedfooter} />
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
  cardContainer: {
    padding: 20,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  headingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressContainer: {
    marginVertical: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  toiletBackground: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    height: '125%',
    width: '40%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  toiletBackground2: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    height: '125%',
    width: '40%',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  shadedfooter: {
    backgroundColor: 'black',
    opacity: 0.2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stats2: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default RestroomCard;
