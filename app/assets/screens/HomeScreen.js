import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { Tabs } from "../../../Navigation/Tabs";

function HomeScreen() {
  return <Tabs />;
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});