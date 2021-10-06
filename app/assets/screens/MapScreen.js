import React from "react"; 
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps"; 
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import useLocation from "../../hooks/useLocation";


export default function MapScreen(){
  const location = useLocation();
  return(
    <View style={styles.container}>
      <MapView 

      />
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
