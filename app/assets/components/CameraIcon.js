import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from '../theme/colors';

import * as ImagePicker from 'expo-image-picker';
import AnimationLoad from './AnimationLoad';

const CameraIcon = ({ navigation, geohash }) => {
  const [hasCameraPerms, setHasCameraPerms] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.getCameraPermissionsAsync();
      setHasCameraPerms(cameraStatus.status === 'granted');
      if (!cameraStatus) {
        alert('Required');
      }
    })();
  }, [hasCameraPerms]);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.getCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      return <AnimationLoad />;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      navigation.navigate('Save', { image: result.uri, geohash });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openCamera}>
        <FontAwesomeIcon
          icon={faCamera}
          size={30}
          color={colors.backgroundLight}
        ></FontAwesomeIcon>
      </TouchableOpacity>
    </View>
  );
};
export default CameraIcon;
