import React, { component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import AppButton from './AppButton';

function CustomAlertComponent({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topPart}>
        <Image
          source={require('../icons/bell.png')}
          reesizeMode={'contain'}
          style={styles.alertIconStyle}
        />
        <Text style={styles.alertTitleTextStyle}>
          Hit your head on the toilet?
        </Text>
      </View>
      <View style={styles.middlePart}>
        <Text style={styles.alertMessageTextStyle}>
          You are currently not signed in
        </Text>
      </View>
      <View style={styles.bottomPart}>
        <AppButton
          title="Login"
          style={styles.alertMessageButtonStyle}
          onPress={() => navigation.navigate('login')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    height: '20%',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#404040',
    borderRadius: 10,
    padding: 4,
    position: 'absolute',
    bottom: 290,
  },
  topPart: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4,
    left: 17,
  },
  middlePart: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 4,
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 2,
  },
  bottomPart: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  alertIconStyle: {
    height: 40,
    width: 40,
  },
  alertTitleTextStyle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2,
    marginHorizontal: 2,
  },
  alertMessageTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    padding: 2,
  },
  alertMessageButtonStyle: {
    borderRadius: 10,
    backgroundColor: '#80BFFF',
  },
});

export default CustomAlertComponent;
