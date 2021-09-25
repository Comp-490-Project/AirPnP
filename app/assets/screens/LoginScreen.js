import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import colors from '../config/colors';
import firebase from '../../../Firebase/firebase';
export default function LoginScreen() {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/background.jpg')}
    >
      <View style={styles.buttonsContainer}>
        <AppButton title="Login" />
        <AppButton title="Register" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '80%',
  },
});
