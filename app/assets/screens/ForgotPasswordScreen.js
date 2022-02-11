import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { auth } from '../../firebase';

function ForgotPasswordScreen({ navigation }) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
  });

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: 'center' }}
      source={require('../../assets/icons/background.jpg')}
    >
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          auth
            .sendPasswordResetEmail(values.email)
            .catch((error) => alert(error.message));
          alert('Email Sent');
          navigation.navigate('login');
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <View style={styles.inputFields}>
              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                placeholder="Email"
                textContentType="emailAddress"
              />
              <Text style={{ color: 'red' }}>{errors.email}</Text>
            </View>
            <View style={styles.resetButton}>
              <TouchableOpacity>
                <AppButton title="Reset Password" onPress={handleSubmit} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  inputFields: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
  },
  resetButton: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    height: 30,
    marginBottom: 10,
  },
});

export default ForgotPasswordScreen;
