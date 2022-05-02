import React from 'react';
import { View, TouchableOpacity, Platform, Linking } from 'react-native';
import DirectionsIconSVG from '../icons/directions-icon.svg';

const DirectionsIcon = ({ latitude, longitude }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          Platform.OS === 'ios'
            ? Linking.openURL(`maps:${latitude},${longitude}`)
            : Linking.openURL(`geo:0,0?q=${latitude},${longitude}`)
        }
      >
        <DirectionsIconSVG height={30} width={30} />
      </TouchableOpacity>
    </View>
  );
};
export default DirectionsIcon;
