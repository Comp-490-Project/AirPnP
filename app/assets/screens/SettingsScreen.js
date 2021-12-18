import { Text, TextInput, View, ScrollView, TouchableOpacity, StyleSheet, Switch, Button, SafeAreaView, Alert } from "react-native";
import { Auth, firebase } from '../../../Firebase/firebase';
import React, { useState, useEffect } from 'react';
import colors from "../../assets/config/colors";
import AppButton from "../../components/AppButton";
import { auth } from "../../../Firebase/firebase";
import CustomAlertComponent from "../../components/CustomAlertComponent";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";


export default function SettingsScreen({navigation})  { 
  const user = firebase.auth().currentUser;
  
  const Logout=()=>{
    if(user){
      firebase.auth().signOut().then(()=>{
        navigation.navigate("login");
      })
    }else{
      return(
        <CustomAlertComponent style={styles.container}></CustomAlertComponent>
      )
    }
  } 

  //Do an onpress that  calls a function that has the custom alert component, use imbedded decision JSX to choose when to bring it up.

  const [darkMode, setDarkMode] = useState(false);

    return (
      <ScrollView style={styles.LogoutButton}> 
        <View  style={styles.container}>
          <Text> {'Dark Mode'} </Text>
          <Switch
            trackColor={{false: 'grey', true: 'teal'}}
            thumbColor="white"
            onValueChange={(value) => setDarkMode(value)}
            value={darkMode}
          /> 
        </View>
        <View style={{ flex: 1, marginBottom: 10 }}>
          <TouchableOpacity> 
          <AppButton title= "LogOut" onPress={Logout}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#dcdcdc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
   
  },
  container1:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5FCFF'
  },
  LogoutButton: {
    paddingTop: 90,
    padding: 7,  
    //bottom: 100,
    //left: 20,
    //right: 20,
    height: 30,
    //marginBottom: 10,  
    
  },

  appButtonContainer: {
    elevation: 8,
    //backgroundColor: "#dcdcdc",
    //borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
    
  },
  appButtonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    //alignSelf: "center",
    //textTransform: "uppercase"
  }
});

  
//});





 /* const [restrooms, setRestrooms] = useState([]);
  const [restroomsLoaded, setRestroomsLoaded] = useState(false);
async function getRestrooms() {
  const query = firebase.firestore().collection('Los Angeles');

  query.get().then((querySnapshot) => {
    const docs = querySnapshot.docs;
    for (const doc of docs) {
      setRestrooms((restrooms) => [...restrooms, doc.data()]);
    }
    setRestroomsLoaded(true);
  });
}

async function addRestroom(restroom) {
  const dataRef = firebase.firestore().collection('Los-Angeles');

  await dataRef.doc( geohashForLocation([restroom.latitude, restroom.longitude])).set({
    latitude: restroom.latitude,
    longitude: restroom.longitude,
    description: restroom.description,
    name: restroom.name,
    geohash: geohashForLocation([restroom.latitude, restroom.longitude])
   
  });
}

useEffect(() => {
  if (!restroomsLoaded) {
    getRestrooms();
  }
}, [restroomsLoaded]);
useEffect(() => {
  if (restroomsLoaded) {   
    restrooms.forEach(restroom => {
    addRestroom(restroom)
    });
  }
}, [restroomsLoaded]);


async function getData() {
  const center = [34.2402, -118.5553]
  const radiusInM = 100
const bounds = geohashQueryBounds(center, radiusInM);
const promises = [];
for (const b of bounds) {
  const q = firebase.firestore().collection('Northridge4')
    .orderBy('geohash')
    .startAt(b[0])
    .endAt(b[1]);

  promises.push(q.get());
}

// Collect all the query results together into a single list
Promise.all(promises).then((snapshots) => {
  const matchingDocs = [];
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const lat = doc.get('latitude');
      const lng = doc.get('longitude');

      // We have to filter out a few false positives due to GeoHash
      // accuracy, but most will match
      const distanceInKm = distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        matchingDocs.push(doc);
      }
    }
  }

  return matchingDocs;
}).then((matchingDocs) => {
  matchingDocs.forEach((matchingDoc) => {
    console.log(matchingDoc.data());
  });
});
}
useEffect(() =>{
  getData()
},[])



  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings! Welcome! </Text>
          {restroomsLoaded && restrooms.map((restroom) => (
         
      <Text> {restroom.name} </Text>
                        ))}
    </View>
  );

*/