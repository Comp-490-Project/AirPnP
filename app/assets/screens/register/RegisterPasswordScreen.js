import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { firebase, auth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { register as registerRedux } from '../../../actions/userActions';
import SafeView from '../../components/SafeView';
import LightText from '../../components/LightText';
import AppButton from '../../components/AppButton';
import BackButton from '../../icons/back-btn.png';
import { HEIGHT, WIDTH } from '../../../constants/Dimensions';
import colors from '../../theme/colors';

function RegisterPasswordScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(6).label('Password'),
  });

  const register = async (values) => {
    const { email, username, password } = values;

    try {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredentials.user;
      const uid = user.uid;

      user.updateProfile({
        displayName: username,
      });

      const dataRef = firebase.firestore().collection('users');

      await dataRef.doc(uid).set({
        email,
        username,
      });

      dispatch(registerRedux(user));

      navigation.navigate('Tabs');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeView>
      <>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image style={styles.backButton} source={BackButton} />
        </TouchableOpacity>
        <View style={styles.screenContainer}>
          <View style={styles.stepContainer}>
            <LightText fontSize={36} lineHeight={35} fontWeight="bold">
              Step{' '}
            </LightText>
            <LightText
              fontSize={36}
              lineHeight={35}
              fontWeight="bold"
              color={colors.primary}
            >
              3
            </LightText>
            <LightText fontSize={36} lineHeight={35} fontWeight="bold">
              {' '}
              of 3
            </LightText>
          </View>

          <LightText fontSize={20} fontWeight="bold">
            Please enter a password:
          </LightText>

          <Formik
            initialValues={{ password: '' }}
            onSubmit={(values) => {
              const formData = {
                ...route.params.formData,
                password: values.password,
              };

              register(formData);
            }}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <>
                {errors?.password && (
                  <LightText color="#F03D17">{errors.password}</LightText>
                )}
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={[colors.secondary, colors.primary]}
                  locations={[0, 1]}
                  style={[
                    styles.gradientOutline,
                    { marginTop: errors.password ? 0 : 25 },
                  ]}
                >
                  <View style={styles.formGroup}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="******"
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
                    <AppButton title="Sign Up" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 15,
    marginLeft: 15,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    marginVertical: 25,
  },
  gradientOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: HEIGHT * 0.06,
    borderRadius: 4,
    marginBottom: 25,
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
  },
});

export default RegisterPasswordScreen;
