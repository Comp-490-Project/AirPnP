import React from 'react';
import { SafeAreaView, StatusBar, Platform, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const SafeView = ({ children }) => {
  return <SafeAreaView style={styles.safeView}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.backgroundDark,
  },
});

export default SafeView;
