import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { firebase, auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { register as registerRedux } from '../../actions/userActions';

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(50, 'Too Long!')
      .required('Username is required'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password'),
    passwordConfirmation: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const register = async (values) => {
    try {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      const user = userCredentials.user;
      const uid = user.uid;
      user.updateProfile({
        displayName: values.username,
      });

      const dataRef = firebase.firestore().collection('users');
      await dataRef.doc(uid).set({
        username: values.username,
        email: values.email,
      });

      dispatch(registerRedux(user));

      navigation.navigate('Tabs');
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Tabs');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <ImageBackground
        style={styles.image}
        source={require('../icons/background.jpg')}
      >
        <SafeAreaView>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => register(values)}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <ScrollView style={styles.ViewContainer}>
                <Text>Username</Text>
                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="account"
                  onChangeText={handleChange('username')}
                  placeholder="Username"
                  textContentType="username"
                />
                <Text style={{ color: 'red' }}>{errors.username}</Text>
                <Text>Email</Text>
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
                <Text>Password</Text>
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
                <Text>Confirm Password</Text>
                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  onChangeText={handleChange('passwordConfirmation')}
                  placeholder="Confirm Password"
                  secureTextEntry
                  textContentType="password"
                />
                <Text style={{ color: 'red' }}>
                  {errors.passwordConfirmation}
                </Text>
                <TouchableOpacity>
                  <AppButton title="Register" onPress={handleSubmit} />
                </TouchableOpacity>
                {/* Add text here for "Already have an account? Login." it would link to '/'*/}
                <Text onPress={() => navigation.navigate('Login')}>
                  {' '}
                  Already have an account? Login.{' '}
                </Text>
              </ScrollView>
            )}
          </Formik>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  ViewContainer: {
    paddingTop: 40,
    padding: 15,
  },
  image: {
    flex: 1,
  },
});

export default RegisterScreen;
