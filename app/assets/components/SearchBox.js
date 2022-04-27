import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

function SearchBox({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Search')}
      style={styles.box}
    >
      <MaterialIcons
        name="search"
        color="white"
        size={30}
        style={{ alignSelf: 'center' }}
      />
    </TouchableOpacity>
  );
}

//TODO: Frontend dev needs to come and fix these styles ASAP, they are not dynamic at all.
const styles = StyleSheet.create({
  box: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.backgroundDark,
  },
});
export default SearchBox;
