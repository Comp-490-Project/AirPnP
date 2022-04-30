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
  const [skipAuth, setSkipAuth] = useState(false);

  const getAsyncStorageItems = async () => {
    try {
      const tutorialViewed = await AsyncStorage.getItem('@tutorialViewed');
      const skipAuth = await AsyncStorage.getItem('@skipAuth');

      if (tutorialViewed) {
        setViewed(true);
      }

      if (skipAuth) {
        setSkipAuth(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAsyncStorageItems();
  }, []);

  if (loading) return <AnimationLoad />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!viewed && <Stack.Screen name="Tutorial" component={TutorialScreen} />}
        {!skipAuth && (
          <Stack.Screen name="Register" component={RegisterStartScreen} />
        )}
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="RegisterEmail" component={RegisterEmailScreen} />
        <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
        <Stack.Screen
          name="RegisterPassword"
          component={RegisterPasswordScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="RestroomInfo" component={RestroomInfo} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Save" component={UploadPost} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
