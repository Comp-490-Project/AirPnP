import React from 'react';
import { Text } from 'react-native';
import colors from '../theme/colors';
import { useFontLoader } from '../../hooks/useFontLoader';
import AnimationLoad from '../components/AnimationLoad';

const DarkText = ({
  fontSize = 14,
  fontWeight = '400',
  lineHeight = 30,
  textAlign = 'left',
  color = colors.textDark,
  children,
}) => {
  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return <AnimationLoad />;
  }

  return (
    <Text
      style={{
        fontFamily: 'Inter',
        fontSize,
        fontWeight,
        lineHeight,
        textAlign,
        color,
      }}
    >
      {children}
    </Text>
  );
};

export default DarkText;
