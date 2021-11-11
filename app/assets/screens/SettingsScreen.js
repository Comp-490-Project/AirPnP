/*import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings! Welcome! </Text>
    </View>
  );
}
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
*/


import React, { useEffect,useState } from "react";
import { StyleSheet,Text, View, Dimensions, SafeAreaView,Image,TextInput,TouchableOpacity, StatusBar, ScrollView} from "react-native";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import AppButton from "../../components/AppButton";
import BottomSheet from 'reanimated-bottom-sheet';
import Rating from "../../components/Rating";


renderInner=()=>(
  <View style={styles.panel}>
    <View style={{alignItems: 'center'}}>
      <Text style={styles.panelTitle}>Uplod Photo</Text>
      <Text style={styles.panelSubtitle}>No PooPoo Pics Plz</Text>
    </View>
    <TouchableOpacity style={styles.panelButton} onPress={null}>
      <Text style={styles.panelButtonTitle}>Take Photo</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.panelButton} onPress={null}>
      <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.panelButton}
      onPress={()=>this.bs.current.snapTo(1)}>
      <Text style={styles.panelButtonTitle}>Cancel</Text>
    </TouchableOpacity>
  </View>
);


function SettingsScreen(){
  const [review, setReview] = useState();
  return(
      <SafeAreaView>
        <BottomSheet 
          ref={this.bs}
          snapPoints={[330,0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
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
            <SafeAreaView styles={styles.ratingcontainer}>
              <Rating></Rating>
            </SafeAreaView>
            <View style={styles.photocontainer}>
              <Text style={styles.title}>Upload Photos</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  )}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingTop: StatusBar.currentHeight,
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
})

export default SettingsScreen;
