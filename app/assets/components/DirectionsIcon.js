import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Linking,
  StyleSheet,
} from 'react-native';
import DirectionsIconSVG from '../icons/directions-icon.svg';

const DirectionsIcon = ({ latitude, longitude }) => {
  return (
    <View style={styles.iconWrapper}>
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

const styles = StyleSheet.create({
  iconWrapper: {
    marginRight: 15,
  },
});
export default DirectionsIcon;
