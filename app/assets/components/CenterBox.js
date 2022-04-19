import React from "react";
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function CenterBox ({navigation}) {
    return (
        <View style={styles.container}>
           <TouchableOpacity 
            style={styles.box}>
            <MaterialIcons
              name="navigation"
              color="black"
              size={30}
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
      flex: 1,
      position: 'absolute',
      height:'70%',
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
  