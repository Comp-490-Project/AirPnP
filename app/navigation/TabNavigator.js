import React from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../assets/screens/MapScreen';
import ProfileScreen from '../assets/screens/ProfileScreen';
import AddScreen from '../assets/screens/AddScreen';
import colors from '../assets/theme/colors';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          {
            position: 'absolute',
            backgroundColor: '#272B37',
            height: 70,
          },
        ],
      }}
    >
      <Tab.Screen
        name="Home"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../assets/icons/tabs/home.png')}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 35,
                    tintColor: colors.secondary,
                  }}
                />
              </View>
            ) : (
              <Image source={require('../assets/icons/home-tab.png')} />
            ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../assets/icons/tabs/add.png')}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                    tintColor: colors.secondary,
                  }}
                />
              </View>
            ) : (
              <Image source={require('../assets/icons/add-tab.png')} />
            ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../assets/icons/profile-tab.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: colors.secondary,
                  }}
                />
              </View>
            ) : (
              <Image
                source={require('../assets/icons/profile-outline.png')}
                style={{ height: 30, width: 30 }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
