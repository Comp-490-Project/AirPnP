import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

function AddScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>AddScreen Screen!</Text>
    </View>
  );
}

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}); 