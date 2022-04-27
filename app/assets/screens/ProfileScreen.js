import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AppButton from '../components/AppButton';
import {useSelector} from 'react-redux';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


function ProfileScreen({navigation}) {
  const { user } = useSelector((state) => state.userAuth);

  const clearLocal = async () => {
    try{
      await AsyncStorage.removeItem('@tutorialViewed')
    } catch (err) {
      console.log(err)
    }
  }

  const Logout = () => {
    if (user) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          navigation.navigate('Login');
        });
    }
  };



  return (
    <View style={styles.container}>
      {user && (
        <View style={{ flex: 1, marginBottom: 10 }}>
          <TouchableOpacity>
            <AppButton title="Logout" onPress={Logout} />
          </TouchableOpacity>
          <TouchableOpacity>
           <AppButton title="click" onPress={clearLocal} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#dcdcdc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

});
