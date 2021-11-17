import React, { useState, useEffect }  from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebase } from '../../../Firebase/firebase';
import { auth } from "../../../Firebase/firebase";


const favoriteRestroomKeys = []
const favoriteRestrooms = []

  export default function FavoritesScreen() {

    const [favoritesLoaded, setFavoritesLoaded] = useState(false);
    const [fv, setfv] = useState([]);

    async function getKeyData(){
      const user = firebase.auth().currentUser;
      const query = await firebase.firestore().collection('users');
      query
      .doc(user.uid)
      .get().
      then((querySnapshot) => {
        const favs = querySnapshot.data();
          favs.favorites.forEach(favKey => {
            favoriteRestroomKeys.push(favKey)
          })
          getFavoriteData()
      });
    }
    async function getFavoriteData(){
      const query = await firebase.firestore().collection('Los-Angeles');
      favoriteRestroomKeys.forEach(key => {
        console.log(key)
        query
        .doc(key)
        .get().
        then((querySnapshot) => {
          console.log(querySnapshot.data())
          favoriteRestrooms.push(querySnapshot.data());
        });
      });
        setFavoritesLoaded(true); 
        setfv(favoriteRestrooms);       
      }

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
         if (user) {
         getKeyData(); 
         }
       });
       return unsubscribe;
     },[]);
     



  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     
      {favoritesLoaded && fv.map((restroom, index) => (
          <Text key = {index}>{restroom.name}</Text> 
      ))}     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});