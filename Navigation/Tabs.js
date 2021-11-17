import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../app/assets/config/colors";
import MapScreen from "../app/assets/screens/MapScreen";
import AddScreen from "../app/assets/screens/AddScreen";
import SettingsScreen from "../app/assets/screens/SettingsScreen";
import FavoritesScreen from "../app/assets/screens/FavoritesScreen";


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
          } else if (route.name === "Favorites") {
            return (
              <Ionicons
                name={focused ? "star-sharp" : "star-outline"}
                size={size}
                color = { "orange"}
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
        tabBarInactiveTintColor: colors.medium,
        tabBarActiveTintColor: colors.tabs,
      })}
    >
      <Tab.Screen name="Home" options={{headerShown: false}} component={MapScreen} />
      <Tab.Screen name="Add" options={{headerShown: false}} component={AddScreen} />
      <Tab.Screen name="Favorites" options={{headerShown: false}} component={FavoritesScreen} />
      <Tab.Screen name="Settings" options={{headerShown: false}} component={SettingsScreen} />

    </Tab.Navigator>
  );
}