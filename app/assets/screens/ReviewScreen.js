import React, { useEffect,useState } from "react";
import { StyleSheet,Text, View, Dimensions, SafeAreaView,Image,TextInput,TouchableOpacity, StatusBar, ScrollView, ImagePickerIOS, Alert} from "react-native";
import Rating from "../../components/Rating";
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import AppButton from '../../components/AppButton';
import {userRating} from "../../components/Rating"
import {firebase} from "../../../Firebase/firebase"
import colors from "../config/colors";




export default function ReviewScreen({ route, navigation}){
  const [comment, setComment] = useState("");
  const [imageSource, setImageSource] = useState(null);
  const rateRef = React.useRef(null);
  var hashKey = route.params.restroomKey

  const openLibrary = async()=> { //Function is triggered when "Choose From Library" button is pressed.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync; //Awaits for user input for Permissions. 
    if(permissionResult.granted===false){
      alert("You've refused to allow this app to acess your photos!")
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if(!result.cancelled){
      setImageSource(result.uri);
      rateRef.current.snapTo(1)
    }
  }

  const openCamera = async()=>{ //Function is triggered when "Take Photo" button is pressed.
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync(); //Awaits for user input for Permissions. 
    if(permissionResult.granted === false){
      alert("You've refused to allow this app to acess your photos!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if(!result.cancelled){
      setImageSource(result.uri);
      rateRef.current.snapTo(1)
    }
  }
  
  async function handleSubmit(){// submit the review  with the geohash, check if user has a current review using userID



    const user = firebase.auth().currentUser
    const query = await firebase.firestore().collection('Los-Angeles');
    var restroomInformation
     
    query
    .doc(hashKey)
    .get()
    .then((querySnapshot) => {
    restroomInformation = querySnapshot.data();
    //if it doesnt have any reviews, create review array, meanrating field and add to restroom
    if(!restroomInformation.reviews){
      query.doc(hashKey).update({ 
        meanRating: userRating,
        reviews:firebase.firestore.FieldValue.arrayUnion({Comment: comment, Rating: userRating, userID: user.uid})
    })   
       
    }else {
      // calculate the new mean rating if this user hasnt reviewed before
      var newMeanRating = ((restroomInformation.reviews.length * restroomInformation.meanRating) + userRating) / (restroomInformation.reviews.length + 1);
      var oldMeanRating
      // now check if user has reviewed this restroom before
      for(var i = 0; i < restroomInformation.reviews.length;i++){
        if(user.uid ==  restroomInformation.reviews[i].userID ){ 
          oldMeanRating = restroomInformation.reviews[i].Rating
          query.doc(hashKey).update({ 
            reviews: firebase.firestore.FieldValue.arrayRemove({Comment: restroomInformation.reviews[i].Comment, Rating: restroomInformation.reviews[i].Rating, userID: restroomInformation.reviews[i].userID})         
        })  
        // since it was reviewed by this user before we update the new mean calculation reflecting the new rating
        newMeanRating = ((restroomInformation.reviews.length * restroomInformation.meanRating) + userRating - oldMeanRating) / (restroomInformation.reviews.length);
        }
      }  
      query.doc(hashKey).update({ 
        meanRating: newMeanRating,
        reviews: firebase.firestore.FieldValue.arrayUnion({Comment: comment, Rating: userRating, userID: user.uid})
    }) 
    }
    });
    if(imageSource !== ''){
    uploadImage(imageSource)
    }
    navigation.navigate("map");
  }
  const uploadImage=async(uri)=>{
    const response = await fetch(uri);
    const blob = await response.blob() //Responsible for containing the uri's data in bytes. 
    var ref = firebase.storage().ref().child(hashKey);
    return ref.put(blob)
  }

  renderInner=()=>(
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photos</Text>
        <Text style={styles.panelSubtitle}>Nothing Graphic Please</Text>
      </View >
      <TouchableOpacity
          style={{ margin: 5 }} >
        <AppButton title="Take Photo" onPress={openCamera} />
      </TouchableOpacity>
      <TouchableOpacity
          style={{ margin: 5 }} >
      <AppButton title="Choose From Library" onPress={openLibrary}/>
      </TouchableOpacity>
      <TouchableOpacity
          style={{ margin: 5 }} >
      <AppButton title="Cancel" onPress={()=> rateRef.current.snapTo(1)}/> 
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
          snapPoints={["50%",0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          borderRadius={10}
          enabledContentTapInteraction={false}
          //callbackNode={this.fall}
          enableGestureInteraction={true}
        />
        <ScrollView>
          <View style={styles.titlecontainer}>
            <Text style={styles.title}>Review</Text>
            <View style={styles.TextInput}>
              <TextInput
                label="Review"
                onChangeText={(comment)=>setComment(comment)}
                placeholder="How Was It?"
                mode="outlined"
                multiline={true}
              />
            </View>
            <Text style={styles.title}>Rating</Text>
            <SafeAreaView style={styles.ratingcontainer}>
              <Rating></Rating>
            </SafeAreaView>  
            
            <TouchableOpacity
             style={{ margin: 5 }} >
              <AppButton title="Add Photo" onPress={()=>rateRef.current.snapTo(0)}/>     
            </TouchableOpacity>
            <TouchableOpacity
             style={{ margin: 5 }} >
              <AppButton title= "Submit Review" onPress={()=>handleSubmit()}/>
              </TouchableOpacity>
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
    
    titlecontainer:{
      flex: 1,
      backgroundColor: colors.white,
      width: "100%",
      paddingHorizontal: 20,
    },
    ratingcontainer:{
      flex: 1,
      padding: 20,
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
      borderRadius: 7.5,
      paddingTop:10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    panel:{
      padding: 20,
      backgroundColor: colors.white,
      paddingTop: 10,
      justifyContent:"space-around"
      
    },
    panelTitle:{
      fontSize: 27,
      height: 35,
    },
    panelSubtitle:{
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 5,
    },
    panelButtons:{
      padding: 13,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 7,
      flex:1
    },
    panelButtonTitle:{
      fontSize: 17,
      fontWeight: 'bold',
      color: colors.white,
    },
    header: {
      backgroundColor: colors.white,
      shadowColor: colors.lightgray,
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
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
      backgroundColor: colors.lightgray,
      marginBottom: 10,
    },
    imageContainer:{
      width:"100%",
      marginBottom: 10,
      marginRight:10
    },
    image: {
      width:"100%",
      height:350,
    
    },
})
