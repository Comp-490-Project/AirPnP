import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase, auth } from '../../firebase';
import AppButton from '../components/AppButton';
import colors from '../theme/colors';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { USER_FAVORITE_REMOVED, USER_FAVORITE_RESTROOM_REMOVED } from '../../constants/userTypes';
import {getUserFavorites, getFavoriteData } from '../../actions/userActions';
var restroomKey;





function FavoritesScreen({ navigation}) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userStatus); // getting user status
  const { userFavoritesLoaded } = useSelector((state) => state.userFavorites);// boolean if loaded = true
  const { userFavorites } = useSelector((state) => state.userFavorites);  // holds the keys to the usersfavorite restrooms
  const { userFavoriteRestrooms } = useSelector((state) => state.userFavoriteRestrooms); // array of restrooms retrieved via the favorites array of keys


                            // **************************************************************move this array to the store
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  function handleRating(id) {
    restroomKey = userFavoriteRestrooms.geohash;// change to userFavoriteArray
  
    navigation.navigate('Review', { restroomKey });
  }

  function handleNav(index) {
    openGps(userFavoriteRestrooms[index].latitude, userFavoriteRestrooms[index].longitude);// change to userFavorites
  }

  async function handleRemove(id) {
    
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        favorites: firebase.firestore.FieldValue.arrayRemove(userFavoriteRestrooms[id].geohash),
      });
      dispatch({// ***************************************************************************update user favorites array in the store
        type: USER_FAVORITE_REMOVED,
        payload: userFavoriteRestrooms[id].geohash,
      });
      dispatch({// ***************************************************************************update user favorites array in the store
        type: USER_FAVORITE_RESTROOM_REMOVED,
        payload: userFavoriteRestrooms[id],
      });

    //*************payload is  sent to favoriteHandler update both arrays in favoriteHandler
  }

  const openGps = (lati, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:0,0?q=';
    var url = scheme + `${lati},${lng}`;
    Linking.openURL(url);
  };

  

  useEffect(() => {
    //const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !userFavoritesLoaded ) {
        dispatch(getUserFavorites());
        dispatch(getFavoriteData());
      }else{
        dispatch(getFavoriteData());
        
      }
   // });
    //return unsubscribe;
  }, []); 

  return (
    <ScrollView contentContainerstyle={styles.container}>
      <View style={styles.topBorder} />
      {userFavoriteRestrooms.length == 0 && (
        <Text style={{ flex: 1, justifyContent: 'center' }}>
          Data Not Available!
        </Text>
      )}
      {userFavoriteRestrooms &&
        userFavoriteRestrooms.map((restroom, index) => ( 
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
                maxRating.map((item, index) => {
                  return (
                    <Image
                      style={styles.starImgStyle}
                      key={index}
                      source={
                        item <= restroom.meanRating
                          ? require('../icons/rating/star-filled.png')
                          : require('../icons/rating/star-unfilled.png') // could change to a blank image so it wont show
                      }
                    />
                  );
                })
              )}
            </View>

            <Text>{restroom.description}</Text>
            <View style={styles.buttons}>
              <AppButton
                style={styles.navButton}
                title="Navigate"
                onPress={() => handleNav(index)}
              ></AppButton>
              <AppButton
                title="Rate"
                onPress={() => handleRating(index)}
              ></AppButton>
              <AppButton
                title="Remove"
                onPress={() => handleRemove(index)}
              ></AppButton>
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
  },
  itemView: {
    backgroundColor: colors.lightgray,
    padding: 15,
    borderColor: colors.white,
    borderBottomWidth: 10,
  },
  nameText: {
    fontWeight: 'bold',
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
  },
  topBorder: {
    height: 50,
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
