import React from 'react';
import { SafeAreaView, StatusBar, Platform, StyleSheet } from 'react-native';

const SafeView = ({ children }) => {
  return <SafeAreaView style={styles.safeView}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default SafeView;
