import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebase } from '../../../Firebase/firebase';
import { auth } from '../../../Firebase/firebase';

export default function FavoritesScreen() {
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [keys, setKeys] = useState([]);
  const [fv, setfv] = useState([]);

  async function getKeyData() {
    const user = firebase.auth().currentUser;
    const query = await firebase.firestore().collection('users');
    query
      .doc(user.uid)
      .get()
      .then((querySnapshot) => {
        const favs = querySnapshot.data();
        favs.favorites.forEach((favKey) => {
          setKeys((keys) => [...keys, favKey]);
        });
        getFavoriteData();
      });
  }
  async function getFavoriteData() {
    const query = await firebase.firestore().collection('Los-Angeles');
    keys.forEach((key) => {
      console.log(key);
      query
        .doc(key)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot.data());
          setfv((fv) => [...fv, querySnapshot.data()]);
        });
    });
    setFavoritesLoaded(true);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getKeyData();
      }
    });
    return unsubscribe;
  }, [favoritesLoaded]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {fv &&
        fv.map((restroom, index) => <Text key={index}>{restroom.name}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
