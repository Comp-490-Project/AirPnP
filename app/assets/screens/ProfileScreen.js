import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppButton from '../components/AppButton';
import {useSelector} from 'react-redux';
import { firebase } from '../../firebase';


function ProfileScreen({navigation}) {
  const { user } = useSelector((state) => state.userAuth);

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
