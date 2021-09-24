import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

export default function LoginScreen(props) {
    return (
        <ImageBackground 
        style= {styles.background}
        source= {require("../../assets/backround.jpg")}></ImageBackground>
    )
}

const styles = StyleSheet.create({

background: {
    flex: 1
}

})
