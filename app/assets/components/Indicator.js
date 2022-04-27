import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import React from 'react';
import { WINDOW } from '../../constants/Dimensions';

export default function Indicator({ data, scrollHorizontal }) {
  //const {width} = WINDOW.WIDTH;
  const { width } = useWindowDimensions();
  return (
    <View style={{ flexDirection: 'row', height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollHorizontal.interpolate({
          inputRange,
          outputRange: [10, 10, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollHorizontal.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 8,
  },
});
