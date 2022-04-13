import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../assets/screens/MapScreen';
import ProfileScreen from '../assets/screens/ProfileScreen';
import AddScreen from '../assets/screens/AddScreen';
import FavoritesScreen from '../assets/screens/FavoritesScreen';
import colors from '../assets/theme/colors';

const TabNavigator = () => {

  const Tab = createBottomTabNavigator();

  const { width, height } = Dimensions.get('window');



  return (
    
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: [
            {
              position: 'absolute',
              elevation: 0,
              backgroundColor: '#272B37',
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
                    width: 50,
                    height: 35,
                    tintColor: focused ? colors.tabs : '#748c94',
                  }}
                />
              </View>
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../assets/icons/tabs/add.png')}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 40,
                    tintColor: focused ? colors.tabs : '#748c94',
                  }}
                />
              </View>
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Profile"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../assets/icons/tabs/profile.png')}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 35,
                    tintColor: focused ? colors.tabs : '#748c94',
                  }}
                />

              </View>
            ),
          }}
        />
      </Tab.Navigator>
    
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
