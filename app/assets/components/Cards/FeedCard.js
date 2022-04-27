import React from 'react';
import { Image, Text, StyleSheet, Animated } from 'react-native';
import { CARD } from '../../../constants/Dimensions';
import { ACTION_OFFSET } from '../../../constants/Dimensions';

function FeedCard({ userName, caption, source, swipe, isFirst, ...rest }) {
  const rotate = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
      <Image source={{ uri: source }} style={styles.image} />
      {/* TODO: FRONTEND: Gradient looks weird, fix the stylings so it looks 'blended'
        <LinearGradient
            colors={['rgba(0,0,0,0.9)', 'transparent']}
            style={styles.gradient}
        >
        </LinearGradient>
        */}
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.caption}>{caption}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 45,
  },

  image: {
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    borderRadius: CARD.BORDER_RADIUS,
  },

  gradient: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 160,
    borderRadius: CARD.BORDER_RADIUS,
  },

  userName: {
    position: 'absolute',
    top: 22,
    left: 22,
    fontSize: 36,
  },

  caption: {
    position: 'absolute',
    bottom: 22,
    textAlign: 'center',
    fontSize: 15,
  },
});

export default FeedCard;
