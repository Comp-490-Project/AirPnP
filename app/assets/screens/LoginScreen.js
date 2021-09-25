import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import colors from '../config/colors';
export default function LoginScreen() {
<<<<<<< HEAD
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/backround.jpg')}
    >
      <View style={styles.buttonsContainer}>
        <AppButton title="Login" />
        <AppButton title="Register" />
      </View>
    </ImageBackground>
  );
=======
    return (
        <ImageBackground 
        style= {styles.background}
        source= {require("../../assets/background.jpg")}
        >
         <View style = {styles.buttonsContainer}>    
        <AppButton title= "Login" />
        <AppButton title= "Register" />    
        </View>


        </ImageBackground>
    )
>>>>>>> ff8e7c8cdd7a4613c1fc68797c46c966bee9b136
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
