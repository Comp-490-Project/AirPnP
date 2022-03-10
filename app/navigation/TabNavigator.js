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

const TabNavigator = () => {
  // @todo
  // FavoritesScreen.js - Delete states after moved to actions
  const [keys, setKeys] = useState([]);
  const [restrooms, setRestrooms] = useState([]);

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
          name="Home"
          component={MapScreen}
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
          name="Profile"
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
          name="Add"
          component={AddScreen}
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
          component={FavoritesScreen}
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
