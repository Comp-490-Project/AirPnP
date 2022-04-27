import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Envelope from '../../icons/envelope.svg';
import SafeView from '../../components/SafeView';
import LightText from '../../components/LightText';
import SkipButton from '../../icons/skip-btn.png';
import colors from '../../theme/colors';
import { HEIGHT, WIDTH } from '../../../constants/Dimensions';

const RegisterStartScreen = ({ navigation }) => {
  return (
    <SafeView>
      <>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
          <Image style={styles.skipButton} source={SkipButton} />
        </TouchableOpacity>
        <View style={styles.screenContainer}>
          <LightText fontSize={20} fontWeight="bold">
            Please choose one of the following options to create an account:
          </LightText>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterEmail')}
            style={styles.btnContainerWrapper}
          >
            <View style={styles.btnContainer}>
              <Envelope height={20} width={20} style={styles.envelope} />
              <LightText fontSize={18}>Continue with Email</LightText>
            </View>
          </TouchableOpacity>
          <View style={styles.subText}>
            <LightText>Already have an account? </LightText>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <LightText color={colors.primary}>Log In</LightText>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  skipButton: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginRight: 20,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
    padding: 20,
  },
  btnContainerWrapper: {
    marginVertical: 24,
  },
  btnContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 75,
  },
  envelope: {
    marginRight: 8,
  },
  subText: {
    flexDirection: 'row',
  },
});

export default RegisterStartScreen;
