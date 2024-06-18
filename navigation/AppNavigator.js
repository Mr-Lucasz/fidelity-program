// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterVisitScreen from '../screens/RegisterVisitScreen';
import RewardsScreen from '../screens/RewardsScreen';
import TransactionsScreen from '../screens/TransactionsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'RegisterVisit') {
            iconName = focused ? 'ios-camera' : 'ios-camera-outline';
          } else if (route.name === 'Rewards') {
            iconName = focused ? 'ios-gift' : 'ios-gift-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="RegisterVisit" component={RegisterVisitScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeTabs} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;