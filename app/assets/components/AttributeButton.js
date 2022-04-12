import React from 'react';
import { View, StyleSheet } from 'react-native';
import LightText from './LightText';
import FreeIcon from '../icons/dollar-sign-icon.svg';
import RestaurantIcon from '../icons/restaurant-icon.svg';
import colors from '../theme/colors';

const AttributeButton = ({ attribute }) => {
  return attribute === 'free' ? (
    <View style={styles.btnContainer}>
      <FreeIcon height={15} width={10} style={styles.icon} />
      <LightText lineHeight={20}>Free</LightText>
    </View>
  ) : (
    <View style={styles.btnContainer}>
      <RestaurantIcon height={15} width={20} style={styles.icon} />
      <LightText lineHeight={20}>Restaurant</LightText>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.whiteOpacity,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 1,
    marginRight: 5,
  },
  icon: {
    marginRight: 3,
  },
});

export default AttributeButton;
