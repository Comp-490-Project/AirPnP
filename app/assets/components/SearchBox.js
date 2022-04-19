import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function SearchBox ({navigation}) {

return (
    <View style={styles.container}>
       <TouchableOpacity 
        onPress={() => navigation.navigate('Search')}
        style={styles.box}>
        <MaterialIcons
          name="search"
          color="black"
          size={30}
          style={{ alignSelf: 'center' }}
        />
      </TouchableOpacity>
      </View>

  );
}

//TODO: Frontend dev needs to come and fix these styles ASAP, they are not dynamic at all.
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    position: 'absolute',
    height:'90%',
    right: 15,
  },
  box: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
});
export default SearchBox;
