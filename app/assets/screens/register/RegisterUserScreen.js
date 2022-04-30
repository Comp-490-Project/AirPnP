import React from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SafeView from '../../components/SafeView';
import LightText from '../../components/LightText';
import AppButton from '../../components/AppButton';
import BackButton from '../../icons/back-btn.png';
import { HEIGHT, WIDTH } from '../../../constants/Dimensions';
import colors from '../../theme/colors';

function RegisterUserScreen({ navigation, route }) {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required().max(25).label('Username'),
  });

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
              2
            </LightText>
            <LightText fontSize={36} lineHeight={35} fontWeight="bold">
              {' '}
              of 3
            </LightText>
          </View>

          <LightText fontSize={20} fontWeight="bold">
            Please enter a username:
          </LightText>

          <Formik
            initialValues={{ username: '' }}
            onSubmit={(values) => {
              const formData = {
                ...route.params.formData,
                username: values.username,
              };

              navigation.navigate('RegisterPassword', {
                formData,
              });
            }}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <>
                {errors?.username && (
                  <LightText color="#F03D17">{errors.username}</LightText>
                )}
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={[colors.secondary, colors.primary]}
                  locations={[0, 1]}
                  style={[
                    styles.gradientOutline,
                    { marginTop: errors.username ? 0 : 25 },
                  ]}
                >
                  <View style={styles.formGroup}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="johndoe"
                      placeholderTextColor="#CDCDCD"
                      value={values.username}
                      onChangeText={handleChange('username')}
                    />
                    <FontAwesomeIcon
                      icon={faUser}
                      size={22}
                      color="#CDCDCD"
                      style={styles.user}
                    />
                  </View>
                </LinearGradient>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <AppButton title="Continue" />
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
  user: {
    position: 'absolute',
    left: 15,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '100%',
  },
});

export default RegisterUserScreen;
