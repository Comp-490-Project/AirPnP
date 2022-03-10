import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import colors from '../theme/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password'),
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Tabs');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: 'center' }}
      source={require('../../assets/icons/background.jpg')}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then((UserCredentials) => {
              const user = UserCredentials.user;
              dispatch(login(user));
              navigation.navigate('Tabs');
            })
            .catch((error) => alert(error.message));
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
              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                onChangeText={handleChange('password')}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <Text style={{ color: 'red' }}>{errors.password}</Text>
            </View>
            <View style={styles.loginButton}>
              <TouchableOpacity>
                <AppButton title="Login" onPress={handleSubmit} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      <View style={styles.forgot}>
        <Text
          style={styles.forgot2}
          onPress={() => navigation.navigate('Forgot')}
        >
          forgot password?
        </Text>
      </View>
      <View style={styles.registerButton}>
        <AppButton
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <View style={styles.guestButton}>
        <AppButton title="Guest" onPress={() => navigation.navigate('Tabs')} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    height: 30,
    marginBottom: 10,
  },
  forgot: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    width: '25%',
  },
  forgot2: {
    fontSize: 10,
    color: colors.blue,
  },

  registerButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: '40%',
    height: 30,
  },

  guestButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    width: '40%',
    height: 30,
  },
  inputFields: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
  },
});

export default LoginScreen;
