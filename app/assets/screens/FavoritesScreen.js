import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../Firebase/firebase';
import { auth } from '../../../Firebase/firebase';
import AppButton from '../../components/AppButton';
import colors from '../config/colors';
import { Linking } from 'react-native';


export default function FavoritesScreen({ navigation }) {
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

function handleRating(index){
  navigation.navigate('review')
  
}
function handleNav(index){

  openGps(fv[index].latitude, fv[index].longitude)

}
async function handleRemove(index){
  const user = firebase.auth().currentUser;
  await firebase
  .firestore()
  .collection('users')
  .doc(user.uid)
  .update({
    favorites: firebase.firestore.FieldValue.arrayRemove(fv[index].geohash),
  });
  alert("Restroom Removed")
  
  // need to rerender the screen here

}

const openGps = (lati, lng) => {
  var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:0,0?q=';
  var url = scheme + `${lati},${lng}`;
  Linking.openURL(url);
};

  async function getFavoriteData() {
    const query = await firebase.firestore().collection('Los-Angeles');
    keys.forEach((key) => {
      
      query
        .doc(key)
        .get()
        .then((querySnapshot) => {
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
  
    <ScrollView contentContainerstyle= {styles.container}>
      {!fv && <Text>Data Not Available!</Text>}
        <View style= {styles.topBorder}/>
      {fv &&
        fv.map((restroom, index) =>
        <View style= {styles.itemView}  key={index}>

            <Text style= {styles.nameText}>{restroom.name}</Text>
            <Text>{restroom.description}</Text>
            <View style={styles.buttons}>
              <AppButton  style= {styles.navButton} title= 'Navigate' onPress ={() => handleNav(index)} >
                 
              </AppButton>
              <AppButton title= 'Rate' onPress ={() => handleRating(index)}>

              </AppButton>
              <AppButton title= 'Remove' onPress ={() => handleRemove(index)}>

              </AppButton>
            </View>

        </View>
         )}
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: 'space-around'
  },
  itemView:{
    backgroundColor: colors.lightgray,
    padding :15,
    borderColor: colors.white,
    borderBottomWidth: 10,    
  },
  nameText: {
    fontWeight: 'bold'
  },
  buttons:{
    padding: 15,
   flexDirection:'row',
   flex: 1,
   justifyContent: 'space-around'
  },
  navButton:{
    width: '50%'
  },
  topBorder:{
    height: 50
  }

});
