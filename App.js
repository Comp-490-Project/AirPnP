import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import ReviewScreen from './app/assets/screens/ReviewScreen'
import RegisterScreen from './app/assets/screens/RegisterScreen';
import MapScreen from './app/assets/screens/MapScreen';
import LoginScreen from './app/assets/screens/LoginScreen';
import ForgotPassword from './app/assets/screens/ForgotPassword';
import HomeScreen from './app/assets/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="login"
          component={LoginScreen} 
        ></Stack.Screen>
        <Stack.Screen
         name="register"
         component={RegisterScreen} 
        ></Stack.Screen>
        <Stack.Screen
          name="map"
          component={HomeScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="forgot"
          component={ForgotPassword}
        ></Stack.Screen>
        <Stack.Screen
          name="review"
          component={ReviewScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

