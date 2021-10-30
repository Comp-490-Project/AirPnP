import React, { useEffect,useState } from "react";
import { StyleSheet, Button, Text, View, Dimensions, SafeAreaView,Image,TextInput,TouchableOpacity} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker,Circle } from "react-native-maps";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import useLocation from "../../hooks/useLocation";
import AppButton from "../../components/AppButton";
import {firebase} from "../../../Firebase/firebase"
import markerImage from '../marker.png';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from "react-native-reanimated";
import Rating from "../../components/Rating";

export default function AddScreen() {

  const [ mapRegion, setRegion ] = useState(null)
  const [ hasLocationPermissions, setLocationPermission ] = useState( false )
  const [ location, setLocation] = useState(null);
  const [text, setText] = useState(null);
  const [markerLoaded, setMarkerLoaded] = useState(false); 
  const sheetRef = React.useRef(null);

  const renderCont = () =>(
    <View style={styles.swipeBox}>
      <Text>Swipe Down To Close</Text>
      <View style={styles.cont3}>
        <Text style={styles.title}>Description</Text>
        <View style={styles.TextInput}>
          <TextInput
            label="Description:"
            onChangeText={(text) => setText(text)}
            placeholder="How Was It?."
            mode="outlined"
            multiline={true}
          />
        </View>
        <Text style={styles.title}>Rating</Text>
        <Rating></Rating>
        <Text style={styles.text}></Text>
        <View style={styles.cont1}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );



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
      </MapView>
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={markerImage}/>    
      </View> 
      <View style={styles.addButton}>
        <AppButton title="Add" onPress={()=>sheetRef.current.snapTo(0)}/>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["57%",0]}
        initialSnap={1}
        borderRadius={10}
        renderContent={renderCont}
        enabledGestureInteraction={true}
      />
   </View>  
  )
}

const styles = StyleSheet.create({
  swipeBox:{
    backgroundColor: "white",
    padding: 16,
    height: 600,
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 40
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
    paddingLeft: 13
  },
  title: {
    fontSize: 35,
    marginTop: 30,
    alignSelf: 'center'
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
    width: 300,
    position: "relative",
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    color: "#FFF",
  },
  TextInput:{
    height: 200, 
    borderWidth: 3,
    borderRadius: 20,
    paddingTop:10,
    paddingLeft: 10,
    paddingRight: 10,
  }
})