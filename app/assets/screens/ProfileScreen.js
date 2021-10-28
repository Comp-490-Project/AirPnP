import React from "react";
import {StyleSheet,Image,Text,View,TouchableOpacity,Dimensions,Button,TextInput,} from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import MapView from "react-native-maps";


export default function App() {
  const [text, setText] = React.useState("");

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 1000,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Text>Swipe down to close</Text>
      <View style={styles.cont3}>
        <Text style={styles.title}> Address: </Text>
        <Text style={styles.subtitle}> 7420 Hi Ave </Text> 
        {/* Look into Reverse Geocoding Google API to transer coords to address*/}
        <Text style={styles.title}> Description: </Text>
        <View style={styles.TextInput}>
          <TextInput
          multiline={true}
          label="Description:"
          onChangeText={(text) => setText(text)}
          placeholder="Describe the features of the restroom being added."
          mode="outlined"
          />
        </View>
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "papayawhip",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <MapView
          style={styles.map}
          region={{
            latitude: 34,
            longitude: -118,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0121,
          }}
        ></MapView>
        <Button
          title="Add Bathroom:"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[550, 450, 0]}
        borderRadius={40}
        renderContent={renderContent}
      />
    </> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  map: {
    width: "100%",
    height: "100%",
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
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
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
    marginHorizontal: 10,
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
    paddingTop: 20,
  },
  cont3: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    paddingHorizontal: 20,
  },
  TextInput:{
    height: 200, 
    borderWidth: 3,
    borderRadius: 20,
    paddingTop:10,
    paddingLeft: 10,
    paddingRight: 10,

  }
});
