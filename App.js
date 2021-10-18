import React from 'react';
import { NativeRouter, Route, BackButton } from 'react-router-native';
import RegisterScreen from './app/assets/screens/RegisterScreen';
import MapScreen from './app/assets/screens/MapScreen';
import LoginScreen from './app/assets/screens/LoginScreen';
import ForgotPassword from './app/assets/screens/ForgotPassword';

export default function App() {
  return (
    <NativeRouter>
      <BackButton>
        <Route path="/register" component={RegisterScreen} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/map" component={MapScreen} />
        <Route path="/" component={LoginScreen} exact />
      </BackButton>
    </NativeRouter>
  );
}
