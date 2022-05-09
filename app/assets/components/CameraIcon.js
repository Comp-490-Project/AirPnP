import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CameraIconSVG from '../icons/camera-icon.svg' 

const CameraIcon = ({ navigation, geohash }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Camera', {
            geohash,
          })
        }
      >
        <CameraIconSVG height={23} width={35} />
      </TouchableOpacity>
    </View>
  );
};
export default CameraIcon;
