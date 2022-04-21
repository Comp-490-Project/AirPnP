import React from 'react';
import { View, StyleSheet } from 'react-native';
import DarkText from './DarkText';

const Review = () => {
  return (
    <View style={styles.reviewContainer}>
      <DarkText lineHeight={40}>
        Adipiscing sed consequat, ullamcorpera curabitur sollicitudin ornare
        felis massa ac. Tellus cursus sed commodo ut. Metus id erat id vitae.
        Tortor donec vitae mi viverra. Sed consectetur tincidunt vivamus
        malesuada leo, volutpat ut scelerisque.
      </DarkText>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: '#E2E2E2',
  },
});

export default Review;
