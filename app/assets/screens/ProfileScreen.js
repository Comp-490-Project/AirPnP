import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen!</Text>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
