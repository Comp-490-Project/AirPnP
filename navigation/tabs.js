import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import MapScreen from "../app/assets/screens/MapScreen";
import AddScreen from "../app/assets/screens/AddScreen";
import ProfileScreen from "../app/assets/screens/ProfileScreen";
import SettingsScreen from "../app/assets/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Add") {
            return (
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#99e0c8",
      })}
    >
      <Tab.Screen name="Home" component={MapScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

/*
export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

*/
