import React from "react"; 
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps"; 
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import useLocation from "../../hooks/useLocation";


export default function MapScreen(){
  const location = useLocation();
  console.log(JSON.stringify(location));
  return(
    <View style={styles.container}>
      <MapView 
      provider={PROVIDER_GOOGLE} //Google Maps 
      style = {styles.map}
      showsUserLocation = {true}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0121,
      }}
      ></MapView> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
