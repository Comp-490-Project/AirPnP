import React from 'react';
import { Text } from 'react-native';
import colors from '../theme/colors';
import { useFontLoader } from '../../hooks/useFontLoader';

const DarkText = ({
  fontSize = 14,
  fontWeight = '400',
  lineHeight = 30,
  textAlign = 'left',
  color = colors.textDark,
  children,
}) => {
  useFontLoader();

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
