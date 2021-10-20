import React, { useEffect,useState } from "react";
import { StyleSheet, Button, Text, View, Dimensions, SafeAreaView,Image} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import useLocation from "../../hooks/useLocation";
import MapViewDirections from 'react-native-maps-directions'
import AppButton from "../../components/AppButton";
import markerImage from '../marker.png';



/*
function AddScreen() {
  const location = useLocation();
  const [marker,setMarker]=useState({});

  

  useEffect(()=>{
    console.log(JSON.stringify(marker));
  },[marker]);

  const handlePress = (e) =>{
    setMarker(e.nativeEvent.coordinate)
  }

  return (
  <>
      {!location ? (
        <Text style= {styles.loadingText}>Loading...</Text>
      ) : (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          onPress={handlePress}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            longitudeDelta: 0.0015,
            latitudeDelta: 0.0121,
          }}
        >
          {mapMarkers()}
        </MapView> 
        <View style={styles.addButton}>
          <AppButton title="Add" onPress={null}/>
        </View>    
      </View> 
    )}
  </>
  );
}

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton:{
    position: 'absolute',
    bottom: 50,
    width: 200,
    marginBottom: 10,
    height: 10,

  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
}); 

*/

function AddScreen() {

  const location = useLocation();

  const [region,setRegion]=useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latidudeDelta: 0.025,
    longitudeDelta: 0.025
  })
  
  const onRegionChange = region =>{
    setRegion(region)
  }


  return(
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        loadingEnabled={true}
      />
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={markerImage}/>
      </View>
      <SafeAreaView style={styles.footer}>
        <Text style={styles.region}>{JSON.stringify(region,null,2)}</Text>
      </SafeAreaView>
    </View>
  );
}

export default AddScreen;

const styles = StyleSheet.create({
  map:{
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 30,
    width: 30
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }
})