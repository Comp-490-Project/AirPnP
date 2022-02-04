import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import { firebase } from './app/firebase';
import { geohashForLocation } from 'geofire-common';
import { userRating } from './app/assets/components/Rating';

//Imports from 'Tabs.js'
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
          <Stack.Screen
            name="register"
            component={RegisterScreen}
          ></Stack.Screen>
          <Stack.Screen name="map" component={HomeTabs}></Stack.Screen>
          <Stack.Screen name="forgot" component={ForgotPassword}></Stack.Screen>
          <Stack.Screen name="review" component={ReviewScreen}></Stack.Screen>
          <Stack.Screen name="add" component={AddScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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

  //For Tabs
  const Tab = createBottomTabNavigator();
  const { width, height } = Dimensions.get('window');

  //Function from 'Tabs.js'
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
    navigation.navigate('home');
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
          children={() => (
            <MapScreen
              keys={keys}
              setKeys={setKeys}
              restrooms={restrooms}
              setRestrooms={setRestrooms}
              addRestroom={addRestroom}
              navigation={navigation}
            ></MapScreen>
          )}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('./app/assets/icons/tabs/home.png')}
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
        ></Tab.Screen>
        <Tab.Screen
          name="PROFILE"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('./app/assets/icons/tabs/profile.png')}
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
          name="AddScreen"
          children={() => (
            <AddScreen
              mapRegion={mapRegion}
              setRegion={setRegion}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              addRestroom={addRestroom}
              navigation={navigation}
            />
          )}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./app/assets/icons/tabs/add.png')}
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
        />
        <Tab.Screen
          name="Favorites"
          children={() => (
            <FavoritesScreen
              keys={keys}
              setKeys={setKeys}
              navigation={navigation}
            />
          )}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('./app/assets/icons/tabs/favorites.png')}
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
        ></Tab.Screen>
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('./app/assets/icons/tabs/settings.png')}
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
        ></Tab.Screen>
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
