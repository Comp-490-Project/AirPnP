import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../assets/screens/MapScreen';
import ProfileScreen from '../assets/screens/ProfileScreen';
import AddScreen from '../assets/screens/AddScreen';
import FavoritesScreen from '../assets/screens/FavoritesScreen';
import SettingsScreen from '../assets/screens/SettingsScreen';
import colors from '../assets/theme/colors';
// @todo
// AddScreen.js - Delete imports after moved to actions
import { firebase } from '../firebase';
import { geohashForLocation } from 'geofire-common';
import { userRating } from '../assets/components/Rating';

const TabNavigator = ({ navigation }) => {
  // @todo
  // FavoritesScreen.js - Delete states after moved to actions
  const [keys, setKeys] = useState([]);
  const [restrooms, setRestrooms] = useState([]);

  // @todo
  // AddScreen.js - Delete states after moved to actions
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [mapRegion, setRegion] = useState(null);

  // @todo
  // AddScreen.js - Delete and implement current version in mapActions.js
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

  return (
    <View style={{ width, height }}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: [
            {
              position: 'absolute',
              elevation: 0,
              backgroundColor: '#ffffff',
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
              navigation={navigation}
              addRestroom={addRestroom}
            ></MapScreen>
          )}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../assets/icons/tabs/home.png')}
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
                  source={require('../assets/icons/tabs/profile.png')}
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
                source={require('../assets/icons/tabs/add.png')}
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
                  source={require('../assets/icons/tabs/favorites.png')}
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
                  source={require('../assets/icons/tabs/settings.png')}
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

export default TabNavigator;
