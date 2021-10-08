import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TextInput,
} from "react-native";
import AppButton from "../../components/AppButton";
import AppTextInput from "../../components/AppTextInput";
import AppText from "../../components/AppText";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-native";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, "Too Long!")
    .required("First Name is required"),
  lastName: Yup.string().max(50, "Too Long!").required("Last Name is required"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
export default function RegisterScreen() {
  return (
    <>
      <Image
        style={styles.image}
        source={require("../../assets/background.jpg")}
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)} //change this to send to db
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <ScrollView style={styles.ViewContainer}>
            <Text>First Name</Text>
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              onChangeText={handleChange("firstName")}
              placeholder="First Name"
              textContentType="name"
            />
            <Text style={{ color: "red" }}>{errors.firstName}</Text>
            <Text>Last Name</Text>
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              onChangeText={handleChange("lastName")}
              placeholder="Last Name"
              textContentType="name"
            />
            <Text style={{ color: "red" }}>{errors.lastName}</Text>
            <Text>Email</Text>
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
            <Text>Password</Text>
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
            <Text>Confirm Password</Text>
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              onChangeText={handleChange("password")}
              placeholder="Confirm Password"
              secureTextEntry
              textContentType="password"
            />
            <Text style={{ color: "red" }}>{errors.password}</Text>

            <AppButton title="Register" />
            {/* Add text here for "Already have an account? Login." it would link to '/'*/}
            <Link to="/">
              <Text> Already have an account? Login. </Text>
            </Link>
          </ScrollView>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  ViewContainer: {
    paddingTop: 20,
    padding: 15,
  },
  image: {
    position: "absolute",
  },
});
