import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-native';
import colors from '../../assets/config/colors';
import { auth } from '../../../Firebase/firebase';


const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});


export default function LoginScreen({history}) {
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        history.push('/map') ;
      }
    })
    return unsubscribe
  }, [])



  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: 'center' }}
      source={require('../../assets/background.jpg')}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => { 
          auth.
          signInWithEmailAndPassword(values.email, values.password)
          .then(UserCredentials => {
            const user = UserCredentials.user;
             history.push('/map') ;
            
          }) 
          .catch(error => alert(error.message))
          
        }} //change this to send to db
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
              <TouchableOpacity onPress={handleSubmit}>
                <AppButton title="Login" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <View style={styles.registerButton}>
        <Link to="/register">
          <AppButton title="Register" />
        </Link>
      </View>
      <View style={styles.guestButton}>
        <Link to="/map">
          <AppButton title="Guest" />
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    height: 30,
    marginBottom: 10,
  },
  forgot: {
    fontSize: 10,
    color: colors.blue,
    position: 'absolute',
    bottom: 150,
    right: 20,
    width: '22%',
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
