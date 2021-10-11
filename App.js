import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import RegisterScreen from './app/assets/screens/RegisterScreen';
import MapScreen from './app/assets/screens/MapScreen';
import LoginScreen from './app/assets/screens/LoginScreen';
import SplashScreen from './app/assets/screens/SplashScreen';

export default function App() {
  return (
    <NativeRouter>
      <Route path="/register" component={RegisterScreen} />
      <Route path="/map" component={MapScreen} />
      <Route path="/" component={LoginScreen} exact />
    </NativeRouter>
  );
}
