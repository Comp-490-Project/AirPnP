import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { auth } from '../../firebase';
import AnimationLoad from '../components/AnimationLoad';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapMarker from '../components/MapMarker';
import SearchBar from '../components/SearchBar';
import MapBottomCard from '../components/MapBottomCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserLocation,
  checkUserStatus,
  getUserFavorites,
} from '../../actions/userActions';
import { getRestrooms } from '../../actions/restroomActions';
import { useDirections } from '../../hooks/useDirections';



function RestroomInfo({ navigation, marker }) {
    const dispatch = useDispatch();
    const maxRating = [1, 2, 3, 4, 5];
    const { user } = useSelector((state) => state.userAuth);

return (
    <View style={styles.bottomSheetPanel}>
    {user && (
      <TouchableOpacity
        onPress={() => {
          dispatch(favoriteHandler(marker.geohash));
        }}
      >
        <Image
          style={styles.heart}
          source={
            !marker.isFavorited
              ? require('../icons/favorite-heart/heart-unfilled.png')
              : require('../icons/favorite-heart/heart-filled.png')
          }
        />
      </TouchableOpacity>
    )}
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.panelRestroomName}>{marker.name}</Text>
      <View style={styles.customRatingBarStyle}>
        <Text>Rating: </Text>

        {marker.meanRating && marker.meanRating == 1 ? (
          <Image
            style={styles.starImgStyle}
            source={require('../icons/poop-emoji.png')}
          />
        ) : (
          maxRating.map((item, index) => (
            <Image
              style={styles.starImgStyle}
              key={index}
              source={
                item <= marker.meanRating
                  ? require('../icons/rating/star-filled.png')
                  : require('../icons/rating/star-unfilled.png')
              }
            />
          ))
        )}
      </View>
      <Text style={styles.panelRestroomDescription}>{marker.description}</Text>
    </View>
    <View style={{ alignContent: 'space-around' }}>
      <TouchableOpacity
        style={{ margin: 5 }}
        onPress={() =>
          Platform.OS === 'ios'
            ? Linking.openURL(`maps:${latitude},${marker.longitude}`)
            : Linking.openURL(`geo:0,0?q=${latitude},${marker.longitude}`)
        }
      >
        <AppButton title={'Navigate'} styles={{ width: '80%' }} />
      </TouchableOpacity>
      {user && (
        <>
          <View Style={{ height: 10, backgroundColor: colors.white }} />
          <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() => navigation.navigate('Review',  marker.geohash )}
          >
            <AppButton title={'Rate'} styles={{ width: '80%' }} />
          </TouchableOpacity>
        </>
      )}
    </View>
    <View style={{ marginTop: 10, marginRight: 10 }}>
      <ScrollView
        style={{ width: Dimensions.get('window').width, height: 200 }}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
      >
        {marker.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{
              width: Dimensions.get('window').width,
              height: 200,
              resizeMode: 'center',
            }}
          />
        ))}
      </ScrollView>
    </View>
  </View>



);
}
export default RestroomInfo;