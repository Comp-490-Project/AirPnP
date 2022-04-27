import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../assets/screens/LoginScreen';
import RegisterScreen from '../assets/screens/RegisterScreen';
import ForgotPasswordScreen from '../assets/screens/ForgotPasswordScreen';
import RestroomInfo from '../assets/screens/RestroomInfo';
import FavoritesScreen from '../assets/screens/FavoritesScreen';
import ReviewScreen from '../assets/screens/ReviewScreen';
import UploadPost from '../assets/components/UploadPost';
import FeedScreen from '../assets/screens/FeedScreen';
import CameraScreen from '../assets/screens/CameraScreen';

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
        <Stack.Screen
          name="RestroomInfo"
          component={RestroomInfo}
        ></Stack.Screen>
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
        ></Stack.Screen>
        <Stack.Screen name="Review" component={ReviewScreen}></Stack.Screen>
        <Stack.Screen name="Save" component={UploadPost}></Stack.Screen>
        <Stack.Screen name="Feed" component={FeedScreen}></Stack.Screen>
        <Stack.Screen name="Camera" component={CameraScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
