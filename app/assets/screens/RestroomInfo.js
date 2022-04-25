import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Linking,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faPencil,
  faImages,
  faStar,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import SafeView from '../components/SafeView';
import DarkText from '../components/DarkText';
import LightText from '../components/LightText';
import StarFilled from '../icons/rating/star-filled.png';
import StarUnFilled from '../icons/rating/star-unfilled.png';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteHandler } from '../../actions/userActions';
import colors from '../theme/colors';
import Review from '../components/Review';

function RestroomInfo({ navigation }) {
  const dispatch = useDispatch();

  const {
    geohash,
    latitude,
    longitude,
    meanRating,
    name,
    images,
    isFavorited,
  } = useSelector((state) => state.restroomMarker);
  const { location } = useSelector((state) => state.userLocation);
  const { user } = useSelector((state) => state.userAuth);

  return (
    <SafeView>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <DarkText
          fontSize={36}
          fontWeight="bold"
          lineHeight={40}
          textAlign="center"
        >
          {name}
        </DarkText>
        <MapView
          style={styles.mapView}
          showsUserLocation={true}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0121,
          }}
        />
        <View style={styles.btnContainer}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.secondary, colors.primary]}
            locations={[0, 1]}
            style={styles.gradientReview}
          >
            <View style={styles.btnReview}>
              <FontAwesomeIcon
                icon={faPencil}
                size={20}
                style={styles.faPencil}
              />
              <DarkText fontSize={16}>Write a Review</DarkText>
            </View>
          </LinearGradient>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.secondary, colors.primary]}
            locations={[0, 1]}
            style={styles.gradientFeed}
          >
            <View style={styles.btnFeed}>
              <FontAwesomeIcon
                icon={faImages}
                size={20}
                style={styles.faImages}
              />
              <LightText fontSize={16}>View Feed</LightText>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.horizontalRule} />
        <View style={styles.reviewsContainer}>
          <DarkText fontSize={16} color={colors.black}>
            Reviews
          </DarkText>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              <FontAwesomeIcon icon={faStar} size={20} style={styles.faStar} />
              <FontAwesomeIcon icon={faStar} size={20} style={styles.faStar} />
              <FontAwesomeIcon icon={faStar} size={20} style={styles.faStar} />
              <FontAwesomeIcon icon={faStar} size={20} style={styles.faStar} />
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                size={20}
                style={styles.faStar}
              />
            </View>
            <View style={styles.ratingText}>
              <DarkText color="#000">4.5 out of 5</DarkText>
            </View>
          </View>
          <DarkText fontSize={12}>2 ratings</DarkText>
          <DarkText fontSize={16} color={colors.black}>
            Reviews with Images
          </DarkText>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={styles.carouselContainer}
          >
            <Image
              style={styles.reviewImage}
              source={{
                uri: 'https://images.pexels.com/photos/11303948/pexels-photo-11303948.jpeg?cs=srgb&dl=pexels-veeru-edits-11303948.jpg&fm=jpg',
              }}
            />
            <Image
              style={styles.reviewImage}
              source={{
                uri: 'https://images.pexels.com/photos/9225981/pexels-photo-9225981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
            />
            <Image
              style={styles.reviewImage}
              source={{
                uri: 'https://images.pexels.com/photos/631214/pexels-photo-631214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
            />
          </ScrollView>
        </View>
        <View style={styles.userReviews}>
          <Review />
        </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: HEIGHT,
    maxWidth: WIDTH,
    paddingHorizontal: 10,
  },
  mapView: {
    marginVertical: 5,
    height: HEIGHT * 0.3,
    width: '100%',
  },
  btnContainer: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  gradientReview: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '48%',
    height: '100%',
    overflow: 'hidden',
  },
  btnReview: {
    width: '98.5%',
    height: '97%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: 4,
  },
  gradientFeed: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  btnFeed: {
    paddingVertical: 7,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  faPencil: {
    marginRight: 8,
  },
  faImages: {
    color: 'white',
    marginRight: 8,
  },
  horizontalRule: {
    height: 6,
    width: '100%',
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    marginBottom: 6,
  },
  reviewsContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
  },
  faStar: {
    color: '#FDC630',
  },
  ratingText: {
    marginLeft: 8,
  },
  carouselContainer: {
    minWidth: WIDTH,
  },
  reviewImage: {
    height: HEIGHT * 0.1,
    width: WIDTH * 0.4,
    marginRight: 10,
    borderRadius: 5,
  },
  userReviews: {
    marginVertical: 12,
  },
});

export default RestroomInfo;
