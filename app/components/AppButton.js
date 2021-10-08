import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../assets/config/colors';
export default function AppButton({ title , onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress= {onPress}>
        <Text style={styles.text}>{title}</Text>     
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttons,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  text: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
