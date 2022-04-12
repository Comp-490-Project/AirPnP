import React from 'react';
import { Text } from 'react-native';
import colors from '../theme/colors';
import { useFontLoader } from '../../hooks/useFontLoader';

const LightText = ({
  fontSize = 14,
  fontWeight = '400',
  lineHeight = 30,
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
      }}
    >
      {children}
    </Text>
  );
};

export default LightText;
