import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity,Dimensions} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { useLinkProps } from "@react-navigation/native";
import MapView from "react-native-maps";

function profileScreen(props){
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
          <Feather name="chevron-left" color ='#FFF' size={25}/>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: 34,
          longitude: -118,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0121
        }}
      >
      </MapView>
      <View style={styles.cont3}>
        <Text style={styles.title}> XXXXXXXX </Text>
        <Text style={styles.subtitle}> YYYYYYY </Text>
        <View style={styles.cont2}>
          <Text style={{...styles.title, flex: 2, marginTop:0}}>Colors</Text>
          <View styles={styles.selected}>
            <View style={styles.c1}/>
          </View>
          <View style={styles.c2}/>
          <View style={styles.c3}/>
        </View>
        <Text style={styles.text}>
          
        </Text>
        <View style={"styles.cont1"}>
          <FontAwesome name = "heart-o" color="#000" size={25}/>
          <TouchableOpacity
            style={styles.btn}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default profileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  map:{
    width:'100%',
    height: '35%',
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
  },
  btnText: {
    fontSize: 20,
    color: "#FFF",
  },
  cont1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 40,
  },
  c3: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#529CC0",
  },
  c2: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#529C47",
    marginHorizontal:10
  },
  c1: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#E2443B",
  },
  selected: {
    borderColor: "#E2443B",
    height: 30,
    width: 30,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  cont2: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  cont3: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    paddingHorizontal: 20,

  },
});