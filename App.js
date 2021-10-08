// Status Bar
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/assets/screens/LoginScreen";
import Map from "./app/components/Map";
import AppText from "./app/components/AppText";
import RegisterScreen from "./app/assets/screens/RegisterScreen";
import { NativeRouter, Route } from "react-router-native";
import MapScreen from "./app/assets/screens/MapScreen";
export default function App() {
  return (
    <NativeRouter>
      <Route path="/" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/map" component={MapScreen} />
    </NativeRouter>
  );
}
