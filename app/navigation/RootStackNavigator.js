import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../assets/screens/LoginScreen';
import RegisterStartScreen from '../assets/screens/register/RegisterStartScreen';
import RegisterEmailScreen from '../assets/screens/register/RegisterEmailScreen';
import RegisterUserScreen from '../assets/screens/register/RegisterUserScreen';
import RegisterPasswordScreen from '../assets/screens/register/RegisterPasswordScreen';
import ForgotPasswordScreen from '../assets/screens/ForgotPasswordScreen';
import RestroomInfo from '../assets/screens/RestroomInfo';
import FavoritesScreen from '../assets/screens/FavoritesScreen';
import ReviewScreen from '../assets/screens/ReviewScreen';
import UploadPost from '../assets/components/UploadPost';
import FeedScreen from '../assets/screens/FeedScreen';
import CameraScreen from '../assets/screens/CameraScreen';
import TutorialScreen from '../assets/screens/TutorialScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimationLoad from '../assets/components/AnimationLoad';
import SearchScreen from '../assets/screens/SearchScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [viewed, setViewed] = useState(false);

  const viewTutorial = async () => {
    try {
      const value = await AsyncStorage.getItem('@tutorialViewed');

      if (value) {
        setViewed(true);
      }
    } catch (err) {
      console.log('Error @tutorialViewed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    viewTutorial();
  }, []);

  if (loading) return <AnimationLoad />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!viewed && (
          <Stack.Screen
            name="Tutorial"
            component={TutorialScreen}
          ></Stack.Screen>
        )}
        <Stack.Screen
          name="Register"
          component={RegisterStartScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="RegisterEmail"
          component={RegisterEmailScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUserScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="RegisterPassword"
          component={RegisterPasswordScreen}
        ></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
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
        <Stack.Screen name="Search" component={SearchScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
