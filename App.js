// Status Bar
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/assets/screens/LoginScreen';
import AppText from './app/components/AppText';
import MapScreen from './app/assets/screens/MapScreen';

export default function App() {
  return <MapScreen />;
}
