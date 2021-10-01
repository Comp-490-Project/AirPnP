import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
import colors from '../assets/config/colors';
export default function AppText({children}) {
    return  <Text style={styles.text}>{children} </Text>;
}
const styles = StyleSheet.create({
    text: {
        color: colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android"? "Roboto" : "Avenir"
    }
})



