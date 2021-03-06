import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';

export default function GradientText(props) {
  return (
    <MaskedView
      maskElement={
        <Text style={[props.style, { backgroundColor: 'transparent' }]}>
          {props.text}
        </Text>
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.primary, colors.secondary]}
        locations={[0.1, 0.8]}
      >
        <Text style={[props.style, { opacity: 0 }]}>{props.text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}
