import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from './app/assets/config/colors';
import LoginScreen from './app/assets/screens/LoginScreen';
import RegisterScreen from './app/assets/screens/RegisterScreen';
import ForgotPassword from './app/assets/screens/ForgotPassword';
import MapScreen from './app/assets/screens/MapScreen';
import AddScreen from './app/assets/screens/AddScreen';
import FavoritesScreen from './app/assets/screens/FavoritesScreen';
import ReviewScreen from './app/assets/screens/ReviewScreen';
import SettingsScreen from './app/assets/screens/SettingsScreen';

// Imports from 'AddScreen.js'
import { firebase } from './Firebase/firebase';
import { geohashForLocation } from 'geofire-common';
import { userRating } from './app/components/Rating';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="map" component={HomeTabs}></Stack.Screen>
        <Stack.Screen name="forgot" component={ForgotPassword}></Stack.Screen>
        <Stack.Screen name="review" component={ReviewScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeTabs = ({ navigation }) => {
  // State from 'MapScreen.js'
  const [keys, setKeys] = useState([]);
  const [restrooms, setRestrooms] = useState([]);

  // State from 'AddScreen.js'
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [mapRegion, setRegion] = useState(null);

  // Function from 'AddScreen.js'
  //Send Restroom Data to Firestore
  async function addRestroom() {
    const dataRef = firebase.firestore().collection('Los-Angeles');
    await dataRef
      .doc(geohashForLocation([mapRegion.latitude, mapRegion.longitude]))
      .set({
        description: description,
        geohash: geohashForLocation([mapRegion.latitude, mapRegion.longitude]),
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        name: title,
        rating: userRating,
      });
    setRestrooms((restrooms) => [
      ...restrooms,
      {
        description: description,
        geohash: geohashForLocation([mapRegion.latitude, mapRegion.longitude]),
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        name: title,
        rating: userRating,
      },
    ]);
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'home') {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'add') {
            return (
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'favorites') {
            return (
              <Ionicons
                name={focused ? 'star-sharp' : 'star-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'settings') {
            return (
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: colors.medium,
        tabBarActiveTintColor: colors.tabs,
      })}
    >
      <Tab.Screen
        name="home"
        options={{ headerShown: false }}
        children={() => (
          <MapScreen
            keys={keys}
            setKeys={setKeys}
            restrooms={restrooms}
            setRestrooms={setRestrooms}
            addRestroom={addRestroom}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="add"
        options={{ headerShown: false }}
        children={() => (
          <AddScreen
            mapRegion={mapRegion}
            setRegion={setRegion}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            addRestroom={addRestroom}
          />
        )}
      />
      <Tab.Screen
        name="favorites"
        options={{ headerShown: false }}
        children={() => (
          <FavoritesScreen
            keys={keys}
            setKeys={setKeys}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="settings"
        options={{ headerShown: false }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export { HomeTabs };
export default App;
