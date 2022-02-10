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
import { register } from '../../actions/userActions';

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(50, 'Too Long!')
      .required('First Name is required'),
    lastName: Yup.string()
      .max(50, 'Too Long!')
      .required('Last Name is required'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password'),
    passwordConfirmation: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('map');
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
            onSubmit={(values) => {
              auth
                .createUserWithEmailAndPassword(values.email, values.password)
                .then(async (UserCredentials) => {
                  const user = UserCredentials.user;
                  const uid = user.uid;
                  const dataRef = firebase.firestore().collection('users');
                  await dataRef.doc(uid).set({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                  });
                  dispatch(register(user));
                  navigation.navigate('map');
                })
                .catch((error) => alert(error.message));
            }}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <ScrollView style={styles.ViewContainer}>
                <Text>First Name</Text>
                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="account"
                  onChangeText={handleChange('firstName')}
                  placeholder="First Name"
                  textContentType="name"
                />
                <Text style={{ color: 'red' }}>{errors.firstName}</Text>
                <Text>Last Name</Text>
                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="account"
                  onChangeText={handleChange('lastName')}
                  placeholder="Last Name"
                  textContentType="name"
                />
                <Text style={{ color: 'red' }}>{errors.lastName}</Text>
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
                <Text onPress={() => navigation.navigate('login')}>
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
