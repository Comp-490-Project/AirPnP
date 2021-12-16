
import { Text, View, Image } from "react-native";
import { firebase } from '../../../Firebase/firebase';
import React, { useState, useEffect } from 'react';
import { geohashForLocation, geohashQueryBounds , distanceBetween} from 'geofire-common';
import AppButton from "../../components/AppButton";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
export default function SettingsScreen() {
const rimageUrls = ["https://firebasestorage.googleapis.com/v0/b/airpnp-327419.appspot.com/o/9q5dyb6cuh%2FOsaenozZatP5S3yZW2uuLkWg8yz2?alt=media&token=b9af2cf5-c23a-4325-8078-002aedcaa261","https://firebasestorage.googleapis.com/v0/b/airpnp-327419.appspot.com/o/9q5dyb6cuh%2F9q5dyb6cuh?alt=media&token=59070a5a-4bc4-4854-aa02-52070e95c993"]
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
*/

var reference
 async function handledata(){


 reference = await firebase.storage().ref("9q5dyb6cuh").listAll();// testing to get the photos path name

reference.items.map((item) => (
  firebase.storage().ref(item._delegate._location.path_).getDownloadURL().then((url)=> console.log(url) )
 ))

}


//9q5dyb6cuh this restroom has multiple photos

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings! Welcome! </Text>
      <AppButton title = "get photo data"  onPress={handledata} />
      
      <ScrollView
           pagingEnabled
           horizantal
           showsHorizontalScrollIndicator = {false}>
            {rimageUrls.map((image,index)=>
              <Image
              key = {index}
              source = {{uri: image}}
              style = {{height: 50, width: 50, resizeMode: "cover"}}
                />               
            )}
      </ScrollView>
      
                     
    </View>
  );

    }

