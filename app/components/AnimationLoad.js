import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native"

export default function AnimationLoad() {
  return (
    <View style={styles.main}>
      <LottieView
        source={require("../assets/62636-essential-icon-pack-toilet-paper-animated-icon.json")}
        style={styles.animation}
        autoPlay
        resizeMode="cover"
        speed={2}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation:{
        width: Dimensions.get('window').width-100,
        height: Dimensions.get('window').width-100,
        left: 5
    }
});