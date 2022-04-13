import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppButton from '../components/AppButton';
import colors from '../theme/colors';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteHandler } from '../../actions/userActions';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();

  const { userFavorites } = useSelector((state) => state.userFavorites);

  const maxRating = [1, 2, 3, 4, 5];

  return (
  <View style= {styles.container}> 
    <View style={styles.topBorder} />
    <Text style={styles.title}>Favorites</Text>
    <ScrollView>
      
      
      {userFavorites.length == 0 ? (
        <Text style={{ flex: 1, justifyContent: 'center' }}>
          Data Not Available!
        </Text>
      ) : (
        userFavorites.map((restroom, index) => (
          <View style={styles.itemView} key={index}>
            <Text style={styles.nameText}>{restroom.name}</Text>
            <View style={styles.customRatingBarStyle}>
              <Text>Rating </Text>
              {restroom.meanRating && restroom.meanRating == 1 ? (
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
                      item <= restroom.meanRating
                        ? require('../icons/rating/star-filled.png')
                        : require('../icons/rating/star-unfilled.png')
                    }
                  />
                ))
              )}
            </View>

            <Text>{restroom.description}</Text>
            <View style={styles.buttons}>
              <AppButton
                style={styles.navButton}
                title="Navigate"
                onPress={() => {
                  const { latitude, longitude } = userFavorites[index];

                  Platform.OS === 'ios'
                    ? Linking.openURL(`maps:${latitude},${longitude}`)
                    : Linking.openURL(`geo:0,0?q=${latitude},${longitude}`);
                }}
              ></AppButton>
              <AppButton
                title="Rate"
                onPress={() => {
                  navigation.navigate('Review', {
                    geohash: userFavorites[index].geohash,
                  });
                }}
              ></AppButton>
              <AppButton
                title="Remove"
                onPress={() => dispatch(favoriteHandler(restroom.geohash))}
              ></AppButton>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  </View>   
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greyBackground,
    

  },
  title:{
    textAlign: 'center',
    color: colors.white,
    fontSize: 26,
    fontFamily: 'Roboto',
    paddingBottom: 50
  },
  itemView: {
    color: colors.textLeft,
    padding: 15,
    borderColor: colors.white,
    borderRadius: 30,
    borderWidth: 10,

  },
  nameText: {
    fontWeight: 'bold',
  },
  buffer:{
  height: 50,
  },
  buttons: {
    padding: 15,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  navButton: {
    width: '50%',
  },
  topBorder: {
    height: 50,
    color: colors.greyBackground
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

export default FavoritesScreen;
