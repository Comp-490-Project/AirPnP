import React from "react";
import { NativeRouter, Route, BackButton } from "react-router-native";
import RegisterScreen from "./app/assets/screens/RegisterScreen";
import MapScreen from "./app/assets/screens/MapScreen";
import LoginScreen from "./app/assets/screens/LoginScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "./navigation/tabs";

/*
export default function Apps() {
  return (
    <NativeRouter>
      <BackButton>
        <Route path="/register" component={RegisterScreen} />
        <Route path="/map" component={MapScreen} />
        <Route path="/" component={LoginScreen} exact />
      </BackButton>
    </NativeRouter>
  );
}

*/

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
