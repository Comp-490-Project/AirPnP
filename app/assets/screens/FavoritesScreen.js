import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomAlertComponent from '../../components/CustomAlertComponent';
import { firebase } from '../../../Firebase/firebase';
import { auth } from '../../../Firebase/firebase';
import AppButton from '../../components/AppButton';
import colors from '../config/colors';
import { Linking } from 'react-native';
var restroomKey;

const user2 = firebase.auth().currentUser;

export default function FavoritesScreen({ navigation, keys, setKeys }) {
  const [fv, setfv] = useState([]);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  // async function getKeyData() {
  //   const user = firebase.auth().currentUser;
  //   const query = await firebase.firestore().collection('users');
  //   query
  //     .doc(user.uid)
  //     .get()
  //     .then((querySnapshot) => {
  //       const favs = querySnapshot.data();
  //       favs.favorites.forEach((favKey) => {
  //         setKeys((keys) => [...keys, favKey]);
  //       });
  //       getFavoriteData();
  //     });
  // }

  function handleRating(id) {
    restroomKey = fv[id].geohash;
    navigation.navigate('review', { restroomKey });
  }

  function handleNav(index) {
    openGps(fv[index].latitude, fv[index].longitude);
  }

  async function handleRemove(id) {
    const user = firebase.auth().currentUser;
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        favorites: firebase.firestore.FieldValue.arrayRemove(fv[id].geohash),
      });

    // Remove from keys array for 'MapScreen.js' to update
    setKeys(keys.filter((key) => key !== fv[id].geohash));
    setfv(fv.filter((index) => index.geohash !== fv[id].geohash));
    // need to rerender the screen here
  }

  const openGps = (lati, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:0,0?q=';
    var url = scheme + `${lati},${lng}`;
    Linking.openURL(url);
  };

  async function getFavoriteData() {
    setfv([]);
    const query = await firebase.firestore().collection('Los-Angeles');
    keys.forEach((key) => {
      query
        .doc(key)
        .get()
        .then((querySnapshot) => {
          setfv((fv) => [...fv, querySnapshot.data()]);
        });
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getFavoriteData();
      }
    });

    return unsubscribe;
  }, [keys]);

  return (
    <ScrollView contentContainerstyle={styles.container}>
      <View style={styles.topBorder} />
      {fv.length == 0 && (
        <Text style={{ flex: 1, justifyContent: 'center' }}>
          Data Not Available!
        </Text>
      )}
      {fv &&
        fv.map((restroom, index) => (
          <View style={styles.itemView} key={index}>
            <Text style={styles.nameText}>{restroom.name}</Text>
            <View style={styles.customRatingBarStyle}>
              <Text>Rating </Text>
              {restroom.meanRating && restroom.meanRating == 1 ? (
                <Image
                  style={styles.starImgStyle}
                  source={require('../poopy.png')}
                />
              ) : (
                maxRating.map((item, index) => {
                  return (
                    <Image
                      style={styles.starImgStyle}
                      key={index}
                      source={
                        item <= restroom.meanRating
                          ? require('../star_filled.png')
                          : require('../star_corner.png') // could change to a blank image so it wont show
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
