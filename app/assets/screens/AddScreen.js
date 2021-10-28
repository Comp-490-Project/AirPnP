import React, { useEffect,useState } from "react";
import { StyleSheet, Button, Text, View, Dimensions, SafeAreaView,Image,TextInput,ToucableOpacity} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker,Circle } from "react-native-maps";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import useLocation from "../../hooks/useLocation";
import AppButton from "../../components/AppButton";
import {firebase} from "../../../Firebase/firebase"
import markerImage from '../marker.png';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from "react-native-reanimated";

export default function AddScreen() {

  const [ mapRegion, setRegion ] = useState(null)
  const [ hasLocationPermissions, setLocationPermission ] = useState( false )
  const [ location, setLocation] = useState(null);
  const [text, setText] = useState(null);

  const sheetRef = React.useRef(null);

  const renderContent = () =>(
    <View style={styles.swipeBox}>
      <Text Swipe Down To Close></Text>
      <View style={styles.cont3}>
        <Text style={styles.title}> Address:</Text>
        <Text style={styles.subtitle}> 7420 Hi Ave</Text>
        <Text style={styles.title}> Description</Text>
        <TextInput
          label="Description:"
          style={{ height: 40 }}
          onChangeText={(text) => setText(text)}
          placeholder="Describe the features of the restroom being added."
          mode="outlined"
        />
        <Text style={styles.title}> Rating: HERE</Text>
        <Text style={styles.text}></Text>
        <View style={styles.cont1}>
          <ToucableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Submit</Text>
          </ToucableOpacity>
        </View>
      </View>
    </View>
  )


  /* Awaiting for the AddDetails Screen for the Restroom
  const [markerLoaded, setMarkerLoaded] = useState(false); 

  //Send Restroom Data to Firestore
  async function addRestroom(){
    const dataRef=firebase.firestore().collection('testing')
    await dataRef.doc('locationTest').set({
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude
    });
  };

  //Get single document from Firestore
  async function getOneRestroom(){
    const dataRef=firebase.firestore().collection('testing').doc('locationTest');
    const doc = await dataRef.get();
    console.log(doc.data());  
  }

//Get all documents from Colectio in Firestore
  async function getRestrooms(){
    const query = firebase.firestore().collection('testing');
    query.get().then((querySnapshot)=>{
     const docs = querySnapshot.docs;
      for(const doc of docs){
        setRestrooms((restrooms)=>[...restrooms,doc.data()]);
      }
      setMarkerLoadded(true);
    });
  }
*/

  useEffect(()=>{ //Must be made into a Hook (Leaving it Here For Now)
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

  return (
    <View style={styles.container}>
      <MapView
        style={ styles.map }
        showsMyLocationButton={true}
        showsUserLocation={true}
        initialRegion={mapRegion}
        onRegionChangeComplete={onRegionChange}
      >
      {/*
      <Circle //TODO: This needs to be responsive in regards to the latDelta/longDelta values in the MapView. 
        center={mapRegion}
        strokeColor = { '#1a66ff' }
        strokeWidth = { 1 }
        radius={20}
        fillColor = { 'rgba(230,238,255,0.5)' }
      ></Circle>
      */}
      </MapView>
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={markerImage}/>    
      </View> 
      <View style={styles.addButton}>
        <AppButton title="Add" onPress={()=>sheetRef.current.snapTo(1)}/>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450,300,0]}
        borderRadius={10}
        renderContent={renderContent}
      />
   </View>  
  )
}

const styles = StyleSheet.create({
  swipeBox:{
    backgroundColor: "white",
    padding: 16,
    height: 450,
    alignItems: "center",
    justifyContent: "flex-end",
  },
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
  cont1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    marginTop: 30,
  },
  subtitle: {
    fontSize: 20,
    color: "#474747",
    marginTop: 10,
  },
  cont3: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    paddingRight: 80,
    lineHeight: 25,
  },
  btn: {
    backgroundColor: "#E2443B",
    paddingHorizontal: 60,
    paddingVertical: 12,
    borderRadius: 30,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 20,
    color: "#FFF",
  },
})