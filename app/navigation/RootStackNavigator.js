import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../assets/screens/LoginScreen';
import RegisterScreen from '../assets/screens/RegisterScreen';
import ForgotPasswordScreen from '../assets/screens/ForgotPasswordScreen';
import ReviewScreen from '../assets/screens/ReviewScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen
          name="Forgot"
          component={ForgotPasswordScreen}
        ></Stack.Screen>
        <Stack.Screen name="Tabs" component={TabNavigator}></Stack.Screen>
        <Stack.Screen name="Review" component={ReviewScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
