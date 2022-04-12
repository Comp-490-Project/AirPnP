import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FeedIconSVG from '../icons/feed-icon.svg';

const FeedIcon = ({ navigation, geohash }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Feed', {
            geohash,
          })
        }
      >
        <FeedIconSVG height={23} width={35} />
      </TouchableOpacity>
    </View>
  );
};
export default FeedIcon;
