import React from 'react';
import { Text } from 'react-native';
import colors from '../theme/colors';
import { useFontLoader } from '../../hooks/useFontLoader';
import AnimationLoad from '../components/AnimationLoad';

const LightText = ({
  color,
  fontSize = 14,
  fontWeight = '400',
  lineHeight = 30,
  textAlign = 'left',
  children,
}) => {
  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return <AnimationLoad />;
  }

  return (
    <Text
      style={{
        color: color ? color : colors.backgroundLight,
        fontFamily: 'Inter',
        fontSize,
        fontWeight,
        lineHeight,
        textAlign,
      }}
    >
      {children}
    </Text>
  );
};

export default LightText;
