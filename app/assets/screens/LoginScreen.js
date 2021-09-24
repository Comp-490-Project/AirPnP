import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

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
    width: "100%",
    height: 70,
    backgroundColor: 'blue',
},
RegisterButton: {
    width: "100%",
    height: 70,
    backgroundColor: 'red',
},
})
