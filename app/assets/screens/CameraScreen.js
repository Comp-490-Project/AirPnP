import React, { useState, useEffect } from 'react';
import { StyleSheet , View, Image, Button } from 'react-native';
//import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker' 

export default function CameraScreen({navigation,route}) {
  //const [camera, setCamera] = useState(null);
  const [image, setImage]= useState(null)
  //const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const {geohash} = route.params;
 /*
  const takePicture = async() => {
    if(camera){ //If the Camera Object exists (or rather it's granted perms)
      const data = await camera.takePictureAsync(null); //No options chosen for func.
      setImage(data.uri); //Testing Purposes, display image taken.
    }
  } 
  */

  const pickImage = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //Only images allowed (for now)
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    if(!result.cancelled){
      setImage(result.uri);
    }
  } 



  useEffect(() => {
    (async () => {
     // const cameraStatus  = await Camera.requestCameraPermissionsAsync();
      //setHasCameraPermission(cameraStatus.status  === 'granted');
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status==='granted');
      if (!galleryStatus){
        alert('Required');
      }
    })();
  }, [hasCameraPermission, hasGalleryPermission]);

  return (
    <View style={{flex:1}}>
      {/*
      <View style={styles.cameraContainer}>
        <Camera 
        ref={ref=>setCamera(ref)}
        style={styles.fixedRatio} 
        type={type}
        ratio={'1:1'}
        />
      </View>

      <Button
        title="Flip Image"
        onPress={() => {
          setType( //Hooks For Front/Back Cameras to be active. 
          type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
           );
          }}>
        </Button>
      */}
        <Button title="Save" onPress={()=> navigation.navigate('Save',{geohash,image})}/>
        <Button title="Pick Picture." onPress={()=>pickImage()}/> 
        <Button title="Take Picture." onPress={()=>takePicture()}/>
        {image && <Image source={{uri: image}} style={{flex: 1}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer:{
    flex: 1,
  },

  fixedRatio:{ //Fixes Camera Image Ratio.
    flex:1,
    aspectRatio: 1,
  }
}) 