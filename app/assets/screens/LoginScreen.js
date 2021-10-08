import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
<<<<<<< HEAD
} from 'react-native';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import AppText from '../../components/AppText';
import colors from '../../assets/config/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import colors from '../config/colors';
=======
} from "react-native";
import AppButton from "../../components/AppButton";
import AppTextInput from "../../components/AppTextInput";
import AppText from "../../components/AppText";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-native";
import RegisterScreen from "./RegisterScreen";
import colors from "../../assets/config/colors";
>>>>>>> a5c60b93582d7655fbebb9de7d21823cd90b9869

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default function LoginScreen() {
  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center" }}
      source={require("../../assets/background.jpg")}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)} //change this to send to db
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
                onChangeText={handleChange("email")}
                placeholder="Email"
                textContentType="emailAddress"
              />
              <Text style={{ color: "red" }}>{errors.email}</Text>
              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                onChangeText={handleChange("password")}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <Text style={{ color: "red" }}>{errors.password}</Text>
            </View>
            <View style={styles.loginButton}>
              <AppButton title="Login" onPress={handleSubmit} />
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
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    height: 30,
    marginBottom: 10,
  },
  forgot: {
    fontSize: 10,
    color: colors.blue,
    position: "absolute",
    bottom: 150,
    right: 20,
    width: "22%",
  },
  registerButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    width: "40%",
    height: 30,
  },

  guestButton: {
    position: "absolute",
    bottom: 50,
    left: 20,
    width: "40%",
    height: 30,
  },
  inputFields: {
    position: "absolute",
    bottom: 150,
    left: 20,
    right: 20,
  },
});
