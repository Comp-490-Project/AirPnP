
import { Text, View } from "react-native";
import { firebase } from '../../../Firebase/firebase';
import React, { useState, useEffect } from 'react';
import { geohashForLocation, geohashQueryBounds , distanceBetween} from 'geofire-common';

export default function SettingsScreen() {
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings! Welcome! </Text>
          {restroomsLoaded && restrooms.map((restroom) => (
         
      <Text> {restroom.name} </Text>
                        ))}
    </View>
  );

    }

