import React, { useEffect,useState } from "react";
import { StyleSheet,Text, View, Dimensions, SafeAreaView,Image,TextInput,TouchableOpacity, StatusBar, ScrollView, ImagePickerIOS, Alert} from "react-native";
import Rating from "../../components/Rating";
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import AppButton from '../../components/AppButton';

import userRating from "../../components/Rating"
import {firebase} from "../../../Firebase/firebase"


export default function SettingScreen({ navigation }){
  const [review, setReview] = useState();
  const [imageSource, setImageSource] = useState(null);
  const rateRef = React.useRef(null);


  const openLibrary = async()=> { //Function is triggered when "Choose From Library" button is pressed.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync; //Awaits for user input for Permissions. 
    if(permissionResult.granted===false){
      alert("You've refused to allow this app to acess your photos!")
      return;
    }

    /* Can't do this like this. Firestore isn't configured to store images like this. I only refrence the URI which does nothing in regards to cloud storage, it's a local refrence.
    async function addReview() { //Pass in GeoHash Here. 
      const dataRef = firebase.firestore().collection('AddedReviews');
      await dataRef.doc('Test').set({
        rating: userRating,
        photo: setImageSource,
        review: setReview,
      })    
    }
    */

    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result); 
    if(!result.cancelled){
      setImageSource(result.uri);
      console.log(result.uri);
    }
  }

  const openCamera = async()=>{ //Function is triggered when "Take Photo" button is pressed.
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync(); //Awaits for user input for Permissions. 
    if(permissionResult.granted === false){
      alert("You've refused to allow this app to acess your photos!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    console.log(result);
    if(!result.cancelled){
      setImageSource(result.uri);
      console.log(result.uri);
    }
  }
  
  renderInner=()=>(
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photos</Text>
        <Text style={styles.panelSubtitle}>No PooPoo Pics Plz</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={openLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={()=> rateRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  
  return(
      <SafeAreaView style={styles.container}>
        <BottomSheet 
          ref={rateRef}
          snapPoints={["43%",0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          borderRadius={10}
          enabledContentTapInteraction={false}
          //callbackNode={this.fall}
          enableGestureInteraction={true}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.titlecontainer}>
            <Text style={styles.title}>Review</Text>
            <View style={styles.TextInput}>
              <TextInput
                label="Review"
                onChangeText={(review)=>setReview(review)}
                placeholder="How Was It?"
                mode="outlined"
                multiline={true}
              />
            </View>
            <Text style={styles.title}>Rate The Restroom</Text>
            <SafeAreaView style={styles.ratingcontainer}>
              <Rating></Rating>
            </SafeAreaView>
            <View style={styles.photocontainer}>
              <Text style={styles.title}>Upload Photos</Text>
              <AppButton style={styles.panelButton}title="Upload Shit" onPress={()=>rateRef.current.snapTo(0)}/>
            </View>
            <View style={styles.imageContainer}>{
              imageSource !== '' && <Image 
                source={{uri: imageSource}}
                style={styles.image}
              />
            }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  )};


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    scrollView:{
        marginHorizontal: 5,
    },
    titlecontainer:{
      flex: 1,
      backgroundColor: "#FFF",
      width: "100%",
      paddingHorizontal: 20,
    },
    ratingcontainer:{
      flex: 1,
      padding: 1,
      justifyContent: 'center'
    },
    title: {
      fontSize: 35,
      marginTop: 30,
      alignSelf: 'center'
    },
    TextInput:{
      height: 200, 
      borderWidth: 3,
      borderRadius: 20,
      paddingTop:10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    panel:{
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
    },
    panelTitle:{
      fontSize: 27,
      height: 35,
    },
    panelSubtitle:{
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton:{
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle:{
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    imageContainer:{
      padding: 30
    },
    image: {
      width: 400,
      height: 300,
      resizeMode: 'cover'
    },
})
