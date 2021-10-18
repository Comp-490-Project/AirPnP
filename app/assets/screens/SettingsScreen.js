import React from "react";
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
