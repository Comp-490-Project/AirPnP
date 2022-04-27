import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLocation } from '../../actions/userActions';
import { setMapCenterLocation } from '../../actions/restroomActions';
import colors from '../theme/colors';

export default function CenterBox({ navigation }) {
  const dispatch = useDispatch();
  const { location } = useSelector((state) => state.userLocation);

  return (
    <TouchableOpacity style={styles.box}>
      <MaterialIcons
        name="navigation"
        color="white"
        size={30}
        style={{ alignSelf: 'center' }}
        onPress={() =>
          dispatch(setMapCenterLocation(location.latitude, location.longitude))
        } //TODO: Implement nice smooth scroll to center animation
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.backgroundDark,
  },
});
