import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

 function FavoritesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> FavoritesScreen! Welcome! </Text>
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});