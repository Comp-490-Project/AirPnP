import React, { useEffect,useState } from "react";
import { StyleSheet, Button, Text, View, Dimensions, SafeAreaView,Image} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker,Circle } from "react-native-maps";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import useLocation from "../../hooks/useLocation";
import AppButton from "../../components/AppButton";
import markerImage from '../marker.png';



export default function AddScreen() {

  const [ mapRegion, setRegion ] = useState(null)
  const [ hasLocationPermissions, setLocationPermission ] = useState( false )
  const [ location, setLocation] = useState(null);

  useEffect(()=>{
    const getLocationAsync = async () =>{
      let {status} = await Location.requestForegroundPermissionsAsync();
      if('granted'!==status){
        setLocation('Permission to access location was denied')
      }else{
        setLocationPermission(true);
      }
      let {coords:{ latitude,longitude } } = await Location.getLastKnownPositionAsync();
      setLocation( JSON.stringify( { latitude, longitude } ) )

      setRegion({latitude, longitude, latitudeDelta: 0.0121, longitudeDelta: 0.0015}) //Center Map on Location fetched above.
    };
    console.log(mapRegion);
    getLocationAsync();
  },[]);

  if ( location === null ) { //Loading Animations Here
      return <Text>Finding your current location...</Text>
  }

  if ( hasLocationPermissions === false ) { //Loading Animations Here
      return <Text>Location permissions are not granted.</Text>
  }

  if ( mapRegion === null ) { //Loading Animations Here
      return <Text>Map region doesn't exist.</Text>
  }

  const onRegionChange = mapRegion =>{
    setRegion(mapRegion)
  }

  const markerHandle = mapRegion =>{
    <Marker
      coordinate={{
        latitude: -118,
        longitude:-34
      }}
    > 
    </Marker>
  }

  return (
    <View style={styles.container}>
      <MapView
        style={ styles.map }
        showsMyLocationButton={true}
        showsUserLocation={true}
        initialRegion={mapRegion}
        onRegionChangeComplete={onRegionChange}
      >
      <Circle //TODO: This needs to be responsive in regards to the latDelta/longDelta values in the MapView. 
        center={mapRegion}
        strokeColor = { '#1a66ff' }
        strokeWidth = { 1 }
        radius={20}
        fillColor = { 'rgba(230,238,255,0.5)' }
      ></Circle>
      </MapView>
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={markerImage}/>    
      </View> 
      <View style={styles.addButton}>
        <AppButton title="Add" onPress={markerHandle}/>
      </View>
   </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  addButton:{
    position: 'absolute',
    bottom: 50,
    width: 200,
    marginBottom: 10,
    height: 10,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -50,
    position: 'absolute',
    top: '55%'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: { //TODO: This needs to be responsive in regards to the latDelta/longDelta values in the MapView. 
    height: 48,
    width: 48
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  },
})