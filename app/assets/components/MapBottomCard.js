import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import StarFilled from '../icons/rating/star-filled.png';
import { useFontLoader } from '../../hooks/useFontLoader';
import AnimationLoad from './AnimationLoad';
import LightText from './LightText';
import AttributeButton from './AttributeButton';
import DirectionsIcon from './DirectionsIcon';
import FeedIcon from './FeedIcon';
import ToiletIcon from '../icons/toilet-icon.png';
import DistancePersonIcon from '../icons/distance-person-icon.svg';
import { WIDTH } from '../../constants/Dimensions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

function MapBottomCard({ navigation }) {
  const { geohash, latitude, longitude, meanRating, name, address, distance } =
    useSelector((state) => state.restroomMarker);

  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return <AnimationLoad />;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('RestroomInfo')}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.mapCardPrimary, colors.mapCardSecondary]}
        locations={[0, 0.7]}
        style={styles.cardBackground}
      >
        <View style={styles.cardContainer}>
          <View style={styles.headingContainer}>
            <LightText fontSize={28} fontWeight={'700'}>
              {name}
            </LightText>
            {/* TODO: Count number of reviews */}
            {meanRating !== 0 && (
              <View style={styles.ratingContainer}>
                <Image source={StarFilled} style={styles.starIcon} />
                <LightText>{meanRating}</LightText>
              </View>
            )}
          </View>
          {/* @TODO: Convert coordinates into address */}
          <View style={styles.addressContainer}>
            <LightText fontWeight="500" lineHeight={20}>
              {address}
            </LightText>
          </View>
          {/* @TODO: Check if restaurant description contains word restaurant */}
          <View style={styles.attributeContainer}>
            <AttributeButton attribute="free" />
            <AttributeButton attribute="restaurant" />
          </View>
          <View style={styles.footerContainer}>
            {/* @TODO: Convert distance in km to mi or feet */}

            <View style={styles.distanceContainer}>
              {distance < 2640 ? (
                <>
                  <DistancePersonIcon style={styles.distanceIcon} />
                  <LightText>{`${distance} ft`}</LightText>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faCar}
                    size={22}
                    color={colors.backgroundLight}
                    style={styles.distanceIcon}
                  />
                  <LightText>{`${(distance / 5280).toFixed(1)} mi`}</LightText>
                </>
              )}
            </View>
            <View style={styles.btnContainer}>
              <View style={{ marginRight: 15 }}>
                <DirectionsIcon latitude={latitude} longitude={longitude} />
              </View>
              <View>
                <FeedIcon navigation={navigation} geohash={geohash} />
              </View>
            </View>
          </View>
          <Image source={ToiletIcon} style={styles.toiletBackground} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardBackground: {
    width: WIDTH * 0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
  },
  cardContainer: {
    padding: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  headingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  addressContainer: {
    marginVertical: 10,
  },
  attributeContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceIcon: {
    marginRight: 6,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  toiletBackground: {
    position: 'absolute',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    right: 0,
    bottom: 0,
    top: 0,
    height: '130%',
    width: '40%',
  },
});

export default MapBottomCard;
