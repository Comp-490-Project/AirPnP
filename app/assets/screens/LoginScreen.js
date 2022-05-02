import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import colors from '../theme/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import SafeView from '../components/SafeView';

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
    <SafeView>
      <View>
      <Image
              style={styles.reviewImage}
              source={require ('../icons/app-final-logo.png')
              }
            />
      </View>
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
            
            <View style={styles.signInButton}>
              <TouchableOpacity>
                <AppButton title="Sign in" onPress={handleSubmit} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      <View style={styles.forgot}>
        <Text
          style={styles.forgot3}
          onPress={() => navigation.navigate('Forgot')}
        >
          Forgot Password?
        </Text>
      </View>

      <View style={styles.register2}>
        <Text
          style={styles.register2}
        >
          Don't have an account?
        </Text>
      </View>

      <View style={styles.register}>
        <Text
          style={styles.forgot2}
          onPress={() => navigation.navigate('Register')}
        >
          Sign Up
        </Text>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    position: 'absolute',
    bottom: 130,
    left: 45,
    right: 45,
    height: 30,
    marginBottom: 10,

  },
  forgot: {
    position: 'absolute',
    bottom: 75,
    right: 20,
    width: '60%',
    fontSize: 10,
  },
  forgot2: {
    fontSize: 12,
    color: colors.primary,
  },

  forgot3:{
    fontSize: 15,
    color: colors.primary,
  },

  register: {
    position: 'absolute',
    bottom: 7,
    right: 0,
    width: '38%',
    height: 30,
  },

  register2: {
    position: 'absolute',
    bottom: 10, 
    fontSize: 12,
    color: colors.black,
    right: 85,
  },

  reviewImage:{
    width: 500,
    top: 85, 
    height: 250,
    right: 50,
  },

  inputFields: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
  },

});

export default LoginScreen;
