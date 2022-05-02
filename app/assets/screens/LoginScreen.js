import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import AppButton from '../components/AppButton';
import { HEIGHT, WIDTH } from '../../constants/Dimensions';
import colors from '../theme/colors';
import Logo from '../icons/app-final-logo.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import SafeView from '../components/SafeView';
import LightText from '../components/LightText';

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().label('Email'),
    password: Yup.string().required().label('Password'),
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
      <View style={styles.screenContainer}>
        <View>
          <Image source={Logo} style={styles.logo} />
        </View>

        <View style={styles.heading}>
          <LightText fontSize={24}>Sign in to continue</LightText>
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
          {({ handleChange, handleSubmit, errors, values }) => (
            <>
              {errors?.email && (
                <View style={styles.errorContainer}>
                  <LightText color="#F03D17">{errors.email}</LightText>
                </View>
              )}
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.secondary, colors.primary]}
                locations={[0, 1]}
                style={styles.gradientOutline}
              >
                <View style={styles.formGroup}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Email"
                    placeholderTextColor="#CDCDCD"
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={22}
                    color="#CDCDCD"
                    style={styles.envelope}
                  />
                </View>
              </LinearGradient>

              {errors?.password && (
                <View style={styles.errorContainer}>
                  <LightText color="#F03D17">{errors.password}</LightText>
                </View>
              )}
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.secondary, colors.primary]}
                locations={[0, 1]}
                style={styles.gradientOutline}
              >
                <View style={styles.formGroup}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Password"
                    placeholderTextColor="#CDCDCD"
                    textContentType="password"
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />
                  <FontAwesomeIcon
                    icon={faLock}
                    size={22}
                    color="#CDCDCD"
                    style={styles.lock}
                  />
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      size={18}
                      color="#CDCDCD"
                      style={styles.eyeSlash}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      size={18}
                      color="#CDCDCD"
                      style={styles.eye}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  )}
                </View>
              </LinearGradient>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit}>
                  <AppButton title="Sign In" />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginBottom:
                    errors?.email || errors?.password
                      ? HEIGHT * 0.05
                      : HEIGHT * 0.125,
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                  <LightText
                    color={colors.primary}
                    fontSize={16}
                    lineHeight={20}
                  >
                    Forgot Password?
                  </LightText>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.secondaryLinkContainer}
                onPress={() => navigation.navigate('Register')}
              >
                <LightText>Don't have an account? </LightText>
                <LightText color={colors.primary}>Sign Up</LightText>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: WIDTH,
    height: HEIGHT * 0.3,
  },
  heading: {
    marginBottom: 29,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
    paddingHorizontal: 20,
  },
  errorContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  gradientOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: HEIGHT * 0.06,
    borderRadius: 4,
    marginBottom: 29,
  },
  formGroup: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    position: 'relative',
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: 47,
    width: '99.3%',
    height: '94%',
    borderRadius: 3,
    color: colors.backgroundLight,
  },
  envelope: {
    position: 'absolute',
    left: 15,
  },
  lock: {
    position: 'absolute',
    left: 15,
  },
  eye: {
    position: 'absolute',
    right: 15,
  },
  eyeSlash: {
    position: 'absolute',
    right: 15,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 29,
  },
  secondaryLinkContainer: {
    flexDirection: 'row',
  },
});

export default LoginScreen;
