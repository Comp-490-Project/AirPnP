import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Linking,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppButton from '../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteHandler } from '../../actions/userActions';
import colors from '../theme/colors';

function RestroomInfo({ navigation }) {
  const {
    description,
    geohash,
    latitude,
    longitude,
    meanRating,
    name,
    images,
    isFavorited,
  } = useSelector((state) => state.restroomMarker);
  const dispatch = useDispatch();
  const maxRating = [1, 2, 3, 4, 5];
  const { user } = useSelector((state) => state.userAuth);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.bottomSheetPanel}>
        {user && (
          <TouchableOpacity
            onPress={() => {
              dispatch(favoriteHandler(geohash));
            }}
          >
            <Image
              style={styles.heart}
              source={
                !isFavorited
                  ? require('../icons/favorite-heart/heart-unfilled.png')
                  : require('../icons/favorite-heart/heart-filled.png')
              }
            />
          </TouchableOpacity>
        )}
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.panelRestroomName}>{name}</Text>
          <View style={styles.customRatingBarStyle}>
            <Text>Rating: </Text>

            {meanRating && meanRating == 1 ? (
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
                    item <= meanRating
                      ? require('../icons/rating/star-filled.png')
                      : require('../icons/rating/star-unfilled.png')
                  }
                />
              ))
            )}
          </View>
          <Text style={styles.panelRestroomDescription}>{description}</Text>
        </View>
        <View style={{ alignContent: 'space-around' }}>
          <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() =>
              Platform.OS === 'ios'
                ? Linking.openURL(`maps:${latitude},${longitude}`)
                : Linking.openURL(`geo:0,0?q=${latitude},${longitude}`)
            }
          >
            <AppButton
              title={'Navigate'}
              styles={{ width: '80%' }}
              onPress={() =>
                Platform.OS === 'ios'
                  ? Linking.openURL(`maps:${latitude},${longitude}`)
                  : Linking.openURL(`geo:0,0?q=${latitude},${longitude}`)
              }
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5 }}>
            <AppButton
              title={'Feed'}
              styles={{ width: '80%' }}
              onPress={() => navigation.navigate('Feed', { geohash })}
            />
          </TouchableOpacity>
          {user && (
            <>
              <TouchableOpacity style={{ margin: 5 }}>
                <AppButton
                  title={'Camera'}
                  styles={{ width: '80%' }}
                  onPress={() => navigation.navigate('Camera', { geohash })}
                />
              </TouchableOpacity>
            </>
          )}

          {user && (
            <>
              <View Style={{ height: 10, backgroundColor: colors.white }} />
              <TouchableOpacity style={{ margin: 5 }}>
                <AppButton
                  title={'Rate'}
                  styles={{ width: '80%' }}
                  onPress={() => navigation.navigate('Review', { geohash })}
                />
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
            {images.map((image, index) => (
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
    </View>
  );
}
const styles = StyleSheet.create({
  bottomSheetHeader: {
    backgroundColor: colors.white,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetpanelHeader: {
    alignItems: 'center',
  },
  bottomSheetpanelHandle: {
    width: 40,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.lightgray,
    marginBottom: 10,
  },
  bottomSheetPanel: {
    backgroundColor: colors.white,
    padding: 10,
  },
  panelRestroomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  panelRestroomDescription: {
    fontSize: 12,
    fontWeight: 'normal',
    margin: 10,
  },
  heart: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginHorizontal: 15,
  },
  customRatingBarStyle: {
    flexDirection: 'row',
  },
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});
export default RestroomInfo;
