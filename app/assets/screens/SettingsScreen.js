import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { firebase } from '../../firebase';
import React, { useState } from 'react';
import AppButton from '../components/AppButton';

export default function SettingsScreen({ navigation }) {
  const user = firebase.auth().currentUser;

  const Logout = () => {
    if (user) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          navigation.navigate('login');
        });
    }
  };

  //Do an onpress that  calls a function that has the custom alert component, use imbedded decision JSX to choose when to bring it up.

  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={styles.LogoutButton}>
      <View style={styles.container}>
        <Text> {'Dark Mode'} </Text>
        <Switch
          trackColor={{ false: 'grey', true: 'teal' }}
          thumbColor="white"
          onValueChange={(value) => setDarkMode(value)}
          value={darkMode}
        />
      </View>
      {user && (
        <View style={{ flex: 1, marginBottom: 10 }}>
          <TouchableOpacity>
            <AppButton title="Logout" onPress={Logout} />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

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
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  LogoutButton: {
    paddingTop: 90,
    padding: 7,
    //bottom: 100,
    //left: 20,
    //right: 20,
    height: 30,
    //marginBottom: 10,
  },

  appButtonContainer: {
    elevation: 8,
    //backgroundColor: "#dcdcdc",
    //borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    //alignSelf: "center",
    //textTransform: "uppercase"
  },
});
