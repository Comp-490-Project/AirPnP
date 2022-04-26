import React from 'react';
import { Text } from 'react-native';
import colors from '../theme/colors';
import { useFontLoader } from '../../hooks/useFontLoader';

const LightText = ({
  fontSize = 14,
  fontWeight = '400',
  lineHeight = 30,
  textAlign = 'left',
  children,
}) => {
  useFontLoader();

  return (
    <Text
      style={{
        color: colors.backgroundLight,
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
