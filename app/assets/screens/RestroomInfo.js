import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Linking,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faDirections,
  faHeart,
  faCircleCheck,
  faPencil,
  faImages,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import SafeView from '../components/SafeView';
import LightText from '../components/LightText';
import StarUnfilled from '../icons/rating/star-unfilled.png';
import BackButton from '../icons/back-btn.png';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteHandler, visitHandler } from '../../actions/userActions';
import colors from '../theme/colors';
import Review from '../components/Review';
import mapStyle from '../../constants/mapStyle';

function RestroomInfo({ navigation }) {
  const dispatch = useDispatch();

  const {
    geohash,
    latitude,
    longitude,
    meanRating,
    name,
    reviews,
    images,
    isFavorited,
    isVisited,
  } = useSelector((state) => state.restroomMarker);
  const { user } = useSelector((state) => state.userAuth);

  const openInMaps = (latitude, longitude) =>
    Platform.OS === 'ios'
      ? Linking.openURL(`maps:${latitude},${longitude}`)
      : Linking.openURL(`geo:0,0?q=${latitude},${longitude}`);

  return (
    <SafeView>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Image style={styles.backButton} source={BackButton} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <LightText
          fontSize={36}
          fontWeight="bold"
          lineHeight={40}
          textAlign="center"
        >
          {name}
        </LightText>
        <View style={styles.mapContainer}>
          <View style={styles.mapFooterContainer}>
            <View style={styles.btnContainerLeft}>
              <View style={styles.mapBtnContainer}>
                <TouchableOpacity
                  onPress={() => openInMaps(latitude, longitude)}
                >
                  <FontAwesomeIcon
                    icon={faDirections}
                    size={30}
                    color={colors.backgroundLight}
                  />
                </TouchableOpacity>
              </View>
              {user && (
                <>
                  <View style={styles.mapBtnContainer}>
                    <TouchableOpacity
                      onPress={() => dispatch(favoriteHandler(geohash))}
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        size={30}
                        color={
                          isFavorited
                            ? colors.secondary
                            : colors.backgroundLight
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.mapBtnContainer}>
                    <TouchableOpacity
                      onPress={() => dispatch(visitHandler(geohash))}
                    >
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size={30}
                        color={
                          isVisited ? colors.secondary : colors.backgroundLight
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
          <MapView
            style={styles.mapView}
            mapPadding={{
              top: 0,
              right: 0,
              bottom: 30,
              left: 0,
            }}
            customMapStyle={mapStyle}
            showsUserLocation
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
            />
          </MapView>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={{ width: '48%' }}
            onPress={() => navigation.navigate('Review', { geohash })}
          >
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
                  color={colors.backgroundLight}
                  style={styles.faPencil}
                />
                <LightText fontSize={16}>Write a Review</LightText>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '48%' }}
            onPress={() => navigation.navigate('Feed', { geohash })}
          >
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
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalRule} />
        <View style={styles.reviewsContainer}>
          <LightText fontSize={16}>Reviews</LightText>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              {meanRating ? (
                <FontAwesomeIcon
                  icon={faStar}
                  size={20}
                  style={styles.faStar}
                />
              ) : (
                <>
                  <Image
                    source={StarUnfilled}
                    style={{ height: 20, width: 20 }}
                  />
                  <Image
                    source={StarUnfilled}
                    style={{ height: 20, width: 20 }}
                  />
                  <Image
                    source={StarUnfilled}
                    style={{ height: 20, width: 20 }}
                  />
                  <Image
                    source={StarUnfilled}
                    style={{ height: 20, width: 20 }}
                  />
                  <Image
                    source={StarUnfilled}
                    style={{ height: 20, width: 20 }}
                  />
                </>
              )}
            </View>
            <View style={styles.ratingText}>
              {meanRating ? (
                <LightText>{`${meanRating} out of 5`}</LightText>
              ) : (
                <LightText>Be the first to leave a review!</LightText>
              )}
            </View>
          </View>
          <LightText fontSize={12}>
            {reviews ? reviews.length : 0} ratings
          </LightText>
          {images.length > 0 && (
            <>
              <LightText fontSize={16}>Reviews with Images</LightText>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                style={styles.carouselContainer}
              >
                {images.map((image, index) => (
                  <Image
                    style={styles.reviewImage}
                    key={index}
                    source={{ uri: image }}
                  />
                ))}
              </ScrollView>
            </>
          )}
        </View>
        {reviews?.length > 0 && (
          <View style={styles.userReviews}>
            {reviews.map((review, index) => (
              <Review
                key={index}
                user={review.user || review.userID}
                comment={review.comment || review.Comment}
                rating={review.rating || review.Rating}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  contentContainer: {
    marginTop: 30,
    paddingBottom: HEIGHT * 0.1,
    minHeight: HEIGHT,
    maxWidth: WIDTH,
    paddingHorizontal: 10,
    backgroundColor: colors.backgroundDark,
  },
  mapContainer: {
    position: 'relative',
    height: HEIGHT * 0.3,
    width: '100%',
    marginVertical: 5,
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
  mapFooterContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 100,
  },
  btnContainerLeft: {
    flexDirection: 'row',
  },
  mapBtnContainer: {
    marginRight: 20,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  gradientReview: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
    overflow: 'hidden',
  },
  btnReview: {
    width: '98.5%',
    paddingVertical: 7,
    paddingHorizontal: 25,
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    borderRadius: 4,
  },
  gradientFeed: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
    borderBottomColor: colors.textDark,
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
