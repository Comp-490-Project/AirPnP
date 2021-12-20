import React, { useState } from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
import ProfileScreen from './app/assets/screens/ProfileScreen';

// Imports from 'AddScreen.js'
import { firebase } from './Firebase/firebase';
import { geohashForLocation } from 'geofire-common';
import { userRating } from './app/components/Rating';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get('window');

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: colors.tabs,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="register" component={RegisterScreen}></Stack.Screen>
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
    <View style={{ width, height }}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: [
            {
              position: 'absolute',
              //bottom: 25,
              //left: 20,
              // right: 20,
              elevation: 0,
              backgroundColor: '#ffffff',
              //borderRadius: 15,
              height: 50,
              ...styles.shadow,
            },
          ],
        }}
      >
        <Tab.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('./app/assets/Home.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? colors.tabs : '#748c94',
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.tabs : '#748c94',
                    fontSize: 12,
                  }}
                >
                  HOME
                </Text>
              </View>
            ),
          }}
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
          name="PROFILE"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('./app/assets/Profile.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? colors.tabs : '#748c94',
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.tabs : '#748c94',
                    fontSize: 12,
                  }}
                >
                  PROFILE
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="add"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./app/assets/Add.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: colors.white,
                }}
              />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
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
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('./app/assets/Favorites.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? colors.tabs : '#748c94',
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.tabs : '#748c94',
                    fontSize: 12,
                  }}
                >
                  FAVORITES
                </Text>
              </View>
            ),
          }}
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
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('./app/assets/Settings.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? colors.tabs : '#748c94',
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.tabs : '#748c94',
                    fontSize: 12,
                  }}
                >
                  SETTINGS
                </Text>
              </View>
            ),
          }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export { HomeTabs };
export default App;
