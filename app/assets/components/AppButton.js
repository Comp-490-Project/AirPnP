import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient'
function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      
        <LinearGradient colors = {[colors.textLeft, colors.textRight]}
                        style = {styles.button}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>  
      
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
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppButton;
