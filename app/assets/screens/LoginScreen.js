import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import colors from '../config/colors';
export default function LoginScreen(props) {
    return (
        <ImageBackground 
        style= {styles.background}
        source= {require("../../assets/backround.jpg")}
        >
            <View style={styles.loginButton}></View>
            <View style={styles.RegisterButton}></View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

background: {
    flex: 1,
    justifyContent: "flex-end",
},
loginButton: {
    width: "30%",
    height: 70,
    backgroundColor: colors.buttons,
    position: "absolute",
    bottom: 100,
    left: 40,
},
RegisterButton: {
    width: "30%",
    height: 70,
    backgroundColor: colors.buttons,
    position: "absolute",
    bottom: 100,
    right: 40,


},
})
